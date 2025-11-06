import { motion, AnimatePresence } from 'framer-motion'
export default function Toast({ items }){
  return (
    <div className="toast">
      <AnimatePresence>
        {items.map((t)=> (
          <motion.div key={t.id} initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}} className="toast-item">
            <div className="font-semibold">{t.title}</div>
            {t.desc && <div className="text-sm opacity-80">{t.desc}</div>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
