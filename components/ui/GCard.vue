<template>
  <component :is="tag" :class="classes" :style="computedStyles">
    <slot />
  </component>
</template>

<script lang="ts">
import { PropType } from 'vue'
import mixins from 'vue-typed-mixins'
import Colorable from '@/mixins/colorable'
import Sizable, { makeSizableStyle, cssUnit } from '@/mixins/sizable'
import { TColorWithWeight, TElevation, TRadius } from '~/types/DesignSystem'

export default mixins(Colorable, Sizable).extend({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    elevation: {
      type: String as PropType<TElevation>,
      default: undefined,
    },
    radius: {
      type: String as PropType<TRadius>,
      default: undefined,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    borderWidth: {
      type: Number,
      default: 0,
    },
    borderColor: {
      type: String as PropType<TColorWithWeight>,
      default: undefined,
    },
    sticky: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  computed: {
    classes() {
      return [
        'card',
        `${this.color}`,
        `rounded-${this.radius}`,
        this.borderWidth && this.borderColor && `${this.borderColor}-border`,
        this.elevation && `elevation-${this.elevation}`,
        {
          'card--disabled': this.disabled,
          'card--loading': this.loading,
        },
      ]
    },
    computedStyles() {
      return {
        ...makeSizableStyle(this.$props),
        position: this.sticky ? 'sticky' : undefined,
        top: this.sticky ? '0' : undefined,
        '--border-width': cssUnit(this.borderWidth),
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.card {
  border: var(--border-width) solid;

  &--disabled {
    @include after {
      border-radius: inherit;
      background-color: rgba(color(neutral), 0.5);
    }
  }

  &--loading {
    position: relative;
    overflow: hidden;
  }

  &__loading {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
