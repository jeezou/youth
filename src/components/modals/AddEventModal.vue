<template>
  <div class="add-event-modal">
    <div class="add-event-modal__inner-wrapper">
      <div class="add-event-modal__header">
        <div class="add-event-modal__title">Поиск мероприятия</div>
        <div class="add-event-modal__close" @click="$parent.closeAddEventModal">
          <img src="@/assets/images/icons/close-dark.svg" alt="" />
        </div>
      </div>
      <div class="add-event-modal__grid">
        <input
          type="text"
          class="add-event-modal__input-title"
          placeholder="Название мероприятия"
        />
        <vue-datepicker
          class="add-event-modal__input-start"
          v-model="start"
          :format="'dd.MM.yy'"
          :placeholder="'Дата начала'"
          :selectText="'Выбрать'"
          :cancelText="'Отменить'"
          :enableTimePicker="false"
          locale="ru"
        />
        <vue-datepicker
          class="add-event-modal__input-end"
          v-model="end"
          :format="'dd.MM.yy'"
          :placeholder="'Дата конца'"
          :selectText="'Выбрать'"
          :cancelText="'Отменить'"
          :enableTimePicker="false"
          locale="ru"
        />
      </div>
      <button class="add-event-modal__submit ui-btn" @click="$parent.addEvent">
        Добавить мероприятие
      </button>
    </div>
    <div class="add-event-modal__bg" @click="$parent.closeAddEventModal"></div>
  </div>
</template>

<script>
import VueDatepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'AddEventModal',
  components: { VueDatepicker },
  props: {
    dateFrom: {
      type: String,
      default: () => '',
    },
    dateTo: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      start: this.dateFrom ? new Date(this.dateFrom) : null,
      end: this.dateTo ? new Date(this.dateTo) : null,
    };
  },
  mounted() {
    document.body.style = 'overflow: hidden;';
  },
  beforeUnmount() {
    document.body.removeAttribute('style');
  },
};
</script>

<style lang="scss">
.add-event-modal {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: left;

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
    margin-bottom: 16px;
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

  &__submit {
    border: none;
    width: 100%;
    max-width: 300px;
  }

  &__grid {
    display: grid;
    grid-template-areas:
      'title title'
      'start end';
    gap: 16px 32px;
    margin-bottom: 24px;
  }

  &__input {
    &-start {
      grid-area: start;
    }
    &-end {
      grid-area: end;
    }
    &-title {
      grid-area: title;
    }

    &-start,
    &-end,
    &-title {
      padding: 12px !important;
      background: $gray-3;
      border-radius: 8px;

      .dp__input::placeholder,
      &::placeholder {
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
        color: $gray-1;
        opacity: 1;
      }

      .dp__input {
        background: transparent;
        border: none;
        padding: 0;

        &_icon {
          left: unset;
          right: 0;

          &_pad {
            padding-left: 0;
          }
        }
      }

      .dp__clear_icon {
        right: 24px;
      }
    }
  }
}
</style>
