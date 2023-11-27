<template>
  <v-container fluid class="bg-img py-0 h-100">
    <v-row class="h-100" justify="center" align="center">
      <v-card max-width="400px" flat width="100%" class="px-1 py-4">
        <v-card-text class="d-flex justify-center pb-0 pt-1">
          <v-avatar rounded size="150">
            <v-img src="/icons/hotel.png"></v-img>
          </v-avatar>
        </v-card-text>
        <v-card-title class="d-flex justify-center">{{ t('login.title') }}</v-card-title>
        <v-card-text class="d-flex justify-center text-red-lighten-1 pb-1" v-if="error">{{ t('login.incorrect') }}!</v-card-text>
        <v-form ref="form">
          <v-card-text>
            <v-row>
              <v-col cols="12" class="py-2">
                <v-text-field density="comfortable"
                  v-model="user.login"
                  :placeholder="t('login.login')"
                  hide-details color="primary"
                  :rules="rules"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" class="py-2">
                <v-text-field density="comfortable"
                  v-model="user.password"
                  :placeholder="t('login.password')"
                  hide-details autocomplete="off"
                  :rules="rules" color="primary"
                  variant="outlined"
                  :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append-inner="show = !show"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="px-4 py-1">
            <v-btn color="primary" flat height="45" variant="elevated" block @click="validate">{{ t("login.submit") }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios, { checkToken } from "../api";
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useStore();
const router = useRouter()
const show = ref(false);
const rules = [(v: any) => !!v || "Required"];
const form = ref<any|null>(null);
const error = ref(false);

const user = ref({
  login: "",
  password: "",
});
const login = async () => {
  try {
    const { data } = await axios.post("/api/user/login", {
      email: user.value.login,
      password: user.value.password,
    });
    if (data.status === "ok") {
      store.commit("setUser", data.user);
      store.commit("setToken", data.token);
      checkToken()
      router.push("/")
    }else{
      Object.assign(user.value, {
        login: "",
        password: "",
      })
      error.value = true
    }
  } catch (err) {
    error.value = true
  }
};
const validate = async () => {
  const { valid } = await form.value?.validate();
  if (valid) login();
};
</script>