<template>
  <div class="filters-modal" :class="{ 'filters-modal--visible': isVisible }">
    <div class="filters-modal__bg" />
    <div class="filters-modal__content">
      <div class="filters-modal__top">
        <div class="filters-modal__header">
          <div class="filters-modal__title">Все фильтры</div>
          <div class="filters-modal__close" @click="$parent.isFilters = false">
            <img
              class="filters-modal__close-icon"
              src="@/assets/images/icons/close-dark.svg"
              alt=""
            />
          </div>
        </div>
        <div class="filters-modal__filters">
          <span
            class="filters-modal__input-wrapper filters-modal__input-wrapper--region"
            v-if="isRegion"
          >
            <multi-select
              type="text"
              class="filters-modal__input"
              :options="Object.keys(filters[0].choices)"
              :placeholder="`По регионам`"
              :searchable="true"
              v-model="region"
            />
          </span>
          <span
            class="filters-modal__input-wrapper filters-modal__input-wrapper--sport-type"
            v-if="isSportType"
          >
            <multi-select
              type="text"
              class="filters-modal__input"
              :options="Object.keys(filters[1].choices)"
              :placeholder="`Вид спорта`"
              :searchable="true"
              v-model="sportType"
            />
          </span>
          <span
            class="filters-modal__input-wrapper filters-modal__input-wrapper--sport-type"
            v-if="isType"
          >
            <multi-select
              type="text"
              class="filters-modal__input"
              :options="Object.keys(filters[6].choices)"
              :placeholder="`Тип движения`"
              :searchable="true"
              v-model="type"
            />
          </span>
          <span
            class="filters-modal__input-wrapper filters-modal__input-wrapper--date"
            :class="{ 'filters-modal__input-wrapper--date-selected': date }"
            v-if="isDate && singleDate"
          >
            <vue-datepicker
              class="filters-modal__input"
              v-model="date"
              :format="'dd.MM.yy'"
              :placeholder="'По дате'"
              :selectText="'Выбрать'"
              :cancelText="''"
              :enableTimePicker="false"
              locale="ru"
            />
          </span>
          <span
            class="filters-modal__input-wrapper filters-modal__input-wrapper--date"
            v-if="isDate && !singleDate && isRangeDate"
          >
            <vue-datepicker
              class="events-page__filters-filter events-page__filters-filter"
              v-model="dateInterval"
              :format="'dd.MM.yy'"
              :placeholder="'Даты'"
              :selectText="'Выбрать'"
              :cancelText="''"
              :enableTimePicker="false"
              locale="ru"
              range
            />
          </span>
          <span
            class="filters-modal__input-wrapper filters-modal__input-wrapper--date"
            :class="{ 'filters-modal__input-wrapper--date-selected': dateFrom }"
            v-if="isDate && !singleDate && !isRangeDate"
          >
            <vue-datepicker
              class="filters-modal__input"
              v-model="dateFrom"
              :format="'dd.MM.yy'"
              :placeholder="'Дата начала'"
              :selectText="'Выбрать'"
              :cancelText="''"
              :enableTimePicker="false"
              locale="ru"
            />
          </span>
          <span
            class="filters-modal__input-wrapper filters-modal__input-wrapper--date"
            :class="{ 'filters-modal__input-wrapper--date-selected': dateTo }"
            v-if="isDate && !singleDate && !isRangeDate"
          >
            <vue-datepicker
              class="filters-modal__input"
              v-model="dateTo"
              :format="'dd.MM.yy'"
              :placeholder="'Дата конца'"
              :selectText="'Выбрать'"
              :cancelText="''"
              :enableTimePicker="false"
              locale="ru"
            />
          </span>
          <span
            class="filters-modal__input-wrapper filters-modal__input-wrapper--range"
            v-if="isAge && isRangeAge"
          >
            <div class="filters-modal__input-text">Возраст (от и до)</div>
            <div class="range-wrapper">
              <range-slider
                v-model="ageInterval"
                :showTooltip="'drag'"
                :min="0"
                :max="60"
                @change="ageChanged = true"
              />
            </div>
          </span>
          <span
            class="filters-modal__input-wrapper filters-modal__input-wrapper--age"
            v-if="isAge && !isRangeAge && singleAge"
          >
            <input
              type="number"
              class="filters-modal__input"
              v-model="age"
              placeholder="Возраст"
              min="0"
            />
          </span>
          <span
            class="filters-modal__input-wrapper filters-modal__input-wrapper--age"
            v-if="isAge && !isRangeAge && !singleAge"
          >
            <input
              type="number"
              class="filters-modal__input"
              v-model="ageFrom"
              placeholder="Возраст от"
              min="0"
            />
          </span>
          <span
            class="filters-modal__input-wrapper filters-modal__input-wrapper--age"
            v-if="isAge && !isRangeAge && !singleAge"
          >
            <input
              type="number"
              class="filters-modal__input"
              v-model="ageTo"
              placeholder="Возраст до"
              min="0"
            />
          </span>
        </div>
      </div>
      <div class="filters-modal__footer">
        <div class="filters-modal__submit-btn" @click="submitFilters">
          {{ $route.path === '/news' ? 'Применить фильтр' : 'Найти' }}
        </div>
        <div
          class="filters-modal__reset-btn"
          :class="{
            'filters-modal__reset-btn--disabled':
              !date &&
              !region &&
              !sportType &&
              !dateFrom &&
              !dateTo &&
              !age &&
              !ageFrom &&
              !ageTo &&
              !ageChanged &&
              !dateInterval &&
              !type,
          }"
          @click="resetFilters"
        >
          Сбросить
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

import VueDatepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import RangeSlider from '@vueform/slider';
import '@vueform/slider/themes/default.css';

export default {
  name: 'FiltersModal',
  components: { MultiSelect, VueDatepicker, RangeSlider },
  emits: ['submit'],
  props: {
    filters: {
      type: Array,
      default: () => [],
    },
    singleDate: {
      type: Boolean,
      default: () => false,
    },
    isDate: {
      type: Boolean,
      default: () => false,
    },
    isType: {
      type: Boolean,
      default: () => false,
    },
    isRegion: {
      type: Boolean,
      default: () => false,
    },
    isSportType: {
      type: Boolean,
      default: () => false,
    },
    singleAge: {
      type: Boolean,
      default: () => false,
    },
    isAge: {
      type: Boolean,
      default: () => false,
    },
    isVisible: {
      type: Boolean,
      default: () => false,
    },
    isRangeDate: {
      type: Boolean,
      default: () => false,
    },
    isRangeAge: {
      type: Boolean,
      default: () => false,
    },
    page: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    resetFilters() {
      this.date = null;
      this.region = null;
      this.sportType = null;
      this.dateFrom = null;
      this.dateTo = null;
      this.age = null;
      this.ageFrom = null;
      this.ageTo = null;
      this.ageInterval = [10, 40];
      this.ageChanged = false;
      this.dateInterval = null;
      this.type = null;

      this.submitFilters();
    },
    submitFilters() {
      if (this.page === 'news')
        this.$emit('submit', {
          date: this.date,
          region: this.region,
          sportType: this.sportType,
        });
      else if (this.page === 'events') {
        this.$emit('submit', {
          region: this.region,
          sportType: this.sportType,
          date: this.date,
          age: this.age,
          type: this.type,
        });
      }
      this.$parent.isFilters = false;
    },
  },
  data() {
    return {
      age: null,
      ageFrom: null,
      ageTo: null,
      date: null,
      dateFrom: null,
      dateTo: null,
      region: null,
      sportType: null,
      search: null,
      type: null,

      ageInterval: [10, 50],
      ageChanged: false,

      dateInterval: null,
    };
  },
  mounted() {},
  beforeUnmount() {},
  watch: {
    isVisible(val) {
      if (val) document.body.style = 'overflow: hidden;';
      else document.body.removeAttribute('style');
    },
  },
};
</script>

