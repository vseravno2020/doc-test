<template>
  <base-modal-box>
    {{ options.img }}
  </base-modal-box>
</template>

<script lang="ts">
import Vue from "vue";
import BaseModalBox from "@/components/widgets/baseModalBox.vue";
export default Vue.extend ({
  name: "picture-modal",
  components: {
    'base-modal-box': BaseModalBox
  },
});
</script>

<style scoped>

</style>
