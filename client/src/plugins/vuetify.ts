import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labcomponents from 'vuetify/labs/components'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.min.css'

export default createVuetify({
    ssr: true,
    components: {
        ...components,
        ...labcomponents
    },
    directives,
    display: {
        mobileBreakpoint: "md"
    },
    theme: {
        defaultTheme: localStorage.getItem('dashboard-theme') || 'dark', //
        themes: {
            dark: {
                colors: {
                    primary: '#2f7beb',
                    // background: '#121212',
                    // surface: '#212121'
                }
            },
            
            light: {
                colors: {
                    primary: '#2f7beb',
                    background: '#eef0f2',
                    surface: '#ffffff',
                    surface_1: '#ffffff'
                }
            }
        }
    }
})