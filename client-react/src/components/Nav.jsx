import { motion } from "framer-motion"
import { Users, Dumbbell, Bell, Gauge, User } from "lucide-react"

export default function Nav({ tab, setTab }) {
  const tabs = [
    ["dashboard", "Dashboard", Gauge],
    ["students", "Alunos", Users],
    ["trainings", "Treinos", Dumbbell],
    ["notifications", "Notificações", Bell],
    ["account", "Conta", User],
  ]

  return (
    <nav className="nav border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="text-xl font-extrabold">
          Team Araújo <span className="text-emerald-400">Hevy Pro</span>
        </div>

        <div className="ml-auto flex gap-1">
          {tabs.map(([k, label, Icon]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`relative px-3 py-2 rounded-xl flex items-center gap-2 ${
                tab === k
                  ? "text-emerald-300"
                  : "text-slate-300 hover:text-emerald-300"
              }`}
            >
              <Icon size={18} />
              {tab === k && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 bg-emerald-500/10 rounded-xl"
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
