import { formatMonthRange } from '../hooks/useWeek'

export default function WeekNav({ weekOffset, weekDates, onPrev, onNext, onToday }) {
  const isCurrentWeek = weekOffset === 0

  return (
    <div className="week-nav" role="navigation" aria-label="Week navigation">
      <button
        className="nav-btn"
        onClick={onPrev}
        aria-label="Previous week"
      >
        ← Prev
      </button>

      <div className="week-label">
        <span className="week-range">{formatMonthRange(weekDates)}</span>
        {!isCurrentWeek && (
          <button
            className="today-btn"
            onClick={onToday}
            aria-label="Return to current week"
          >
            Back to today
          </button>
        )}
      </div>

      <button
        className="nav-btn"
        onClick={onNext}
        aria-label="Next week"
      >
        Next →
      </button>
    </div>
  )
}
