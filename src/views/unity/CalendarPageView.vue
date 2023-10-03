<template>
  <main class="calendar-events-page container">
    <div class="calendar-events-page__inner-wrapper transparent-page-wrapper">
      <bread-crumbs ref="breadcrumbs" />
      <h1 class="calendar-events-page__title page-title">Спортивно-массовые мероприятия</h1>
      <full-calendar
        :options="calendarOptions"
        ref="events-calendar"
        :key="calendarOptions.events.length"
      />
      <div class="calendar-events-page__calendars-wrapper">
        <h2 class="calendar-events-page__calendars-title">Календари</h2>
        <div class="calendar-events-page__calendars">
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
  <add-event-modal :dateFrom="dateFrom" :dateTo="dateTo" v-if="isAddEventModal" />
</template>

<script>
import PartnersBlock from '@/blocks/PartnersBlock.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import HoverableCard from '@/components/HoverableCard.vue';
import AddEventModal from '@/components/modals/AddEventModal.vue';

import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ruLocale from '@fullcalendar/core/locales/ru';

export default {
  name: 'CalendarPageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
    FullCalendar,
    HoverableCard,
    AddEventModal,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        locale: ruLocale,
        views: {
          dayGridMonth: {
            dayHeaderFormat: {
              weekday: 'long',
            },
          },
        },
        headerToolbar: {
          start: 'title',
          center: 'prev,next',
          // todo
          // end: 'addEvent,dayGridMonth,dayGridWeek,today',
          end: 'dayGridMonth,dayGridWeek,today',
        },
        customButtons: {
          addEvent: {
            text: 'Добавить мероприятие',
            click: () => {
              this.isAddEventModal = true;
            },
          },
        },
        // todo
        // selectable: true,
        events: [
          // {
          //   id: 'a',
          //   title: 'Мероприятие',
          //   start: '2022-08-27T12:00:00',
          //   end: '2022-08-28T11:00:00',
          // },
        ],
        select: this.selectHandler,
      },

      isAddEventModal: false,
      dateFrom: null,
      dateTo: null,

      calendars: [],
    };
  },
  mounted() {
    this.getCalendars();
    this.getEvents();
    document.title = `${process.env.VUE_APP_TITLE} - Спортивно-массовые мероприятия`;
  },
  methods: {
    parseDate(date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${
        d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
      }-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}T${
        d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()
      }:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}:${
        d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()
      }`;
    },
    getEvents() {
      this.$axios
        .get('https://sportunros.ru/wp-json/wp/v2/posts?categories=3,7,8,9,10', {
          params: {
            calendar: 'Отображать',
          },
        })
        .then((response) => {
          response.data.forEach((event) => {
            this.calendarOptions.events.push({
              id: `${event.id}`,
              title: event.title.rendered,
              start: this.parseDate(event.acf.time_from),
              end: this.parseDate(event.acf.time_to),
            });
          });
        });
    },
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
    selectHandler(e) {
      this.dateFrom = e.start;
      this.dateTo = e.end;
      this.isAddEventModal = true;
    },
    closeAddEventModal() {
      this.dateFrom = null;
      this.dateTo = null;
      this.isAddEventModal = false;
    },
  },
  computed: {},
  watch: {
    currentModalImage(val) {
      if (val) document.body.style.cssText = 'overflow: hidden;';
      else document.body.removeAttribute('style');
    },
  },
};
</script>

<style lang="scss">
.calendar-events-page {
  &__title {
    &:before {
      background: $green;
      top: -3px;
    }
  }

  .fc {
    padding-top: 16px;
    overflow: hidden !important;

    &-scrollgrid {
      border-radius: 0 0 16px 16px !important;
      overflow: hidden;
    }

    &-view {
      border-radius: 0 0 16px 16px !important;
      overflow: hidden;
    }
    &-scrollgrid-section-body {
      > td {
        border-radius: 0 0 16px 16px !important;
      }
    }

    &-toolbar {
      margin-bottom: 0 !important;
      background: $white;
      padding: 10px 16px;
      border-radius: 16px 16px 0 0;
      border-width: 1px 1px 0 1px;
      border-color: #ddd;
      border-style: solid;
      &-title {
        text-transform: uppercase;
        white-space: nowrap;
        margin-right: 16px;
        font-weight: 700;
        font-size: 24px;
        line-height: 24px;
      }

      > :nth-child(2) {
        width: 100%;

        .fc-button-group {
          column-gap: 8px;

          .fc-button {
            position: relative;
            width: 32px;
            height: 32px;
            &:after {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 16px;
              height: 16px;
              content: '';
              background: url('@/assets/images/icons/arrow-left-light.svg');
              background-size: cover;
              background-repeat: no-repeat;
            }

            &:nth-child(2) {
              &:after {
                transform: rotate(180deg) translate(50%, 50%);
              }
            }
            .fc-icon {
              display: none;
            }
          }
        }
      }

      > :nth-child(3) {
        .fc-button-group {
          display: flex;
          column-gap: 8px;
          padding: 8px;
          border-radius: 8px;
          background: $white;

          .fc-button {
            width: 87.5px;
            padding: 14px 0;
            background: transparent;
            color: $black;
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            transition: $hover;
            white-space: nowrap;

            // todo
            // &:nth-child(1) {
            //   width: unset;
            //   margin-right: 24px;
            //   background: $gray-4;
            //   padding: 16px 52px 16px 24px;
            //   position: relative;

            //   &:hover {
            //     background: $gray-2;
            //     color: $white;
            //     &:after,
            //     &:before {
            //       background: $white;
            //     }
            //   }

            //   &:after,
            //   &:before {
            //     content: '';
            //     position: absolute;
            //     top: 20px;
            //     border-radius: 100%;
            //     right: 32px;
            //     width: 2px;
            //     background: $black;
            //     height: 12px;
            //     background: rgba($black, 0.9);
            //     transition: $hover;
            //   }

            //   &:after {
            //     transform: rotate(90deg);
            //   }
            // }

            &-active {
              background: transparent;
              background: $black;
              color: $white;

              &:hover {
                background: $black !important;
              }
            }

            &:hover {
              background: $gray-3;
            }

            &:disabled {
              pointer-events: none;
            }
          }
        }
      }
    }

    &-button {
      background: $black;
      border-radius: 8px !important;
      border: none !important;
      transition: $hover;
      &:focus {
        box-shadow: none !important;
      }

      &:hover {
        background: rgba($black, 0.95);
      }

      &-active {
      }
    }

    &-view {
      background: $white;
    }

    &-event {
      &-main {
        display: flex;
        align-items: center;
      }
    }

    &-daygrid {
      &-day {
        font-weight: 500;
        font-size: 14.04px;
        line-height: 20px;
        padding: 16px 0;
        &-top {
          padding: 0 16px;
          flex-direction: row;
        }

        &-events {
          width: 100%;
          margin-top: 8px;
        }
      }

      // &-event {
      //   margin: 2px 0 !important;
      //   height: 64px;
      //   border-radius: 8px;
      //   display: flex;
      //   justify-content: center;
      // }
    }

    &-col {
      &-header {
        &-cell {
          font-weight: 700;
          font-size: 14.04px;
          line-height: 20px;
          text-transform: capitalize;
          padding: 14px 16px;
          text-align: left;
        }
      }
    }

    a {
      text-decoration: none;
      color: $black;
    }
  }

  &__calendars-title {
    font-weight: 700;
    font-size: 24px;
    line-height: 23px;
    margin-top: 120px;
    text-align: left;
    text-transform: uppercase;
    padding: 40px 0;
    border-top: 1px solid rgba($gray-2, 0.8);
  }

  &__calendars {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}

@media screen and (max-width: 991px) {
  .calendar-events-page {
    &__calendars {
      grid-template-columns: 1fr 1fr;
    }

    .fc {
      &-col {
        &-header {
          &-cell {
            padding: 4px;
            &-cushion {
              width: 90px;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 12px;
            }
          }
        }
      }

      &-daygrid {
        &-day {
          padding: 8px 0;
          &-top {
            padding: 0 8px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .calendar-events-page {
    &__calendars {
      grid-template-columns: 1fr;
    }

    .fc {
      &-toolbar {
        display: grid;
        gap: 16px;
        padding: 8px;

        grid-template-columns: 1fr 1fr;
        grid-template-areas:
          'month arrows'
          'controls controls';

        > :nth-child(1) {
          grid-area: month;
        }

        > :nth-child(2) {
          grid-area: arrows;
          display: flex;
          justify-content: flex-end;
        }

        > :nth-child(3) {
          grid-area: controls;

          justify-content: flex-start;
          display: flex;
          width: 100%;

          .fc-button-group {
            padding: 0;
            .fc-button {
              padding: 12px 10px;
              border-radius: 6px !important;
              font-size: 12px;
              line-height: 10px;
              width: unset;
            }
          }
        }
      }

      &-col {
        &-header {
          &-cell {
            &-cushion {
              width: 60px;
              font-size: 10px;
            }
          }
        }
      }

      &-daygrid {
        &-day {
          padding: 4px 0;
          &-top {
            padding: 0 4px;
          }

          &-number {
            font-size: 12px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .calendar-events-page {
    .fc {
      &-view {
        overflow-x: scroll;
        box-shadow: inset 0 0 0 1px rgba($gray-2, 0.6);

        &-harness {
          min-height: 600px !important;
        }
      }
      &-scrollgrid {
        min-width: 700px !important;
        overflow: scroll !important;
      }

      &-toolbar {
        > :nth-child(1) {
          h2 {
            max-width: calc(100vw - 32px - 71px - 56px);
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    &__calendars-title {
      margin-top: 72px;
    }
  }
}
</style>
