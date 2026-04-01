import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import InterviewRoom from './pages/InterviewRoom'
import Results from './pages/Results'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('mv-theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('mv-theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <Routes>
      <Route path="/" element={<Landing theme={theme} toggle={toggle} />} />
      <Route path="/dashboard" element={<Dashboard theme={theme} toggle={toggle} />} />
      <Route path="/interview" element={<InterviewRoom theme={theme} toggle={toggle} />} />
      <Route path="/results" element={<Results theme={theme} toggle={toggle} />} />
    </Routes>
  )
}
