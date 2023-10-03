<template>
  <main class="festival-page container" v-if="Object.keys(festival).length">
    <div class="festival-page__top common-page-wrapper" :key="contentKey">
      <div class="festival-page__header">
        <bread-crumbs ref="breadcrumbs" :last="festival.title" />
        <share-item />
      </div>
      <h1 class="festival-page__title" v-html="festival.title" />
      <div class="festival-page__par" v-if="festival.intro" v-html="festival.intro"></div>
    </div>
    <div class="festival-page__content-wrapper" v-if="!festival.yearDiv">
      <div
        class="festival-page__content festival-page__content--videos common-page-wrapper"
        v-if="festival.videos"
      >
        <div class="festival-page__content-title">Видеоматериалы</div>
        <div class="festival-page__content-videos" v-html="festival.videos" />
      </div>
      <div
        class="festival-page__content festival-page__content--subblock common-page-wrapper"
        v-if="festival.subblocks"
      >
        <template v-for="(block, index) in festival.subblocks" :key="`festival-subblock-${index}`">
          <div class="festival-page__content-title" v-html="block.title" />
          <div class="festival-page__par" v-if="block.intro" v-html="block.intro"></div>
          <div class="festival-page__content-subtitle" v-if="block.videos">Видеоматериалы</div>
          <div class="festival-page__content-videos" v-html="block.videos" v-if="block.videos" />
          <div class="festival-page__content-subtitle" v-if="block.docs">Документы</div>
          <div class="festival-page__content-cards festival-page__content-cards--docs">
            <hoverable-card
              :type="'download'"
              :mods="['festival-subblock-docs']"
              :index="index"
              :data="card"
              v-for="(card, index) in block.docs"
              :key="`festival-year-page-${index}`"
            />
          </div>
        </template>
      </div>
      <div
        class="festival-page__content festival-page__content--docs transparent-page-wrapper"
        v-if="festival.docs"
      >
        <div class="festival-page__content-title">Документы</div>
        <div class="festival-page__content-cards festival-page__content-cards--docs">
          <hoverable-card
            :type="'download'"
            :mods="['festival-docs']"
            :index="index"
            :data="card"
            v-for="(card, index) in festival.docs"
            :key="`festival-year-page-${index}`"
          />
        </div>
      </div>
    </div>
    <div class="festival-page__content-wrapper transparent-page-wrapper" v-if="festival.years">
      <h2 class="festival-page__subtitle">Сортировка по годам</h2>
      <div class="festival-page__content-cards festival-page__content-cards--years">
        <hoverable-card
          :type="'unity'"
          :mods="['festival-year']"
          :index="index"
          :data="{ title: card, link: `${festival.id}/${card}` }"
          v-for="(card, index) in festival.years"
          :key="`festival-year-page-${index}`"
        />
      </div>
    </div>
    <partners-block />
  </main>
</template>

<script>
import PartnersBlock from '@/blocks/PartnersBlock.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import ShareItem from '@/components/ShareComponent.vue';
import HoverableCard from '@/components/HoverableCard.vue';

