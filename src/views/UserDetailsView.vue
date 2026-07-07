<template>
  <div class="page-content" v-if="targetUser">
    <div class="mob-card">
      <div id="udet-header">
        <div style="font-size:18px;font-weight:800;margin-bottom:2px">{{ targetUser.name }}</div>
        <div style="font-size:13px;opacity:.8">{{ targetUser.role }}</div>
      </div>
    </div>

    <div class="mob-card">
      <div class="mob-card-title">Performance</div>
      <!-- <div id="udet-stats">
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
      </div> -->
    </div>
    <div class="mob-card">
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

    <div class="mob-card">
      <div class="mob-card-title">Details</div>
      <div id="udet-info">
        <div class="info-row" v-for="[key, val] in detailsList" :key="key">
          <div class="ir-key">{{ key }}</div>
          <div class="ir-val" v-html="val"></div>
        </div>
      </div>
    </div>

    <div v-if="canEdit" id="udet-actions" class="mob-card">
      <router-link :to="'/user-edit?id=' + targetUser.id" class="btn-primary-crm w-full" style="margin-bottom:8px; display: block; text-align: center; line-height: 2.2;"><i class="fas fa-edit me-1"></i>Edit User</router-link>
      <!-- <button v-if="canDelete" class="btn-danger-crm w-full" @click="handleDelete"><i class="fas fa-trash me-1"></i>Delete User</button> -->
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Auth } from '../services/auth'
import { Data } from '../services/data'
import { UI } from '../services/ui'
import { fmtDate } from '../utils/helpers'
import RoleBadge from '../components/RoleBadge.vue'

export default {
  components: { RoleBadge },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const targetUser = ref(null)
    const currentUser = ref(null)
      const totalLeads = ref(0)
      const wonLeads = ref(0)
      const hotLeads = ref(0)
      const todayCount = ref(0)

    onMounted(async () => {
      const user = Auth.me()
      if (!user) {
        router.push('/login')
        return
      }
      currentUser.value = user
      await Data.loadAll()

      const id = route.query.id
      if (!id) {
        router.push('/users')
        return
      }

      const u = await Data.fetchUserById(id)
     
      if (!u) {
        UI.toast('User not found', 'error')
        router.push('/users')
        return
      }

      targetUser.value = u

      const leads = Data.getAll('leads').filter(l => l.assignedTo === id)
      //  alert( u.totalLeads)
      totalLeads.value = u.totalLeads
      hotLeads.value = u.totalHotLeads
      // alert(u.totalWarmLeads)
      wonLeads.value = u.totalWarmLeads
    
      todayCount.value = u.todayCount
      // totalLeads.value = leads.length
      // wonLeads.value = leads.filter(l => l.status === 'Won' || l.status === 'Close (Won)').length

      UI.hideLoading()
    })

    const canEdit = computed(() => {
      return currentUser.value && Auth.can('edit_user', currentUser.value.role)
    })

    const canDelete = computed(() => {
      if (!currentUser.value || !targetUser.value) return false
      return Auth.can('delete_user', currentUser.value.role) && targetUser.value.id !== currentUser.value.userId
    })

    const detailsList = computed(() => {
      if (!targetUser.value) return []
      const u = targetUser.value
      return [
        ['Employee ID', u.empId],
        ['Email', u.email],
        ['Mobile', u.mobile],
        ['Role', u.role],
        ['Group', Data.getGroupName(u.group_name)],
        // ['Group', Data.getGroupName(u.groupId)],
        // ['Team', Data.getTeamName(u.teamId)],
        ['Status', `<span class="${u.status === 'Active' ? 'badge-active' : 'badge-inactive'}">${u.status}</span>`],
        ['Joining Date', fmtDate(u.joiningDate)]
      ]
    })

    const handleDelete = () => {
      if (!targetUser.value) return
      UI.confirm('Delete User', 'Remove this user permanently?', () => {
        Data.remove('users', targetUser.value.id)
        UI.toast('User deleted', 'success')
        setTimeout(() => router.push('/users'), 800)
      })
    }

    return {
      targetUser,
      totalLeads,
      wonLeads,
      hotLeads,
      todayCount,
      canEdit,
      canDelete,
      detailsList,
      handleDelete
    }
  }
}
</script>
