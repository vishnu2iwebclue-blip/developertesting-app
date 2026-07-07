<template>
  <div class="page-content" v-if="loaded">
    <form @submit="save" class="mob-card">
      <div class="form-section-hd">Your Details</div>

      <div class="form-group">
        <label class="form-label">Your Name <span class="required-mark">*</span></label>
        <input v-model="form.your_name" type="text" class="form-control" required />
      </div>

      <div class="form-group">
        <label class="form-label">Your Mobile/Email <span class="required-mark">*</span></label>
        <input v-model="form.your_contact" type="text" class="form-control" required />
      </div>

      <div class="form-group">
        <label class="form-label">Your Group <span class="required-mark">*</span></label>
        <select v-model="form.your_group" class="form-select" required>
          <option value="">Select Group</option>
          <option v-for="g in groups" :key="g.id" :value="g.group_name">{{ g.group_name }}</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Data List</label>
        <select v-model.number="form.data_list_id" class="form-select">
          <option :value="null">Select Data List</option>
          <option v-for="d in dataLists" :key="d.id" :value="d.id">{{ d.title }}</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Regarding</label>
        <select v-model="form.regarding" class="form-select">
          <option value="">Choose</option>
          <option value="Client Meeting">Client Meeting</option>
          <option value="Client Demo">Client Demo</option>
          <option value="Client Query">Client Query</option>
          <option value="Client Requirement">Client Requirement</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Next Call or Demo Date</label>
        <input v-model="form.next_call_demo_date" type="date" class="form-control" />
      </div>

      <div class="form-group">
        <label class="form-label">Next Call or Demo Time</label>
        <input v-model="form.next_call_demo_time" type="time" class="form-control" />
      </div>

      <div class="form-section-hd">Client Details</div>

      <div class="form-group">
        <label class="form-label">Client Business / Company Name <span class="required-mark">*</span></label>
        <input v-model="form.client_business_company_name" type="text" class="form-control" required />
      </div>

      <div class="form-group">
        <label class="form-label">Client Name <span class="required-mark">*</span></label>
        <input v-model="form.client_name" type="text" class="form-control" required />
      </div>

      <div class="form-group">
        <label class="form-label">Client Mobile <span class="required-mark">*</span></label>
        <input v-model="form.client_mobile" type="text" class="form-control" required />
      </div>

      <div class="form-group">
        <label class="form-label">Client Email</label>
        <input v-model="form.client_email" type="email" class="form-control" />
      </div>

      <div class="form-group">
        <label class="form-label">Lead Health</label>
        <select v-model="form.status_label" class="form-select">
          <option value="">Select Lead Health</option>
          <option value="hot">Hot</option>
          <option value="warm">Warm</option>
          <option value="solo">Solo</option>
          <option value="sleeping">Sleeping</option>
          <option value="dead">Dead</option>
          <option value="junk">Junk</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Sales Stage</label>
        <select v-model="form.leadstatus" class="form-select">
          <option value="">Select Sales Stage</option>
          <option value="new-lead">New Lead</option>
          <option value="contacted">Contacted</option>
          <option value="demo-scheduled">Demo Scheduled</option>
          <option value="demo-completed">Demo Completed</option>
          <option value="proposal-sent">Proposal Sent</option>
          <option value="negotiation">Negotiation</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Rating</label>
        <select v-model="form.rating" class="form-select" >
          <option value="">Select Rating</option>
          <option value="na">N/A</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="60">60</option>
          <option value="70">70</option>
          <option value="80">80</option>
          <option value="90">90</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Activity State</label>
        <select v-model="form.activity_state" class="form-select">
          <option value="">Select Activity State</option>
          <option value="idle">Idle</option>
          <option value="working">Working</option>
          <option value="follow-up-due">Follow-up Due</option>
          <option value="re-opened">Re-opened</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Payment Status</label>
        <select v-model="form.payment" class="form-select">
          <option value="">Select Payment Status</option>
          <option value="free">Free</option>
          <option value="supported">Supported</option>
          <option value="pending">Pending</option>
          <option value="partially-paid">Partially Paid</option>
          <option value="fully-paid">Fully Paid</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Interested in Product/Service <span class="required-mark">*</span></label>
        <select v-model="form.interested_product_service" class="form-select" required>
          <option value="">Choose</option>
          <option value="Digital Business Card (V-Card)">Digital Business Card (V-Card)</option>
          <option value="WhatsApp Store">WhatsApp Store</option>
          <option value="Custom Website & App">Custom Website & App</option>
          <option value="Customer Software CRM/ ERP, CMS, eCommerce">Customer Software CRM/ ERP, CMS, eCommerce</option>
          <option value="Digital Marketing - SEO, Social or PPC, Ads">Digital Marketing - SEO, Social or PPC, Ads</option>
          <option value="CityFinsol Lead Package">CityFinsol Lead Package</option>
          <option value="CityFinSol Fin. Product (Web, CRM & Apps)">CityFinSol Fin. Product (Web, CRM & Apps)</option>
          <option value="IqraGuide Listing">IqraGuide Listing</option>
          <option value="IqraGuide Edu. Product (Web, CRM & Apps)">IqraGuide Edu. Product (Web, CRM & Apps)</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Call Status <span class="required-mark">*</span></label>
        <select v-model="form.call_status" class="form-select" required>
          <option value="">Choose</option>
          <option value="Closed (Won)">Closed (Won)</option>
          <option value="Interested">Interested</option>
          <option value="Maybe">Maybe</option>
          <option value="Not Interested">Not Interested</option>
          <option value="Client Cut The Call">Client Cut The Call</option>
          <option value="Angry">Angry</option>
          <option value="No Response">No Response</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Client Response <span class="required-mark">*</span></label>
        <select v-model="form.client_response" class="form-select" required>
          <option value="">Choose</option>
          <option value="Interested - Will Pay After Listing/Setup">Interested - Will Pay After Listing/Setup</option>
          <option value="Interested - Offer Sent on WhatsApp">Interested - Offer Sent on WhatsApp</option>
          <option value="Interested in Other Service / Custom Requirement">Interested in Other Service / Custom Requirement</option>
          <option value="Maybe - Requested Details on WhatsApp">Maybe - Requested Details on WhatsApp</option>
          <option value="Not Interested - Requested Offer on WhatsApp">Not Interested - Requested Offer on WhatsApp</option>
          <option value="Not Interested Currently - Potential Future Prospect (Offer Sent)">Not Interested Currently - Potential Future Prospect (Offer Sent)</option>
          <option value="Not Interested - Call Ended">Not Interested - Call Ended</option>
          <option value="Not Interested - Poor Prospect">Not Interested - Poor Prospect</option>
          <option value="Wrong Number / Number Not Reachable">Wrong Number / Number Not Reachable</option>
          <option value="Call Back Later">Call Back Later</option>
          <option value="Already Using Similar Service">Already Using Similar Service</option>
          <option value="Existing Customer">Existing Customer</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Client State <span class="required-mark">*</span></label>
        <select v-model="selectedStateId" class="form-select" required>
          <option value="">Select State</option>
          <option v-for="s in states" :key="s.id" :value="String(s.id)">{{ s.name }}</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Client City <span class="required-mark">*</span></label>
        <select v-model="selectedCityId" class="form-select" :disabled="!selectedStateId" required>
          <option value="">{{ selectedStateId ? 'Select City' : 'Select State First' }}</option>
          <option v-for="c in cities" :key="c.id" :value="String(c.id)">{{ c.name }}</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Client Business Service Name (List) <span class="required-mark">*</span></label>
        <input v-model="form.client_business_service_name" type="text" class="form-control" required />
      </div>

      <div class="form-group">
        <label class="form-label">Client Business Categories <span class="required-mark">*</span></label>
        <input v-model="form.client_business_categories" type="text" class="form-control" required />
      </div>

      <div class="form-group">
        <label class="form-label">Comment <span class="required-mark">*</span></label>
        <textarea v-model="form.comment" class="form-control" style="min-height: 90px" required></textarea>
      </div>

      <!-- <div class="form-group">
        <label class="form-label">Follow up comment</label>
        <textarea v-model="form.follow_up_comment" class="form-control" style="min-height: 80px"></textarea>
      </div> -->

      <button type="submit" class="btn-primary-crm w-full">
        <i class="fas fa-save me-1"></i> Update Lead
      </button>
    </form>
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Auth } from '../services/auth'
import { Api } from '../services/api'
import { Data } from '../services/data'
import { UI } from '../services/ui'
import { nowISO } from '../utils/helpers'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const loaded = ref(false)
    const currentUser = ref(null)
    const groups = ref([])
    const dataLists = ref([])
    const states = ref([])
    const cities = ref([])
    const selectedStateId = ref('')
    const selectedCityId = ref('')
    const leadId = ref('')
    const existingLead = ref(null)

    const form = reactive({
      your_name: '',
      your_contact: '',
      your_group: '',
      data_list_id: null,
      regarding: '',
      next_call_demo_date: '',
      next_call_demo_time: '',
      client_business_company_name: '',
      client_name: '',
      client_mobile: '',
      client_email: '',
      status_type: 4,
      status_label: '',
      leadstatus: '',
      rating: '',
      activity_state: '',
      payment: '',
      interested_product_service: '',
      call_status: '',
      client_response: '',
      client_state: '',
      client_city: '',
      client_business_service_name: '',
      client_business_categories: '',
      comment: '',
      follow_up_comment: ''
    })

    const loadCitiesByState = async (stateId, cityToSelect = '') => {
      if (!stateId) {
        cities.value = []
        selectedCityId.value = ''
        form.client_city = ''
        return
      }
      try {
        const cityMeta = await Api.getLeadCreateMeta({ state_id: stateId })
        cities.value = Array.isArray(cityMeta?.data?.cities) ? cityMeta.data.cities : []
      } catch {
        cities.value = []
      }
      if (cityToSelect && cities.value.length) {
        const matchedCity = cities.value.find((c) => {
          const cityName = String(c?.name || '').toLowerCase()
          const target = String(cityToSelect || '').toLowerCase()
          return cityName === target || String(c?.id) === String(cityToSelect)
        })
        if (matchedCity) {
          selectedCityId.value = String(matchedCity.id)
          form.client_city = matchedCity.name
        }
      }
    }

    watch(selectedStateId, async (stateId) => {
      const selectedState = states.value.find((s) => String(s.id) === String(stateId))
      form.client_state = selectedState?.id || ''
    
      selectedCityId.value = ''
      form.client_city = ''
      await loadCitiesByState(stateId)
    })
    

    watch(selectedCityId, (cityId) => {
      const selectedCity = cities.value.find((c) => String(c.id) === String(cityId))
      form.client_city = selectedCity?.id || ''
    })

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
        router.push('/leads')
        return
      }
      leadId.value = String(id)

      const lead = await Data.fetchLeadEditById(leadId.value)
      if (!lead) {
        UI.toast('Lead not found', 'error')
        router.push('/leads')
        return
      }
      existingLead.value = lead
     
      form.your_name = lead.yourName || user.name || ''
      form.your_contact = lead.yourContact || user.mobile || user.email || ''
      form.your_group = lead.yourGroup || ''
      form.data_list_id = lead.dataListId || null
      form.regarding = lead.regarding || ''
      form.next_call_demo_date = lead.nextCallDate || ''
      form.next_call_demo_time = lead.nextCallTime || ''
      form.client_business_company_name = lead.clientCompany || ''
      form.client_name = lead.clientName || ''
      form.client_mobile = lead.clientMobile || ''
      form.client_email = lead.clientEmail || ''
      form.status_type = lead.statusType || 4
      form.status_label = lead.statusLabel ? lead.statusLabel.toLowerCase() : ''
      form.leadstatus = lead.leadStatus ? lead.leadStatus.toLowerCase() : ''
      form.rating = lead.rating ? String(lead.rating) : ''
      form.activity_state = lead.activityState ? lead.activityState.toLowerCase() : ''
      form.payment = lead.payment || lead.paymentStatus || ''
      form.interested_product_service = lead.product || ''
      form.call_status = lead.callStatus || ''
      form.client_response = lead.clientResponse || ''
      form.client_state = lead.state || ''
      form.client_city = lead.city || ''
      form.client_business_service_name = lead.clientBusinessServiceName || ''
      form.client_business_categories = lead.businessCategory || ''
      form.comment = lead.comment || lead.notes || ''
      form.follow_up_comment = lead.followUpComment || ''

      try {
        const meta = await Api.getLeadCreateMeta()
        groups.value = Array.isArray(meta?.data?.groups) ? meta.data.groups : []
        dataLists.value = Array.isArray(meta?.data?.data_lists) ? meta.data.data_lists : []
        states.value = Array.isArray(meta?.data?.states) ? meta.data.states : []
        if (!form.your_group && groups.value.length) {
          const currentGroupId = meta?.data?.current_user?.group_id
          const currentGroup = groups.value.find(g => String(g.id) === String(currentGroupId))
          form.your_group = currentGroup?.group_name || groups.value[0].group_name
        }

        const matchedState = states.value.find((s) => {
          const stateName = String(s?.name || '').toLowerCase()
          const target = String(form.client_state || '').toLowerCase()
          return stateName === target || String(s?.id) === String(form.client_state)
        })
        if (matchedState) {
          selectedStateId.value = String(matchedState.id)
          form.client_state = matchedState.name
          await loadCitiesByState(selectedStateId.value, form.client_city)
        } else {
          cities.value = Array.isArray(meta?.data?.cities) ? meta.data.cities : []
          const matchedCity = cities.value.find((c) => {
            const cityName = String(c?.name || '').toLowerCase()
            const target = String(form.client_city || '').toLowerCase()
            return cityName === target || String(c?.id) === String(form.client_city)
          })
          if (matchedCity) {
            selectedCityId.value = String(matchedCity.id)
            form.client_city = matchedCity.name
          }
        }
      } catch {
        groups.value = []
        dataLists.value = []
        states.value = []
        cities.value = []
      }

      loaded.value = true
      UI.hideLoading()
    })

    const save = (e) => {
      e.preventDefault()
      const user = currentUser.value || Auth.me()
      if (!user || !existingLead.value) return

      if (
        !form.your_name ||
        !form.your_contact ||
        !form.your_group ||
        // !form.regarding ||
        !form.client_business_company_name ||
        !form.client_name ||
        !form.client_mobile ||
        !form.interested_product_service ||
        !form.call_status ||
        !form.client_response ||
        !form.client_state ||
        !form.client_city ||
        !form.client_business_service_name ||
        !form.client_business_categories ||
        !form.comment
      ) {
        UI.toast('Please fill required fields', 'error')
        return
      }

      Data.upsert('leads', {
        ...existingLead.value,
        id: leadId.value,
        yourName: form.your_name,
        yourContact: form.your_contact,
        yourGroup: form.your_group,
        dataListId: form.data_list_id,
        regarding: form.regarding,
        nextCallDate: form.next_call_demo_date,
        nextCallTime: form.next_call_demo_time,
        clientCompany: form.client_business_company_name,
        clientName: form.client_name,
        clientMobile: form.client_mobile,
        clientEmail: form.client_email,
        statusType: form.status_type,
        statusLabel: form.status_label,
        leadStatus: form.leadstatus,
        rating: form.rating,
        activityState: form.activity_state,
        payment: form.payment,
        paymentStatus: form.payment,
        product: form.interested_product_service,
        callStatus: form.call_status,
        clientResponse: form.client_response,
        state: form.client_state,
        city: form.client_city,
        clientBusinessServiceName: form.client_business_service_name,
        businessCategory: form.client_business_categories,
        comment: form.comment,
        followUpComment: form.follow_up_comment,
        notes: form.comment,
        updatedAt: nowISO()
      })

      UI.toast('Lead updated!', 'success')
      setTimeout(() => router.push('/lead-details?id=' + leadId.value), 800)
    }

    return {
      loaded,
      form,
      groups,
      dataLists,
      states,
      cities,
      selectedStateId,
      selectedCityId,
      save
    }
  }
}
</script>
