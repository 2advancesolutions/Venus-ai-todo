import { useState, useEffect } from 'react'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import './App.css'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch comments from API on component mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const comments: Comment[] = await response.json()
        
        // Transform comments into todos
        const fetchedTodos: Todo[] = comments.map((comment) => ({
          id: comment.id,
          text: comment.name, // Using the comment name as the todo text
          completed: false,
        }))
        
        setTodos(fetchedTodos)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch comments'
        setError(errorMessage)
        console.error('Error fetching comments:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, []) // Empty dependency array means this runs once on mount

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(), // Using timestamp for manually added todos to avoid ID collision
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

        {loading && (
          <div className="loading-state">
            <p>⏳ Loading todos from API...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>❌ Error: {error}</p>
            <p>You can still add todos manually above.</p>
          </div>
        )}

        {!loading && !error && (
          <>
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
          </>
        )}
      </main>
    </div>
  )
}

export default App
