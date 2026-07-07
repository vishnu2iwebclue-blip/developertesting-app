<template>
  <div class="page-content">
    <div class="greeting-card">
      <div class="gc-greeting">{{ greeting }}</div>
      <div class="gc-name">{{ userName }}</div>
      <div class="gc-badge">{{ role }}</div>
    </div>

    <!-- Stats Section -->
    <div id="dash-stats">
      <div class="stat-card">
        <div class="sc-icon" style="background:rgba(21,101,192,.1);color:var(--primary)"><i class="fas fa-users"></i></div>
        <div>
          <div class="sc-val">{{ totalLeads }}</div>
          <div class="sc-lbl">Total Leads</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="sc-icon" style="background:rgba(46,125,50,.1);color:var(--success)"><i class="fas fa-trophy"></i></div>
        <div>
          <div class="sc-val">{{ wonLeads }}</div>
          <div class="sc-lbl">Won</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="sc-icon" style="background:rgba(230,81,0,.1);color:var(--warning)"><i class="fas fa-fire"></i></div>
        <div>
          <div class="sc-val">{{ hotLeads }}</div>
          <div class="sc-lbl">Hot Leads</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="sc-icon" style="background:rgba(41,121,255,.1);color:var(--accent)"><i class="fas fa-calendar-check"></i></div>
        <div>
          <div class="sc-val">{{ todayCount }}</div>
          <div class="sc-lbl">Today</div>
        </div>
      </div>
    </div>

    <!-- Insights Sections -->
    <div id="insight-sections">
      <div v-for="(row, idx) in insightRows" :key="idx" class="insight-2col">
        <div 
          v-for="section in row" 
          :key="section.type" 
          class="insight-section"
          :class="{ upcoming: section.isUpcoming, missed: section.isMissed }"
        >
          <div class="is-header">
            <div class="is-title" v-html="section.title"></div>
            <div class="is-count">{{ section.list.length }}</div>
          </div>
          
          <!-- Cards List -->
          <div v-if="!section.list.length" style="font-size:11px;color:var(--muted);padding:6px 0;text-align:center">
            None
          </div>
          <template v-else>
            <router-link 
              v-for="l in section.list.slice(0, 3)" 
              :key="l.id" 
              :to="'/lead-details?id=' + l.id" 
              class="is-item"
            >
              <div class="is-client">{{ l.clientName }}</div>
              <div class="is-detail">{{ l.product || '—' }} · {{ l.regarding || l.businessCategory || '—' }}</div>
              <div class="is-date">{{ l.meetingDate || '—' }} {{ l.meetingTime || '' }} · {{ l.city || '' }}</div>
            </router-link>
          </template>
          
          <router-link :to="'/insight-list?type=' + section.linkType" class="is-viewall">
            View all &rsaquo;
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Auth } from '../services/auth'
import { Data } from '../services/data'
import { UI } from '../services/ui'
import { today, isAfter } from '../utils/helpers'

export default {
  setup() {
    const router = useRouter()
    const greeting = ref('')
    const userName = ref('')
    const role = ref('')
    const totalLeads = ref(0)
    const wonLeads = ref(0)
    const hotLeads = ref(0)
    const todayCount = ref(0)

    const todayFU = ref([])
    const upFU = ref([])
    const todayMT = ref([])
    const upMT = ref([])

    onMounted(async () => {
      const user = Auth.me()
      if (!user) {
        router.push('/login')
        return
      }

      await Data.loadAll()
      const leads = Data.getLeadsForUser(user)
      const td = today()

      const hour = new Date().getHours()
      greeting.value = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
      userName.value = user.name.split(' ')[0]
      role.value = user.role

      totalLeads.value = leads.length
      wonLeads.value = leads.filter(l => l.status === 'Won' || l.status === 'Close (Won)').length
      hotLeads.value = leads.filter(l => l.leadCategory === 'Hot' || l.status === 'Hot').length

      todayFU.value = leads.filter(l => l.meetingType === 'Followup' && l.meetingDate === td)
      upFU.value = leads.filter(l => l.meetingType === 'Followup' && isAfter(l.meetingDate, td))
      todayMT.value = leads.filter(l => l.meetingType === 'Meeting' && l.meetingDate === td)
      upMT.value = leads.filter(l => l.meetingType === 'Meeting' && isAfter(l.meetingDate, td))
      todayCount.value = todayFU.value.length + todayMT.value.length

      const apiStats = await Data.getDashboardData(user)
      totalLeads.value = apiStats.totalLeads
      wonLeads.value = apiStats.wonLeads
      hotLeads.value = apiStats.hotLeads
      todayCount.value = apiStats.todayCount
      if (apiStats.activityOverview) {
        todayFU.value = apiStats.activityOverview.todayFollowup || todayFU.value
        upFU.value = apiStats.activityOverview.upcomingFollowup || upFU.value
        todayMT.value = apiStats.activityOverview.todayMeeting || todayMT.value
        upMT.value = apiStats.activityOverview.upcomingMeeting || upMT.value
      }

      UI.hideLoading()
    })

    const insightRows = computed(() => {
      return [
        [
          { title: 'Today<br>Followup', list: todayFU.value, linkType: 'followup-today' },
          { title: 'Upcoming<br>Followup', list: upFU.value, linkType: 'followup-upcoming', isUpcoming: true }
        ],
        [
          { title: 'Today<br>Meeting', list: todayMT.value, linkType: 'meeting-today' },
          { title: 'Upcoming<br>Meeting', list: upMT.value, linkType: 'meeting-upcoming', isUpcoming: true }
        ]
      ]
    })

    return {
      greeting,
      userName,
      role,
      totalLeads,
      wonLeads,
      hotLeads,
      todayCount,
      insightRows
    }
  }
}
</script>
<style>
.insight-2col {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    margin-bottom: 10px;
}
</style>