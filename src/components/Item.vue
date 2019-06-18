<!-- Item.vue -->
<template>
  <div v-if="item">{{ item }}</div>
  <div v-else>...</div>
</template>

<script>
export default {
  computed: {
    // display the item from store state.
    item () {
      return this.$store.state.items[this.$route.params.id]
    }
  },

  // Server-side only
  // This is serve in vue version 2.6
  // This will be called by the server renderer automatically
  serverPrefetch () {
    // return the Promise from the action
    // so that the component waits before rendering
    return this.fetchItem()
  },

  // Client-side only
  mounted () {
    // If we didn't already do it on the server
    // we fetch the item (will first show the loading text)
    if (!this.item) {
      this.fetchItem()
    }
  },
  // beforeRouteLeave (to, from, next) {
  //   console.log('beforeRouteLeave')
  //   this.$store.dispatch('invalidateItem', from.params.id)
  //   next()
  //   // called when the route that renders this component is about to
  //   // be navigated away from.
  //   // has access to `this` component instance.
  // },

  methods: {
    fetchItem () {
      // return the Promise from the action
      return this.$store.dispatch('fetchItem', this.$route.params.id)
    }
  }
}
</script>
