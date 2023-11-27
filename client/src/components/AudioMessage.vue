<template>
    <div class="w-100 d-flex flex-column">
        <div class="d-flex">
            <v-btn size="45" rounded class="mr-2 mt-1" @click="playing(audio as any)" variant="tonal">
                <v-icon>mdi-{{paused?'play':'pause'}}</v-icon>
            </v-btn>
            <div class="text-caption text-gray audio-text-width pl-2 mt-1">
                {{ fileName || audio?.toString().split('/')[3] }}
                <div class="text-caption text-gray">{{ fileSize }}</div>
            </div>
        </div>
        <v-slider @update:modelValue="setTime" hide-details :model-value="time" thumb-size="12" track-size="3" rounded tick-size="4" :color="prcolor" height="4"></v-slider>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps({
    audio: String,
    prcolor: String,
    fileName: String,
    fileSize: String,
})

const { media } = store.getters
const time = ref(0)
const paused = ref(true)

const playing = (audio: string) => {
    if(media.src !== audio) store.commit('play', audio)
    if(media.paused) media.play()
    else if(!media.paused) media.pause()
    paused.value = media.paused
}
const setTime = (t: number) => {
    if(media.src && media.src === props.audio)
    media.currentTime = media.duration * t / 100;
}

if(media.src === props.audio) paused.value = media.paused;

onMounted(() => {
    media.addEventListener('timeupdate', (e: any) => {
        if(media.src === props.audio) {
            const {duration, currentTime} = e.srcElement;
            time.value = (currentTime / duration) * 100;
        }
    })
    media.addEventListener('ended', () => {
        paused.value = true
        time.value = 0
    })
    media.addEventListener('play', () => {
        if(media.src !== props.audio) {
            paused.value = true
            time.value = 0
        }
    })
})
</script>

<style>
.audio-text-width {
    width: 180px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>