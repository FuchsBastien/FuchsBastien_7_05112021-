import {createApp} from 'vue'
//importer le composant principal App
import App from './App.vue'
//importer router index.js
import router from './router'
//importer bootstrap des dépendances
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


// Empeche l'user non connecté d'accèder à la page allArticles
/*router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth){
      // Vérifier si l'user est connecté ou pas
      if(localStorage.getItem('token') == null) {
        next({
          name: 'login',
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });*/

//l'application (App.vue) qui utilise les routes des composants (router index.js) sera lié à la div app de index.html (#app)
createApp(App).use(router).mount('#app')


