<!-- user.vue -->
<template>
  <div v-if="user">{{ user }}</div>
  <div v-else>...</div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.users[this.$route.params.id]
    }
  },

  asyncData ({ store, route: { params: { id }}}) {
    return store.dispatch('fetchUser', id)
  }
}
</script>
