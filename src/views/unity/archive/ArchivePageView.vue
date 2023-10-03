<template>
  <main class="archive-page container">
    <div class="archive-page__inner-wrapper transparent-page-wrapper">
      <bread-crumbs ref="breadcrumbs" />
      <h1 class="archive-page__title page-title">Архив журнала</h1>
      <div class="archive-page__cards grid-cards-template">
        <hoverable-card
          v-for="(card, index) in $options.cards"
          :key="`archive-page-${index}`"
          :data="card"
          :index="index"
          :type="$options.type"
          :mods="$options.mods"
        ></hoverable-card>
      </div>
    </div>
    <partners-block />
  </main>
</template>

<script>
import PartnersBlock from '@/blocks/PartnersBlock.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import HoverableCard from '@/components/HoverableCard.vue';

export default {
  name: 'ArchivePageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
    HoverableCard,
  },
  data() {
    return {};
  },
  cards: [
    {
      title: 'Журналы',
      link: '/unity/archive/journals',
      img: 'archive/1.png',
    },
    {
      title: 'Сборники',
      link: '/unity/archive/collections',
      img: 'archive/2.png',
    },
    {
      title: 'Требования к авторам',
      link: '/unity/archive/requirements',
      img: 'archive/3.png',
    },
    {
      title: 'Редколлегия',
      link: '/unity/archive/editors',
      img: 'archive/4.png',
    },
  ],
  type: 'archive',
  mods: ['archive'],
  mounted() {
    document.title = `${process.env.VUE_APP_TITLE} - Архив журналов`;
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss">
.archive-page {
  &__title {
    &:before {
      top: -3px;
      background: $green;
    }
  }
}
</style>
