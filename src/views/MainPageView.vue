<template>
  <main class="main">
    <div class="main-swiper container" v-if="slides.length">
      <swiper
        :slides-per-view="1"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :loop="true"
        navigation
        :speed="1000"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :modules="modules"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="`mptss_${index}`">
          <a :href="slide.link" target="_blank">
            <img
              :src="windowWidth > 768 ? slide.banner : slide.laptopBanner"
              :alt="`slide banner ${index}`"
              class="slide-banner"
            />
            <div class="slide-tag" v-if="slide.tag">{{ slide.tag }}</div>
          </a>
        </swiper-slide>
        <div class="swiper-progress" ref="main-slider-progress">
          <div class="swiper-progress-loader" ref="main-slider-progress-loader"></div>
          <div class="swiper-progress__counter">
            <div class="swiper-progress__counter-current">
              {{ currentSlide }}
            </div>
            <div class="swiper-progress__counter-sep">/</div>
            <div class="swiper-progress__counter-sum">
              {{ slides.length }}
            </div>
          </div>
        </div>
      </swiper>
    </div>
    <news-block :data="news" :isShowAll="true" :isMainPage="true" :collapsed="true" />
    <div class="events container">
      <div class="events__header">
        <h2 class="events__title">Мероприятия и события</h2>
        <router-link to="/events" class="events__all show-more-link">Посмотреть все</router-link>
      </div>
      <div class="events__grid">
        <div class="direction-filters">
          <div
            class="direction-filters__filter"
            :class="{ 'direction-filters__filter--active': currentTab === 0 }"
            @click="
              currentTab = 0;
              getEvents();
            "
          >
            Международные
          </div>
          <div
            class="direction-filters__filter"
            :class="{ 'direction-filters__filter--active': currentTab === 1 }"
            @click="
              currentTab = 1;
              getEvents();
            "
          >
            Федеральные
          </div>
          <div
            class="direction-filters__filter"
            :class="{ 'direction-filters__filter--active': currentTab === 2 }"
            @click="
              currentTab = 2;
              getEvents();
            "
          >
            Региональные
          </div>
          <div
            class="direction-filters__filter"
            :class="{ 'direction-filters__filter--active': currentTab === 3 }"
            @click="
              currentTab = 3;
              getEvents();
            "
          >
            Школьные
          </div>
        </div>
        <div class="events__grid-items" v-if="events.length">
          <card-item
            v-for="(event, index) in events"
            :key="`main_pe-${index}`"
            :data="event"
            ref="events-main"
            path="/events"
          ></card-item>
        </div>
        <router-link to="/events" class="events__all--mobile show-more-link">
          Посмотреть все
        </router-link>
      </div>
      <actual-block title="Итоги" :data="results" class="results" />
    </div>
    <!-- <clubs-block :collapsed="true" class="main__clubs" /> -->
    <partners-block />
  </main>
  <!-- <div class="dev-alert" :class="{ 'dev-alert--visible': isDevAlert }">
    <img src="@/assets/images/icons/alert-red.svg" alt="alert" class="dev-alert__icon" />
    Сайт находится в стадии кратчайшей доработки. Приносим свои извинения за временные неудобства.
    <img
      src="@/assets/images/icons/close-red.svg"
      alt="alert"
      class="dev-alert__icon"
      @click="isDevAlert = false"
    />
  </div> -->
</template>

<script>
import CardItem from '@/components/CardComponent.vue';
import NewsBlock from '@/blocks/NewsBlock.vue';
import ActualBlock from '@/blocks/ActualBlock.vue';
import PartnersBlock from '@/blocks/PartnersBlock.vue';
// import ClubsBlock from '@/blocks/ClubsBlock.vue';

import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import debounce from 'debounce';

/* eslint-disable */
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
/* eslint-enable */

