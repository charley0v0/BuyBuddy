import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

import '@/assets/font/stylesheet.css'; 
import '@/assets/style/style.scss'
import 'element-plus/dist/index.css'
import '@/assets/style/custom_origin.scss'
import '@/assets/style/validateIcon.scss';

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app')
