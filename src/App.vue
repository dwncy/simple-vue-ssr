<template>
  <div id="app">
    <header>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link :to="{ path: `/item/1`}">Item</router-link>
      <router-link :to="{ path: `/user/2`}">User</router-link>
    </header>
    <router-view class="view"></router-view>
  </div>
</template>
