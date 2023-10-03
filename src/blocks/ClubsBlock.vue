<template>
  <div class="clubs container">
    <div class="clubs__header">
      <h2 class="clubs__title">Клубы</h2>
      <router-link to="/clubs" class="clubs__all show-more-link" v-if="collapsed">
        Посмотреть все
      </router-link>
    </div>
    <div class="clubs__list">
      <div class="clubs__count clubs__count--clubs">
        <div class="clubs__count-title">Количество клубов</div>
        {{ clubs }} клубов
      </div>
      <div class="clubs__count clubs__count--members">
        <div class="clubs__count-title">Члены клубов "Юность России"</div>
        {{ members }} участников
      </div>
    </div>
    <router-link to="/clubs" class="clubs__all-mobile show-more-link" v-if="collapsed">
      Посмотреть все
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ClubsBlock',
  components: {},
  data() {
    return {
      clubs: null,
      members: null,
    };
  },
  props: {
    collapsed: {
      type: Boolean,
      default: () => true,
    },
  },
  mounted() {
    this.getCounters();
  },
  methods: {
    getCounters() {
      this.$axios.get(`https://sportunros.ru/wp-json/wp/v2/posts/593`).then((response) => {
        this.clubs = response.data.acf['количество_клубов'];
        this.members = response.data.acf['участники'];
      });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.clubs {
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
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  &__count {
    height: 175px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: $white;
    padding: 24px;
    border-radius: 8px;

    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    color: $blue;

    position: relative;

    &-title {
      position: absolute;
      top: 24px;
      left: 24px;

      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: $gray-1;
    }
  }
}

@media screen and (max-width: 768px) {
  .clubs {
    padding: 56px 0;
    margin-top: 56px;

    &__list {
      grid-template-columns: 1fr;
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
