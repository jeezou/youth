<template>
  <main class="activity-page container">
    <div class="activity-page__inner-wrapper common-page-wrapper">
      <bread-crumbs ref="breadcrumbs" />
      <h1 class="activity-page__title" v-html="title" />
      <img :src="introImg" alt="" class="activity-page__intro-img" v-if="introImg" />
      <div class="activity-page__content wp-html-content" v-html="content" v-if="content" />
    </div>

    <partners-block />
  </main>
</template>

<script>
import PartnersBlock from '@/blocks/PartnersBlock.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

export default {
  name: 'ActivityPageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
  },
  data() {
    return {
      content: null,
      introImg: null,
      title: null,
    };
  },
  mounted() {
    document.title = `${process.env.VUE_APP_TITLE} - Деятельность`;

    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get(`https://sportunros.ru/wp-json/wp/v2/posts/1535`)
        .then((response) => {
          this.title = response.data.title.rendered;
          this.content = response.data.acf.text;
          this.introImg = response.data.acf.photo.url;
        })
        .catch((e) => console.error(e));
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.activity-page {
  text-align: left;

  &__title {
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    text-transform: uppercase;
    margin: 16px 0 40px;
  }

  &__intro-img {
    width: 100%;
    margin-bottom: 40px;
  }

  &__subtitle {
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;
    text-transform: uppercase;
    margin-bottom: 32px;
  }

  &__par {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $par;
  }

  &__subsubtitle {
    margin-top: 40px;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    text-transform: uppercase;
    margin-bottom: 32px;
  }

  &__list-item {
    padding-left: 24px;
    position: relative;
    color: $par;
    font-weight: 400;
    font-size: 16px;
    line-height: 32px;
    margin-bottom: 32px;
    &:before {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      position: absolute;
      top: 14px;
      left: 9px;
      background: #70738a;
    }
  }
}
</style>
