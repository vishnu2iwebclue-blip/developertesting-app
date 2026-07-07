<template>
  <div class="page-content">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px">
      <div style="font-size: 12px; font-weight: 700; color: var(--muted)">Users</div>
      <router-link v-if="canManage" id="add-user-btn" to="/user-add" class="btn-primary-crm btn-sm" style="display: flex">
        <i class="fas fa-plus me-1"></i> Add User
      </router-link>
    </div>

    <div class="search-wrap">
      <i class="fas fa-search"></i>
      <input v-model="search" id="user-search" type="text" class="form-control" placeholder="Search users..." />
    </div>

    <div class="form-group users-group-filter">
      <label class="form-label">Group</label>
      <select v-model="groupFilter" class="form-select">
        <option value="">All Groups</option>
        <option v-for="g in groupOptions" :key="g.id" :value="g.id">{{ g.name }}</option>
      </select>
    </div>

    <div class="chip-scroll">
      <div 
        class="chip role-chip" 
        :class="{ active: filter === '' }" 
        @click="selectRole('')"
      >
        All
      </div>
      <div 
        v-for="r in ['Admin', 'Manager', 'Employee']" 
        :key="r"
        class="chip role-chip" 
        :class="{ active: filter === r }"
        @click="selectRole(r)"
      >
        {{ r === 'Team Coordinator' ? 'Coordinator' : r }}
      </div>
    </div>

    <div id="users-list">
      <div v-if="!filteredUsers.length" class="empty-state">
        <i class="fas fa-users"></i>
        <p>No users found</p>
      </div>
      <router-link 
        v-else
        v-for="u in filteredUsers" 
        :key="u.id" 
        :to="'/user-details?id=' + u.id" 
        class="user-item"
      >
        <div class="ui-av">{{ getInitials(u.name) }}</div>
        <div class="ui-info">
          <div class="ui-name">{{ u.name }} </div>
          <div class="ui-role">{{ u.email }}</div>
          <div class="ui-role">{{ u.mobile }}</div>
          <div class="badge-role-name">{{ u.groupName || 'No Group' }}</div>
        </div>
        <div class="ui-right">
          <span class="badge-role-name">{{ u.roleName || u.role }}</span>
          <span :class="u.status === 'Active' ? 'badge-active' : 'badge-inactive'">{{ u.status }}</span>
        </div>
      </router-link>
    </div>

    <div v-if="pagination.lastPage > 1" class="users-pagination">
      <button
        type="button"
        class="btn-outline-crm btn-sm"
        :disabled="loadingPage || pagination.currentPage <= 1"
        @click="changePage(pagination.currentPage - 1)"
      >
        Prev
      </button>
      <div class="users-pagination-info">
        Page {{ pagination.currentPage }} of {{ pagination.lastPage }} ({{ pagination.total }} users)
      </div>
      <button
        type="button"
        class="btn-outline-crm btn-sm"
        :disabled="loadingPage || pagination.currentPage >= pagination.lastPage"
        @click="changePage(pagination.currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Auth } from '../services/auth'
import { Api } from '../services/api'
import { Data } from '../services/data'
import { UI } from '../services/ui'
import { initials } from '../utils/helpers'
import RoleBadge from '../components/RoleBadge.vue'

export default {
  components: { RoleBadge },
  setup() {
    const router = useRouter()
    const filter = ref('')
    const search = ref('')
    const groupFilter = ref('')
    const currentUser = ref(null)
    const users = ref([])
    const groups = ref([])
    const loadingPage = ref(false)
    const perPage = 20
    const pagination = ref({
      currentPage: 1,
      lastPage: 1,
      perPage,
      total: 0
    })

    const loadUsersPage = async (page = 1) => {
      loadingPage.value = true
      try {
        const result = await Data.fetchUsersPage({
          page,
          perPage,
          filters: {
            search: search.value,
            role: filter.value,
            groupId: groupFilter.value
          }
        })
        users.value = Array.isArray(result?.items) ? result.items : []
        pagination.value = result?.pagination || {
          currentPage: 1,
          lastPage: 1,
          perPage,
          total: users.value.length
        }
      } finally {
        loadingPage.value = false
      }
    }

    onMounted(async () => {
      const user = Auth.me()
      if (!user) {
        router.push('/login')
        return
      }
      await Data.loadAll()
      currentUser.value = user
      try {
        const meta = await Api.getLeadCreateMeta()
        const apiGroups = Array.isArray(meta?.data?.groups)
          ? meta.data.groups.map((g) => ({
              id: String(g.id),
              name: g.group_name || g.name || `Group ${g.id}`
            }))
          : []
        groups.value = apiGroups.length ? apiGroups : Data.getAll('groups')
      } catch {
        groups.value = Data.getAll('groups')
      }
      await loadUsersPage(1)
      UI.hideLoading()
    })

    const canManage = computed(() => {
      return currentUser.value && Auth.can('manage_users', currentUser.value.role)
    })

    const selectRole = (role) => {
      filter.value = role
      loadUsersPage(1)
    }

    const groupOptions = computed(() => groups.value)

    const filteredUsers = computed(() => {
      if (!currentUser.value) return []
      let list = [...users.value]

      if (currentUser.value.role === 'Manager') {
        list = list.filter(u => u.groupId === currentUser.value.groupId)
      }

      return list
    })

    let searchTimer = null
    watch(search, () => {
      if (searchTimer) clearTimeout(searchTimer)
      searchTimer = setTimeout(() => {
        loadUsersPage(1)
      }, 300)
    })

    watch(groupFilter, () => {
      loadUsersPage(1)
    })

    const changePage = async (page) => {
      const next = Number(page || 1)
      if (loadingPage.value) return
      if (next < 1 || next > pagination.value.lastPage) return
      await loadUsersPage(next)
    }

    const getInitials = (name) => initials(name)

    return {
      filter,
      search,
      groupFilter,
      canManage,
      selectRole,
      filteredUsers,
      groupOptions,
      getInitials,
      pagination,
      loadingPage,
      changePage
    }
  }
}
</script>

<style scoped>
.users-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 12px;
}

.users-pagination-info {
  font-size: 12px;
  color: var(--muted);
  font-weight: 700;
  text-align: center;
  flex: 1;
}

.badge-role-name {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 9px;
  border-radius: 999px;
  background: #edf2ff;
  color: #2f65d5;
  font-size: 10px;
  font-weight: 700;
  margin-bottom: 4px;
}

.users-group-filter {
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
