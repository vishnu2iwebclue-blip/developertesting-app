<template>
  <div class="page-content" v-if="loaded">
    <form @submit="save" id="comm-form" class="mob-card">
      <div class="form-group">
        <label class="form-label" id="comm-lead-info">
          {{ lead.clientName }} — {{ lead.clientCompany }}
        </label>
        <div style="font-size: 12px; color: var(--muted); padding: 10px 0"></div>
      </div>

      <div class="form-group">
        <label class="form-label">Type</label>
        <select v-model="form.type" class="form-select">
          <option value="Call">Call</option>
          <option value="Email">Email</option>
          <option value="Meeting">Meeting</option>
          <option value="WhatsApp">WhatsApp</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Date & Time</label>
        <input v-model="form.date" type="datetime-local" class="form-control" />
      </div>

      <div class="form-group">
        <label class="form-label">Notes <span class="required-mark">*</span></label>
        <textarea v-model="form.notes" class="form-control" placeholder="Communication notes..." style="min-height: 100px"></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Update Lead Status</label>
        <select v-model="form.newStatus" class="form-select">
          <option value="">Keep current status</option>
          <option value="New Lead">New Lead</option>
          <option value="Contacted">Contacted</option>
          <option value="Follow-up Scheduled">Follow-up Scheduled</option>
          <option value="Demo Scheduled">Demo Scheduled</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Won">Won</option>
          <option value="Close (Won)">Close (Won)</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      <button type="submit" class="btn-primary-crm w-full">
        <i class="fas fa-save me-1"></i> Log Communication
      </button>
    </form>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Auth } from '../services/auth'
import { Data } from '../services/data'
import { UI } from '../services/ui'
import { nowISO } from '../utils/helpers'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const lead = ref(null)
    const loaded = ref(false)

    const form = reactive({
      type: 'Call',
      date: '',
      notes: '',
      newStatus: ''
    })

    onMounted(async () => {
      const user = Auth.me()
      if (!user) {
        router.push('/login')
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
      form.date = nowISO()
      loaded.value = true

      UI.hideLoading()
    })

    const save = (e) => {
      e.preventDefault()
      const user = Auth.me()
      if (!user) return

      if (!form.notes) {
        UI.toast('Please enter notes', 'error')
        return
      }

      const l = lead.value
      const comm = {
        type: form.type || 'Call',
        date: (form.date || nowISO()).replace('T', ' '),
        user: user.userId,
        notes: form.notes
      }

      const comms = [...(l.communications || []), comm]
      const updated = {
        ...l,
        communications: comms,
        updatedAt: nowISO()
      }

      if (form.newStatus) {
        updated.status = form.newStatus
      }

      Data.upsert('leads', updated)
      UI.toast('Communication logged!', 'success')
      setTimeout(() => router.push('/lead-details?id=' + l.id), 800)
    }

    return {
      lead,
      form,
      loaded,
      save
    }
  }
}
</script>
