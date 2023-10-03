<template>
  <main class="gallery-page container">
    <div class="gallery-page__inner-wrapper transparent-page-wrapper">
      <bread-crumbs ref="breadcrumbs" />
      <h1 class="gallery-page__title page-title">Фотогаларея</h1>
      <div class="gallery-page__table-wrapper">
        <b-table-simple class="gallery-page__table" bordered hover>
          <b-thead>
            <b-tr>
              <b-th
                v-for="(field, i) in $options.fields"
                :key="`gallery-table_head-${i}`"
                class="gallery-page__table-head"
              >
                {{ field }}
              </b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr
              v-for="(row, rowIndex) in rows"
              :key="`table_row-${rowIndex}`"
              class="gallery-page__table-row"
            >
              <b-td class="gallery-page__table--title">
                <router-link :to="`gallery/${row.id}`">
                  {{ row.title ? row.title : 'Не указано' }}
                </router-link>
              </b-td>
              <b-td class="gallery-page__table--city">
                <router-link :to="`gallery/${row.id}`">
                  {{ row.city ? row.city : 'Не указано' }}
                </router-link>
              </b-td>
              <b-td class="gallery-page__table--date">
                <router-link :to="`gallery/${row.id}`">
                  {{ row.date ? row.date : 'Не указано' }}
                </router-link>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </div>
    </div>
    <partners-block />
  </main>
</template>

<script>
import PartnersBlock from '@/blocks/PartnersBlock.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

