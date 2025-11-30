import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/card.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App bg-white min-h-screen">
    <NavBar />
    
    <Footer/>
      
    
    </div>
  )
}

export default App
