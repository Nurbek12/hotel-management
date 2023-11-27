<template>
  <v-container fluid>
    <v-card flat width="100%">
      <v-card-title>{{ t('translator.page_title') }}</v-card-title>
      <v-card-text class="d-flex justify-center align-center">
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-select transition="fade-transition" density="compact" hide-details variant="outlined" flat :items="languages" v-model="lang1" item-title="title" item-value="lang"></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-select transition="fade-transition" density="compact" hide-details variant="outlined" :items="languages" v-model="lang2" item-title="title" item-value="lang"></v-select>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea rows="7" hide-details v-model="speakText"
              variant="outlined" no-resize @input="textToTextTranslate"
              :placeholder="t('translator.placeholder_1')">
              <template #append-inner>
                <v-btn size="40" flat :color="isSpeech?'red':'primary'" @click.stop="handleScpeech">
                  <v-icon size="25">mdi-{{!isSpeech?'microphone':'pause'}}</v-icon>
                </v-btn>
              </template>
            </v-textarea>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea :loading="loading" rows="7" :model-value="translateText" hide-details variant="outlined" no-resize :placeholder="t('translator.placeholder_2')" readonly>
              <template #append-inner>
                <v-btn flat size="40" :disabled="!translateText" @click.stop="speechToText" color="primary" class="ml-2">
                  <v-icon size="25">mdi-volume-high</v-icon>
                </v-btn>
              </template>
            </v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { debounce } from 'lodash'
import { translate } from '../api/others'

const { locale, t } = useI18n()
const isSpeech = ref(false)
const speakText = ref("")
const translateText = ref("")
const loading = ref(false)

const lang1 = ref(localStorage.getItem('dashboard-lang') || 'ru')
const lang2 = ref('en')

const languages = [
  { title: "English", lang: "en" },
  { title: "Русский", lang: "ru" },
  { title: "O'zbekcha", lang: "uz" },
  { title: "한국어", lang: "ko" },
  { title: "تيلي عربي", lang: "ar" }
]

const handleScpeech = () => {
  if(isSpeech.value) {
    isSpeech.value = false
  } else {
    isSpeech.value = true
    recordVoice()
  }
}

declare global {
  interface Window {
    webkitSpeechRecognition: any
  }
}

const recordVoice = () => {
  // if(window.webkitSpeechRecognition) return
  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = lang1.value;
  recognition.onresult = (event: any) => {
    const speechResult = event.results[0][0].transcript;
    speakText.value += speechResult + ' ' || ""
    translateSpeech(speechResult);
    if(isSpeech.value) recordVoice()
  };

  if(isSpeech.value) recognition.start();
}

const translateSpeech = async (text: any) => {
  if(!text.trim()) return translateText.value = ''
  loading.value = true
  try {
    const response = await translate(`${lang1.value}|${lang2.value}`, text);
    loading.value = false
    translateText.value = response.data.responseData.translatedText;
  } catch (error) {
    translateText.value = text + " [" + {ru: "Сетевое соединение потеряно", en: "Connection failed with servise", uz: "Tarmoq bilan aloqa uzildi"}[locale.value] + "...]"
  }
}

const textToTextTranslate = debounce((e: any) => {
  const text = e.target.value

  translateSpeech(text)
}, 500)

const speechToText = async () => {
  // if ('speechSynthesis' in window) {
  //   try {
  //     const voices = await setSpeech();
  //     window.speechSynthesis.cancel();
  //     if (voices.length > 0) {
  //       const utterance = new SpeechSynthesisUtterance();
  //       utterance.lang = lang1.value
  //       utterance.volume = 1
  //       utterance.voice = voices[1];
  //       utterance.text = translateText.value
  //       window.speechSynthesis.speak(utterance);
  //     } else {
  //       console.error('No speech synthesis voices available.');
  //     }
  //   } catch (error) {
  //     console.error('Error retrieving speech synthesis voices:', error);
  //   }
  // }
  
  function speak(text: any, voice: any, rate: any, pitch: any, volume: any) {
  // create a SpeechSynthesisUtterance to configure the how text to be spoken 
    let speakData = new window.SpeechSynthesisUtterance();
    speakData.volume = volume; // From 0 to 1
    speakData.rate = rate; // From 0.1 to 10
    speakData.pitch = pitch; // From 0 to 2
    speakData.text = text;
    speakData.lang = 'en-US';
    speakData.voice = voice;
    console.log(arguments);
    // pass the SpeechSynthesisUtterance to speechSynthesis.speak to start speaking 
    speechSynthesis.speak(speakData);
  }
  
  if ('speechSynthesis' in window) {
  
    let voices: any = await getVoices();
    let rate = 1, pitch = 2, volume = 1;
    
    speak(translateText.value, voices[0], rate, pitch, volume);
  }else{
    console.log(' Speech Synthesis Not Supported 😞'); 
  }
}

function getVoices() {
  return new Promise(
    function (resolve, _) {
      let synth = window.speechSynthesis;
      let id: any;

      id = setInterval(() => {
        if (synth.getVoices().length !== 0) {
          resolve(synth.getVoices());
          clearInterval(id);
        }
      }, 1000);
    }
  )
}
</script>