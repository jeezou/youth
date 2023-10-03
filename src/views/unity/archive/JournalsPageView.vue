<template>
  <main class="journals-page container">
    <div class="journals-page__inner-wrapper transparent-page-wrapper">
      <bread-crumbs ref="breadcrumbs" />
      <h1 class="journals-page__title page-title">Журналы</h1>
      <div class="journals-page__cards grid-cards-template">
        <hoverable-card
          v-for="(card, index) in cards"
          :key="`journals-page-${index}`"
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
    return {
      cards: [],
    };
  },
  type: 'journals',
  mods: ['journals'],
  mounted() {
    this.getJournals();
    document.title = `${process.env.VUE_APP_TITLE} - Журналы`;
  },
  methods: {
    getJournals() {
      this.$axios.get(`https://sportunros.ru/wp-json/wp/v2/posts/564`).then((response) => {
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
.gratitude-page {
  &__title {
    &:before {
      top: -3px;
      background: $green;
    }
  }
}
</style>
