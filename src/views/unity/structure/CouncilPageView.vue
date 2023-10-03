<template>
  <main class="council-page container">
    <div class="council-page__inner-wrapper transparent-page-wrapper">
      <bread-crumbs ref="breadcrumbs" />
      <h1 class="council-page__title page-title">Попечительский совет</h1>
      <div class="council-page__content grid-cards-template">
        <div
          class="council-page__card"
          v-for="(card, index) in cards"
          :key="`council-page-card-${index}`"
        >
          <div class="council-page__card-image">
            <img :src="require(`@/assets/images/council/${card.img}`)" alt="" />
          </div>
          <div class="council-page__card-name">{{ card.name }}</div>
          <div class="council-page__card-post" v-html="card.post" />
        </div>
      </div>
    </div>
    <partners-block />
  </main>
</template>

<script>
import PartnersBlock from '@/blocks/PartnersBlock.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

export default {
  name: 'BureauPageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
  },
  data() {
    return {
      cards: [
        {
          img: '1.png',
          name: 'Абаев Алан Михайлович ',
          post: 'Председатель ОГФСО</br>«Юность России»',
        },
        {
          img: '2.png',
          name: 'Королев Николай Николаевич',
          post: 'Заместитель</br>председателя Комитета',
        },
        {
          img: '3.png',
          name: 'Лисов Олег Александрович',
          post: 'Заместитель</br>председателя Комитета',
        },
        {
          img: '4.png',
          name: 'Шихов Владимир Павлинович',
          post: 'Заместитель председателя Комитета на общественных началах',
        },
        {
          img: '5.png',
          name: 'Беляев Владимир Игоревич',
          post: 'Заместитель председателя Комитета на общественных началах',
        },
      ],
    };
  },
  mounted() {
    document.title = `${process.env.VUE_APP_TITLE} - Попечительский совет`;
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss">
.council-page {
  &__title {
    &:before {
      background: $green;
      top: -2px;
    }
  }

  &__card {
    text-align: left;
    background: $white;
    border-top-right-radius: 8px;
    overflow: hidden;
    &-image {
      border-radius: 0 0 48px 0;
      img {
        width: 100%;
      }
    }

    &-name {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      margin: 24px 16px 16px;
    }

    &-post {
      font-weight: 600;
      font-size: 14px;
      line-height: 24px;
      margin: 0 16px 24px;
      display: flex;
      align-items: flex-end;
    }
  }
}
</style>
