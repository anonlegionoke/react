import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('yellow')

//   function setColor(color) {
//   setColor(color)
// }

  return (
  <div className='w-full h-screen duration-200' style={{backgroundColor: color}}>  
      <div className='fixed flex flex-wrap justify-center inset-x-0 px-2 top-5'>
        <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-black text-white px-3 py-2 rounded-3xl'>
          <button onClick={() => setColor('blue')} className='outline-none px-4 py-1 bg-blue-500 rounded-full shadow-lg'>Blue</button>
          <button onClick={() => setColor('orange')} className='outline-none px-4 py-1 bg-orange-500 rounded-full shadow-lg'>Orange</button>
          <button onClick={() => setColor('green')} className='outline-none px-4 py-1 bg-green-500 rounded-full shadow-lg'>Green</button>
        </div>
      </div>
    </div>
  )
}

export default App
