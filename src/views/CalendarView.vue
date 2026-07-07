<template>
  <div class="page-content">
    <div id="cal-widget" class="mob-card">
      <div class="cal-nav">
        <span>{{ monthName }}</span>
        <div>
          <button class="cal-nav-btn" @click="prevMonth"><i class="fas fa-chevron-left"></i></button>
          <button class="cal-nav-btn" @click="nextMonth"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
      <div class="cal-grid">
        <div v-for="d in ['S', 'M', 'T', 'W', 'T', 'F', 'S']" :key="d" class="cal-day-lbl">{{ d }}</div>
      </div>
      <div class="cal-grid" style="gap:2px">
        <div v-for="n in firstDay" :key="'empty-' + n"></div>
        <div 
          v-for="day in daysInMonthList" 
          :key="day.dateString"
          class="cal-date"
          :class="{ today: day.isToday, selected: day.isSelected && !day.isToday }"
          @click="selectDate(day.dateString)"
        >
          {{ day.dayNum }}
          <div v-if="day.hasEvent" class="cal-dot"></div>
          <div v-else style="height:3px"></div>
        </div>
      </div>
    </div>
    <div class="mob-card">
      <div id="cal-day-title" style="font-size: 13px; font-weight: 700; color: var(--primary); margin-bottom: 10px">
        {{ selectedDayLabel }}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:10px">
        <div class="chip" style="margin:0;padding:6px 10px">
          Followup: <strong>{{ followupEvents.length }}</strong>
        </div>
        <div class="chip" style="margin:0;padding:6px 10px">
          Meeting: <strong>{{ meetingEvents.length }}</strong>
        </div>
      </div>
      <div id="cal-events">
        <div v-if="!dayEvents.length" class="empty-state">
          <i class="fas fa-calendar"></i>
          <p>No events on this day</p>
        </div>
        <template v-else>
          <div style="font-size:12px;font-weight:700;color:#1B8F4D;margin:6px 0">Followup</div>
          <router-link
            v-for="l in followupEvents"
            :key="'f-' + l.id"
            :to="'/lead-details?id=' + l.id"
            class="fu-item"
          >
            <div class="fu-time">{{ l.nextCallTime || l.meetingTime || '—' }}</div>
            <div class="fu-info">
              <div class="fu-name">{{ l.clientName }}</div>
              <div class="fu-co">{{ l.product || '—' }} - {{ l.regarding || '—' }}</div>
            </div>
          </router-link>
          <div v-if="!followupEvents.length" style="font-size:11px;color:var(--muted);margin-bottom:8px">No followups.</div>

          <div style="font-size:12px;font-weight:700;color:#2f65d5;margin:8px 0 6px">Meeting</div>
          <router-link
            v-for="l in meetingEvents"
            :key="'m-' + l.id"
            :to="'/lead-details?id=' + l.id"
            class="fu-item"
          >
            <div class="fu-time">{{ l.nextCallTime || l.meetingTime || '—' }}</div>
            <div class="fu-info">
              <div class="fu-name">{{ l.clientName }}</div>
              <div class="fu-co">{{ l.product || '—' }} - {{ l.regarding || '—' }}</div>
            </div>
          </router-link>
          <div v-if="!meetingEvents.length" style="font-size:11px;color:var(--muted)">No meetings.</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Auth } from '../services/auth'
import { Data } from '../services/data'
import { UI } from '../services/ui'
import { today } from '../utils/helpers'

export default {
  setup() {
    const router = useRouter()
    const year = ref(new Date().getFullYear())
    const month = ref(new Date().getMonth())
    const selected = ref(today())
    const calendarDays = ref([])
    const dayEventsList = ref([])

    const loadMonth = async () => {
      const monthStr = `${year.value}-${String(month.value + 1).padStart(2, '0')}`
      const result = await Data.getCalendarMonthData(monthStr, selected.value)
      calendarDays.value = result.days || []
      dayEventsList.value = result.selectedItems || []
      if (result.selectedDate && result.selectedDate !== selected.value) {
        selected.value = result.selectedDate
      }
    }

    onMounted(async () => {
      const user = Auth.me()
      if (!user) {
        router.push('/login')
        return
      }

      await Data.loadAll()
      await loadMonth()
      UI.hideLoading()
    })

    watch([year, month], async () => {
      await loadMonth()
    })

    watch(selected, async () => {
      await loadMonth()
    })

    const monthName = computed(() => {
      return new Date(year.value, month.value, 1).toLocaleString('default', { month: 'long', year: 'numeric' })
    })

    const firstDay = computed(() => {
      return new Date(year.value, month.value, 1).getDay()
    })

    const daysInMonthList = computed(() => {
      if (calendarDays.value.length) {
        return calendarDays.value.map(day => ({
          dayNum: Number(day.day || 0),
          dateString: day.date,
          isToday: day.isToday || day.date === today(),
          isSelected: day.isSelected || day.date === selected.value,
          hasEvent: day.hasEvents || Number(day.totalEvents || 0) > 0
        }))
      }

      const y = year.value
      const m = month.value
      const daysCount = new Date(y, m + 1, 0).getDate()

      return Array.from({ length: daysCount }, (_, i) => {
        const d = i + 1
        const dateString = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
        return {
          dayNum: d,
          dateString,
          isToday: dateString === today(),
          isSelected: dateString === selected.value,
          hasEvent: false
        }
      })
    })

    const selectedDayLabel = computed(() => {
      const d = new Date(selected.value + 'T00:00:00')
      return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })
    })

    const dayEvents = computed(() => {
      return dayEventsList.value
        .filter(l => l.nextCallDate === selected.value || l.meetingDate === selected.value)
        .sort((a, b) => (a.nextCallTime || '').localeCompare(b.nextCallTime || ''))
    })

    const meetingEvents = computed(() => {
      return dayEvents.value.filter(l => {
        const mt = String(l.meetingType || '').toLowerCase()
        const regarding = String(l.regarding || '').toLowerCase()
        return mt === 'meeting' || regarding.includes('meeting') || regarding.includes('demo')
      })
    })

    const followupEvents = computed(() => {
      const meetingIds = new Set(meetingEvents.value.map(l => String(l.id)))
      return dayEvents.value.filter(l => !meetingIds.has(String(l.id)))
    })

    const selectDate = (d) => {
      selected.value = d
    }

    const prevMonth = () => {
      if (month.value === 0) {
        month.value = 11
        year.value--
      } else {
        month.value--
      }
    }

    const nextMonth = () => {
      if (month.value === 11) {
        month.value = 0
        year.value++
      } else {
        month.value++
      }
    }

    return {
      monthName,
      firstDay,
      daysInMonthList,
      selectedDayLabel,
      dayEvents,
      meetingEvents,
      followupEvents,
      selectDate,
      prevMonth,
      nextMonth
    }
  }
}
</script>
