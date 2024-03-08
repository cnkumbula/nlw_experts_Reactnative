export function formatCurrency(value: number) {
  return value.toLocaleString('pt-pt', {
    style: 'currency',
    currency: 'MZN'
  })
}