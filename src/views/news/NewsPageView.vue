<template>
  <main class="news-page">
    <div class="news-page__inner-wrapper transparent-page-wrapper container">
      <bread-crumbs ref="breadcrumbs" />
      <div class="news-page__header">
        <h1 class="news-page__title page-title">Новости</h1>
      </div>
      <div class="news-page__filters" v-if="filters.length">
        <div class="news-page__input-wrapper news-page__input-wrapper--search">
          <input
            type="text"
            class="news-page__input"
            placeholder="Например: Борьба"
            v-model="search"
            @keyup.enter="getFilteredNews"
          />
          <div
            class="news-page__filters-btn news-page__filters-btn--mobile"
            v-if="windowWidth <= 768"
            @click="isFilters = true"
          >
            <img src="@/assets/images/icons/filters.svg" alt="" />
          </div>
        </div>
        <div class="news-page__submit-btn news-page__submit-btn--mobile" @click="getFilteredNews">
          Найти
        </div>
        <span
          class="news-page__input-wrapper news-page__input-wrapper--date"
          :class="{ 'news-page__input-wrapper--date-selected': date }"
          v-if="windowWidth > 768"
        >
          <vue-datepicker
            class="news-page__input"
            v-model="date"
            :format="'dd.MM.yy'"
            :placeholder="'По дате'"
            :selectText="'Выбрать'"
            :cancelText="''"
            :enableTimePicker="false"
            locale="ru"
          />
        </span>
        <span
          class="news-page__input-wrapper news-page__input-wrapper--region"
          v-if="windowWidth > 768"
        >
          <multi-select
            type="text"
            class="news-page__input"
            :options="Object.keys(filters[0].choices)"
            :placeholder="`По регионам`"
            :searchable="true"
            v-model="region"
          />
        </span>
        <span
          class="news-page__input-wrapper news-page__input-wrapper--sport-type"
          v-if="windowWidth > 768"
        >
          <multi-select
            type="text"
            class="news-page__input"
            :options="Object.keys(filters[1].choices)"
            :placeholder="`Вид спорта`"
            :searchable="true"
            v-model="sportType"
          />
        </span>
        <div
          type="button"
          class="news-page__submit-btn"
          v-if="windowWidth > 768"
          @click="getFilteredNews"
        >
          Найти
        </div>
        <div
          type="button"
          class="news-page__reset-btn"
          v-if="windowWidth > 768"
          @click="resetData"
          :class="{ 'news-page__reset-btn--disabled': !date && !region && !sportType && !search }"
        >
          Сбросить
        </div>
      </div>
      <div class="news-page__primary-wrapper" v-if="Object.keys(main).length && !isSearch">
        <!-- <router-link :to="`/news/${main.id}`" class="news-page__primary"> -->
        <router-link :to="`${main.link}`" class="news-page__primary">
          <img
            :src="main.img === false ? require('@/assets/images/no-image.jpg') : main.img"
            alt=""
            class="news-page__primary-image"
          />
          <div class="news-page__primary-badge-wrapper">
            <badge-item class="news-page__primary-badge" :badge="main.tag" />
          </div>
          <div class="news-page__primary-title" v-html="main.title" />
          <div class="news-page__primary-par" v-html="main.par" />
          <badge-item class="news-page__primary-badge" :badge="main.date" type="date" />
        </router-link>
        <div class="news-page__actual-wrapper">
          <actual-block
            class="news-page__actual"
            title="Актуальное"
            :data="actual"
            v-if="actual.length"
          />
        </div>
      </div>
      <div class="news-page__main" :class="{ 'news-page__main--search': isSearch }">
        <news-block
          class="news-page__news"
          title="Новости"
          :data="other"
          :isTitle="false"
          :path="'/news'"
          v-if="other.length"
        />
        <actual-block class="news-page__more" title="Популярное" :data="popular" :isTitle="true" />
        <div
          class="news-page__show-more"
          @click="
            page += 1;
            getNews(page, perPage);
          "
          v-if="isShowMore && !isSearch"
        >
          Показать еще
        </div>
      </div>
    </div>
    <partners-block />
    <filters-modal
      v-if="filters && filters.length"
      :filters="filters"
      :isDate="true"
      :singleDate="true"
      :isRegion="true"
      :isSportType="true"
      :isVisible="isFilters ? true : false"
      :page="'news'"
      @submit="(e) => getFilteredNews('modal', e)"
    />
  </main>
</template>

<script>
import BadgeItem from '@/components/BadgeComponent.vue';

