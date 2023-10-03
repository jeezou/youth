<template>
  <main class="contacts-page">
    <div class="contacts-page__inner-wrapper transparent-page-wrapper container">
      <bread-crumbs ref="breadcrumbs" />
      <div class="contacts-page__header">
        <h1 class="contacts-page__title page-title">Контакты</h1>
        <div class="contacts-page__header-right">
          <div
            class="contacts-page__header-right-item"
            v-for="(item, index) in header"
            :key="index"
            v-html="item"
          ></div>
        </div>
      </div>
      <div
        class="contacts-page__table-block"
        v-for="(block, blockIndex) in blocks"
        :key="`contacts-block-index-${blockIndex}`"
      >
        <h2 class="contacts-page__table-block-title">{{ block.title }}</h2>
        <div class="contacts-page__table-wrapper">
          <b-table-simple class="contacts-page__table" bordered>
            <b-thead>
              <b-tr>
                <b-th
                  v-for="(field, i) in $options.fields"
                  :key="`contacts-table_head-${i}`"
                  class="contacts-page__table-head"
                >
                  {{ field }}
                </b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr
                v-for="(row, rowIndex) in block.rows"
                :key="`contacts-table_row-${rowIndex}`"
                class="contacts-page__table-row"
              >
                <b-td
                  class="contacts-page__table-row-item"
                  v-for="(cell, cellIndex) in row.cells"
                  :key="`contacts-cells-index-${cellIndex}`"
                  v-html="cell ? cell : 'Не указано'"
                ></b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </div>
      </div>
    </div>
    <div class="contacts-page__form-wrapper">
      <div class="container">
        <div class="contacts-page__form">
          <h2 class="contacts-page__form-title">Свяжитесь с нами</h2>
          <input
            type="text"
            class="contacts-page__form-input contacts-page__form-input--name"
            placeholder="ФИО"
            v-model="name"
          />
          <input
            type="email"
            class="contacts-page__form-input contacts-page__form-input--email"
            placeholder="Ваша почта"
            v-model="email"
          />
          <input
            type="tel"
            class="contacts-page__form-input contacts-page__form-input--phone"
            placeholder="Ваш телефон"
            v-mask="'+7 (###) ###-##-##'"
            v-model="phone"
          />
          <textarea
            class="contacts-page__form-input contacts-page__form-input--comment"
            placeholder="Ваш комментарий"
            v-model="text"
          ></textarea>
          <div class="contacts-page__form-agreement" for="contacts-page-agreement-checkbox">
            <label for="contacts-page-agreement-checkbox">
              <input
                type="checkbox"
                class="contacts-page__form-checkbox"
                id="contacts-page-agreement-checkbox"
                v-model="isAgreement"
              />
              <div type="checkbox" class="contacts-page__form-fake-checkbox" />
            </label>
            <span>
              Заполняя форму, вы даете согласие на
              <router-link to="/agreement">использование ваших персональных данных</router-link>
            </span>
          </div>
          <div
            class="contacts-page__form-submit ui-btn"
            :class="{
              'contacts-page__form-submit--disabled': !isAgreement || !name || !phone || !email,
            }"
            @click="onSubmit"
          >
            Отправить
          </div>
          <img src="@/assets/images/logo-stroked.svg" alt="" class="contacts-page__form-logo" />
        </div>
      </div>
    </div>
    <partners-block />
  </main>
</template>

<script>
/* eslint-disable */
import PartnersBlock from '@/blocks/PartnersBlock.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import { mask } from 'vue-the-mask';

