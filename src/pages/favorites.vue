<template>
  <div class="favorites">
    <empty-img
      v-if="!images.length"
      class="favorites__empty"
    />
    <gallery-imgs
      v-else
      class="favorites__gallery"
      :imgs="images"
      :mode="'static'"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import gallery from "@/components/app/gallery.vue";
import emptyImg from "@/components/app/empty-img.vue";
import {eventBus} from "@/main";
export default Vue.extend({
  name: "my-favorites",
  components:{
    'gallery-imgs':gallery,
    'empty-img':emptyImg
  },
  data (){
    return{
      images: [] as Array<string>,
      deletedImgId: '' as string
    }
  },
  watch:{
    deletedImgId:{
      handler (value):void{
       if(value){
         this.images.map((item) => {
           if(item.url === this.deletedImgId){
             item.liked = false
             this.images.splice(this.images.findIndex(item => item.url === this.deletedImgId),1)
             this.deletedImgId = ''
           }
         })
         localStorage.setItem('favorites', JSON.stringify(this.images))
       }
      }
    }
  },
  mounted ():void {
    this.images = JSON.parse(localStorage.getItem('favorites'))
  },
  created () {
    eventBus.$on('deleteFavorites', (data) => {
      this.deletedImgId = data
    })
  }
})
</script>

<style lang="scss" scoped>
.favorites{
  margin-top: 56px;
  display: grid;
  grid-template: "a" 0.75fr
                 "b" 1fr
                 "c" 1fr;
  &__empty{
    grid-area: b;
  }
  &__gallery{
    margin: 0 auto;
  }
}
</style>