import PartnersBlock from '@/blocks/PartnersBlock.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import NewsBlock from '@/blocks/NewsBlock.vue';
import ActualBlock from '@/blocks/ActualBlock.vue';
import FiltersModal from '@/components/modals/FiltersModal.vue';

import MultiSelect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

import VueDatepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'NewsPageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
    ActualBlock,
    NewsBlock,
    FiltersModal,

    MultiSelect,
    VueDatepicker,

    BadgeItem,
  },
  data() {
    return {
      date: null,
      region: null,
      sportType: null,
      search: null,
      page: 3,
      perPage: 5,

      isFilters: false,
      windowWidth: window.innerWidth,
      more: [
        {
          title:
            'Всероссийский сводный календарный план физкультурных и спортивных мероприятий 2016-2017 годы',
          date: '27 дек 2022 г',
        },
        {
          title: 'Чемпионат Европы среди школьников по Бадминтону Клермон-Ферран ',
          date: '27 дек 2022 г',
        },
        {
          title:
            'Международные соревнования среди школьников по плаванию 20.04- 25.04.2017 Будапешт - Венгрия',
          date: '27 дек 2022 г',
        },
        {
          title: 'Всероссийский сводный календарный план физкультурных и спортивных мероприятий ',
          date: '27 дек 2022 г',
        },
        {
          title: 'Всероссийский сводный календарный план физкультурных и спортивных мероприятий',
          date: '27 дек 2022 г',
        },
        {
          title: 'Всероссийский сводный календарный план физкультурных и спортивных мероприятий',
          date: '27 дек 2022 г',
        },
      ],

      news: [],
      filters: [],

      main: {},
      actual: [],
      popular: [],
      other: [],

      all: [],

      rest: [],

      isSearch: false,

      isShowMore: true,
    };
  },
  watch: {
    'all.length': function (val) {
      if (val === 10) {
        this.all.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
        // eslint-disable-next-line prefer-destructuring
        this.main = this.all[0];
        this.actual = this.all.slice(1, 4);
        this.other = this.all.slice(4, 9);
        // this.popular = this.all.slice(9, 14);
        this.rest = this.all.slice(9, 10);
      }
    },
  },
  mounted() {
    document.title = `${process.env.VUE_APP_TITLE} - Новости`;
    this.getFilters();
    // this.getNews(this.page, this.perPage);
    this.getPopularNews();
    this.getStartNews();

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  },
  beforeUnmount() {
    window.removeEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  },
  methods: {
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
      // eslint-disable-next-line
      return `${splitted[2].slice(0, 2)} ${months[parseInt(splitted[1]) - 1]} ${splitted[0]} г`;
    },
    getTime(date) {
      const splitted = date.split('-');
      return splitted[2].slice(3, 8);
    },
    getFilters() {
      const _this = this;
      this.$axios.get('https://sportunros.ru/wp-json/acfextra/v1/fields').then((response) => {
        _this.filters = response.data.filter((e) => e.name === 'Новости')[0].fields;
      });
    },
    resetData() {
      this.date = null;
      this.region = null;
      this.sportType = null;
      this.search = null;

      // this.other = [];
      // this.main = {};
      // this.actual = [];
      // this.popular = [];
      this.popular = [];
      this.all = [];

      this.getStartNews();

      // this.getNews(1, 5);

      this.page = 4;
      this.perPage = 5;
      this.isSearch = false;
      this.isShowMore = true;
    },
    parseDate(type, date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${
        d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
      }-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}T${
        type === 'after' ? '00:00:00' : '23:59:59'
      }`;
    },
    getPopularNews() {
      this.popular = [];
      this.$axios
        .get(
          `https://sportunros.ru/wp-json/wp/v2/posts?categories=1&per_page=5&page=1&orderby=views&order=desc`
        )
        .then((response) => {
          const news = response.data;
          news.forEach((e) => {
            console.log(e);
            this.$axios
              .get(`https://sportunros.ru/wp-json/acfextra/v1/${e.id}/image`)
              .then((res) => {
                this.popular.push({
                  img: res.data,
                  title: e.title.rendered,
                  par: e.excerpt.rendered,
                  date: this.getDate(e.date),
                  rawDate: e.date,
                  time: this.getTime(e.date),
                  tag: e.acf.type,
                  views: e.views,

                  id: e.id,
                  link: e.categories[0] === 1 ? `/news/${e.id}` : `/events/${e.id}`,
                });
                this.popular.sort((a, b) => b.views - a.views);
              });
          });
        })
        .catch(() => {});
    },
    getFilteredNews(mode, filters) {
      if (mode === 'modal') {
        this.date = filters.date;
        this.region = filters.region;
        this.sportType = filters.sportType;
      }
      if (this.date || this.region || this.sportType || this.search) {
        this.isSearch = true;

        this.other = [];

        if (this.date === null && this.region === null && this.sportType === null)
          this.isShowMore = true;
        else this.isShowMore = false;

        this.$axios
          .get(
            `https://sportunros.ru/wp-json/wp/v2/posts?categories=1${
              this.region ? `&region=${this.region}` : ''
            }${this.sportType ? `&type=${this.sportType}` : ''}${
              this.date
                ? `&after=${this.parseDate('after', this.date)}&before=${this.parseDate(
                    'before',
                    this.date
                  )}`
                : ''
            }${this.search ? `&search=${this.search}` : ''}`,
            {
              params: {
                order: 'desc',
                orderby: 'date',
              },
            }
          )
          .then((response) => {
            const news = response.data;
            news.forEach((e) => {
              this.$axios
                .get(`https://sportunros.ru/wp-json/acfextra/v1/${e.id}/image`)
                .then((res) => {
                  this.other.push({
                    img: res.data,
                    title: e.title.rendered,
                    par: e.excerpt.rendered,
                    date: this.getDate(e.date),
                    rawDate: e.date,
                    time: this.getTime(e.date),
                    tag: e.acf.type,
                    id: e.id,
                  });
                  this.other.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
                });
            });
          })
          .catch(() => {
            this.isShowMore = false;
          });
      } else {
        this.isSearch = false;
        this.resetData();
      }
    },
    getStartNews() {
      /* eslint-disable */
      this.$axios
        .get(`https://sportunros.ru/wp-json/wp/v2/posts?categories=1&per_page=10&page=1`, {
          params: {
            order: 'desc',
            orderby: 'date',
          },
        })
        .then((response) => {
          const news = response.data;
          news.sort((a, b) => new Date(b.date) - new Date(a.date));
          news.forEach((e) => {
            this.$axios
              .get(`https://sportunros.ru/wp-json/acfextra/v1/${e.id}/image`)
              .then((res) => {
                this.all.push({
                  img: res.data,
                  title: e.title.rendered,
                  par: e.excerpt.rendered,
                  date: this.getDate(e.date),
                  rawDate: e.date,
                  time: this.getTime(e.date),
                  tag: e.acf.type,

                  id: e.id,
                  link: e.categories[0] === 1 ? `/news/${e.id}` : `/events/${e.id}`,
                });
              });
          });
        })
        .catch(() => {
          this.isShowMore = false;
        });
    },
    getNews(page, perPage) {
      this.$axios
        .get(
          `https://www.sportunros.ru/wp-json/wp/v2/posts?categories=1&per_page=${perPage}&page=${page}`,
          {
            params: {
              order: 'desc',
              orderby: 'date',
            },
          }
        )
        .then((response) => {
          const news = response.data;

          news.forEach((e) => {
            this.$axios
              .get(`https://sportunros.ru/wp-json/acfextra/v1/${e.id}/image`)
              .then((res) => {
                if (this.rest.length) {
                  this.other = this.other.concat(this.rest);
                  this.rest = [];
                }

                this.other.push({
                  img: res.data,
                  title: e.title.rendered,
                  par: e.excerpt.rendered,
                  date: this.getDate(e.date),
                  rawDate: e.date,
                  time: this.getTime(e.date),
                  tag: e.acf.type,
                  id: e.id,
                });
                this.other.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
              });
          });
        })
        .catch(() => {
          this.isShowMore = false;
        });
    },
  },
};
</script>

