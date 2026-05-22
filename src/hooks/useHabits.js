import { useState, useCallback } from 'react'

const STORAGE_KEY = 'habit-tracker-data'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { habits: [], checks: {} }
    return JSON.parse(raw)
  } catch {
    return { habits: [], checks: {} }
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // storage full or unavailable
  }
}

export function useHabits() {
  const [data, setData] = useState(() => loadFromStorage())

  const update = useCallback((updater) => {
    setData(prev => {
      const next = updater(prev)
      saveToStorage(next)
      return next
    })
  }, [])

  const addHabit = useCallback((name) => {
    const trimmed = name.trim()
    if (!trimmed) return
    update(prev => ({
      ...prev,
      habits: [
        ...prev.habits,
        { id: crypto.randomUUID(), name: trimmed, createdAt: Date.now() }
      ]
    }))
  }, [update])

  const renameHabit = useCallback((id, newName) => {
    const trimmed = newName.trim()
    if (!trimmed) return
    update(prev => ({
      ...prev,
      habits: prev.habits.map(h => h.id === id ? { ...h, name: trimmed } : h)
    }))
  }, [update])

  const deleteHabit = useCallback((id) => {
    update(prev => {
      const checks = { ...prev.checks }
      // Remove all checks for this habit
      Object.keys(checks).forEach(key => {
        if (key.startsWith(id + ':')) delete checks[key]
      })
      return {
        habits: prev.habits.filter(h => h.id !== id),
        checks
      }
    })
  }, [update])

  const toggleCheck = useCallback((habitId, dateStr) => {
    const key = `${habitId}:${dateStr}`
    update(prev => ({
      ...prev,
      checks: {
        ...prev.checks,
        [key]: !prev.checks[key]
      }
    }))
  }, [update])

  const isChecked = useCallback((habitId, dateStr) => {
    return !!data.checks[`${habitId}:${dateStr}`]
  }, [data.checks])

  // Streak = consecutive days completed up to and including today
  // If today is unchecked, streak still counts up to yesterday
  const getStreak = useCallback((habitId) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    let streak = 0
    let cursor = new Date(today)

    // Check today first; if not checked, start from yesterday
    const todayStr = cursor.toISOString().split('T')[0]
    if (!data.checks[`${habitId}:${todayStr}`]) {
      cursor.setDate(cursor.getDate() - 1)
    }

    while (true) {
      const dateStr = cursor.toISOString().split('T')[0]
      if (!data.checks[`${habitId}:${dateStr}`]) break
      streak++
      cursor.setDate(cursor.getDate() - 1)
    }

    return streak
  }, [data.checks])

  return {
    habits: data.habits,
    addHabit,
    renameHabit,
    deleteHabit,
    toggleCheck,
    isChecked,
    getStreak,
  }
}
