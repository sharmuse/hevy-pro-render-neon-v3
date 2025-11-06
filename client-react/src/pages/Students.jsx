import { useEffect, useState } from 'react'
import { get } from '../lib/api'
export default function Students(){
  const [rows, setRows] = useState(null)
  useEffect(()=>{ (async()=>{ const data = await get('/api/students'); setRows(data || []) })() },[])
  if(rows===null) return <div className="skeleton h-40"></div>
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3"><h2 className="text-xl font-bold">Alunos</h2><span className="opacity-70">{rows.length} alunos</span></div>
      <div className="grid md:grid-cols-2 gap-3">
        {rows.map(s=> (<div key={s.id} className="p-3 rounded-xl border border-slate-800 bg-slate-900/60"><div className="font-semibold">{s.name}</div><div className="opacity-70 text-sm">{s.email}</div></div>))}
        {rows.length===0 && <div className="opacity-70">Nenhum aluno encontrado.</div>}
      </div>
    </div>
  )
}
