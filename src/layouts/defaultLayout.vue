<template>
  <div class="primary">
    <div class="primary__wrap">
      <div class="primary__header">
        <h1>header</h1>
      </div>
      <div class="primary__content">
        <h2>content</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: 'default-layout',
})
</script>

<style lang="scss" scoped>
  .primary{
    overflow: hidden;
    min-height: 100vh;
  }
</style>
