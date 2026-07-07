<template>
  <span class="badge-status" :class="statusClass">{{ status || 'New Lead' }}</span>
</template>

<script>
export default {
  props: {
    status: String
  },
  computed: {
    statusClass() {
      const map = {
        'New Lead': 'bs-newlead',
        'Contacted': 'bs-contacted',
        'Follow-up Scheduled': 'bs-followup',
        'Demo Scheduled': 'bs-demo',
        'Proposal Sent': 'bs-proposal',
        'Negotiation': 'bs-negotiation',
        'Won': 'bs-won',
        'Close (Won)': 'bs-close-won',
        'Lost': 'bs-lost',
        'On Hold': 'bs-hold',
        'Hot': 'bs-hot',
        'Warm': 'bs-warm',
        'Solo': 'bs-solo',
        'Cold': 'bs-cold'
      }
      return map[this.status] || 'bs-newlead'
    }
  }
}
</script>