export default {
  name: 'ContactsPageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
  },
  directives: {
    mask,
  },
  data() {
    return {
      maskedPhone: null,

      header: [],
      blocks: [],

      isAgreement: false,

      name: null,
      email: null,
      phone: null,
      text: null,
    };
  },
  fields: ['ФИО', 'Должность', 'Телефон', 'Номер кабинета'],
  mounted() {
    this.getContactsData();

    document.title = `${process.env.VUE_APP_TITLE} - Контакты`;
  },
  methods: {
    onSubmit() {
      const formData = new FormData();
      formData.append('your-name', this.name);
      formData.append('your-tel', this.phone);
      formData.append('your-email', this.email);
      if (this.text) formData.append('your-message', this.text);

      const _this = this;
      this.$axios
        .post(
          'https://sportunros.ru/wp-json/contact-form-7/v1/contact-forms/503/feedback',
          formData
        )
        .then((response) => {
          _this.$store.commit('addToast', {
            title: response.data.status,
            type: 'success',
            message: response.data.message,
          });

          this.name = null;
          this.phone = null;
          this.text = null;
          this.email = null;
        })
        .catch((e) => {
          console.error(e);
          _this.$store.commit('addToast', {
            title: e.message,
            type: 'error',
            message: 'Ошибка отправки формы',
          });
        });
    },
    validateCellText(val) {
      return val === '' ? val : 'Не указано';
    },
    getContactsData() {
      this.$axios
        .get(`https://sportunros.ru/wp-json/wp/v2/posts/448`)
        .then((response) => {
          const content = document.createElement('div');
          content.innerHTML = response.data.content.rendered;
          content.querySelectorAll('.contacts-header-content p').forEach((el) => {
            this.header.push(el.outerHTML);
          });

          this.blocks = [];

          content.querySelectorAll('.wp-block-table').forEach((el, index) => {
            this.blocks.push({
              title: el.querySelector('figcaption').textContent,
              rows: [],
            });

            el.querySelectorAll('tbody > tr:not(:first-child)').forEach((row) => {
              const cells = [];
              row.querySelectorAll('td').forEach((cell) => {
                cells.push(cell.outerHTML);
              });
              this.blocks[index].rows.push({
                cells: cells,
              });
            });
          });
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.contacts-page {
  width: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;

    &-right {
      display: flex;
      flex-direction: column;
      text-align: left;

      strong {
        font-weight: 700;
        font-size: 18px;
        line-height: 24px;
      }

      &-item {
        display: flex;
        column-gap: 16px;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;

        a {
          color: $blue;

          &:hover {
            color: $blue;
          }
        }
      }
    }
  }

  &__table-block {
    padding-top: 120px;
    border-top: 1px solid $gray-2;
    margin-bottom: 120px;
    &-title {
      text-align: left;
      margin-bottom: 24px;
      text-transform: uppercase;
      font-weight: 700;
      font-size: 24px;
      line-height: 24px;
    }

    thead tr {
      > :nth-child(3) {
        width: 25vw;
      }
    }
  }

  &__table-head {
    font-weight: 700;
    font-size: 14.04px;
    line-height: 20px;
    padding: 14px 16px !important;
  }

  &__table-row-item {
    font-weight: 500;
    font-size: 14.04px;
    line-height: 20px;
    padding: 14px 16px !important;
  }

  &__form-wrapper {
    padding: 120px 0;
    background: $black;
    width: 100%;
    position: relative;
  }

  &__form {
    display: grid;
    grid-template-areas:
      'title title title'
      'name email phone'
      'comment comment comment'
      'agreement agreement agreement'
      'btn btn btn';

    gap: 23px 32px;
    width: 54.6vw !important;

    &-title {
      grid-area: title;
      font-weight: 700;
      font-size: 24px;
      line-height: 24px;
      text-transform: uppercase;
      color: $white;
      text-align: left;
    }

    &-input {
      padding: 14px 12px !important;
      border-radius: 8px;
      background: $white;

      &::placeholder {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: $gray-1;
      }

      &--comment {
        grid-area: comment;
        border: none;
        outline: none;
        min-height: 162px;
        overflow: hidden;
      }

      &--name {
        grid-area: name;
      }

      &--email {
        grid-area: email;
        appearance: none;
        outline: none;
        box-shadow: none;
        border: none;
      }

      &--phone {
        grid-area: phone;
      }
    }

    &-agreement {
      grid-area: agreement;
      display: inline;
      column-gap: 8px;

      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      color: $white;
      cursor: pointer;
      text-align: left;

      vertical-align: middle;
      margin-bottom: 16px;
      display: flex;
      align-items: flex-start;

      span {
        display: inline-block;
      }
    }

    &-submit {
      grid-area: btn;

      &--disabled {
        pointer-events: none;
        background: $gray-2 !important;
      }
    }

    &-checkbox {
      display: none;
    }

    &-fake-checkbox {
      display: inline-block;
      width: 20px;
      height: 20px;
      min-width: 20px;
      min-height: 20px;
      box-shadow: inset 0 0 0 1px $gray-1;
      border-radius: 4px;
      transition: $hover;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background: url('@/assets/images/icons/checked.svg');
        background-size: 13px;
        background-repeat: no-repeat;
        background-position: center;

        opacity: 0;
        transition: $hover;
      }
    }

    &-checkbox:checked ~ .contacts-page__form-fake-checkbox {
      background: $blue;
      box-shadow: inset 0 0 0 1px $blue;

      &:after {
        opacity: 1;
      }
    }

    &-logo {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}

@media screen and (max-width: 768px) {
  .contacts-page {
    &__header {
      flex-direction: column;
    }

    &__form {
      width: 100% !important;
      gap: 16px 24px;
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        'title title'
        'name email'
        'phone phone'
        'comment comment'
        'agreement agreement'
        'btn btn';
      &-logo {
        display: none;
      }
    }

    &__table-block {
      thead tr {
        > :nth-child(3) {
          width: 30vw;
        }
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .contacts-page {
    &__table-block {
      thead tr {
        > :nth-child(3) {
          min-width: 200px;
        }
      }
    }
    &__table-wrapper {
      width: calc(100vw - 16px);
      overflow-x: scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    &__table {
      min-width: 800px;
    }

    &__form {
      grid-template-columns: 1fr;
      grid-template-areas:
        'title'
        'name'
        'email'
        'phone'
        'comment'
        'agreement'
        'btn';
    }
  }
}
</style>
