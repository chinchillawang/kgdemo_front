import Vue from 'vue'
import Router from 'vue-router'
import Canvas from '@/components/Canvas'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Home from '@/components/home/Home'
import PatentList from '@/components/patentDisplay/PatentList'
import PatentKG from '@/components/patentDisplay/PatentKG'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/canvas',
      name: 'Canvas',
      component: Canvas
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/patent_list',
          name: 'PatentList',
          component: PatentList
        },
        {
          path: '/patent_kg',
          name: 'PatentKG',
          component: PatentKG
        }
      ]
    }
  ]
})
