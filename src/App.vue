<template>
  <nav-bar />
  <router-view />
  <footer-block />
  <toasts-component />
</template>

<script>
import NavBar from '@/blocks/NavBar.vue';
import FooterBlock from '@/blocks/FooterBlock.vue';
import ToastsComponent from '@/components/toasts/ToastsComponent.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    FooterBlock,
    ToastsComponent,
  },
};
</script>

<style lang="scss">
//import fonts
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');

//import additional css
//reset.css
@import '@/assets/styles/reset.css';

//bootstrap
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

html {
  scroll-behavior: auto !important;
  height: -webkit-fill-available;
}

body {
  min-height: 100vh;
  /* mobile viewport bug fix */
  min-height: -webkit-fill-available;
  overflow-x: hidden;
}

#app {
  font-family: 'Manrope', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $black;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: $gray-3;

  min-height: 100vh;
}

* {
  box-sizing: border-box;
}

a.router-link-active,
a.router-link-exact-active {
  color: $black;
  text-decoration: none;
}

.container {
  width: 100%;
  max-width: 1408px;
  margin: 0 50px;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.show-more-link {
  font-weight: 500;
  font-size: 14px;
  color: $blue;
  line-height: 23px;
  position: relative;
  cursor: pointer;
  text-decoration: none;

  &:before {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    background: $blue;
    bottom: -2px;
    left: 0;
    transition: $hover;
  }

  &:hover {
    color: $blue;
    &:before {
      width: 100%;
    }
  }
}

.ui-btn {
  background: $blue;
  padding: 14px 24px;
  color: $white;

  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  border-radius: 5px;

  cursor: pointer;
  transition: $hover;

  &:hover {
    background: $dark-blue;
  }

  &--disabled {
    background: #e8e8e8;

    &:hover {
      background: #e8e8e8;
    }
  }
}

.page-title {
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-align: left;
  text-transform: uppercase;
  margin: 16px 0 40px;

  &:before {
    content: '';
    position: relative;
    display: inline-block;
    margin-right: 12px;
    margin-left: 5px;
    width: 10px;
    height: 17px;
    transform: skew(-30deg);
    background: $orange;
  }
}

.common-page-wrapper {
  background: $white;
  border-radius: 8px;
  padding: 40px;
  margin-top: 72px;
}

.transparent-page-wrapper {
  margin-top: 72px;
}

.b-table {
  text-align: left;
  background: $white;
  --bs-table-border-color: #c6cbd9a2 !important;

  td {
    vertical-align: middle;
  }
}

.table-styles {
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px #d7dae1 !important;
  overflow: hidden;

  th {
    font-weight: 600;
  }

  td {
    font-weight: 500;
    font-size: 14.04px;
    line-height: 20px;
  }

  th,
  td {
    padding: 14px 16px !important;

    a {
      text-decoration: none;
      color: $black;
    }
  }

  td {
    a {
      display: block;
      padding: 14px 16px !important;
    }
  }
}

.grid-cards-template {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.dp {
  &__icon {
    box-sizing: unset !important;
  }
}

.wp-html-content {
  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $par;
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  h2,
  h3 {
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;
    text-transform: uppercase;
    margin-bottom: 32px;
  }

  ul {
    padding: 0;
  }

  li {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $par;
    padding-bottom: 16px;
    position: relative;
    padding-left: 32px;

    &:before {
      content: '';
      position: absolute;
      top: 9px;
      left: 10px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $blue;
    }
  }

  figure {
    margin-bottom: 32px;
    figcaption {
      font-family: 'Manrope';
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      margin-top: 16px;
      color: $gray-1;
    }

    img {
      border-radius: 8px;
      width: 100%;
      height: unset;
    }
  }

  img {
    border-radius: 8px;
    width: 100%;
    height: unset;
  }

  table {
    width: 100%;
    th,
    td {
      border: 1px solid $gray-2;
      padding: 12px;
    }
  }

  .wp-block-gallery {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;

    figure {
      margin-bottom: 0;
    }

    img {
      height: 100%;
      object-fit: cover;
    }
  }

  .wp-block-columns {
    display: flex;
    gap: 32px;
  }

  .wp-block-video {
    video {
      width: 100%;
    }
  }

  blockquote {
    margin: 40px 0;
    padding: 24px 55px 24px 67px;
    border-radius: 16px;
    background: $gray-3;

    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
    position: relative;

    &:before,
    &:after {
      content: '';
      width: 20px;
      height: 20px;
      position: absolute;
      top: 24px;
      left: 24px;
      background: url('@/assets/images/icons/quote.svg');
      background-size: 18px;
      background-repeat: no-repeat;
      background-position: center;
    }

    p {
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;
      color: $black;
    }

    cite {
      font-weight: 500;
      font-size: 18px;
      line-height: 32px;
      color: $gray-1;
    }

    &:after {
      right: 24px;
      bottom: 24px;
      left: unset;
      top: unset;
    }
  }

  p,
  pre {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $par;
    font-family: 'Manrope';
    white-space: pre-line;
  }

  iframe {
    width: 100%;
  }
}

@media screen and (max-width: 1400px) {
  .grid-cards-template {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 1200px) {
  .common-page-wrapper,
  .transparent-page-wrapper {
    margin-top: 56px;
  }
}

@media screen and (max-width: 991px) {
  .common-page-wrapper,
  .transparent-page-wrapper {
    margin-top: 40px;
  }

  .wp-html-content {
    .wp-block-gallery {
      display: grid;
      grid-template-columns: 1fr;
    }
  }

  .grid-cards-template {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .common-page-wrapper,
  .transparent-page-wrapper {
    margin-top: 24px;
  }

  .grid-cards-template {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media screen and (max-width: 576px) {
  .container {
    max-width: calc(100vw - 32px);
  }

  .page-title {
    font-size: 20px;
    line-height: 28px;
    margin: 16px 0 24px;

    &:before {
      height: 14px;
      top: 0 !important;
      margin-right: 10px !important;
    }
  }

  .common-page-wrapper {
    padding: 24px 16px;
  }
}
</style>
