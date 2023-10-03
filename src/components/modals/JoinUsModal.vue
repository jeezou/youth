<template>
  <div class="join-us-modal" :class="{ 'join-us-modal--visible': isVisible }">
    <div class="join-us-modal__inner-wrapper">
      <div class="join-us-modal__header">
        <div class="join-us-modal__title">Подать заявку</div>
        <div class="join-us-modal__close" @click="$parent.isJoinUsModal = false">
          <img src="@/assets/images/icons/close-dark.svg" alt="" />
        </div>
      </div>
      <div class="join-us-modal__subtitle">
        Заполните форму и отправьте ее нам, мы постараемся в скором времени на нее ответить
      </div>
      <div class="join-us-modal__fields">
        <input
          type="text"
          class="join-us-modal__input join-us-modal__input--last"
          placeholder="Фамилия"
          v-model="lastName"
        />
        <input
          type="text"
          class="join-us-modal__input join-us-modal__input--first"
          placeholder="Имя"
          v-model="firstName"
        />
        <input
          type="text"
          class="join-us-modal__input join-us-modal__input--patronymic"
          placeholder="Отчество"
          v-model="patronymic"
        />
        <input
          type="tel"
          class="join-us-modal__input join-us-modal__input--phone"
          placeholder="Номер телефона"
          v-mask="'+7 (###) ###-##-##'"
          v-model="phone"
        />
        <input
          type="email"
          class="join-us-modal__input join-us-modal__input--email"
          placeholder="Адрес электронной почты"
          v-model="email"
        />
        <input
          type="text"
          class="join-us-modal__input join-us-modal__input--doc"
          placeholder="Серия и номер документа удостоверяющего личность"
          v-model="docNumber"
        />
        <vue-datepicker
          class="оoin-us-modal__input join-us-modal__input--dp"
          v-model="date"
          :format="'dd.MM.yy'"
          :placeholder="'Дата рождения'"
          :selectText="'Выбрать'"
          :cancelText="'Отменить'"
          :enableTimePicker="false"
          locale="ru"
        />
        <multi-select
          type="text"
          class="join-us-modal__input join-us-modal__input--health"
          :options="[
            'Основная медицинская группа (I группа)',
            'Подготовительная медицинская группа (II группа)',
            'Специальной подгруппе «А» (III группа)',
            'Специальной подгруппе «Б» (IV группе)',
          ]"
          :placeholder="`Группа здоровья`"
          :searchable="true"
          v-model="health"
        />
        <input
          type="text"
          class="join-us-modal__input join-us-modal__input--reg"
          placeholder="Место прописки"
          v-model="regPlace"
        />
        <input
          type="text"
          class="join-us-modal__input join-us-modal__input--curr"
          placeholder="Место проживания"
          v-model="currPlace"
        />
        <multi-select
          type="text"
          class="join-us-modal__input join-us-modal__input--status"
          :options="['Сотрудник', 'Студент', 'Представитель организации']"
          :placeholder="`Статус`"
          :searchable="true"
          v-model="status"
        />
        <drop-zone
          class="join-us-modal__drop-zone"
          :multipleUpload="false"
          :maxFiles="1"
          @added-file="onFileAd"
          @removed-file="isFile = false"
          :acceptedFiles="['image']"
          :class="{ 'join-us-modal__drop-zone--file': isFile }"
        >
          <template #message>Фото пользователя</template>
        </drop-zone>
        <input
          type="text"
          class="join-us-modal__input join-us-modal__input--org"
          placeholder="Организация"
          v-model="org"
        />
        <input
          type="text"
          class="join-us-modal__input join-us-modal__input--fac"
          placeholder="Факультет"
          v-model="fac"
          v-if="status === 'Студент'"
        />
        <input
          type="text"
          class="join-us-modal__input join-us-modal__input--group"
          placeholder="№ группы"
          v-model="group"
          v-if="status === 'Студент'"
        />
      </div>
      <div class="join-us-modal__agreement">
        <label for="join-us-agreement-checkbox">
          <input
            type="checkbox"
            name="agreement"
            id="join-us-agreement-checkbox"
            v-model="isAgreement"
          />
          <div class="join-us-modal__fake">
            <img src="@/assets/images/icons/checked.svg" alt="" />
          </div>
        </label>
        Заполняя форму, вы даете согласие на
        <router-link to="/agreement" @click="$parent.isJoinUsModal = false">
          использование ваших персональных данных
        </router-link>
      </div>
      <button
        class="join-us-modal__submit ui-btn"
        :class="{
          'join-us-modal__submit--disabled':
            !isAgreement ||
            !lastName ||
            !firstName ||
            !phone ||
            !email ||
            !docNumber ||
            !date ||
            !regPlace ||
            !currPlace ||
            !status ||
            !file ||
            !org,
        }"
        @click="onSubmit"
      >
        Отправить
      </button>
    </div>
    <div class="join-us-modal__bg" @click="$parent.isJoinUsModal = false"></div>
  </div>
