<template>
  <div class="gallery">
    <image-card
      v-for="img in imgs"
      :key="img.id"
      :img="img"
      :is-favorite="img.liked"
      :mode="mode"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import imageCard from "@/components/ui/image-card.vue";
export default Vue.extend({
  name: "gallery-imgs",
  components:{
    'image-card':imageCard
  },
  props:{
    imgs:{
      required:true,
      type:Array
    },
    mode:{
      default: 'before',
      type: String
    },
  },
})
</script>

<style lang="scss" scoped>
.gallery{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 534px;
  gap: 42px;
}
</style>
