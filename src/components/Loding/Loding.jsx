"use client"

export default function Loading() {
  return (
    <div className="flex mt-14  justify-center min-h-screen">
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40">
        {/* Outer rotating circle */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#c67c4e] border-r-[#c67c4e] animate-spin-slow"></div>

        {/* Middle rotating circle */}
        <div className="absolute inset-3 rounded-full border-3 border-transparent border-b-[#c67c4e] border-l-[#c67c4e] animate-spin-reverse"></div>

        {/* Inner circle */}
        <div className="absolute inset-6 rounded-full border-2 border-[#c67c4e]/30 flex items-center justify-center">
         
        </div>

        <style jsx>{`
          @keyframes spinSlow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes spinReverse {
            from {
              transform: rotate(360deg);
            }
            to {
              transform: rotate(0deg);
            }
          }
          .animate-spin-slow {
            animation: spinSlow 8s linear infinite;
          }
          .animate-spin-reverse {
            animation: spinReverse 6s linear infinite;
          }
        `}</style>
      </div>
    </div>
  )
}