export default {
  name: 'MainPageView',
  components: {
    CardItem,
    NewsBlock,
    PartnersBlock,
    ActualBlock,
    // ClubsBlock,

    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      slides: [],

      isDevAlert: false,
      windowWidth: window.innerWidth,

      events: [],
      currentTab: 1,
      news: [],
      newsKey: 0,

      results: [],

      currentSlide: null,
      sliderInterval: null,
    };
  },
  setup() {
    return {
      modules: [Navigation, Autoplay],
    };
  },
  mounted() {
    document.title = `Юность России`;
    this.getNews();
    this.getEvents();
    this.getSlides();

    this.isDevAlert = true;
    setTimeout(() => {
      this.isDevAlert = false;
    }, 10000);

    window.addEventListener(
      'resize',
      debounce(() => {
        this.windowWidth = window.innerWidth;
      }, 200)
    );
  },
  computed: {
    // swiperImage(){
    //   let img = '';
    //   if(this.windowWidth > 768)
    //     img = 'banner';
    //   else if(this.windowWidth > )
    // }
  },
  methods: {
    getSlides() {
      this.$axios
        .get(`https://sportunros.ru/wp-json/wp/v2/posts?categories=17`, {
          params: {
            order: 'asc',
            orderby: 'date',
            per_page: 6,
            page: 1,
          },
        })
        .then((response) => {
          response.data.forEach((el) => {
            this.slides.push({
              banner: el.acf['слайд_десктоп'],
              laptopBanner: el.acf['слайд_планшет'],
              tag: el.acf['тег'],
              link: el.acf['ссылка'],
            });
          });
        });
    },
    onSlideChange(e) {
      setTimeout(() => {
        this.currentSlide = e.realIndex + 1;
      }, 1000);

      this.$refs['main-slider-progress-loader'].classList.remove(
        'swiper-progress-loader--animation'
      );

      setTimeout(
        () =>
          this.$refs['main-slider-progress-loader'].classList.add(
            'swiper-progress-loader--animation'
          ),
        1000
      );
    },
    onSwiper() {
      this.currentSlide = 1;
      this.$refs['main-slider-progress-loader'].classList.add('swiper-progress-loader--animation');
    },
    getDateInterval(dateFrom, dateTo) {
      const months = [
        'янв',
        'фев',
        'мар',
        'апр',
        'мая',
        'июн',
        'июл',
        'авг',
        'сен',
        'окт',
        'ноя',
        'дек',
      ];
      const splittedFrom = dateFrom.split('-');
      const splittedTo = dateTo.split('-');
      return months[parseInt(splittedFrom[1], 10) - 1] ===
        months[parseInt(splittedTo[1], 10) - 1] && splittedFrom[0] === splittedTo[0]
        ? `${splittedFrom[2].slice(0, 2)} - ${splittedTo[2].slice(0, 2)} ${
            months[parseInt(splittedFrom[1], 10) - 1]
          } ${splittedFrom[0]} г`
        : `${splittedFrom[2].slice(0, 2)} ${months[parseInt(splittedFrom[1], 10) - 1]} ${
            splittedFrom[0]
          } г - ${splittedTo[2].slice(0, 2)} ${months[parseInt(splittedTo[1], 10) - 1]} ${
            splittedTo[0]
          } г`;
    },
    getDate(date) {
      const months = [
        'янв',
        'фев',
        'мар',
        'апр',
        'мая',
        'июн',
        'июл',
        'авг',
        'сен',
        'окт',
        'ноя',
        'дек',
      ];
      const splitted = date.split('-');
      return `${splitted[2].slice(0, 2)} ${months[parseInt(splitted[1], 10) - 1]} ${splitted[0]} г`;
    },
    getTime(date) {
      const splitted = date.split('-');
      return splitted[2].slice(3, 8);
    },
    getEvents() {
      this.events = [];
      let categories = 8;
      if (this.currentTab === 0) categories = 7;
      else if (this.currentTab === 1) categories = 8;
      else if (this.currentTab === 2) categories = 9;
      else if (this.currentTab === 3) categories = 10;
      this.$axios
        .get(
          `https://sportunros.ru/wp-json/wp/v2/posts?categories=${categories}&per_page=8&page=1`,
          {
            params: {
              order: 'desc',
              orderby: 'date',
            },
          }
        )
        .then((response) => {
          const events = response.data;
          events.forEach((e) => {
            this.$axios
              .get(`https://sportunros.ru/wp-json/acfextra/v1/${e.id}/image`)
              .then((res) => {
                this.events.push({
                  img: res.data,
                  title: e.title.rendered,
                  par: e.excerpt.rendered,
                  date: this.getDateInterval(e.acf.time_from, e.acf.time_to),
                  rawDate: e.date,
                  time: this.getTime(e.date),
                  tag: e.acf.type,
                  id: e.id,
                });
                this.events.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
              });
          });
        });
    },
    getNews() {
      this.$axios
        .get('https://sportunros.ru/wp-json/wp/v2/posts?categories=1&per_page=6&page=1', {
          params: {
            order: 'desc',
            orderby: 'date',
          },
        })
        .then((response) => {
          const news = response.data;
          news.forEach((e) => {
            this.$axios
              .get(`https://sportunros.ru/wp-json/acfextra/v1/${e.id}/image`)
              .then((res) => {
                this.news.push({
                  img: res.data,
                  title: e.title.rendered,
                  par: e.excerpt.rendered,
                  date: this.getDate(e.date),
                  rawDate: e.date,
                  time: this.getTime(e.date),
                  tag: e.acf.type,
                  id: e.id,
                });
                this.news.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
              });
          });
        });
    },
  },
};
</script>

