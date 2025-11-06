export const API_URL = import.meta.env.VITE_API_URL || localStorage.getItem('api') || ''

export function setApi(url){
  localStorage.setItem('api', url)
  location.reload()
}

export function authHeader(){
  const t = localStorage.getItem('token')
  return t ? { Authorization: `Bearer ${t}` } : {}
}

export async function get(path){
  const r = await fetch(`${API_URL}${path}`, { headers: { ...authHeader() } })
  if (!r.ok) throw new Error(`GET ${path} ${r.status}`)
  return r.json()
}

export async function post(path, body){
  const r = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(body)
  })
  if (!r.ok) throw new Error(`POST ${path} ${r.status}`)
  return r.json()
}
