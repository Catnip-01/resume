import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InvoiceGenerator from './components/invoiceGenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <InvoiceGenerator />
  )
}

export default App
