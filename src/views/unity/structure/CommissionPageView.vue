<template>
  <main class="commission-page container">
    <div class="commission-page__inner-wrapper transparent-page-wrapper">
      <bread-crumbs ref="breadcrumbs" />
      <h1 class="commission-page__title page-title">Ревизионная комиссия</h1>
      <b-table-simple class="commission-page__table b-table table-styles" bordered>
        <b-thead>
          <b-tr>
            <b-th
              v-for="(field, i) in fields"
              :key="`commission-table_head-${i}`"
              class="commission-page__table-head"
            >
              {{ field }}
            </b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr
            v-for="(row, rowIndex) in rows"
            :key="`table_row-${rowIndex}`"
            class="commission-page__table-row"
          >
            <b-td class="commission-page__table--name">
              {{ row.name ? row.name : 'Не указано' }}
            </b-td>
            <b-td class="commission-page__table--post">
              {{ row.post ? row.post : 'Не указано' }}
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
  name: 'BureauPageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
  },
  data() {
    return {
      fields: [],
      rows: [],
    };
  },
  mounted() {
    this.getData();
    document.title = `${process.env.VUE_APP_TITLE} - Контрольно-ревизионная комиссия`;
  },
  methods: {
    getData() {
      this.$axios
        .get(`https://sportunros.ru/wp-json/wp/v2/posts/552`)
        .then((response) => {
          const content = document.createElement('div');
          content.innerHTML = response.data.content.rendered;

          content.querySelectorAll('thead th').forEach((el) => {
            this.fields.push(el.textContent);
          });

          content.querySelectorAll('tbody tr').forEach((el) => {
            this.rows.push({
              name: el.children[0].textContent,
              post: el.children[1].textContent,
            });
          });
        })
        .catch((e) => console.error(e));
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.commission-page {
  &__title {
    &:before {
      background: $green;
      top: -2px;
    }
  }

  &__table {
    &-head {
      font-weight: 600;
      &:nth-child(1) {
        width: 30vw;
        max-width: 300px;
      }
    }
  }
}
</style>
