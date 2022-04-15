<template>
  <div
    class="primary"
    :class="{'stop-scrolling': isModalVisible }"
  >
    <div class="primary__wrap">
      <header class="primary__header">
        <my-header />
      </header>
      <main class="primary__content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import header from "@/components/header.vue";
import {eventBus} from "@/main";
export default Vue.extend({
  name: 'default-layout',
  components: {
    'my-header':header,
  },
  data (){
    return{
      isModalVisible: false as boolean
    }
  },
  created () {
    eventBus.$on('isModalVisible', (data) => {
      this.isModalVisible = data
    })
  },
})
</script>

<style lang="scss" scoped>
  .primary{
    overflow: hidden;
    min-height: 100vh;
    &__wrap{
      width: 100%;
      max-width: 744px;
      margin: 0 auto;
    }
  }
  .stop-scrolling {
    overflow: hidden;
    height: 100vh;
  }
</style>
