import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Assume we have a universal API that returns Promises
// and ignore the implementation details
import { fetchItem, fetchUser } from './api'

export function createStore () {
  return new Vuex.Store({
    // IMPORTANT: state must be a function so the module can be
    // instantiated multiple times
    state: () => ({
      items: {},
      users: {}
    }),

    actions: {
      fetchUser ({ commit }, id) {
        return fetchUser(id).then(user => {
          commit('setUser', { id, user })
        })
      },
      // invalidateItem ({ commit }, id) {
      //   commit('invalidateItem', { id })
      // },
      fetchItem ({ commit }, id) {
        // return the Promise via `store.dispatch()` so that we know
        // when the data has been fetched
        return fetchItem(id).then(item => {
          commit('setItem', { id, item })
        })
      }
    },

    mutations: {
      // invalidateItem(state, { id }) {
      //   Vue.delete(state.items, id)
      // },
      setItem (state, { id, item }) {
        Vue.set(state.items, id, item)
      },
      setUser (state, { id, user }) {
        Vue.set(state.users, id, user)
      }
    }
  })
}
