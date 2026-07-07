<template>
  <div class="page-content" v-if="lead">
    <div class="mob-card lead-summary-card">
      <div class="summary-title">{{ lead.clientName }}</div>
      <div class="summary-sub">{{ lead.clientCompany || '—' }} | {{ lead.dataListId ? 'Data ' + lead.dataListId : 'No Data List' }}</div>
      <div class="summary-chip-row">
        <span v-for="chip in summaryChips" :key="chip.label" class="summary-chip" :style="{ background: chip.bg, color: chip.color }">
          {{ chip.label }}
        </span>
      </div>
    </div>

    <div class="mob-card detail-tabs-card">
      <button
        v-for="tab in detailTabs"
        :key="tab.key"
        type="button"
        class="detail-tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <template v-if="activeTab === 'details'">
      <div class="info-grid">
        <div class="mob-card">
          <div class="mob-card-title">Client Information</div>
          <div class="detail-list">
            <div v-for="[key, val] in clientInfoList" :key="key" class="detail-row">
              <span class="detail-key">{{ key }}</span>
              <span class="detail-val">{{ val || '—' }}</span>
            </div>
          </div>
        </div>

        <div class="mob-card">
          <div class="mob-card-title">Lead Status & Product</div>
          <div class="detail-list">
            <div v-for="[key, val] in leadInfoList" :key="key" class="detail-row">
              <span class="detail-key">{{ key }}</span>
              <span class="detail-val">{{ val || '—' }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mob-card">
        <div class="mob-card-title">Quick Actions</div>
        <div class="qa-grid">
          <router-link :to="'/lead-comm?id=' + lead.id" class="qa-btn meeting"><i class="fas fa-video"></i>Meeting</router-link>
          <button type="button" class="qa-btn email" @click="openTemplatePopup('email')"><i class="fas fa-envelope"></i>Email</button>
          <button type="button" class="qa-btn whatsapp" @click="openTemplatePopup('whatsapp')"><i class="fab fa-whatsapp"></i>WhatsApp</button>
          <a :href="'tel:' + lead.clientMobile" class="qa-btn call"><i class="fas fa-phone"></i>Call</a>
        </div>
        <div class="qa-secondary">
          <button type="button" class="btn-outline-crm btn-sm quick-followup-btn" @click="openQuickFollowupPopup">
            <i class="fas fa-history me-1"></i>Quick Followup Update
          </button>
          <router-link :to="'/lead-edit?id=' + lead.id" class="btn-outline-crm btn-sm"><i class="fas fa-edit me-1"></i>Edit</router-link>
          <!-- <router-link v-if="canAssign" :to="'/lead-assign?id=' + lead.id" class="btn-outline-crm btn-sm"><i class="fas fa-user-check me-1"></i>Assign</router-link> -->
          <!-- <button v-if="canDelete" class="btn-danger-crm btn-sm" @click="handleDelete"><i class="fas fa-trash me-1"></i>Delete</button> -->
        </div>
      </div>
      <!-- <div class="mob-card">
       
        
        <div class="qa-secondary">
          <button type="button" class="btn-outline-crm btn-sm quick-followup-btn" @click="openQuickFollowupPopup">
            <i class="fas fa-history me-1"></i>Quick Followup Update
          </button>
          <router-link :to="'/lead-edit?id=' + lead.id" class="btn-outline-crm btn-sm"><i class="fas fa-edit me-1"></i>Edit</router-link>
        </div>
      </div> -->

      <div class="mob-card history-card">
        <div class="mob-card-title"><i class="far fa-clock me-1"></i>Comment History:</div>
        <div v-if="historyLoading" class="empty-history">Loading history...</div>
        <div v-else-if="!allHistoryItems.length" class="empty-history">No communications logged yet.</div>
        <div v-else class="history-list">
          <div v-for="(item, idx) in allHistoryItems" :key="`${item.at}-details-${idx}`" class="history-item">
            <div class="history-message">{{ item.message || '—' }}</div>
            <div class="history-meta">
              <span><i class="far fa-user me-1"></i>{{ item.by || 'System' }}</span>
              <span><i class="far fa-clock me-1"></i>{{ item.at || '—' }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-else-if="activeTab === 'history'" class="mob-card history-card">
      <div class="mob-card-title"><i class="far fa-clock me-1"></i>Comment History:</div>
      <div v-if="historyLoading" class="empty-history">Loading history...</div>
      <div v-else-if="!tabHistoryItems.length" class="empty-history">No communications logged yet.</div>
      <div v-else class="history-list">
        <div v-for="(item, idx) in tabHistoryItems" :key="`${item.at}-${idx}`" class="history-item">
          <div class="history-message">{{ item.message || '—' }}</div>
          <div class="history-meta">
            <span><i class="far fa-user me-1"></i>{{ item.by || 'System' }}</span>
            <span><i class="far fa-clock me-1"></i>{{ item.at || '—' }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="activeTab === 'meetings'" class="mob-card history-card">
      <div class="mob-card-title"><i class="fas fa-video me-1"></i>Meetings</div>
      <div class="empty-history">Meeting tab static hai. Meeting logs baad me add honge.</div>
    </div>

    <div v-else-if="activeTab === 'whatsapp'" class="mob-card history-card">
      <div class="mob-card-title">WhatsApp</div>
      <button type="button" class="btn-whatsapp-send" @click="openTemplatePopup('whatsapp')">
        <i class="fab fa-whatsapp me-1"></i>Send WhatsApp to Lead
      </button>
      <div v-if="historyLoading" class="empty-history">Loading WhatsApp logs...</div>
      <div v-else-if="!tabHistoryItems.length" class="empty-history">No WhatsApp logs yet.</div>
      <div v-else class="history-list">
        <div v-for="(item, idx) in tabHistoryItems" :key="`${item.at}-wa-${idx}`" class="history-item whatsapp-log">
          <div class="history-message">{{ item.message || '—' }}</div>
          <div class="history-meta">
            <span><i class="far fa-user me-1"></i>{{ item.by || 'System' }}</span>
            <span><i class="far fa-clock me-1"></i>{{ item.at || '—' }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="activeTab === 'emails'" class="mob-card history-card">
      <div class="mob-card-title">Emails</div>
      <button type="button" class="btn-email-send" @click="openTemplatePopup('email')">
        <i class="fas fa-envelope me-1"></i>Send Email to Lead
      </button>
      <div v-if="historyLoading" class="empty-history">Loading Email logs...</div>
      <div v-else-if="!tabHistoryItems.length" class="empty-history">No Email logs yet.</div>
      <div v-else class="history-list">
        <div v-for="(item, idx) in tabHistoryItems" :key="`${item.at}-em-${idx}`" class="history-item email-log">
          <div class="history-message">{{ item.message || '—' }}</div>
          <div class="history-meta">
            <span><i class="far fa-user me-1"></i>{{ item.by || 'System' }}</span>
            <span><i class="far fa-clock me-1"></i>{{ item.at || '—' }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showTemplatePopup" class="template-modal-backdrop" @click.self="closeTemplatePopup">
      <div class="template-modal">
        <div class="template-modal-header">
          <div class="template-modal-title">Send {{ templateChannel === 'whatsapp' ? 'WhatsApp' : 'Email' }} Template</div>
          <button type="button" class="template-close-btn" @click="closeTemplatePopup">&times;</button>
        </div>
        <div class="template-modal-body">
          <div class="form-group">
            <label class="form-label">Select Template <span class="required-mark">*</span></label>
            <select v-model.number="selectedTemplateId" class="form-select">
              <option :value="null">Choose Template</option>
              <option v-for="t in templates" :key="t.id" :value="t.id">{{ t.template_name }}</option>
            </select>
          </div>
          <div v-if="selectedTemplatePreview" class="template-preview">
            <div class="template-preview-title">{{ selectedTemplatePreview.template_name }}</div>
            <div class="template-preview-content" v-html="selectedTemplatePreview.content"></div>
          </div>
          <button type="button" class="btn-primary-crm w-full" :disabled="sendingTemplate" @click="sendTemplate">
            <i class="fas fa-paper-plane me-1"></i>
            {{ sendingTemplate ? 'Sending...' : 'Send Template' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="showQuickFollowupPopup" class="template-modal-backdrop" @click.self="closeQuickFollowupPopup">
      <div class="template-modal quick-followup-modal">
        <div class="template-modal-header quick-followup-header">
          <div class="template-modal-title"><i class="fas fa-history me-1"></i>Quick Followup Update</div>
          <button type="button" class="template-close-btn" @click="closeQuickFollowupPopup">&times;</button>
        </div>
        <div class="template-modal-body quick-followup-body">
          <div class="quick-followup-grid">
            <div class="form-group">
              <label class="form-label">Lead Health</label>
              <select v-model="followupForm.leadHealth" class="form-select">
                <option value="">Select</option>
                <option v-for="option in leadHealthOptions" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Sales Stage</label>
              <select v-model="followupForm.salesStage" class="form-select">
                <option value="">Select</option>
                <option v-for="option in salesStageOptions" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Rating</label>
              <select v-model="followupForm.rating" class="form-select">
                <option value="">Select</option>
                <option v-for="option in ratingOptions" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Activity State</label>
              <select v-model="followupForm.activityState" class="form-select">
                <option value="">Select</option>
                <option v-for="option in activityStateOptions" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>
            <div class="form-group quick-followup-full">
              <label class="form-label">Payment Status</label>
              <select v-model="followupForm.paymentStatus" class="form-select">
                <option value="">Select</option>
                <option v-for="option in paymentStatusOptions" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Next Followup Date</label>
              <input v-model="followupForm.nextFollowupDate" type="date" class="form-control">
            </div>
            <div class="form-group">
              <label class="form-label">Next Followup Time</label>
              <input v-model="followupForm.nextFollowupTime" type="time" class="form-control">
            </div>
            <div class="form-group quick-followup-full">
              <label class="form-label">Comment</label>
              <textarea v-model="followupForm.comment" class="form-control" rows="3" placeholder="Add update note..."></textarea>
            </div>
          </div>
          <button type="button" class="btn-primary-crm w-full" :disabled="updatingFollowup" @click="updateQuickFollowup">
            <i class="fas fa-pen-square me-1"></i>{{ updatingFollowup ? 'Updating...' : 'Update' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Auth } from '../services/auth'
import { Api } from '../services/api'
import { Data } from '../services/data'
import { UI } from '../services/ui'
import { fmtDate } from '../utils/helpers'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const lead = ref(null)
    const currentUser = ref(null)
    const showTemplatePopup = ref(false)
    const templates = ref([])
    const selectedTemplateId = ref(null)
    const templateChannel = ref('whatsapp')
    const sendingTemplate = ref(false)
    const showQuickFollowupPopup = ref(false)
    const updatingFollowup = ref(false)
    const activeTab = ref('details')
    const detailTabs = [
      { key: 'details', label: 'Details' },
      { key: 'history', label: 'History' },
      { key: 'meetings', label: 'Meetings' },
      { key: 'emails', label: 'Emails' },
      { key: 'whatsapp', label: 'WhatsApp' }
    ]
    const historyData = ref({
      items: [],
      groups: {
        status: [],
        meeting: [],
        email: [],
        whatsapp: []
      }
    })
    const historyLoading = ref(false)
    const followupForm = reactive({
      leadHealth: '',
      salesStage: '',
      rating: '',
      activityState: '',
      paymentStatus: '',
      nextFollowupDate: '',
      nextFollowupTime: '',
      comment: ''
    })
    const leadHealthOptions = ['hot', 'warm', 'solo', 'sleeping', 'dead', 'junk']
    const salesStageOptions = ['new-lead', 'contacted', 'demo-scheduled', 'demo-completed', 'proposal-sent', 'negotiation', 'won', 'lost']
    const ratingOptions = ['na', '10', '20', '30', '40', '50', '60', '70', '80', '90']
    const activityStateOptions = ['idle', 'working', 'follow-up-due', 're-opened', 'closed']
    const paymentStatusOptions = ['free', 'supported', 'pending', 'partially-paid', 'fully-paid']

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
        UI.toast('Lead not found', 'error')
        router.push('/leads')
        return
      }

      const l = await Data.fetchLeadById(id)
      if (!l) {
        UI.toast('Lead not found', 'error')
        router.push('/leads')
        return
      }

      lead.value = l
      await loadLeadHistory(id)
      UI.hideLoading()
    })

    const canAssign = computed(() => {
      return currentUser.value && Auth.can('assign_lead', currentUser.value.role)
    })

    const canDelete = computed(() => {
      return currentUser.value && Auth.can('delete_lead', currentUser.value.role)
    })

    const summaryChips = computed(() => {
      if (!lead.value) return []
      return [
        { label: lead.value.callStatus || 'No Status', bg: '#E9F2FF', color: '#1E62D0' },
        { label: lead.value.clientResponse || 'No Response', bg: '#FFF3D6', color: '#B77900' },
        { label: `Follow-up: ${lead.value.nextCallDate || 'N/A'}`, bg: '#E6F9EE', color: '#1B8F4D' },
        { label: `Payment: ${lead.value.paymentStatus || lead.value.payment || 'N/A'}`, bg: '#F0EAFF', color: '#6342C6' },
        { label: `Rating: ${lead.value.rating || 'N/A'}`, bg: '#FFE7F3', color: '#BD2F7A' }
      ]
    })

    const clientInfoList = computed(() => {
      if (!lead.value) return []
      return [
        ['Name', lead.value.clientName],
        ['Business', lead.value.clientCompany],
        ['Mobile', lead.value.clientMobile],
        ['Email', lead.value.clientEmail],
        ['State', lead.value.state],
        ['City', lead.value.city]
      ]
    })

    const leadInfoList = computed(() => {
      if (!lead.value) return []
      return [
        ['Lead Health (status_label)', lead.value.statusLabel],
        ['Sales Stage (leadstatus)', lead.value.leadStatus],
        ['Activity State', lead.value.activityState],
        ['Rating', lead.value.rating],
        ['Payment', lead.value.payment || lead.value.paymentStatus],
        ['Interested In', lead.value.product],
        ['Service Name', lead.value.clientBusinessServiceName || lead.value.meetingAgendaType],
        ['Business Categories', lead.value.businessCategory],
        ['Client Response', lead.value.clientResponse],
        ['Regarding', lead.value.regarding],
        ['Next Follow-up', `${lead.value.nextCallDate || '—'} ${lead.value.nextCallTime || ''}`.trim()],
        ['Call Status', lead.value.callStatus],
        ['Group', lead.value.yourGroup || Data.getGroupName(lead.value.groupId)],
        ['Updated', fmtDate(lead.value.updatedAt)]
      ]
    })
    
    const selectedTemplatePreview = computed(() => {
      if (!selectedTemplateId.value) return null
      return templates.value.find(t => Number(t.id) === Number(selectedTemplateId.value)) || null
    })

    const tabHistoryItems = computed(() => {
      const items = historyData.value?.items || []
      const groups = historyData.value?.groups || {}
      if (activeTab.value === 'history') return items
      if (activeTab.value === 'whatsapp') {
        return Array.isArray(groups.whatsapp) && groups.whatsapp.length
          ? groups.whatsapp
          : items.filter(x => x.type === 'whatsapp')
      }
      if (activeTab.value === 'emails') {
        return Array.isArray(groups.email) && groups.email.length
          ? groups.email
          : items.filter(x => x.type === 'email')
      }
      if (activeTab.value === 'meetings') {
        return Array.isArray(groups.meeting) && groups.meeting.length
          ? groups.meeting
          : items.filter(x => x.type === 'meeting')
      }
      return []
    })

    const allHistoryItems = computed(() => historyData.value?.items || [])

    const loadLeadHistory = async (leadId) => {
      historyLoading.value = true
      try {
        historyData.value = await Data.fetchLeadHistoryData(leadId)
      } catch {
        historyData.value = {
          items: [],
          groups: {
            status: [],
            meeting: [],
            email: [],
            whatsapp: []
          }
        }
      } finally {
        historyLoading.value = false
      }
    }

    const openTemplatePopup = async (channel) => {
      if (!lead.value?.id) return
      if (!/^\d+$/.test(String(lead.value.id))) {
        UI.toast('Template send only available for server leads', 'error')
        return
      }
      templateChannel.value = channel
      selectedTemplateId.value = null
      showTemplatePopup.value = true

      try {
        const payload = await Api.getTemplates()
        templates.value = Array.isArray(payload?.data) ? payload.data : []
      } catch (err) {
        templates.value = []
        UI.toast(err.message || 'Unable to load templates', 'error')
      }
    }

    const closeTemplatePopup = () => {
      showTemplatePopup.value = false
      selectedTemplateId.value = null
      templateChannel.value = 'whatsapp'
    }

    const sendTemplate = async () => {
      if (!lead.value?.id || !selectedTemplateId.value) {
        UI.toast('Please select a template', 'error')
        return
      }
      sendingTemplate.value = true
      try {
        const response = await Api.sendTemplate(lead.value.id, selectedTemplateId.value, templateChannel.value)
        const redirectUrl = response?.data?.url || response?.url || ''
        UI.toast('Template sent successfully', 'success')
        await loadLeadHistory(lead.value.id)
        closeTemplatePopup()
        if (templateChannel.value === 'whatsapp' && redirectUrl) {
          window.location.href = redirectUrl
        }
      } catch (err) {
        UI.toast(err.message || 'Failed to send template', 'error')
      } finally {
        sendingTemplate.value = false
      }
    }

    const toDateInput = (value = '') => {
      const v = String(value || '').trim()
      if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v
      const m = v.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/)
      if (!m) return ''
      const [, d, mo, y] = m
      return `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    }

    const toTimeInput = (value = '') => {
      const v = String(value || '').trim()
      if (/^\d{2}:\d{2}$/.test(v)) return v
      const m = v.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
      if (!m) return ''
      let hh = Number(m[1])
      const mm = m[2]
      const suffix = m[3].toUpperCase()
      if (suffix === 'PM' && hh < 12) hh += 12
      if (suffix === 'AM' && hh === 12) hh = 0
      return `${String(hh).padStart(2, '0')}:${mm}`
    }

    const openQuickFollowupPopup = () => {
      if (!lead.value) return
      followupForm.leadHealth = lead.value.statusLabel || ''
      followupForm.salesStage = lead.value.leadStatus || ''
      followupForm.rating = String(lead.value.rating || '')
      followupForm.activityState = lead.value.activityState || ''
      followupForm.paymentStatus = lead.value.payment || lead.value.paymentStatus || ''
      followupForm.nextFollowupDate = toDateInput(lead.value.nextCallDate)
      followupForm.nextFollowupTime = toTimeInput(lead.value.nextCallTime)
      followupForm.comment = lead.value.followUpComment || ''
      showQuickFollowupPopup.value = true
    }

    const closeQuickFollowupPopup = () => {
      showQuickFollowupPopup.value = false
    }

    const updateQuickFollowup = async () => {
      if (!lead.value) return
      if (!/^\d+$/.test(String(lead.value.id || ''))) {
        UI.toast('Quick followup only available for server leads', 'error')
        return
      }
      updatingFollowup.value = true
      try {
        const payload = {
          rating: followupForm.rating || '',
          lead_health: followupForm.leadHealth || '',
          sales_stage: followupForm.salesStage || '',
          activity_state: followupForm.activityState || '',
          payment_status: followupForm.paymentStatus || '',
          next_followup_date: followupForm.nextFollowupDate || '',
          next_followup_time: followupForm.nextFollowupTime || '',
          quick_comment: followupForm.comment || ''
        }
        const updated = await Data.updateQuickFollowup(lead.value.id, payload)
        if (updated?.lead) {
          lead.value = { ...lead.value, ...updated.lead }
        }
        if (Array.isArray(updated?.history) && updated.history.length) {
          historyData.value = {
            ...historyData.value,
            items: updated.history
          }
        } else {
          await loadLeadHistory(lead.value.id)
        }
        closeQuickFollowupPopup()
        UI.toast('Followup updated successfully', 'success')
      } catch (err) {
        UI.toast(err?.message || 'Unable to update followup', 'error')
      } finally {
        updatingFollowup.value = false
      }
    }

    const handleDelete = () => {
      if (!lead.value) return
      UI.confirm('Delete Lead', 'Are you sure? This cannot be undone.', () => {
        Data.remove('leads', lead.value.id)
        UI.toast('Lead deleted', 'success')
        setTimeout(() => router.push('/leads'), 800)
      })
    }

    return {
      lead,
      canAssign,
      canDelete,
      summaryChips,
      clientInfoList,
      leadInfoList,
      showTemplatePopup,
      templates,
      selectedTemplateId,
      selectedTemplatePreview,
      templateChannel,
      sendingTemplate,
      activeTab,
      detailTabs,
      tabHistoryItems,
      allHistoryItems,
      historyLoading,
      handleDelete,
      openTemplatePopup,
      closeTemplatePopup,
      sendTemplate,
      showQuickFollowupPopup,
      followupForm,
      leadHealthOptions,
      salesStageOptions,
      ratingOptions,
      activityStateOptions,
      paymentStatusOptions,
      updatingFollowup,
      openQuickFollowupPopup,
      closeQuickFollowupPopup,
      updateQuickFollowup
    }
  }
}
</script>

<style scoped>
.lead-summary-card {
  margin-bottom: 12px;
}

.summary-title {
  font-size: 32px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 6px;
}

.summary-sub {
  color: var(--muted);
  font-size: 12px;
  margin-bottom: 10px;
}

.summary-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.summary-chip {
  font-size: 11px;
  font-weight: 700;
  border-radius: 999px;
  padding: 5px 10px;
}

.detail-tabs-card {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
  position: sticky;
  top: 6px;
  z-index: 15;
  background: #fff;
}

.detail-tab-btn {
  border: 1px solid #d5deeb;
  background: #edf2fa;
  color: #274671;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 700;
}

.detail-tab-btn.active {
  background: #2f6fd6;
  border-color: #2f6fd6;
  color: #fff;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  border-bottom: 1px solid var(--bg);
  padding-bottom: 6px;
}

.detail-key {
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
}

.detail-val {
  color: var(--txt);
  font-size: 12px;
  text-align: right;
  font-weight: 600;
  max-width: 56%;
}

.qa-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 10px;
}

.qa-btn {
  border: 1px solid var(--bd);
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  padding: 10px 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
}

.qa-btn.meeting { background: #efe8ff; color: #6d44ce; }
.qa-btn.email { background: #e9f2ff; color: #2f65d5; }
.qa-btn.whatsapp { background: #e8faef; color: #18a14f; }
.qa-btn.call { background: #eef8f5; color: #177a63; }

.qa-secondary {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quick-followup-btn {
  background: #ecf9f1;
  border-color: #9dd8b0;
  color: #1d8e4d;
}

.history-card {
  border: 1px solid #f2cd63;
  background: #fffdf5;
}

.comment-box {
  font-size: 13px;
  line-height: 1.5;
  white-space: pre-wrap;
}

.empty-history {
  text-align: center;
  color: var(--muted);
  font-size: 12px;
  padding: 12px 0;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.history-item {
  border: 1px solid #f2cd63;
  border-radius: 10px;
  background: #fff;
  padding: 10px 12px;
}

.history-message {
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 6px;
}

.history-meta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 12px;
  color: #7a889f;
}

.history-meta i {
  color: #98a6bf;
}

.btn-whatsapp-send,
.btn-email-send {
  width: 100%;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  padding: 11px 12px;
  margin-bottom: 12px;
}

.btn-whatsapp-send {
  background: #17a34a;
}

.btn-email-send {
  background: #2f6fd6;
}

.whatsapp-log {
  background: #f1fff7;
  border-color: #b7ebcb;
}

.email-log {
  background: #f3f8ff;
  border-color: #bfd6ff;
}

.template-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.template-modal {
  width: 100%;
  max-width: 360px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.template-modal-header {
  padding: 12px 14px;
  background: var(--primary);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.template-modal-title {
  font-size: 17px;
  font-weight: 700;
}

.template-close-btn {
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
}

.template-modal-body {
  padding: 14px;
}

.quick-followup-modal {
  max-width: 700px;
}

.quick-followup-header {
  background: #1d8e4d;
}

.quick-followup-body {
  background: #f7fffa;
}

.quick-followup-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 12px;
}

.quick-followup-full {
  grid-column: span 2;
}

.template-preview {
  border: 1px solid var(--bd);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 12px;
  background: #fafcff;
}

.template-preview-title {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 6px;
}

.template-preview-content {
  font-size: 12px;
  color: var(--txt);
  max-height: 130px;
  overflow: auto;
}

@media (max-width: 640px) {
  .detail-tab-btn {
    flex: 1 1 calc(50% - 8px);
    text-align: center;
  }

    .quick-followup-grid {
      grid-template-columns: 1fr 1fr;
    }

  .quick-followup-full {
    grid-column: span 1;
  }
}


</style>
