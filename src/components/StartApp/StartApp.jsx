"use client"

import { useState } from "react"
import img from "./Coff.jpg"
import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"

export default function StartApp() {
  const [isPressed, setIsPressed] = useState(false)
  
  const handlePress = () => {
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 1000)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen w-screen bg-[#1a0f0c] text-white relative overflow-hidden flex flex-col"
    >
      {/* Simplified steam particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-16 bg-gradient-to-t from-transparent via-[#c67c4e]/20 to-transparent rounded-full"
            initial={{ 
              x: `${35 + Math.random() * 30}%`,
              y: '100%',
              opacity: 0 
            }}
            animate={{
              y: '0%',
              opacity: [0, 0.2, 0],
              scale: [1, 1.5, 2],
              x: `${35 + Math.sin(i) * 30}%`
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Fixed background image without parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src={img}
          className="w-full h-full object-cover"
          alt="Premium coffee experience"
          style={{
            filter: "brightness(0.5) contrast(1.2)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80"></div>
      </div>

      {/* Content with adjusted padding and spacing */}
      <div className="relative z-30 flex-1 flex flex-col justify-between py-8 px-6">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between items-center"
        >
          <h2 className="text-2xl font-bold text-[#c67c4e]">CaféDelights</h2>
          <nav className="hidden md:flex gap-6">
            {["Menu", "About", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href="#"
                className="text-white/80 hover:text-[#c67c4e] transition-colors"
                whileHover={{ y: -2 }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
        </motion.header>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundImage: "linear-gradient(45deg, #ffffff, #c67c4e, #ffffff)",
              backgroundSize: "200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Experience Coffee
            <br />
            <span className="text-[#c67c4e]">Perfection</span>
          </motion.h1>

          <NavLink to="/Home/Drink">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#c67c4e] hover:bg-[#b8673f] px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-[#c67c4e]/20 transition-all duration-300"
              onClick={handlePress}
            >
              Begin Your Journey
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>
            </motion.button>
          </NavLink>
        </motion.div>

        <motion.footer
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-6"
        >
          {["Instagram", "Twitter", "Facebook"].map((social, i) => (
            <motion.a
              key={social}
              href="#"
              className="text-white/60 hover:text-[#c67c4e] transition-colors"
              whileHover={{ y: -2 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
            >
              {social}
            </motion.a>
          ))}
        </motion.footer>
      </div>
    </motion.div>
  )
}