<style lang="scss">
.news-page {
  min-width: 100%;

  &__primary {
    position: relative;
    text-decoration: none;
    color: $white;
    padding: 32px;
    text-align: left;
    display: flex;
    flex-direction: column;
    border-radius: 8px;

    &:hover {
      color: $white;
    }

    &-wrapper {
      display: grid;
      grid-template-columns: 3fr 1fr;
      gap: 32px;
      margin-top: 32px;
    }

    &-image {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 8px;
      object-fit: cover;
      z-index: 0;

      filter: brightness(50%);
    }

    &-title,
    &-par,
    &-badge {
      z-index: 1;
      position: relative;
    }

    &-title {
      font-weight: 700;
      font-size: 32px;
      line-height: 32px;
      margin-bottom: 16px;
      width: 70%;

      word-break: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      max-height: 96px; /* fallback */
      min-height: 96px;
      -webkit-line-clamp: 3; /* number of lines to show */
      -webkit-box-orient: vertical;
      letter-spacing: 0.01em;
    }

    &-par {
      font-weight: 500;
      font-size: 14px;
      line-height: 23px;
      margin-bottom: 24px;
      width: 50%;

      word-break: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      max-height: 66px; /* fallback */
      min-height: 66px;
      -webkit-line-clamp: 3; /* number of lines to show */
      -webkit-box-orient: vertical;
      letter-spacing: 0.03em;
    }

    &-badge {
      width: fit-content;
    }

    &-badge-wrapper {
      height: 100%;
    }
  }

  &__header {
    min-width: 100%;
  }
  &__title {
    min-width: 100%;
    &:before {
      top: -2px;
      background: $green;
    }
  }

  &__main {
    display: grid;

    grid-template-columns: 1fr 3fr;
    grid-template-areas:
      'other news'
      'other btn';
    gap: 32px;
    margin-top: 32px;

    position: relative;

    &--search {
      display: block;
      .news-page__more {
        display: none;
      }

      .news__list {
        grid-template-columns: 1fr 1fr 1fr 1fr !important;

        > :nth-child(1) {
          grid-column-start: unset !important;
          grid-column-end: unset !important;
        }

        .card-item__image {
          height: 215px;
        }
      }
    }
  }

  &__news {
    padding-top: 0 !important;
    grid-area: news;

    .card-item {
      justify-content: flex-start;
    }

    .card-item__title {
      height: fit-content;
      max-height: unset;
      min-height: unset;
    }

    .news__list {
      grid-template-columns: repeat(3, 1fr);
      > :first-child {
        .card-item__title {
          height: fit-content;
          max-height: unset;
          min-height: unset;
        }
      }
    }
  }

  &__actual {
    .actual__title {
      margin-top: -20px;
      margin-bottom: 24px;
      &:before {
        background: $green;
      }
    }

    .actual__list {
      > :nth-child(1) {
        border-top: none;
      }
    }
  }

  &__more {
    grid-area: other;
    position: sticky;
    top: 32px;

    .actual__title {
      margin-top: -20px;
      margin-bottom: 24px;
      &:before {
        background: $green;
      }
    }

    .actual__list {
      > :nth-child(1) {
        border-top: none;
      }
    }
  }

  &__filters {
    display: flex;
    column-gap: 32px;
    width: 100%;

    select,
    input {
      border: none;
      appearance: none;
      &:focus {
        outline: none;
      }
      background: transparent;
    }
  }

  &__input {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }

  &__submit-btn,
  &__reset-btn {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: $white;
    background: $black;
    border-radius: 8px;
    padding: 14px 0;
    min-width: 148px;
    transition: $hover;
    &--disabled {
      pointer-events: none;
    }

    &--mobile {
      display: none;
    }
  }

  &__reset-btn {
    background: $red;
    &--disabled {
      pointer-events: none;
      color: $white;
      background: $gray-2;
    }
  }

  &__show-more {
    width: 100%;
    padding: 14px 0;
    border-radius: 8px;
    background: $white;
    color: $black;
    font-weight: 600;
    cursor: pointer;
    transition: $hover;
    margin-top: 32px;
    max-height: 52px;

    grid-area: btn;

    &:hover {
      background: $black;
      color: $white;
    }
  }

  &__input-wrapper {
    background: $white;
    border-radius: 8px;
    position: relative;

    &--search {
      flex-grow: 6;
      .news-page__input {
        padding: 14px 12px 14px 0px !important;
        margin-left: 12px;

        font-weight: 600;
        font-size: 14px;
        line-height: 20px;

        &::placeholder {
          color: $gray-1;
        }
      }

      position: relative;

      display: flex;
      align-items: center;

      &:before {
        content: '';
        width: 24px;
        height: 24px;
        margin-left: 16px;
        background: url('@/assets/images/icons/search-gray.svg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    .news-page__input {
      padding: 14px 12px;
      width: 100%;
    }

    &--type {
      display: flex;
      align-items: center;
      flex-grow: 1;

      .news-page__input {
        padding: 14px 40px 14px 12px;
        width: 100%;
      }

      &:after {
        content: '';
        position: absolute;
        width: 24px;
        height: 24px;
        top: 14px;
        right: 10px;
        background: url('@/assets/images/icons/select-arrow.svg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        transform: rotate(180deg);
        pointer-events: none;
      }
    }

    &--type {
      display: none;
    }

    &--date {
      padding: 0;
      display: flex;
      align-items: center;

      > :first-child {
        padding: 0;
      }

      &-selected {
        .dp__clear_icon {
          right: 24px !important;
        }
      }

      .dp {
        &__icon {
          right: 0;
          left: unset;
          fill: $black;
        }

        &__pointer {
          padding: 12px 14px;

          &::placeholder {
            font-family: 'Manrope';
            color: $black;
            opacity: 1;
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
    }

    &--region,
    &--sport-type {
      width: 100%;
      max-width: 170px;

      .multiselect {
        border: none;
        box-shadow: none;

        &-placeholder {
          color: $black;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
        }

        &-caret {
          background: rgba($black, 0.8);
          z-index: 0;
        }

        &:focus {
          box-shadow: none;
        }

        &-dropdown {
          max-height: 250px;
        }

        &-search {
          padding: 12px;
          &:focus {
            box-shadow: none;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1400px) {
  .news-page {
    &__input-wrapper {
      width: 100%;
      max-width: unset;
      &--search {
        min-width: 350px;
        grid-area: search;
      }

      &--date {
        grid-area: date;
      }

      &--region {
        grid-area: region;
      }

      &--sport-type {
        grid-area: sport-type;
      }
    }

    &__submit-btn {
      grid-area: submit;
    }

    &__reset-btn {
      grid-area: reset;
    }

    &__filters {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-areas:
        'search search search search search'
        'date region sport-type submit reset';

      gap: 16px;
    }
  }
}

@media screen and (max-width: 1200px) {
  .news-page {
    &__primary {
      &-wrapper {
        grid-template-columns: 2fr 1fr;
      }

      &-title {
        width: 90%;
      }

      &-par {
        width: 70%;
      }
    }

    &__main {
      .news__list {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}

@media screen and (max-width: 991px) {
  .news-page {
    &__filters {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-template-areas:
        'search search search search search search'
        'region region sport-type sport-type date date'
        'submit submit submit reset reset reset';
    }

    &__more {
      position: sticky;
      top: 24px;
    }

    &__primary {
      min-height: 600px;
      &-wrapper {
        grid-template-columns: 1fr;
      }
    }

    &__main {
      grid-template-columns: 1fr 1.5fr;
      .news__list {
        grid-template-columns: 1fr;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .news-page {
    &__news {
      grid-area: auto;
    }

    &__primary {
      padding: 16px;
      min-height: 450px;

      &-title {
        font-size: 24px;
        line-height: 24px;
        max-height: 72px;
        min-height: 72px;
        margin-bottom: 8px;
        width: 90%;
      }

      &-par {
        font-size: 12px;
        line-height: 16px;
        margin-bottom: 8px;
        width: 70%;
        max-height: 48px;
        min-height: 48px;
      }
    }

    &__main {
      grid-template-columns: 1fr;
      grid-template-areas:
        'news'
        'btn'
        'other';

      .card-item__title {
        height: fit-content;
        max-height: unset;
        min-height: unset;
      }
    }
    &__more {
      position: relative;
      top: unset;
      grid-area: auto;
      margin-top: 48px !important;

      .actual__title {
      }

      .actual__list {
        > :last-child {
          border-bottom: none;
        }
      }
    }

    &__submit-btn {
      &--mobile {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120px;
        min-width: unset;
      }
    }

    &__show-more {
      margin-top: 0;
    }
    &__title {
      margin: 0;
      line-height: 44px;
    }

    &__header {
      margin-top: 24px;
      margin-bottom: 32px;
    }

    &__filters {
      display: flex;
      column-gap: 16px;
    }

    &__filters-btn {
      border-radius: 8px;
      img {
        border-radius: 8px;
        height: 100%;
        width: 100%;
        object-fit: cover;
      }

      &--mobile {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-right: 4px;
      }
    }

    &__input-wrapper {
      height: 48px;
      &--search {
        grid-area: auto;
        display: flex;
        padding: 14px 12px;
        min-width: unset;
        column-gap: 8px;
        align-items: center;
        margin-left: 0;

        &::placeholder {
        }

        &:before {
          position: relative;
          top: unset;
          left: unset;
          margin-left: 4px;
        }

        .news-page__input {
          margin-left: 0;
          padding: 0 !important;
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .news-page {
    &__primary {
      &-title {
        width: 100%;
      }

      &-par {
        width: 80%;
      }
    }
  }
}
</style>
