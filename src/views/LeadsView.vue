<template>
  <div class="page-content">
    <!-- Chip Scroll -->
    <div class="chip-scroll">
      <div
        class="chip"
        :class="{ active: statusFilter === '' }"
        @click="selectChip('')"
      >
        All
      </div>
      <div
        v-for="c in leadHealthChips"
        :key="c.value"
        class="chip"
        :class="{ active: statusFilter === c.value }"
        @click="selectChip(c.value)"
      >
        {{ c.label }}
      </div>
    </div>

    <!-- Search -->
    <div class="search-wrap">
      <i class="fas fa-search"></i>
      <input
        v-model="search"
        id="lead-search"
        type="text"
        class="form-control"
        placeholder="Search leads..."
      />
    </div>

    <!-- Filter Toggle -->
    <div class="filter-toggle-row">
      <button class="btn-outline-crm" style="flex: 1" @click="toggleFilter">
        <i class="fas fa-filter"></i> Filters
        <span
          v-if="activeFilterCount"
          id="filter-count-badge"
          class="filter-count-badge"
          style="display: inline"
        >
          {{ activeFilterCount }}
        </span>
      </button>
    </div>

    <!-- Filter Panel -->
    <div id="filter-panel" class="filter-panel" :class="{ open: filterOpen }">
      <div class="filter-row-1">
        <!-- <div class="filter-row-1">
          <label class="filter-lbl">Payment</label>
          <select v-model="filters.paymentStatus" class="filter-control">
            <option value="">All</option>
            <option v-for="p in payments" :key="p" :value="p">{{ p }}</option>
          </select>
        </div> -->
        <!-- <div class="filter-row-1">
          <label class="filter-lbl">Call Status</label>
          <select v-model="filters.callStatus" class="filter-control">
            <option value="">All</option>
            <option v-for="cs in callStatuses" :key="cs" :value="cs">{{ cs }}</option>
          </select>
        </div> -->
      </div>

      <div class="filter-row-2">
        <div class="filter-row-1">
          <label class="filter-lbl">From Date</label>
          <input v-model="filters.fromDate" type="date" class="filter-control" />
         
        </div>
        <div class="filter-row-1">
          <label class="filter-lbl">To Date </label>
          <input v-model="filters.toDate" type="date" class="filter-control" />
        </div>
      </div>
      <div class="filter-row-2">
        <div class="filter-row-1">
          <label class="filter-lbl">Last From updated date</label>
          <input v-model="filters.updatedFrom" type="date" class="filter-control" />
         
        </div>
        <div class="filter-row-1">
          <label class="filter-lbl">Last To updated Date </label>
          <input v-model="filters.updatedTo" type="date" class="filter-control" />
        </div>
      </div>
      <div class="filter-row-1">

        <label class="filter-lbl">Interested in Product/Service</label>
        <select v-model="filters.product" class="filter-control">
          <option value="">All</option>
          <option v-for="p in products" :key="p" :value="p">{{ p }}</option>
        </select>
          
        </div>
     
      <div class="filter-row-1">
        <label class="filter-lbl">Business Category</label>
        <select v-model="filters.businessCategory" class="filter-control">
          <option value="">All</option>
          <option v-for="b in businessCats" :key="b" :value="b">{{ b }}</option>
        </select>
      </div>
      <div class="filter-row-2">
        <div class="filter-row-1">
          <label class="filter-lbl">Group</label>
          <select v-model="filters.groupId" class="filter-control">
            <option value="">All</option>
            <option v-for="g in groups" :key="g.id" :value="g.id">
              {{ g.name }}
            </option>
          </select>
        </div>
        <div class="filter-row-1">
          <label class="filter-lbl">Assigned To</label>
          <select v-model="filters.assignedTo" class="filter-control">
            <option value="">All</option>
            <option v-for="u in emps" :key="u.id" :value="u.id">
              {{ u.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="filter-row-1">
        <!-- <div class="filter-row-1">
          <label class="filter-lbl">State</label>
          <input v-model="filters.state" type="text" class="filter-control" placeholder="State" />
        </div> -->
        <div class="filter-row-1">
          <label class="filter-lbl">Rating</label>
          <select v-model="filters.rating" class="filter-control">
            <option value="">All</option>
            <!-- <option value="na">N/A</option> -->
            <option
              v-for="r in [
                '10',
                '20',
                '30',
                '40',
                '50',
                '60',
                '70',
                '80',
                '90',
              ]"
              :key="r"
              :value="r"
            >
              {{ r ? r + "%" : "N/A" }}
            </option>
          </select>
        </div>
        <div class="filter-row-2">
          <div class="filter-row-1">
            <label class="filter-lbl">Lead Health Status</label>
            <select v-model="filters.status" class="filter-control">
              <option value="">All</option>
              <!-- <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option> -->
              <option v-for="s in statuses" :key="s.value" :value="s.value">
                {{ s.label }}
              </option>
            </select>
          </div>
          <div class="filter-row-1">
            <label class="filter-lbl">Call Status</label>
            <select v-model="filters.callStatus" class="filter-control">
              <option value="">All</option>
              <option v-for="cs in callStatuses" :key="cs" :value="cs">
                {{ cs }}
              </option>
            </select>
          </div>
          <!-- <div class="filter-row-1">
          <label class="filter-lbl">Category</label>
          <select v-model="filters.leadCategory" class="filter-control">
            <option value="">All</option>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div> -->

          <div class="form-group">
            <label class="form-label">Sales Stage</label>
            <select v-model="filters.leadstatus" class="form-select">
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
            <label class="form-label">Activity State</label>
            <select v-model="filters.activity_state" class="form-select">
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
            <select v-model="filters.payment" class="form-select">
              <option value="">Select Payment Status</option>
              <option value="free">Free</option>
              <option value="supported">Supported</option>
              <option value="pending">Pending</option>
              <option value="partially-paid">Partially Paid</option>
              <option value="fully-paid">Fully Paid</option>
            </select>
          </div>
        </div>
      </div>
      <div class="filter-actions">
        <button class="btn-outline-crm" style="flex: 1" @click="applyFilters">
          Apply Filters
        </button>
        <button class="btn-outline-crm" style="flex: 1" @click="clearFilters">
          Clear All
        </button>
      </div>
    </div>

    <!-- Leads Count and Add Button -->
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      "
    >
      <div
        id="leads-count"
        style="font-size: 12px; font-weight: 700; color: var(--muted)"
      >
        {{ sortedLeads.length }} leads
      </div>
      <router-link to="/lead-add" class="btn-primary-crm btn-sm">
        <i class="fas fa-plus me-1"></i> Add Lead
      </router-link>
    </div>

    <!-- Leads List -->
    <div id="leads-list">
      <div v-if="!sortedLeads.length" class="empty-state">
        <i class="fas fa-users"></i>
        <p>No leads found</p>
      </div>
      <div v-else v-for="l in sortedLeads" :key="l.id" class="lead-item">
        <div class="li-top">
          <div class="li-av">{{ getInitials(l.clientName) }}</div>
          <div class="li-info">
            <div class="li-name">{{ l.clientName }}</div>
            <div class="li-sub">
              {{ l.clientCompany }} &bull; {{ l.city || l.state || "—" }}
            </div>
          </div>
          <div class="li-right">
            <span class="li-date">{{ l.nextCallDate || "" }}</span>
            <span class="li-group">{{
              l.groupName || l.yourGroup || getGroupName(l.groupId)
            }}</span>
          </div>
        </div>
        <div class="li-meta">
          <!-- <div
            class="li-metabtn"
            style="
              display: flex;
              gap: 4px;
              flex-wrap: wrap;
              align-items: center;
            "
          >
            <div>
              <div>
                <span style="color: black; font-weight: 500">
                  Lead Health status-
                </span>
                <StatusBadge :status="l.status" />
              </div>
              <div>
                <span style="color: black; font-weight: 500">
                  call status-
                </span>
                <span class="call-status-chip">{{
                  normalizeCallStatus(l.callStatus) || "—"
                }}</span>
                <PaymentBadge :status="l.paymentStatus" />
              </div>
            </div>
          </div> -->

           <div
            class="li-metabtn"
            style="
              display: flex;
              gap: 4px;
              flex-wrap: wrap;
              align-items: center;
            "
          >
            <div>
              <div>
                <span style="color: black; font-weight: 500">
                  Lead Health -
                </span>
                <StatusBadge :status="l.status" />
              </div>
              <div>
                <span style="color: black; font-weight: 500">
                  call status -
                </span>
                <span class="call-status-chip">{{
                  normalizeCallStatus(l.callStatus) || "—"
                }}</span>
                <PaymentBadge :status="l.paymentStatus" />
              </div>
            </div>
          </div>

          <div
            class="li-metabtn"
            style="
              display: flex;
              gap: 4px;
              flex-wrap: wrap;
              align-items: center;
            "
          >
            <div>
              <div>
                <span style="color: black; font-weight: 500">
                  Sales Stage -
                </span>
                <span class="call-status-chip">{{ l.leadStatus || "—" }}</span>
              </div>
              <div>
                <span style="color: black; font-weight: 500">
                  Payment Status -
                </span>
                <span class="call-status-chip">{{ l.paymentStatus || "—" }}</span>
              </div>
              <div>
                <span style="color: black; font-weight: 500">
                  Activity State -
                </span>
                <span class="call-status-chip">{{ l.activityState || "—" }}</span>
              </div>
            </div>
          </div>


         
          <div class="li-actions">
            <a
              :href="'tel:' + l.clientMobile"
              class="action-btn call"
              title="Call"
              ><i class="fas fa-phone"></i
            ></a>
            <button
              type="button"
              class="action-btn wa"
              title="WhatsApp Template"
              @click="openTemplatePopup(l, 'whatsapp')"
            >
              <i class="fab fa-whatsapp"></i>
            </button>
            <button
              type="button"
              class="action-btn mail"
              title="Email Template"
              @click="openTemplatePopup(l, 'email')"
            >
              <i class="fas fa-envelope"></i>
            </button>
            <router-link
              :to="'/lead-details?id=' + l.id"
              class="action-btn view"
              title="View"
              ><i class="fas fa-eye"></i
            ></router-link>
            <router-link
              :to="'/lead-edit?id=' + l.id"
              class="action-btn edit"
              title="Edit"
              ><i class="fas fa-edit"></i
            ></router-link>
          </div>
        </div>
        <div style="font-size: 10px; color: var(--muted); margin-top: 6px">
          {{ l.product ? l.product.substring(0, 30) : "" }} &bull; Rating:
          {{ getLeadRatingLabel(l) }}
          <span class="li-group"
            >
            <span style="color: gray">Created By :</span>

            {{ l.employeeName || getUserName(l.assignedTo) }}
            
            </span>
          <span class="li-group"
            >
            <span style="color: gray">Created Date :</span>

            {{ formatLeadDate(l.createdAt) }}

            </span>
          <span class="li-group"
            >
            <span style="color: gray">Updated Date :</span>

            {{ formatLeadDate(l.updatedAt) }}

            </span>
        </div>
      </div>
    </div>

    <div v-if="pagination.lastPage > 1" class="list-pagination">
      <button
        type="button"
        class="btn-outline-crm btn-sm"
        :disabled="loadingPage || pagination.currentPage <= 1"
        @click="changePage(pagination.currentPage - 1)"
      >
        Prev
      </button>
      <div class="list-pagination-info">
        Page {{ pagination.currentPage }} of {{ pagination.lastPage }} ({{
          pagination.total
        }}
        leads)
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

    <div
      v-if="showTemplatePopup"
      class="template-modal-backdrop"
      @click.self="closeTemplatePopup"
    >
      <div class="template-modal">
        <div class="template-modal-header">
          <div class="template-modal-title">
            Send
            {{ templateChannel === "whatsapp" ? "WhatsApp" : "Email" }} Template
          </div>
          <button
            type="button"
            class="template-close-btn"
            @click="closeTemplatePopup"
          >
            &times;
          </button>
        </div>
        <div class="template-modal-body">
          <div class="form-group">
            <label class="form-label"
              >Select Template <span class="required-mark">*</span></label
            >
            <select v-model.number="selectedTemplateId" class="form-select">
              <option :value="null">Choose Template</option>
              <option v-for="t in templates" :key="t.id" :value="t.id">
                {{ t.template_name }}
              </option>
            </select>
          </div>
          <div v-if="selectedTemplatePreview" class="template-preview">
            <div class="template-preview-title">
              {{ selectedTemplatePreview.template_name }}
            </div>
            <div
              class="template-preview-content"
              v-html="selectedTemplatePreview.content"
            ></div>
          </div>
          <button
            type="button"
            class="btn-primary-crm w-full"
            :disabled="sendingTemplate"
            @click="sendTemplate"
          >
            <i class="fas fa-paper-plane me-1"></i>
            {{ sendingTemplate ? "Sending..." : "Send Template" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Auth } from "../services/auth";
import { Api } from "../services/api";
import { Data } from "../services/data";
import { UI } from "../services/ui";
import { initials } from "../utils/helpers";
import StatusBadge from "../components/StatusBadge.vue";
import PaymentBadge from "../components/PaymentBadge.vue";

export default {
  components: { StatusBadge, PaymentBadge },
  setup() {
    const router = useRouter();
    const search = ref("");
    const statusFilter = ref("");
    const filterOpen = ref(false);
    const activeFilterCount = ref(0);

    const filters = ref({
      fromDate: "",
      toDate: "",
      updatedFrom: "",
      updatedTo: "",
      status: "",
      leadCategory: "",
      paymentStatus: "",
      callStatus: "",
      product: "",
      businessCategory: "",
      groupId: "",
      teamId: "",
      assignedTo: "",
      state: "",
      rating: "",
      leadstatus: "",
      activity_state: "",
      payment: "",
    });

    const currentUser = ref(null);
    const leads = ref([]);
    const loadingPage = ref(false);
    const perPage = 20;
    const pagination = ref({
      currentPage: 1,
      lastPage: 1,
      perPage,
      total: 0,
    });
    const groups = ref([]);
    const teams = ref([]);
    const emps = ref([]);
    const showTemplatePopup = ref(false);
    const templates = ref([]);
    const selectedTemplateId = ref(null);
    const selectedLead = ref(null);
    const templateChannel = ref("whatsapp");
    const sendingTemplate = ref(false);

    const products = ref([
      "Digital Business Card (V-Card)",
      "WhatsApp Store",
      "Custom Website & App",
      "Customer Software CRM/ ERP, CMS, eCommerce",
      "Digital Marketing - SEO, Social or PPC, Ads",
      "CityFinsol Lead Package",
      "CityFinSol Fin. Product (Web, CRM & Apps)",
      "IqraGuide Listing",
      "IqraGuide Edu. Product (Web, CRM & Apps)",
      "Other Services",
    ]);
    const businessCats = ref([
      "IT Services",
      "Manufacturing",
      "Healthcare",
      "Real Estate",
      "Retail",
      "Education",
      "Logistics",
      "Consulting",
      "Hospitality",
    ]);

    const buildApiFilters = () => ({
      search: String(search.value || "").trim() || undefined,
      from_date: filters.value.fromDate || undefined,
      to_date: filters.value.toDate || undefined,
      last_from_updated_date: filters.value.updatedFrom || undefined,
      last_to_updated_date: filters.value.updatedTo || undefined,
      interested_product_service: filters.value.product || undefined,
      client_business_categories: filters.value.businessCategory || undefined,
      group_id: filters.value.groupId ? Number(filters.value.groupId) : undefined,
      employee_id: filters.value.assignedTo ? Number(filters.value.assignedTo) : undefined,
      rating: filters.value.rating || undefined,
      status_label: filters.value.status || statusFilter.value || undefined,
      call_status: filters.value.callStatus || undefined,
      leadstatus: filters.value.leadstatus || undefined,
      activity_state: filters.value.activity_state || undefined,
      payment: filters.value.payment || undefined,
    });

    const loadLeadsPage = async (page = 1) => {
      loadingPage.value = true;
      try {
        const result = await Data.fetchLeadsPage({
          page,
          perPage,
          filters: buildApiFilters(),
        });
        leads.value = Array.isArray(result?.items) ? result.items : [];
        pagination.value = result?.pagination || {
          currentPage: 1,
          lastPage: 1,
          perPage,
          total: leads.value.length,
        };
        const productSet = new Set(products.value);
        const categorySet = new Set(businessCats.value);
        leads.value.forEach((lead) => {
          if (lead?.product) productSet.add(lead.product);
          if (lead?.businessCategory) categorySet.add(lead.businessCategory);
        });
        products.value = Array.from(productSet);
        businessCats.value = Array.from(categorySet);
      } finally {
        loadingPage.value = false;
      }
    };

    // const statuses = ['New Lead', 'Contacted', 'Follow-up Scheduled', 'Demo Scheduled', 'Proposal Sent', 'Negotiation', 'Won', 'Close (Won)', 'Lost', 'On Hold']
    const statuses = [
      { label: "Hot", value: "hot" },
      { label: "Warm", value: "warm" },
      { label: "Solo", value: "solo" },
      { label: "Sleeping", value: "sleeping" },
      { label: "Dead", value: "dead" },
      { label: "Junk", value: "junk" },
    ];
    const leadHealthChips = [
      { label: "Hot", value: "hot" },
      { label: "Warm", value: "warm" },
      { label: "Solo", value: "solo" },
      { label: "Sleeping", value: "sleeping" },
      { label: "Dead", value: "dead" },
      { label: "Junk", value: "junk" },
    ];
    const categories = ["Hot", "Warm", "Solo", "Cold"];
    const payments = [
      "Pay Today",
      "Pay Tomorrow",
      "Pay This Week",
      "Pay Next Week",
      "Pay Ignoring",
      "Pay Lost",
    ];
    const callStatuses = [
      "Closed (Won)",
      "Interested",
      "Maybe",
      "Not Interested",
      "Client Cut The Call",
      "Angry",
      "No Response",
    ];
    // const callStatuses = ['Called - Interested', 'Called - Callback', 'Called - Not Interested', 'Called - Not Reachable', 'Called - Busy', 'Not Called']
    onMounted(async () => {
      const user = Auth.me();
      if (!user) {
        router.push("/login");
        return;
      }
      await Data.loadAll();
      currentUser.value = user;

      try {
        const meta = await Api.getLeadCreateMeta();
        const apiGroups = Array.isArray(meta?.data?.groups)
          ? meta.data.groups.map((g) => ({
              id: String(g.id),
              name: g.group_name || g.name || `Group ${g.id}`,
            }))
          : [];
        groups.value = apiGroups.length ? apiGroups : Data.getAll("groups");
      } catch {
        groups.value = Data.getAll("groups");
      }
      teams.value = Data.getAll("teams");
      emps.value = Data.getEmployeesForUser(user);
      await loadLeadsPage(1);

      UI.hideLoading();
    });

    const selectChip = async (val) => {
      statusFilter.value = val;
      filters.value.status = val;
      await loadLeadsPage(1);
    };

    const toggleFilter = () => {
      filterOpen.value = !filterOpen.value;
    };

    const applyFilters = async () => {
      const keys = Object.keys(filters.value);
      activeFilterCount.value = keys.filter((k) => filters.value[k]).length;
      filterOpen.value = false;
      await loadLeadsPage(1);
    };

    const clearFilters = async () => {
      Object.keys(filters.value).forEach((k) => {
        filters.value[k] = "";
      });
      activeFilterCount.value = 0;
      statusFilter.value = "";
      filterOpen.value = false;
      await loadLeadsPage(1);
    };

    const normalizeCallStatus = (value = "") => {
      return String(value || "")
        .replace(/^Called\s*-\s*/i, "")
        .trim();
    };

    const normalizeDateOnly = (value = "") => {
      const d = String(value || "").trim();
      if (!d) return "";
      return d.slice(0, 10);
    };

    const sortedLeads = computed(() => {
      if (!currentUser.value) return [];
      let list = [...leads.value];

      if (currentUser.value.role === "Manager") {
        list = list.filter((l) => l.groupId === currentUser.value.groupId);
      }

      if (statusFilter.value) {
        list = list.filter(
          (l) =>
            String(l.statusLabel || "").toLowerCase() === statusFilter.value,
        );
      }

      if (search.value) {
        const q = search.value.toLowerCase();
        list = list.filter((l) =>
          (
            l.clientName +
            l.clientCompany +
            l.clientMobile +
            (l.city || "") +
            (l.state || "")
          )
            .toLowerCase()
            .includes(q),
        );
      }

      if (filters.value.status) {
        list = list.filter(
          (l) =>
            String(l.statusLabel || "").toLowerCase() ===
            String(filters.value.status).toLowerCase(),
        );
      }
      if (filters.value.leadCategory)
        list = list.filter(
          (l) => l.leadCategory === filters.value.leadCategory,
        );
      if (filters.value.paymentStatus)
        list = list.filter(
          (l) => l.paymentStatus === filters.value.paymentStatus,
        );
      if (filters.value.callStatus)
        list = list.filter(
          (l) =>
            normalizeCallStatus(l.callStatus) ===
            normalizeCallStatus(filters.value.callStatus),
        );
      if (filters.value.product)
        list = list.filter((l) => l.product === filters.value.product);
      if (filters.value.businessCategory)
        list = list.filter(
          (l) => l.businessCategory === filters.value.businessCategory,
        );
      if (filters.value.groupId)
        list = list.filter((l) => l.groupId === filters.value.groupId);
      if (filters.value.teamId)
        list = list.filter((l) => l.teamId === filters.value.teamId);
      if (filters.value.assignedTo) {
        const selected = String(filters.value.assignedTo);
        list = list.filter((l) => {
          const candidates = [l.assignedTo, l.employeeId, l.createdBy].map(
            (v) => String(v || ""),
          );
          return candidates.includes(selected);
        });
      }
      if (filters.value.state)
        list = list.filter((l) =>
          (l.state || "")
            .toLowerCase()
            .includes(filters.value.state.toLowerCase()),
        );
      if (filters.value.rating) {
        if (filters.value.rating === "na") {
          list = list.filter(
            (l) => String(l.ratingValue || "").toLowerCase() === "na",
          );
        } else {
          list = list.filter(
            (l) =>
              String(l.ratingValue || l.rating || "") === filters.value.rating,
          );
        }
      }
      if (filters.value.leadstatus) {
        list = list.filter(
          (l) =>
            String(l.leadStatus || "").toLowerCase() ===
            String(filters.value.leadstatus).toLowerCase(),
        );
      }
      if (filters.value.activity_state) {
        list = list.filter(
          (l) =>
            String(l.activityState || "").toLowerCase() ===
            String(filters.value.activity_state).toLowerCase(),
        );
      }
      if (filters.value.payment) {
        list = list.filter(
          (l) =>
            String(l.paymentStatus || "").toLowerCase() ===
            String(filters.value.payment).toLowerCase(),
        );
      }
      if (filters.value.fromDate) {
        list = list.filter(
          (l) => normalizeDateOnly(l.createdAt) >= normalizeDateOnly(filters.value.fromDate),
        );
      }
      if (filters.value.toDate) {
        list = list.filter(
          (l) => normalizeDateOnly(l.createdAt) <= normalizeDateOnly(filters.value.toDate),
        );
      }
      if (filters.value.updatedFrom) {
        list = list.filter(
          (l) => normalizeDateOnly(l.updatedAt) >= normalizeDateOnly(filters.value.updatedFrom),
        );
      }
      if (filters.value.updatedTo) {
        list = list.filter(
          (l) => normalizeDateOnly(l.updatedAt) <= normalizeDateOnly(filters.value.updatedTo),
        );
      }

      return [...list].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    });

    const selectedTemplatePreview = computed(() => {
      if (!selectedTemplateId.value) return null;
      return (
        templates.value.find(
          (t) => Number(t.id) === Number(selectedTemplateId.value),
        ) || null
      );
    });

    const getInitials = (name) => initials(name);
    const getUserName = (id) => Data.getUserName(id);
    const getGroupName = (id) => Data.getGroupName(id);
    const getLeadRatingLabel = (lead) => {
      const v = String(lead?.ratingValue || lead?.rating || "").toLowerCase();
      if (!v) return "—";
      if (v === "na") return "N/A";
      return String(lead?.ratingValue || lead?.rating) + "%";
    };
    const formatLeadDate = (value) => {
      const raw = String(value || "").trim();
      if (!raw) return "—";
      const normalized = raw.replace(" ", "T");
      const date = new Date(normalized);
      if (Number.isNaN(date.getTime())) return raw.slice(0, 10) || "—";
      return date.toLocaleDateString("en-CA");
    };

    const openTemplatePopup = async (lead, channel) => {
      if (!lead?.id) return;
      if (!/^\d+$/.test(String(lead.id))) {
        UI.toast("Template send only available for server leads", "error");
        return;
      }
      selectedLead.value = lead;
      templateChannel.value = channel;
      selectedTemplateId.value = null;
      showTemplatePopup.value = true;

      try {
        const payload = await Api.getTemplates();
        templates.value = Array.isArray(payload?.data) ? payload.data : [];
      } catch (err) {
        templates.value = [];
        UI.toast(err.message || "Unable to load templates", "error");
      }
    };

    const closeTemplatePopup = () => {
      showTemplatePopup.value = false;
      selectedTemplateId.value = null;
      selectedLead.value = null;
      templateChannel.value = "whatsapp";
    };

    const sendTemplate = async () => {
      if (!selectedLead.value?.id || !selectedTemplateId.value) {
        UI.toast("Please select a template", "error");
        return;
      }
      sendingTemplate.value = true;
      try {
        const response = await Api.sendTemplate(
          selectedLead.value.id,
          selectedTemplateId.value,
          templateChannel.value,
        );
        const redirectUrl = response?.data?.url || response?.url || "";
        UI.toast("Template sent successfully", "success");
        closeTemplatePopup();
        if (templateChannel.value === "whatsapp" && redirectUrl) {
          window.location.href = redirectUrl;
        }
      } catch (err) {
        UI.toast(err.message || "Failed to send template", "error");
      } finally {
        sendingTemplate.value = false;
      }
    };

    const changePage = async (page) => {
      const next = Number(page || 1);
      if (loadingPage.value) return;
      if (next < 1 || next > pagination.value.lastPage) return;
      await loadLeadsPage(next);
    };

    return {
      search,
      statusFilter,
      filterOpen,
      activeFilterCount,
      filters,
      statuses,
      leadHealthChips,
      categories,
      payments,
      callStatuses,
      products,
      businessCats,
      groups,
      teams,
      emps,
      showTemplatePopup,
      templates,
      selectedTemplateId,
      selectedTemplatePreview,
      templateChannel,
      sendingTemplate,
      pagination,
      loadingPage,
      selectChip,
      toggleFilter,
      applyFilters,
      clearFilters,
      sortedLeads,
      getInitials,
      getUserName,
      getGroupName,
      getLeadRatingLabel,
      formatLeadDate,
      normalizeCallStatus,
      openTemplatePopup,
      closeTemplatePopup,
      sendTemplate,
      changePage,
    };
  },
};
</script>

<style scoped>
.list-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 12px;
}

.list-pagination-info {
  flex: 1;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
}

.call-status-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 2px 7px;
  font-size: 10px;
  font-weight: 700;
  background: #e8f1ff;
  color: #1e62d0;
}

.li-group {
  display: block;
  font-size: 12px;
  color: #1a237e;
  margin-top: 2px;
  font-weight: bold;
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

.li-meta {
  display: block;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  flex-wrap: wrap;
}
.li-metabtn {
  margin-bottom: 10px;
}
</style>
