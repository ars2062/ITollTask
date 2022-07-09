<template>
  <div id="layout">
    <app-header />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '~/components/layout/AppHeader/index.vue'

export default defineComponent({
  components: { AppHeader },
})
</script>
