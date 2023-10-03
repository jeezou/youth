<template>
  <main class="events-page container transparent-page-wrapper">
    <bread-crumbs />
    <div class="events-page-main container">
      <div class="events-page__header">
        <div class="events-page__title page-title">Мероприятия</div>
        <div class="events-page__filters-btn">
          <img src="@/assets/images/icons/filters-btn.svg" alt="" @click="isFilters = true" />
        </div>
      </div>
      <div class="events-page__filters" v-if="filters">
        <span class="events-page__filters-filter-wrapper--select">
          <multi-select
            type="text"
            class="events-page__filters-filter events-page__filters-filter"
            :options="Object.keys(filters[6].choices)"
            :placeholder="`Тип движения`"
            :searchable="true"
            v-model="type"
          />
        </span>
        <span class="events-page__filters-filter-wrapper--select">
          <multi-select
            type="text"
            class="events-page__filters-filter events-page__filters-filter"
            :options="Object.keys(filters[0].choices)"
            :placeholder="`Регион`"
            :searchable="true"
            v-model="region"
          />
        </span>
        <span class="events-page__filters-filter-wrapper--select">
          <multi-select
            type="text"
            class="events-page__filters-filter events-page__filters-filter"
            :options="Object.keys(filters[1].choices)"
            :placeholder="`Вид спорта`"
            :searchable="true"
            v-model="sportType"
          />
        </span>
        <!-- <span class="events-page__filters-filter-wrapper--range">
          <div class="events-page__filters-filter-text">Возраст (от и до)</div>
          <div class="range-wrapper">
            <range-slider
              v-model="age"
              :showTooltip="'drag'"
              :min="0"
              :max="60"
              @change="ageChanged = true"
            />
          </div>
        </span> -->
        <span class="events-page__filters-filter-wrapper--number">
          <input
            type="number"
            class="events-page__filters-filter events-page__filters-filter"
            v-model="age"
            placeholder="Возраст"
            min="0"
          />
        </span>
        <!--<span class="events-page__filters-filter-wrapper--number">
          <input
            type="number"
            class="events-page__filters-filter events-page__filters-filter"
            v-model="ageTo"
            placeholder="Возраст до"
            min="0"
          />
        </span> -->
        <span class="events-page__filters-filter-wrapper--dp">
          <vue-datepicker
            class="events-page__filters-filter events-page__filters-filter"
            v-model="date"
            :format="'dd.MM.yy'"
            :placeholder="'Дата'"
            :selectText="'Выбрать'"
            :cancelText="''"
            :enableTimePicker="false"
            locale="ru"
          />
        </span>
        <!-- <span class="events-page__filters-filter-wrapper--dp">
          <vue-datepicker
            class="events-page__filters-filter events-page__filters-filter"
            v-model="dpTo"
            :format="'dd.MM.yy'"
            :placeholder="'Даты'"
            :selectText="'Выбрать'"
            :cancelText="''"
            :enableTimePicker="false"
            locale="ru"
            range
          />
        </span> -->
        <div class="events-page__filters-submit" @click="getFilteredEvents">Начать поиск</div>
        <div
          class="events-page__filters-reset"
          :class="{
            'events-page__filters-reset--active': type || region || sportType || age || date,
          }"
          @click="resetFilters"
        >
          Сбросить
        </div>
      </div>
      <div class="events-page__table-wrapper">
        <b-table-simple class="events-page__table" bordered hover>
          <b-thead>
            <b-tr>
              <b-th v-for="(field, i) in fields" :key="`table_head-${i}`" :class="field.class">
                {{ field.label }}
              </b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr
              v-for="(row, rowIndex) in currentPageRows"
              :key="`table_row-${rowIndex}`"
              class="events-page__table-row"
            >
              <b-td class="events-page__table--title">
                <router-link :to="`events/${row.id}`">
                  {{ row.title ? row.title : 'Не указано' }}
                </router-link>
              </b-td>
              <b-td class="events-page__table--age">
                <router-link :to="`events/${row.id}`">
                  {{ row.age ? row.age : 'Не указано' }}
                </router-link>
              </b-td>
              <b-td class="events-page__table--types">
                <router-link :to="`events/${row.id}`">
                  {{ row.type ? row.type : 'Не указано' }}
                </router-link>
              </b-td>
              <b-td class="events-page__table--region">
                <router-link :to="`events/${row.id}`">
                  {{ row.region ? row.region : 'Не указано' }}
                </router-link>
              </b-td>
              <b-td class="events-page__table--interval">
                <router-link :to="`events/${row.id}`">
                  {{ row.interval ? row.interval : 'Не указано' }}
                </router-link>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </div>
      <b-pagination
        class="events-page__pagination"
        v-model="currentPage"
        :total-rows="events.length"
        :per-page="perPage"
        :limit="3"
        prev-text="Назад"
        next-text="Вперед"
        hide-goto-end-buttons
        page-class="page-num-btn"
        prev-class="prev-btn"
        next-class="next-btn"
      ></b-pagination>
      <div class="events-page__cards-wrapper">
        <h2 class="events-page__subtitle">Фестивали</h2>
        <div class="events-page__cards">
          <hoverable-card
            :type="'unity'"
            :mods="['unity']"
            :index="index"
            :data="card"
            v-for="(card, index) in festivals"
            :key="`festival-events-page-${index}`"
          />
        </div>
      </div>
      <div class="events-page__cards-wrapper">
        <h2 class="events-page__subtitle">Календари</h2>
        <div class="events-page__cards">
          <hoverable-card
            :type="'download'"
            :mods="['download']"
            :index="index"
            :data="card"
            v-for="(card, index) in calendars"
            :key="`calendar-events-page-${index}`"
          />
        </div>
      </div>
    </div>
    <partners-block />
  </main>
  <filters-modal
    :filters="filters"
    v-if="filters && filters.length"
    :isRegion="true"
    :isSportType="true"
    :isAge="true"
    :isDate="true"
    :singleDate="true"
    :isRangeAge="false"
    :singleAge="true"
    :isRangeDate="true"
    :isVisible="isFilters ? true : false"
    :isType="true"
    :page="'events'"
    @submit="(e) => getFilteredEvents('modal', e)"
  />
