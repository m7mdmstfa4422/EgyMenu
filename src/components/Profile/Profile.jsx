import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import style from './Profile.module.css';

export default function Profile() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        document.title = "Café Profile ";
    }, []);
    // Resolve asset paths correctly for hash-based deployments (e.g., GitHub Pages)
    const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`


    const cafeInfo = {
        name: "Café",
        established: "Est. 2020",
        owner: {
            name: "Mohamed Mustafa",
            title: "Web Developer & front-end framework react",
            image: asset("/me.jpg"),
            quote: "Every cup tells a story, every bite shares a memory."
        },
        description: "A cozy corner where artisanal coffee meets homemade delights. We carefully source our beans from sustainable farms and craft each drink with passion and precision.",
        stats: [
            { label: "Coffee Origins", value: "12+" },
            { label: "Daily Visitors", value: "200+" },
            { label: "Specialty Drinks", value: "25+" },
            { label: "Years of Service", value: "3+" }
        ],
        awards: [
            "Best Local Café 2023",
            "Sustainable Business Award",
            "Community Choice Award"
        ],
        schedule: [
            { day: "Mon-Fri", hours: "7:00 AM - 8:00 PM" },
            { day: "Saturday", hours: "8:00 AM - 9:00 PM" },
            { day: "Sunday", hours: "9:00 AM - 6:00 PM" }
        ]
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FFF8F5] to-[#FFF2EA] p-4 sm:p-6 lg:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-6xl mx-auto"
            >
                {/* Hero Section */}
                <div className="relative rounded-3xl overflow-hidden mb-8 bg-[#6B4A2B] shadow-xl">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920')] opacity-30 bg-cover bg-center" />
                    <div className="relative z-10 px-6 py-20 text-center text-white">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl sm:text-5xl font-bold mb-4"
                        >
                            {cafeInfo.name}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-white/90"
                        >
                            {cafeInfo.established}
                        </motion.p>
                    </div>
                </div>

                {/* Owner Profile */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-2xl p-6 mb-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg ring-4 ring-[#6B4A2B]/20">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                src={cafeInfo.owner.image}
                                alt={cafeInfo.owner.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[#6B4A2B] mb-2">{cafeInfo.owner.name}</h2>
                            <p className="text-[#B89573] mb-4">{cafeInfo.owner.title}</p>
                            <blockquote className="text-gray-600 italic border-l-4 border-[#B89573] pl-4">
                                "{cafeInfo.owner.quote}"
                            </blockquote>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {cafeInfo.stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="text-3xl font-bold text-[#6B4A2B] mb-2">{stat.value}</div>
                            <div className="text-sm text-[#B89573]">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Description & Hours */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                        className="bg-white p-6 rounded-2xl shadow-lg"
                    >
                        <h3 className="text-xl font-bold text-[#6B4A2B] mb-4">Our Story</h3>
                        <p className="text-gray-600 leading-relaxed">{cafeInfo.description}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                        className="bg-white p-6 rounded-2xl shadow-lg"
                    >
                        <h3 className="text-xl font-bold text-[#6B4A2B] mb-4">Opening Hours</h3>
                        <div className="space-y-3">
                            {cafeInfo.schedule.map((schedule) => (
                                <div key={schedule.day} className="flex justify-between items-center">
                                    <span className="text-[#B89573]">{schedule.day}</span>
                                    <span className="text-gray-600">{schedule.hours}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Awards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="bg-gradient-to-r from-[#6B4A2B] to-[#B89573] p-8 rounded-2xl shadow-xl text-white mb-8"
                >
                    <h3 className="text-xl font-bold mb-6 text-center">Recognition & Awards</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {cafeInfo.awards.map((award, index) => (
                            <motion.div
                                key={award}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.6 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
                            >
                                {award}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="text-center mt-12 mb-5 "
            >
                <button className="bg-[#6B4A2B] hover:bg-[#8B6A4B] text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Contact Us
                </button>

                {/* Social Media Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.0 }}
                    className="flex justify-center items-center gap-4 mt-8 "
                >
                    <motion.a
                        href="https://www.facebook.com/M7md.mSTfa.4422"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                            scale: 1.2,
                            backgroundColor: '#F5EDE6',
                            boxShadow: '0 8px 20px rgba(107, 74, 43, 0.15)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-gradient-to-br from-[#FFF8F2] to-[#F5EDE6] p-3 rounded-full shadow-md transition-all duration-300 relative group"
                    >
                        <motion.div
                            className="absolute inset-0 rounded-full bg-[#6B4A2B] opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                            layoutId="socialHover"
                        />
                        <svg className="w-6 h-6 text-[#6B4A2B]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                    </motion.a>

                    <motion.a
                        href="https://www.instagram.com/m7md_mstfa4422?fbclid=IwY2xjawN3YNRleHRuA2FlbQIxMABicmlkETExdzVrOEllWXJ3V0k4MVFqAR4b7pMF-JkHoVNaun3WWLUh-xVgWpk2y6AP2hxDEiJ8F6gceXdNoxLkxPBnww_aem_5I2ns5vW9_wZ3BIxNCcOqw"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                            scale: 1.2,
                            backgroundColor: '#F5EDE6',
                            boxShadow: '0 8px 20px rgba(107, 74, 43, 0.15)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-gradient-to-br from-[#FFF8F2] to-[#F5EDE6] p-3 rounded-full shadow-md transition-all duration-300 relative group"
                    >
                        <motion.div
                            className="absolute inset-0 rounded-full bg-[#6B4A2B] opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                            layoutId="socialHover"
                        />
                        <svg className="w-6 h-6 text-[#6B4A2B]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                        </svg>
                    </motion.a>

                    <motion.a
                        href="https://wa.me/+201003154481"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                            scale: 1.2,
                            backgroundColor: '#F5EDE6',
                            boxShadow: '0 8px 20px rgba(107, 74, 43, 0.15)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-gradient-to-br from-[#FFF8F2] to-[#F5EDE6] p-3 rounded-full shadow-md transition-all duration-300 relative group"
                    >
                        <motion.div
                            className="absolute inset-0 rounded-full bg-[#6B4A2B] opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                            layoutId="socialHover"
                        />
                        <svg className="w-6 h-6 text-[#6B4A2B]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </motion.a>

                    <motion.a
                        href="https://www.linkedin.com/in/mohammed-mustafa-416318362/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                            scale: 1.2,
                            backgroundColor: '#F5EDE6',
                            boxShadow: '0 8px 20px rgba(107, 74, 43, 0.15)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-gradient-to-br from-[#FFF8F2] to-[#F5EDE6] p-3 rounded-full shadow-md transition-all duration-300 relative group"
                    >
                        <motion.div
                            className="absolute inset-0 rounded-full bg-[#6B4A2B] opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                            layoutId="socialHover"
                        />
                        <svg className="w-6 h-6 text-[#6B4A2B]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </motion.a>
                    <motion.a
                        href="https://github.com/m7mdmstfa4422"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                            scale: 1.2,
                            backgroundColor: '#F5EDE6',
                            boxShadow: '0 8px 20px rgba(107, 74, 43, 0.15)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-gradient-to-br from-[#FFF8F2] to-[#F5EDE6] p-3 rounded-full shadow-md transition-all duration-300 relative group"
                    >
                        <motion.div
                            className="absolute inset-0 rounded-full bg-[#6B4A2B] opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                            layoutId="socialHover"
                        />
                        <svg className="w-6 h-6 text-[#6B4A2B]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="text-center py-8 border-t mb-20 border-[#6B4A2B]/10"
            >
                <a href='https://m7mdmstfa4422.github.io/MoMustafa/' className="text-[#6B4A2B] font-medium">
                    Created by <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6B4A2B] to-[#B89573]">Mohamed Mustafa</span>
                </a>
            </motion.div>
        </div>
    );
}
