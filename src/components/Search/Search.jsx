import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loading from '../Loding/Loding'

export default function Search() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialQuery = searchParams.get('q') || ''

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [categories] = useState(['All'])
  const [activeCategory, setActiveCategory] = useState('All')

  // favorites state
  const [favIds, setFavIds] = useState([])
  const [flashId, setFlashId] = useState(null)
  const STORAGE_KEY = 'favorites_v1'

  // enhanced search form state
  const [localQuery, setLocalQuery] = useState(initialQuery)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const recentKey = 'recent_searches_v1'
  const inputRef = useRef(null)

  const debounceRef = useRef(null)
  const lastSearchRef = useRef('')

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    setFavIds(stored.map(f => String(f.id)))

    const rec = JSON.parse(localStorage.getItem(recentKey) || '[]')
    setRecentSearches(rec)
  }, [])

  useEffect(() => {
    // run initial search from URL on mount
    if (initialQuery) {
      performSearch(initialQuery)
    } else {
      setResults([])
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const performSearch = useCallback(async (q) => {
    const query = (q || '').trim()
    if (!query) {
      setResults([])
      setLoading(false)
      return
    }

    // avoid duplicate identical calls
    if (lastSearchRef.current === query) return
    lastSearchRef.current = query

    setLoading(true)
    try {
      const [drinksRes, mealsRes] = await Promise.all([
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`),
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`)
      ])

      const drinks = (drinksRes.data?.drinks || []).map(d => ({
        ...d,
        type: 'drink',
        price: '14.99'
      }))

      const meals = (mealsRes.data?.meals || []).map(m => ({
        ...m,
        type: 'meal',
        price: '24.99'
      }))

      setResults([...drinks, ...meals])
    } catch (err) {
      console.error('Search error:', err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  // live search: update results and URL after each letter (debounced)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const q = (localQuery || '').trim()
      // update URL without adding history entries
      navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search', { replace: true })
      performSearch(q)
    }, 220)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [localQuery, navigate, performSearch])

  // favorites toggle
  const toggleFavorite = (item) => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const id = item.idDrink || item.idMeal
    const idStr = String(id)
    const exists = stored.find(f => String(f.id) === idStr)

    let newFavs
    if (exists) {
      newFavs = stored.filter(f => String(f.id) !== idStr)
    } else {
      const toSave = {
        id,
        name: item.strDrink || item.strMeal,
        img: item.strDrinkThumb || item.strMealThumb,
        price: item.type === 'drink' ? '14.99' : '24.99'
      }
      newFavs = [toSave, ...stored]
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs))
    setFavIds(newFavs.map(f => String(f.id)))
    setFlashId(idStr)
    setTimeout(() => setFlashId(null), 500)
    window.dispatchEvent(new CustomEvent('favorites-updated'))
  }

  // enhanced: submit search -> save recent searches (kept for accessibility)
  const submitSearch = (e) => {
    e && e.preventDefault()
    const q = (localQuery || '').trim()
    if (!q) return
    const rec = JSON.parse(localStorage.getItem(recentKey) || '[]')
    const updated = [q, ...rec.filter(r => r !== q)].slice(0, 8)
    localStorage.setItem(recentKey, JSON.stringify(updated))
    setRecentSearches(updated)
    // ensure immediate search and URL update
    navigate(`/search?q=${encodeURIComponent(q)}`, { replace: true })
    performSearch(q)
    setShowSuggestions(false)
  }

  const clearSearch = () => {
    setLocalQuery('')
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const pickSuggestion = (s) => {
    setLocalQuery(s)
    setShowSuggestions(false)
    // performSearch will run via effect
  }

  const filteredResults = results.filter(item => {
    if (activeCategory === 'All') return true
    return item.type.toLowerCase() === activeCategory.toLowerCase()
  })

  const suggestions = (() => {
    const names = results.slice(0, 6).map(r => r.strDrink || r.strMeal)
    const combined = [...recentSearches, ...names]
    const unique = Array.from(new Set(combined))
    return unique.filter(Boolean).slice(0, 6)
  })()

  return (
    <div className="min-h-screen bg-gradient-to-br mb-24 from-[#fbfaf9] to-[#fffefc] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Search Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#2b2b2b] mb-2">Search</h1>
          <p className="text-[#6b4f3a]">Find your favorite beverages and dishes — live results as you type.</p>

          <form onSubmit={submitSearch} className="mt-6 relative max-w-3xl">
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-[#efe8df] rounded-full shadow-md px-3 py-2 transition-shadow hover:shadow-xl">
              <button
                type="submit"
                aria-label="Search"
                className="p-2 rounded-full text-[#6b4f3a] hover:text-[#3c2a21] transition"
                title="Search"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <input
                ref={inputRef}
                value={localQuery}
                onChange={(e) => { setLocalQuery(e.target.value); setShowSuggestions(true) }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 180)}
                placeholder="Search signature coffees, desserts, or ingredients..."
                className="flex-1 bg-transparent outline-none px-2 py-3 placeholder:italic placeholder:text-gray-400 text-[#2b2b2b] text-lg"
                aria-label="Search menu"
                autoComplete="off"
              />

              {localQuery ? (
                <button type="button" onClick={clearSearch} className="p-2 rounded-full text-gray-500 hover:text-gray-700 transition" title="Clear search">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95A1 1 0 013.636 15.95L8.586 11l-4.95-4.95A1 1 0 114.05 4.636L10 10.586z" clipRule="evenodd" />
                  </svg>
                </button>
              ) : (
                <div className="px-2 text-sm text-gray-400 hidden sm:block">Try "latte", "croissant", or "iced"</div>
              )}
            </div>

            {/* Suggestions dropdown */}
            {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
              <div className="absolute mt-2 left-0 right-0 z-40 rounded-xl bg-white shadow-lg border border-[#efe8df] overflow-hidden">
                <div className="px-3 py-2 text-xs text-gray-500 border-b border-[#f3eee7]">Suggestions</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onMouseDown={(e) => { e.preventDefault(); pickSuggestion(s) }}
                      className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 transition"
                    >
                      <svg className="w-5 h-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <span className="truncate">{s}</span>
                    </button>
                  ))}
                </div>

                {recentSearches.length > 0 && (
                  <>
                    <div className="px-3 py-2 text-xs text-gray-500 border-t border-[#f3eee7]">Recent searches</div>
                    <div className="flex flex-wrap gap-2 p-3">
                      {recentSearches.map(r => (
                        <button
                          key={r}
                          onMouseDown={(e) => { e.preventDefault(); pickSuggestion(r) }}
                          className="px-3 py-1 rounded-full bg-[#f7f3ee] text-sm text-[#6b4f3a] hover:bg-[#efe6db] transition"
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Categories */}
        <div className="flex ps-3 mb-6 overflow-x-auto pb-2 animate-slide-up" style={{animationDelay: '0.1s'}}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-[#6b4f3a] text-white shadow-lg scale-105'
                  : 'bg-white text-[#6b4f3a] hover:bg-[#f7f3ee]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <Loading />
        ) : (
          <>
            {filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map((item, idx) => {
                  const id = item.idDrink || item.idMeal
                  const isFav = favIds.includes(String(id))
                  const isFlashing = flashId === String(id)

                  return (
                    <div
                      key={id}
                      className="group bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="relative mb-4 rounded-xl overflow-hidden">
                        <img
                          src={item.strDrinkThumb || item.strMealThumb}
                          alt={item.strDrink || item.strMeal}
                          className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            toggleFavorite(item)
                          }}
                          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                            isFlashing ? 'animate-pop' : ''
                          } ${
                            isFav 
                              ? 'bg-rose-500 text-white shadow-lg hover:scale-110' 
                              : 'bg-white/90 text-[#6b4f3a] hover:bg-white hover:scale-110'
                          }`}
                          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <svg 
                            className="w-5 h-5" 
                            fill={isFav ? "currentColor" : "none"} 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-[#2b2b2b] group-hover:text-[#6b4f3a] transition-colors">
                            {item.strDrink || item.strMeal}
                          </h3>
                          <p className="text-sm text-[#6b4f3a]">
                            {item.type === 'drink' ? 'Signature Beverage' : 'Chef\'s Special'}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-[#6b4f3a]">
                          ${item.price}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/product/${item.idDrink || item.idMeal}`)}
                          className="flex-1 px-4 py-2 bg-[#6b4f3a] text-white rounded-xl hover:bg-[#5a3f2a] transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-semibold text-[#2b2b2b] mb-2">
                  No results found
                </h2>
                <p className="text-[#6b4f3a]">
                  Try different keywords or browse our categories
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
        .animate-pop {
          animation: pop 500ms cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  )
}
