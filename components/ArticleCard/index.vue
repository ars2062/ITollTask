<template>
  <g-card
    tag="a"
    :href="`/${article.slug}`"
    class="article"
    color="neutral-100"
    elevation="md"
    radius="4"
  >
    <img :src="article.author.image" :alt="article.author.username" />
    <h2>{{ article.title }}</h2>
    <p>{{ article.description }}</p>
    <ul>
      <li v-for="(tag, index) in article.tagList" :key="`tag-${index}`">
        {{ tag }}
      </li>
    </ul>
    <time :datetime="article.createdAt"
      >Created {{ $dayjs(article.createdAt).fromNow() }}</time
    >
    <time :datetime="article.updatedAt"
      >Updated {{ $dayjs(article.updatedAt).fromNow() }}</time
    >
  </g-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropType } from 'vue/types/v3-component-props'
import GCard from '../ui/GCard.vue'
import { IArticle } from '~/types/Article'

export default Vue.extend({
  name: 'ArticleCard',
  components: { GCard },
  props: {
    article: {
      type: Object as PropType<IArticle>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.article {
  padding: spacing(5);
  text-decoration: none;
  color: color(neutral, 900);
  display: grid;
  gap: spacing(2);
  grid-template-areas:
    'title title title image'
    'description description description image'
    'tags tags tags image'
    'created updated . image';
  $image-width: 80px;
  grid-template-columns: repeat(3, 1fr) #{$image-width};
  @include break-df(md) {
    grid-template-areas:
      'title image'
      'description description'
      'tags tags'
      'created updated';
    grid-template-columns: 1fr #{$image-width};
  }
  img {
    grid-area: image;
    @include size($image-width);
    border-radius: radius(circle);
    justify-self: self-end;
  }
  h2 {
    grid-area: title;
    font-size: 20px;
    margin-bottom: spacing(2);
  }
  p {
    grid-area: description;
    font-size: 18px;
  }
  ul {
    grid-area: tags;
    display: flex;
    gap: spacing(2);
    color: color(neutral, 100);
    margin: spacing(2) 0;
    li {
      display: block;
      padding: spacing(2) spacing(4);
      border-radius: radius(pill);
      background-color: color(secondary, 300);
    }
  }
  time {
    font-size: 11px;
    &:first-of-type {
      grid-area: created;
    }
    &:last-of-type {
      grid-area: updated;
    }
  }
}
</style>
