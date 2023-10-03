<template>
  <header class="header">
    <div class="header__topline">
      <div class="container">
        <div class="header__topline-inner-wrapper">
          <div
            class="header__topline-left"
            :class="{ 'header__topline-left--search-mode': isSearch }"
          >
            <div class="menu-item menu-item--date">
              <img src="@/assets/images/icons/calendar-light.svg" alt="" class="menu-item__icon" />
              <div class="menu-item__text">{{ currentDate }}</div>
            </div>
            <!-- <div
              class="menu-item menu-item--location menu-item__text--dropdown"
              @click="isLocationModal = true"
            >
              <img src="@/assets/images/icons/location-light.svg" alt="" class="menu-item__icon" />
              <div class="menu-item__text">{{ location }}</div>
            </div> -->
            <div class="menu-item menu-item--search">
              <img
                src="@/assets/images/icons/search-light.svg"
                alt=""
                class="menu-item__icon"
                @click="isSearch = true"
              />
              <div class="menu-item__text" @click="isSearch = true">Поиск по сайту</div>
              <input
                type="text"
                class="menu-item__search-input"
                placeholder="Введите ваш запрос"
                v-model="searchValue"
                ref="header-search-input"
                @keyup.enter="onSearch"
              />
              <div class="menu-item__search-btn" v-if="searchValue" @click="onSearch">Найти</div>
              <img
                src="@/assets/images/icons/close-light.svg"
                alt=""
                class="menu-item__icon menu-item__search-close"
                @click="
                  searchValue = null;
                  isSearch = false;
                "
              />
            </div>
            <div class="menu-item menu-item--blind bvi-open">
              <img src="@/assets/images/icons/eye-light.svg" alt="" class="menu-item__icon" />
              <div class="menu-item__text">Версия для слабовидящих</div>
            </div>
          </div>
          <div class="header__topline-right">
            <img
              src="@/assets/images/education-ministry-logo.svg"
              alt="education ministry logo"
              class="header__topline-logo"
            />
            <a href="https://edu.gov.ru/" class="header__topline-text" target="_blank">
              Министерство просвещения Российской Федерации
            </a>
          </div>
        </div>
      </div>
    </div>
    <nav class="header__nav">
      <div class="container">
        <div class="header__nav-inner-wrapper">
          <router-link to="/" class="header__nav-logo">
            <img
              src="@/assets/images/logo.png"
              alt="logo"
              class="logo"
              @click="isMobileMenu = false"
            />
          </router-link>
          <div class="header__nav-right-mobile">
            <div class="header__nav-right-mobile-eye bvi-open">
              <img src="@/assets/images/icons/eye-dark.svg" alt="eye icon" />
            </div>
            <div class="header__nav-right-mobile-search" @click="$router.push('/search')">
              <img src="@/assets/images/icons/search-dark.svg" alt="eye icon" />
            </div>
            <div
              class="header__nav-burger"
              @click="isMobileMenu = !isMobileMenu"
              :class="{ 'header__nav-burger--active': isMobileMenu }"
            >
              <div class="header__nav-burger-line"></div>
              <div class="header__nav-burger-line"></div>
              <div class="header__nav-burger-line"></div>
            </div>
          </div>
          <div
            class="header__nav-menu-mobile"
            :class="{ 'header__nav-menu-mobile--active': isMobileMenu }"
          >
            <div class="header__nav-menu-mobile-top">
              <div class="container">
                <div class="menu-item menu-item--date">
                  <img
                    src="@/assets/images/icons/calendar-light.svg"
                    alt=""
                    class="menu-item__icon"
                  />
                  <div class="menu-item__text">{{ currentDate }}</div>
                </div>
                <!-- <div
                  class="menu-item menu-item--location menu-item__text--dropdown"
                  @click="isLocationModal = true"
                >
                  <img
                    src="@/assets/images/icons/location-light.svg"
                    alt=""
                    class="menu-item__icon"
                  />
                  <div class="menu-item__text">{{ location }}</div>
                </div> -->
              </div>
            </div>
            <div class="header__nav-menu header__nav-menu-mobile-middle container">
              <div class="menu-item menu-item--has-dropdown">
                <div
                  class="menu-item__text menu-item__text--dark"
                  @click="handleMobileMenuDropdown"
                >
                  Об объединении
                </div>
                <div class="menu-item__dropdown">
                  <router-link to="/unity/history" class="menu-item__dropdown-item">
                    История
                  </router-link>
                  <router-link to="/unity/structure" class="menu-item__dropdown-item">
                    Руководство
                  </router-link>
                  <router-link to="/unity/activity" class="menu-item__dropdown-item">
                    Деятельность
                  </router-link>
                  <router-link to="/unity/calendar" class="menu-item__dropdown-item">
                    Спортивно-массовые мероприятия
                  </router-link>
                  <router-link to="/unity/gallery" class="menu-item__dropdown-item">
                    Фотогалерея
                  </router-link>
                  <router-link to="/unity/statute" class="menu-item__dropdown-item">
                    Устав объединения
                  </router-link>
                  <router-link to="/unity/docs" class="menu-item__dropdown-item">
                    Документы
                  </router-link>
                  <router-link to="/unity/partners" class="menu-item__dropdown-item">
                    Партнеры
                  </router-link>
                  <router-link to="/unity/gratitude" class="menu-item__dropdown-item">
                    Благодарности
                  </router-link>
                  <router-link to="/unity/archive" class="menu-item__dropdown-item">
                    Архив журнала
                  </router-link>
                </div>
              </div>
              <router-link to="/units" class="menu-item">
                <div class="menu-item__text menu-item__text--dark">Региональные отделения</div>
              </router-link>
              <router-link to="/news" class="menu-item">
                <div class="menu-item__text menu-item__text--dark">Новости</div>
              </router-link>
              <router-link to="/events" class="menu-item">
                <div class="menu-item__text menu-item__text--dark">Мероприятия</div>
              </router-link>
              <div class="menu-item menu-item--has-dropdown">
                <div
                  class="menu-item__text menu-item__text--dark"
                  @click="handleMobileMenuDropdown"
                >
                  Клубы
                </div>
                <div class="menu-item__dropdown">
                  <router-link to="/clubs/list" class="menu-item__dropdown-item">
                    Перечень клубов
                  </router-link>
                  <router-link to="/clubs/events" class="menu-item__dropdown-item">
                    Мероприятия
                  </router-link>
                  <router-link to="/clubs/assurance" class="menu-item__dropdown-item">
                    Нормативно-правовое обеспечение
                  </router-link>
                </div>
              </div>
              <router-link to="/contacts" class="menu-item">
                <div class="menu-item__text menu-item__text--dark">Контакты</div>
              </router-link>
            </div>
            <div class="container">
              <div class="header__nav-menu-mobile-footer ui-btn" @click="isJoinUsModal = true">
                Вступить в члены
              </div>
            </div>
          </div>
          <div class="header__nav-menu">
            <div class="header__nav-menu-hover" ref="nav-menu-hover-bg"></div>
            <div
              class="menu-item menu-item--has-dropdown"
              @mouseover="handleDropdownOver"
              @mouseleave="handleDropdownLeave"
              @focusOut="() => {}"
              @focusIn="() => {}"
            >
              <router-link
                to="/unity"
                class="menu-item__text menu-item__text--dark"
                @click="closeDropdown"
              >
                Об объединении
              </router-link>
              <div class="menu-item__dropdown">
                <router-link
                  to="/unity/history"
                  class="menu-item__dropdown-item"
                  @click="closeDropdown"
                >
                  История
                </router-link>
                <router-link
                  to="/unity/structure"
                  class="menu-item__dropdown-item"
                  @click="closeDropdown"
                >
                  Руководство
                </router-link>
                <router-link
                  to="/unity/activity"
                  class="menu-item__dropdown-item"
                  @click="closeDropdown"
                >
                  Деятельность
                </router-link>
                <router-link
                  to="/unity/calendar"
                  class="menu-item__dropdown-item"
                  @click="closeDropdown"
                >
                  Спортивно-массовые мероприятия
                </router-link>
                <router-link
                  to="/unity/gallery"
                  class="menu-item__dropdown-item"
                  @click="closeDropdown"
                >
                  Фотогалерея
                </router-link>
                <router-link
                  to="/unity/statute"
                  class="menu-item__dropdown-item"
                  @click="closeDropdown"
                >
                  Устав объединения
                </router-link>
                <router-link
                  to="/unity/docs"
                  class="menu-item__dropdown-item"
                  @click="closeDropdown"
                >
                  Документы
                </router-link>
                <router-link
                  to="/unity/partners"
                  class="menu-item__dropdown-item"
                  @click="closeDropdown"
                >
                  Партнеры
                </router-link>
                <router-link
                  to="/unity/gratitude"
                  class="menu-item__dropdown-item"
                  @click="closeDropdown"
                >
                  Благодарности
                </router-link>
                <router-link
                  to="/unity/archive"
                  class="menu-item__dropdown-item"
                  @click="closeDropdown"
                >
                  Архив журнала
                </router-link>
              </div>
            </div>
            <router-link to="/units" class="menu-item">
              <div class="menu-item__text menu-item__text--dark">Отделения</div>
            </router-link>
            <router-link to="/news" class="menu-item">
              <div class="menu-item__text menu-item__text--dark">Новости</div>
            </router-link>
            <router-link to="/events" class="menu-item">
              <div class="menu-item__text menu-item__text--dark">Мероприятия</div>
            </router-link>
            <!-- <div class="menu-item">
              <div class="menu-item__text menu-item__text--dark">Для партнеров</div>
            </div> -->
            <!-- <div class="menu-item">
              <div class="menu-item__text menu-item__text--dark">Для участников</div>
            </div> -->
            <div
              class="menu-item menu-item--has-dropdown"
              @mouseover="handleDropdownOver"
              @mouseleave="handleDropdownLeave"
              @focusOut="() => {}"
              @focusIn="() => {}"
            >
              <router-link
                to="/clubs"
                class="menu-item__text menu-item__text--dark"
                @click="closeDropdown"
              >
                Клубы
              </router-link>
              <div class="menu-item__dropdown">
                <router-link
                  to="/clubs/list"
                  class="menu-item__dropdown-item"
                  @click="closeDropdown"
                >
                  Перечень клубов
                </router-link>
                <router-link
                  to="/clubs/events"
                  class="menu-item__dropdown-item"
                  @click="closeDropdown"
                >
                  Мероприятия
                </router-link>
                <router-link
                  to="/clubs/assurance"
                  class="menu-item__dropdown-item"
                  @click="closeDropdown"
                >
                  Нормативно-правовое обеспечение
                </router-link>
              </div>
            </div>
            <router-link to="/contacts" class="menu-item">
              <div class="menu-item__text menu-item__text--dark">Контакты</div>
            </router-link>
          </div>
          <div class="header__nav-btn ui-btn" @click="isJoinUsModal = true">Вступить в члены</div>
        </div>
      </div>
    </nav>
  </header>
  <!-- <location-modal :location="location" :isVisible="isLocationModal ? true : false" /> -->
  <contact-us-modal :isVisible="isContactUsModal ? true : false" />
  <join-us-modal :isVisible="isJoinUsModal ? true : false" />
