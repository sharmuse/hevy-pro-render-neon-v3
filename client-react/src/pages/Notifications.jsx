import { useEffect, useState } from 'react'
import { get } from '../lib/api'
export default function Notifications(){
  const [rows, setRows] = useState(null)
  useEffect(()=>{ (async()=>{ setRows(await get('/api/notifications')||[]) })() },[])
  if(rows===null) return <div className="skeleton h-40"></div>
  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-3">Notificações</h2>
      <div className="space-y-2">
        {rows.map(n=> (<div key={n.id} className="p-3 rounded-xl border border-slate-800 bg-slate-900/60"><div className="text-sm opacity-70">{new Date(n.created_at).toLocaleString()}</div><div className="font-semibold">{n.type}</div><pre className="text-xs opacity-80 overflow-auto">{JSON.stringify(n.payload,null,2)}</pre></div>))}
        {rows.length===0 && <div className="opacity-70">Sem notificações.</div>}
      </div>
    </div>
  )
}
