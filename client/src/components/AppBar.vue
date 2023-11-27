<template>
  <v-app-bar color="background" flat height="60">
    <v-app-bar-title>{{ store.getters.user.name }}</v-app-bar-title>
    <template v-slot:append>
      <v-btn color="primary" variant="flat" size="40" @click="changeTheme">
        <v-icon>{{themeIcon}}</v-icon>
      </v-btn>
      <!-- <v-btn class="ml-2" color="primary" variant="flat" size="40">
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn> -->
      <v-menu transition="fade-transition">
        <template v-slot:activator="{props}">
          <v-btn class="mx-2" v-bind="props" flat size="40" variant="flat" elevation="1">
            <v-avatar rounded>
              <v-img cover :src="currentLang?.img" />
            </v-avatar>
          </v-btn>
        </template>

        <v-list elevation="2" density="compact">
          <v-list-item v-for="(item, i) in languages" link :key="i" @click="changeLang(item.lang)">
            <template v-slot:prepend>
              <v-img :src="item.img" width="27" height="23" cover />
            </template>

            <v-list-item-title class="ml-4 text-caption" v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu transition="fade-transition">
        <template v-slot:activator="{props}">
          <v-btn class="mr-2" v-bind="props" size="40" variant="flat" elevation="1">
            <v-avatar rounded>
              <v-img cover :src="store.getters.user.image||'/icons/noimg.jpg'" />
            </v-avatar>
          </v-btn>
        </template>

        <v-list elevation="2" density="compact" width="150">
          <v-list-item link to="/settings">
            <template v-slot:prepend>
              <v-icon style="margin-inline-end: 16px">mdi-cog</v-icon>
            </template>

            <v-list-item-title class="text-caption">{{ t("nav.settings") }}</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="store.commit('logout')">
            <template v-slot:prepend>
              <v-icon style="margin-inline-end: 16px">mdi-logout-variant</v-icon>
            </template>

            <v-list-item-title class="text-caption">{{ t("nav.logout") }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import vuetify from "../plugins/vuetify"

const { locale, t } = useI18n()
const store = useStore()

const languages = [
  { lang: 'en', img: '/icons/flags/us.svg', title: "English" },
  { lang: 'ru', img: '/icons/flags/ru.svg', title: "Русский" },
  { lang: 'uz', img: '/icons/flags/uz.svg', title: "O'zbekcha" },
]

const currentLang = computed(() => languages.find((l) => l.lang === locale.value))
const changeLang = (l: string) => {
  localStorage.setItem('dashboard-lang', l)
  locale.value = l
}

const changeTheme = () => {
  vuetify.theme.global.name.value =
  vuetify.theme.global.name.value === "dark" ? "light" : "dark";
  localStorage.setItem('dashboard-theme', vuetify.theme.name.value)
}

const themeIcon = computed(() => {
  return vuetify.theme.global.name.value === "dark" ? "mdi-weather-night" : "mdi-white-balance-sunny";
})
</script>