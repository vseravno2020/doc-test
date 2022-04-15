<template>
  <div id="app">
    <component :is="layout" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Default from '@/layouts/defaultLayout.vue'
import './assets/scss/main.scss'

export default Vue.extend({
  name: 'app',
  components: {
    'default-layout': Default
  },
  computed: {
    layout (): string {
      return 'default-layout'
    },
  },
})
</script>

<style>

</style>
