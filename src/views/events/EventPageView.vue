<template>
  <main class="event-page container">
    <div class="event-page__inner-wrapper common-page-wrapper">
      <div class="event-page__header">
        <bread-crumbs ref="breadcrumbs" :last="event.crumb" v-if="event.crumb" />
        <share-item />
      </div>
      <h1 class="event-page__title" v-html="event.title" />
      <div class="event-page__tags">
        <badge-item
          class="event-page__tag"
          v-for="(tag, index) in event.tags"
          :key="`ep-tag-${index}`"
          :badge="tag.text"
          :type="tag.type"
        />
      </div>
      <div class="event-page__content wp-html-content" v-html="event.content"></div>
    </div>
    <partners-block />
  </main>
</template>

<script>
import PartnersBlock from '@/blocks/PartnersBlock.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import BadgeItem from '@/components/BadgeComponent.vue';
import ShareItem from '@/components/ShareComponent.vue';

export default {
  name: 'EventPageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
    BadgeItem,
    ShareItem,
  },
  data() {
    return {
      event: {},
      crumbs: null,
    };
  },
  mounted() {
    document.title = `${process.env.VUE_APP_TITLE} - ${this.event.crumb}`;

    this.getEvent();
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
    getEvent() {
      const _this = this;
      this.$axios
        .get(`https://sportunros.ru/wp-json/wp/v2/posts/${this.$route.params.id}`)
        .then((response) => {
          const event = response.data;
          _this.event = {
            title: event.title.rendered,
            crumb: event.title.rendered,
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
  computed: {},
};
</script>

<style lang="scss">
.event-page {
  text-align: left;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__inner-wrapper {
    margin-top: 72px;
  }

  &__title {
    margin: 16px 0 24px;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    text-transform: uppercase;
    max-width: 70%;
  }

  &__tags {
    display: flex;
    column-gap: 8px;
    margin-bottom: 32px;
  }

  &__subtitle {
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;
    text-transform: uppercase;
    margin-bottom: 32px;
  }

  &__content {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $par;

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      object-fit: contain;
    }
  }
}
</style>
