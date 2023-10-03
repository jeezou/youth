<template>
  <div class="partners container">
    <div class="partners__header">
      <h2 class="partners__title">Партнеры</h2>
      <router-link to="/unity/partners" class="partners__all show-more-link" v-if="collapsed">
        Посмотреть все
      </router-link>
    </div>
    <div class="partners__list">
      <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
      <a
        class="partners__item"
        v-for="(partner, index) in partnersArr"
        :key="`partners-block-item${index}`"
        :href="partner.link"
        target="_blank"
      >
        <img class="partners__img" :src="partner.img" alt="" />
      </a>
    </div>
    <router-link to="/unity/partners" class="partners__all-mobile show-more-link" v-if="collapsed">
      Посмотреть все
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'PartnersBlock',
  components: {},
  data() {
    return {
      partners: [],
    };
  },
  props: {
    collapsed: {
      type: Boolean,
      default: () => true,
    },
    count: {
      type: Number,
      default: () => 4,
    },
  },
  mounted() {
    this.getPartners();
  },
  methods: {
    getPartners() {
      this.$axios
        .get(`https://sportunros.ru/wp-json/wp/v2/posts?categories=4&order=asc&orderby=date`)
        .then((response) => {
          response.data.forEach((partner) => {
            const block = document.createElement('div');
            block.innerHTML = partner.content.rendered;

            this.partners.push({
              link: block.querySelector('a').textContent,
              img: block.querySelector('.wp-block-image img').src,
            });
          });
        })
        .catch((e) => console.error(e));
    },
  },
  computed: {
    partnersArr() {
      return this.collapsed ? this.partners.slice(0, this.count) : this.partners;
    },
  },
};
</script>

<style lang="scss" scoped>
.partners {
  padding-bottom: 124px;
  padding-top: 40px;
  margin-top: 120px;
  border-top: 1px solid rgba($gray-2, 0.8);
  &__header {
    display: flex;
    justify-content: space-between;
    margin: 0 0 32px;
  }

  &__all-mobile {
    display: none;
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 23px;
    text-transform: uppercase;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    width: 100%;
  }

  &__item {
    background: $white;
    border-radius: 8px;
  }

  &__img {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .partners {
    padding: 56px 0;
    margin-top: 56px;
    &__list {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    &__all {
      display: none;
    }

    &__all-mobile {
      display: flex;
      text-align: left;
      margin-top: 32px;
      width: fit-content;
    }
  }
}
</style>
