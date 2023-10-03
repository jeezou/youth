<template>
  <main class="structure-page container">
    <div class="structure-page__inner-wrapper transparent-page-wrapper">
      <bread-crumbs ref="breadcrumbs" />
      <h1 class="structure-page__title page-title">Руководство</h1>
      <div class="structure-page__content">
        <div class="structure-page__left">
          <img :src="main.img" alt="" class="structure-page__left-img" />
          <div class="structure-page__left-info">
            <div class="structure-page__left-name">{{ main.name }}</div>
            <div class="structure-page__left-post">{{ main.post }}</div>
            <div
              class="structure-page__left-list-item"
              v-for="(item, index) in main.list"
              :key="`structure-page-main-list-${index}`"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="structure-page__right">
          <hoverable-card
            :data="{ title: 'Комитет', link: '/unity/structure/bureau' }"
            :mods="['structure']"
            :type="'unity'"
          />
          <hoverable-card
            :data="{
              title: 'Контрольно-ревизионная комиссия',
              link: '/unity/structure/commission',
            }"
            :mods="['structure']"
            :type="'unity'"
          />
        </div>
      </div>
      <div class="structure-page__docs">
        <img :src="structureImg" alt="structure image" />
      </div>
      <div class="structure-page__docs">
        <div class="structure-page__docs-title">Документы</div>
        <div class="structure-page__docs-cards grid-cards-template">
          <hoverable-card
            :type="'download'"
            :mods="['download']"
            :index="index"
            :data="card"
            v-for="(card, index) in docs"
            :key="`structure-page-card-${index}`"
          />
        </div>
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
  name: 'StructurePageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
    HoverableCard,
  },
  data() {
    return {
      main: {},
      docs: [],
      structureImg: null,
    };
  },
  mounted() {
    this.getStructureData();
    document.title = `${process.env.VUE_APP_TITLE} - Руководство`;
  },
  methods: {
    getStructureData() {
      this.$axios
        .get(`https://sportunros.ru/wp-json/wp/v2/posts/516 `)
        .then((response) => {
          const content = document.createElement('div');
          content.innerHTML = response.data.content.rendered;

          const main = content.querySelector('.main-info');
          this.main.img = main.querySelector('img').src;
          this.main.name = main.querySelector('h2').textContent;
          this.main.post = main.querySelector('h4').textContent;
          this.main.list = [];
          main.querySelectorAll('li').forEach((el) => {
            this.main.list.push(el.textContent);
          });

          content.querySelectorAll('.wp-block-file a').forEach((doc) => {
            this.docs.push({
              title: doc.textContent,
              link: doc.href,
            });
          });

          this.structureImg = content.querySelector('.structure img').src;
        })
        .catch((e) => console.error(e));
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.structure-page {
  &__title {
    &:before {
      background: $green;
      top: -2px;
    }
  }

  &__docs {
    margin-top: 120px;
    padding-top: 40px;
    border-top: 1px solid $gray-2;

    &-title {
      font-weight: 700;
      font-size: 24px;
      line-height: 23px;
      text-transform: uppercase;
      text-align: left;
      margin-bottom: 32px;
    }

    img {
      width: 100%;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 32px;

    .hoverable-card {
      height: 190px;
      justify-content: flex-end;
    }
  }

  &__left {
    display: flex;
    padding: 24px;
    gap: 32px;
    align-items: center;
    max-height: 412px;
    background: $white;
    border-radius: 8px;
    text-align: left;

    &-img {
      width: 100%;
      max-height: 100%;
      object-fit: contain;
      object-position: 0;
      max-width: 300px;
    }

    &-name {
      font-weight: 600;
      font-size: 24px;
      line-height: 24px;
      margin-bottom: 16px;
    }

    &-post {
      font-weight: 600;
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 24px;
    }

    &-list-item {
      font-weight: 500;
      font-size: 12px;
      line-height: 24px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;

      &:before {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        background: $blue;
        margin-right: 8px;
        border-radius: 50%;
      }
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    row-gap: 32px;

    .hoverable-card__index {
      display: none;
    }
  }
}

@media screen and (max-width: 1200px) {
  .structure-page {
    &__content {
      grid-template-columns: 2.5fr 1fr;
      gap: 24px;
    }

    &__right {
      gap: 24px;
    }
  }
}

@media screen and (max-width: 991px) {
  .structure-page {
    &__content {
      grid-template-columns: 1fr;
    }
  }
}

@media screen and (max-width: 768px) {
  .structure-page {
    &__left {
      &-img {
        max-height: 200px;
        max-width: unset;
        width: auto;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .structure-page {
    &__left {
      flex-direction: column;
      max-height: unset;
      align-items: flex-start;
      &-img {
        max-height: unset;
        width: 100%;
      }
    }
  }
}
</style>
