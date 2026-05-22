import { useState } from 'react'
import { useHabits } from './hooks/useHabits'
import { getWeekDates, toDateStr, todayStr, DAY_LABELS } from './hooks/useWeek'
import AddHabit from './components/AddHabit'
import HabitRow from './components/HabitRow'
import WeekNav from './components/WeekNav'
import EmptyState from './components/EmptyState'
import WeeklyStreakGraph from './components/WeeklyStreakGraph'

export default function App() {
  const [weekOffset, setWeekOffset] = useState(0)
  const { habits, addHabit, renameHabit, deleteHabit, toggleCheck, isChecked, getStreak } = useHabits()

  const weekDates = getWeekDates(weekOffset)
  const today = todayStr()

  const weeklyReport = weekDates.map((date) => {
    const dateStr = toDateStr(date)
    const totalCompleted = habits.reduce((sum, habit) => sum + (isChecked(habit.id, dateStr) ? 1 : 0), 0)
    return { date: dateStr, totalCompleted }
  })

  const topStreakHabit = habits.reduce((current, habit) => {
    const streak = getStreak(habit.id)
    if (streak <= 0) return current
    if (!current || streak > current.streak) {
      return { habit, streak }
    }
    return current
  }, null)

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-leading">
            <div className="logo-mark" aria-hidden="true">◆</div>
            <div>
              <h1 className="app-title">Habits</h1>
              <p className="app-subtitle">Build streaks. Stay consistent.</p>
            </div>
          </div>

          <div className="streak-highlight">
            {topStreakHabit ? (
              <>
                <span className="streak-label">TOP STREAK</span>
                <span className="streak-title"><span className="fire" aria-hidden="true">🔥</span>{topStreakHabit.habit.name}</span>
                <span className="streak-days">{topStreakHabit.streak} days</span>
              </>
            ) : (
              <span className="streak-label">No top streak yet</span>
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        <AddHabit onAdd={addHabit} />

        <section className="tracker-section" aria-label="Weekly habit tracker">
          <WeekNav
            weekOffset={weekOffset}
            weekDates={weekDates}
            onPrev={() => setWeekOffset(o => o - 1)}
            onNext={() => setWeekOffset(o => o + 1)}
            onToday={() => setWeekOffset(0)}
          />

          {habits.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="tracker-panel">
              <div className="grid-wrapper" role="grid" aria-label="Habit completion grid">
                {/* Column headers */}
                <div className="grid-header" role="row">
                  <div className="header-habit-col" role="columnheader">Habit</div>
                  {weekDates.map((date, i) => {
                    const dateStr = toDateStr(date)
                    const isToday = dateStr === today
                    return (
                      <div
                        key={dateStr}
                        className={`header-day-col ${isToday ? 'today' : ''}`}
                        role="columnheader"
                        aria-current={isToday ? 'date' : undefined}
                      >
                        <span className="day-label">{DAY_LABELS[i]}</span>
                        <span className="day-num">{date.getDate()}</span>
                      </div>
                    )
                  })}
                  <div className="header-streak-col" role="columnheader" aria-label="Streak">
                    🔥
                  </div>
                </div>

                {/* Habit rows */}
                <div className="grid-body">
                  {habits.map(habit => (
                    <HabitRow
                      key={habit.id}
                      habit={habit}
                      weekDates={weekDates}
                      isChecked={isChecked}
                      onToggle={toggleCheck}
                      onRename={renameHabit}
                      onDelete={deleteHabit}
                      streak={getStreak(habit.id)}
                    />
                  ))}
                </div>
              </div>

              <WeeklyStreakGraph
                data={weeklyReport}
                totalHabits={habits.length}
              />
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Click a habit name to rename it. Data is saved in your browser.</p>
      </footer>
    </div>
  )
}
