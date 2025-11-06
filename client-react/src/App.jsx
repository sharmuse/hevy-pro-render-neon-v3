import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { io } from 'socket.io-client'
import Nav from './components/Nav.jsx'
import Toast from './components/Toast.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Students from './pages/Students.jsx'
import Trainings from './pages/Trainings.jsx'
import Notifications from './pages/Notifications.jsx'
import Account from './pages/Account.jsx'
import { API_URL } from './lib/api.js'

export default function App(){
  const [tab, setTab] = useState('dashboard')
  const [events, setEvents] = useState([])
  const [toasts, setToasts] = useState([])

  useEffect(()=>{
    const api = API_URL || localStorage.getItem('api')
    if(!api) return
    const s = io(api, { transports:['websocket'] })
    const t = localStorage.getItem('token')
    if(t){ s.emit('auth', t) }
    s.on('notification', (ev)=> {
      setEvents(prev=>[ev,...prev].slice(0,10))
      pushToast({ title: 'Notificação', desc: ev?.type || 'Nova notificação' })
    })
    return ()=> s.disconnect()
  },[])

  function pushToast(t){
    const id = crypto.randomUUID()
    const item = { id, ...t }
    setToasts(prev=>[item, ...prev])
    setTimeout(()=> setToasts(prev=>prev.filter(x=>x.id!==id)), 4000)
  }

  return (
    <div>
      <Nav tab={tab} setTab={setTab} />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        {tab==='dashboard' && <Dashboard />}
        {tab==='students' && <Students />}
        {tab==='trainings' && <Trainings />}
        {tab==='notifications' && <Notifications />}
        {tab==='account' && <Account />}

        {events.length>0 && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="card border-emerald-700/40">
            <div className="text-sm opacity-80 mb-1">Notificações em tempo real</div>
            <pre className="text-xs">{JSON.stringify(events,null,2)}</pre>
          </motion.div>
        )}
      </main>

      <footer className="text-center text-xs opacity-60 py-6">
        Team Araújo Hevy Pro — interface React/Tailwind — pronta para Vercel
      </footer>

      <Toast items={toasts} />
    </div>
  )
}

