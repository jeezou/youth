<template>
  <div
    class="badge-item"
    :class="[{ 'badge-item--date': type === 'date' }, { 'badge-item--time': type === 'time' }]"
    :style="[badge.color ? { background: badge.color } : '']"
    :data-type="badge"
    v-if="badge && badge.toLowerCase() !== 'не указано'"
  >
    {{ badge }}
  </div>
</template>

<script>
export default {
  name: 'BadgeComponent',
  props: {
    badge: {
      type: String,
      default: () => {},
    },
    type: {
      type: String,
      default: () => '',
    },
  },
};
</script>

<style lang="scss">
.badge-item {
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: $white;
  background: $orange;
  border-radius: 18px;
  padding: 2px 18px;
  white-space: nowrap;

  &[data-type='Волейбол'],
  &[data-type='Футбол'] {
    background: $red;
  }

  &[data-type='Дзюдо'],
  &[data-type='Борьба'],
  &[data-type='Греко-римская борьба'] {
    background: $dark-blue;
  }

  &[data-type='Самбо'],
  &[data-type='Другое'],
  &[data-type='Легкая атлетика'] {
    background: $orange;
  }

  &--date,
  &--time {
    font-weight: 600;
    font-size: 10px;
    line-height: 20px;
    color: $black;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 4px;
    padding: 2px 12px;
    background: $gray-3;

    &:before {
      content: '';
      width: 16px;
      height: 16px;
      background-size: 18px;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &--date {
    &:before {
      background-image: url('@/assets/images/icons/calendar-dark.svg');
    }
  }

  &--time {
    &:before {
      background-image: url('@/assets/images/icons/time-dark.svg');
    }
  }
}
</style>
