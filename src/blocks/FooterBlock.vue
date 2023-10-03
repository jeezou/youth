<template>
  <footer class="footer container">
    <div class="footer__logo">
      <img src="@/assets/images/logo.png" alt="footer logo" class="footer__logo-img" />
    </div>
    <div class="footer__about">
      <div class="footer__menu-title">Об объединении</div>
      <div class="footer__menu">
        <router-link
          :to="link.link"
          v-for="(link, index) in union"
          :key="`footer-menu-union-${index}`"
          class="footer__menu-item"
        >
          {{ link.name }}
        </router-link>
      </div>
    </div>
    <div class="footer__types">
      <div class="footer__menu-title">Виды спорта</div>
      <div class="footer__menu">
        <div class="footer__menu-item">Футбол</div>
        <div class="footer__menu-item">Легкая атлетика</div>
        <div class="footer__menu-item">Тяжелая атлетика</div>
        <div class="footer__menu-item">Настольный теннис</div>
        <div class="footer__menu-item">Лыжный спорт</div>
        <div class="footer__menu-item">Волейбол</div>
        <div class="footer__menu-item">Бокс</div>
      </div>
    </div>
    <div class="footer__news">
      <div class="footer__menu-title">Новости</div>
      <div class="footer__menu">
        <div class="footer__menu-item">Новости ФГСО “Юность России”</div>
        <div class="footer__menu-item">Лига Самбо</div>
        <div class="footer__menu-item">Международные новости</div>
        <div class="footer__menu-item">Новости отделений</div>
        <div class="footer__menu-item">Дайджест новостей</div>
        <div class="footer__menu-item">Все новости</div>
      </div>
    </div>
    <div class="footer__other">
      <div class="footer__menu-title">Прочее</div>
      <div class="footer__menu">
        <router-link to="/agreement" class="footer__menu-item" v-if="agreement">
          Пользовательское соглашение
        </router-link>
        <div class="footer__menu-item" @click="isContactUsModal = true" v-if="form">
          Подать обращение
        </div>
      </div>
    </div>
    <div class="footer__contacts">
      <router-link to="/contacts" class="footer__menu-title">Контакты</router-link>
      <div class="footer__menu">
        <div class="footer__menu-item">Адрес: 117292, г. Москва, ул. Кедрова, д. 8, корп. 2</div>
        <a class="footer__menu-item" href="mailto:rss_2004@mail.ru">Почта: rss_2004@mail.ru</a>
        <!-- <a class="footer__menu-item" href="mailto:pressa@sportunros.ru">
          Приемная: pressa@sportunros.ru
        </a> -->
      </div>
    </div>
    <div class="footer__socials">
      <div class="footer__menu-title" v-if="vk">Следите за нами в ВК</div>
      <div class="footer__socials-menu" v-if="vk">
        <a href="https://vk.com/sportunros_ru" target="_blank">
          <img class="footer__socials-item" src="@/assets/images/icons/vk.svg" alt="vk icon" />
        </a>
      </div>
    </div>
    <div class="footer__copyright">Copyright © 2022 ОГФСО "Юность России".</div>
    <div
      aria-hidden="true"
      class="scroll-top"
      :class="{ 'scroll-top--visible': isScrollTop }"
      @click="scrollTop"
    ></div>
    <div class="cookies-alert" :class="{ 'cookies-alert--active': isCookies }">
      Мы используем файлы cookie для обеспечения наилучшего взаимодействия.
      <div
        class="cookies-alert__btn"
        @click="
          isCookies = false;
          setCookies();
        "
      >
        Принимаю
      </div>
    </div>
  </footer>
  <contact-us-modal :isVisible="isContactUsModal ? true : false" />
</template>

<script>
import debounce from 'debounce';
import ContactUsModal from '@/components/modals/ContactUsModal.vue';

import { useCookies } from 'vue3-cookies';

