<template>
  <div class="news container" :class="{ 'news--main-page': isMainPage }">
    <div class="news__header" v-if="isTitle">
      <h2 class="news__title">{{ title }}</h2>
      <router-link to="/news" class="news__all show-more-link" v-if="collapsed">
        Посмотреть все
      </router-link>
    </div>
    <div class="news__list" v-if="data">
      <card-item
        v-for="(item, index) in data"
        :key="`news-block-item-${index}`"
        :data="item"
        :isLarge="index === 0 ? true : false"
        ref="news-main"
        :path="'/news'"
      ></card-item>
    </div>
    <router-link to="/news" class="news__all-mobile show-more-link" v-if="collapsed">
      Посмотреть все
    </router-link>
  </div>
</template>

<script>
import CardItem from '@/components/CardComponent.vue';

export default {
  name: 'NewsBlock',
  components: {
    CardItem,
  },
  props: {
    title: {
      type: String,
      default: () => 'Новости',
    },
    data: {
      type: Array,
      default: () => [],
    },
    isMainPage: {
      type: Boolean,
      default: () => false,
    },
    isTitle: {
      type: Boolean,
      default: () => true,
    },
    collapsed: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style lang="scss" scoped>
.news {
  padding-top: 40px;
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  &__all-mobile {
    display: none;
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 23px;
    text-transform: uppercase;
    text-align: left;
    line-height: 34px;

    &:before {
      content: '';
      position: relative;
      display: inline-block;
      margin-right: 15px;
      margin-left: 5px;
      width: 10px;
      height: 17px;
      transform: skew(-30deg);
      background: $green;
    }
  }

  &--main-page {
    .news__list {
      grid-template-columns: repeat(4, 1fr);

      > :nth-child(1) {
        grid-column-start: 1;
        grid-column-end: 3;
      }

      > :nth-child(2) {
        grid-column-start: 3;
        grid-column-end: 5;
      }
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;

    > :nth-child(1) {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
}

@media screen and (max-width: 991px) {
  .news {
    &__list {
      grid-template-columns: 1fr;

      > :nth-child(1) {
        grid-column-start: unset;
        grid-column-end: unset;
      }
    }
    &--main-page {
      .news__list {
        gap: 24px;
        grid-template-columns: 1fr 1fr;
        > :nth-child(1) {
          grid-column-start: auto;
          grid-column-end: auto;
        }

        > :nth-child(2) {
          grid-column-start: auto;
          grid-column-end: auto;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .news {
    &__list {
      grid-template-columns: 1fr;
    }
    &--main-page {
      .news__list {
        grid-template-columns: 1fr;
      }
    }

    &__all {
      display: none;
    }

    &__all-mobile {
      display: flex;
      width: fit-content;
      margin-top: 32px;
      text-align: left;
    }
  }
}
</style>

<style lang="scss">
.news {
  &__list {
    > :nth-child(1) {
      &.card-item .card-item__image {
        max-height: 220px;
        object-fit: cover;
      }
    }

    .card-item {
      &__image-wrapper {
        max-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        img {
          object-position: center;
          object-fit: cover;
          height: 100%;
        }
      }
    }
  }

  &--main-page {
    .news__list {
      .card-item--no-img {
        .card-item__image {
          height: 100%;
        }
      }
    }
  }
}
</style>
