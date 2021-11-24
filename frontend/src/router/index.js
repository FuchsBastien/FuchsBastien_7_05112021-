import { createRouter, createWebHashHistory } from 'vue-router'
import AllArticles from '../views/AllArticles.vue'
import CreateArticle from '../components/CreateArticles.vue'
import Account from '../components/Account.vue'
import OneArticle from '../components/OneArticle.vue'

const routes = [
  {
    path: '/',
    name: 'AllArticles',
    component: AllArticles
  },
 
  {
    path: '/CreateArticles',
    name: 'CreateArticles',
    component: CreateArticle
  },

  {
    path: '/Account',
    name: 'Account',
    component: Account
  },

  {
    path: '/OneArticle/:id',
    name: 'OneArticle',
    component: OneArticle
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
