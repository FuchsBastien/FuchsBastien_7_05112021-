//importer les composants
//import Articles from './components/Articles'
//import CreateArticles from './components/CreateArticles'

//exporter tableau  contenant les chemins pour chaque composants
//export default [
  //{path: '/', component: Articles}, 
  //{path: '/CreateArticles', component: CreateArticles}  
//]




import { createWebHistory, createRouter } from "vue-router";
//import Home from "@/views/Home.vue";
//import About from "@/views/About.vue";
import Articles from './components/Articles.vue'
import CreateArticles from './components/CreateArticles.vue'

const routes = [
  {
    path: "/",
    name: "Articles",
    component: Articles,
  },
  {
    path: "/CreateArticles",
    name: "CreateArticles",
    component: CreateArticles,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;