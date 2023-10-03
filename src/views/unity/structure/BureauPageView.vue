<template>
  <main class="bureau-page container">
    <div class="bureau-page__inner-wrapper transparent-page-wrapper">
      <bread-crumbs ref="breadcrumbs" />
      <h1 class="bureau-page__title page-title">Комитет</h1>
      <!-- <div class="bureau-page__content grid-cards-template">
        <hoverable-card
          :data="card"
          :index="index"
          :type="'unity'"
          v-for="(card, index) in cards"
          :key="`commite-card-${index}`"
        />
      </div> -->
      <b-table-simple class="bureau-page__table b-table table-styles" bordered>
        <b-thead>
          <b-tr>
            <b-th
              v-for="(field, i) in fields"
              :key="`bureau-table_head-${i}`"
              class="bureau-page__table-head"
            >
              {{ field }}
            </b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr
            v-for="(row, rowIndex) in rows"
            :key="`table_row-${rowIndex}`"
            class="bureau-page__table-row"
          >
            <b-td class="bureau-page__table--name">
              {{ row.name ? row.name : 'Не указано' }}
            </b-td>
            <b-td class="bureau-page__table--post">
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
    document.title = `${process.env.VUE_APP_TITLE} - Комитет`;
  },
  methods: {
    getData() {
      this.$axios
        .get(`https://sportunros.ru/wp-json/wp/v2/posts/547`)
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
.bureau-page {
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
