<template>
  <main class="gratitude-page container">
    <div class="gratitude-page__inner-wrapper transparent-page-wrapper">
      <bread-crumbs ref="breadcrumbs" />
      <h1 class="gratitude-page__title page-title">Благодарности</h1>
      <div class="gratitude-page__cards grid-cards-template">
        <hoverable-card
          v-for="(card, index) in cards"
          :key="`gratitude-page-${index}`"
          :data="card"
          :mods="$options.mods"
          :type="$options.type"
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
  name: 'GratitudePageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
    HoverableCard,
  },
  data() {
    return {
      cards: [],
    };
  },
  cards: [
    {
      title: 'Документ 1',
      img: 'gratitude.jpg',
    },
    {
      title: 'Документ 2',
      img: 'gratitude.jpg',
    },
    {
      title: 'Документ 3',
      img: 'gratitude.jpg',
    },
    {
      title: 'Документ 4',
      img: 'gratitude.jpg',
    },
  ],
  mods: ['gratitude'],
  type: 'gratitude',
  mounted() {
    this.getData();
    document.title = `${process.env.VUE_APP_TITLE} - Благодарности`;
  },
  methods: {
    getData() {
      this.$axios.get(`https://sportunros.ru/wp-json/wp/v2/posts/561`).then((response) => {
        const content = document.createElement('div');
        content.innerHTML = response.data.content.rendered;

        content.querySelectorAll('.wp-block-image').forEach((image) => {
          this.cards.push({
            title: image.querySelector('figcaption').textContent,
            img: image.querySelector('img').src,
          });
        });
      });
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.gratitude-page {
  &__title {
    &:before {
      top: -3px;
      background: $green;
    }
  }
}
</style>
