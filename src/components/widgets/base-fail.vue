<template>
  <div class="fail">
    <div
      class="fail__wrap"
      :class="mode ==='row'?'fail__wrap-row' : 'fail__wrap-column'"
    >
      <div>
        <img
          src="../../assets/img/error.png"
          alt="fail"
        >
      </div>
      <div class="fail__description">
        <p class="fail__title">
          Сервер не отвечает
        </p>
        <p class="fail__text">
          Уже работаем над этим
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "base-fail",
  props: {
    mode: {
      default: 'row',
      type: String
    }
  }
})
</script>

<style lang="scss" scoped>
.fail {
  min-height: 250px;
  justify-content: center;
  width: 100%;
  display: flex;
  margin: 15% 0;

  &__title {
    font-size: 22px;
    font-weight: 700;
    line-height: 29px;
    color: $main-text;
    margin: 32px 0 8px;
  }

  &__text {
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
    color: $main-text;
  }

  &__description{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__wrap-column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__wrap-row {
    display: flex;
    align-items: center;
  }
}
</style>
