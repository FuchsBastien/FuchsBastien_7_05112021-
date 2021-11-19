import {createApp} from 'vue'
import App from './App.vue'
//importer bootstrap des dépendances
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

/*on crée une instance de vue qui s'appelle bus permettant de gérer les données entre différents composants
qui ne sont pas parents-enfant*/
//export const bus = new createApp()


createApp(App).mount('#app')





/*new Vue ({
    render: h => h(App),

}).$mount ('#app')*/