</template>

<script>
/* eslint-disable */
import DropZone from 'dropzone-vue';
import 'dropzone-vue/dist/dropzone-vue.common.css';
import { mask } from 'vue-the-mask';
import VueDatepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import MultiSelect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';
/* eslint-enable */

export default {
  name: 'JoinUsModal',
  components: {
    DropZone,
    VueDatepicker,
    MultiSelect,
  },
  directives: {
    mask,
  },
  props: {
    isVisible: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    onFileAd(f) {
      this.isFile = true;
      this.file = f.file;
    },
    onSubmit() {
      /* eslint-disable */
      const formData = new FormData();
      formData.append('last', this.lastName);
      formData.append('first', this.firstName);
      formData.append('health', this.health);
      if (this.patronymic) formData.append('patronymic', this.patronymic);
      if (this.fac) formData.append('fac', `Факультет: ${this.fac}`);
      if (this.group) formData.append('group', `Номер группы: ${this.group}`);
      const date = new Date(this.date);
      formData.append(
        'date',
        `${date.getFullYear()}-${
          date.getMonth() + 1 < 10 ? `0${date.getMonth()}` : date.getMonth() + 1
        }-${date.getDate() + 1 < 10 ? `0${date.getDate()}` : date.getDate() + 1}`
      );
      formData.append('doc', this.docNumber);
      formData.append('phone', this.phone);
      formData.append('email', this.email);
      formData.append('reg', this.regPlace);
      formData.append('curr', this.currPlace);
      formData.append('status', this.status);
      formData.append('org', this.org);
      formData.append('photo', this.file);

      const _this = this;
      this.$axios
        .post(
          'https://sportunros.ru/wp-json/contact-form-7/v1/contact-forms/631/feedback',
          formData
        )
        .then((response) => {
          _this.$store.commit('addToast', {
            title: response.data.status,
            type: 'success',
            message: response.data.message,
          });

          this.lastName = null;
          this.firstName = null;
          this.patronymic = null;
          this.date = null;
          this.phone = null;
          this.email = null;
          this.docNumber = null;
          this.regPlace = null;
          this.currPlace = null;
          this.status = null;
          this.org = null;
          this.file = null;
          this.isFile = null;
          this.health = null;
          this.fac = null;
          this.group = null;
          this.$parent.isJoinUsModal = false;
        })
        .catch((error) => {
          console.error(error);
          _this.$store.commit('addToast', {
            title: error.message,
            type: 'error',
            message: 'Ошибка отправки формы',
          });
        });
      /* eslint-enable */
    },
  },
  data() {
    return {
      lastName: null,
      firstName: null,
      patronymic: null,
      phone: null,
      email: null,
      docNumber: null,
      date: null,
      regPlace: null,
      currPlace: null,
      status: null,
      file: null,
      org: null,
      health: null,
      fac: null,
      group: null,

      isAgreement: false,
      isFile: false,
    };
  },
  mounted() {},
  beforeUnmount() {},
  computed: {
    filePath() {
      return `${window.location.host}/upload/`;
    },
  },
  watch: {
    isVisible(val) {
      if (val) document.body.style = 'overflow: hidden;';
      else if (!this.$parent.isMobileMenu) document.body.removeAttribute('style');
    },
  },
};
</script>

