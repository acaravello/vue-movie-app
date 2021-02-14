import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tv-series',
    name: "TvSeries",
    component: () => import('../views/TvSeries.vue')
  },
  {
    path: '/people',
    name: 'People',
    component: () => import('../views/People.vue')
  },
  {
    path: '/search',
    name: "Seearch",
    component: () => import('../views/Search.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import ('../views/Detail.vue')
  },
  {
    path: '/series-detail',
    name: 'SeriesDetail',
    component: () => import ('../views/TvDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return {x: 0, y: 0}
  }
})

export default router
