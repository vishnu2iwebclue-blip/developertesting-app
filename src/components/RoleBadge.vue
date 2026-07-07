<template>
  <span class="badge-role" :class="roleClass">{{ role }}</span>
</template>

<script>
export default {
  props: {
    role: String
  },
  computed: {
    roleClass() {
      const map = {
        'Admin': 'br-admin',
        'Manager': 'br-manager',
        'Team Leader': 'br-tl',
        'Team Coordinator': 'br-tc',
        'Employee': 'br-emp'
      }
      return map[this.role] || 'br-emp'
    }
  }
}
</script>
