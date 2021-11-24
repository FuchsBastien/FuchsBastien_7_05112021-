import {createApp} from 'vue'
import App from './App.vue'
//importer bootstrap des dépendances
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
//importer router index.js
import router from './router'

//importer vue router
//import VueRouter from 'vue-router'
//importer Routes.js
//import Routes from './Routes'

//utiliser vue router
//VueRouter.use (VueRouter)
//variable l'on donne la propriété routes auxquel on fait passer Routes qui fait référence à Routes.js
//const router = new VueRouter (({
//routes :Routes  
//}))


createApp(App).use(router).mount('#app')


