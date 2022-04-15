<template>
  <div class="catalog">
    <base-loader v-if="isLoading" />
    <base-fail
      v-if="isFail"
      :mode="'column'"
    />
    <my-card
      v-for="user in usersList"
      :key="user.id"
      :item="user"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {getData} from "@/api/rest";
import {eventBus} from "@/main";
import MyCard from "@/components/app/card.vue";
import baseLoader from "@/components/widgets/base-loader.vue";
import BaseFail from "@/components/widgets/base-fail.vue";
import {METHODS_PAYLOAD} from "@/utils/constans";

export default Vue.extend({
  name: 'catalog-page',
  components:{
    BaseFail,
    baseLoader,
    MyCard,
  },
  data (){
    return{
      usersList: null,
      localFavorites: [] as Array<string>,
      photos: null as Array<string>,
      favoriteImgId: '' as string,
      deletedImgId: '' as string,
      isLoading: false as boolean,
      isFail: false as boolean,
      METHODS_PAYLOAD: METHODS_PAYLOAD
    }
  },
  watch:{
    localFavorites:{
      handler ():void{
        localStorage.setItem('favorites', JSON.stringify(this.localFavorites))
      }
    },
    favoriteImgId:{
      handler (value):void {
        if(value){
          this.photos.map((item) => {
            if(item.url === this.favoriteImgId){
              item.liked = true
              this.localFavorites.push(item)
              this.favoriteImgId = ''
            }
          })
        }
      }
    },
    deletedImgId:{
      handler (value):void {
        if(value){
          this.photos.map((item) => {
            if(item.url === this.deletedImgId){
              item.liked = false
              this.localFavorites.splice(this.localFavorites.findIndex(item => item.url === this.deletedImgId),1)
              this.deletedImgId = ''
            }
          })
        }
      }
    }
  },
  created () {
    eventBus.$on('addFavorites', (data) => {
      this.favoriteImgId = data
    })
    eventBus.$on('deleteFavorites', (data) => {
      this.deletedImgId = data
    })
    eventBus.$on('getPhotos', (data) => {
      this.photos = data
    })
  },
  async mounted ():Promise<void> {
    this.isFail = false;
   try{
     this.isLoading = true;
     this.usersList = await getData(this.METHODS_PAYLOAD[2].name,'')
     this.localFavorites = JSON.parse(localStorage.getItem('favorites')) ?? []
     this.isLoading = false;
   } catch (e){
     this.isLoading = false;
     this.isFail = true;
     console.log(e + 'users')
   }
  },
})
</script>

