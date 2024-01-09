import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-4xl text-white bg-purple-950 p-3 rounded-t'>Tailwind with Vite</h1>
    < Card username = "GOAT"/>
    <Card />
    <Card />

    </>
  )
}

export default App
