<template>
  <div class="container my-4">
    <v-form @submit.prevent="submit">
      <g-card class="pa-4" :loading="flags.loading">
        <h1 class="mb-2">New Article</h1>
        <v-text-field v-bind="attrs" v-model="form.title" label="title" />
        <v-textarea
          v-bind="attrs"
          v-model="form.description"
          label="description"
        />
        <v-textarea v-bind="attrs" v-model="form.body" label="body" />
        <v-autocomplete
          v-bind="attrs"
          v-model="form.tagList"
          label="tags"
          :items="tags"
          multiple
          :search-input="search"
          @update:search-input="search = $event"
          @keydown.enter.prevent="addToList"
        >
          <template #no-data>
            <div class="pa-3">press enter to create new tag: {{ search }}</div>
          </template>
        </v-autocomplete>
        <v-btn depressed type="submit">submit</v-btn>
      </g-card>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GCard from '~/components/ui/GCard.vue'
import { CREATE_ARTICLE, GET_TAGS } from '~/endpoints/article'
export default Vue.extend({
  components: { GCard },
  layout: 'profile',
  data() {
    return {
      attrs: {
        outlined: true,
        disabled: true,
      },
      form: {
        title: 'How to train your dragon',
        description: 'Ever wonder how?',
        body: 'Very carefully.',
        tagList: ['training', 'dragons'],
      },
      flags: {
        loading: false,
      },
      tags: [] as string[],
      search: '',
    }
  },
  mounted() {
    this.flags.loading = true
    this.$axios
      .$get(GET_TAGS())
      .then((res) => {
        this.tags = res.tags
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.flags.loading = false
        this.attrs.disabled = false
      })
  },
  methods: {
    addToList() {
      this.tags.push(this.search)
      this.form.tagList.push(this.search)
      this.search = ''
    },
    submit() {
      this.flags.loading = true
      this.$axios
        .$post(CREATE_ARTICLE(), {
          article: this.form,
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.flags.loading = false
        })
    },
  },
})
</script>

<style lang="scss" scoped></style>