</template>

<script>
/* eslint-disable */
import PartnersBlock from '@/blocks/PartnersBlock.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import HoverableCard from '@/components/HoverableCard.vue';
import FiltersModal from '@/components/modals/FiltersModal.vue';

import MultiSelect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

import VueDatepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import RangeSlider from '@vueform/slider';
import '@vueform/slider/themes/default.css';

export default {
  name: 'EventsPageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
    HoverableCard,
    FiltersModal,
    MultiSelect,
    VueDatepicker,
    RangeSlider,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 9,

      isFilters: false,
      filters: null,

      type: null,
      region: null,
      sportType: null,
      age: null,
      date: null,

      dpFrom: null,
      dpTo: null,

      ageFrom: null,
      ageTo: null,

      ageInterval: [10, 50],
      ageChanged: false,

      fields: [
        {
          key: 'title',
          label: 'Мероприятие',
          class: 'events-page__table-head-item events-page__table--title',
        },
        {
          key: 'age',
          label: 'Возраст',
          class: 'events-page__table-head-item events-page__table--age',
        },
        {
          key: 'type',
          label: 'Виды спорта',
          class: 'events-page__table-head-item events-page__table--type',
        },
        {
          key: 'region',
          label: 'Регион',
          class: 'events-page__table-head-item events-page__table--region',
        },
        {
          key: 'interval',
          label: 'Период проведения',
          class: 'events-page__table-head-item events-page__table--interval',
        },
      ],

      festivals: [],
      events: [],
      calendars: [],
    };
  },
  mounted() {
    document.title = `Юность России - Мероприятия`;

    this.getEvents();
    this.getFilters();
    this.getFestivals();
    this.getCalendars();
  },
  computed: {
    currentPageRows() {
      return this.events.slice(
        (this.currentPage - 1) * this.perPage,
        this.perPage * this.currentPage
      );
    },
  },
  methods: {
    getCalendars() {
      this.$axios.get('https://sportunros.ru/wp-json/wp/v2/posts/441').then((response) => {
        const content = document.createElement('div');
        content.innerHTML = response.data.content.rendered;
        content.querySelectorAll('.wp-block-file').forEach((file) => {
          this.calendars.push({
            title: file.querySelector('a').textContent,
            link: file.querySelector('a').href,
          });
        });
      });
    },
    getFestivals() {
      this.$axios
        .get('https://sportunros.ru/wp-json/wp/v2/posts?categories=11')
        .then((response) => {
          response.data.forEach((e) => {
            this.festivals.push({
              title: e.title.rendered,
              link: `events/festivals/${e.id}`,
            });
          });
        });
    },
    resetFilters() {
      this.type = null;
      this.region = null;
      this.sportType = null;
      this.age = null;
      this.date = null;

      this.dpFrom = null;
      this.dpTo = null;
      this.ageChanged = false;
      this.ageInterval = [10, 40];

      this.events = [];
      this.getEvents();
    },
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
    getDateInterval(dateFrom, dateTo) {
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
      const splittedFrom = dateFrom.split('-');
      const splittedTo = dateTo.split('-');
      return months[parseInt(splittedFrom[1], 10) - 1] ===
        months[parseInt(splittedTo[1], 10) - 1] && splittedFrom[0] === splittedTo[0]
        ? `${splittedFrom[2].slice(0, 2)} - ${splittedTo[2].slice(0, 2)} ${
            months[parseInt(splittedFrom[1], 10) - 1]
          } ${splittedFrom[0]} г`
        : `${splittedFrom[2].slice(0, 2)} ${months[parseInt(splittedFrom[1], 10) - 1]} ${
            splittedFrom[0]
          } г - ${splittedTo[2].slice(0, 2)} ${months[parseInt(splittedTo[1], 10) - 1]} ${
            splittedTo[0]
          } г`;
    },
    getFilters() {
      this.$axios.get('https://sportunros.ru/wp-json/acfextra/v1/fields').then((response) => {
        this.filters = response.data.filter((e) => e.name === 'Мероприятия')[0].fields;
      });
    },
    parseDate(type, date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${
        d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
      }-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}T${
        type === 'from' ? '00:00:00' : '23:59:59'
      }`;
    },
    getFilteredEvents(mode, filters) {
      if (mode === 'modal') {
        this.type = filters.type;
        this.region = filters.region;
        this.sportType = filters.sportType;
        this.age = filters.age;
        this.date = filters.date;
      }

      this.events = [];

      this.$axios
        .get(
          `https://sportunros.ru/wp-json/wp/v2/posts?categories=3,7,8,9,10${
            this.type ? `&action=${this.type}` : ''
          }${this.region ? `&region=${this.region}` : ''}${
            this.sportType ? `&type=${this.sportType}` : ''
          }${this.age ? `&year=${this.age}` : ''}${
            this.date
              ? `&time_from=${this.parseDate('from', this.date)}&time_to=${this.parseDate(
                  'to',
                  this.date
                )}`
              : ''
          }`
        )
        .then((response) => {
          const events = response.data;
          events.forEach((el) => {
            this.events.push({
              age: `от ${el.acf.year_from} до ${el.acf.year_to}`,
              type: el.acf.type,
              region: el.acf.region,
              title: el.title.rendered,
              interval: this.getDateInterval(el.acf.time_from, el.acf.time_to),
              id: el.id,
              action: el.acf.action,
            });
          });
        })
        .catch((e) => console.error(e));
    },
    getEvents() {
      this.$axios
        .get(`https://sportunros.ru/wp-json/wp/v2/posts?categories=3,7,8,9,10`)
        .then((response) => {
          const events = response.data;
          events.forEach((el) => {
            this.events.push({
              age: `от ${el.acf.year_from} до ${el.acf.year_to}`,
              type: el.acf.type,
              region: el.acf.region,
              title: el.title.rendered,
              interval: this.getDateInterval(el.acf.time_from, el.acf.time_to),
              id: el.id,
              action: el.acf.action,
            });
          });
        })
        .catch((e) => console.error(e));
    },
  },
};
</script>

