export function formatPhone(phone?: string) {
  if (!phone) return

  if (phone.length === 11) {
    return phone
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  if (phone.length === 10) {
    return phone
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
}
