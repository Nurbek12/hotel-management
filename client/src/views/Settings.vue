<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="4" md="3">
        <v-card flat height="286">
          <v-card-title>{{ t('users.image') }}</v-card-title>
          <v-card-text>
            <v-hover v-slot="{ isHovering, props }">
              <v-avatar class="v-hover-item" size="100%" rounded>
                <v-img :src="getters.user?.image || '/icons/noimg.jpg'" height="220" width="100%" cover></v-img>
                <transition name="fade-transition">
                  <v-btn @click="clickFileInput" :color="!isHovering?'transparent':'black'" v-bind="props" height="100%" class="position-absolute" block variant="text">
                    <v-icon size="50" color="white" v-show="isHovering">mdi-camera-party-mode</v-icon>
                  </v-btn>
                </transition>
              </v-avatar>
            </v-hover>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-title>{{ t('settings.title') }}</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-label>{{ t('users.name') }}</v-label>
                  <v-text-field v-model="user.name" :rules="namerules" variant="outlined" density="compact" hide-details></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-label>{{ t('booking.phone') }}</v-label>
                  <v-text-field v-model="user.phone" :rules="namerules" variant="outlined" placeholder="998 XX XXX XX XX" density="compact" hide-details></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-label>{{ t('booking.email') }}</v-label>
                  <v-text-field v-model="user.email" :rules="namerules" variant="outlined" placeholder="example@mail.com" density="compact" hide-details></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <span class="text-body-2 text-grey">{{ t('login.password') }}</span>
                  <v-text-field class="mt-1" hide-details density="compact" flat variant="outlined"
                      autocomplete="off" color="primary" dirty
                      :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'" v-model="user.password"
                      @click:append-inner="show = !show"></v-text-field>   
                </v-col>
                <v-col cols="12" sm="6">
                  <v-btn @click="updateUser" :disabled="!disabledBtn" block height="42" color="primary" variant="flat">
                    {{ t('save') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <input type="file" id="fileInput" hidden @change="updateUser">
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { update_user } from '../api/user'
import { namerules } from '../utils/rules'
// import vMask from '@titou10/v-mask'

const { getters, commit } = useStore()
const { t } = useI18n()

const show = ref(false)
const form = ref<any>(null)
const disabledBtn = computed(() => {
  if(
    getters.user?.name === user.value.name &&
    getters.user?.phone === user.value.phone &&
    getters.user?.email === user.value.email
  ) return false
  else return true
})

const user = ref({
  ...getters.user,
})

const clickFileInput = () => document.getElementById('fileInput')?.click()

const updateUser = async (e: any) => {
  const { valid } = await form.value.validate();
  if (valid) {
    const formdata = new FormData()
    formdata.append('name', user.value.name)
    formdata.append('phone', user.value.phone)
    formdata.append('email', user.value.email)

    if(e?.target?.files?.[0]) formdata.append('file', e.target.files[0])
    if(user.value?.image) formdata.append('image', user.value.image)
    if(user.value.password?.trim()) formdata.append('password', user.value.password)
    const { data } = await update_user(getters.userid, formdata)
    if(data.status === "ok") commit('setUser', data.result)
  }
}
</script>

<style>
  .v-hover-item {
    transition: filter .4s ease-in-out;
  }

  .v-hover-item.on-hover {
    filter: brightness(.8);
  }

  .show-btns {
    color: rgba(255, 255, 255, 1) !important;
  }
</style>