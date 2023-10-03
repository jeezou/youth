<!-- eslint-disable vuejs-accessibility/anchor-has-content -->
<template>
  <div class="share-item">
    <span v-if="!collapsed">Поделиться</span>
    <img class="share-item__icon" src="@/assets/images/icons/share-dark.svg" alt="" />
    <div class="share-item__dropdown">
      <div class="share-item__dropdown-block">
        <div class="share-item__dropdown-title">Выберите способ</div>
        <div class="share-item__dropdown-list">
          <img src="@/assets/images/icons/copy-link.svg" alt="" @click="copyLink" />
          <a
            :href="`https://vk.com/share.php?url=${getAbsolutePath}`"
            class="share-item__share-link"
            target="_blank"
          >
            <img src="@/assets/images/icons/vk.svg" alt="" />
          </a>
          <a
            :href="
              isMobile
                ? `whatsapp://send?text=${getAbsolutePath}`
                : `https://web.whatsapp.com://send?text=${getAbsolutePath}`
            "
            data-action="share/whatsapp/share"
            class="share-item__share-link"
            target="_blank"
          >
            <img src="@/assets/images/icons/whatsapp.svg" alt="" />
          </a>
          <a
            :href="`https://t.me/share/url?url=${getAbsolutePath}`"
            class="share-item__share-link"
            target="_blank"
          >
            <img src="@/assets/images/icons/tg.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
    <!-- <div
      class="share-item__toast"
      :class="{ 'share-item__toast--active': isCopied }"
      @click="isCopied = false"
    >
      <img src="@/assets/images/icons/checked-green.svg" alt="checked" />
      Ссылка скопирована
      <img src="@/assets/images/icons/close-green.svg" alt="close" />
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'ShareComponent',
  props: {
    collapsed: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      isCopied: false,
    };
  },
  methods: {
    copyLink() {
      // navigator.clipboard.writeText(window.location.href);

      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        this.isCopied = true;
        setTimeout(() => {
          this.isCopied = false;
        }, 3000);
        this.$store.commit('addToast', {
          title: `Ссылка скопирована`,
          type: 'success',
          message: 'Ссылка скопирована',
        });
        return navigator.clipboard.writeText(window.location.href);
        // eslint-disable-next-line no-else-return
      } else {
        // text area method
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        // make the textarea out of viewport
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        this.isCopied = true;
        setTimeout(() => {
          this.isCopied = false;
        }, 3000);
        return new Promise((res, rej) => {
          // here the magic happens
          // eslint-disable-next-line
          document.execCommand('copy') ? res() : rej();
          textArea.remove();
          this.$store.commit('addToast', {
            title: `Ссылка скопирована`,
            type: 'success',
            message: 'Ссылка скопирована',
          });
        });
      }
    },
  },
  computed: {
    isMobile() {
      return /Android|iPhone/i.test(navigator.userAgent);
    },
    getAbsolutePath() {
      return window.location.href;
    },
  },
};
</script>

<style lang="scss">
.share-item {
  display: flex;
  column-gap: 4px;
  padding: 8px;
  align-items: center;
  justify-content: center;

  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  background: $gray-4;
  border-radius: 8px;
  cursor: pointer;
  transition: $hover;
  position: relative;
  height: fit-content;
  text-align: left;

  &:hover {
    background: $gray-2;

    .share-item__dropdown {
      visibility: visible;
      opacity: 1;
      transform: translateY(100%);
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
  }

  &__dropdown {
    visibility: hidden;
    opacity: 0;
    transition: $hover;

    position: absolute;
    bottom: 0;
    right: 0;
    transform: translateY(calc(100% + 10px));
    padding-top: 16px;

    &-block {
      display: flex;
      flex-direction: column;
      row-gap: 14px;
      padding: 14px 19px;
      background: $white;
      box-shadow: 0px 8px 16px rgba(156, 164, 169, 0.32);
      border-radius: 16px;
    }

    &-list {
      display: flex;
      align-items: center;
      column-gap: 8px;
      img {
        transition: $hover;
      }

      img:hover {
        filter: drop-shadow(0px 2px 4px rgba(156, 164, 169, 0.2)) brightness(0.95);
      }
    }

    &__title {
      font-weight: 700;
      font-size: 12px;
      line-height: 24px;
    }
  }

  &__toast {
    display: flex;
    padding: 22px 24px;
    background: #d5ffdf;
    column-gap: 16px;
    align-items: center;
    border-radius: 8px;
    color: $green;

    position: fixed;
    bottom: 48px;
    left: 50%;
    transform: translateX(-50%) translateY(200px);
    opacity: 0;
    visibility: hidden;

    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    transition: $hover;

    &--active {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
