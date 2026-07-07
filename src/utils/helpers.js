export function initials(name) {
  return (name || '')
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

export function fmtDate(d) {
  if (!d) return '—'
  try {
    return new Date(d).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  } catch (e) {
    return d
  }
}

export function today() {
  return new Date().toISOString().split('T')[0]
}

export function nowISO() {
  return new Date().toISOString().replace('T', ' ').substring(0, 16)
}

export function isBefore(d, ref) {
  return d && d < ref
}

export function isAfter(d, ref) {
  return d && d > ref
}

export function statusIcon(s) {
  const m = {
    Call: 'fa-phone',
    Email: 'fa-envelope',
    Meeting: 'fa-handshake',
    WhatsApp: 'fa-whatsapp'
  }
  return m[s] || 'fa-comment'
}
