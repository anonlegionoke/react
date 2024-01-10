import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoProvider } from './contexts'
import { TodoForm } from './components'
import {TodoItem} from './components'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id, todo) => {
    // // Looping through all the todos to FIND that one we need
    // need to update 
    // use prev/alltodos, whatever you like
    setTodos((prev) => prev.map((findTodo) => findTodo.id === todo.id ? todo : findTodo))
  }

  const deleteTodo = (id) => {
    // Loop through all the todos, and FIND the one we need to delete
    // Various methods, but here we are using the filter method to get all the
    // todos except the one we need to delete, that will automatically get rid 
    // of the one we do not need.
    setTodos ((alltodos) => alltodos.filter((findTodo) => findTodo.id !== id))
  }

  const markTodo = (id) => {
   /* Loop through all todos to find the todo we
   need to mark as completed */
    setTodos((alltodos) => 
      alltodos.map((findTodo) =>
        findTodo.id === id ? {...findTodo, completed: !findTodo.completed} : findTodo
      )
    )
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, []) 

  useEffect(() => {
   (localStorage.setItem("todos", JSON.stringify(todos)))
  },[todos])

  return (
    <>
        <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, markTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
    </>
  )
}

export default App
