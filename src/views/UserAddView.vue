<template>
  <div class="page-content">
    <form @submit="save" id="user-add-form" class="mob-card">
      <div class="form-section-hd">User Information</div>

      <div class="form-group">
        <label class="form-label">Full Name <span class="required-mark">*</span></label>
        <input v-model="form.name" type="text" name="name" class="form-control" placeholder="Full name" />
      </div>

      <div class="form-group">
        <label class="form-label">Email <span class="required-mark">*</span></label>
        <input v-model="form.email" type="email" name="email" class="form-control" placeholder="email@company.com" />
      </div>

      <div class="form-group">
        <label class="form-label">Mobile</label>
        <input v-model="form.mobile" type="tel" name="mobile" class="form-control" placeholder="Mobile number" />
      </div>

      <div class="form-group">
        <label class="form-label">Password <span class="required-mark">*</span></label>
        <input v-model="form.password" type="password" name="password" class="form-control" placeholder="••••••••" />
      </div>

      <div class="form-group">
        <label class="form-label">Role <span class="required-mark">*</span></label>
        <select v-model="form.role" name="role" class="form-select">
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Group</label>
        <select v-model="form.groupId" class="form-select">
          <option value="">Select Group</option>
          <option v-for="g in groups" :key="g.id" :value="g.id">{{ g.name }}</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Status</label>
        <select v-model="form.status" name="status" class="form-select">
         <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
      </div>

      <!-- <div class="form-group">
        <label class="form-label">Joining Date</label>
        <input v-model="form.joiningDate" id="uf-joining" type="date" name="joiningDate" class="form-control" />
      </div> -->

      <button type="submit" class="btn-primary-crm w-full">
        <i class="fas fa-save me-1"></i> Add User
      </button>
    </form>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Auth } from '../services/auth'
import { Api } from '../services/api'
import { Data } from '../services/data'
import { UI } from '../services/ui'
import { today } from '../utils/helpers'

export default {
  setup() {
    const router = useRouter()
    const groups = ref([])

    const form = reactive({
      name: '',
      email: '',
      mobile: '',
      password: '',
      role: '',
      groupId: '',
      status: 'Active',
      joiningDate: today()
    })

    onMounted(async () => {
      const user = Auth.me()
      if (!user) {
        router.push('/login')
        return
      }

      if (!Auth.can('manage_users', user.role)) {
        UI.toast('Access denied', 'error')
        router.push('/users')
        return
      }

      await Data.loadAll()
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

      UI.hideLoading()
    })

    const save = (e) => {
      e.preventDefault()

      if (!form.name || !form.email || !form.password || !form.role) {
        UI.toast('Fill required fields', 'error')
        return
      }

      if (Data.getAll('users').find(u => u.email === form.email)) {
        UI.toast('Email already exists', 'error')
        return
      }

      const id = Data.nextUserId()

      Data.upsert('users', {
        id,
        empId: 'EMP' + id.replace('USR', ''),
        ...form,
        avatar: ''
      })

      UI.toast('User added!', 'success')
      setTimeout(() => router.push('/users'), 800)
    }

    return {
      form,
      groups,
      save
    }
  }
}
</script>
