import { useState } from 'react'
import { post, setApi } from '../lib/api'
export default function Account(){
  const [api, apiSet] = useState(localStorage.getItem('api')||'')
  const [form, setForm] = useState({ role:'PROFESSOR', name:'', email:'', password:'' })
  const [login, setLogin] = useState({ email:'', password:'' })
  const [msg, setMsg] = useState('')

  async function register(){
    setMsg('...')
    const r = await post('/api/auth/register', form)
    if(r?.token){ localStorage.setItem('token', r.token); setMsg('Registrado!') } else { setMsg(r?.error||'Erro'); }
  }
  async function signin(){
    setMsg('...')
    const r = await post('/api/auth/login', login)
    if(r?.token){ localStorage.setItem('token', r.token); setMsg('Login ok!') } else { setMsg(r?.error||'Erro'); }
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-2">Conexão</h3>
        <div className="text-sm opacity-80 mb-2">Cole a URL da sua API (Render):</div>
        <input className="input" placeholder="https://seuapp.onrender.com" value={api} onChange={e=>apiSet(e.target.value)} />
        <button className="btn mt-2" onClick={()=> setApi(api)}>Salvar</button>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold mb-2">Registrar</h3>
        <select className="input" value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
          <option value="PROFESSOR">PROFESSOR</option>
          <option value="ALUNO">ALUNO</option>
        </select>
        <input className="input" placeholder="Nome" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <input className="input" placeholder="Senha (≥6)" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        <button className="btn mt-2" onClick={register}>Criar conta</button>
      </div>

      <div className="card md:col-span-2">
        <h3 className="text-lg font-bold mb-2">Login</h3>
        <div className="grid md:grid-cols-3 gap-2">
          <input className="input" placeholder="Email" value={login.email} onChange={e=>setLogin({...login, email:e.target.value})} />
          <input className="input" placeholder="Senha" type="password" value={login.password} onChange={e=>setLogin({...login, password:e.target.value})} />
          <button className="btn" onClick={signin}>Entrar</button>
        </div>
        <div className="mt-2 text-emerald-300">{msg}</div>
      </div>
    </div>
  )
}
