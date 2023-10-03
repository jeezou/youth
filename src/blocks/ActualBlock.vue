<template>
  <div class="actual">
    <h2 class="actual__title" v-if="isTitle">{{ title }}</h2>
    <div class="actual__list">
      <router-link
        :to="data.length ? result.link : result.link"
        class="actual__item"
        v-for="(result, index) in data.length ? data : results"
        :key="`actual-${index}`"
      >
        <div class="actual__item-title" v-html="result.title" />
        <div class="actual__item-date" v-html="result.date" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActualBlock',
  components: {},
  props: {
    title: {
      type: String,
      default: () => 'Другие новости',
    },
    data: {
      type: Array,
      default: () => [],
    },
    isTitle: {
      type: Boolean,
      default: () => true,
    },
  },
  mounted() {
    if (!this.data.length) this.getResults();
  },
  data() {
    return {
      results: [],
    };
  },
  computed: {},
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
    parseDate(type, date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${
        d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
      }-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}T${
        type === 'after' ? '00:00:00' : '23:59:59'
      }`;
    },
    getResults() {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 1);
      this.$axios
        .get(`https://sportunros.ru/wp-json/wp/v2/posts?categories=1,3,7,8,9,10`, {
          params: {
            order: 'asc',
            orderby: 'date',
            per_page: 6,
            page: 1,
            after: this.parseDate('after', date),
          },
        })
        .then((response) => {
          response.data.forEach((el) => {
            this.results.push({
              title: el.title.rendered,
              date: this.getDate(el.date),
              link: el.categories[0] === 1 ? `/news/${el.id}` : `/events/${el.id}`,
            });
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.actual {
  height: fit-content;

  &__title {
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    text-transform: uppercase;
    text-align: left;
    height: 48px;
    margin-bottom: 40px;
    display: flex;
    align-items: flex-end;

    &:before {
      content: '';
      position: relative;
      display: inline-block;
      margin-right: 12px;
      margin-left: 5px;
      margin-bottom: 3px;
      width: 10px;
      height: 15px;
      transform: skew(-30deg);
      background: $red;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr;
    height: calc(100% - 88px);

    > * {
      border-top: 1px solid rgba($gray-1, 0.5);
    }

    > :last-child {
      border-bottom: 1px solid rgba($gray-1, 0.5);
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 24px 0;
    text-decoration: none;
    color: $black;

    &-title {
      font-weight: 700;
      font-size: 14px;
      line-height: 24px;
      text-align: left;
      margin-bottom: 14px;
    }

    &-date {
      font-weight: 600;
      font-size: 10px;
      line-height: 24px;

      display: flex;
      align-items: center;
      background: $white;
      width: fit-content;
      padding: 1px 9px;
      border-radius: 18px;

      &:before {
        content: '';
        display: inline-block;
        margin-right: 6px;
        width: 16px;
        height: 16px;
        background: url('@/assets/images/icons/calendar-dark.svg');
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .actual {
    &__title {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 16px;
    }

    &__item {
      padding: 16px 0;

      &-title {
        font-weight: 700;
        font-size: 12px;
        line-height: 18px;
      }

      &-date {
        padding: 0px 8px;
        font-weight: 600;
        font-size: 10px;
        line-height: 24px;

        &:before {
          width: 16px;
          height: 16px;
          margin-right: 3px;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .actual {
    margin-top: 0;

    &__list {
      > :last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
