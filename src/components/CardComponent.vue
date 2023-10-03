<template>
  <router-link
    :to="link ? link : `${path}/${data.id}`"
    class="card-item"
    :class="getAdditionalClasses"
  >
    <div class="card-item__image-wrapper">
      <img
        class="card-item__image"
        :src="data.img === false ? require('@/assets/images/no-image.jpg') : data.img"
        alt="event image"
      />
      <div class="card-item__tags" v-if="data.tag && data.tag.toLowerCase() !== 'не указано'">
        <badge-item class="card-item__tag card-item__tag--type" :badge="data.tag" />
        <div class="card-item__tag card-item__tag--live" v-if="data.isLive">В эфире</div>
        <div class="card-item__tag card-item__tag--record" v-if="data.isRecord">
          Доступна запись
        </div>
      </div>
    </div>
    <div class="card-item__content">
      <div class="card-item__title" v-html="data.title"></div>
      <div class="card-item__par">
        <span v-html="data.par" />
      </div>
    </div>
    <div class="card-item__footer">
      <div class="card-item__date">{{ data.date }}</div>
      <div class="card-item__time" v-if="data.time">{{ data.time }}</div>
    </div>
  </router-link>
</template>

<script>
import BadgeItem from '@/components/BadgeComponent.vue';

export default {
  name: 'CardComponent',
  components: { BadgeItem },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    path: {
      type: String,
      default: () => '',
    },
    link: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    getAdditionalClasses() {
      let res = '';
      if (this.data.mods) {
        this.data.mods.forEach((el) => {
          res += ` card-item--${el}`;
        });
      }
      if (this.data.img === false) res += ` card-item--no-img`;
      return res;
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.card-item {
  color: $black;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  justify-content: flex-start;

  &:hover {
    color: $black;
  }

  &--no-img {
    .card-item__image-wrapper {
      img {
        object-fit: contain !important;
        min-height: 100px;

        background-image: url('@/assets/images/loading.gif');
        background-size: 48px;
        background-repeat: no-repeat;
        background-position: 50%;
      }
    }
  }

  &__image-wrapper {
    border-radius: 8px;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
    background: #d9d9d9;
  }

  &__tags {
    position: absolute;
    top: 16px;
    left: 16px;

    display: flex;
    column-gap: 16px;
  }

  &__tag {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    padding: 4px 8px;

    background: $orange;

    &--type {
      border-radius: 23px;
      color: $white;
    }

    &--live,
    &--record {
      border-radius: 4px;
      background: $white;

      display: flex;
      align-items: center;
      column-gap: 8px;
    }

    &--live {
      &:before {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: $red;
      }
    }

    &--record {
      column-gap: 6px;
      &:before {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 5px 0 5px 9px;
        border-color: transparent transparent transparent $blue;
      }
    }
  }

  &__image {
    width: 100%;
    height: 215px;
    object-fit: cover;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 16px;
    text-align: left;
    min-height: 72px;

    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    max-height: 72px; /* fallback */
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;

    max-height: unset;
    min-height: unset;
    height: fit-content;
  }

  &__par {
    p {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: $gray-1;
      margin-bottom: 16px;
      text-align: left;

      word-break: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-height: 24px; /* fallback */
      max-height: 72px; /* fallback */
      -webkit-line-clamp: 3; /* number of lines to show */
      -webkit-box-orient: vertical;
    }
  }

  &__footer {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  &__date,
  &__time {
    padding: 4px 8px;
    border-radius: 18px;
    background: $white;
    display: flex;
    align-items: center;
    column-gap: 6px;

    font-weight: 500;
    font-size: 10px;
    line-height: 16px;

    &:before {
      content: '';
      display: inline-block;
      width: 16px;
      height: 16px;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  &__date {
    &:before {
      background: url('@/assets/images/icons/calendar-dark.svg');
    }
  }

  &__time {
    &:before {
      background: url('@/assets/images/icons/time-dark.svg');
    }
  }

  &--big {
    .card-item__title {
      word-break: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      font-size: 20px;
      line-height: 32px; /* fallback */
      max-height: 64px; /* fallback */
      min-height: 64px;
      -webkit-line-clamp: 2; /* number of lines to show */
      -webkit-box-orient: vertical;
    }

    .card-item__par {
      word-break: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-height: 24px; /* fallback */
      max-height: 48px; /* fallback */
      -webkit-line-clamp: 2; /* number of lines to show */
      -webkit-box-orient: vertical;
    }
  }
}
</style>
