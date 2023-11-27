<template>
  <v-navigation-drawer border v-model="drawer" :rail="rail" permanent width="250" elevation="0" :expand-on-hover="mobile">
    <v-list :lines="false" nav variant="flat">
        <v-list-item active-class="text-white" link v-for="link, i in links[(getters.user.role)||'STAFF']" :key="i" :to="link.url" color="#3D5AFE">
            <template v-slot:prepend>
              <v-icon :icon="link.icon"></v-icon>
            </template>
            <v-list-item-title>{{ t('nav.'+link.title) }}</v-list-item-title>
        </v-list-item>
    </v-list>
    <v-btn position="absolute" elevation="1" v-if="!mobile" :icon="`mdi-chevron-${!rail ? 'left' : 'right'}`" size="x-small" @click="rail = !rail" style="right: -15px"></v-btn>

  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { useDisplay } from "vuetify"
import { useStore } from "vuex"
import { useI18n } from 'vue-i18n'

const { getters } = useStore();
const { t } = useI18n()
const mobile = useDisplay().mobile;

watch(mobile, () => {
  if (mobile) rail.value = true;
});
const rail = ref(true)
const drawer = ref(true)

const links: any = {
  ADMIN: [
    { title: 'home', icon: 'mdi-view-grid', url: '/' },
    { title: 'translator', icon: 'mdi-microphone-settings', url: '/translator' },
    { title: 'bookings', icon: 'mdi-calendar-range', url: '/bookings' },
    { title: 'rooms', icon: 'mdi-bed-empty', url: '/rooms' },
    { title: 'chat', icon: 'mdi-forum', url: '/chats' },
    { title: 'employer', icon: 'mdi-card-account-details', url: '/users' },
    // { title: 'videochat', icon: 'mdi-video', url: '/videochats' },
  ],
  STAFF: [
    { title: 'bookings', icon: 'mdi-calendar-range', url: '/staff' },
    { title: 'translator', icon: 'mdi-microphone-settings', url: '/translator' },
    { title: 'chat', icon: 'mdi-forum', url: '/chats' },
    // { title: 'videochat', icon: 'mdi-video', url: '/videochats' },
  ]
}
</script>