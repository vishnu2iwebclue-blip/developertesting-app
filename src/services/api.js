const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://callcrm.xtrazcon.com').replace(/\/+$/, '')
const SESSION_KEY = 'crm_session'

function getSessionToken() {
  try {
    const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY)
    if (!raw) return ''
    const parsed = JSON.parse(raw)
    return parsed?.token || ''
  } catch {
    return ''
  }
}

async function request(path, options = {}) {
  const token = getSessionToken()
  const headers = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {})
  }

  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  })

  const contentType = res.headers.get('content-type') || ''
  const payload = contentType.includes('application/json') ? await res.json() : await res.text()

  if (!res.ok) {
    const msg =
      payload?.message ||
      payload?.error ||
      (typeof payload === 'string' ? payload : '') ||
      `Request failed (${res.status})`
    throw new Error(msg)
  }

  return payload
}

export const Api = {
  baseUrl: BASE_URL,

  login(email, password) {
    return request('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    })
  },

  me() {
    return request('/api/auth/me')
  },

  logout() {
    return request('/api/auth/logout', { method: 'POST' })
  },

  getDashboard() {
    return request('/api/auth/common-lead-dashboard')
  },

  getLeads(perPage = 20, page = 1, filters = {}) {
    const q = new URLSearchParams({
      per_page: String(perPage),
      page: String(page)
    })
    const map = {
      from_date: filters.from_date,
      to_date: filters.to_date,
      last_from_updated_date: filters.last_from_updated_date,
      last_to_updated_date: filters.last_to_updated_date,
      interested_product_service: filters.interested_product_service,
      client_business_categories: filters.client_business_categories,
      group_id: filters.group_id,
      employee_id: filters.employee_id,
      rating: filters.rating,
      status_label: filters.status_label,
      call_status: filters.call_status,
      leadstatus: filters.leadstatus,
      activity_state: filters.activity_state,
      payment: filters.payment,
      search: filters.search
    }
    Object.entries(map).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v).trim() !== '') {
        q.set(k, String(v).trim())
      }
    })
    return request(`/api/auth/common-lead?${q.toString()}`)
  },

  getLeadCreateMeta(params = {}) {
    const q = new URLSearchParams(params)
    return request(`/api/auth/common-lead/create${q.toString() ? `?${q.toString()}` : ''}`)
  },

  createLead(body) {
    return request('/api/auth/common-lead/create', {
      method: 'POST',
      body
    })
  },

  getLeadEditData(id) {
    return request(`/api/auth/common-lead/${id}/edit`)
  },

  updateLead(id, body) {
    return request(`/api/auth/common-lead/${id}/edit`, {
      method: 'POST',
      body
    })
  },

  getLeadDetails(id) {
    return request(`/api/auth/common-lead/show/${id}`)
  },

  quickFollowupUpdate(id, body) {
    return request(`/api/auth/common-lead/show/${id}/quick-followup`, {
      method: 'POST',
      body
    })
  },

  getLeadHistory(id) {
    return request(`/api/auth/common-lead/show/${id}/history`)
  },

  getTemplates() {
    return request('/api/auth/common-lead/templates')
  },

  sendTemplate(leadId, template_id, channel = 'whatsapp') {
    return request(`/api/auth/common-lead/${leadId}/send-template`, {
      method: 'POST',
      body: { template_id, channel }
    })
  },

  getCalendar(params = {}) {
    const q = new URLSearchParams(params)
    return request(`/api/auth/calendar${q.toString() ? `?${q.toString()}` : ''}`)
  },

  getCalendarDay(date) {
    return request(`/api/auth/calendar/day?date=${encodeURIComponent(date)}`)
  },

  getReports(params = {}) {
    const q = new URLSearchParams(params)
    return request(`/api/auth/reports${q.toString() ? `?${q.toString()}` : ''}`)
  },

  getUsers(perPage = 20, page = 1, filters = {}) {
    const q = new URLSearchParams({
      per_page: String(perPage),
      page: String(page)
    })
    if (filters.search) q.set('search', String(filters.search))
    if (filters.role) q.set('role', String(filters.role))
    if (filters.group_id) q.set('group_id', String(filters.group_id))
    if (filters.status !== undefined && filters.status !== null && String(filters.status) !== '') {
      q.set('status', String(filters.status))
    }
    return request(`/api/auth/admin/users?${q.toString()}`)
  },

  getUser(id) {
    return request(`/api/auth/admin/users/${id}`)
  },

  createUser(body) {
    return request('/api/auth/admin/users', {
      method: 'POST',
      body
    })
  },

  updateUser(id, body) {
    return request(`/api/auth/admin/users/${id}/edit`, {
      method: 'POST',
      body
    })
  }
}
