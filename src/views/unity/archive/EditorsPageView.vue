<template>
  <main class="editors-page container">
    <div class="editors-page__inner-wrapper transparent-page-wrapper">
      <bread-crumbs ref="breadcrumbs" />
      <h1 class="editors-page__title page-title">Редколлегия</h1>
      <b-table-simple class="editors-page__table b-table" bordered>
        <b-thead>
          <b-tr>
            <b-th
              v-for="(field, i) in $options.fields"
              :key="`editors-table_head-${i}`"
              class="editors-page__table-head"
            >
              {{ field }}
            </b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr
            v-for="(row, rowIndex) in $options.rows"
            :key="`table_row-${rowIndex}`"
            class="editors-page__table-row"
          >
            <b-td class="editors-page__table--name">
              {{ row.name ? row.name : 'Не указано' }}
            </b-td>
            <b-td class="gallery-page__table--post">
              {{ row.post ? row.post : 'Не указано' }}
            </b-td>
            <b-td class="gallery-page__table--education">
              {{ row.education ? row.education : 'Не указано' }}
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
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
    return {};
  },
  fields: ['ФИО', 'Должность', 'Образование'],
  rows: [
    {
      name: 'Зотов Александр Павлович',
      post: 'Главный редактор',
      education:
        'Заслуженный работник физической культуры РФ кандидат педагогических наук, профессор',
    },
    {
      name: 'Темиров Таймураз Владимирович',
      post: 'Зам. главного редактора',
      education: 'Доктор психологических наук',
    },
    {
      name: 'Абаев З.М',
      post: 'Редактор',
      education: 'Доктор медицинских наук, профессор',
    },
    {
      name: 'Кашекова И.Э',
      post: 'Редактор',
      education: 'Доктор педагогических наук',
    },
    {
      name: 'Ерошин В.И',
      post: 'Редактор',
      education:
        'Доктор педагогических наук, доктор экономических наук, профессор, член-корреспондент РАО',
    },
    {
      name: 'Кабачков В.А',
      post: 'Редактор',
      education: 'Доктор педагогических наук, профессор',
    },
    {
      name: 'Карелина М.Ю.',
      post: 'Редактор',
      education: 'Доктор педагогических наук, профессор',
    },
    {
      name: 'Кулаков А.А',
      post: 'Редактор',
      education: 'Доктор исторических наук, профессор',
    },
    {
      name: 'Миронов В.Б.',
      post: 'Редактор',
      education: 'Доктор педагогических наук, профессор',
    },
    {
      name: 'Матвеев А.П',
      post: 'Редактор',
      education: 'Доктор педагогических наук, профессор',
    },
    {
      name: 'Полиевский С.А',
      post: 'Редактор',
      education: 'Доктор медицинских наук, профессор',
    },
    {
      name: 'Сомов Д.Е.',
      post: 'Редактор',
      education: 'Доктор педагогических наук, профессор',
    },
    {
      name: 'Туревский И.М.',
      post: 'Редактор',
      education: 'Доктор педагогических наук, профессор',
    },
    {
      name: 'Филиппов Ю.В',
      post: 'Редактор',
      education: 'Доктор педагогических наук, профессор',
    },
    {
      name: 'Чесноков Н.Н. ',
      post: 'Редактор',
      education: 'Доктор педагогических наук, профессор',
    },
    {
      name: 'Ямалетдинова Г.А.',
      post: 'Редактор',
      education: 'Доктор педагогических наук',
    },
  ],
  mounted() {
    document.title = `${process.env.VUE_APP_TITLE} - Фотогалерея`;
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss">
.editors-page {
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
        width: 25vw;
      }

      &:nth-child(2) {
        width: 22vw;
      }
    }

    &-row {
      &:hover {
        td a {
          text-decoration: underline;
        }
      }
      td {
        padding: 24px 16px !important;
        font-weight: 500;
        font-size: 14.04px;
        line-height: 20px;

        &:nth-child(1) {
          width: 25vw;
        }

        &:nth-child(2) {
          width: 22vw;
        }

        a {
          text-decoration: none;
          color: $black;
        }
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .editors-page {
    &__table {
      &-head {
        padding: 10px 8px !important;
      }

      &-row {
        td {
          padding: 16px 8px !important;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;

          &:nth-child(1) {
            width: 25vw;
          }

          &:nth-child(2) {
            width: 22vw;
          }

          a {
            text-decoration: none;
            color: $black;
          }
        }
      }
    }
  }
}
</style>
