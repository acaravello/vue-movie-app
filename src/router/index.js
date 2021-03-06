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
  },
  {
    path: '/known-for',
    name: 'KnownFor',
    component: () => import ('../views/KnownForDetail.vue')
  },
  {
    path: '/filmography',
    name: 'Filmography',
    component: () => import ('../views/Filmography.vue')
  },
  {
    path: "/cast",
    name: "Cast",
    component: () => import ("../views/Cast.vue")
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

let firstLoad = true;

router.beforeEach((to, from, next) => {
  if(firstLoad) {
    firstLoad = false;
    next({name: 'Home'})
  } else {
    next();
  }
})

export default router
