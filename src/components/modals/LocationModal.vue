<template>
  <div class="location-modal" :class="{ 'location-modal--visible': isVisible }">
    <div class="location-modal__bg" @click="$parent.isLocationModal = false"></div>
    <div class="location-modal__content">
      <div class="location-modal__header">
        <div class="location-modal__title">Выберите город</div>
        <div class="location-modal__close" @click="$parent.isLocationModal = false">
          <img
            class="location-modal__close-icon"
            src="@/assets/images/icons/close-dark.svg"
            alt=""
          />
        </div>
      </div>
      <div class="location-modal__input-wrapper">
        <img
          class="location-modal__input-icon"
          src="@/assets/images/icons/location-search.svg"
          alt=""
        />
        <multi-select
          class="location-modal__input"
          :options="cities"
          :placeholder="`Введите название города `"
          :searchable="true"
          @select="handleLocation"
        ></multi-select>
      </div>
      <!-- <div class="location-modal__auto-define" @click="getCurrentLocation">
        Определить город автоматически
        <img
          src="@/assets/images/icons/location-modal.svg"
          alt=""
          class="location-modal__auto-define-icon"
        />
      </div> -->
      <div class="location-modal__list">
        <div
          class="location-modal__list-item"
          v-for="(city, index) in locations"
          :key="`location-modal-list-item_${index}`"
          @click="handleLocation(city)"
          :class="{ 'location-modal__list-item--active': city === location }"
        >
          {{ city }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCookies } from 'vue3-cookies';
import MultiSelect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

export default {
  name: 'LocationModal',
  components: { MultiSelect },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  props: {
    location: {
      type: String,
      default: () => '',
    },
    isVisible: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    handleLocation(city, type = 'default') {
      this.$parent.location = city;
      this.cookies.set('location', city, '30d');
      this.$parent.isLocationModal = false;
      if (type === 'auto') {
        this.$store.commit('addToast', {
          title: `Локация определена ${city}`,
          type: 'success',
          message: 'Локация определена',
        });
      } else {
        this.$store.commit('addToast', {
          title: `Локация выбрана ${city}`,
          type: 'success',
          message: 'Локация выбрана',
        });
      }
    },

    getCurrentLocation() {
      const _this = this;
      this.$axios
        .get('https://api.db-ip.com/v2/free/self')
        .then((res) => {
          const token = 'a3878b2384799511835add68bba4611ed3b03c28';
          const __this = _this;
          _this.$axios
            .get(
              `https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${res.data.ip}`,
              {
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `Token ${token}`,
                },
                mode: 'cors',
              }
            )
            .then((response) => {
              __this.$parent.location = response.data.location.data.city;

              __this.handleLocation(response.data.location.data.city, 'auto');
              __this.$parent.isLocationModal = false;
              if (!__this.locations.includes(response.data.location.data.city))
                __this.locations.push(response.data.location.data.city);
            })
            .catch((e) => {
              _this.$store.commit('addToast', {
                title: `Ошибка ${e}`,
                type: 'error',
                message: 'Не удалось определить локацию',
              });
            });
        })
        .catch((e) => {
          _this.$store.commit('addToast', {
            title: `Ошибка ${e}`,
            type: 'error',
            message: 'Не удалось определить локацию',
          });
        });
    },
  },
  data() {
    return {
      cities: [
        'Москва',
        'Санкт-Петербург',
        'Новосибирск',
        'Екатеринбург',
        'Нижний Новгород',
        'Казань',
        'Самара',
        'Челябинск',
        'Омск',
        'Ростов-на-Дону',
        'Уфа',
        'Красноярск',
        'Пермь',
        'Волгоград',
        'Воронеж',
        'Саратов',
        'Краснодар',
        'Тольятти',
        'Тюмень',
        'Ижевск',
        'Барнаул',
        'Ульяновск',
        'Иркутск',
        'Владивосток',
        'Ярославль',
        'Хабаровск',
        'Махачкала',
        'Оренбург',
        'Томск',
        'Новокузнецк',
        'Кемерово',
        'Астрахань',
        'Рязань',
        'Набережные',
        'Пенза',
        'Липецк',
        'Тула',
        'Киров',
        'Чебоксары',
        'Калининград',
        'Курск',
        'Улан-Удэ',
        'Ставрополь',
        'Магнитогорск',
        'Тверь',
        'Иваново',
        'Брянск',
        'Сочи',
        'Белгород',
        'Сургут',
      ],

      locations: ['Санкт-Петербург', 'Москва', 'Казань', 'Екатеринбург', 'Краснодар'],
    };
  },

  mounted() {
    if (!this.locations.includes(this.$parent.location))
      this.locations.unshift(this.$parent.location);
  },
  beforeUnmount() {},
  watch: {
    isVisible(val) {
      if (val) document.body.style = 'overflow: hidden;';
      else if (!this.$parent.isMobileMenu) document.body.removeAttribute('style');
    },
  },
};
</script>

<style lang="scss">
.location-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: $app-height;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  visibility: hidden;

  transition: $hover;

  &--visible {
    opacity: 1;
    visibility: visible;
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
    cursor: pointer;
  }

  &__content {
    position: relative;
    z-index: 9999;

    border-radius: 8px;
    background: $white;
    padding: 32px;
    min-width: 511px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;
  }

  &__close {
    padding: 8px;
    background: $gray-3;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &__input-wrapper {
    border: 1px solid $gray-2;
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 8px;
    margin-bottom: 24px;
  }

  &__input {
    width: 100%;

    &::placeholder {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
  }

  &__auto-define {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: $blue;
    column-gap: 8px;
    margin-bottom: 32px;
    cursor: pointer;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    max-height: 380px;

    &-item {
      text-align: left;
      font-weight: 600;
      font-size: 14px;
      line-height: 24px;
      padding: 14px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      position: relative;

      &:hover {
        background-color: $gray-3;
      }

      &:after {
        content: '';
        position: absolute;
        top: 12px;
        right: 12px;
        width: 24px;
        height: 24px;
        background: url('@/assets/images/icons/checked-blue.svg');
        opacity: 0;
        transition: $hover;
      }

      &--active {
        background: #e9f2ff;
        &:after {
          opacity: 1;
        }
      }
    }
  }

  .multiselect {
    height: fit-content;
    min-height: unset;
    height: 20px;
    font-family: 'Manrope';
    &.is-active {
      box-shadow: none;
    }
    border: none;

    &-caret {
      display: none;
    }

    &-search {
      padding-left: 16px;
    }

    &-placeholder {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
  }
}

@media screen and (max-width: 768px) {
  .location-modal {
    align-items: flex-end;
    opacity: 1;

    &__content {
      width: 100%;
      height: calc($app-height * 0.95);
      min-width: unset;
      padding: 24px 16px;
    }

    &__bg {
      opacity: 0;
      visibility: hidden;
      transition: $hover;
    }

    &__content {
      transform: translateY(100%);
      transition: $hover;
    }

    &--visible {
      visibility: visible;
      .location-modal__bg {
        opacity: 1;
        visibility: visible;
      }

      .location-modal__content {
        transform: translateY(0);
      }
    }

    &__auto-define {
      margin-bottom: 24px;
    }

    &__list {
      row-gap: 16px;
      max-height: calc($app-height / 2);
      overflow-y: scroll;

      &-item {
        padding: 12px;
      }
    }

    &__input-wrapper {
      .multiselect-placeholder {
        font-size: 12px;
        padding-left: 0;
      }
    }
  }
}
</style>
