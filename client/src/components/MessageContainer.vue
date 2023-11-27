<template>
  <v-app-bar flat height="60" class="pr-2" color="background">
      <v-btn @click="commit('setChat', null)" size="40" variant="flat" color="primary">
          <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-list-item class="pl-3">
          <template v-slot:prepend>
              <v-avatar size="45">
                  <v-img cover :src="getters.current_chat?.users?.[0]?.image || '/icons/noimg.jpg'"></v-img>
              </v-avatar>
          </template>
          <v-list-item-title class="text-body-2">{{ getters.current_chat?.users?.[0]?.name || '' }}</v-list-item-title>
          <v-list-item-subtitle class="text-caption">{{ getters.current_chat?.users?.[0]?.email || '' }}</v-list-item-subtitle>
      </v-list-item>
      <v-spacer></v-spacer>
      <v-btn size="40" class="ml-2" variant="flat" color="primary" @click="deleteMessage">
        <v-icon>mdi-{{!showDelete?'delete':'close'}}</v-icon>
      </v-btn>
  </v-app-bar>
  <v-sheet class="chat-box" id="chatbox">
    <div class="w-100 px-2 pb-1">
      <div v-for="message in getters.current_chat?.chatmessages||[]" :key="message.id" class="w-100 d-flex align-center pt-1" :class="message.sender?.id === getters.userid ? 'justify-space-between' : 'justify-start'">
        <div class="mr-1">
          <v-checkbox v-show="showDelete" v-model="selectedDeleteId" density="compact" :value="message.id" hide-details></v-checkbox>
        </div>
        <div class="d-flex justify-center">
          <v-sheet :color="message.sender?.id === getters.userid ? 'primary' : 'surface'" :border="message.sender?.id !== getters.userid" max-width="300" rounded class="px-2 py-1" @dblclick.stop="changeForEdit(message)">
            <v-avatar size="270" class="my-1" rounded v-if="message.type === 'image'">
              <v-img :src="message.file" width="100px"></v-img>
            </v-avatar>
            <v-avatar size="270" class="my-1" rounded v-else-if="message.type === 'video'">
              <video :src="message.file" controls></video>
            </v-avatar>
            <AudioMessage v-else-if="message.type === 'audio'" :fileName="message.fileName" :fileSize="message.fileSize" :prcolor="message.sender?.id === getters.userid ? 'white' : 'primary'" :audio="message.file" />
            <!-- @playAudio="playAudio(message.file)" -->
            <div class="w-100 d-flex" v-else-if="message.type === 'application'">
              <v-btn size="45" rounded class="mr-2 mt-1" variant="tonal" :href="message.file" target="_blank">
                <v-icon>mdi-file</v-icon>
              </v-btn>
              <div>
                <div class="text-caption text-gray audio-text-width mt-1">
                  {{ message.fileName }}
                </div>
                <span class="text-caption">{{ message.fileSize }}</span>
              </div>
            </div>
            <p class="text-body-3">{{ message.text }}<v-icon v-if="message.updated_at !== message.created_at" class="ml-1" size="10">mdi-pencil</v-icon></p>
          </v-sheet>
          <span class="text-caption text-grey-accent-3 ml-1 align-self-end">{{  new Date(message.created_at).toLocaleTimeString("en-US", { hour12: false, hour: "numeric", minute: "numeric" }) }}</span>
        </div>
      </div>
    </div>
  </v-sheet>
  <ChatForm @addMessage="addMessage" @updateMessage="updateMessage" @edit-off="editOff" :isEdited="!!editedMessage" :text="editedMessage?.text"/>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import AudioMessage from './AudioMessage.vue'
import ChatForm from './ChatForm.vue'
import { useStore } from 'vuex'
import * as chatApi from '../api/chat'
import * as chatSocket from '../api/socket'

const { getters, commit } = useStore()

const showDelete = ref(false)
const selectedDeleteId = ref([])
const editedMessage = ref<{id: string, text: string}|null>(null)

const addMessage = async (messageData: string | FormData) => {
  if(typeof messageData === "string") {
    const { data } = await chatApi.send_message({
      chat_id: getters.current_chat.id,
      sender_id: getters.userid,
      text: messageData,
    })
    chatSocket.sendmessage(data.result)
  }else{
    messageData.append("sender_id", getters.userid)
    messageData.append("chat_id", getters.current_chat.id)
    const { data } = await chatApi.send_message(messageData)
    chatSocket.sendmessage(data.result)
  }
  setTimeout(scrollToBottomChat, 200) 
}

const updateMessage = async (text: string) => {
  if(!editedMessage.value?.id) return
  if(editedMessage.value.text !== text) {
    const { data } = await chatApi.edit_message(editedMessage.value.id, { text })
    chatSocket.editmessage(data.result)
  }
  editOff()
}

const deleteMessage = async () => {
  if(showDelete.value) {
    showDelete.value = false
    if(selectedDeleteId.value.length !== 0) {
      const { data } = await chatApi.delete_messages(selectedDeleteId.value.join(','))
      console.log(data);
      chatSocket.deletemessage({messages: selectedDeleteId.value, chat_id: getters.current_chat?.id })
    }
  }else{
    showDelete.value = true
  }
  selectedDeleteId.value = []
}

const changeForEdit = (message: any) => {
  if(message.sender?.id !== getters.userid) return
  editedMessage.value = message
}

const editOff = () => {
  editedMessage.value = null
}

const scrollToBottomChat = () => {
  nextTick(() => {
    (document.getElementById('chatbox') as any).scrollTop = document.getElementById('chatbox')?.scrollHeight
  })
}
</script>

<style>
.chat-box {
  position: relative;
  width: 100%;
  top: 60px;
  height: calc(100% - 120px);
  overflow-y: auto;
  scroll-behavior: smooth;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column-reverse;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.my-video {
  position: absolute;
  bottom: 120px;
  right: 30px;
  width: 120px;
  height: 150px;
}
</style>