// client-react/src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from "./components/Nav"
import Dashboard from "./pages/Dashboard"
import Alunos from "./pages/Alunos"
import "./styles.css"

export default function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Nav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alunos" element={<Alunos />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
