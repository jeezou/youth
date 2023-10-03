<template>
  <div class="breadcrumbs container">
    <router-link
      :to="crumb.to"
      class="breadcrumbs__item"
      :class="[
        { 'breadcrumbs__item--last': index === crumbs.length - 1 },
        { 'breadcrumbs__item--prelast': index === crumbs.length - 2 },
      ]"
      v-for="(crumb, index) in crumbs"
      :key="`bc_${index}`"
    >
      <div class="breadcrumbs__item-text" v-html="crumb.text"></div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  components: {},
  data() {
    return {
      crumbs: null,
    };
  },
  props: {
    last: {
      type: String,
      default: () => '',
    },
    prelast: {
      type: String,
      default: () => '',
    },
  },
  mounted() {
    this.crumbs = this.getCrumbs();
    if (this.last) this.crumbs[this.crumbs.length - 1].text = this.last;

    if (this.prelast) this.crumbs[this.crumbs.length - 2].text = this.prelast;
  },
  methods: {
    getCrumbs() {
      const pathArray = this.$route.path.split('/');
      pathArray.shift();
      const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          path,
          /* eslint-disable */
          to: breadcrumbArray[idx - 3]
            ? `/${breadcrumbArray[idx - 3].path}/${breadcrumbArray[idx - 2].path}/${
                breadcrumbArray[idx - 1].path
              }/${path}`
            : breadcrumbArray[idx - 2]
            ? `/${breadcrumbArray[idx - 2].path}/${breadcrumbArray[idx - 1].path}/${path}`
            : breadcrumbArray[idx - 1]
            ? `/${breadcrumbArray[idx - 1].path}/${path}`
            : `/${path}`,
          text: this.$route.matched[idx] ? this.$route.matched[idx].meta.breadCrumb : path,
        });
        return breadcrumbArray;
        /* eslint-enable */
      }, []);
      breadcrumbs.unshift({
        path: 'main',
        to: '/',
        text: 'Главная',
      });
      return breadcrumbs;
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.breadcrumbs {
  display: flex;
  column-gap: 16px;

  &__item {
    font-weight: 500;
    font-size: 12px;
    line-height: 28px;
    color: $gray-2 !important;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: color 0.3s ease;
    white-space: nowrap;

    &:hover {
      color: $black !important;

      &:before {
        background: $black;
      }
    }

    &:first-child {
      &:before {
        display: none;
      }
    }

    &:before {
      content: '';
      position: relative;
      margin-right: 16px;
      width: 4px;
      height: 4px;
      background: $gray-2;
      border-radius: 50%;
      transition: $hover;
    }

    &--last {
      font-weight: 700;
      font-size: 12px;
      line-height: 28px;
      color: $black !important;
      white-space: nowrap;

      &:before {
        background: $black;
      }
      .breadcrumbs__item-text {
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 400px;
      }
    }

    &--prelast {
      .breadcrumbs__item-text {
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 400px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .common-page-wrapper {
    .breadcrumbs {
      &__item {
        &--last,
        &--prelast {
          .breadcrumbs__item-text {
            max-width: 130px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .breadcrumbs {
    flex-wrap: wrap;
    &__item {
      white-space: nowrap;
    }
  }
}
</style>
