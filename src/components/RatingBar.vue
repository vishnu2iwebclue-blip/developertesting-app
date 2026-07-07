<template>
  <div v-if="rating" class="rating-bar">
    <div class="rating-track">
      <div class="rating-fill" :style="{ width: rating + '%' }"></div>
    </div>
    <div class="rating-label">{{ rating }}%</div>
  </div>
</template>

<script>
export default {
  props: {
    rating: [Number, String]
  },
  computed: {
    rating() {
      return parseInt(this.rating) || 0
    }
  }
}
</script>
