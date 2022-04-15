<template>
  <div class="empty-container">
    <img
      src="../../assets/img/empty.png"
      alt="empty"
    >
    <p class="empty-container__title">
      Список избранного пуст
    </p>
    <p class="empty-container__text">
      Добавляйте изображения нажимая на звездочки
    </p>
  </div>
</template>
<script lang="ts">
export default {
  name: "empty-img"
}
</script>

<style lang="scss" scoped>
.empty-container{
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  &__title{
    font-size: 22px;
    font-weight: 700;
    line-height: 29px;
    color: $main-text;
    margin: 32px 0 8px ;
  }
  &__text{
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
    color: $main-text;
  }
}
</style>
