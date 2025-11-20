'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [time, setTime] = useState('')
  
  useEffect(() => {
    // Update time for the HUD
    const interval = setInterval(() => {
      const now = new Date()
      setTime(now.toISOString().split('T')[0] + ' // ' + now.toLocaleTimeString('en-US', { hour12: false }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const navItems = [
    { href: '#hero', label: 'HOME', index: '00' },
    { href: '#experience', label: 'EXPERIENCE', index: '01' },
    { href: '#projects', label: 'PROJECTS', index: '02' },
    { href: '#skills', label: 'SKILLS', index: '03' },
  ]

  const socialLinks = [
    { href: 'https://github.com/DanielTea', icon: Github, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/daniel-tremer/', icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:info@danieltremer.com', icon: Mail, label: 'Email' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 font-mono">
      {/* Top HUD Bar */}
      <div className="w-full bg-black text-white border-b border-black/20 text-[10px] py-1 px-4 flex justify-between items-center uppercase tracking-widest">
         <div className="flex gap-4">
            <span className="text-[var(--color-volt)]">● SYSTEM ONLINE</span>
            <span className="hidden sm:inline text-gray-400">UID: D_TREMER_PORTFOLIO</span>
         </div>
         <div className="hidden sm:block text-white">{time}</div>
         <div className="block sm:hidden">MOBILE_VIEW</div>
      </div>

      {/* Main Navbar */}
      <div className="bg-[var(--color-surface)]/90 backdrop-blur-md border-b border-black/10 relative">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black to-transparent opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => scrollToSection('#hero')}
            >
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-sm chamfered group-hover:bg-[var(--color-volt)] group-hover:text-black transition-colors">
                DT
              </div>
              <div className="flex flex-col">
                <span className="text-black font-bold font-display uppercase tracking-wider leading-none transition-colors">Daniel Tremer</span>
                <span className="text-[10px] text-gray-500 tracking-[0.2em] leading-none">DEV_OPERATOR</span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center h-full">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="h-full px-6 flex items-center gap-2 text-sm text-gray-600 hover:text-black hover:bg-black/5 border-r border-black/5 first:border-l transition-all relative group"
                >
                  <span className="text-[10px] text-gray-400 group-hover:text-black transition-colors">[{item.index}]</span>
                  <span className="tracking-wider font-bold">{item.label}</span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </button>
              ))}
              
              <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-black/10">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-black transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <link.icon size={18} />
                    <span className="sr-only">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
               <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-black p-2 border border-black/10 hover:bg-black/5 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[var(--color-surface)] border-b border-black/10"
        >
          <div className="px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-gray-600 hover:text-black hover:bg-black/5 py-3 px-4 border-l-2 border-transparent hover:border-black transition-all font-mono uppercase tracking-wider"
              >
                <span className="mr-4 text-gray-400">//{item.index}</span>
                {item.label}
              </button>
            ))}
            
            <div className="flex justify-center gap-8 pt-6 mt-6 border-t border-black/10">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-black transition-colors p-2 border border-black/10"
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
