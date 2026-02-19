import { useState } from 'react'
import { Todo } from '../App'
import './TodoItem.css'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, newText: string) => void
}

function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    const trimmedText = editText.trim()
    if (trimmedText && trimmedText !== todo.text) {
      onEdit(todo.id, trimmedText)
    } else if (!trimmedText) {
      setEditText(todo.text)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      setEditText(todo.text)
      setIsEditing(false)
    }
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      
      {isEditing ? (
        <input
          type="text"
          className="todo-edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          autoFocus
          aria-label="Edit todo"
        />
      ) : (
        <span
          className="todo-text"
          onDoubleClick={() => !todo.completed && setIsEditing(true)}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}
      
      <div className="todo-actions">
        {!isEditing && !todo.completed && (
          <button
            className="action-button edit-button"
            onClick={() => setIsEditing(true)}
            aria-label="Edit todo"
            title="Edit"
          >
            ✏️
          </button>
        )}
        <button
          className="action-button delete-button"
          onClick={() => onDelete(todo.id)}
          aria-label="Delete todo"
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </li>
  )
}

export default TodoItem
