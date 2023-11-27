<template>
    <v-card flat rounded="0" height="100%" :width="isSmallScreen?'100%':'300px'" class="pb-12" color="background">
        <v-card-text class="px-2 pt-2 pb-0">
            <v-menu offset="12" transition="fade-transition" :model-value="!!search.trim()" :close-on-content-click="false">
                <template #activator="{props}">
                    <v-text-field v-bind="props" v-model="search" @update:modelValue="debounceSearch" 
                        class="normal-input" :placeholder="t('search')" flat
                        hide-details density="compact" variant="solo"
                        append-inner-icon="mdi-magnify" bg-color="surface" />
                </template>
                <v-list elevation="0" width="100%" nav lines="two" density="compact">
                    <v-list-item height="65" class="py-3" v-for="user, i in searchedUsers" :key="i">
                        <template v-slot:prepend>
                            <v-avatar>
                                <v-img cover :src="user.image || '/icons/noimg.jpg'"></v-img>
                            </v-avatar>
                        </template>
                        <v-list-item-title class="text-body-2">{{ user.name }}</v-list-item-title>
                        <v-list-item-subtitle class="text-caption mt-1">{{ user.email }}</v-list-item-subtitle>
                        <template #append>
                            <v-btn size="35" flat color="primary" @click="selectSearchedUser(user.id)">
                                <v-icon>mdi-chat</v-icon>
                            </v-btn>
                        </template>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-card-text>
        <v-list nav bg-color="transparent" mandatory class="pt-2" height="100%" lines="two">
            <div class="d-flex w-100 justify-center" v-if="chats.length===0">
                <v-chip label>{{ t("nodata") }}</v-chip>
            </div>
            <v-list-item height="65" class="py-3" v-for="chat, i in chats" :key="i" link @click="selectChat(i, chat.id)" :active="current_chat?.id === chat.id">
                <template v-slot:prepend>
                    <v-avatar>
                        <v-img cover :src="chat.users?.[0]?.image || '/icons/noimg.jpg'"></v-img>
                    </v-avatar>
                </template>
                <v-list-item-title class="text-body-2">{{ chat.users[0]?.name }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption mt-1">{{ chat.messages?.[0] ? chat.messages[0].text : {en:'Empty',ru:"Пустой",uz:"Bo'sh"}[locale] }}</v-list-item-subtitle>
                <template #append>
                    <div class="d-flex flex-column align-end">
                        <div class="text-caption text-grey">{{ chat.messages?.[0]?.created_at && new Date(chat.messages[0]?.created_at).toLocaleTimeString("en-US", { hour12: false, hour: "numeric", minute: "numeric" }) }}</div>
                    </div>
                </template>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script lang="ts">
import { ref } from 'vue'
import { mapGetters, mapMutations, useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import * as chatApi from '../api/chat'
import { get_users } from '../api/user'
import { debounce } from 'lodash'
import { addchat } from '../api/socket'

export default {
    name: "ChatList",
    props: ['isSmallScreen'],
    computed: mapGetters(['chats', 'current_chat', 'userid']),
    methods: {
        ...mapMutations(['setChat', 'setChats', 'appendMessages', 'addChat']),
        async selectChat(i: number, id: string) {
            if(!this.chats[i]?.chatmessages) {
                const { data } = await chatApi.get_messages(id)
                this.appendMessages([i, data.result])
            }
            this.setChat(id)
        },
        // async deleteChat(id) {
        //     await chatApi.delete_chat(id)
        //     removechat(id)
        // },
        async selectSearchedUser(uid: string) {
            const userHasChat = this.chats.find((c: any) => {
                return !!c.users.find((u: any) => u.id === uid)
            });

            if(!userHasChat) {
                const { data } = await chatApi.add_chats({
                    user1: this.userid,
                    user2: uid
                })
                addchat({...data.result, chatmessages: []}, uid)
                this.setChat(data.result.id)
            }else{
                const index = this.chats.findIndex((c: any) => c.id === userHasChat.id)
                this.selectChat(index, userHasChat.id)
            }
        }
    },
    setup(){
        const { t, locale } = useI18n()
        const { getters } = useStore()
        const searchedUsers = ref<any>([])
        const search = ref('')
        const debounceSearch = debounce(async (e: any) => {
            if(!e.trim()) return searchedUsers.value = []
            const { data } = await get_users(`search=${e}&userid=${getters.userid}`)
            searchedUsers.value = data.users
        }, 500)
        
        return { t, locale, searchedUsers, search, debounceSearch }
    },
    async created(){
        const { data } = await chatApi.get_chats(this.userid)
        this.setChats(data.result)
    }
}
</script>