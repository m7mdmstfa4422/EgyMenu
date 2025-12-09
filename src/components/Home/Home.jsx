import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import coff from '../Home/hotmilk.jpg';
import logo from '../Home/logoo.png';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

// Reusable product card with polished interactions
const CoffeeCard = ({ item = {} }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group bg-white rounded-2xl p-3 shadow-md hover:shadow-xl transition-shadow duration-300 transform will-change-transform hover:-translate-y-2">
      <div className="relative mb-3 rounded-xl overflow-hidden">
        <img
          src={item.img || coff}
          alt={item.name || 'Item'}
          className="w-full h-36 object-cover transform transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-lg flex items-center backdrop-blur">
          <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-black text-xs font-medium">{item.rating ?? '4.8'}</span>
        </div>

        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 bg-white/90 p-1 rounded-full hover:scale-105 transition-transform"
          aria-pressed={isLiked}
          title={isLiked ? 'Remove favorite' : 'Add favorite'}
        >
          <svg
            className={`w-4 h-4 ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
            fill={isLiked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
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

      <h3 className="font-semibold text-gray-900 mb-1">{item.name ?? 'Café Signature'}</h3>
      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description ?? 'Rich aroma, silky texture and crafted for a premium experience.'}</p>

      <div className="flex items-center justify-between">
        <span className="text-lg font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
          ${item.price ?? '6.50'}
        </span>
        <button
          className="bg-orange-500 w-9 h-9 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors duration-200 transform hover:-translate-y-0.5"
          title="Add"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// category tab button is now animated and supports active underline
const CategoryTab = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-5 py-2 rounded-xl whitespace-nowrap font-medium transition-all duration-300 relative ${isActive
          ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-xl'
          : 'bg-white text-gray-600 hover:bg-gray-100'
        }`
      }
    >
      {children}
    </NavLink>
  );
};

