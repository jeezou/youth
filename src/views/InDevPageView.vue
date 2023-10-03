<template>
  <main class="in-dev-page container">
    <div class="in-dev-page__inner-wrapper common-page-wrapper">
      <img src="@/assets/images/in-dev.png" alt="" class="in-dev-page__image" />
      <div class="in-dev-page__text">
        Приносим свои извинения, но страница находится в разработке
      </div>
      <div @click="$router.go(-1)" class="in-dev-page__to-main ui-btn">Вернуться назад</div>
    </div>
    <partners-block />
  </main>
</template>

<script>
import PartnersBlock from '@/blocks/PartnersBlock.vue';

export default {
  name: 'InDevPageView',
  components: { PartnersBlock },
  props: {},
};
</script>

<style lang="scss">
.in-dev-page {
  &__image {
    margin: 70px 0 40px;
    width: 50%;
  }

  &__text {
    font-weight: 600;
    font-size: 24px;
    line-height: 38px;
    margin-bottom: 40px;
  }

  &__to-main {
    width: 210px;
    margin: 0 auto;
    margin-bottom: 80px;

    text-decoration: none;

    &:hover {
      color: $white;
    }
  }
}
</style>
