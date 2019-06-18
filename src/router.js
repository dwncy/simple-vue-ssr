import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Item from './components/Item.vue'
import User from './components/User.vue'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: Home },
      { path: '/about', component: About },
      { path: '/item/:id', component: Item },
      { path: '/user/:id', component: User }
    ]
  })
}
