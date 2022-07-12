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
import { defineComponent } from 'vue'
import AppHeader from '@/components/layout/AppHeader/index.vue'
import LoginDialog from '~/components/Auth/AuthDialog.vue'
export default defineComponent({
  components: { AppHeader, LoginDialog },
})
</script>