<style lang="scss">
.join-us-modal {
  position: fixed;
  z-index: 22;
  top: 0;
  left: 0;
  width: 100vw;
  height: $app-height;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: left;

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
    z-index: 0;
    cursor: pointer;
  }

  &__inner-wrapper {
    border-radius: 8px;
    background: $white;
    padding: 24px;
    z-index: 3;
    max-width: 672px;
    width: 100%;
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  &__close {
    background: $gray-3;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 8px;
  }

  &__subtitle {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: $gray-1;
    max-width: 375px;
    margin-bottom: 24px;
  }

  &__fields {
    display: grid;
    grid-template-areas:
      'last first'
      'patronymic date'
      'phone email'
      'health health'
      'reg curr'
      'doc photo'
      'status org'
      'fac group';

    grid-template-columns: 1fr 1fr;

    gap: 16px 32px;
    margin-bottom: 32px;
  }

  &__drop-zone {
    grid-area: photo;
    display: flex;
    max-height: 55px !important;
    height: 55px !important;
    min-height: unset;
    box-sizing: border-box;
    border: none;
    background: $gray-3;
    border-radius: 8px;
    padding: 0;
    position: relative;
    cursor: pointer;

    &--file {
      &:after {
        display: none;
      }
    }

    &:after {
      content: '';
      position: absolute;
      top: 16px;
      right: 12px;
      width: 24px;
      height: 24px;
      background: url('@/assets/images/icons/file-gray.svg');
    }

    .dropzone {
      display: flex;
      justify-content: flex-start;

      &__error-mark {
        display: none;
        opacity: 0;
      }

      &--has-error {
        .dropzone__details {
          opacity: 1;
        }
      }

      &__message {
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
        color: $gray-1;
        display: flex;
        align-items: center;
        padding-left: 12px;
      }

      &__item {
        min-height: unset;
        height: 55px;
        padding: 0;
        display: flex;
        width: 100%;

        &-thumbnail {
          min-height: unset;
          height: 55px;
          display: none;
        }
      }

      &__details {
        min-height: unset;
        height: 55px;
        padding: 0;
        padding-top: 8px;
      }

      &__file-size {
        margin-bottom: 0;
      }
    }
  }

  &__input {
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    padding: 12px !important;
    border-radius: 8px;
    background: $gray-3;
    display: block;

    &::placeholder {
      font-weight: 600;
      font-size: 12px;
      line-height: 20px;
      color: $gray-1;
    }

    &.multiselect {
      border: none;
      background: $gray-3;

      &.is-active {
        box-shadow: none;
      }

      .multiselect-clear {
        position: absolute;
        right: 12px;
        top: 12px;
      }

      input {
        background: transparent;
        margin-left: 12px !important;
      }
    }

    &--last {
      grid-area: last;
    }

    &--first {
      grid-area: first;
    }

    &--patronymic {
      grid-area: patronymic;
    }

    &--phone {
      grid-area: phone;
    }

    &--email {
      grid-area: email;

      outline: none;
      border: none;
    }

    &--health {
      grid-area: health;
    }

    &--doc {
      grid-area: doc;
      height: 55px;

      &::placeholder {
        white-space: pre-line;
        width: 200px;
        position: relative;
        top: -9px;
      }
    }

    &--dp {
      grid-area: date;

      .dp__pointer {
        border: none;
        background: $gray-3;
        height: 44px;
        border-radius: 8px;
        padding: 12px 12px 12px 36px;
        font-weight: 600;
        font-size: 12px;

        &::placeholder {
          font-family: 'Manrope';
          font-weight: 600;
          font-size: 12px;
          top: 13px;
          position: absolute;
          opacity: 1;
          color: $gray-1;
        }
      }
    }

    &--reg {
      grid-area: reg;
    }

    &--curr {
      grid-area: curr;
    }

    &--status {
      grid-area: status;
    }

    &--org {
      grid-area: org;
    }

    &--fac {
      grid-area: fac;
    }

    &--group {
      grid-area: group;
    }
  }

  &__agreement {
    display: flex;
    column-gap: 8px;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    align-items: center;
    margin-bottom: 24px;

    a {
      display: inline;
      margin-left: -4px;

      color: $blue !important;
      transition: $hover;

      &:hover {
        color: rgba($blue, 0.8) !important;
      }
    }

    label {
      cursor: pointer;
      input[type='checkbox'] {
        display: none;

        &:checked ~ .join-us-modal__fake {
          background: $blue;
          box-shadow: none;
        }
      }
    }
  }

  &__fake {
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 1px $gray-1;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: $hover;
    overflow: hidden;
  }

  &__checkbox {
    cursor: pointer;
  }

  &__submit {
    border: none;
    width: 100%;
    max-width: 300px;

    &--disabled {
      pointer-events: none;
      background: $gray-2 !important;
    }
  }
}

@media screen and (max-width: 768px) {
  .join-us-modal {
    align-items: flex-end;
    opacity: 1;

    &__bg {
      opacity: 0;
      visibility: hidden;
      transition: $hover;
    }

    &__inner-wrapper {
      transform: translateY(100%);
      transition: $hover;
    }

    &--visible {
      .join-us-modal {
        &__bg {
          opacity: 1;
          visibility: visible;
        }

        &__inner-wrapper {
          transform: translateY(0);
        }
      }
    }

    &__inner-wrapper {
      max-width: unset;
      width: 100%;
      height: calc($app-height * 0.95);
      padding: 24px 16px;
      border-radius: 8px 8px 0 0;
    }

    &__fields {
      max-height: calc($app-height / 2);
      overflow-y: scroll;
      grid-template-columns: 1fr;
      overflow-x: hidden;
      overflow-y: srcoll;
      grid-template-areas:
        'last'
        'first'
        'patronymic'
        'date'
        'phone'
        'email'
        'health'
        'reg'
        'curr'
        'doc'
        'photo'
        'status'
        'org'
        'fac'
        'group';
      margin-bottom: 16px;
    }

    &__agreement {
      display: inline-block;
      vertical-align: middle;
      line-height: 24px;
      margin-bottom: 16px;

      a {
        margin-left: 4px;
      }
    }

    &__fake {
      margin-right: 4px;
    }

    &__submit {
      max-width: unset;
    }
  }
}
</style>
