<template>
  <div class="phone-wrap">
    <div class="phone-frame">
      <div class="phone-island"></div>
      
      <!-- Status Bar in Proper Vue -->
      <div class="phone-status">
        <span>9:41</span>
        <div class="pstat-r">
          <i class="fas fa-signal" style="font-size:11px;color:var(--txt)"></i>
          <i class="fas fa-wifi" style="font-size:11px;color:var(--txt)"></i>
          <i class="fas fa-battery-three-quarters" style="font-size:11px;color:var(--txt)"></i>
        </div>
      </div>
      
      <router-view v-if="$route.path === '/login'" :key="$route.path" />
      <template v-else>
        <!-- Header in Proper Vue -->
        <div v-if="currentUser" class="mob-header">
          <router-link v-if="showBack" :to="backHref" class="hback">
            <i class="fas fa-arrow-left" style="font-size:16px"></i>
          </router-link>
          <span class="htitle">{{ pageTitle }} </span>
          <div class="haction">
            <button
              v-if="!showBack"
              type="button"
              class="av av-btn"
              :title="currentUser.name"
              @click="openProfilePopup"
            >
              {{ userInitials }}
            </button>
            <button class="hbtn" @click="logout" title="Logout">
              <i class="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>

        <div id="main-content">
          <router-view :key="$route.path" />
        </div>

        <!-- Bottom Nav in Proper Vue -->
        <div v-if="currentUser" class="bnav">
          <router-link
            v-for="tab in visibleTabs"
            :key="tab.id"
            :to="'/' + tab.id"
            class="btab"
            :class="{ active: activeTab === tab.id || activeTab.startsWith(tab.id) }"
          >
            <div class="btab-icon"><i class="fas" :class="tab.icon"></i></div>
            <span class="btab-lbl">{{ tab.label }}</span>
          </router-link>
        </div>

        <div v-if="showProfilePopup" class="profile-popup-backdrop" @click.self="closeProfilePopup">
          <div class="profile-popup">
            <div class="profile-popup-header">
              <div class="profile-popup-title">My Profile</div>
              <button type="button" class="profile-close-btn" @click="closeProfilePopup">&times;</button>
            </div>
            <div class="profile-popup-body">
              <div v-if="profileLoading" class="profile-loading">Loading profile...</div>
              <template v-else>
                <div class="profile-row">
                  <span class="profile-key">Name</span>
                  <span class="profile-val">{{ profileData.name || '—' }}</span>
                </div>
                <div class="profile-row">
                  <span class="profile-key">Email</span>
                  <span class="profile-val">{{ profileData.email || '—' }}</span>
                </div>
                <div class="profile-row">
                  <span class="profile-key">Phone</span>
                  <span class="profile-val">{{ profileData.phone || '—' }}</span>
                </div>
                <div class="profile-row">
                  <span class="profile-key">Role</span>
                  <span class="profile-val">{{ profileData.role || '—' }}</span>
                </div>
                <div class="profile-row">
                  <span class="profile-key">Status</span>
                  <span class="profile-val">{{ profileData.status || '—' }}</span>
                </div>
                <button type="button" class="btn-primary-crm w-full" @click="logoutFromPopup">
                  <i class="fas fa-sign-out-alt me-1"></i> Logout
                </button>
              </template>
            </div>
          </div>
        </div>
      </template>
      
      <div id="loading-overlay">
        <div class="spinner-ring"></div>
        <p>Loading...</p>
      </div>
      <div id="toast-container"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Auth } from './services/auth'
