// Week starts on Monday

export function getWeekDates(offsetWeeks = 0) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Find Monday of current week
  const day = today.getDay() // 0=Sun, 1=Mon...
  const diffToMonday = day === 0 ? -6 : 1 - day
  const monday = new Date(today)
  monday.setDate(today.getDate() + diffToMonday + offsetWeeks * 7)

  const days = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    days.push(d)
  }
  return days
}

export function toDateStr(date) {
  return date.toISOString().split('T')[0]
}

export function todayStr() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return toDateStr(d)
}

export function isFuture(date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date > today
}

export const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function formatMonthRange(days) {
  const first = days[0]
  const last = days[6]
  const opts = { month: 'short', day: 'numeric' }
  if (first.getMonth() === last.getMonth()) {
    return `${first.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
  }
  return `${first.toLocaleDateString('en-US', opts)} – ${last.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
}