// Bottom navigation for mobile
const BottomNavigation = () => {
  const navItems = [
    { to: '/', label: 'Home', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> },
    { to: '/favorites', label: 'Favorites', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> },
    { to: '/orders', label: 'Orders', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> },
    { to: '/profile', label: 'Profile', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur rounded-3xl px-4 py-2 shadow-lg flex gap-3 z-40 lg:hidden">
      {navItems.map((n) => (
        <Link key={n.to} to={n.to} className="flex flex-col items-center justify-center px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">
          {n.icon}
          <span className="text-xs text-gray-500 mt-1">{n.label}</span>
        </Link>
      ))}
    </nav>
  );
};

// In-file improved SearchForm (controlled via props)
const SearchForm = ({ value = '', onChange = () => { }, onSubmit = () => { } }) => {
  const [local, setLocal] = useState(value);

  // keep local sync if parent changes value
  useEffect(() => {
    setLocal(value);
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = local.trim();
    if (!q) return;
    onSubmit(q);
  };

  const handleChange = (e) => {
    setLocal(e.target.value);
    onChange(e.target.value);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative w-full sm:w-[480px] mx-auto"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-[#efe6dd] shadow-lg p-1.5 pr-2"
      >
        <label htmlFor="menu-search" className="sr-only">Search menu</label>

        <div className="flex items-center pl-3 pr-1">
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: -8 }}
            className="p-2 rounded-full bg-gradient-to-br from-[#fffaf6] to-[#fff3ea]"
            title="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
        </div>

        <input
          id="menu-search"
          value={local}
          onChange={handleChange}
          placeholder="Search our menu — try 'latte', 'brownie'..."
          className="flex-1 bg-transparent placeholder:text-[#9b8b7a] px-2 py-3 text-sm md:text-base focus:outline-none"
        />

        <div className="hidden sm:block h-8 w-px bg-gradient-to-b from-transparent via-[#efe6dd] to-transparent mx-1" />

        <motion.button
          type="submit"
          whileTap={{ scale: 0.96 }}
          whileHover={{ x: -4 }}
          aria-label="Search"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium shadow-sm border border-transparent hover:shadow-md transition-all"
        >
          <span className="hidden sm:inline-block">Search</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: local ? 1 : 0, y: local ? 6 : -6 }}
        transition={{ duration: 0.25 }}
        className={`mt-2 rounded-lg p-2 text-xs sm:text-sm ${local ? 'block' : 'pointer-events-none'} text-[#5b4a3f]`}
      >
        {local ? (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V9H3v10a2 2 0 002 2z" />
            </svg>
            <span>Press Enter to search <strong className="font-semibold">"{local}"</strong></span>
          </div>
        ) : (
          <div className="flex items-center gap-2 opacity-70">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 9 4-18 3 9h4" />
            </svg>
            <span>Try keywords like <em>latte</em>, <em>croissant</em>, or <em>vegan</em>.</span>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: local ? 1 : 0 }}
        transition={{ duration: 0.45 }}
        className="origin-left h-0.5 bg-gradient-to-r from-[#6b4f3a] to-[#3c2a21] rounded mt-3"
      />
    </motion.form>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (qOrEvent) => {
    // handle both event (from older form) and string (from new SearchForm)
    const q = typeof qOrEvent === 'string' ? qOrEvent : (qOrEvent?.target ? searchQuery : '');
    if (q?.trim()) {
      navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    }
  };


  // subtle entrance animation trigger / CSS variable
  useEffect(() => {
    document.title = "Café Home ";
    const root = document.documentElement;
    root.style.setProperty('--accent', '#FF7A18');
    return () => { };
  }, []);

  return (
    <div className="min-h-screen max-w-7xl mx-auto lg:px-6 lg:py-6 bg-gradient-to-b from-gray-50 to-white">
      {/* Header / Hero */}
      <header className="relative rounded-b-2xl  lg:rounded-2xl  overflow-hidden mb-6 shadow-md">
        {/* animated decorative blobs */}
        <motion.div
          className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-tr from-orange-200 to-orange-400 opacity-30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-72 h-72 bg-gradient-to-br from-yellow-200 to-red-300 opacity-25 rounded-full blur-3xl"
          animate={{ scale: [1, 1.03, 1], rotate: [0, -6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        />

        <div className="bg-[linear-gradient(90deg,#6B4F3A_0%,#3C2A21_100%)] p-6 lg:p-10 ">
          <div className="flex items-center justify-between ">
            <div>
              <p className="text-sm text-amber-100">Delivering to</p>
              <motion.h1
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 }}
                className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight"
              >
                Egypt · New Cairo
              </motion.h1>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="mt-6 max-w-2xl">
            <p className="text-white/90 mb-4 leading-relaxed">
              Savor artisan coffee and crafted dishes — fresh ingredients, bold flavors, and a premium dining experience.
            </p>

            {/* Improved Search Form */}
            <SearchForm
              value={searchQuery}
              onChange={(v) => setSearchQuery(v)}
              onSubmit={(q) => handleSearch(q)}
            />
          </div>
        </div>
      </header>

      <div className="lg:flex lg:gap-8">
        <main className="flex-1">
          {/* Category Tabs */}
          <div className="px-4 mb-6 lg:mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold">Discover</h2>
              <div className="text-sm text-gray-500">Taste the best of our menu</div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              <CategoryTab to="coffee">Coffee</CategoryTab>
              <CategoryTab to="Drink">Drink</CategoryTab>
              <CategoryTab to="Beef">Beef</CategoryTab>
              <CategoryTab to="Chicken">Chicken</CategoryTab>
              <CategoryTab to="Dessert">Dessert</CategoryTab>
            </div>
          </div>


          {/* Outlet for category pages */}
          <div className="px-4 mb-20">
            <Outlet />
          </div>
        </main>

      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden">
        <BottomNavigation />
      </div>

      {/* Floating CTA (desktop) */}
      <div className="hidden lg:flex fixed right-8 bottom-10 z-50 items-center gap-3">
        <button className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-2xl transform hover:scale-105 transition-all animate-bounce">
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5" />
          </svg>
        </button>
        <div className="px-4 py-2 rounded-full bg-white shadow text-sm font-semibold">Quick Order</div>
      </div>
    </div>
  );
};

export default Home;
