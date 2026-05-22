import { useState } from 'react'

export default function AddHabit({ onAdd }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!value.trim()) return
    onAdd(value)
    setValue('')
  }

  return (
    <form className="add-habit-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-habit-input"
        placeholder="Add a new habit…"
        value={value}
        onChange={e => setValue(e.target.value)}
        maxLength={60}
        aria-label="New habit name"
      />
      <button
        type="submit"
        className="add-habit-btn"
        aria-label="Add habit"
        disabled={!value.trim()}
      >
        <span aria-hidden="true">+</span> Add
      </button>
    </form>
  )
}
