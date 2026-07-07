<template>
  <span v-if="payment" class="badge-pay" :class="paymentClass">{{ payment }}</span>
</template>

<script>
export default {
  props: {
    payment: String
  },
  computed: {
    paymentClass() {
      const map = {
        'Pay Today': 'bp-today',
        'Pay Tomorrow': 'bp-tomorrow',
        'Pay This Week': 'bp-thisweek',
        'Pay Next Week': 'bp-nextweek',
        'Pay Ignoring': 'bp-ignoring',
        'Pay Lost': 'bp-lost'
      }
      return map[this.payment] || 'bp-ignoring'
    }
  }
}
</script>
