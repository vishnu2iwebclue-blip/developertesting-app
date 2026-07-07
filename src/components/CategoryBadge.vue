<template>
  <span v-if="category" class="badge-status" :class="categoryClass">{{ category }}</span>
</template>

<script>
export default {
  props: {
    category: String
  },
  computed: {
    categoryClass() {
      const map = { Hot: 'bs-hot', Warm: 'bs-warm', Solo: 'bs-solo', Cold: 'bs-cold' }
      return map[this.category] || 'bs-cold'
    }
  }
}
</script>
