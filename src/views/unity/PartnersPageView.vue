<template>
  <main class="partners-page container transparent-page-wrapper">
    <bread-crumbs ref="breadcrumbs" />
    <div class="partners-page__title page-title">Партнеры</div>
    <partners-block :collapsed="false" />
  </main>
</template>

<script>
import PartnersBlock from '@/blocks/PartnersBlock.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

export default {
  name: 'PartnersPageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
  },
  data() {
    return {};
  },
  mounted() {
    document.title = `${process.env.VUE_APP_TITLE} - Партнеры`;
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss">
.partners-page {
  .partners {
    margin-top: 0;
    padding-top: 0;
    border-top: none;

    &__header {
      display: none;
    }
  }

  &__title {
    &:before {
      top: -2px;
      background: $green;
    }
  }
}
</style>
