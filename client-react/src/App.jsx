import React from 'react'
import { motion } from 'framer-motion'
export default function App(){
  return (
    <main className="max-w-3xl mx-auto py-16 px-6">
      <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.4}} className="text-2xl font-bold">
        Hevy Pro — Frontend OK ✅
      </motion.h1>
      <p className="mt-3 opacity-80">
        Scaffold mínimo para validar build na Vercel.
      </p>
    </main>
  )
}
