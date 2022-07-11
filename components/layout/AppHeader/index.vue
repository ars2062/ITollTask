<template>
  <g-card tag="header" color="neutral-100" elevation="lg" height="64" sticky>
    <div class="container">
      <div class="header">
        <div class="header__links">
          <nuxt-link class="header__links__link" to="/">Home</nuxt-link>
          <nuxt-link class="header__links__link" to="/">Profile</nuxt-link>
        </div>

        <div class="header__actions">
          <nuxt-link class="secondary neutral-200-text" to="/"
            >New Article</nuxt-link
          >
          <nuxt-link class="error-border neutral-900-text" to="/"
            >Logout</nuxt-link
          >
        </div>
      </div>
    </div>
  </g-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GCard from '../../ui/GCard.vue'

export default defineComponent({
  name: 'AppHeader',
  components: { GCard },
})
</script>

<style scoped lang="scss">
.header {
  display: flex;
  height: 64px;
  justify-content: space-between;

  &__actions,
  &__links {
    height: 64px;
    display: flex;
    align-items: center;
    gap: spacing(3);
  }

  &__actions {
    a {
      display: block;
      height: 40px;
      line-height: 40px;
      padding: 0 spacing(4);
      border-radius: radius(3);
      border: 2px solid;
    }
  }
}
</style>
