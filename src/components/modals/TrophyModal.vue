<template>
  <div class="trophy-modal" :class="{ 'trophy-modal--visible': isVisible }">
    <div class="trophy-modal__inner-wrapper">
      <div class="trophy-modal__header">
        <div class="trophy-modal__title">Форма заявки для участников фестиваля</div>
        <div class="trophy-modal__close" @click="$parent.isTrophyModal = false">
          <img src="@/assets/images/icons/close-dark.svg" alt="" />
        </div>
      </div>
      <div class="trophy-modal__subtitle">
        Заполните форму и отправьте ее нам, мы постараемся в скором времени на нее ответить
      </div>
      <div class="trophy-modal__top">
        <multi-select
          type="text"
          class="trophy-modal__input trophy-modal__input--district"
          :class="{ invalid: validation && !district }"
          :options="Object.keys(districts)"
          :placeholder="`Укажите свой федеральный округ`"
          :searchable="true"
          v-model="district"
          @change="subject = null"
        />
        <multi-select
          type="text"
          class="trophy-modal__input trophy-modal__input--subject"
          :options="districts[district]"
          :placeholder="district ? `Укажите субъект РФ` : 'Федеральный округ не выбран'"
          :searchable="true"
          v-model="subject"
          :class="[
            { 'trophy-modal__input--disabled': !district },
            { invalid: validation && !subject },
          ]"
        />
        <input
          type="text"
          class="trophy-modal__input trophy-modal__input--organization"
          placeholder="Полное наименование образовательной организации, в соответствии с Уставом организации"
          :class="{ invalid: validation && !organization }"
          v-model="organization"
        />
      </div>
      <div class="trophy-modal__title">Контактная информация</div>
      <div class="trophy-modal__fields">
        <input
          type="text"
          class="trophy-modal__input trophy-modal__input--last"
          placeholder="Ваша фамилия"
          v-model="lastName"
          :class="{ invalid: validation && !lastName }"
        />
        <input
          type="text"
          class="trophy-modal__input trophy-modal__input--first"
          :class="{ invalid: isValidEmail === false || (validation && !email) }"
          placeholder="Ваш e-mail"
          v-model="email"
          @input="validateEmail"
        />
        <input
          type="text"
          class="trophy-modal__input trophy-modal__input--patronymic"
          placeholder="Ваше имя"
          v-model="firstName"
          :class="{ invalid: validation && !firstName }"
        />
        <input
          type="tel"
          class="trophy-modal__input trophy-modal__input--phone"
          placeholder="Номер телефона"
          v-mask="'+7 (###) ###-##-##'"
          :class="{ invalid: isValidPhone === false || (validation && !phone) }"
          v-model="phone"
          @input="validatePhone"
        />
        <input
          type="email"
          class="trophy-modal__input trophy-modal__input--email"
          placeholder="Ваше отчество"
          v-model="patronymic"
          :class="{ invalid: validation && !patronymic }"
        />
        <multi-select
          type="text"
          class="trophy-modal__input trophy-modal__input--health"
          :options="[
            'I группа – команды профессиональных образовательных организаций, в составе юношей и девушек 16-17 лет;',
            'II группа – команды профессиональных образовательных организаций, в составе юношей и девушек 18-19 лет;',
            'III группа – команды общеобразовательных организаций, в составе юношей и девушек 16-17 лет.',
          ]"
          :placeholder="`Укажите возрастную категорию`"
          :searchable="true"
          v-model="age"
          :class="{ invalid: validation && !age }"
        />
      </div>
      <div class="trophy-modal__title">Прикрепите файлы</div>
      <div class="trophy-modal__dropzone" :class="{ invalid: validation && !files.length }">
        <div class="trophy-modal__dropzone-files" v-if="files.length > 0">
          <div class="trophy-modal__dropzone-files-title">Файлы</div>
          <div class="trophy-modal__dropzone-files-list">
            <div
              class="trophy-modal__dropzone-files-list-item"
              v-for="f in files"
              :key="f"
              :class="{ 'trophy-modal__dropzone-files-list-item--bounded': f.bounded }"
            >
              <div class="trophy-modal__dropzone-files-list-item-left">
                <img
                  src="@/assets/images/icons/error-toast-icon.svg"
                  alt=""
                  class="trophy-modal__dropzone-files-icon"
                  v-if="f.bounded"
                />
                <img
                  src="@/assets/images/icons/checked-green.svg"
                  alt=""
                  class="trophy-modal__dropzone-files-icon"
                  v-else
                />
                <div class="trophy-modal__dropzone-files-file-name">{{ f.name }}</div>
                <div class="trophy-modal__dropzone-files-file-name">{{ formatBytes(f.size) }}</div>
              </div>
              <img
                src="@/assets/images/icons/close-dark.svg"
                alt=""
                class="trophy-modal__dropzone-files-file-remove"
                @click="removeFile(f.name)"
              />
            </div>
          </div>
        </div>
        <div v-bind="getRootProps()">
          <input v-bind="getInputProps()" v-if="!files.length" />
          <div class="trophy-modal__dropzone-preview" v-if="isDragActive && !files.length">
            <img
              src="@/assets/images/icons/dropzone-preview.svg"
              alt="dropzone-preview"
              class="trophy-modal__dropzone-preview-icon"
            />
            <div class="trophy-modal__dropzone-preview-text">Отпустите, чтобы загрузить</div>
          </div>
          <div class="trophy-modal__dropzone-preview" v-if="!isDragActive && !files.length">
            <img
              src="@/assets/images/icons/dropzone-preview.svg"
              alt="dropzone-preview"
              class="trophy-modal__dropzone-preview-icon"
            />
            <div class="trophy-modal__dropzone-preview-text">
              Чтобы загрузить документ, перенестие его сюда
            </div>
          </div>
        </div>
      </div>
      <div class="trophy-modal__dropzone-file-size">
        Максимальное количество файлов: 5
        <br />
        Максимальный размер файла: 5МБ
      </div>
      <div class="trophy-modal__title trophy-modal__title--video">Добавьте ссылку на видеролик</div>
      <input
        type="text"
        class="trophy-modal__input trophy-modal__input--video"
        placeholder="Место для ссылки"
        v-model="video"
        :class="{ invalid: validation && !video }"
      />
      <div class="trophy-modal__agreement">
        <label for="trophy-agreement-checkbox">
          <input
            type="checkbox"
            name="agreement"
            id="trophy-agreement-checkbox"
            v-model="isAgreement"
          />
          <div class="trophy-modal__fake">
            <img src="@/assets/images/icons/checked.svg" alt="" />
          </div>
        </label>
        Заполняя форму, вы даете согласие на
        <router-link to="/agreement" @click="$parent.isTrophyModal = false">
          использование ваших персональных данных
        </router-link>
      </div>
      <div class="trophy-modal__footer">
        <button
          class="trophy-modal__submit ui-btn"
          :class="{
            'trophy-modal__submit--disabled':
              !district ||
              !subject ||
              !organization ||
              !lastName ||
              !firstName ||
              !isValidEmail ||
              !isValidPhone ||
              !patronymic ||
              !age ||
              !video ||
              !isAgreement ||
              !files.length ||
              isBounded,
          }"
          @click="onSubmit"
        >
          Отправить заявку
        </button>
        <div class="trophy-modal__required">Все поля объязательны для заполения</div>
      </div>
    </div>
    <div class="trophy-modal__bg" @click="$parent.isTrophyModal = false"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { reactive, ref } from 'vue';
