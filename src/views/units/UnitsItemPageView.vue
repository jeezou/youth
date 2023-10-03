<template>
  <main class="unity-item-page container">
    <div class="unity-item-page__left common-page-wrapper">
      <bread-crumbs ref="breadcrumbs" :last="department.title" :key="department.title" />
      <div class="unity-item-page__title">{{ department.title }}</div>
      <div class="unity-item-page__image" v-if="!department.content">
        <img :src="require(`@/assets/images/departments/${department.defaultImg}`)" alt="" />
      </div>
      <div
        class="unity-item-page__content wp-html-content"
        v-html="department.defaultContent"
        v-if="!department.content"
      />
      <div
        class="unity-item-page__content wp-html-content"
        v-if="department.content"
        v-html="department.content"
      ></div>
    </div>
    <div class="unity-item-page__right">
      <div class="unity-item-page__contacts-title">Контакты</div>
      <div class="unity-item-page__contacts-list-item unity-item-page__address">
        <div class="unity-item-page__contacts-label">Адрес:</div>
        <span v-html="department.address" />
      </div>
      <div class="unity-item-page__contacts-list-item unity-item-page__tel">
        <div class="unity-item-page__contacts-label">Телефоны:</div>
        <span v-html="department.tel" />
      </div>
      <div class="unity-item-page__contacts-list-item unity-item-page__email">
        <div class="unity-item-page__contacts-label">Почта:</div>
        <span v-html="department.email" />
      </div>
      <!-- <div
        class="unity-item-page__contacts-calendar"
        :class="{ 'unity-item-page__contacts-calendar--disabled': !department.calendar }"
      >
        Загрузить календарный план
      </div> -->
    </div>
  </main>
  <partners-block />
</template>

<script>
import PartnersBlock from '@/blocks/PartnersBlock.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

export default {
  name: 'UnitsItemPageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
  },
  data() {
    return {
      department: {
        title:
          'Алтайское региональное отделение общественно-государственного физкультурно-спортивного объединения «Юность России»',
        defaultImg: '1.png',
        defaultContent:
          '<p>Региональное отделение строит свою работу на основании соглашений о сотрудничестве с Министерством образования, Министерством молодежной политики, физической культуры и спорта и региональными федерациями по видам спорта.</p><p>В объединении активно развиваются и проводятся спортивные соревнования различного уровня и ранга по видам спорта: греко-римская борьба, бокс, художественная гимнастика, легкая атлетика, настольный теннис, баскетбол, волейбол, лыжные гонки, плавание, армспорт, футбол, гиревой спорт, дзюдо, самбо.</p><p>Спортсмены объединения достойно представляют регион на Всероссийских соревнованиях, показывая высокие спортивные результаты.</p><p>Приобщение к систематическим занятиям, привитие культуры здорового образа жизни «трудовых резервов» – вот основная и главная задача региональных отделений.</p>',
        content: '',
        address: '656065, г. Барнаул ул. Просторная, д.59',
        tel: '+7(385-2) 35-39-68',
        email: 'altay@sportunros.ru',
      },
      crumb:
        'Региональное отделение общественно-государственного физкультурно-спортивного объединения «Юность России»',
    };
  },
  mounted() {
    document.title = `${process.env.VUE_APP_TITLE} - ${this.department.title}`;
    this.getData();
  },
  methods: {
    getData() {
      const _this = this;
      this.$axios
        .get(`https://sportunros.ru/wp-json/wp/v2/posts/${this.$route.params.id}`)
        .then((response) => {
          const d = response.data;
          _this.department = {
            title: `${d.title.rendered} общественно-государственного физкультурно-спортивного объединения «Юность России»`,
            defaultImg: '1.png',
            defaultContent:
              '<p>Региональное отделение строит свою работу на основании соглашений о сотрудничестве с Министерством образования, Министерством молодежной политики, физической культуры и спорта и региональными федерациями по видам спорта.</p><p>В объединении активно развиваются и проводятся спортивные соревнования различного уровня и ранга по видам спорта: греко-римская борьба, бокс, художественная гимнастика, легкая атлетика, настольный теннис, баскетбол, волейбол, лыжные гонки, плавание, армспорт, футбол, гиревой спорт, дзюдо, самбо.</p><p>Спортсмены объединения достойно представляют регион на Всероссийских соревнованиях, показывая высокие спортивные результаты.</p><p>Приобщение к систематическим занятиям, привитие культуры здорового образа жизни «трудовых резервов» – вот основная и главная задача региональных отделений.</p>',
            content: d.content.rendered,
            address: d.acf['адрес'],
            tel: d.acf['телефоны'],
            email: d.acf['почта'],
          };
          document.title = `${process.env.VUE_APP_TITLE} - ${d.title.rendered}`;
        });
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.unity-item-page {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 32px;
  position: relative;
  &__title {
    font-weight: 700;
    font-size: 28px;
    line-height: 36px;
    text-transform: uppercase;
    text-align: left;
    max-width: 70%;
    margin: 16px 0 40px;
  }

  &__left {
    max-width: 100% !important;
  }

  &__image {
    margin-bottom: 40px;

    img {
      width: 100%;
    }
  }

  &__content {
    text-align: left;
  }

  &__right {
    padding: 32px;
    background: $white;
    border-radius: 8px;
    height: fit-content;
    margin-top: 72px;
    position: sticky;
    top: 30px;

    display: flex;
    flex-direction: column;
    text-align: left;
  }

  &__contacts {
    &-title {
      font-weight: 700;
      font-size: 16px;
      line-height: 36px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    &-list-item {
      font-weight: 500;
      font-size: 14px;
      line-height: 23px;
      margin-bottom: 16px;
    }

    &-label {
      font-weight: 700;
    }

    &-calendar {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: $white;
      background: $black;
      padding: 14px 0;
      width: 100%;
      text-align: center;
      cursor: pointer;
      margin-top: 8px;
      border-radius: 4px;

      transition: $hover;

      &:hover {
        background: #111;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .unity-item-page {
    &__right {
      margin-top: 56px;
    }
  }
}

@media screen and (max-width: 991px) {
  .unity-item-page {
    grid-template-columns: 1fr;

    &__title {
      width: 100%;
      max-width: unset;
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;
    }

    &__right {
      margin-top: 0;
    }
  }
}
</style>
