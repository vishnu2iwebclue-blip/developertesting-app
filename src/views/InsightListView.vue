<template>
  <div class="page-content">
    <div style="font-size: 16px; font-weight: 800; margin-bottom: 14px; color: var(--txt)">
      {{ title }}
    </div>
    
    <div v-if="!leads.length" class="empty-state">
      <i class="fas fa-calendar"></i>
      <p>No records found</p>
    </div>
    <div v-else>
      <router-link
        v-for="l in leads"
        :key="l.id"
        :to="'/lead-details?id=' + l.id"
        class="insight-list-item"
      >
        <div class="ili-row">
          <div class="ili-name">
            {{ l.clientName }} <span style="color:var(--muted);font-weight:400">— {{ l.city || '—' }}</span>
          </div>
        </div>
        <div style="font-size:11px;color:var(--primary);font-weight:700;margin-bottom:3px">
          <i class="fas fa-calendar-alt me-1"></i>{{ l.meetingDate || '—' }} {{ l.meetingTime || '' }}
        </div>
        <div class="ili-meta">
          <span class="ili-tag"><i class="fas fa-tag me-1"></i>{{ l.businessCategory || '—' }}</span>
          <span class="ili-tag"><i class="fas fa-tasks me-1"></i>{{ l.meetingAgendaType || '—' }}</span>
          <span class="ili-tag"><i class="fas fa-user me-1"></i>{{ getUserName(l.assignedTo) }}</span>
          <span class="ili-tag"><i class="fas fa-user-check me-1"></i>Initiated: {{ getUserName(l.meetingInitiatedBy) }}</span>
          <span class="ili-tag"><i class="fas fa-plus-circle me-1"></i>By: {{ getUserName(l.createdBy) }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Auth } from '../services/auth'
import { Data } from '../services/data'
import { UI } from '../services/ui'
import { today, isAfter, isBefore } from '../utils/helpers'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const title = ref('')
    const leads = ref([])

    const loadData = async () => {
      const user = Auth.me()
      if (!user) {
        router.push('/login')
        return
      }
      await Data.loadAll()

      const type = route.query.type || 'followup-today'
      const td = today()
      const allLeads = Data.getLeadsForUser(user)

      const titles = {
        'followup-today': 'Today Followup',
        'followup-upcoming': 'Upcoming Followup',
        'followup-missed': 'Missed Followup',
        'meeting-today': 'Today Meeting',
        'meeting-upcoming': 'Upcoming Meeting',
        'meeting-missed': 'Missed Meeting'
      }

      title.value = titles[type] || 'Insights'

      let filtered = []

      const apiStats = await Data.getDashboardData(user)
      const fromApi = apiStats?.activityOverview
      if (fromApi) {
        if (type === 'followup-today') filtered = fromApi.todayFollowup || []
        else if (type === 'followup-upcoming') filtered = fromApi.upcomingFollowup || []
        else if (type === 'meeting-today') filtered = fromApi.todayMeeting || []
        else if (type === 'meeting-upcoming') filtered = fromApi.upcomingMeeting || []
      }

      // Fallback to local filtering if dashboard API list is empty/unavailable.
      if (!filtered.length) {
        if (type === 'followup-today') filtered = allLeads.filter(l => l.meetingType === 'Followup' && l.meetingDate === td)
        else if (type === 'followup-upcoming') filtered = allLeads.filter(l => l.meetingType === 'Followup' && isAfter(l.meetingDate, td))
        else if (type === 'followup-missed') filtered = allLeads.filter(l => l.meetingType === 'Followup' && isBefore(l.meetingDate, td))
        else if (type === 'meeting-today') filtered = allLeads.filter(l => l.meetingType === 'Meeting' && l.meetingDate === td)
        else if (type === 'meeting-upcoming') filtered = allLeads.filter(l => l.meetingType === 'Meeting' && isAfter(l.meetingDate, td))
        else if (type === 'meeting-missed') filtered = allLeads.filter(l => l.meetingType === 'Meeting' && isBefore(l.meetingDate, td))
      }

      leads.value = filtered
      UI.hideLoading()
    }

    onMounted(loadData)
    watch(() => route.query.type, loadData)

    const getUserName = (id) => Data.getUserName(id)

    return {
      title,
      leads,
      getUserName
    }
  }
}
</script>