<style lang="scss">
.filters-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  visibility: hidden;
  transition: $hover;

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

  &--visible {
    visibility: visible;
    .filters-modal {
      &__bg {
        opacity: 1;
        visibility: visible;
      }

      &__content {
        transform: translateY(0);
      }
    }
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

    opacity: 0;
    visibility: hidden;
    transition: $hover;
  }

  &__top {
    height: calc($app-height - $app-height * 0.05 - 24px - 96px - 16px - 32px - 32px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-grow: 1;
    row-gap: 16px;
    height: 112px;
    margin-top: 32px;
  }

  &__content {
    position: relative;
    z-index: 9999;
    width: 100%;
    height: calc($app-height * 0.95);
    background: $white;
    border-radius: 16px 16px 0 0;
    padding: 24px 16px;

    transform: translateY(100%);
    transition: $hover;
  }

  &__filters {
    border-radius: 8px;
    background: transparent;

    row-gap: 16px;

    select,
    input {
      border: none;
      appearance: none;
      &:focus {
        outline: none;
      }
      background: transparent;
    }
  }

  &__input {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }

  &__submit-btn,
  &__reset-btn {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: $white;
    background: $black;
    border-radius: 8px !important;
    padding: 14px 0;
    min-width: 148px;
    transition: $hover;
    min-height: 48px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__reset-btn {
    background: $red;
  }

  &__reset-btn {
    &--disabled {
      background: $gray-2;
      pointer-events: none;
    }
  }

  &__show-more {
    width: 100%;
    padding: 14px 0;
    border-radius: 8px;
    background: $white;
    color: $black;
    font-weight: 600;
    cursor: pointer;
    transition: $hover;
    margin-top: 32px;
    max-height: 52px;

    grid-area: btn;

    &:hover {
      background: $black;
      color: $white;
    }
  }

  &__input-wrapper {
    background: $white;
    border-radius: 8px;
    position: relative;
    height: 64px;
    width: 100%;
    border: 1px solid $gray-3;
    margin-bottom: 16px;

    &--range {
      width: fit-content;
      height: 64px;
      position: relative;
      background: $white;
      padding: 16px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      width: 100%;
      transition: $hover;

      &:after {
        content: '';
        position: absolute;
        top: 20px;
        right: 12px;
        width: 24px;
        height: 24px;
        background: url('@/assets/images/icons/select-arrow.svg');
        transform: rotate(180deg);
        transition: $hover;
      }

      &:hover {
        border-radius: 4px 4px 0 0;
        .range-wrapper {
          opacity: 1;
          visibility: visible;
          transform: translateY(100%);
        }

        &:after {
          transform: rotate(0);
        }
      }

      .range-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        transform: translateY(calc(100% + 5px));
        width: 100%;
        padding: 10px;
        background: $white;
        border-radius: 0 0 4px 4px;
        opacity: 0;
        visibility: hidden;

        transition: $hover;
      }

      .slider-connect {
        background: $blue;
      }

      .slider-tooltip {
        background: $blue;
        border-color: $blue;
      }

      .filters-modal__input-text {
        font-weight: 600;
        font-size: 14px;
        text-align: left;
      }
    }

    &--search {
      flex-grow: 6;
      .filters-modal__input {
        margin-left: 16px;
        width: 100%;

        font-weight: 600;
        font-size: 14px;
        line-height: 20px;

        &::placeholder {
          color: $gray-1;
        }
      }

      position: relative;
      display: flex;
      align-items: center;

      &:before {
        content: '';
        position: relative;
        display: block;
        width: 24px;
        height: 24px;
        background: url('@/assets/images/icons/search-gray.svg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        margin-left: 16px;
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: fit-content;
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

    &--type {
      display: flex;
      align-items: center;
      flex-grow: 1;

      .filters-modal__input {
        padding: 14px 40px 14px 12px;
        width: 100%;
      }

      &:after {
        content: '';
        position: absolute;
        width: 24px;
        height: 24px;
        top: 14px;
        right: 10px;
        background: url('@/assets/images/icons/select-arrow.svg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        transform: rotate(180deg);
        pointer-events: none;
      }
    }

    &--type {
      display: none;
    }

    &--date {
      padding: 0;
      display: flex;
      align-items: center;

      > :first-child {
        padding: 0;
      }

      &-selected {
        .dp__clear_icon {
          right: 24px !important;
        }
      }

      .dp {
        &__icon {
          right: 0;
          left: unset;
          fill: $black;
        }

        &__main {
          width: 100%;
        }

        &__pointer {
          padding: 12px 14px;

          &::placeholder {
            font-family: 'Manrope';
            color: $black;
            opacity: 1;
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
    }

    &--region,
    &--sport-type {
      width: 100%;
      max-width: unset;
      display: flex;
      align-items: center;

      .multiselect {
        border: none;
        box-shadow: none;

        &-placeholder {
          color: $black;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
        }

        &-caret {
          background: rgba($black, 0.8);
          z-index: 0;
        }

        &:focus {
          box-shadow: none;
        }

        &-dropdown {
          max-height: 250px;
        }

        &-search {
          padding: 12px;
          &:focus {
            box-shadow: none;
          }
        }
      }
    }

    &--age {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 14px;

      .filters-modal__input {
        width: 100%;
        &::placeholder {
          color: $black;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .location-modal {
    align-items: flex-end;
    &__content {
      width: 100%;
      height: calc($app-height * 0.95);
      min-width: unset;
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
