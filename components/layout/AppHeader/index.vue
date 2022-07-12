<template>
  <g-card tag="header" color="neutral-100" elevation="lg" height="64" sticky>
    <div class="container">
      <div class="header">
        <div class="header__links">
          <nuxt-link class="header__links__link" to="/">Home</nuxt-link>
        </div>

        <div class="header__actions">
          <template v-if="$auth.user">
            <nuxt-link to="/profile">{{ $auth.user.username }}</nuxt-link>
            <nuxt-link
              class="secondary neutral-200-text"
              to="/profile/new-article"
            >
              New Article
            </nuxt-link>
            <button
              class="error-border neutral-900-text"
              @click="$auth.logout()"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <button class="secondary-border secondary-text" @click="openAuth">
              SingUp/SignIn
            </button>
          </template>
        </div>
      </div>
    </div>
  </g-card>
</template>

<script lang="ts">
import Vue from 'vue'
import GCard from '../../ui/GCard.vue'

export default Vue.extend({
  name: 'AppHeader',
  components: { GCard },
  methods: {
    openAuth() {
      this.$store.commit('app/SET', { authDialog: true })
    },
  },
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
    a,
    button {
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
