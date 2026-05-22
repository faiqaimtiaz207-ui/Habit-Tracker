import { useState } from 'react'
import { toDateStr, isFuture, todayStr } from '../hooks/useWeek'

export default function HabitRow({ habit, weekDates, isChecked, onToggle, onRename, onDelete, streak }) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(habit.name)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const today = todayStr()

  function handleRenameSubmit(e) {
    e.preventDefault()
    onRename(habit.id, editValue)
    setEditing(false)
  }

  function handleRenameKeyDown(e) {
    if (e.key === 'Escape') {
      setEditValue(habit.name)
      setEditing(false)
    }
  }

  function handleDeleteClick() {
    setConfirmingDelete(true)
  }

  function confirmDelete() {
    onDelete(habit.id)
    setConfirmingDelete(false)
  }

  function cancelDelete() {
    setConfirmingDelete(false)
  }

  return (
    <div className="habit-row" role="row">
      {/* Habit name cell */}
      <div className="habit-name-cell" role="rowheader">
        {editing ? (
          <form onSubmit={handleRenameSubmit} className="rename-form">
            <input
              autoFocus
              className="rename-input"
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onKeyDown={handleRenameKeyDown}
              onBlur={handleRenameSubmit}
              maxLength={60}
              aria-label="Rename habit"
            />
          </form>
        ) : (
          <>
            <div className="habit-name-row">
              <button
                className="habit-name-btn"
                onClick={() => setEditing(true)}
                title="Click to rename"
                aria-label={`Rename habit: ${habit.name}`}
              >
                {habit.name}
              </button>
              <button
                className="delete-btn"
                onClick={handleDeleteClick}
                aria-label={`Delete habit: ${habit.name}`}
                title="Delete habit"
                type="button"
              >
                ×
              </button>
            </div>
            {confirmingDelete && (
              <div className="delete-confirmation" role="alertdialog" aria-label="Delete habit confirmation">
                <p>Delete <strong>{habit.name}</strong>?</p>
                <div className="confirm-actions">
                  <button type="button" className="confirm-btn" onClick={confirmDelete}>
                    Yes
                  </button>
                  <button type="button" className="cancel-btn" onClick={cancelDelete}>
                    No
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Day cells */}
      {weekDates.map(date => {
        const dateStr = toDateStr(date)
        const checked = isChecked(habit.id, dateStr)
        const isToday = dateStr === today
        const future = isFuture(date)

        return (
          <div
            key={dateStr}
            className={`day-cell ${isToday ? 'today' : ''} ${future ? 'future' : ''}`}
            role="gridcell"
          >
            <button
              className={`check-btn ${checked ? 'checked' : ''} ${future ? 'disabled' : ''}`}
              onClick={() => !future && onToggle(habit.id, dateStr)}
              disabled={future}
              aria-label={`${habit.name} on ${dateStr}: ${checked ? 'completed' : 'not completed'}`}
              aria-pressed={checked}
            >
              {checked && (
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M4 10.5L8.5 15L16 6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        )
      })}

      {/* Streak cell */}
      <div className="streak-cell" role="cell" aria-label={`${streak} day streak`}>
        <span className={`streak-badge ${streak > 0 ? 'active' : ''}`}>
          {streak > 0 ? (
            <>
              <span className="streak-fire" aria-hidden="true">🔥</span>
              <span className="streak-num">{streak}</span>
            </>
          ) : (
            <span className="streak-zero">—</span>
          )}
        </span>
      </div>
    </div>
  )
}
