<template>
  <div class="page-content" v-if="loaded">
    <form @submit="save" id="assign-form" class="mob-card">
      <div class="form-group">
        <label class="form-label" id="assign-lead-info">
          {{ lead.clientName }} — {{ lead.clientCompany }}
        </label>
        <div style="font-size: 12px; color: var(--muted); padding: 10px 0"></div>
      </div>

      <div class="form-group">
        <label class="form-label">Assign To <span class="required-mark">*</span></label>
        <select v-model="assignTo" id="assign-to" class="form-select">
          <option value="">Select Employee</option>
          <option v-for="u in employees" :key="u.id" :value="u.id">
            {{ u.name }} ({{ u.role }})
          </option>
        </select>
      </div>

      <button type="submit" class="btn-primary-crm w-full">
        <i class="fas fa-save me-1"></i> Assign Lead
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Auth } from '../services/auth'
import { Data } from '../services/data'
import { UI } from '../services/ui'
import { nowISO } from '../utils/helpers'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const employees = ref([])
    const assignTo = ref('')
    const lead = ref(null)
    const loaded = ref(false)

    onMounted(async () => {
      const user = Auth.me()
      if (!user) {
        router.push('/login')
        return
      }

      if (!Auth.can('assign_lead', user.role)) {
        UI.toast('Access denied', 'error')
        router.push('/leads')
        return
      }
      await Data.loadAll()

      const id = route.query.id
      if (!id) {
        router.push('/leads')
        return
      }

      const l = await Data.fetchLeadById(id)
      if (!l) {
        router.push('/leads')
        return
      }

      lead.value = l
      assignTo.value = l.assignedTo || ''
      employees.value = Data.getEmployeesForUser(user)
      loaded.value = true

      UI.hideLoading()
    })

    const save = (e) => {
      e.preventDefault()
      if (!assignTo.value) {
        UI.toast('Please select an employee', 'error')
        return
      }

      const l = lead.value
      const tm = Data.getAll('users').find(u => u.id === assignTo.value)?.teamId || l.teamId

      Data.upsert('leads', {
        ...l,
        assignedTo: assignTo.value,
        teamId: tm,
        updatedAt: nowISO()
      })

      UI.toast('Lead assigned!', 'success')
      setTimeout(() => router.push('/lead-details?id=' + l.id), 800)
    }

    return {
      employees,
      assignTo,
      lead,
      loaded,
      save
    }
  }
}
</script>
