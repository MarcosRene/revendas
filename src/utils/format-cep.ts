export function formatCep(zipCode?: string) {
  if (!zipCode) return

  return zipCode.replace(/^(\d{5})(\d+)/, '$1-$2')
}
