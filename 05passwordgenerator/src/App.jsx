import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+"

    for (let i = 1; i < length; i++){
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])


  useEffect(() => {
    generatePassword()

  }, [length, numberAllowed, charAllowed])

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  const passwordRef = useRef(null)

  return (
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800'>
  <h1 className='text-3xl font-bold mb-2 text-center text-white'>Password Generator</h1>
  <div className='flex shadow rounded-lg overflow-hidden mb-4'></div>
      <input
        type="text"
        value={password}
        className='outline-none w-80 py-1 px-3 rounded-lg'
        placeholder='Password'
        readOnly
        ref={passwordRef}
      
      /> 
      <button onClick={copyToClipboard} className='outline-none rounded-lg bg-blue-700 text-white mx-3 px-3 py-1 shrink-0'>Copy</button>
      <div flex text-sm gap-x-2>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            name=""
            id=""
          />
          <label htmlFor="length" className='text-white' >Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            name=""
            id="" />
          <label htmlFor="number" className='text-white' >Numbers</label>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
            name=""
            id="" />
          <label htmlFor="charInput" className='text-white' >Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