<style lang="scss">
.events-page {
  padding: 0 120px 72px;

  &__title {
    margin: 24px 0 40px;
  }

  &__filters-btn {
    display: none;
  }

  &__header {
    display: flex;
    column-gap: 24px;
    justify-content: space-between;
  }

  &__pagination {
    display: flex;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;

    .page-item {
      &.active {
        .page-link {
          background: $black;

          &:hover {
            color: $white;
          }
        }
      }

      .page-link {
        &:hover {
          color: rgba($black, 0.9);
        }
      }
    }

    .page-link {
      color: $black;
    }

    .prev-btn,
    .next-btn {
      .page-link {
        padding: 22px 0;
        width: 152px;
        border-radius: 0 !important;
        border: none;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        box-shadow: none;
      }
    }

    .prev-btn {
      margin-right: 24px;
    }

    .page-num-btn {
      margin-right: 16px;

      .page-link {
        padding: 22px 17px;
        border: none;
        font-weight: 600;
        font-size: 16px;
        box-shadow: none;
        line-height: 20px;
      }
    }

    .next-btn {
      margin-left: 8px;
    }
  }

  &__table {
    margin-bottom: 32px !important;

    border-radius: 8px;
    box-shadow: inset 0 0 0 1px #d7dae1 !important;
    overflow: hidden;

    &-wrapper {
      width: 100%;
    }

    &-head-item {
      font-weight: 700;
      font-size: 14.04px;
      line-height: 20px;
    }

    &--title {
      max-width: 373px;
    }

    &-row {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    td {
      font-weight: 500;
      font-size: 14.04px;
      line-height: 20px;
    }

    th,
    td {
      padding: 14px 16px !important;

      a {
        text-decoration: none;
        color: $black;
      }
    }

    td {
      padding: 0 !important;

      a {
        display: block;
        padding: 14px 16px !important;
      }
    }
  }

  &__filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    column-gap: 16px;

    &-filter,
    &-submit,
    &-reset {
      min-width: 148px;
      padding: 14px 0;
      cursor: pointer;
      border-radius: 4px;
      white-space: nowrap;
      color: $black;

      &::placeholder {
        color: $black;
      }
    }

    &-submit,
    &-reset {
      padding: 14px;
    }

    &-filter {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      background: $white;
      border: none;
      padding: 14px 12px;
      height: 48px;

      -moz-appearance: none; /* Firefox */
      -webkit-appearance: none; /* Safari and Chrome */
      appearance: none;

      &:focus {
        outline: none;
        box-shadow: none;
      }

      &-wrapper {
        position: relative;
        &:after {
          content: '';
          position: absolute;
          top: 12px;
          right: 12px;
          width: 24px;
          height: 24px;
          background: url('@/assets/images/icons/select-arrow.svg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          pointer-events: none;
        }

        &--dp {
          width: 100%;
          min-width: 200px;
          .events-page__filters-filter {
            padding: 0;
          }

          .dp__main {
            width: 100%;
            min-width: 200px;
          }

          .dp__icon {
            fill: $black;
          }

          .dp__input {
            height: 48px;
            border: none;
            line-height: 48px;
            font-weight: 600;
            font-size: 14px;
            font-family: 'Manrope';

            &::placeholder {
              opacity: 1;
              font-weight: 600;
              font-family: 'Manrope';
              font-size: 14px;
              color: $black;
            }

            &:focus {
              box-shadow: none;
            }
          }
        }

        &--range {
          width: fit-content;
          height: 48px;
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
            top: 12px;
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

          .events-page__filters-filter-text {
            font-weight: 600;
            font-size: 14px;
            text-align: left;
          }
        }

        &--select {
          width: 100%;
          .multiselect {
            width: 100%;
            box-shadow: none !important;
            font-weight: 600;
            font-size: 14px;
            font-family: 'Manrope';

            &-placeholder {
              font-weight: 600;
              font-size: 14px;
              font-family: 'Manrope';
              color: $black;
            }
            &-search {
              padding-left: 14px;
              font-weight: 600;
              font-size: 14px;
              font-family: 'Manrope';
            }
            &-caret {
              background: $black;
            }
            &-dropdown {
              max-height: 300px;
              width: 250px;
            }
          }
        }
      }
    }

    &-submit {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: $white;
      background: $black;
      transition: $hover;

      &:hover {
        background: $hover-black;
      }
    }

    &-reset {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      background: $gray-2;
      color: $white;

      transition: $hover;
      pointer-events: none;

      &--active {
        pointer-events: all;
        background: $red;
        &:hover {
          background: rgba($red, 0.85);
        }
      }
    }
  }

  &__cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 32px;
  }

  &__subtitle {
    margin-bottom: 40px;
    font-weight: 700;
    font-size: 24px;
    line-height: 23px;
    text-transform: uppercase;
    text-align: left;
  }

  &__cards-wrapper {
    padding-top: 40px;
    margin-top: 120px;
    border-top: 1px solid rgba(198, 203, 217, 0.8);
  }
}

