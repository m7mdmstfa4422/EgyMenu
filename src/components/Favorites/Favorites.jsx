import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Favorites() {
    const [count, setCount] = useState(0)
    const [favs, setFavs] = useState([])

    const STORAGE_KEY = 'favorites_v1'
    const navigate = useNavigate()

    const items = [
        { id: 1, name: 'Café Latte', desc: 'Silky espresso + steamed milk', price: '3.50', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=60' },
        { id: 2, name: 'Avocado Toast', desc: 'Sourdough, smashed avo, chili', price: '6.00', img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=60' },
        { id: 3, name: 'Truffle Burger', desc: 'Beef, truffle mayo, aged cheddar', price: '12.00', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=60' },
    ]

    useEffect(() => {
        document.title = "Your Favorites - Café Menu"
        // load favorites from localStorage on mount
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        setFavs(stored)
        setCount(stored.length)
    }, [])

    useEffect(() => {
        // listen for favorites changes from other components
        const onUpdate = () => {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
            setFavs(stored)
            setCount(stored.length)
        }
        window.addEventListener('favorites-updated', onUpdate)
        window.addEventListener('storage', onUpdate) // handles other tabs
        return () => {
            window.removeEventListener('favorites-updated', onUpdate)
            window.removeEventListener('storage', onUpdate)
        }
    }, [])

    useEffect(() => {
        if (count > 0) {
            const t = setTimeout(() => { }, 300)
            return () => clearTimeout(t)
        }
    }, [count])

    function toggleFavorite(item) {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        const exists = stored.find(f => String(f.id) === String(item.id))
        const newFavs = exists ? stored.filter(f => String(f.id) !== String(item.id)) : [{ id: item.id, name: item.name, img: item.img, price: item.price }, ...stored]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs))
        setFavs(newFavs)
        setCount(newFavs.length)
        window.dispatchEvent(new CustomEvent('favorites-updated'))
    }

    function removeAllFavorites() {
        if (favs.length === 0) return
        const ok = window.confirm('Remove all favorites? This cannot be undone.')
        if (!ok) return
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
        setFavs([])
        setCount(0)
        window.dispatchEvent(new CustomEvent('favorites-updated'))
    }

    return (
        <section className="min-h-screen py-12 px-6 bg-gradient-to-b from-[#2C1810] via-[#4A3228] to-[#1F1209] relative overflow-hidden">
            {/* Background elements with lower z-index */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Coffee bean particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-4 h-6 rounded-full bg-[#8B5E3C]/10"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: -20,
                            rotate: 0
                        }}
                        animate={{
                            y: window.innerHeight + 20,
                            rotate: 360,
                            x: `calc(${Math.random() * 100}vw)`
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                    />
                ))}

                {/* Subtle gradient overlays */}
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#2C1810]/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#1F1209]/80 to-transparent"></div>

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A574' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}>
                </div>
            </div>

            {/* Main content with higher z-index */}
            <div className="relative mb-20 z-20 max-w-6xl mx-auto">
                <motion.header
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                    <div className="relative">
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                            Your Favorites
                        </h1>
                        <span className="absolute -top-4 -right-4 text-[#D4A574] text-lg rotate-12 font-handwriting animate-float">
                            ☕ Handpicked
                        </span>
                        <p className="mt-3 text-[#D4A574]/80 text-lg">Your personal collection of coffee treasures</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <motion.div
                            className="relative"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <button className="group flex items-center gap-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all duration-300 shadow-lg">
                                <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 21s-7-4.35-9-7.5A5.5 5.5 0 0 1 6 4a6 6 0 0 1 6 2 6 6 0 0 1 6-2 5.5 5.5 0 0 1 3 9.5C19 16.65 12 21 12 21z" />
                                </svg>
                                <span className="font-medium">{count} favorites</span>
                            </button>
                            {count > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center text-xs font-bold bg-[#D4A574] text-[#2C1810] rounded-full shadow-lg"
                                >
                                    {count}
                                </motion.span>
                            )}
                        </motion.div>

                        <motion.button
                            onClick={removeAllFavorites}
                            disabled={favs.length === 0}
                            whileHover={{ scale: favs.length === 0 ? 1 : 1.05 }}
                            whileTap={{ scale: favs.length === 0 ? 1 : 0.95 }}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-lg ${favs.length === 0
                                    ? 'bg-white/10 text-white/50 cursor-not-allowed border border-white/10'
                                    : 'bg-[#D4A574] text-[#2C1810] hover:bg-[#E5B684] shadow-lg hover:shadow-[#D4A574]/40 border border-[#D4A574]'
                                }`}
                        >
                            Clear All
                        </motion.button>
                    </div>
                </motion.header>

                <AnimatePresence mode="wait">
                    {favs.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-20 relative z-30"
                        >
                            <motion.div
                                className="inline-block p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <svg className="w-16 h-16 text-[#D4A574] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </motion.div>
                            <h3 className="mt-8 text-2xl font-bold text-white">No favorites yet</h3>
                            <p className="mt-4 text-white/70 text-lg">Start adding your favorite coffee treats to see them here!</p>
                            <motion.button
                                onClick={() => navigate('/')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-6 px-8 py-3 bg-[#D4A574] text-[#2C1810] font-semibold rounded-full hover:bg-[#E5B684] transition-colors duration-300 shadow-lg"
                            >
                                Explore Menu
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            {favs.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                    transition={{
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    whileHover={{
                                        y: -8,
                                        transition: { type: "spring", stiffness: 300 }
                                    }}
                                    className="group relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 shadow-2xl hover:shadow-3xl"
                                >
                                    {/* Card Background Enhancement */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>

                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <motion.img
                                            src={item.img}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.15 }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                        />
                                        {/* Enhanced gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/95 via-[#2C1810]/40 to-transparent"></div>

                                        {/* Favorite button */}
                                        <motion.button
                                            onClick={() => toggleFavorite(item)}
                                            whileHover={{ scale: 1.2, rotate: 180 }}
                                            whileTap={{ scale: 0.8 }}
                                            className="absolute top-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 shadow-lg"
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 21s-7-4.35-9-7.5A5.5 5.5 0 0 1 6 4a6 6 0 0 1 6 2 6 6 0 0 1 6-2 5.5 5.5 0 0 1 3 9.5C19 16.65 12 21 12 21z" />
                                            </svg>
                                        </motion.button>

                                        {/* Price tag */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="px-3 py-2 bg-[#D4A574] text-[#2C1810] font-bold rounded-full text-sm shadow-lg">
                                                ${item.price}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="relative p-6 z-10">
                                        <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                                        <p className="text-white/70 text-sm mb-4 line-clamp-2">
                                            {item.desc || 'Delicious item added to your favorites'}
                                        </p>


                                        {/* Action buttons */}
                                        <div className="flex gap-3">
                                            <motion.button
                                                onClick={() => navigate(`/product/${item.id}`)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex-1 py-3 rounded-xl bg-[#D4A574] text-[#2C1810] font-semibold hover:bg-[#E5B684] transition-colors duration-300 shadow-lg"
                                            >
                                                View Details
                                            </motion.button>
                                            <motion.button
                                                onClick={() => toggleFavorite(item)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-4 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                                            >
                                                Remove
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Shine effect on hover */}
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Enhanced CSS for animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(12deg); }
                    50% { transform: translateY(-10px) rotate(12deg); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .font-handwriting {
                    font-family: 'Brush Script MT', cursive;
                }
            `}</style>
        </section>
    )
}