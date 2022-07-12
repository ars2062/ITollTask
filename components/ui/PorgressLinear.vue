<template>
  <div :style="{ computedStyle }" class="progress-container">
    <div
      v-if="value && max"
      :style="{ '--width': width }"
      :class="['progress-filler', $props.color]"
    ></div>
    <div v-else :class="['progress-indeterminate', $props.color]"></div>
  </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Colorable from '@/mixins/colorable'
import Sizable, { makeSizableStyle } from '@/mixins/sizable'
export default mixins(Colorable, Sizable).extend({
  props: {
    max: {
      type: Number,
      default: undefined,
    },
    value: {
      type: Number,
      default: undefined,
    },
  },
  computed: {
    computedStyle() {
      return makeSizableStyle(this.$props)
    },
    width() {
      return (Number(this.value) / Number(this.max)) * 100 + '%'
    },
  },
})
</script>

<style lang="scss" scoped>
.progress-container {
  direction: ltr;
  background: color('neutral', 300);
  height: 4px;
  border-radius: radius(1);
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: auto;

  .progress-filler {
    background-color: var(--color);
    border-radius: 8px;
    height: 100%;
    transition: all 0.5s;
    width: var(--width, 0);
    animation: filler 2s;
  }

  .progress-indeterminate {
    background-color: color('primary');

    &::before {
      content: '';
      height: 100%;
      position: absolute;
      background-color: inherit;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395)
        infinite;
    }

    &::after {
      content: '';
      position: absolute;
      background-color: inherit;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1)
        infinite;
      animation-delay: 1.15s;
    }
  }
}

@keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
}

@keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
}

@keyframes filler {
  from {
    width: 0;
  }

  to {
    width: var(--width);
  }
}
</style>
