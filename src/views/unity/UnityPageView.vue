<template>
  <main class="unity-page container">
    <div class="unity-page__inner-wrapper transparent-page-wrapper">
      <bread-crumbs ref="breadcrumbs" />
      <div class="page-title">Об Объединении</div>
      <div class="unity-page__cards grid-cards-template">
        <hoverable-card
          :type="'unity'"
          :mods="['unity']"
          :index="index"
          :data="card"
          v-for="(card, index) in $options.cards"
          :key="`unity-page-card-${index}`"
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
  name: 'UnityPageView',
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
      title: 'Спортивно-массовые мероприятия',
      link: 'unity/calendar',
      img: 'unity/1.png',
    },
    {
      title: 'Фотогалерея',
      link: 'unity/gallery',
      img: 'unity/2.png',
    },
    {
      title: 'Руководство',
      link: 'unity/structure',
      img: 'unity/3.png',
    },
    // {
    //   title: 'Региональные отделения',
    //   link: 'unity/units',
    //   img: 'unity/4.png',
    // },
    {
      title: 'История',
      link: 'unity/history',
      img: 'unity/5.png',
    },
    {
      title: 'Устав объединения',
      link: 'unity/statute',
      img: 'unity/6.png',
    },
    {
      title: 'Деятельность',
      link: 'unity/activity',
      img: 'unity/7.png',
    },
    {
      title: 'Документы',
      link: 'unity/docs',
      img: 'unity/8.png',
    },
    {
      title: 'Партнеры',
      link: 'unity/partners',
      img: 'unity/9.png',
    },
    {
      title: 'Благодарности',
      link: 'unity/gratitude',
      img: 'unity/10.png',
    },
    {
      title: 'Архив журнала',
      link: 'unity/archive',
      img: 'unity/11.png',
    },
  ],
  mounted() {
    document.title = `${process.env.VUE_APP_TITLE} - Об объединении`;
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss"></style>
