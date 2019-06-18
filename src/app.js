import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

// export a factory function for creating fresh app, router and store
// instances
export function createApp () {
  // create router instance
  const router = createRouter()
  const store = createStore()

  // sync so that route state is available as part of the store
  sync(store, router)

  const app = new Vue({
    // inject router into root Vue instance
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