@media screen and (max-width: 1400px) {
  .events-page {
    &__filters {
      display: grid;
      grid-template-areas:
        'type type region region sport-type sport-type'
        'age age age date date date'
        'submit submit submit reset reset reset';
      grid-template-columns: repeat(6, 1fr);
      gap: 16px 24px;

      > :nth-child(1) {
        grid-area: type;
      }
      > :nth-child(2) {
        grid-area: region;
      }
      > :nth-child(3) {
        grid-area: sport-type;
      }
      > :nth-child(4) {
        grid-area: age;
      }
      > :nth-child(5) {
        grid-area: date;
      }
      > :nth-child(6) {
        grid-area: submit;
      }
      > :nth-child(7) {
        grid-area: reset;
      }

      &-filter,
      &-submit,
      &-reset {
        width: 100%;
      }
    }

    &__cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }
  }
}

@media screen and (max-width: 991px) {
  .events-page {
    &__cards {
      grid-template-columns: 1fr 1fr;
    }
  }
}

@media screen and (max-width: 768px) {
  .events-page {
    &__cards {
      grid-template-columns: 1fr;
    }

    &__table {
      min-width: 800px;
    }

    &__table-wrapper {
      overflow-x: scroll;
    }

    &__filters {
      display: none;
    }

    &__filters-btn {
      display: flex;
      width: 48px;
      height: 48px;
    }

    &__header {
      align-items: center;
    }
  }
}

@media screen and (max-width: 576px) {
  .events-page {
    &__table {
      min-width: 800px;
      margin-bottom: 0 !important;

      &-wrapper {
        width: calc(100vw - 16px);
        overflow-x: scroll;
        margin-bottom: 24px;
        border-radius: 8px;

        &::-webkit-scrollbar {
          display: none;
        }

        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    }

    &__pagination {
      .page-item {
        margin-right: 8px !important;
        margin-left: 0 !important;
        .page-link {
          padding: 12px 14px !important;
          font-size: 14px;
        }
      }

      .prev-btn,
      .next-btn {
        .page-link {
          width: 80px;
        }
      }
    }
  }
}
</style>
