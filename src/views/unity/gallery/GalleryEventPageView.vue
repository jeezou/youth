<template>
  <main class="gallery-event-page container">
    <div class="gallery-event-page__inner-wrapper transparent-page-wrapper">
      <bread-crumbs ref="breadcrumbs" :last="this.data.title" :key="this.data.title" />
      <div class="gallery-event-page__title page-title">
        {{ data.title }}
      </div>
      <div class="gallery-event-page__photos grid-cards-template">
        <div
          class="gallery-event-page__photo"
          v-for="(image, index) in data.images"
          :key="`gallery-event-page-${index}`"
          @click="
            currentModalImage = image;
            currentIndex = index;
          "
          v-html="image"
        ></div>
      </div>
    </div>
    <partners-block />
    <div class="gallery-event-page__modal" v-if="currentModalImage">
      <div class="gallery-event-page__modal-img">
        <div v-html="currentModalImage" />
        <img
          src="@/assets/images/icons/closeModal.svg"
          alt=""
          class="gallery-event-page__modal-close"
          @click="currentModalImage = image"
        />
        <div class="gallery-event-page__modal-next" @click="handleNav('next')"></div>
        <div class="gallery-event-page__modal-prev" @click="handleNav('prev')"></div>
      </div>
      <div class="gallery-event-page__modal-bg" @click="currentModalImage = null"></div>
    </div>
  </main>
</template>

<script>
import PartnersBlock from '@/blocks/PartnersBlock.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

export default {
  name: 'GalleryEventPageView',
  components: {
    PartnersBlock,
    BreadCrumbs,
  },
  data() {
    return {
      data: {},
      currentModalImage: null,
    };
  },
  mounted() {
    this.getPost();
  },
  methods: {
    getPost() {
      this.$axios
        .get(`https://sportunros.ru/wp-json/wp/v2/posts/${this.$route.params.id}`)
        .then((response) => {
          this.data.title = response.data.title.rendered;
          this.data.images = [];
          const content = document.createElement('div');
          content.innerHTML = response.data.content.rendered;
          content
            .querySelector('.wp-block-gallery')
            .querySelectorAll('.wp-block-image')
            .forEach((image) => {
              this.data.images.push(image.firstChild.outerHTML);
            });

          document.title = `${process.env.VUE_APP_TITLE} - ${this.data.title}`;
        });
    },
    handleNav(dir) {
      /* eslint-disable */
      if (dir === 'next') {
        this.currentIndex + 1 > this.data.images.length - 1
          ? (this.currentIndex = 0)
          : (this.currentIndex += 1);
      } else {
        this.currentIndex - 1 < 0
          ? (this.currentIndex = this.data.images.length - 1)
          : (this.currentIndex -= 1);
      }
      this.currentModalImage = this.data.images[this.currentIndex];
      /* eslint-enable */
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
.gallery-event-page {
  &__title {
    &:before {
      background: $green;
      top: -3px;
    }
  }

  &__photo {
    cursor: pointer;
    transition: $hover;
    border-radius: 8px;
    overflow: hidden;
    img {
      width: 100%;
      min-height: 200px;
      max-height: 200px;
      background-image: url('@/assets/images/loading.gif');
      background-size: 50%;
      background-repeat: no-repeat;
      background-position: 50%;
      object-fit: cover;
    }

    &:hover {
      transform: scale(1.03);
    }
  }

  &__modal {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;

    &-next {
      width: 56px;
      height: 56px;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(calc(100% + 10px), -50%);
      background: url('@/assets/images/icons/slider-nav-light.svg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
      transition: $hover;
      opacity: 0.8;
      &:hover {
        opacity: 1;
        transform: translate(calc(100% + 10px), -50%) scale(1.1);
      }
    }

    &-prev {
      width: 56px;
      height: 56px;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(calc(-100% - 10px), -50%) rotate(180deg);
      background: url('@/assets/images/icons/slider-nav-light.svg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
      opacity: 0.8;
      transition: $hover;
      &:hover {
        opacity: 1;
        transform: translate(calc(-100% - 10px), -50%) rotate(180deg) scale(1.1);
      }
    }

    &-bg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }

    &-img {
      max-width: 50vw;
      max-height: 70vh;
      position: relative;

      img {
        max-width: 50vw;
        max-height: 70vh;
        object-fit: contain;
      }
    }

    &-close {
      position: absolute;
      z-index: 2;
      top: -15px;
      right: -75px;
      cursor: pointer;
      transition: $hover;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}

@media screen and (max-width: 991px) {
  .gallery-event-page {
    &__modal {
      &-img {
        max-width: 80vw;
        max-height: 90vh;
        position: relative;

        img {
          max-width: 80vw;
          max-height: 90vh;
          object-fit: contain;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .gallery-event-page {
    &__modal {
      &-close {
        right: -55px;
      }
      &-next {
        opacity: 0.8;
        transform: translate(calc(100% + 10px), -50%);
        &:hover {
          opacity: 1;
          transform: translate(calc(100% + 10px), -50%) scale(1.1);
        }
      }

      &-prev {
        opacity: 0.8;
        transform: translate(calc(-100% - 10px), -50%) rotate(180deg);
        &:hover {
          opacity: 1;
          transform: translate(calc(-100% - 10px), -50%) rotate(180deg) scale(1.1);
        }
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .gallery-event-page {
    &__modal {
      &-img {
        overflow: hidden;
      }
      &-close {
        right: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 0 0 0 4px;
        width: 32px;
        height: 32px;
      }
      &-next {
        transform: translate(5px, -50%);
        &:hover {
          transform: translate(5px, -50%) scale(1.1);
        }
        background: rgba(0, 0, 0, 0.6) url('@/assets/images/icons/slider-nav-light.svg');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 4px 0 0 4px;
        width: 40px;
        height: 40px;
      }

      &-prev {
        transform: translate(-5px, -50%) rotate(180deg);
        &:hover {
          opacity: 1;
          transform: translate(-5px, -50%) rotate(180deg) scale(1.1);
        }
        background: rgba(0, 0, 0, 0.6) url('@/assets/images/icons/slider-nav-light.svg');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 4px 0 0 4px;
        width: 40px;
        height: 40px;
      }

      &-img {
        max-width: calc(100vw - 32px);
        max-height: 95vh;

        img {
          max-width: calc(100vw - 32px);
          max-height: 95vh;
        }
      }
    }
  }
}
</style>
