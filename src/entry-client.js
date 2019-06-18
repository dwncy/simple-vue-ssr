import Vue from 'vue'
import { createApp } from './app'

const { app, router, store } = createApp()

// https://router.vuejs.org/guide/advanced/data-fetching.html
// fetching data has 2 options
// before navigation (beforeResolve and beforeRouteUpdate) or after navigation (created)

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate')
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    console.log('beforeResolve')
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    // this function checked is baseurl change
    // for ex. /user/:id to /item -> true
    // /user/:id to /user/:id -> false
    // then we need to use beforeRouteUpdae to handle when component param change
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        next()
      })
      .catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})
