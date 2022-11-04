import { createApp } from 'vue'
import Media from './Media.vue'
import './index.css'
import router from './router'
import store from './store'

const app = createApp(Media)

app.use(router)
app.use(store)

app.mount('#app')
