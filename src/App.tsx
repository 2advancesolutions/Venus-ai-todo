import { useState } from 'react'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import './App.css'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Venus Todo List</h1>
        <p className="subtitle">Stay organized, stay productive</p>
      </header>
      
      <main className="app-main">
        <TodoInput onAdd={addTodo} />
        
        <div className="stats">
          <span className="stat-item">
            Total: <strong>{todos.length}</strong>
          </span>
          <span className="stat-item">
            Active: <strong>{todos.filter(t => !t.completed).length}</strong>
          </span>
          <span className="stat-item">
            Completed: <strong>{todos.filter(t => t.completed).length}</strong>
          </span>
        </div>

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
        
        {todos.length === 0 && (
          <div className="empty-state">
            <p>🎉 No todos yet! Add one above to get started.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