export default {
  name: 'FooterBlock',
  components: { ContactUsModal },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      isScrollTop: false,
      isCookies: false,
      isContactUsModal: false,

      email: null,
      address: null,
      agreement: false,
      form: false,
      vk: false,

      union: [],
      others: [],
      socials: [],
    };
  },
  methods: {
    onScroll(e) {
      if ((e.target.documentElement.scrollTop || window.pageYOffset) > 600) this.isScrollTop = true;
      else this.isScrollTop = false;
    },
    scrollTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    setCookies() {
      this.cookies.set('cookies-agreement', 'true');
      this.isCookies = false;
    },
    getData() {
      this.$axios
        .get(`https://sportunros.ru/wp-json/wp/v2/posts/1515`)
        .then((response) => {
          this.email = response.data.acf.email;
          this.address = response.data.acf.address;
          response.data.acf.union.forEach((e) =>
            this.union.push({ name: e.split('|')[1], link: e.split('|')[0] })
          );
          response.data.acf.others.forEach((e) => {
            if (e.split('|')[1] === 'Пользовательское соглашение') this.agreement = true;
            if (e.split('|')[1] === 'Подать обращение') this.form = true;
          });
          response.data.acf.socials.forEach((e) => {
            if (e.split('|')[1] === 'Вконтакте') this.vk = true;
          });
        })
        .catch((e) => console.error(e));
    },
  },
  mounted() {
    window.addEventListener('scroll', debounce(this.onScroll, 100));
    if (!this.cookies.isKey('cookies-agreement')) this.isCookies = true;

    this.getData();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', debounce(this.onScroll));
  },
};
</script>

<style lang="scss">
.footer {
  padding: 64px 0 24px;
  border-top: 1px solid $gray-2;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;

  text-align: left;

  grid-template-areas:
    'logo about contacts'
    '. about other'
    '. about socials'
    'copyright copyright copyright';

  &__logo {
    grid-area: logo;

    &-img {
      max-width: 262px;
    }
  }

  &__other {
    grid-area: other;
  }

  &__menu {
    display: flex;
    flex-direction: column;
  }

  &__about {
    grid-area: about;
  }

  &__types {
    grid-area: types;
    display: none;
  }

  &__news {
    grid-area: news;
    display: none;
  }

  &__contacts {
    grid-area: contacts;
    color: $black !important;
    text-decoration: none;

    cursor: pointer;
  }

  &__socials {
    grid-area: socials;

    &-item {
      width: 48px;
      height: 48px;
    }
  }

  &__copyright {
    grid-area: copyright;
    margin-top: 48px;
    padding-top: 24px;

    font-weight: 500;
    font-size: 14px;
    line-height: 200%;

    color: $gray-1;
    border-top: 1px solid $gray-2;

    justify-self: flex-end;
    width: 100%;

    text-align: right;
  }

  &__menu-title {
    font-weight: 600;
    font-size: 18px;
    line-height: 140%;

    margin-bottom: 16px;
    color: $black;
    text-decoration: none;
  }

  &__menu-item {
    font-weight: 500;
    font-size: 16px;
    line-height: 200%;
    color: $gray-1 !important;
    transition: $hover;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: $black !important;
    }
  }

  .scroll-top {
    position: fixed;
    background: $black;
    width: 64px;
    height: 64px;
    bottom: 81px;
    right: 96px;
    border-radius: 8px;

    background-image: url('@/assets/images/icons/arrow-right.svg');
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;

    cursor: pointer;

    transform: rotate(-90deg) translateX(-50px);

    opacity: 0;
    visibility: hidden;
    pointer-events: none;

    transition: all 0.3s ease-in-out;

    &--visible {
      transform: translateX(0) rotate(-90deg);
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }
  }
}
.cookies-alert {
  position: fixed;
  right: 48px;
  bottom: 45px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  width: 30vw;
  background: $white;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgb(0 0 0 / 5%);
  width: 327px;

  font-weight: 500;
  font-size: 14px;
  line-height: 22px;

  &__btn {
    background: $black;
    border-radius: 5px;
    color: $white;
    transition: $hover;
    padding: 10px 65px;
    cursor: pointer;

    &:hover {
      background: #111;
    }
  }
  transition: $hover;

  transform: translateY(200px);
  opacity: 0;
  visibility: hidden;

  &--active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
}

@media screen and (max-width: 1200px) {
  .footer {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'logo about contacts'
      '.    about other'
      '.    about  socials'
      'copyright copyright copyright';

    .scroll-top {
      width: 48px;
      height: 48px;
      right: 72px;
      bottom: 48px;
    }
  }
}

@media screen and (max-width: 991px) {
  .footer {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'logo  logo'
      'about contacts'
      'about other'
      'about socials'
      'copyright copyright';
  }
}

@media screen and (max-width: 768px) {
  .footer {
    grid-template-columns: repeat(1, 1fr);
    grid-template-areas:
      'logo'
      'about'
      'contacts'
      'other'
      'socials'
      'copyright';

    .scroll-top {
      width: 48px;
      height: 48px;
      right: 32px;
      bottom: 32px;
    }
  }
}

@media screen and (max-width: 576px) {
  .footer {
    .scroll-top {
      right: 16px;
      bottom: 24px;
    }
  }
}
</style>
