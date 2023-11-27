import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './plugins/i18n'

createApp(App)
    .use(vuetify)
    .use(i18n)
    .use(router)
    .use(store)
    .mount('#app')