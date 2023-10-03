<template>
  <div class="contact-us-modal" :class="{ 'contact-us-modal--visible': isVisible }">
    <div class="contact-us-modal__inner-wrapper">
      <div class="contact-us-modal__header">
        <div class="contact-us-modal__title">Напишите нам</div>
        <div class="contact-us-modal__close" @click="$parent.isContactUsModal = false">
          <img src="@/assets/images/icons/close-dark.svg" alt="" />
        </div>
      </div>
      <div class="contact-us-modal__subtitle">
        Заполните форму и отправьте ее нам, мы постараемся в скором времени на нее ответить
      </div>
      <div class="contact-us-modal__fields">
        <input
          type="text"
          class="contact-us-modal__input contact-us-modal__input--name"
          placeholder="Ваше имя"
          v-model="name"
        />
        <input
          type="tel"
          class="contact-us-modal__input contact-us-modal__input--phone"
          placeholder="Ваш номер телефона"
          v-mask="'+7 (###) ###-##-##'"
          v-model="phone"
        />
        <textarea
          class="contact-us-modal__input contact-us-modal__input--text"
          placeholder="Краткий текст вашего обращения"
          v-model="text"
        />
        <drop-zone
          class="contact-us-modal__drop-zone"
          :multipleUpload="false"
          :maxFiles="1"
          @added-file="onFileAd"
          @removed-file="isFile = false"
          :class="{ 'contact-us-modal__drop-zone--file': isFile }"
        >
          <template #message>Прикрепить файл</template>
        </drop-zone>
      </div>
      <div class="contact-us-modal__agreement">
        <label for="contact-us-agreement-checkbox">
          <input
            type="checkbox"
            name="agreement"
            id="contact-us-agreement-checkbox"
            v-model="isAgreement"
          />
          <div class="contact-us-modal__fake">
            <img src="@/assets/images/icons/checked.svg" alt="" />
          </div>
        </label>
        Заполняя форму, вы даете согласие на
        <router-link to="/agreement" @click="$parent.isContactUsModal = false">
          использование ваших персональных данных
        </router-link>
      </div>
      <button
        class="contact-us-modal__submit ui-btn"
        :class="{ 'contact-us-modal__submit--disabled': !isAgreement || !name || !phone }"
        @click="onSubmit"
      >
        Отправить
      </button>
    </div>
    <div class="contact-us-modal__bg" @click="$parent.isContactUsModal = false"></div>
  </div>
</template>

<script>
/* eslint-disable */
import DropZone from 'dropzone-vue';
import 'dropzone-vue/dist/dropzone-vue.common.css';
import { mask } from 'vue-the-mask';
/* eslint-enable */

export default {
  name: 'ContactUsModal',
  components: {
    DropZone,
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
      formData.append('your-name', this.name);
      formData.append('your-tel', this.phone);
      if (this.text) formData.append('your-message', this.text);
      if (this.file) formData.append('your-file', this.file);

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

          this.file = null;
          this.isFile = false;
          this.name = null;
          this.phone = null;
          this.text = null;
          this.$parent.isContactUsModal = false;
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
      isFile: false,
      file: null,
      name: null,
      phone: null,
      text: null,

      isAgreement: false,
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
.contact-us-modal {
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
      'name text'
      'phone text'
      'drop text';

    gap: 16px 32px;
    margin-bottom: 32px;
  }

  &__drop-zone {
    grid-area: drop;
    display: flex;
    max-height: 48px !important;
    height: 48px !important;
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
      top: 12px;
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
        height: 48px;
        padding: 0;
        display: flex;
        width: 100%;

        &-thumbnail {
          min-height: unset;
          height: 48px;
          display: none;
        }
      }

      &__details {
        min-height: unset;
        height: 48px;
        padding: 0;
        padding-top: 4px;
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

    &--name {
      grid-area: name;
      max-height: 44px;
    }

    &--phone {
      grid-area: phone;
      max-height: 44px;
    }

    &--text {
      grid-area: text;
      border: none;
      min-height: 144px;
      resize: none;

      &:focus {
        outline: none;
      }
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

        &:checked ~ .contact-us-modal__fake {
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
  .contact-us-modal {
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
      .contact-us-modal {
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
    }

    &__fields {
      max-height: calc($app-height / 2);
      overflow-y: scroll;
      grid-template-areas:
        'name'
        'phone'
        'drop'
        'text';
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
