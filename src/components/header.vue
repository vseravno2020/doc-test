<template>
  <div class="header">
    <nav class="header__nav">
      <router-link
        class="header__item"
        to="/"
      >
        Каталог
      </router-link>
      <router-link
        class="header__item"
        to="/favorites"
      >
        Избранное
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'default-header'
})
</script>

<style lang="scss" scoped>
  .header{
    width: 100%;
    height: auto;
    &__nav{
      display: grid;
      grid-template-columns: repeat(2,1fr);
      gap:8px;
    }
    &__item{
      text-align: center;
      padding: 16px 32px;
      font-size: 18px;
      font-weight: 400;
      line-height: 23px;
      text-decoration: none;
      color: $main-text;
      transition: .3s all;
      &:hover{
        text-decoration: none;
        cursor: pointer;
        background: $head-back-hover;
        color:$head-text-hover
      }
      &:active{
        text-decoration: none;
        color: $main-text;
      }
      &-active{
        background: $head-back-hover;
        color:$head-text-hover
      }
    }
  }
</style>
