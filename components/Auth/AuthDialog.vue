<template>
  <v-dialog v-model="model" width="400">
    <login-form v-if="state === 'LOGIN'" @close="model = false" />
    <register-form v-else-if="state === 'REGISTER'" @close="model = false" />
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { VDialog } from 'vuetify/lib'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

export default Vue.extend({
  components: {
    VDialog,
    LoginForm,
    RegisterForm,
  },
  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters({
      authDialog: 'app/getAuthDialog',
      state: 'app/getAuthDialogState',
    }),
    model: {
      get() {
        return this.authDialog
      },
      set(value) {
        this.$store.commit('app/SET', { authDialog: value })
        if (!value) this.$store.commit('app/SET', { authDialogState: 'LOGIN' })
      },
    },
  },
})
</script>
