<template>
  <main class="docs-page container">
    <div class="docs-page__inner-wrapper transparent-page-wrapper">
      <bread-crumbs ref="breadcrumbs" />
      <h1 class="docs-page__title page-title">Документы</h1>
      <div class="docs-page__cards grid-cards-template">
        <hoverable-card
          v-for="(doc, index) in docs"
          :key="`docs-page-${index}`"
          :data="doc"
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
  name: 'DocsPageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
    HoverableCard,
  },
  data() {
    return {
      docs: [],
    };
  },
  type: 'download',
  mods: ['download'],
  mounted() {
    this.getDocs();
    document.title = `${process.env.VUE_APP_TITLE} - Документы`;
  },
  methods: {
    getDocs() {
      this.$axios.get(`https://sportunros.ru/wp-json/wp/v2/posts/555`).then((response) => {
        const content = document.createElement('div');
        content.innerHTML = response.data.content.rendered;

        content.querySelectorAll('.wp-block-file a').forEach((file) => {
          this.docs.push({
            title: file.textContent,
            link: file.href,
          });
        });
      });
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.docs-page {
  &__title {
    &:before {
      top: -3px;
      background: $green;
    }
  }
}
</style>