<style lang="scss">
.main-swiper {
  padding: 72px 0;
  border-bottom: 1px solid $gray-2;
  position: relative;
  z-index: 0;

  .swiper {
    border-radius: 12px;
    max-height: 511px;
    overflow: hidden;

    &-slide {
      border-radius: 16px;
      max-height: 511px;
    }
  }

  .swiper-container {
    border-radius: 8px;
    max-height: 440px !important;
  }

  .slide-banner {
    width: 100%;
    min-height: 300px;
    background-image: url('@/assets/images/loading.gif');
    background-size: 48px;
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: 16px;
  }

  .slide-tag {
    position: absolute;
    left: 2.3%;
  }

  .slide-tag {
    top: 50.8%;
    padding: 6px 12px;
    border-radius: 23px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    background: rgba($gray-2, 0.72);
    color: $white;
  }

  .swiper-progress {
    position: absolute;
    left: 2.3%;
    bottom: 5.9%;
    height: 3px;
    background: rgba($white, 0.5);
    width: calc(82.3% - 144px);
    z-index: 1;

    &-loader {
      position: absolute;
      left: 0;
      width: 0;
      height: 3px;
      background: $white;

      &--animation {
        width: 100%;
        transition: width 5s ease-in-out;
      }
    }

    &__counter {
      position: absolute;
      transform: translateY(-100%);
      top: -32px;
      right: 0;

      display: flex;
      align-items: flex-end;
      color: $white;

      &-current {
        font-weight: 500;
        font-size: 40px;
        line-height: 46px;
      }

      &-sep {
        font-weight: 400;
        font-size: 24px;
        line-height: 34px;
      }

      &-sum {
        font-weight: 300;
        font-size: 24px;
        line-height: 34px;
        color: $gray-1;
      }
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    &:after {
      display: none;
    }

    width: 72px;
    height: 72px;
    background: $black;
    bottom: 0;
    transform: none;
    left: unset;
    top: unset;

    transition: all 0.3s ease-in-out;

    &:hover {
      background: rgba($black, 0.95);
    }

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: url('@/assets/images/icons/arrow-right.svg');
      background-size: cover;
      background-repeat: no-repeat;
      width: 24px;
      height: 24px;
    }
  }

  .swiper-button-next {
    right: 0;
    border-radius: 0 0 8px 0;
  }

  .swiper-button-prev {
    right: 72px;

    &:before {
      transform: rotate(180deg) translate(50%, 50%);
    }
  }
}

