<template>
  <div class="toast-item" :class="[`toast-item--${toast.type}`]">
    <div class="toast-item__msg">
      {{ toast.message }}
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'ToastComponent',
  props: {
    toast: { required: true, type: Object, default: () => {} },
    duration: { type: Number, default: () => 5000 },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  created() {
    setTimeout(() => {
      this.$store.commit('clearToast', this.toast.title);
    }, this.duration);
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
.toast-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px 24px;
  border-radius: 8px;
  column-gap: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  width: fit-content;

  // transform: translateX(-50px);
  // opacity: 0;
  // transition: all 0.3s ease-in-out;

  &__msg {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
  }

  &:before {
    content: '';
    width: 34px;
    height: 34px;
  }

  &--success {
    background: #e0ffe8;
    &:before {
      background: url('@/assets/images/icons/success-toast-icon.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
  }

  &--warning {
    background: #ffede4;
    &:before {
      background: url('@/assets/images/icons/warning-toast-icon.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
  }

  &--error {
    background: #fce8db;
    &:before {
      background: url('@/assets/images/icons/error-toast-icon.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
  }

  &--visible {
    transform: translate(0);
    opacity: 1;
  }
}
</style>
