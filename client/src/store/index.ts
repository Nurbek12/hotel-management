import { createStore } from 'vuex'
import Cookies from 'js-cookie'

export default createStore({
  state: {
    media: new Audio(),
    media_paused: true,
    media_time: 0,

    chat: null,
    chats: [] as any[],

    videocallid: null,

    user: JSON.parse(localStorage.getItem('user') || '{}'),
    token: Cookies.get('token') || '',
  },
  getters: {
    media: state => state.media,
    media_paused: state => state.media_paused,
    media_time: state => state.media_time,

    chat: state => state.chat,
    chats: state => state.chats,
    current_chat: state => state.chat ? state.chats.find(c => c.id === state.chat) : {},

    videocallid: state => state.videocallid,

    user: state => state.user,
    token: state => state.token,
    logged: state => !!state.token,
    role: state => state.user?.role || '',
    userid: state => state.user?.id || '',
  },
  actions: {
    
  },
  mutations: {
    play: (state, data) => {
      state.media.src = data;
    },

    setChat(state, chat) {
      if(chat!==null) state.chat = chat
      else state.chat = null
    },
    setChats(state, chats) {
      state.chats = chats
    },
    addChat(state, chat) {
      chat.users = chat.users.filter((u: any) => u.id !== state.user.id)
      state.chats.unshift(chat)
    },
    removeChat(state, chatid) {
      const index = state.chats.findIndex(c => c.id === chatid)
      state.chats.splice(index, 1)
    },
    appendMessages(state, data) {
      Object.assign(state.chats[data[0]], { chatmessages: data[1], messages: [data[1][data[1].length-1]] })
    },
    addMessage(state, message) {
      const index = state.chats.findIndex(c => c.id === message.chat_id)
      state.chats[index].messages = [message]
      state.chats[index]?.chatmessages?.push(message)

      const temp = {...state.chats[index]}
      state.chats.splice(index, 1)
      state.chats.unshift(temp)
    },
    editMessage(state, message) {
      const index = state.chats.findIndex(c => c.id === message.chat_id)
      if(!state.chats[index]?.chatmessages) return
      const messageIndex = state.chats[index].chatmessages.findIndex((m: any) => m.id === message.id)
      Object.assign(state.chats[index].chatmessages[messageIndex], message)

      if(state.chats[index].messages[0].id === message.id) state.chats[index].messages[0].text = message.text
    },
    deleteMessage(state, {messages, chat_id}) {
      const index = state.chats.findIndex(c => c.id === chat_id)
      if(!state.chats[index]?.chatmessages) return
      let lenght = state.chats[index].chatmessages.length - messages.length
      state.chats[index].chatmessages = state.chats[index].chatmessages.filter((message: any) => !messages.includes(message.id))
      state.chats[index].messages = [state.chats[index].chatmessages[lenght-1]]
    },

    setVideoCallId(state, id) {
      if(!id) state.videocallid = null
      else state.videocallid = id
    },

    logout(state){
      state.token = ''
      state.user = {}
      localStorage.removeItem('user')
      Cookies.remove('token')
      window.location.href = '/login'
    },
    setUser(state, user){
      state.user = user
      localStorage.setItem('user', JSON.stringify(user));
    },
    setToken(state, token){
      state.token = token
      const expires = new Date(new Date().getTime() + 5 * 60 * 60 * 1000); // Текущая дата + 2 часа
      Cookies.set('token', token, { expires })
    },
  }
})