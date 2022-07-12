<template>
  <div class="container list">
    <template v-if="loading">
      <porgress-linear color="secondary" />
    </template>
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
import PorgressLinear from '~/components/ui/PorgressLinear.vue'
export default Vue.extend({
  name: 'IndexPage',
  components: {
    ArticleCard,
    PorgressLinear,
  },
  computed: {
    ...mapGetters({
      articles: 'articles/getArticles',
      loading: 'articles/getArticleLoading',
    }),
  },
  mounted() {
    this.$store.dispatch('articles/fetchArticles')
    if (this.$route.query.openAuth) {
      this.$store.commit('app/SET', { authDialog: true })
    }
  },
})
</script>
<style lang="scss" scoped>
.list {
  margin-top: spacing(4);
  gap: spacing(4);
}
</style>
