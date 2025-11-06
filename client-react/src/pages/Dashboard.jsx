export default function Dashboard(){
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card"><div className="text-sm opacity-70">Status</div><div className="text-2xl font-bold">Online</div><div className="opacity-70 text-sm">API + Socket prontos.</div></div>
      <div className="card"><div className="text-sm opacity-70">Alunos</div><div className="text-2xl font-bold">—</div></div>
      <div className="card"><div className="text-sm opacity-70">Treinos</div><div className="text-2xl font-bold">—</div></div>
    </div>
  )
}
