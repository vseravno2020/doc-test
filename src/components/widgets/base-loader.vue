<template>
  <div class="loader">
    <div class="loader__wrap">
      <img
        src="../../assets/img/loader.gif"
        alt="loader"
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "base-loader"
})
</script>

<style scoped>
.loader{
  min-height: 250px;
  justify-content: center;
  width: 100%;
  display: flex;
  margin-top: 25%;
}
</style>
