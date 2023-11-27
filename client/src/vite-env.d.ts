/// <reference types="vite/client" />
declare module 'lodash'

declare module '*.vue' {
    import { defineComponent } from 'vue'
    export default defineComponent
}