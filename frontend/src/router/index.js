import { createRouter, createWebHashHistory } from 'vue-router'
import Signup from '../components/Signup.vue'
import SignupSuccess from '../components/SignupSuccess.vue'
import Login from '../components/Login.vue'
import AllArticles from '../views/AllArticles.vue'
import OneArticle from '../components/OneArticle.vue'
import CreateArticle from '../components/CreateArticles.vue'
import Account from '../components/Account.vue'

const routes = [
  {
    path: '/',
    name: 'signup',
    component: Signup
  },

  {
    path: '/signupSuccess',
    name: 'signupSuccess',
    component: SignupSuccess
  },

  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/allArticles',
    name: 'allArticles',
    component: AllArticles
  },
 
  {
    path: '/createArticles',
    name: 'createArticles',
    component: CreateArticle
  },

  {
    path: '/account',
    name: 'account',
    component: Account
  },

  {
    path: '/oneArticle/:id',
    name: 'oneArticle',
    component: OneArticle
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
