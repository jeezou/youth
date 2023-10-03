<template>
  <main class="collections-page container">
    <div class="collections-page__inner-wrapper transparent-page-wrapper">
      <bread-crumbs ref="breadcrumbs" />
      <h1 class="collections-page__title page-title">Сборники</h1>
      <div class="collections-page__cards grid-cards-template">
        <hoverable-card
          v-for="(card, index) in cards"
          :key="`collections-page-${index}`"
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
  name: 'CollectionsPageView',
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
  type: 'collections',
  mods: ['collections'],
  mounted() {
    this.getCollections();
    document.title = `${process.env.VUE_APP_TITLE} - Сборники`;
  },
  methods: {
    getCollections() {
      this.$axios.get(`https://sportunros.ru/wp-json/wp/v2/posts/583`).then((response) => {
        const content = document.createElement('div');
        content.innerHTML = response.data.content.rendered;

        content.querySelectorAll('.wp-block-image').forEach((image) => {
          this.cards.push({
            title: image.querySelector('figcaption').textContent,
            link: image.querySelector('a').href,
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
.collections-page {
  &__title {
    &:before {
      top: -2px;
      background: $green;
    }
  }
}
</style>
