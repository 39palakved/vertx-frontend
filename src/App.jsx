import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TransferList from './transferlist/Component/TransferList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <TransferList/>
    </>
  )
}

export default App
