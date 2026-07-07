import { Api } from './api'

function toTitleRole(role = '') {
  const key = String(role || '').trim().toLowerCase()
  if (!key) return 'Employee'
  if (key === 'admin') return 'Admin'
  if (key === 'manager') return 'Manager'
  if (key === 'team_leader' || key === 'team leader') return 'Team Leader'
  if (key === 'team_coordinator' || key === 'team coordinator' || key === 'coordinator') return 'Team Coordinator'
  if (key === 'employee') return 'Employee'
  return role
}

function pickAuthUser(payload) {
  return payload?.user || payload?.data?.user || payload?.data || payload
}

function pickToken(payload) {
  return (
    payload?.token ||
    payload?.access_token ||
    payload?.data?.token ||
    payload?.data?.access_token ||
    ''
  )
}

export const Auth = {
  KEY: 'crm_session',
  _readRaw() {
    return localStorage.getItem(this.KEY) || sessionStorage.getItem(this.KEY) || ''
  },
  
  async login(email, password) {
    try {
      const payload = await Api.login(email, password)
      const apiUser = pickAuthUser(payload)
      const token = pickToken(payload)

      if (!apiUser || !token) {
        return { ok: false, msg: 'Login response invalid. Please try again.' }
      }

      const statusRaw = String(apiUser.status ?? '').toLowerCase()
      if (statusRaw && ['inactive', 'false', '0'].includes(statusRaw)) {
        return { ok: false, msg: 'Account deactivated. Contact admin.' }
      }

      const s = {
        userId: String(apiUser.id ?? apiUser.user_id ?? ''),
        role: toTitleRole(apiUser.role || apiUser.user_role || 'Employee'),
        name: apiUser.name || apiUser.full_name || 'User',
        email: apiUser.email || email,
        groupId: apiUser.group_id ? String(apiUser.group_id) : null,
        teamId: apiUser.team_id ? String(apiUser.team_id) : null,
        token
      }

      localStorage.setItem(this.KEY, JSON.stringify(s))
      sessionStorage.removeItem(this.KEY)
      return { ok: true, user: s }
    } catch (err) {
      return { ok: false, msg: err.message || 'Unable to login.' }
    }
  },
  
  async logout() {
    try {
      await Api.logout()
    } catch {
      // Ignore logout API failures and still clear local session.
    }
    localStorage.removeItem(this.KEY)
    sessionStorage.removeItem(this.KEY)
  },
  
  me() {
    const s = this._readRaw()
    if (!s) return null
    try {
      const parsed = JSON.parse(s)
      if (parsed?.token) {
        localStorage.setItem(this.KEY, s)
      }
      return parsed
    } catch {
      return null
    }
  },
  
  can(action, role) {
    const normalizedRole = toTitleRole(role)
    const p = {
      delete_lead: ['Admin', 'Manager'],
      assign_lead: ['Admin', 'Manager', 'Team Leader', 'Team Coordinator'],
      create_user: ['Admin'],
      delete_user: ['Admin'],
      edit_user: ['Admin'],
      view_reports: ['Admin', 'Manager', 'Team Leader'],
      manage_users: ['Admin']
    }
    return (p[action] || []).includes(normalizedRole || '')
  }
}
