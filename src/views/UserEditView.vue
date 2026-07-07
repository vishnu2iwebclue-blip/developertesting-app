<template>
  <div class="page-content" v-if="loaded">
    <form @submit="save" id="user-edit-form" class="mob-card">
      <div class="form-section-hd">User Information</div>

      <div class="form-group">
        <label class="form-label">Full Name <span class="required-mark">*</span></label>
        <input v-model="form.name" type="text" name="name" class="form-control" placeholder="Full name" />
      </div>

      <div class="form-group">
        <label class="form-label">Email <span class="required-mark">*</span></label>
        <input v-model="form.email" type="email" name="email" class="form-control" placeholder="email@company.com" readonly />
      </div>

      <div class="form-group">
        <label class="form-label">Mobile</label>
        <input v-model="form.mobile" type="tel" name="mobile" class="form-control" placeholder="Mobile number" />
      </div>

      <!-- <div class="form-group">
        <label class="form-label">Password</label>
        <input v-model="form.password" type="password" name="password" class="form-control" placeholder="Leave blank to keep current password" />
      </div> -->

      <div class="form-group">
        <label class="form-label">Role <span class="required-mark">*</span></label>
        <select v-model="form.role" name="role" class="form-select">
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
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
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <!-- <div class="form-group">
        <label class="form-label">Joining Date</label>
        <input v-model="form.joiningDate" type="date" name="joiningDate" class="form-control" />
      </div> -->

      <button type="submit" class="btn-primary-crm w-full">
        <i class="fas fa-save me-1"></i> Update User
      </button>
    </form>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Auth } from '../services/auth'
import { Api } from '../services/api'
import { Data } from '../services/data'
import { UI } from '../services/ui'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const groups = ref([])
    const loaded = ref(false)

    const form = reactive({
      name: '',
      email: '',
      mobile: '',
      password: '',
      role: '',
      groupId: '',
      status: 'Active',
      joiningDate: ''
    })

    let id = ''
    let existingData = null

    onMounted(async () => {
      const user = Auth.me()
      if (!user) {
        router.push('/login')
        return
      }

      if (!Auth.can('edit_user', user.role)) {
        UI.toast('Access denied', 'error')
        router.push('/users')
        return
      }
      await Data.loadAll()

      id = route.query.id
      if (!id) {
        router.push('/users')
        return
      }

      const u = await Data.fetchUserById(id)
      if (!u) {
        UI.toast('User not found', 'error')
        router.push('/users')
        return
      }

      existingData = u
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

      // Pre-fill form
      Object.assign(form, u)
      // Password field should start blank for optional update
      form.password = ''
      loaded.value = true

      UI.hideLoading()
    })

    const save = (e) => {
      e.preventDefault()

      if (!form.name || !form.email || !form.role) {
        UI.toast('Fill required fields', 'error')
        return
      }

      const updatedUser = {
        ...existingData,
        ...form,
        id
      }
      if (String(form.password || '').trim()) {
        updatedUser.password = String(form.password).trim()
      } else {
        delete updatedUser.password
      }

      Data.upsert('users', updatedUser)

      UI.toast('User updated!', 'success')
      setTimeout(() => router.push('/users'), 800)
    }

    return {
      form,
      groups,
      loaded,
      save
    }
  }
}
</script>
