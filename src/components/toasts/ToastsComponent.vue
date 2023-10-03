<template>
  <div class="toasts-wrapper" :class="{ 'toasts-wrapper--visible': toasts.length }">
    <toast-item
      v-for="(toast, index) of toasts"
      :key="index"
      :toast="toast"
      :duration="duration"
      :class="{ 'toasts-wrapper__toast--visible': visibility[index] }"
      class="toasts-wrapper__toast"
      @click="dismissToast(toast.title)"
    />
  </div>
</template>

<script>
import ToastItem from '@/components/toasts/ToastComponent.vue';

export default {
  name: 'ToastsComponent',
  components: {
    ToastItem,
  },
  data() {
    return {
      visibility: [],
      duration: 5000,
    };
  },
  created() {},
  computed: {
    toasts() {
      return this.$store.state.toasts;
    },
  },
  methods: {
    dismissToast(title) {
      this.$store.commit('clearToast', title);
    },
  },
};
</script>

<style lang="scss">
.toasts-wrapper {
  position: fixed;
  z-index: 99999;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  padding: 0 32px 32px 0;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  align-items: center;

  visibility: hidden;

  &--visible {
    visibility: visible;
  }
}
</style>
