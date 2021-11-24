import {createApp} from 'vue'
import App from './App.vue'
//importer bootstrap des dépendances
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
//importer router index.js
import router from './router'

createApp(App).use(router).mount('#app')


