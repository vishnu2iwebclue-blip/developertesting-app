import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import InsightListView from '../views/InsightListView.vue'
import LeadsView from '../views/LeadsView.vue'
import LeadDetailsView from '../views/LeadDetailsView.vue'
import LeadAddView from '../views/LeadAddView.vue'
import LeadEditView from '../views/LeadEditView.vue'
import LeadAssignView from '../views/LeadAssignView.vue'
import LeadCommView from '../views/LeadCommView.vue'
import CalendarView from '../views/CalendarView.vue'
import ReportsView from '../views/ReportsView.vue'
import UsersView from '../views/UsersView.vue'
import UserDetailsView from '../views/UserDetailsView.vue'
import UserAddView from '../views/UserAddView.vue'
import UserEditView from '../views/UserEditView.vue'

export default [
  { path: '/login', component: LoginView },
  { path: '/dashboard', component: DashboardView },
  { path: '/insight-list', component: InsightListView },
  { path: '/leads', component: LeadsView },
  { path: '/lead-details', component: LeadDetailsView },
  { path: '/lead-add', component: LeadAddView },
  { path: '/lead-edit', component: LeadEditView },
  { path: '/lead-assign', component: LeadAssignView },
  { path: '/lead-comm', component: LeadCommView },
  { path: '/calendar', component: CalendarView },
  { path: '/reports', component: ReportsView },
  { path: '/users', component: UsersView },
  { path: '/user-details', component: UserDetailsView },
  { path: '/user-add', component: UserAddView },
  { path: '/user-edit', component: UserEditView },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
]
