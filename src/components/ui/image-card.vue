<template>
  <div
    class="image-card"
  >
    <div
      class="image-card__wrap"
      @click="showModal"
    >
      <img
        :src="img.url"
        alt=""
        class="image-card__image"
      >
      <img
        :src="isActive"
        alt=""
        class="image-card__star"
        @click="handler"
      >
    </div>
    <div
      v-if="mode === 'hover'"
      class="image-card__hidden"
    >
      <p
        class="image-card__text"
      >
        {{ img.title }}
      </p>
    </div>
    <p
      v-if="mode === 'static'"
      class="image-card__text"
    >
      {{ img.title }}
    </p>
    <base-modal
      v-if="isModalVisible"
      @exitModal="data => isModalVisible = data"
    >
      <img
        :src="img.url"
      >
    </base-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {eventBus} from "@/main";
import baseModal from "@/components/ui/base-modal.vue";
export default Vue.extend({
  name: "image-card",
  components: {
    baseModal
  },
  props:{
    img:{
      type:Object,
      required: true
    },
    isFavorite:{
      type:Boolean,
      required: true
    },
    mode:{
      type: String,
      default: 'hover'
    },
  },
  data (){
    return{
      isLike: false,
      isModalVisible: false
    }
  },
  computed:{
    isActive ():string{
      return require(this.isFavorite ? '@/assets/img/icons/star_active.png' : '@/assets/img/icons/star_empty.png')
    },
  },
  methods:{
    check (data){
      console.log(data)
    },
    addFavorites ():void{
      eventBus.$emit('addFavorites',this.img.url)
    },
    deleteFavorites ():void {
      eventBus.$emit('deleteFavorites',this.img.url)
    },
    handler ():void {
      if(this.isFavorite) this.deleteFavorites();
      else this.addFavorites();
    },
    showModal ():void {
      this.isModalVisible = true
      eventBus.$emit('isModalVisible',this.isModalVisible)
    }
  },
})
</script>

<style lang="scss" scoped>
.image-card{
  position: relative;
  width: 150px;
  height: auto;
  &__image{
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  &__wrap{
    height: 150px;
    position: relative;
  }
  &__star{
    position: absolute;
    top:0;
    right: 0;
    margin:8px 8px 0 0;
  }
  &__text{
    margin-top: 12px;
    color:$img-sub-text;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
  }
  &__hidden{
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    opacity: 0;
    position:absolute;
    width: 100%;
    color:$hover-color;
    background: $hover-bg;
  }
  &:hover .image-card__hidden{
    cursor: pointer;
    opacity: 1;
  }
}
</style>