export default {
  name: 'GalleryPageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
  },
  data() {
    return {
      rows: [],
    };
  },
  fields: ['Название мероприятия', 'Город', 'Дата'],
  // rows: [
  //   {
  //     title: 'IV Всероссийская Гимназиада',
  //     city: 'Орел',
  //     date: '29 сен - 3 окт 2016 года',
  //     id: '0',
  //   },
  //   {
  //     title: 'Легкоатлетический кросс',
  //     city: 'Сарапул, Удмуртская область',
  //     date: '28 сен 2016 года',
  //     id: '0',
  //   },
  //   {
  //     title: 'Первенство ОГФСО «Юность России» по футболу «Спортивный олимп»',
  //     city: 'Анапа',
  //     date: '19 - 28 сен 2016 года',
  //     id: '0',
  //   },
  //   {
  //     title: 'IV Всероссийский фестиваль спорта',
  //     city: 'Анапа',
  //     date: '12 - 17 сен 2016 года',
  //     id: '0',
  //   },
  //   {
  //     title: 'Первенство ОГФСО «Юность России» по греко-римской борьбе',
  //     city: 'Михайлов',
  //     date: '2 - 4 сен 2016 года',
  //     id: '0',
  //   },
  //   {
  //     title: 'Всероссийский форум «Дни самбо»',
  //     city: 'Крым',
  //     date: '9 - 11 сен 2016 года',
  //     id: '0',
  //   },
  //   {
  //     title: 'Первенство ОГФСО "Юность России" среди юношей и девушек 15-17 лет.',
  //     city: 'Клинцы',
  //     date: '6 - 11 мая 2016 года',
  //     id: '0',
  //   },
  //   {
  //     title: 'Первенство ДСО по дзюдо "Юность России" до 23 лет',
  //     city: 'Тверь',
  //     date: '12 - 14 мар 2016 года',
  //     id: '0',
  //   },
  //   {
  //     title: '12 - 14 мар 2016 года',
  //     city: 'Италия',
  //     date: '22 - 27 фев 2016 года',
  //     id: '0',
  //   },
  //   {
  //     title: 'Первенство Юность России по дзюдо до 18 лет',
  //     city: 'Дмитров',
  //     date: '11 - 13 дек 2015 года',
  //     id: '0',
  //   },
  //   {
  //     title: 'III Всероссийская Гимназиада школьников',
  //     city: 'Орёл',
  //     date: '2015 год',
  //     id: '0',
  //   },
  //   {
  //     title:
  //       'XXI Российский смотр физической подготовленности обучающихся образовательных учреждений',
  //     city: '',
  //     date: '',
  //     id: '0',
  //   },
  //   {
  //     title: 'III Всероссийский фестиваль спорта среди обучающихся образовательных учреждений',
  //     city: '',
  //     date: '',
  //     id: '0',
  //   },
  //   {
  //     title: ' II Всероссийская Гимназиада школьников',
  //     city: 'Орёл',
  //     date: '2014 год',
  //     id: '0',
  //   },
  //   {
  //     title:
  //       'XX Российский смотр физической подготовленности обучающихся образовательных учреждений',
  //     city: '',
  //     date: '',
  //     id: '0',
  //   },
  //   {
  //     title: 'Первенство ОГФСО «Юность России» «ОЛИМПИЙСКИЕ НАДЕЖДЫ» по художественной гимнастике',
  //     city: '',
  //     date: '',
  //     id: '0',
  //   },
  //   {
  //     title: 'II Всероссийский фестиваль спорта среди обучающихся образовательных учреждений',
  //     city: '',
  //     date: '',
  //     id: '0',
  //   },
  //   {
  //     title: 'IV Всероссийский фестиваль народных игр и национальных видов спорта',
  //     city: '',
  //     date: '',
  //     id: '0',
  //   },
  //   {
  //     title:
  //       'Первенство ОГФСО «Юность России» по художественной гимнастике в индивидуальной программе и многоборье',
  //     city: 'Орёл',
  //     date: '2014 год',
  //     id: '0',
  //   },
  //   {
  //     title:
  //       'Первенство ОГФСО «Юность России» по художественной гимнастике по групповым упражнениям',
  //     city: 'Орёл',
  //     date: '2014 год',
  //     id: '0',
  //   },
  //   {
  //     title: 'Первенство ОГФСО «Юность России» по дзюдо среди юниоров и юниорок 1994-1996 г.р',
  //     city: 'Орёл',
  //     date: '2014 год',
  //     id: '0',
  //   },
  //   {
  //     title: 'Чемпионат ОГФСО "Юность России" по художественной гимнастике',
  //     city: 'Казань',
  //     date: '2013 год',
  //     id: '0',
  //   },
  //   {
  //     title: 'Всероссийская Гимназиада школьников',
  //     city: 'Орёл',
  //     date: '2013 год',
  //     id: '0',
  //   },
  //   {
  //     title: 'Чемпионат ОГФСО «Юность России» по дзюдо',
  //     city: 'Орёл',
  //     date: '2013 год',
  //     id: '0',
  //   },
  //   {
  //     title:
  //       'XIX Российский смотр физической подготовленности обучающихся образовательных учреждений',
  //     city: '',
  //     date: '',
  //     id: '0',
  //   },
  //   {
  //     title:
  //       'I Всероссийский фестиваль народных игр и национальных видов спорта среди обучающихся образовательных учреждений Приволжского федерального округа',
  //     city: '',
  //     date: '',
  //     id: '0',
  //   },
  //   {
  //     title:
  //       'Всероссийский турнир по дзюдо среди юношей посвященный памяти первого тренера Орловской области В.В.Селихова',
  //     city: '',
  //     date: '',
  //     id: '0',
  //   },
  //   {
  //     title: 'XV Всемирная гимназиада школьников',
  //     city: '',
  //     date: '',
  //     id: '0',
  //   },
  //   {
  //     title:
  //       'Первенство ОГФСО "Юность России" по настольному теннису среди юношей и девушек 1997 г.р. и моложе ',
  //     city: 'Ижевск',
  //     date: '2013 год',
  //     id: '0',
  //   },
  //   {
  //     title:
  //       'Первенство ОГФСО "Юность России" по настольному теннису среди юношей и девушек 1995 г.р. и моложе',
  //     city: 'Ижевск',
  //     date: '2013 год',
  //     id: '0',
  //   },
  // ],
  mounted() {
    this.getEvents();
    document.title = `${process.env.VUE_APP_TITLE} - Фотогалерея`;
  },
  methods: {
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
    getEvents() {
      this.$axios
        .get('https://sportunros.ru/wp-json/wp/v2/posts?categories=14')
        .then((response) => {
          response.data.forEach((event) => {
            this.rows.push({
              title: event.title.rendered,
              city: event.acf['город'],
              date: this.getDateInterval(event.acf['начало'], event.acf['конец']),
              id: event.id,
            });
          });
        });
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.gallery-page {
  &__title {
    &:before {
      top: -2px;
      background: $green;
    }
  }

  &__table {
    &-head {
      font-weight: 700;
      font-size: 14.04px;
      line-height: 20px;
      padding: 14px 16px !important;

      &:nth-child(1) {
        width: 600px;
      }
    }

    &-row {
      &:hover {
        cursor: pointer;
        td a {
          text-decoration: underline;
        }
      }
      td {
        font-weight: 500;
        font-size: 14.04px;
        line-height: 20px;
        padding: 0 !important;

        a {
          display: block;
          padding: 24px 16px !important;
          text-decoration: none;
          color: $black;
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .gallery-page {
    .table {
      thead tr {
        > :nth-child(1) {
          width: 33.33vw;
        }
        > :nth-child(2) {
          width: 33.33vw;
        }
        > :nth-child(3) {
          width: 33.33vw;
        }
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .gallery-page {
    &__table-wrapper {
      width: calc(100vw - 16px);
      overflow-x: scroll;
    }
    .table {
      min-width: 600px;

      thead tr {
        > * {
          width: auto;
        }
      }
    }
  }
}
</style>