.main {
  padding-bottom: 50px;

  .news {
    padding: 40px 0 121px 0;
    border-bottom: 1px solid $gray-2;
    margin-bottom: 40px;
  }

  .events {
    display: grid;
    grid-template-columns: 3fr 1fr;
    column-gap: 32px;
    grid-template-areas:
      'header header'
      'grid results';

    &__all {
      &--mobile {
        display: none;
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 32px;

      grid-area: header;
    }

    .results {
      grid-area: results;
      height: 100%;
    }

    &__title {
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      text-transform: uppercase;
      text-align: left;

      &:before {
        content: '';
        position: relative;
        display: inline-block;
        margin-right: 15px;
        margin-left: 5px;
        width: 10px;
        height: 17px;
        transform: skew(-30deg);
        background: $blue;
      }
    }

    &__grid {
      display: flex;
      flex-direction: column;
      row-gap: 40px;
      grid-area: grid;

      .direction-filters {
        display: flex;
        column-gap: 16px;

        &__filter {
          font-weight: 600;
          font-size: 15px;
          line-height: 20px;
          padding: 14px 36px;
          border-radius: 8px;
          background: $white;
          cursor: pointer;
          transition: $hover;

          &--active {
            background: $black;
            color: $white;
            pointer-events: none;

            &:hover {
              background: $black;
            }
          }

          &:hover {
            background: $gray-2;
          }
        }
      }

      &-items {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 32px;
        height: 100%;
      }
    }
  }
}

.dev-alert {
  width: 50vw;
  position: fixed;
  bottom: 45px;
  left: 25vw;
  padding: 20px;
  background: #fce8db;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);

  color: #f33737;

  font-weight: 600;
  font-size: 16px;
  line-height: 22px;

  display: flex;
  align-items: center;
  column-gap: 12px;
  justify-content: center;

  transform: translateY(200px);
  opacity: 0;
  visibility: hidden;

  transition: $hover;

  > :first-child {
    cursor: default;
  }

  &--visible {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  }

  &__icon {
    cursor: pointer;
  }
}

@media screen and (max-width: 1400px) {
  .main-swiper {
    .swiper {
      max-height: 440px;
      &-slide {
        max-height: 440px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .main-swiper {
    .swiper {
      max-height: 370px;
      &-slide {
        max-height: 370px;
      }
    }
  }
  .dev-alert {
    width: 80vw;
    left: 10vw;
  }

  .main-swiper {
    .slide-tag {
      top: unset;
      bottom: 160px;
    }
  }

  .main {
    .events {
      grid-template-columns: 2.5fr 1fr;
      &__grid {
        width: 100%;
        &-items {
          grid-template-columns: 1fr 1fr;
        }

        .direction-filters {
          flex-wrap: wrap;
          gap: 12px;

          &__filter {
            font-weight: 600;
            font-size: 12px;
            line-height: 20px;
            padding: 10px 16px;
            border-radius: 6px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 991px) {
  .main-swiper {
    .swiper {
      max-height: 300px;
      &-slide {
        max-height: 300px;
      }
    }
  }
  .main-swiper {
    .slide-tag {
      top: unset;
      bottom: 130px;
    }
  }
  .main {
    .events {
      grid-template-areas:
        'header'
        'grid'
        'results';
      grid-template-columns: 1fr;
      &__grid {
        &-items {
          grid-template-columns: 1fr 1fr;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .main-swiper {
    .swiper {
      max-height: 440px;
      &-slide {
        max-height: 440px;
      }
    }
  }
  .dev-alert {
    width: 90vw;
    left: 5vw;
  }

  .main {
    padding-bottom: 0;

    .events {
      &__grid {
        &-items {
          grid-template-columns: 1fr;
        }
      }
    }
  }

  .main-swiper {
    height: calc(470px + 24px + 40px);
    padding: 24px 0 40px;
    .slide-banner {
      height: 100%;
      width: unset;
      object-fit: cover;
      object-position: 0;
      overflow: hidden;
    }

    .swiper {
      height: 100%;

      &-button {
        &-prev,
        &-next {
          width: 48px;
          height: 48px;
        }

        &-prev {
          right: 48px;
        }
      }

      &-slide {
        overflow: hidden;
        border-radius: 16px;
      }

      .slide-tag {
        font-weight: 400;
        font-size: 10px;
        line-height: 20px;
        padding: 2px 12px;
        bottom: 180px;
      }

      &-progress {
        width: calc(100% - 96px - 32px - 16px);
        bottom: 16px;
        left: 16px;

        &__counter {
          top: 0;

          &-current {
            font-size: 24px;
            line-height: 34px;
            font-weight: 500;
          }

          &-sep {
            font-size: 18px;
            line-height: 30px;
          }

          &-sum {
            font-size: 12px;
            line-height: 24px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .dev-alert {
    width: calc(100vw - 32px);
    left: 16px;
    bottom: 24px;
  }
  .main {
    .events {
      &__all {
        display: none;

        &--mobile {
          display: block;
          text-align: left;
        }
      }
      .direction-filters {
        width: calc(100vw - 32px);
        flex-wrap: nowrap;
        overflow-x: scroll;
        &::-webkit-scrollbar {
          display: none;
        }

        -ms-overflow-style: none;
        scrollbar-width: none;

        &__filter {
          font-weight: 600;
          font-size: 15px;
          line-height: 20px;
          padding: 14px 36px;
        }

        > :last-child {
          margin-right: 16px;
        }
      }
    }

    .results {
      margin-top: 32px;
    }
  }
}
</style>
