<template>
  <main class="clubs-page container">
    <div class="clubs-page__inner-wrapper transparent-page-wrapper">
      <bread-crumbs ref="breadcrumbs" />
      <div class="page-title">Клубы</div>
      <div class="clubs-page__cards grid-cards-template">
        <hoverable-card
          :type="'unity'"
          :mods="['unity']"
          :index="index"
          :data="card"
          v-for="(card, index) in $options.cards"
          :key="`clubs-page-card-${index}`"
        />
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
  name: 'ClubsPageView',
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
      title: 'Перечень клубов',
      link: 'clubs/list',
      img: 'clubs/1.png',
    },
    {
      title: 'Мероприятия',
      link: 'clubs/events',
      img: 'clubs/2.png',
    },
    {
      title: 'Нормативно-правовое обеспечение',
      link: 'clubs/assurance',
      img: 'clubs/3.png',
    },
  ],
  mounted() {
    document.title = `${process.env.VUE_APP_TITLE} - Клубы`;
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss"></style>
