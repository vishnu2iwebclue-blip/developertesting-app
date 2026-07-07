<template>
  <div class="login-wrap">
    <div class="login-logo"><i class="fas fa-chart-line"></i></div>
    <div class="login-title">CRM Pro Mobile</div>
    <div class="login-sub">Sales Pipeline Management</div>

    <div class="login-card">
      <div class="demo-title">Demo Credentials</div>
      <div class="demo-grid">
        <button class="demo-btn" :class="{ active: selectedDemo === 'Admin' }" @click="fillDemo('Admin', '', '')">
          Admin
        </button>
        <button class="demo-btn" :class="{ active: selectedDemo === 'Employee' }" @click="fillDemo('Employee', '', '')">
          Employee
        </button>
        <button class="demo-btn" :class="{ active: selectedDemo === 'Manager' }" @click="fillDemo('Manager', '', '')">
          Manager
        </button>
        <!-- <button class="demo-btn" @click="fillDemo('admin@seoaudit.com', 'password')">
          Coordinator
        </button> -->
      </div>

      <form @submit="submit">
        <div class="form-group">
          <label class="form-label">Email <span class="required-mark">*</span></label>
          <input
            v-model="email"
            id="login-email"
            type="email"
            class="form-control"
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Password <span class="required-mark">*</span></label>
          <div class="pwd-wrap">
            <input
              v-model="password"
              id="login-pass"
              :type="showPassword ? 'text' : 'password'"
              class="form-control"
              placeholder="••••••••"
            />
            <button
              type="button"
              class="pwd-eye"
              @click="togglePassword"
              title="Toggle password visibility"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <div v-if="error" class="login-error">{{ error }}</div>

        <button type="submit" class="btn-primary-crm w-full">
          <i class="fas fa-sign-in-alt me-1"></i> Sign In
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Auth } from '../services/auth'
import { Data } from '../services/data'
import { UI } from '../services/ui'

export default {
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const error = ref('')
    const selectedDemo = ref('')

    onMounted(() => {
      Data.loadAll().then(() => {
        if (Auth.me()) {
          router.push('/dashboard')
        }
        UI.hideLoading()
      })
    })

    const fillDemo = (role, em, pw) => {
      selectedDemo.value = role
      email.value = em
      password.value = pw
      error.value = ''
    }

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const submit = async (e) => {
      e.preventDefault()
      if (!email.value || !password.value) {
        error.value = 'Please enter email and password.'
        return
      }
      const r = await Auth.login(email.value, password.value)
      if (!r.ok) {
        error.value = r.msg
        return
      }
      if (selectedDemo.value && r.user?.role !== selectedDemo.value) {
        await Auth.logout()
        error.value = `Selected role is ${selectedDemo.value}. Please login with ${selectedDemo.value} account.`
        return
      }
      await Data.loadAll()
      router.push('/dashboard')
    }

    return {
      email,
      password,
      showPassword,
      error,
      selectedDemo,
      fillDemo,
      togglePassword,
      submit
    }
  }
}
</script>
<style>
.demo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 6px;
    margin-bottom: 16px;
}

.demo-btn.active {
  background: #2167bf;
  color: #fff;
  border-color: #2167bf;
}
</style>