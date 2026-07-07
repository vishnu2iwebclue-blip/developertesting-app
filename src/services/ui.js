export const UI = {
  toast(msg, type = 'info') {
    const c = document.getElementById('toast-container')
    if (!c) return

    const d = document.createElement('div')
    d.className = `toast-item ${type}`
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-times-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    }
    d.innerHTML = `<i class="fas ${icons[type] || 'fa-info-circle'}"></i> ${msg}`
    c.appendChild(d)
    setTimeout(() => d.remove(), 2800)
  },

  confirm(title, msg, cb, btnTxt = 'Delete') {
    let ov = document.getElementById('confirm-ov')
    if (ov) ov.remove()
    ov = document.createElement('div')
    ov.className = 'confirm-overlay'
    ov.id = 'confirm-ov'
    ov.innerHTML = `<div class="confirm-card">
      <div class="confirm-title">${title}</div>
      <div class="confirm-msg">${msg}</div>
      <div style="display:flex;gap:8px">
        <button class="btn-outline-crm w-full" onclick="document.getElementById('confirm-ov').remove()">Cancel</button>
        <button class="btn-danger-crm w-full" id="confirm-yes-btn">${btnTxt}</button>
      </div>
    </div>`
    document.querySelector('.phone-frame')?.appendChild(ov)
    document.getElementById('confirm-yes-btn').onclick = () => {
      ov.remove()
      cb()
    }
  },

  showLoading() {
    const el = document.getElementById('loading-overlay')
    if (el) el.style.display = 'flex'
  },

  hideLoading() {
    const el = document.getElementById('loading-overlay')
    if (el) el.style.display = 'none'
  }
}

