import { useState, FormEvent } from 'react'
import './TodoInput.css'

interface TodoInputProps {
  onAdd: (text: string) => void
}

function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedText = text.trim()
    
    if (trimmedText) {
      onAdd(trimmedText)
      setText('')
    }
  }

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="New todo"
      />
      <button type="submit" className="add-button" aria-label="Add todo">
        + Add
      </button>
    </form>
  )
}

export default TodoInput
