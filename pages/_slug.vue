<template>
  <div class="container">
    <div class="row">
      <div class="content col-md-9">
        <h1>{{ article.title }}</h1>
        <p>{{ article.body }}</p>
        <h2>Comments:</h2>
        <comment-card
          v-for="(comment, index) in comments"
          :key="`comment-${index}`"
          :comment="comment"
        />
      </div>
      <div class="col-md-3">
        <g-card class="card" sticky radius="4" elevation="md">
          <img :src="article.author.image" :alt="article.author.username" />
          <div>{{ article.author.username }}</div>
          <time :datetime="article.createdAt">Created {{ createdAt }}</time>
          <time :datetime="article.updatedAt">Updated {{ updatedAt }}</time>
          <ul>
            <li v-for="(tag, index) in article.tagList" :key="`tag-${index}`">
              {{ tag }}
            </li>
          </ul>
        </g-card>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import CommentCard from '~/components/ArticleCard/CommentCard.vue'
import GCard from '~/components/ui/GCard.vue'
import { GET_ARTICLE, GET_COMMENTS } from '~/endpoints/article'
export default Vue.extend({
  components: { GCard, CommentCard },
  asyncData({ $axios, $auth, redirect, route }) {
    if (!$auth.loggedIn) {
      return redirect(301, '/?openAuth=true')
    }
    return $axios.$get(GET_ARTICLE(route.params.slug))
  },
  data() {
    return {
      comments: [],
    }
  },
  computed: {
    createdAt() {
      return this.$dayjs && this.$dayjs(this.article.createdAt).fromNow()
    },
    updatedAt() {
      return this.$dayjs && this.$dayjs(this.article.updatedAt).fromNow()
    },
  },
  watch: {
    '$auth.loggedIn': {
      handler(val) {
        if (!val) this.$router.push('/')
      },
    },
  },
  mounted() {
    this.$axios.$get(GET_COMMENTS(this.$route.params.slug)).then((res) => {
      this.comments = res.comments
    })
  },
})
</script>

<style lang="scss" scoped>
.card {
  display: grid;
  justify-items: center;
  margin: spacing(4) 0;
  margin-left: spacing(4);
  padding: spacing(4);
  font-size: 20px;
  gap: spacing(2);
  img {
    @include size(100px);
    border-radius: radius(circle);
  }
  > div {
    font-weight: bold;
  }
  ul {
    font-size: 14px;
    display: flex;
    gap: spacing(2);
    color: color(neutral, 100);
    margin-top: spacing(2);
    justify-self: self-start;
    flex-wrap: wrap;
    li {
      display: block;
      padding: spacing(2) spacing(4);
      border-radius: radius(pill);
      background-color: color(secondary, 300);
    }
  }
}
.content {
  margin: spacing(4) 0;
  display: flex;
  flex-direction: column;
  gap: spacing(4);
  h1 {
    font-size: 32px;
  }
  p {
    font-size: 26px;
  }
  h2 {
    font-size: 30px;
    margin-top: spacing(7);
  }
}
</style>
