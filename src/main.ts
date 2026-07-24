import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n'

// global recovered styles for the features-based UI
import './components/features/styles.css'

createApp(App).use(i18n).mount('#app')
