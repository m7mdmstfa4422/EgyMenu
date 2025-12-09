import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import Loading from "../Loding/Loding"

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [productType, setProductType] = useState(null)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const STORAGE_KEY = 'favorites_v1'

  const getProductDetail = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      let response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      if (response?.data?.drinks?.length > 0) {
        setProduct(response.data.drinks[0])
        setProductType("drink")
        return
      }

      response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      if (response?.data?.meals?.length > 0) {
        setProduct(response.data.meals[0])
        setProductType("meal")
        return
      }

      setError("Product not found")
    } catch (err) {
      setError("Failed to load product details")
      console.error("Error fetching product:", err)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    getProductDetail()
  }, [getProductDetail])

  useEffect(() => {
    if (!product || !productType) return
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const pid = productType === "drink" ? product.idDrink : product.idMeal
    const exists = stored.find(f => String(f.id) === String(pid))
    setIsWishlisted(Boolean(exists))

    const onUpdate = () => {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      const stillExists = s.find(f => String(f.id) === String(pid))
      setIsWishlisted(Boolean(stillExists))
    }
    window.addEventListener('favorites-updated', onUpdate)
    window.addEventListener('storage', onUpdate)
    return () => {
      window.removeEventListener('favorites-updated', onUpdate)
      window.removeEventListener('storage', onUpdate)
    }
  }, [product, productType])

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    await new Promise(resolve => setTimeout(resolve, 900))
    setIsAddingToCart(false)
    // Place cart logic here (e.g., update context/localStorage or call API)
    // Provide visual feedback (simple toast alternative)
    const toast = document.createElement('div')
    toast.textContent = 'Added to cart'
    toast.className = 'fixed right-4 bottom-24 bg-[#111827] text-white px-4 py-2 rounded shadow-lg animate-slide-up'
    document.body.appendChild(toast)
    setTimeout(() => document.body.removeChild(toast), 1600)
  }

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(99, value))
    setQuantity(newQuantity)
  }

  const handleWishlistToggle = () => {
    if (!product || !productType) return
    const pid = productType === "drink" ? product.idDrink : product.idMeal
    const name = productType === "drink" ? product.strDrink : product.strMeal
    const img = productType === "drink" ? product.strDrinkThumb : product.strMealThumb
    const price = productType === "drink" ? '14.99' : '12.99'

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const exists = stored.find(f => String(f.id) === String(pid))

    let newFavs
    if (exists) {
      newFavs = stored.filter(f => String(f.id) !== String(pid))
      setIsWishlisted(false)
    } else {
      const toSave = { id: pid, name, img, price }
      newFavs = [toSave, ...stored]
      setIsWishlisted(true)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs))
    window.dispatchEvent(new CustomEvent('favorites-updated'))
  }

  // Removed image tilt / mouse effects to cancel animation on image

  if (loading) return <Loading />

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f5f3] to-[#fffaf8]">
      <div className="text-center animate-fade-in">
        <p className="text-[#3c2a21] text-lg font-semibold">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-[#6b4f3a] text-white rounded-full hover:bg-[#5a3f2a] transition"
        >
          Go Back
        </button>
      </div>
    </div>
  )

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f5f3] to-[#fffaf8]">
      <div className="text-center animate-fade-in">
        <p className="text-[#3c2a21] text-lg font-semibold">Product not found</p>
      </div>
    </div>
  )

  const productName = productType === "drink" ? product.strDrink : product.strMeal
  const productImage = productType === "drink" ? product.strDrinkThumb : product.strMealThumb
  const images = [productImage, productImage, productImage]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbfaf9] to-[#fffefc] p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur rounded-full text-[#2b2b2b] shadow-sm border border-white/30 hover:translate-x-[-6px] transition"
        >
          <svg className="w-4 h-4 text-[#8a6b4b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-10 mt-8 items-start">
          {/* LEFT: Image + gallery */}
          <div className="space-y-6">
            <div
              className="relative bg-gradient-to-br from-[#fffaf8] to-[#f7f3ee] rounded-3xl p-6 shadow-2xl border border-transparent hover:shadow-2xl transition-transform duration-500"
            >
              <div
                className="rounded-2xl overflow-hidden will-change-transform"
                style={{
                  boxShadow: '0 20px 40px rgba(43, 41, 41, 0.12), inset 0 1px 0 rgba(255,255,255,0.4)',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))'
                }}
              >
                <img
                  src={images[selectedImage]}
                  alt={productName}
                  className="w-full h-[520px] object-cover"
                />

                <button
                  onClick={handleWishlistToggle}
                  className={`absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-md border border-white transition transform duration-300 ${isWishlisted ? 'scale-110 text-red-500 animate-pulse' : 'text-[#3c2a21] hover:text-red-400 hover:scale-105'}`}
                  aria-pressed={isWishlisted}
                  aria-label={isWishlisted ? "Remove from favorites" : "Add to favorites"}
                >
                  <svg className="w-6 h-6" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-tr from-[#a67856] to-[#6b4f3a] text-white rounded-full text-sm shadow">
                  ⭐ Chef's Choice
                </div>
              </div>

              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition transform duration-300 ${selectedImage === idx ? 'border-[#6b4f3a] shadow-lg scale-105' : 'border-transparent hover:scale-105 hover:border-[#d9c8b3]'}`}
                  >
                    <img src={img} alt={`${productName} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-[#6b4f3a]">
              <div className="px-3 py-2 bg-[#fff6f0] rounded-lg border border-white/40 shadow-inner">Free delivery over $25</div>
              <div className="px-3 py-2 bg-[#fff6f0] rounded-lg border border-white/40">Prepared fresh</div>
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-[#222]">{productName}</h1>
              <p className="text-[#a67856] font-medium mt-1">{productType === "drink" ? "Signature Beverage" : "Gourmet Dish"}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-br from-[#fffaf8] to-[#f7f3ee] px-4 py-3 rounded-2xl border border-white/40 shadow-sm">
                <div className="text-2xl font-extrabold text-[#2b2b2b]">$14.99</div>
                <div className="text-sm line-through text-[#b08b6a]">$18.99</div>
                <div className="text-xs text-green-600 font-semibold ml-2">20% OFF</div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-sm text-[#6b4f3a] font-semibold">4.9</div>
                <div className="text-xs text-[#9b8a7c]">(328 reviews)</div>
              </div>
            </div>

            <div className="bg-[#fffdfc] border-l-4 border-[#a67856] rounded-xl p-4 text-[#5b4637] shadow-sm">
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-sm leading-relaxed">
                Experience a premium {productType === "drink" ? "beverage" : "dish"} crafted with top ingredients.
                {productType === "drink" ? " Balanced aroma and smooth finish." : " Prepared with care and passion for exceptional flavor."}
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex items-center border rounded-xl overflow-hidden bg-white shadow-sm">
                <button onClick={() => handleQuantityChange(quantity - 1)} className="px-4 py-2 text-lg">−</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 text-center outline-none bg-transparent"
                />
                <button onClick={() => handleQuantityChange(quantity + 1)} className="px-4 py-2 text-lg">+</button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-[#6b4f3a] to-[#3c2a21] text-white font-bold shadow-lg transform transition hover:-translate-y-1 ${isAddingToCart ? 'opacity-80 cursor-not-allowed' : ''}`}
                aria-disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
                    </svg>
                    Add to Order
                  </>
                )}
              </button>
            </div>

            <div className="grid sm:grid-cols-3 mb-28 gap-4 pt-4 text-center text-sm text-[#5b4637]">
              <div>
                <div className="text-xs uppercase text-[#a67856]">Size</div>
                <div className="font-semibold">250g</div>
              </div>
              <div>
                <div className="text-xs uppercase text-[#a67856]">Type</div>
                <div className="font-semibold">{productType === "drink" ? "Arabica Blend" : "Premium Selection"}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-[#a67856]">Origin</div>
                <div className="font-semibold">Chef's Kitchen</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating quick CTA (desktop) */}
      <div className="hidden md:flex fixed right-6 bottom-6 items-center gap-3 z-50">
        <button
          onClick={handleAddToCart}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6b4f3a] to-[#3c2a21] text-white shadow-2xl transform hover:scale-105 transition"
          aria-label="Quick add to cart"
        >
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5" />
          </svg>
        </button>
        <div className="px-4 py-2 rounded-full bg-white/95 shadow border border-white/40">Quick Order</div>
      </div>
    </div>
  )
}