<template>
  <div
    class="item-list"
    :class="classType"
    @click="handler"
  >
    <img
      :src="isOpen"
      :alt="icon"
      class="item-list__icon"
    >
    <p
      class="item-list__text-title"
      :class="{textType}"
    >
      {{ text }}
    </p>
  </div>


  <!--    <template v-if="subtitle">-->
  <!--      <item-list-->
  <!--        v-for="album in albums"-->
  <!--        :id="album.id"-->
  <!--        :key="album.id"-->
  <!--        :text="album.title"-->
  <!--        :gallery="toggle"-->
  <!--        :subtitle-style="true"-->
  <!--        @toggleGal="data => toggle = data"-->
  <!--      />-->
  <!--    </template>-->
  <!--    <template v-if="gallery">-->
  <!--      <gallery-imgs-->
  <!--        class="item-list-gallery"-->
  <!--        :imgs="photos"-->
  <!--        :is-text="false"-->
  <!--      />-->
  <!--    </template>-->
</template>

<script lang="ts">
import Vue from 'vue'
import gallery from "@/components/app/gallery.vue";
import {getData} from "@/api/rest";
import {eventBus} from "@/main";
export default Vue.extend({
  name: "item-list",
  // components:{
  //   'gallery-imgs':gallery
  // },
  props:{
    id:{
      required: true,
      type: Number,
    },
    text: {
      required: true,
      type: String
    },
    subtitle:{
      default: false,
      type: Boolean,
    },
    gallery:{
      default: false,
      type: Boolean,
    },
    subtitleStyle:{
      default: false,
      type: Boolean
    },
  },
  data (){
    return{
      icon: 0 as number,
      toggle: false as boolean,
      albums: null as Array<string>,
      photos: null as Array<string>,
    }
  },
  computed: {
    isOpen ():string{
      return require(this.icon ? '@/assets/img/icons/minus.svg' : '@/assets/img/icons/plus.svg')
    },
    textType ():string{
      return this.subtitleStyle ? 'item-list__text-subtitle' : 'item-list__text-title'
    },
    classType ():string {
      return this.subtitleStyle ? 'item-list-subtitle' : ''
    },
  },
  methods:{
   async handler (): Promise<void>{
      try{
        if(!this.subtitle) {
          console.log('zapros2')
          this.icon = 1
          this.albums = await getData('albums',{userId:this.id})
          this.$emit('toggleSub',this.albums)
        } else {
          this.$emit('toggleSub',false)
          this.icon = 0
        }
        if (!this.gallery) {
          const images = await getData('photos', {albumId: this.id})
          console.log('zapros1')
          this.photos = images.map(item => {
            if (this.$root.localFavorites) {
              if (this.localFavorites.findIndex(elem => elem.id === item.id) > -1) {
                item.liked = true;
              } else {
                item.liked = false
              }
            } else {
              item.liked = false
            }
            return item
          })
          eventBus.$emit('getPhotos',this.photos)
          this.$emit('toggleGal',true)
        } else {
          this.$emit('toggleGal',false)
        }
      } catch (e){
        console.log(e + 'albums/photos')
      }
    },
  }
})
</script>

<style lang="scss" scoped>
  .item-list{
    display: flex;
    align-items: center;
    padding: 24px 0;
    user-select: none;
    &:hover{
      cursor: pointer;
    }
    &__icon{
      margin-right: 24px;
    }
    &__text{
      color:$main-text;
      &-title{
        font-size: 22px;
        font-weight: 500;
        line-height: 29px;
      }
      &-subtitle{
        font-size: 18px;
        font-weight: 400;
        line-height: 23px;
      }
    }
    &-subtitle{
      margin-left: 56px;
    }
    &-gallery{
      margin: 32px auto 0;
    }
  }

</style>