import 'dropzone-vue/dist/dropzone-vue.common.css';
import { mask } from 'vue-the-mask';
import MultiSelect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';
import { useDropzone } from 'vue3-dropzone';
/* eslint-enable */

export default {
  name: 'TrophyModal',
  components: {
    MultiSelect,
  },
  directives: {
    mask,
  },
  data() {
    return {
      lastName: null,
      firstName: null,
      patronymic: null,
      phone: null,
      email: null,
      organization: null,
      age: null,
      video: null,

      isValidEmail: null,
      isValidPhone: null,

      validation: false,

      isAgreement: false,

      district: null,
      subject: null,

      districts: {
        Центральный: [
          'Белгородская область',
          'Брянская область',
          'Владимирская область',
          'Воронежская область',
          'Ивановская область',
          'Калужская область',
          'Костромская область',
          'Курская область',
          'Липецкая область',
          'Московская область',
          'Орловская область',
          'Рязанская область',
          'Смоленская область',
          'Тамбовская область',
          'Тверская область',
          'Тульская область',
          'Ярославская область',
          'Город федерального значения Москва',
        ],
        'Северо-Западный': [
          'Республика Карелия',
          'Республика Коми',
          'Архангельская область',
          'Вологодская область',
          'Калининградская область',
          'Ленинградская область',
          'Мурманская область',
          'Новгородская область',
          'Псковская область',
          'Город федерального значения Санкт-Петербург',
          'Ненецкий автономный округ',
        ],
        Южный: [
          'Республика Адыгея',
          'Республика Калмыкия',
          'Республика Крым',
          'Краснодарский край',
          'Астраханская область',
          'Волгоградская область',
          'Ростовская область',
          'Город федерального значения Севастополь',
          'Луганская республика',
          'Донецкая республика',
          'Запорожская область',
          'Херсонская область',
        ],
        'Северо-Кавказский': [
          'Республика Дагестан',
          'Республика Ингушетия',
          'Кабардино-Балкарская Республика',
          'Карачаево-Черкесская Республика',
          'Республика Северная Осетия — Алания',
          'Чеченская Республика',
          'Ставропольский край',
        ],
        Приволжский: [
          'Республика Башкортостан',
          'Республика Марий Эл',
          'Республика Мордовия',
          'Республика Татарстан',
          'Удмуртская Республика',
          'Чувашская Республика',
          'Пермский край',
          'Кировская область',
          'Нижегородская область',
          'Оренбургская область',
          'Пензенская область',
          'Самарская область',
          'Саратовская область',
          'Ульяновская область',
        ],
        Уральский: [
          'Курганская область',
          'Свердловская область',
          'Тюменская область',
          'Челябинская область',
          'Ханты-Мансийский автономный округ — Югра',
          'Ямало-Ненецкий автономный округ',
        ],
        Сибирский: [
          'Республика Алтай',
          'Республика Тыва',
          'Республика Хакасия',
          'Алтайский край',
          'Красноярский край',
          'Иркутская область',
          'Кемеровская область — Кузбасс',
          'Новосибирская область',
          'Омская область',
          'Томская область',
        ],
        Дальневосточный: [
          'Республика Бурятия',
          'Республика Саха (Якутия)',
          'Забайкальский край',
          'Камчатский край',
          'Приморский край',
          'Хабаровский край',
          'Амурская область',
          'Магаданская область',
          'Сахалинская область',
          'Еврейская автономная область',
          'Чукотский автономный округ',
        ],
      },
    };
  },
  setup() {
    const files = ref([]);
    const isBounded = ref(false);
    // eslint-disable-next-line no-unused-vars
    function onDrop(acceptFiles) {
      // console.log(acceptFiles);
      acceptFiles.forEach((file) => {
        if (file.size > 5242880) {
          Object.defineProperty(file, 'bounded', { value: true });
          isBounded.value = true;
        }
        files.value.push(file);
      });
    }

    const dropzoneOptions = {
      multiple: true,
      maxFiles: 5,
      onDrop,
    };

    const { getRootProps, getInputProps, ...rest } = useDropzone(dropzoneOptions);

    return {
      getRootProps,
      getInputProps,
      ...rest,
      files,
      isBounded,
    };
  },
  props: {
    isVisible: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    formatBytes(bytes, decimals = 2) {
      if (!+bytes) return '0 Bytes';

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
    },
    removeFile(name) {
      this.files = reactive(this.files.filter((file) => file.name !== name));
      this.isBounded = false;
      this.files.forEach((file) => {
        if (file.size > 5242880) {
          this.isBounded = true;
        }
      });
    },
    validateEmail() {
      // eslint-disable-next-line no-useless-escape
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.isValidEmail = true;
      } else {
        this.isValidEmail = false;
      }
    },
    validatePhone() {
      // eslint-disable-next-line no-useless-escape
      if (this.phone.replace(/[^0-9]/g, '').length === 11) {
        this.isValidPhone = true;
      } else {
        this.isValidPhone = false;
      }
    },
    onSubmit() {
      const formData = new FormData();
      formData.append('last', this.lastName);
      formData.append('first', this.firstName);
      formData.append('patronymic', this.patronymic);
      formData.append('district', this.district);
      formData.append('subject', this.subject);
      formData.append('org', this.organization);
      formData.append('phone', this.phone);
      formData.append('email', this.email);
      formData.append('age', this.age);
      formData.append('video', this.video);
      this.files.forEach((file, index) => {
        formData.append(`file-${index + 1}`, file);
      });

      const _this = this;
      this.$axios
        .post(
          'https://sportunros.ru/wp-json/contact-form-7/v1/contact-forms/819/feedback',
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
          this.district = null;
          this.subject = null;
          this.organization = null;
          this.phone = null;
          this.email = null;
          this.age = null;
          this.video = null;
          this.files = [];
          this.isAgreement = false;
          this.$parent.isTrophyModal = false;
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
    isAgreement() {
      this.validation = true;
    },
  },
};
</script>

<style lang="scss">
.trophy-modal {
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
    max-height: 90vh;
    overflow-y: scroll;
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

    &--video {
      margin-top: 38px;
      padding-top: 24px;
      border-top: 1px solid #f4f4fa;
    }
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

  &__top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 16px;
    column-gap: 32px;
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 1px solid #f4f4fa;

    > :nth-child(3) {
      grid-column-end: 3;
      grid-column-start: 1;
    }
  }

  &__fields {
    display: grid;
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 1px solid #f4f4fa;

    grid-template-columns: 1fr 1fr;

    gap: 16px 32px;
    margin-bottom: 32px;
  }

  &__dropzone {
    min-height: 142px;
    background: $gray-3;
    border-radius: 8px;
    border: 1px dashed $gray-2;
    position: relative;
    padding: 16px;

    &-file-size {
      color: #f33737;
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      margin-top: 8px;
    }

    &.invalid {
      box-shadow: inset 0 0 0 1px $red;
    }

    input {
      width: calc(100% - 60px);
      height: 100%;
    }

    &-input {
      &--disabled {
        pointer-events: none;
      }
    }

    &-preview {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;

      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 8px;

      &-text {
        text-align: center;
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
        color: $gray-1;
        max-width: 180px;
      }
    }

    &-files {
      position: relative;
      z-index: 2;
      &-title {
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
        margin-bottom: 4px;
      }

      &-list {
        display: flex;
        flex-direction: column;
        row-gap: 8px;

        &-item {
          display: flex;
          justify-content: space-between;
          align-items: center;

          &-left {
            display: flex;
            column-gap: 8px;
            align-items: center;
          }
        }
      }

      &-icon {
        width: 16px;
        height: 16px;
      }

      &-file-remove {
        width: 12px;
        height: 12px;
        cursor: pointer;
      }

      &-file-name {
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
      }
    }
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
    width: 100%;
    transition: $hover;

    &.invalid {
      box-shadow: inset 0 0 0 1px $red;
    }

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
        padding-right: 32px;
      }

      input {
        background: transparent;
        margin-left: 12px !important;
      }
    }

    &--last {
      // grid-area: last;
    }

    &--first {
      // grid-area: first;
    }

    &--patronymic {
      // grid-area: patronymic;
    }

    &--phone {
      // grid-area: phone;
    }

    &--email {
      // grid-area: email;

      outline: none;
      border: none;
    }

    &--health {
      // grid-area: health;
    }

    &--doc {
      // grid-area: doc;
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
    margin-top: 32px;

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

        &:checked ~ .trophy-modal__fake {
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

  &__footer {
    display: flex;
    justify-content: space-between;
  }

  &__required {
    color: $red;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    align-self: flex-end;
  }

  &__submit {
    border: none;
    width: fit-content;

    &--disabled {
      pointer-events: none;
      background: $gray-2 !important;
    }
  }
}

@media screen and (max-width: 768px) {
  .trophy-modal {
    align-items: flex-end;
    opacity: 1;

    &__top {
      grid-template-columns: 1fr;

      > :nth-child(3) {
        grid-column-start: unset;
        grid-column-end: unset;
      }
    }

    &__footer {
      flex-direction: column-reverse;
      row-gap: 16px;
    }

    &__required {
      align-self: flex-start;
    }

    &__submit {
      width: 100%;
    }

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
      .trophy-modal {
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
      padding: 24px 16px;
      border-radius: 8px 8px 0 0;
    }

    &__fields {
      height: fit-content;
      overflow-y: scroll;
      grid-template-columns: 1fr;
      overflow-x: hidden;
      margin-bottom: 16px;
      grid-template-areas:
        'last'
        'first'
        'patronymic'
        'email'
        'phone'
        'age';

      > :nth-child(1) {
        grid-area: last;
      }

      > :nth-child(2) {
        grid-area: email;
      }

      > :nth-child(3) {
        grid-area: first;
      }

      > :nth-child(4) {
        grid-area: phone;
      }

      > :nth-child(5) {
        grid-area: patronymic;
      }

      > :nth-child(6) {
        grid-area: age;
      }
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
