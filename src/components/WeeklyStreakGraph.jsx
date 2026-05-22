import { DAY_LABELS } from '../hooks/useWeek'

export default function WeeklyStreakGraph({ data, totalHabits }) {
  return (
    <aside className="streak-report" aria-label="Weekly habit streak report">
      <div className="streak-report-header">
        <div>
          <p className="streak-report-title">Weekly streak report</p>
          <p className="streak-report-meta">Live weekly completion summary</p>
        </div>
        <div className="streak-report-meta">{totalHabits} habit{totalHabits === 1 ? '' : 's'}</div>
      </div>

      <div className="streak-bars" role="list" aria-label="Daily completion bars for current week">
        {data.map((day, index) => {
          const fillPercent = totalHabits > 0 ? Math.round((day.totalCompleted / totalHabits) * 100) : 0
          return (
            <div key={day.date} className="streak-bar" role="listitem">
              <span className="streak-bar-value">{day.totalCompleted}/{totalHabits}</span>
              <div className="streak-bar-track" aria-hidden="true">
                <div
                  className="streak-bar-fill"
                  style={{ height: `${fillPercent}%` }}
                />
              </div>
              <span className="streak-bar-label">{DAY_LABELS[index]}</span>
            </div>
          )
        })}
      </div>

      <div className="streak-report-footer">
        <span>Bars show the share of habits completed each day this week.</span>
      </div>
    </aside>
  )
}
