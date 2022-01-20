import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import listarUsuario from '../components/ListarUsuario.vue'
import login from '../components/Login.vue'
import cambiarPassword from '../components/CambiarPassword.vue'
import recuperarPassword from '../components/RecuperarPassword.vue'
import Categoria from '../components/Categoria.vue'
import Productos from '../components/Productos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/listarUsuario',
    name: 'listarUsuario',
    component: listarUsuario,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/cambiarPassword',
    name: 'cambiarPassword',
    component: cambiarPassword,
  },
  {
    path: '/recuperarPassword',
    name: 'recuperarPassword',
    component: recuperarPassword,
  },
  {
    path: '/Categoria',
    name: 'Categoria',
    component: Categoria
  },
  {
    path: '/Productos',
    name: 'Productos',
    component: Productos
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
