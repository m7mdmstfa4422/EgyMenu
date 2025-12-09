"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Loading from "../Loding/Loding"

export default function Peef() {
  const [dataBeef, setDataBeef] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // favorites UI state
  const [favIds, setFavIds] = useState([])
  const [flashId, setFlashId] = useState(null)
  const flashTimer = useRef(null)
  const STORAGE_KEY = "favorites_v1"

  useEffect(() => {
    let isMounted = true
    document.title = "Dessert Delights - Café Menu"
    const getBeef = async () => {
      try {
        setLoading(true)
        setError(null)
        const { data } = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=beef")
        if (isMounted) {
          setDataBeef(data?.meals || [])
          console.log("✅ API response:", data)
        }
      } catch (err) {
        console.error("❌ Error fetching Beef data:", err)
        if (isMounted) setError("حدث خطأ أثناء تحميل البيانات")
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    getBeef()

    return () => {
      isMounted = false
      if (flashTimer.current) clearTimeout(flashTimer.current)
    }
  }, [])

  useEffect(() => {
    // load favorite ids on mount and listen for updates
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    setFavIds(stored.map(f => String(f.id)))

    const onUpdate = () => {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
      setFavIds(s.map(f => String(f.id)))
    }
    window.addEventListener("favorites-updated", onUpdate)
    window.addEventListener("storage", onUpdate)
    return () => {
      window.removeEventListener("favorites-updated", onUpdate)
      window.removeEventListener("storage", onUpdate)
      if (flashTimer.current) clearTimeout(flashTimer.current)
    }
  }, [])

  function addToFavorites(item) {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    const idStr = String(item?.idMeal)
    const exists = stored.find(f => String(f.id) === idStr)
    if (exists) {
      const newFavs = stored.filter(f => String(f.id) !== idStr)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs))
      setFavIds(newFavs.map(f => String(f.id)))
      window.dispatchEvent(new CustomEvent("favorites-updated"))
      setFlashId(idStr)
      if (flashTimer.current) clearTimeout(flashTimer.current)
      flashTimer.current = setTimeout(() => setFlashId(null), 450)
      return
    }

    const toSave = {
      id: item.idMeal,
      name: item.strMeal,
      img: item.strMealThumb,
      price: "12.99"
    }
    const newFavs = [toSave, ...stored]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs))
    setFavIds(newFavs.map(f => String(f.id)))
    window.dispatchEvent(new CustomEvent("favorites-updated"))

    setFlashId(idStr)
    if (flashTimer.current) clearTimeout(flashTimer.current)
    flashTimer.current = setTimeout(() => setFlashId(null), 450)
  }

  if (loading) return <Loading />
  if (error) return <p className="text-center text-red-500">{error}</p>
  if (!dataBeef || dataBeef.length === 0) return <p className="text-center text-gray-500">لا توجد بيانات.</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-6 place-items-center">
      {dataBeef.map((item) => {
        const idStr = String(item?.idMeal)
        const isFav = favIds.includes(idStr)
        const isFlashing = flashId === idStr

        return (
          <div
            key={item?.idMeal}
            className="product-card group relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-[#F9F6F1] bg-white shadow-lg"
            style={{
              transition: "transform 420ms cubic-bezier(.2,.9,.2,1), box-shadow 420ms cubic-bezier(.2,.9,.2,1), opacity 320ms ease",
              willChange: "transform, opacity"
            }}
          >
            {/* Product Image */}
            <div className="relative mx-4 mt-4 flex h-60 overflow-hidden rounded-xl sm:h-72 md:h-80 bg-gradient-to-br from-[#4A2318]/10 to-[#7B3F32]/10" style={{ transition: "box-shadow 420ms ease" }}>
              <img
                className="product-image w-full object-cover"
                src={item?.strMealThumb || "/placeholder.svg"}
                alt={item?.strMeal}
                loading="lazy"
                style={{ transition: "transform 700ms cubic-bezier(.2,.9,.2,1), filter 420ms ease", willChange: "transform" }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 overlay opacity-40 mix-blend-multiply" />

              {/* Discount Badge */}
              <span className="badge absolute top-3 left-3 rounded-full px-3 py-1 text-sm font-semibold text-white shadow-lg">
                39% OFF
              </span>

              {/* Wishlist Button */}
              <button
                onClick={() => addToFavorites(item)}
                aria-pressed={isFav}
                aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
                className={
                  "wishlist-btn absolute top-3 right-3 rounded-full p-2 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#B86B4A] focus:ring-offset-2"
                }
                style={{ transition: "transform 240ms cubic-bezier(.2,.9,.2,1), background-color 240ms ease, box-shadow 240ms ease" }}
              >
                {isFav ? (
                  <svg className={"h-5 w-5 transition-transform " + (isFlashing ? "flash" : "")} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21s-7-4.35-9-7.5A5.5 5.5 0 016 4a6 6 0 0110 0 5.5 5.5 0 013 9.5C19 16.65 12 21 12 21z" />
                  </svg>
                ) : (
                  <svg className={"h-5 w-5 transition-colors " + (isFlashing ? "flash" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )}
              </button>

              {/* Quick View Overlay */}
              <div className="quick-view absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 translate-y-4">
                <button
                  onClick={() => navigate(`/product/${item?.idMeal}`)}
                  className="rounded-full bg-[#4A2318] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#B86B4A] focus:ring-offset-2"
                >
                  Quick View
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="mt-4 px-4 pb-4 sm:mt-6 sm:px-6 sm:pb-6">
              <div
                className="block focus:outline-none focus:ring-2 focus:ring-[#B86B4A] focus:ring-offset-2 rounded-lg p-2 -m-2 cursor-pointer"
                onClick={() => navigate(`/product/${item?.idMeal}`)}
              >
                <h3 className="text-xl font-bold text-[#2B2B2B] transition-colors group-hover:text-[#7B3F32] sm:text-2xl">
                  {item?.strMeal}
                </h3>
                <p className="mt-1 text-sm text-[#B86B4A] font-medium">Charred to Perfection</p>
              </div>

              {/* Rating */}
              <div className="mt-3 flex items-center sm:mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-[#B86B4A] sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 rounded-full bg-[#DDA07A]/20 px-2 py-0.5 text-xs font-semibold text-[#7B3F32] sm:text-sm">
                    5.0
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-center justify-between sm:mt-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2">
                  <span className="text-2xl font-bold text-[#4A2318] sm:text-3xl">$32.99</span>
                  <span className="text-sm text-[#7B3F32] font-medium">500g</span>
                </div>
                <div className="text-sm text-[#B86B4A] font-medium">🥩 Premium Cut</div>
              </div>

              {/* Add to Cart */}
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7B3F32] to-[#4A2318] px-4 py-3 text-base font-semibold text-white transition-all duration-300 hover:from-[#8B4F42] hover:to-[#5A3328] hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B86B4A] focus:ring-offset-2 sm:px-6 sm:py-2 sm:text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        )
      })}
      {/* Smooth animation styles */}
      <style>{`
        /* Card base smoothing */
        .product-card { transform: translateY(0); opacity: 1; }
        .product-card:hover { transform: translateY(-8px) scale(1.005); box-shadow: 0 18px 40px rgba(41,37,33,0.12); }

        /* Image smoothing */
        .product-image { will-change: transform; }
        .product-card:hover .product-image { transform: scale(1.05); filter: saturate(1.03) contrast(1.02); }

        /* Overlay and quick view transitions */
        .product-card .overlay { transition: opacity 360ms cubic-bezier(.2,.9,.2,1); }
        .product-card:hover .overlay { opacity: 0.08; }

        .quick-view { transition: opacity 320ms ease, transform 320ms cubic-bezier(.2,.9,.2,1); }
        .product-card:hover .quick-view { opacity: 1; transform: translateY(0); }

        /* Badge */
        .badge { background: linear-gradient(90deg,#7B3F32,#4A2318); transition: transform 320ms cubic-bezier(.2,.9,.2,1); }
        .product-card:hover .badge { transform: translateY(-4px); }

        /* Wishlist button smoothing and state */
        .wishlist-btn { background-color: rgba(255,255,255,0.95); color: #4A2318; box-shadow: 0 6px 18px rgba(74,35,24,0.06); }
        .wishlist-btn[aria-pressed="true"] { background-color: #f43f5e; color: #fff; box-shadow: 0 10px 22px rgba(244,63,94,0.16); transform: scale(1.03); }

        /* Flash animation (smooth pulse) */
        @keyframes flash-smooth {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.14); opacity: 0.95; }
          100% { transform: scale(1); opacity: 1; }
        }
        .flash { animation: flash-smooth 520ms cubic-bezier(.2,.9,.2,1); }

        /* Quick entrance (optional) */
        @keyframes fadeUp {
          from { transform: translateY(12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .product-card { animation: fadeUp 420ms cubic-bezier(.2,.9,.2,1) both; }

      `}</style>
    </div>
  )
}