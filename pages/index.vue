<template>
  <div>
    <template v-if="loading">loading</template>
    <template v-else>
      {{ articles }}
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  name: 'IndexPage',
  computed: {
    ...mapGetters({
      articles: 'articles/getArticles',
      loading: 'articles/getArticleLoading',
    }),
  },
  mounted() {
    this.$store.dispatch('articles/fetchArticles')
  },
})
</script>