import { Api } from './services/api'
import { Data } from './services/data'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const currentUser = ref(null)
    const showProfilePopup = ref(false)
    const profileLoading = ref(false)
    const profileData = ref({
      name: '',
      email: '',
      phone: '',
      role: '',
      status: ''
    })

    const updateCurrentUser = () => {
      currentUser.value = Auth.me()
    }

    onMounted(async () => {
      updateCurrentUser()
      if (Auth.me()) {
        await Data.loadAll()
      }
    })

    watch(() => route.path, () => {
      updateCurrentUser()
    })

    const pageMap = {
      '/login': 'login',
      '/dashboard': 'dashboard',
      '/insight-list': 'dashboard',
      '/leads': 'leads',
      '/lead-details': 'lead-details',
      '/lead-add': 'lead-add',
      '/lead-edit': 'lead-edit',
      '/lead-assign': 'lead-assign',
      '/lead-comm': 'lead-comm',
      '/calendar': 'calendar',
      '/reports': 'reports',
      '/users': 'users',
      '/user-details': 'user-details',
      '/user-add': 'user-add',
      '/user-edit': 'user-edit'
    }

    const activeTab = computed(() => {
      return pageMap[route.path] || 'dashboard'
    })

    const pageTitle = computed(() => {
      const titles = {
        dashboard: 'Insights',
        leads: 'Leads',
        calendar: 'Calendar',
        reports: 'Reports',
        users: 'Users',
        'lead-details': 'Lead Details',
        'lead-add': 'Add Lead',
        'lead-edit': 'Edit Lead',
        'lead-assign': 'Assign Lead',
        'lead-comm': 'Log Communication',
        'user-add': 'Add User',
        'user-edit': 'Edit User',
        'user-details': 'User Details'
      }
      return titles[activeTab.value] || 'CRM Pro'
    })

    const showBack = computed(() => {
      return [
        'leads',
        'calendar',
        'lead-details',
        'reports',
        'lead-add',
        'lead-edit',
        'lead-assign',
        'lead-comm',
        'users',
        'user-add',
        'user-edit',
        'user-details'
      ].includes(activeTab.value)
    })

    // const backHref = computed(() => {
    //   alert('activeTab.value: ' + activeTab.value)
      
    //   if (activeTab.value.startsWith('lead')) {
    //     // return '/leads'
    //     return '/dashboard'
    //   } else if (activeTab.value.startsWith('user')) {
    //     return '/users'
    //   }
    //   return '/dashboard'
    // })
     const backHref = computed(() => {
      if (activeTab.value.startsWith('lead-add')) {
        return '/leads'
      } 
      if (activeTab.value.startsWith('lead-details')) {
        return '/leads'
      } 
      if (activeTab.value.startsWith('lead-edit')) {
        return '/leads'
     } 
      // if (activeTab.value.startsWith('reports')) {
      //   return '/leads'
      //   // return '/dashboard'
      // } 
      // if (activeTab.value.startsWith('lead')) {
      //   // return '/leads'
      //   return '/dashboard'
      // }
      // if (activeTab.value.startsWith('user')) {
      //   return '/dashboard'
      
      // }
     if (activeTab.value.startsWith('user-add')) {
        return '/users'
      }
     if (activeTab.value.startsWith('user-details')) {
        return '/users'
      }

      return '/dashboard'
    })

    const userInitials = computed(() => {
      if (!currentUser.value) return ''
      return (currentUser.value.name || '')
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    })

    const TABS = [
      { id: 'dashboard', icon: 'fa-chart-pie', label: 'Insights' },
      { id: 'leads', icon: 'fa-users', label: 'Leads' },
      { id: 'calendar', icon: 'fa-calendar-alt', label: 'Calendar' },
      { id: 'reports', icon: 'fa-chart-bar', label: 'Reports' },
      { id: 'users', icon: 'fa-user-cog', label: 'Users' }
    ]

    const visibleTabs = computed(() => {
      if (!currentUser.value) return []
      return TABS.filter(t => {
        if (t.id === 'reports') return Auth.can('view_reports', currentUser.value.role)
        if (t.id === 'users') return ['Admin', 'Manager', 'Team Leader'].includes(currentUser.value.role)
        return true
      })
    })

    const logout = async () => {
      await Auth.logout()
      currentUser.value = null
      router.push('/login')
    }

    const toTitleRole = (role = '') => {
      const key = String(role || '').trim().toLowerCase()
      if (key === 'admin') return 'Admin'
      if (key === 'manager') return 'Manager'
      if (key === 'employee') return 'Employee'
      if (key === 'team_leader' || key === 'team leader') return 'Team Leader'
      if (key === 'team_coordinator' || key === 'team coordinator' || key === 'coordinator') return 'Team Coordinator'
      return role || ''
    }

    const openProfilePopup = async () => {
      showProfilePopup.value = true
      profileLoading.value = true
      try {
        const payload = await Api.me()
        const user = payload?.data || payload || {}
        const statusRaw = String(user?.status ?? '').toLowerCase()
        profileData.value = {
          name: user?.name || currentUser.value?.name || '',
          email: user?.email || currentUser.value?.email || '',
          phone: user?.phone || '',
          role: toTitleRole(user?.role || currentUser.value?.role || ''),
          status: ['false', '0', 'inactive'].includes(statusRaw) ? 'Inactive' : 'Active'
        }
      } catch {
        profileData.value = {
          name: currentUser.value?.name || '',
          email: currentUser.value?.email || '',
          phone: '',
          role: currentUser.value?.role || '',
          status: 'Active'
        }
      } finally {
        profileLoading.value = false
      }
    }

    const closeProfilePopup = () => {
      showProfilePopup.value = false
    }

    const logoutFromPopup = async () => {
      closeProfilePopup()
      await logout()
    }

    return {
      currentUser,
      activeTab,
      pageTitle,
      showBack,
      backHref,
      userInitials,
      visibleTabs,
      logout,
      showProfilePopup,
      profileLoading,
      profileData,
      openProfilePopup,
      closeProfilePopup,
      logoutFromPopup
    }
  }
}
</script>

<style>
@import '/css/style.css';

.av-btn {
  border: 0;
  cursor: pointer;
}

.profile-popup-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 2200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.profile-popup {
  width: 100%;
  max-width: 340px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.profile-popup-header {
  padding: 12px 14px;
  background: var(--primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile-popup-title {
  font-size: 17px;
  font-weight: 700;
}

.profile-close-btn {
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

.profile-popup-body {
  padding: 14px;
}

.profile-loading {
  font-size: 12px;
  color: var(--muted);
}

.profile-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid var(--bg);
  padding: 8px 0;
  font-size: 12px;
}

.profile-key {
  color: var(--muted);
  font-weight: 700;
}

.profile-val {
  color: var(--txt);
  font-weight: 700;
  text-align: right;
  max-width: 62%;
}
</style>

