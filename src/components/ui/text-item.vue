<template>
  <div
    class="text-item"
    :class="classType"
  >
    <div
      class="text-item__main"
      @click="handler"
    >
      <img
        :src="isOpen"
        :alt="icon"
        class="text-item__icon"
      >
      <p
        class="text-item__text-title"
        :class="{textType}"
      >
        {{ text }}
      </p>
    </div>
    <base-loader v-if="isLoading" />
    <base-fail v-if="isFail" />
    <slot class="text-item__content" />
    <gallery-imgs
      :class="{'text-item__gallery':gallery.length}"
      :imgs="gallery"
      :mode="'hover'"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {getData} from "@/api/rest";
import {IMethods} from "@/types/interfaces";
import {eventBus} from "@/main";
import gallery from "@/components/app/gallery.vue";
import baseLoader from "@/components/widgets/base-loader.vue";
import BaseFail from "@/components/widgets/base-fail.vue";
export default Vue.extend({
  name: "text-item",
  components:{
    BaseFail,
    'gallery-imgs':gallery,
    baseLoader
  },
  props:{
    id:{
      required: true,
      type: Number,
    },
    method:{
      required: true,
      type: Object as () => IMethods
    },
    text: {
      required: true,
      type: String
    },
    isSubtitle:{
      default: false,
      type: Boolean,
    },
  },
  data (){
    return{
      icon: 0 as number,
      gallery: [] as Array<string>,
      isLoading: false as boolean,
      isFail: false as boolean
    }
  },
  computed: {
    isOpen ():string{
      return require(this.icon ? '@/assets/img/icons/minus.svg' : '@/assets/img/icons/plus.svg')
    },
    textType ():string{
      return this.isSubtitle ? 'text-item__text-subtitle' : 'text-item__text-title'
    },
    classType ():string{
      return this.isSubtitle? 'text-item-subtitle' : ''
    },
  },
  methods:{
    async handler (): Promise<void> {
      this.isFail = false
      try{
        this.icon = this.icon ? 0 : 1
        if(this.icon && !this.isSubtitle){
          this.isLoading = true;
          this.$emit('getData',await getData(this.method.name,{[this.method.payload] : this.id}))
          this.isLoading = false;
        } else if(this.icon && this.isSubtitle) {
          this.isLoading = true;
            const photos = await getData(this.method.name,{[this.method.payload] : this.id})
            this.setLikes(photos)
          this.isLoading = false;
        } else {
          this.$emit('getData',[])
          this.gallery = []
        }
      } catch (e){
        this.isLoading = false;
        this.isFail = true
        console.log(e + 'textItem')
      }
    },
    setLikes (photos) {
      this.gallery = photos.map(item => {
        if (JSON.parse(localStorage.getItem('favorites'))) {
          if (JSON.parse(localStorage.getItem('favorites')).findIndex(elem => elem.id === item.id) > -1) {
            item.liked = true;
          } else {
            item.liked = false
          }
        } else {
          item.liked = false
        }
        return item
      })
      eventBus.$emit('getPhotos',this.gallery)
    }
  }
})
</script>

<style lang="scss" scoped>
  .text-item{
    position:relative;
    &__main{
      display: flex;
      align-items: center;
      padding: 24px 0;
      user-select: none;
    }
    &__content{
      position: absolute;
    }
    &__gallery{
      margin: 32px auto 0;
    }
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
        z-index: -100;
      }
      &-subtitle{
        font-size: 18px;
        font-weight: 400;
        line-height: 23px;
        z-index: 100;
      }
    }
    &-subtitle{
      padding-left: 56px;
    }
  }
</style>
