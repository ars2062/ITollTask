<template>
  <div class="comment">
    <div class="comment__header">
      <img :src="comment.author.image" :alt="comment.author.username" />
      <h3>{{ comment.author.username }}</h3>
      <time :datetime="comment.createdAt"
        >Created {{ $dayjs(comment.createdAt).fromNow() }}</time
      >
    </div>
    <g-card class="comment__content" elevation="md" radius="2">
      <p>{{ comment.body }}</p>
    </g-card>
  </div>
</template>

<script>
import Vue from 'vue'
import GCard from '../ui/GCard.vue'
export default Vue.extend({
  components: { GCard },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.comment {
  margin-bottom: spacing(4);
  &__header {
    display: grid;
    grid-template-columns: 50px 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    column-gap: spacing(6);
    img {
      @include size(50px);
      border-radius: radius(circle);
      grid-row-end: span 2;
    }
    time {
      font-size: 14px;
      align-self: self-start;
    }
  }
  &__content {
    padding: spacing(4);
    margin-top: spacing(3);
  }
}
</style>
