// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './global.css'
import naive from 'naive-ui' 

const app = createApp(App)
app.use(naive)
app.use(router)
app.mount('#app')
