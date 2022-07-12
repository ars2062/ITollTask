<template>
  <div id="app" data-app>
    <login-dialog />
    <app-header />
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppHeader from '@/components/layout/AppHeader/index.vue'
import LoginDialog from '~/components/Auth/AuthDialog.vue'
export default Vue.extend({
  components: { AppHeader, LoginDialog },
  watch: {
    '$auth.loggedIn': {
      handler(val) {
        if (!val) this.$router.push('/')
      },
      immediate: true,
    },
  },
})
</script>
