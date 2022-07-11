<template>
  <div class="container list">
    <template v-if="loading">loading</template>
    <template v-else>
      <article-card
        v-for="(article, index) in articles"
        :key="`article-${index}`"
        :article="article"
      />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import ArticleCard from '@/components/ArticleCard/index.vue'
export default Vue.extend({
  name: 'IndexPage',
  components: {
    ArticleCard,
  },
  computed: {
    ...mapGetters({
      articles: 'articles/getArticles',
      loading: 'articles/getArticleLoading',
    }),
  },
  mounted() {
    console.log('mounted')
    this.$store.dispatch('articles/fetchArticles')
  },
})
</script>
<style lang="scss" scoped>
.list {
  margin-top: spacing(4);
  gap: spacing(4);
}
</style>
