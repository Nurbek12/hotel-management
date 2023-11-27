<template>
  <v-overlay persistent :model-value="!online" class="align-center justify-center">
      <v-sheet rounded width="200" height="100" class="d-flex align-center pl-5">
        <v-progress-circular color="primary" indeterminate width="6" size="50"></v-progress-circular>
        <div class="connection-animation ml-3">{{ t("connection_loader_text") }}</div>
      </v-sheet>
    </v-overlay>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const online = ref(false)
const { t } = useI18n()

onMounted(() => {
  if(window.navigator.onLine){
    online.value = true
  }
  window.addEventListener('online', async () => {
    // online.value = false
    // await fetch('http://localhost:5000')
    online.value = true
  });
  window.addEventListener('offline', () => online.value = false);
})
</script>

<style>
.connection-animation {
    position: relative;
}
.connection-animation::after {
    position: relative;
    content: "";
    transition: .3s;
    animation: 1s connection_dots ease-out infinite;
}
@keyframes connection_dots {
    0% {
        content: ".";
        opacity: 1;
    }
    40% {
        content: "..";
    }
    80% {
        content: "...";
        opacity: 1;
    }
    100%{
        content: "...";
        opacity: 0;
    }

}
</style>