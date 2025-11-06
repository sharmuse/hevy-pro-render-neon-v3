import { useState } from 'react'
import { post } from '../lib/api'
export default function Trainings(){
  const [studentId, setStudentId] = useState('')
  const [title, setTitle] = useState('Treino A')
  const [notes, setNotes] = useState('')
  const [ex, setEx] = useState([{ exercise_name:'Supino Reto', sets:4, reps:'8-10', rest:'01:30' }])
  const [out, setOut] = useState('')

  function add(){ setEx([...ex, { exercise_name:'', sets:3, reps:'10', rest:'01:00' }]) }
  function update(i,k,v){ const c=[...ex]; c[i][k]=v; setEx(c) }
  function remove(i){ const c=[...ex]; c.splice(i,1); setEx(c) }

  async function save(){
    const r = await post('/api/trainings', { studentId: Number(studentId), title, notes, exercises: ex })
    setOut(JSON.stringify(r,null,2))
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-3">Criar Treino (Professor)</h2>
      <div className="grid md:grid-cols-5 gap-2">
        <input className="input" placeholder="ID do aluno" value={studentId} onChange={e=>setStudentId(e.target.value)} />
        <input className="input" placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className="input col-span-2" placeholder="Notas" value={notes} onChange={e=>setNotes(e.target.value)} />
        <button className="btn" onClick={add}>+ Add exercício</button>
      </div>

      <div className="mt-4 space-y-2">
        {ex.map((row,i)=> (
          <div key={i} className="grid md:grid-cols-5 gap-2">
            <input className="input" placeholder="Exercício" value={row.exercise_name} onChange={e=>update(i,'exercise_name',e.target.value)} />
            <input className="input" placeholder="Séries" value={row.sets} onChange={e=>update(i,'sets',e.target.value)} />
            <input className="input" placeholder="Reps" value={row.reps} onChange={e=>update(i,'reps',e.target.value)} />
            <input className="input" placeholder="Descanso (mm:ss)" value={row.rest} onChange={e=>update(i,'rest',e.target.value)} />
            <button className="btn-secondary" onClick={()=>remove(i)}>Remover</button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2"><button className="btn" onClick={save}>Salvar treino</button></div>
      <pre className="mt-3 text-xs opacity-80 overflow-auto">{out}</pre>
    </div>
  )
}
