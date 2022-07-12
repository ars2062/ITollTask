<template>
  <g-card :loading="flags.loading" class="pa-4" radius="3">
    <v-form ref="form" lazy-validation @submit.prevent="login">
      <h2 class="mb-4">Login</h2>
      <v-alert v-if="error" type="error"
        ><div class="ml-2">{{ error }}</div></v-alert
      >
      <v-text-field
        v-bind="attrs"
        v-model="form.email"
        :rules="[required, email]"
        label="email"
      />
      <v-text-field
        v-bind="attrs"
        v-model="form.password"
        :rules="[required]"
        label="password"
        type="password"
      />
      <v-btn type="submit" depressed class="mb-4 rounded-2" color="primary">
        login
      </v-btn>
      <p>
        don't have an account?
        <a href="#" @click.prevent="goToRegister">click here</a>
      </p>
    </v-form>
  </g-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { VTextField, VBtn, VForm, VAlert } from 'vuetify/lib'
import GCard from '../ui/GCard.vue'
import { required, email } from '@/utils/rules'
export default Vue.extend({
  components: {
    GCard,
    VTextField,
    VBtn,
    VForm,
    VAlert,
  },
  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      flags: {
        loading: false,
      },
      attrs: {
        outlined: true,
        required: true,
      },
      error: '',
    }
  },
  methods: {
    required,
    email,
    goToRegister() {
      this.$store.commit('app/SET', { authDialogState: 'REGISTER' })
    },
    login() {
      if (!(this.$refs.form as Vue & { validate: () => boolean })?.validate())
        return
      this.flags.loading = true
      this.$auth
        .login(this.form.email, this.form.password)
        .then(() => {
          this.$emit('close')
          this.error = ''
        })
        .catch((e) => {
          this.error = Object.entries(e.response.data.errors)
            .map(([key, value]) => `${key} ${(value as string[])[0]}`)
            .join('\n')
        })
        .finally(() => {
          this.flags.loading = false
        })
    },
  },
})
</script>
