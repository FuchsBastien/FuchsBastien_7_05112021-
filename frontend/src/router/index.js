import { createRouter, createWebHashHistory } from 'vue-router'
import Signup from '../components/Signup.vue'
import PasswordForgot from '../components/PasswordForgot.vue'
import SignupSuccess from '../components/SignupSuccess.vue'
import Login from '../components/Login.vue'
import AllArticles from '../views/AllArticles.vue'
import OneArticle from '../components/OneArticle.vue'
import Account from '../components/Account.vue'
import AccountDelete from '../components/AccountDelete.vue'
import AllAccounts from '../components/AllAccounts.vue'

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
  path: '/contact',
  name: 'passwordForgot',
  component: PasswordForgot
  },


  {
    path: '/articles',
    name: 'allArticles',
    component: AllArticles
  },

  {
    path: '/articles/:id',
    name: 'oneArticle',
    component: OneArticle
  },

  {
    path: '/account',
    name: 'account',
    component: Account
  },

  {
    path: '/delete',
    name: 'accountDelete',
    component: AccountDelete
  },

  {
    path: '/accounts/:id',
    name: 'accounts',
    component: AllAccounts
  },



]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
