import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { defineCustomElements } from '@ionic/pwa-elements/loader'

defineCustomElements(window)

createApp(App).mount('#app')