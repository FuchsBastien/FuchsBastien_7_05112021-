import { createRouter, createWebHashHistory } from 'vue-router'
import Signup from '../components/Signup.vue'
import SignupSuccess from '../components/SignupSuccess.vue'
import Login from '../components/Login.vue'
import AllArticles from '../views/AllArticles.vue'
import OneArticle from '../components/OneArticle.vue'
import Account from '../components/Account.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },

  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },

  {
    path: '/success',
    name: 'signupSuccess',
    component: SignupSuccess
  },


  {
    path: '/articles',
    name: 'allArticles',
    component: AllArticles
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
