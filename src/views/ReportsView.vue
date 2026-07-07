<template>
  <div class="page-content">
    <div class="mob-card">
      <div class="form-group">
        <label class="form-label">Date Range</label>
        <select v-model="range" class="form-select">
          <option value="all">All Time</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
        </select>
      </div>
    </div>

    <div id="report-body">
      <div v-if="!hasAccess" class="empty-state">
        <i class="fas fa-lock"></i>
        <p>Reports available for Admin, Manager, Team Leader</p>
      </div>
      <div v-else>
        <!-- KPI Grid -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-icon-wrap" style="background:rgba(21,101,192,.1);color:var(--primary)"><i class="fas fa-users"></i></div>
            <div class="kpi-val">{{ stats.total }}</div>
            <div class="kpi-lbl">Total Leads</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon-wrap" style="background:rgba(46,125,50,.1);color:var(--success)"><i class="fas fa-trophy"></i></div>
            <div class="kpi-val">{{ stats.won }}</div>
            <div class="kpi-lbl">Won <span class="kpi-trend trend-up">{{ stats.conv }}%</span></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon-wrap" style="background:rgba(230,81,0,.1);color:#E65100"><i class="fas fa-fire"></i></div>
            <div class="kpi-val">{{ stats.hot }}</div>
            <div class="kpi-lbl">Hot Leads</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon-wrap" style="background:rgba(198,40,40,.1);color:var(--danger)"><i class="fas fa-times-circle"></i></div>
            <div class="kpi-val">{{ stats.lost }}</div>
            <div class="kpi-lbl">Lost</div>
          </div>
        </div>

        <!-- Product Breakdown -->
        <div class="mob-card">
          <div class="mob-card-title" style="margin-bottom:10px">
            <i class="fas fa-box me-1" style="color:var(--primary)"></i> Product Breakdown
          </div>
          <div class="bar-chart-wrap">
            <div v-for="(v, i) in stats.barData" :key="i" class="bc-col">
              <div class="bc-pct">{{ stats.total ? Math.round((v / stats.total) * 100) : 0 }}%</div>
              <div class="bc-track">
                <div class="bc-fill" :style="{ height: Math.round((v / stats.maxBar) * 100) + '%' }"></div>
              </div>
              <div class="bc-lbl">{{ prodShort[i] }}</div>
            </div>
          </div>
        </div>

        <!-- Lead Category -->
        <div class="mob-card">
          <div class="mob-card-title" style="margin-bottom:10px">
            <i class="fas fa-fire me-1" style="color:#E65100"></i> {{ stats.categoryTitle || 'Lead Category' }}
          </div>
          <div v-for="cat in stats.catCounts" :key="cat.c" class="prog-row">
            <div class="prog-hd">
              <span class="prog-key">{{ cat.c }}</span>
              <span class="prog-val">{{ cat.n }} ({{ formatPercent(getCategoryPercent(cat)) }}%)</span>
            </div>
            <div class="prog-bar">
              <div class="prog-fill" :style="{ width: getCategoryPercent(cat) + '%', background: cat.col }"></div>
            </div>
          </div>
        </div>

        <!-- Lead Status -->
        <div class="mob-card">
          <div class="mob-card-title" style="margin-bottom:10px">
            <i class="fas fa-chart-pie me-1" style="color:#1e62d0"></i> {{ stats.leadStatusTitle || 'Lead Status' }}
          </div>
          <div v-for="(st, idx) in stats.leadStatusItems" :key="`${st.key}-${idx}`" class="prog-row">
            <div class="prog-hd">
              <span class="prog-key">{{ st.label }}</span>
              <span class="prog-val">{{ st.count }} ({{ formatPercent(st.percentage) }}%)</span>
            </div>
            <div class="prog-bar">
              <div class="prog-fill" :style="{ width: `${Math.max(0, Math.min(100, Number(st.percentage || 0)))}%`, background: statusColors[idx % statusColors.length] }"></div>
            </div>
          </div>
        </div>

        <!-- Payment Status -->
        <!-- <div class="mob-card">
          <div class="mob-card-title" style="margin-bottom:10px">
            <i class="fas fa-credit-card me-1" style="color:var(--primary)"></i> Payment Status
          </div>
          <div v-for="p in payStatuses" :key="p.name" style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid var(--bg);font-size:12px">
            <span style="font-weight:600">{{ p.name }}</span>
            <strong>{{ p.count }}</strong>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Auth } from '../services/auth'
import { Data } from '../services/data'
import { UI } from '../services/ui'

