import {createApp} from 'vue'
import App from './App.vue'
//importer bootstrap des dépendances
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
//importer router index.js
import router from './router'


// Empeche l'user non connecté d'accèder à la page allArticles
router.beforeEach((to, from, next) => {
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
  });

createApp(App).use(router).mount('#app')


