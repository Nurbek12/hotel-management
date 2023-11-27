<template>
  <v-container fluid style="height: calc(100vh - 60px)" class="px-0 py-0 d-flex">
    <ChatList :isSmallScreen="isSmallScreen" />
    <v-dialog fullscreen :scrim="false" transition="slide-x-reverse-transition" color="background" :model-value="getters.chat!==null" location="right" v-if="isSmallScreen" @update:modelValue="commit('setChat', null)">
      <v-layout full-height>
        <MessageContainer />
      </v-layout>
    </v-dialog>
    <v-layout v-else>
      <MessageContainer v-if="getters.chat!==null" />
      <div class="h-100 w-100 d-flex justify-center align-center bg-surface" v-else>
        <v-chip label>{{ {en:'Empty',ru:"Пустой",uz:"Bo'sh"}[locale] }}</v-chip>
      </div>
    </v-layout>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ChatList from '../components/ChatList.vue'
import MessageContainer from '../components/MessageContainer.vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { joinchat, getmessage, getchat, removeinchat, deleteinmessage, editinmessage } from '../api/socket'

const { locale } = useI18n()
const { getters, commit } = useStore()
const isSmallScreen = ref(false)

getmessage((message: any) => commit('addMessage', message))
getchat((chat: any) => commit('addChat', chat))
removeinchat((id: string) => commit('removeChat', id))
deleteinmessage((data: any) => commit('deleteMessage', data))
editinmessage((data: any) => commit('editMessage', data))

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 700;
};

onMounted(() => {
  joinchat(getters.userid)
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>