export default {
  name: 'FestivalPageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
    ShareItem,
    HoverableCard,
  },
  data() {
    return {
      festival: {},
      contentKey: 0,
    };
  },
  mounted() {
    this.getCurrentFestival();
  },
  methods: {
    getCurrentFestival() {
      this.$axios
        .get(`https://sportunros.ru/wp-json/wp/v2/posts/${this.$route.params.id}`)
        .then((response) => {
          const current = response.data;
          this.festival = {
            id: current.id,
            title: current.title.rendered,
            yearDiv: current.acf.division_by_year,
          };
          this.parseContent(current.acf.division_by_year, current.content.rendered);
          document.title = `${process.env.VUE_APP_TITLE} - ${this.festival.title}`;
        });
    },
    parseContent(yearDiv, content) {
      const block = document.createElement('div');
      block.innerHTML = content;
      this.festival.intro = '';
      [...block.querySelectorAll(':scope > :not(.wp-block-group):not(.wp-block-file)')].forEach(
        (e) => {
          this.festival.intro += e.outerHTML;
        }
      );
      if (yearDiv) {
        const yearBlocks = [
          ...block.querySelectorAll(':scope > .wp-block-group > .wp-block-group__inner-container'),
        ];
        this.festival.years = [];
        yearBlocks.forEach((yearBlock) => {
          if (yearBlock.children[0]) {
            this.festival.years.push(yearBlock.children[0].textContent);
          }
        });
      } else {
        const videos = [
          ...block.querySelectorAll(
            ':scope > .wp-block-group > .wp-block-group__inner-container > .is-type-video'
          ),
        ];
        if (videos.length) {
          this.festival.videos = [];
          videos.forEach((e) => {
            this.festival.videos += e.outerHTML;
          });
        }

        const docs = [
          ...block.querySelectorAll(
            ':scope > .wp-block-group > .wp-block-group__inner-container > .wp-block-file a'
          ),
        ];
        if (docs.length) {
          this.festival.docs = [];
          docs.forEach((e) => {
            this.festival.docs.push({
              title: e.textContent,
              link: e.href,
            });
          });
        }

        const subblocks = [
          ...block.querySelectorAll(
            ':scope > .wp-block-group > .wp-block-group__inner-container > .wp-block-group'
          ),
        ];

        if (subblocks.length) {
          this.festival.subblocks = [];
          subblocks.forEach((el) => {
            const subblock = {};
            subblock.intro = '';
            subblock.title = '';
            [...el.querySelectorAll(':scope > .wp-block-group__inner-container > h2, h3')].forEach(
              (e) => {
                subblock.title += e.outerHTML;
              }
            );
            [
              ...el.querySelectorAll(
                ':scope > .wp-block-group__inner-container > :not(.wp-block-group):not(.wp-block-file):not(.wp-block-embed):not(h2):not(h3)'
              ),
            ].forEach((e) => {
              subblock.intro += e.outerHTML;
            });
            const subVideos = [
              ...el.querySelectorAll(':scope > .wp-block-group__inner-container > .is-type-video'),
            ];
            if (subVideos.length) {
              subblock.videos = '';
              subVideos.forEach((e) => {
                subblock.videos += e.outerHTML;
              });
            }

            const subDocs = [...el.querySelectorAll('.wp-block-file a')];
            if (subDocs.length) {
              subblock.docs = [];
              subDocs.forEach((e) => {
                subblock.docs.push({
                  title: e.textContent,
                  link: e.href,
                });
              });
            }

            if (subblock.length) {
              if (!(this.festival.subblocks instanceof Array)) this.festival.subblocks = [];

              this.festival.subblocks.push(subblock);
            }
          });
        }
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.festival-page {
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  &__title {
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    text-align: left;
    text-transform: uppercase;
    max-width: 60%;
    margin-bottom: 32px;
  }

  &__par {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $par;
    text-align: left;
  }

  &__videos {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 32px;

    iframe {
      width: 100% !important;
      border-radius: 8px;
    }
  }

  &__subtitle {
    font-weight: 700;
    font-size: 24px;
    line-height: 23px;
    margin-top: 120px;
    padding-top: 40px;
    margin-bottom: 32px;
    border-top: 1px solid $gray-2;
    text-transform: uppercase;
    text-align: left;
  }

  &__content {
    text-align: left;
    h2,
    h3,
    &-title {
      font-weight: 700;
      font-size: 24px;
      line-height: 24px;
      margin-bottom: 32px;
      text-align: left;
      text-transform: uppercase;
    }

    &-subtitle {
      font-weight: 600;
      font-size: 18px;
      line-height: 18px;
      margin-bottom: 32px;
      margin-top: 48px;
      text-align: left;
      text-transform: uppercase;
      padding-top: 32px;
      border-top: 1px solid $gray-2;
    }

    &-videos {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 26px 32px;

      figure {
        margin-bottom: 0;
      }

      iframe {
        width: 100%;
        border-radius: 8px;
      }
    }

    &--docs {
      margin-top: 72px;
      padding-top: 40px;
      border-top: 1px solid $gray-2;
    }

    &-cards {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 32px;
    }
  }
}

@media screen and (max-width: 1200px) {
  .festival-page {
    &__content {
      &-videos,
      &-cards {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .festival-page {
    &__title {
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
      text-align: left;
      text-transform: uppercase;
      max-width: 100%;
      margin-bottom: 32px;
    }

    &__content {
      &-videos,
      &-cards {
        grid-template-columns: 1fr;

        iframe {
          max-height: 250px;
        }
      }
    }
  }
}
</style>
