<template>
  <main class="news-item-page container">
    <div class="news-item-page__grid">
      <div class="news-item-page__inner-wrapper common-page-wrapper">
        <div class="news-item-page__header">
          <bread-crumbs ref="breadcrumbs" :last="event.title" :key="event.title" />
          <share-item class="news-item-page__share" />
        </div>
        <div class="news-item-page__title-wrapper">
          <h1 class="news-item-page__title" v-html="event.title" />
          <share-item class="news-item-page__share-mobile" :collapsed="true" />
        </div>
        <div class="news-item-page__tags">
          <badge-item
            v-for="(tag, index) in event.tags"
            :key="`news-item-page-badge-${index}`"
            :badge="tag.text"
            :type="tag.type"
          />
        </div>
        <div class="news-item-page__content wp-html-content" v-html="event.content" />
      </div>
      <actual-block class="news-item-page__more" />
    </div>
    <partners-block />
  </main>
</template>

<script>
import PartnersBlock from '@/blocks/PartnersBlock.vue';
import ActualBlock from '@/blocks/ActualBlock.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import BadgeItem from '@/components/BadgeComponent.vue';
import ShareItem from '@/components/ShareComponent.vue';

export default {
  name: 'NewsItemView',
  components: {
    PartnersBlock,
    BreadCrumbs,
    BadgeItem,
    ActualBlock,
    ShareItem,
  },
  data() {
    return {
      event: {},

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
    };
  },
  mounted() {
    this.getEvent();
    this.increaseViewCount();
  },
  methods: {
    increaseViewCount() {
      this.$axios
        .get(`https://sportunros.ru/wp-json/popularit/v1/increase/${this.$route.params.id}`)
        .then(() => {})
        .catch(() => {});
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
    getTime(date) {
      const splitted = date.split('-');
      return splitted[2].slice(3, 8);
    },
    getEvent() {
      const _this = this;
      this.$axios
        .get(`https://sportunros.ru/wp-json/wp/v2/posts/${this.$route.params.id}`)
        .then((response) => {
          const event = response.data;
          _this.event = {
            title: event.title.rendered,
            subtitle: 'О первенстве',
            content: event.content.rendered,
            date: this.getDate(event.date),
            time: '13:00',
            tags: [
              {
                type: 'type',
                text: event.acf.type,
              },
              {
                type: 'date',
                text: this.getDate(event.date),
              },
              {
                type: 'time',
                text: this.getTime(event.date),
              },
            ],
          };
          document.title = `${process.env.VUE_APP_TITLE} - ${event.title.rendered}`;
        });
    },
  },
};
</script>

<style lang="scss">
.news-item-page {
  text-align: left;

  &__inner-wrapper {
    max-width: 100%;
  }

  &__header {
    display: flex;
    gap: 32px;
  }

  &__share-mobile {
    display: none;
  }

  &__title {
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    margin: 16px 0 24px;
    text-transform: uppercase;
    width: 75%;
  }

  &__subtitle {
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  &__tags {
    display: flex;
    column-gap: 8px;
    margin-bottom: 40px;
  }

  &__image {
    margin-bottom: 40px;
    width: 100%;
    border-radius: 8px;

    img {
      width: 100%;
      border-radius: 8px;
    }
  }

  &__content {
    max-width: 100%;
  }

  &__grid {
    display: grid;
    grid-template-columns: 3fr 1fr;
    position: relative;
    gap: 32px;
  }

  &__more {
    margin-top: 50px;
    position: sticky;
    top: 0;
  }
}

@media screen and (max-width: 1200px) {
  .news-item-page {
    &__title {
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
    }
  }
}

@media screen and (max-width: 991px) {
  .news-item-page {
    &__inner-wrapper {
      position: relative;
    }

    &__grid {
      gap: 24px;
    }

    &__content {
      p {
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
      }

      h2,
      h3 {
        font-weight: 700;
        font-size: 16px;
        line-height: 18px;
      }
    }

    &__tags {
      margin-bottom: 24px;
    }

    &__share {
      padding: 4px 8px;
      font-size: 8px;

      .share-item__icon {
        width: 18px;
        height: 18px;
      }
    }

    &__title {
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
    }

    &__title {
      width: 100%;
    }

    .partners {
      margin-top: 56px;
      border-top: 1px solid rgba(148, 151, 170, 0.5);
      padding-top: 72px;
    }
  }
}

@media screen and (max-width: 768px) {
  .news-item-page {
    &__grid {
      display: flex;
      flex-direction: column;
    }

    &__tags {
      flex-wrap: wrap;
      gap: 8px;
    }

    &__share {
      display: none;
    }

    &__title-wrapper {
      display: flex;
      align-items: flex-start;
      column-gap: 24px;
    }

    &__share-mobile {
      display: flex;
      margin-top: 16px;
    }

    .partners {
      margin-top: 0;
      padding-top: 56px;
    }
  }
}
</style>
