"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { BsLightning } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Fechar menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    // Verificar scroll para efeito de fundo
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { href: '/Upload', label: 'Upload' },
    { href: '/Pricing', label: 'Preços' },
    { href: '/Solutions', label: 'Soluções' },
    { href: '/Contact', label: 'Contato' },
  ];

  const authItems = [
    { href: '/Login', label: 'Login', className: 'px-4 py-1 text-sm rounded-full bg-white/10 hover:bg-white/20' },
    { href: '/Register', label: 'Registrar', className: 'px-4 py-1 text-sm rounded-full bg-blue-600 hover:bg-blue-700' },
  ];

  return (
    <>
      {/* Navbar Desktop */}
      <nav className={`z-50 fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl flex items-center justify-between py-2 px-6 rounded-full transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg border border-zinc-800 shadow-lg' : 'bg-black/60 backdrop-blur-md border border-zinc-800'
      }`}>
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <BsLightning className="text-3xl md:text-4xl text-white" />
          <span className="ml-2 text-xl font-semibold hidden sm:inline-block bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
            Zeus Lightning
          </span>
        </Link>

        {/* Itens de navegação - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="text-white hover:text-blue-300 transition-colors text-sm font-medium relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Botões de autenticação - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {authItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-white transition-colors ${item.className}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Botão Hamburguer - Mobile */}
        <button 
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? (
            <RiCloseLine className="w-6 h-6" />
          ) : (
            <RiMenu3Line className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed z-40 top-20 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800 shadow-xl md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-zinc-800/50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-zinc-800">
                  {authItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-center text-white transition-colors ${item.className} py-2`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;