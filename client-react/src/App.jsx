import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Nav from "./components/Nav"
import Dashboard from "./pages/Dashboard"
import Alunos from "./pages/Alunos"
import Treinos from "./pages/Treinos"
import Notificacoes from "./pages/Notificacoes"
import Conta from "./pages/Conta"

function Shell() {
  const location = useLocation()
  const navigate = useNavigate()
  const [tab, setTab] = useState("dashboard")

  // Sincroniza tab com rota ao carregar/navegar
  useEffect(() => {
    const p = location.pathname
    if (p === "/") setTab("dashboard")
    else setTab(p.replace("/", "")) // "/alunos" -> "alunos"
  }, [location.pathname])

  // ao clicar numa aba, muda rota e estado
  const onChangeTab = (k) => {
    setTab(k)
    navigate(k === "dashboard" ? "/" : `/${k}`)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav tab={tab} setTab={onChangeTab} />
      <main className="p-6 max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/trainings" element={<Treinos />} />
          <Route path="/notifications" element={<Notificacoes />} />
          <Route path="/account" element={<Conta />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
