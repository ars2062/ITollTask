<template>
  <div class="container">
    <g-card class="user">
      <h2>Profile:</h2>
      <span v-if="!flags.edit" @click="edit">Edit</span>
      <v-form ref="form" class="user__form">
        <v-text-field v-model="form.username" v-bind="attrs" label="username" />
        <v-text-field v-model="form.email" v-bind="attrs" label="email" />
        <v-text-field
          v-model="form.password"
          v-bind="attrs"
          label="new password"
          type="password"
        />
        <v-text-field v-bind="attrs" label="image" type="file" />
        <v-textarea v-model="form.bio" v-bind="attrs" label="bio" />
      </v-form>
      <v-btn
        v-if="flags.edit"
        :loading="flags.loading"
        depressed
        @click="submit"
        >Submit</v-btn
      >
    </g-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GCard from '@/components/ui/GCard.vue'
import { TUser } from '~/plugins/auth'
export default Vue.extend({
  components: { GCard },
  layout: 'profile',
  data() {
    return {
      attrs: {
        outlined: true,
        disabled: true,
      },
      flags: {
        edit: false,
        loading: false,
      },
      form: { ...this.$auth.user },
    }
  },
  methods: {
    edit() {
      this.flags.edit = true
      this.attrs.disabled = false
    },
    submit() {
      if (!(this.$refs.form as Vue & { validate: () => boolean })?.validate())
        return
      this.flags.loading = true
      this.$auth
        .updateUser(this.form as TUser)
        .then(() => {
          this.flags.edit = false
          this.attrs.disabled = true
          this.$auth.getUser()
        })
        .finally(() => {
          this.flags.loading = false
        })
    },
  },
})
</script>

<style lang="scss" scoped>
::v-deep {
  .v-text-field {
    width: calc(50% - (#{spacing(4)} / 2));
  }
}
.user {
  margin: spacing(6);
  padding: spacing(6);
  h2 {
    font-size: 26px;
    margin-bottom: spacing(2);
    display: inline-block;
  }
  span {
    font-size: 20px;
    color: color(info);
    cursor: pointer;
  }
  &__form {
    display: flex;
    height: 100%;
    gap: spacing(4);
    flex-wrap: wrap;
  }
  button {
    background-color: color(primary) !important;
    color: color(neutral, 300) !important;
  }
}
</style>