export default {
  setup() {
    const router = useRouter()
    const range = ref('all')
    const hasAccess = ref(false)
    const currentUser = ref(null)
    const stats = ref({
      total: 0,
      won: 0,
      lost: 0,
      hot: 0,
      conv: 0,
      barData: [],
      maxBar: 1,
      catCounts: [],
      categoryTitle: 'Lead Category',
      leadStatusTitle: 'Lead Status',
      leadStatusItems: []
    })
    const payStatuses = ref([])

    const products = ['Digital Business Card (V-Card)', 'WhatsApp Store', 'Custom Website & App', 'CRM / ERP / CMS / eCommerce Software', 'Digital Marketing', 'Other Services']
    const prodShort = ['V-Card', 'WA Store', 'Web/App', 'CRM/ERP', 'Mktg', 'Others']
    const paymentNames = ['Pay Today', 'Pay Tomorrow', 'Pay This Week', 'Pay Next Week', 'Pay Ignoring', 'Pay Lost']
    const statusColors = ['#2f65d5', '#1f3f93', '#e66a00', '#6d44ce', '#0d7a6a', '#2e7d32', '#c62828', '#ff6d00', '#3f51b5', '#616161']

    const getLocalLeadsForRange = () => {
      let leads = Data.getLeadsForUser(currentUser.value)
      const now = new Date()
      if (range.value === 'month') {
        leads = leads.filter(l => {
          const d = new Date(l.createdAt)
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
        })
      } else if (range.value === 'quarter') {
        const qs = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1)
        leads = leads.filter(l => new Date(l.createdAt) >= qs)
      }
      return leads
    }

    const applyLocalReport = () => {
      const leads = getLocalLeadsForRange()
      const total = leads.length
      const won = leads.filter(l => l.status === 'Won' || l.status === 'Close (Won)').length
      const lost = leads.filter(l => l.status === 'Lost').length
      const hot = leads.filter(l => l.leadCategory === 'Hot').length
      const conv = total ? Math.round((won / total) * 100) : 0
      const barData = products.map(p => leads.filter(l => l.product === p).length)
      const maxBar = Math.max(1, ...barData)
      const catCounts = [
        ['Hot', '#FF6D00'],
        ['Warm', '#E65100'],
        ['Solo', '#283593'],
        ['Cold', '#0277BD']
      ].map(([c, col]) => ({ c, col, n: leads.filter(l => l.leadCategory === c).length }))
      stats.value = {
        total,
        won,
        lost,
        hot,
        conv,
        barData,
        maxBar,
        catCounts,
        leadStatusTitle: 'Lead Status',
        leadStatusItems: catCounts.map((x) => ({
          key: String(x.c).toLowerCase(),
          label: x.c,
          count: x.n,
          percentage: total ? Math.round((x.n / total) * 100) : 0
        }))
      }
      payStatuses.value = paymentNames.map(name => ({
        name,
        count: leads.filter(l => l.paymentStatus === name).length
      }))
    }

    const applyApiReport = async () => {
      const api = await Data.getReportsData(range.value)
      if (!api) return

      const productBreakdown = api.productBreakdown || {}
      const categoryBreakdown = api.categoryBreakdown || {}
      const paymentBreakdown = api.paymentBreakdown || {}
      const barData = products.map(p => Number(productBreakdown[p] || 0))
      const maxBar = Math.max(1, ...barData)

      stats.value = {
        total: api.total,
        won: api.won,
        lost: api.lost,
        hot: api.hot,
        conv: api.conv,
        barData,
        maxBar,
        categoryTitle: api.categoryTitle || 'Lead Category',
        leadStatusTitle: api.leadStatusTitle || 'Lead Status',
        leadStatusItems: Array.isArray(api.leadStatusItems) ? api.leadStatusItems : [],
        catCounts: Array.isArray(api.categoryItems) && api.categoryItems.length
          ? api.categoryItems
          : [
              { c: 'Hot', col: '#FF6D00', n: Number(categoryBreakdown.Hot || 0), pct: 0 },
              { c: 'Warm', col: '#E65100', n: Number(categoryBreakdown.Warm || 0), pct: 0 },
              { c: 'Solo', col: '#283593', n: Number(categoryBreakdown.Solo || 0), pct: 0 },
              { c: 'Cold', col: '#0277BD', n: Number(categoryBreakdown.Cold || 0), pct: 0 }
            ]
      }

      payStatuses.value = paymentNames.map(name => ({
        name,
        count: Number(paymentBreakdown[name] || 0)
      }))
    }

    const getCategoryPercent = (cat) => {
      if (cat?.pct !== undefined && cat?.pct !== null && cat?.pct !== '') {
        const apiPct = Number(cat.pct)
        return Number.isFinite(apiPct) ? Math.max(0, Math.min(100, apiPct)) : 0
      }
      if (!stats.value.total) return 0
      const fallback = Math.round((Number(cat?.n || 0) / stats.value.total) * 100)
      return Math.max(0, Math.min(100, fallback))
    }

    const formatPercent = (value) => {
      const num = Number(value || 0)
      if (!Number.isFinite(num)) return '0'
      return num.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1')
    }

    const loadReports = async () => {
      if (!hasAccess.value) return
      applyLocalReport()
      await applyApiReport()
    }

    onMounted(async () => {
      const user = Auth.me()
      if (!user) {
        router.push('/login')
        return
      }
      currentUser.value = user

      if (Auth.can('view_reports', user.role)) {
        hasAccess.value = true
      }

      await Data.loadAll()
      await loadReports()
      UI.hideLoading()
    })
    
    watch(range, async () => {
      await loadReports()
    })

    return {
      range,
      hasAccess,
      stats,
      prodShort,
      payStatuses,
      getCategoryPercent,
      formatPercent,
      statusColors
    }
  }
}
</script>

<style scoped>
.bar-chart-wrap {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 6px;
  align-items: end;
}

.bc-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.bc-pct {
  font-size: 11px;
  font-weight: 700;
  color: #1f3f73;
  min-height: 14px;
}

.bc-track {
  width: 100%;
  height: 76px;
  border-radius: 6px;
  background: #edf3ff;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.bc-fill {
  width: 100%;
  background: #2568c2;
  border-radius: 6px 6px 0 0;
  min-height: 2px;
}

.bc-lbl {
  font-size: 9px;
  color: #4a5f81;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
}
</style>