</template>

<script>
// import LocationModal from '@/components/modals/LocationModal.vue';
import ContactUsModal from '@/components/modals/ContactUsModal.vue';
import JoinUsModal from '@/components/modals/JoinUsModal.vue';

import { useCookies } from 'vue3-cookies';

import debounce from 'debounce';

export default {
  name: 'NavBar',
  components: {
    // LocationModal,
    ContactUsModal,
    JoinUsModal,
  },
  data() {
    return {
      isSearch: false,

      isMobileMenu: false,

      searchValue: null,
      isLocationModal: false,
      isContactUsModal: false,
      isJoinUsModal: false,

      location: 'Санкт-Петербург',
    };
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  mounted() {
    // if (this.cookies.isKey('location')) this.location = this.cookies.get('location');
    // else if (window.location.hostname !== 'localhost') {
    //   this.location = window.dadataLocation.location.data.city;
    // }

    window.addEventListener('resize', debounce(this.appHeight, 100));
    this.appHeight();

    // eslint-disable-next-line
    new isvek.Bvi();
  },
  beforeUnmount() {
    window.removeEventListener('resize', debounce(this.appHeight, 100));
  },
  methods: {
    onSearch() {
      if (this.searchValue) {
        this.$router.push({ name: 'search', query: { search: this.searchValue } });
        this.isSearch = false;
        this.searchValue = '';
      }
    },
    handleMobileMenuDropdown(e) {
      e.target.closest('.menu-item--has-dropdown').classList.toggle('menu-item--active-dropdown');
    },
    appHeight() {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    },
    handleDropdownOver(e) {
      const dropdown = e.target.classList.contains('menu-item__text')
        ? e.target.nextSibling
        : e.target.querySelector('.menu-item__dropdown');
      if (dropdown) {
        dropdown.classList.add('menu-item__dropdown--active');
        this.$refs['nav-menu-hover-bg'].style.height = `${dropdown.offsetHeight}px`;
        this.$refs['nav-menu-hover-bg'].classList.add('header__nav-menu-hover--active');
      }
    },
    handleDropdownLeave(e) {
      const dropdown = e.target.querySelector('.menu-item__dropdown');
      dropdown.classList.remove('menu-item__dropdown--active');
      this.$refs['nav-menu-hover-bg'].classList.remove('header__nav-menu-hover--active');
      this.$refs['nav-menu-hover-bg'].style.height = 0;
    },
    closeDropdown() {
      const dd = document.querySelectorAll('.menu-item__dropdown');
      dd.forEach((e) => {
        e.classList.remove('menu-item__dropdown--active');
      });
      this.$refs['nav-menu-hover-bg'].classList.remove('header__nav-menu-hover--active');
      this.$refs['nav-menu-hover-bg'].style.height = 0;
    },
  },
  computed: {
    currentDate() {
      const date = new Date();
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
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} г`;
    },
  },
  watch: {
    isSearch(val) {
      if (val) setTimeout(() => this.$refs['header-search-input'].focus(), 100);
    },
    isMobileMenu(val) {
      if (val) document.body.style.cssText = 'overflow: hidden;';
      else document.body.removeAttribute('style');
    },
    $route() {
      this.isMobileMenu = false;
    },
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;

  &__topline,
  &__nav {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &__topline {
    background: $dark-blue;
    padding: 20px 0;
    color: $white;

    &-inner-wrapper {
      display: flex;
      justify-content: space-between;
    }

    &-left,
    &-right {
      display: flex;
    }

    .container {
      position: relative;
    }

    &-left {
      column-gap: 32px;

      &--search-mode {
        .menu-item--search {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: calc(100% - 318px);
          background: $dark-blue;
          z-index: 2;
          justify-content: flex-start;

          .menu-item__text {
            display: none;
          }

          .menu-item__search {
            &-btn,
            &-close,
            &-input {
              display: flex;
            }

            &-input {
              width: 100%;
            }
          }
        }
      }
    }

    &-right {
      column-gap: 16px;
      align-items: center;

      .header__topline-text {
        max-width: 200px;
        color: $white;
        text-decoration: none;
      }
    }

    &-text {
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      text-align: left;
    }
  }

  &__nav {
    display: flex;
    background: $white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
    position: relative;
    height: 112px;
    align-items: center;
    z-index: 20;

    &-right-mobile,
    &-menu-mobile {
      display: none;
    }

    .container {
      height: 100%;
    }

    &-inner-wrapper {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      height: 100%;
      gap: 40px;
    }

    &-logo {
      display: flex;
      column-gap: 24px;
      align-items: center;
      height: 64px;

      &:after {
        content: '';
        position: relative;
        height: 48px;
        width: 1px;
        background: $gray-2;
      }

      .logo {
        height: 64px;
      }
    }

    &-menu {
      display: flex;
      column-gap: 28px;
      height: 100%;
      width: 100%;

      &-hover {
        width: 100%;
        position: absolute;
        top: 101%;
        left: 0;
        height: 0;
        background: $white;
        opacity: 0;
        z-index: 2;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);

        transition: opacity 0.2s ease;

        &--active {
          opacity: 1;
        }
      }

      .router-link-active .menu-item__text {
        color: $dark-blue;
      }
    }

    &-btn {
      height: fit-content;
      padding: 14px 30px;
      background: $blue;

      font-weight: 600;
      font-size: 14px;
      line-height: 20px;

      color: $white;

      border-radius: 8px;
      white-space: nowrap;
    }
  }
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 6px;
  position: relative;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
  color: $white;

  &.router-link-exact-active {
    .menu-item__text {
      font-weight: 700;
    }
  }

  &--date {
    cursor: unset;
    user-select: none;
  }

  &--search {
    width: auto;
  }

  &__search {
    &-btn {
      font-weight: 600;
      font-size: 14px;
      line-height: 14px;
      // padding: 6px 28px;
      // background: $white;
      // color: $black;
      color: $white;
      margin-right: 12px;
      text-transform: uppercase;
      border-radius: 8px;
      text-decoration: underline;
      cursor: pointer;
      display: none;
    }

    &-close {
      display: none;
    }

    &-input {
      width: 0;
      background: transparent;
      padding: 6px 12px !important;
      color: $white;
      font-size: 16px;
      line-height: 16px;
      display: none;
      align-items: center;

      &::placeholder {
        color: $gray-2;
        font-weight: 500;
        font-size: 16px;
        line-height: 10px;
      }
    }
  }

  &--has-dropdown {
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 3px;
      background: $dark-blue;
      transition: width 0.3s ease;
    }

    &:hover {
      &:after {
        width: 100%;
      }
    }

    .menu-item__text {
      height: 100%;
    }
  }

  &__dropdown {
    position: absolute;

    display: flex;
    flex-direction: column;
    row-gap: 16px;
    top: 100%;
    left: 0;
    z-index: 10;

    padding: 32px 0;

    opacity: 0;
    pointer-events: none;
    visibility: hidden;

    transition: opacity 0.2s ease;

    &--active {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }

    &-item {
      font-weight: 600;
      font-size: 14px;
      line-height: 24px;
      white-space: nowrap;
      text-align: left;
      color: $black;
      text-decoration: none;

      cursor: pointer;

      transition: color 0.3s ease;

      &:hover {
        color: $dark-blue;
      }

      &.router-link-exact-active {
        color: $dark-blue;

        &:hover {
          color: $dark-blue;
        }
      }
    }
  }

  &__text {
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    transition: color 0.3s ease-in-out;

    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 8px;
    text-decoration: none;

    &.router-link-exact-active {
      color: $dark-blue;
      font-weight: 700;
    }

    &--dropdown {
      &:after {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 6px 6px 0 6px;
        border-color: $white transparent transparent transparent;

        transition: $hover;
      }
    }

    &--dark {
      font-size: 16px;

      color: $black;

      &.menu-item__text--dropdown {
        &:after {
          border-color: $black transparent transparent transparent;
        }
      }

      &:hover {
        color: $dark-blue;

        &:after {
          border-color: $dark-blue transparent transparent transparent;
        }
      }
    }
  }
}

@media screen and (max-width: 1400px) {
  .header {
    &__nav {
      &-inner-wrapper {
        gap: 24px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .header {
    &__nav {
      height: 90px;
      padding: 18px 16px;
      &-menu,
      &-btn {
        display: none;
      }

      &-logo {
        height: 100%;
        &:after {
          display: none;
        }

        .logo {
          height: 100%;
        }
      }

      &-right-mobile,
      &-menu-mobile {
        display: block;
      }

      &-right-mobile {
        display: flex;
        column-gap: 8px;

        &-eye,
        &-search {
          cursor: pointer;
        }
      }

      &-inner-wrapper {
        justify-content: space-between;
        align-items: center;
      }

      &-menu-mobile {
        position: fixed;
        top: 90px;
        left: 0;
        width: 100vw;
        height: calc($app-height - 90px);

        opacity: 0;
        visibility: hidden;
        pointer-events: none !important;
        transform: translateY(10px);
        transition: $hover;
        background: $white;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 24px;

        * {
          pointer-events: none !important;
        }

        .container {
          height: fit-content;
        }

        &--active {
          opacity: 1;
          visibility: visible;
          pointer-events: all !important;
          * {
            pointer-events: all !important;
          }
          transform: translateY(0px);

          .header__nav-menu {
            pointer-events: all;
          }
        }

        .header__nav-menu {
          display: flex;
          height: fit-content;
          height: 100%;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          margin-top: 24px;
          overflow-y: scroll;

          &::-webkit-scrollbar {
            display: none;
          }

          -ms-overflow-style: none;
          scrollbar-width: none;

          margin-bottom: 24px;

          .menu-item {
            height: fit-content;
            padding: 16px 0;
            border-bottom: 1px solid $gray-3;
            width: 100%;
            justify-content: flex-start;

            &--has-dropdown {
              flex-direction: column;
              align-items: flex-start;
              z-index: 0;

              &:after {
                display: none;
              }

              .menu-item__text {
                position: relative;
                width: 100%;
                justify-content: flex-start;
                &:after {
                  content: '';
                  position: absolute;
                  top: 50%;
                  right: 0;
                  transform: translateY(-50%);
                  width: 32px;
                  height: 32px;
                  background: url('@/assets/images/icons/dropdown-arrow-dark.svg');
                  background-size: 24px;
                  background-position: center;
                  background-repeat: no-repeat;
                  transition: $hover;
                }
              }
            }

            &--active-dropdown {
              .menu-item__dropdown {
                padding: 32px 0 8px;
                max-height: 1000px;
              }

              .menu-item__text {
                &:after {
                  transform: translateY(-50%) rotate(180deg);
                }
              }
            }

            &__text {
              font-weight: 600;
              font-size: 18px;
              line-height: 20px;
              height: fit-content;
            }

            &__dropdown {
              display: flex;
              flex-direction: column;
              position: static;
              opacity: 1;
              visibility: visible;
              top: unset;
              padding: 32px 0 8px;
              max-height: 0;
              overflow: hidden;
              padding: 0;
              height: fit-content;
              pointer-events: all;
              z-index: -1;
              left: unset;

              transition: $hover;

              &-item {
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
              }
            }
          }
        }

        &-top {
          background: $dark-blue;

          .container {
            padding: 28px 0;
            display: flex;
            flex-direction: column;
            row-gap: 24px;
            align-items: flex-start;
          }
        }
      }

      &-burger {
        width: 32px;
        height: 32px;
        padding: 7px 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;

        &-line {
          width: 100%;
          height: 2px;
          background: $blue;
          border-radius: 30px;
          transition: $hover;
        }

        &--active {
          > :nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
          }

          > :nth-child(2) {
            transform: translateX(50px);
            opacity: 0;
          }

          > :nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
          }
        }
      }
    }

    &__topline {
      display: none;
    }
  }
}

@media screen and (max-width: 768px) {
  .header {
    &__nav {
      height: 77px;

      &-menu-mobile {
        top: 77px;
        height: calc($app-height - 77px);
      }
    }
  }
}
</style>
