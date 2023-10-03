<template>
  <router-link
    :to="data.link"
    class="hoverable-card"
    :class="[mods ? getAdditionalClasses : '']"
    v-if="type === 'archive' || type === 'unity'"
  >
    <div class="hoverable-card__index" v-if="index !== null">
      {{ index + 1 < 10 ? `0${index + 1}` : index + 1 }}
    </div>
    <div class="hoverable-card__footer">
      <div class="hoverable-card__title">
        {{ data.title }}
      </div>
      <div class="hoverable-card__link-icon">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.2929 9.95891C13.6834 9.56838 14.3166 9.56838 14.7071 9.95891L20.0404 15.2922C20.431 15.6828 20.431 16.3159 20.0404 16.7065L14.7071 22.0398C14.3166 22.4303 13.6834 22.4303 13.2929 22.0398C12.9024 21.6493 12.9024 21.0161 13.2929 20.6256L17.9191 15.9993L13.2929 11.3731C12.9024 10.9826 12.9024 10.3494 13.2929 9.95891Z"
            fill="#232327"
          />
        </svg>
      </div>
    </div>
    <img
      :src="require(`@/assets/images/${data.img}`)"
      alt=""
      class="hoverable-card__img-icon"
      v-if="data.img"
    />
  </router-link>

  <a
    :href="`${data.link}`"
    class="hoverable-card"
    :class="[mods ? getAdditionalClasses : '']"
    v-if="type === 'download' || type === 'journals' || type === 'collections'"
    download
    target="_blank"
  >
    <div class="hoverable-card__index">
      {{ index + 1 < 10 ? `0${index + 1}` : index + 1 }}
    </div>
    <img
      :src="data.img"
      alt=""
      class="hoverable-card__img"
      v-if="type === 'journals' || type === 'collections'"
    />
    <div class="hoverable-card__title">
      {{ data.title }}
      <div class="hoverable-card__download" v-if="type === 'download'">
        <svg
          width="22"
          height="24"
          viewBox="0 0 22 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="hoverable-card__svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.31732 0.333984C8.28584 0.333984 7.42541 1.12229 7.33533 2.14983C7.14701 4.29821 7.09935 6.45617 7.1925 8.6099C7.08006 8.61742 6.96763 8.62528 6.85523 8.63348L4.86922 8.77825C3.59982 8.87078 2.89021 10.2862 3.57552 11.3587C5.03709 13.6461 6.92036 15.6346 9.12495 17.2182L9.9206 17.7898C10.5657 18.2532 11.4346 18.2532 12.0797 17.7898L12.8753 17.2182C15.0799 15.6346 16.9632 13.6461 18.4247 11.3587C19.11 10.2862 18.4004 8.87078 17.131 8.77825L15.145 8.63348C15.0326 8.62528 14.9202 8.61742 14.8077 8.6099C14.9009 6.45616 14.8532 4.29821 14.6649 2.14983C14.5748 1.12229 13.7144 0.333984 12.6829 0.333984H9.31732ZM9.24211 9.48695C9.0905 7.10399 9.11881 4.71288 9.32686 2.33398H12.6734C12.8814 4.71288 12.9098 7.10399 12.7581 9.48695C12.7411 9.75411 12.832 10.0169 13.0103 10.2166C13.1886 10.4162 13.4395 10.5361 13.7069 10.5492C14.138 10.5705 14.569 10.5968 14.9996 10.6282L16.442 10.7333C15.1626 12.6177 13.5606 14.2634 11.7085 15.5939L11.0001 16.1027L10.2918 15.5939C8.43965 14.2634 6.83767 12.6177 5.55828 10.7333L7.00063 10.6282C7.43128 10.5968 7.86221 10.5705 8.29334 10.5492C8.56071 10.5361 8.81164 10.4162 8.98996 10.2166C9.16828 10.0169 9.25911 9.75411 9.24211 9.48695Z"
            fill="#232327"
          />
          <path
            d="M2.66669 18.6673C2.66669 18.115 2.21897 17.6673 1.66669 17.6673C1.1144 17.6673 0.666687 18.115 0.666687 18.6673V21.334C0.666687 22.6226 1.71136 23.6673 3.00002 23.6673H19C20.2887 23.6673 21.3334 22.6226 21.3334 21.334V18.6673C21.3334 18.115 20.8856 17.6673 20.3334 17.6673C19.7811 17.6673 19.3334 18.115 19.3334 18.6673V21.334C19.3334 21.5181 19.1841 21.6673 19 21.6673H3.00002C2.81593 21.6673 2.66669 21.5181 2.66669 21.334V18.6673Z"
            fill="#232327"
          />
        </svg>
      </div>
    </div>
  </a>

  <div
    class="hoverable-card"
    :class="[mods ? getAdditionalClasses : '']"
    v-if="type === 'gratitude'"
  >
    <img :src="data.img" alt="" class="hoverable-card__img" v-if="type === 'gratitude'" />
    <div class="hoverable-card__title">
      {{ data.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: () => null,
    },
    type: {
      type: String,
      default: () => '',
    },
    mods: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    getAdditionalClasses() {
      let res = '';
      this.mods.forEach((el) => {
        res += ` hoverable-card--${el}`;
      });
      return res;
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.hoverable-card {
  width: 100%;
  height: 328px;
  background: $white;
  padding: 32px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  transition: $hover;

  text-decoration: none;
  color: $black;
  position: relative;

  &--festival-subblock-docs {
    background: rgba($gray-3, 0.8);

    .hoverable-card__download {
      background: $gray-2;
      path {
        fill: $white;
      }
    }
  }

  &__img-icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    max-width: 160px;

    background-image: url('@/assets/images/loading.gif');
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: 50%;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    column-gap: 16px;
  }

  &__link-icon {
    border-radius: 8px;
    background: $gray-3;
    align-self: flex-end;
    min-width: 48px;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: $hover;
  }

  &__img {
    max-width: 168px;
    align-self: center;
  }

  &--gratitude {
    row-gap: 67px;
    height: auto;
  }

  &--journals,
  &--collections {
    height: auto;
    .hoverable-card__img {
      margin: 40px 0 48px;
      max-width: 130px;
    }
  }

  svg path {
    transition: $hover;
  }

  &:hover {
    color: $white;
    background: $blue;

    svg path {
      fill: $white;
    }

    .hoverable-card__download,
    .hoverable-card__link-icon {
      background: rgba(244, 244, 250, 0.64);
    }
  }

  &__title {
    width: 100%;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    column-gap: 32px;
  }

  &__index {
    width: 100%;
    font-weight: 500;
    font-size: 18px;
    line-height: 32px;
  }

  &__download {
    padding: 12px;
    background: $gray-3;
    border-radius: 8px;
    transition: $hover;
    width: 48px;
    height: 48px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
