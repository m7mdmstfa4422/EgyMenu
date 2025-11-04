import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export default function Nav() {
  const [cont, setcont] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // مزامنة cont مع المسار الحالي
    const path = location.pathname.toLowerCase()
    if (path.startsWith("/home")) setcont(0)
    else if (path.startsWith("/search")) setcont(1)
    else if (path.startsWith("/favorites")) setcont(2)
    else if (path.startsWith("/profile")) setcont(3)
  }, [location.pathname])

  const navItems = [
    {
      label: "Home",
      to: "/Home/Drink",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: "Search",
      to: "/Search",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      label: "Favorites",
      to: "/Favorites",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      label: "Profile",
      to: "/Profile",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* iOS 26 Style Frosted Glass Shelf */}
      <div
        aria-hidden="true"
        className="fixed left-0 right-0 bottom-0 -z-10 pointer-events-none"
        style={{
          height: 160,
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          background: `
            linear-gradient(
              180deg, 
              rgba(255, 255, 255, 0.72) 0%, 
              rgba(255, 255, 255, 0.52) 25%, 
              rgba(255, 255, 255, 0.38) 50%, 
              rgba(255, 255, 255, 0.24) 75%, 
              rgba(255, 255, 255, 0.12) 100%
            )
          `,
          borderTop: "1px solid rgba(255, 255, 255, 0.45)",
          boxShadow: `
            0 -16px 40px rgba(0, 0, 0, 0.08),
            0 -8px 24px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.35),
            inset 0 2px 8px rgba(255, 255, 255, 0.2)
          `,
          maskImage: "linear-gradient(to top, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 60%, transparent 100%)",
          transform: "translateZ(0)",
        }}
      />

      {/* Subtle Background Glow Effect */}
      <div
        aria-hidden="true"
        className="fixed left-0 right-0 bottom-0 -z-10 pointer-events-none"
        style={{
          height: 120,
          background: `
            radial-gradient(
              ellipse 80% 50% at 50% 100%,
              rgba(107, 74, 43, 0.03) 0%,
              rgba(107, 74, 43, 0.01) 40%,
              transparent 70%
            )
          `,
          transform: "translateZ(0)",
        }}
      />

      {/* Main Navigation Bar */}
      <div 
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[92%] max-w-sm bg-white/88 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 z-[9999] overflow-hidden"
        style={{
          backdropFilter: "blur(20px) saturate(200%)",
          WebkitBackdropFilter: "blur(20px) saturate(200%)",
          background: `
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.92) 0%,
              rgba(255, 255, 255, 0.84) 50%,
              rgba(255, 255, 255, 0.76) 100%
            )
          `,
          boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.12),
            0 8px 32px rgba(0, 0, 0, 0.08),
            0 4px 16px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            inset 0 -1px 0 rgba(255, 255, 255, 0.3)
          `,
        }}
      >
        <div className="flex justify-around items-center py-2 px-3 bg-transparent rounded-3xl">
          {navItems.map((item, index) => {
            const path = location.pathname.toLowerCase()
            const target = (item.to || "").toLowerCase()
            const isActive =
              (item.label === "Home" && path.startsWith("/home")) ||
              (item.label === "Favorites" && path.startsWith("/favorites")) ||
              path === target

            return (
              <button
                key={index}
                onClick={() => {
                  navigate(item.to)
                  setcont(index)
                }}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-400 ease-out group min-w-[64px] ${
                  isActive
                    ? "text-[#6B4A2B] bg-gradient-to-b from-orange-50/90 to-amber-50/70 shadow-sm"
                    : "text-gray-500 hover:text-[#6B4A2B] hover:bg-white/60"
                }`}
                style={{
                  transition: "all 0.4s cubic-bezier(0.2, 0.9, 0.2, 1)",
                }}
              >
                {/* Active Item Background */}
                {isActive && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-orange-50/80 to-amber-50/60 rounded-2xl shadow-inner"
                    style={{
                      boxShadow: "inset 0 2px 8px rgba(255, 255, 255, 0.6), inset 0 -1px 4px rgba(107, 74, 43, 0.05)"
                    }}
                  />
                )}

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#6b4a2b08] to-[#b8957310] opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-500"></div>

                {/* Active Dot Indicator */}
                {isActive && (
                  <div 
                    className="absolute -top-1 right-4 w-2 h-2 bg-gradient-to-r from-[#B89573] to-[#6B4A2B] rounded-full shadow-sm"
                    style={{
                      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  />
                )}

                {/* Icon */}
                <div
                  className={`relative z-10 transition-all duration-400 ${
                    isActive 
                      ? "text-[#6B4A2B] scale-110 drop-shadow-sm" 
                      : "text-gray-400 group-hover:text-[#6B4A2B] group-hover:scale-110"
                  }`}
                  style={{
                    transition: "all 0.4s cubic-bezier(0.2, 0.9, 0.2, 1)",
                  }}
                >
                  {item.icon}
                </div>

                {/* Label */}
                <span
                  className={`text-xs mt-1.5 relative z-10 font-semibold transition-all duration-400 ${
                    isActive 
                      ? "text-[#6B4A2B] scale-105" 
                      : "text-gray-500 group-hover:text-[#6B4A2B] group-hover:scale-105"
                  }`}
                  style={{
                    transition: "all 0.4s cubic-bezier(0.2, 0.9, 0.2, 1)",
                  }}
                >
                  {item.label}
                </span>

                {/* Active Bottom Line */}
                {isActive && (
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-[#B89573] to-[#6B4A2B] rounded-t-full shadow-sm"
                    style={{
                      boxShadow: "0 -2px 8px rgba(184, 149, 115, 0.3)",
                    }}
                  />
                )}

                {/* Tap Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-active:border-[#6B4A2B]/15 transition-all duration-150"></div>
              </button>
            )
          })}
        </div>

        {/* Subtle Glow Effect */}
        <div 
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#B89573]/8 via-transparent to-[#6B4A2B]/8 pointer-events-none"
          style={{
            mixBlendMode: "multiply",
          }}
        />

        {/* Reflective Border */}
        <div 
          className="absolute inset-0 rounded-3xl border border-white/50 pointer-events-none"
          style={{
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(255, 255, 255, 0.3)",
          }}
        />
      </div>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </>
  )
}