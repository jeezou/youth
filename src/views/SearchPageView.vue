<template>
  <div class="search-page container">
    <bread-crumbs ref="breadcrumbs" />
    <div class="search-page__header">
      <h2 class="search-page__title">Поиск</h2>
      <div class="search-page__header-search">
        <div class="search-page__input-wrapper search-page__input-wrapper--search">
          <input
            type="text"
            class="search-page__input"
            placeholder="Например: Художественная гимнастика"
            v-model="search"
            @keyup.enter="searchPosts"
          />
        </div>
        <div type="button" class="search-page__submit-btn" @click="searchPosts">Найти</div>
      </div>
    </div>
    <div class="search-page__results">
      <div class="search-page__results-title" v-if="!isSuggestion">Результаты поиска</div>
      <div class="search-page__results-count" v-if="!isSuggestion">
        Найдено результатов: {{ results.length }}
      </div>
      <div class="search-page__results-list" v-if="results.length">
        <card-item
          v-for="(item, index) in results"
          :key="`search-page-block-item-${index}`"
          :data="item"
          :link="`${item.link ? item.link : ''}`"
          ref="search-page-main"
          path="/search"
        ></card-item>
      </div>
      <div class="search-page__results-empty" v-if="results.length === 0 && !isSuggestion">
        Сожалеем, но по-вашему запросу ничего не найдено
      </div>
      <div
        class="search-page__results-empty search-page__results-empty--suggestion"
        v-if="isSuggestion"
      >
        Для начала введите запрос
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from '@/components/CardComponent.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

export default {
  name: 'SearchPageView',
  components: {
    CardItem,
    BreadCrumbs,
  },
  props: {},
  mounted() {
    if (this.$route.query.search) this.searchPosts(this.$route.query.search);
  },
  data() {
    return {
      results: [],
      search: '',

      isSuggestion: true,
    };
  },
  methods: {
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
      // eslint-disable-next-line
      return `${splitted[2].slice(0, 2)} ${months[parseInt(splitted[1]) - 1]} ${splitted[0]} г`;
    },
    searchPosts(value) {
      let search = '';
      if (typeof value === 'string') {
        this.search = value;
        search = value;
      } else if (this.search) search = this.search;

      this.results = [];

      if (search) {
        this.isSuggestion = false;
        this.$axios
          .get(`https://sportunros.ru/wp-json/wp/v2/posts?categories=1,3,7,8,9,10&search=${search}`)
          .then((response) => {
            response.data.forEach((el) => {
              this.$axios
                .get(`https://sportunros.ru/wp-json/acfextra/v1/${el.id}/image`)
                .then((res) => {
                  this.results.push({
                    img: res.data,
                    type: el.acf.type,
                    par: el.excerpt.rendered,
                    title: el.title.rendered,
                    rawDdate: el.date,
                    date:
                      el.categories[0] === 1
                        ? this.getDate(el.date)
                        : this.getDateInterval(el.acf.time_from, el.acf.time_to),
                    link: el.categories[0] === 1 ? `/news/${el.id}` : `/events/${el.id}`,
                    tag: el.acf.type,
                  });
                  this.results.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
                });
            });
          })
          .catch((e) => console.error(e));
      } else this.isSuggestion = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-page {
  padding-top: 40px;
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;

    &-search {
      display: flex;
      column-gap: 32px;
    }
  }

  &__submit-btn {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: $white;
    background: $black;
    border-radius: 8px;
    padding: 14px 0;
    min-width: 148px;
    transition: $hover;

    &:hover {
      background: rgba($black, 0.9);
    }
  }

  &__input-wrapper {
    background: $white;
    border-radius: 8px;
    position: relative;

    &--search {
      .search-page__input {
        padding: 14px 12px 14px 0px !important;
        margin-left: 12px;

        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        width: 80%;

        &::placeholder {
          color: $gray-1;
        }
      }

      width: 100%;

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
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 23px;
    text-transform: uppercase;
    text-align: left;
    line-height: 34px;
    margin-top: 24px;
    margin-bottom: 40px;

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

  &__results {
    text-align: left;
    &-title {
      font-weight: 700;
      font-size: 24px;
      line-height: 24px;
      margin-bottom: 16px;
      text-transform: uppercase;
    }

    &-count {
      font-weight: 600;
      font-size: 12px;
      line-height: 24px;
      color: $gray-1;
      margin-bottom: 32px;
    }

    &-list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 32px;
      margin-bottom: 120px;
    }

    &-empty {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: $gray-1;
      text-align: center;
      margin: 255px 0;

      &--suggestion {
        margin: 80px 0 120px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .search-page {
    &__results {
      &-list {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }
}

@media screen and (max-width: 991px) {
  .search-page {
    &__results {
      &-list {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .search-page {
    &__results {
      &-list {
        grid-template-columns: 1fr;
      }
    }

    &__header {
      &-search {
        column-gap: 16px;
      }
    }

    &__submit-btn {
      width: 100px;
      min-width: unset;
    }

    &__input-wrapper {
      &--search {
        .search-page__input {
          width: 70%;
        }
      }
    }
  }
}
</style>
