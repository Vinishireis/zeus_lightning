"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { BsLightning } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase'; // Importe o cliente Supabase
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [, setLoading] = useState(true);
  const router = useRouter();

  // Verificar sessão do usuário
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Buscar dados do perfil
        const { data: profile } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', session.user.id)
          .single();

        setUser({
          email: session.user.email,
          name: profile?.name || session.user.email?.split('@')[0] || 'Usuário'
        });
      }
      setLoading(false);
    };

    checkSession();

    // Ouvir mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setUser({
          email: session.user.email,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Usuário'
        });
      } else {
        setUser(null);
      }
    });

    // Verificar scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      subscription?.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const navItems = [
    { href: '/Upload', label: 'Upload' },
    { href: '/Pricing', label: 'Preços' },
    { href: '/Services', label: 'Serviços'},
    { href: '/Contact', label: 'Contato' },
    { href: '/Chat', label: 'Chat' },
  ];

  const authItems = user ? [
    {
      element: (
        <div className="flex items-center gap-3">
          <span className="text-sm text-white">Olá, {user.name.split(' ')[0]}</span>
          <button 
            onClick={handleLogout}
            className="px-4 py-1 text-sm rounded-full bg-red-600 hover:bg-red-700 text-white"
          >
            Sair
          </button>
        </div>
      )
    }
  ] : [
    { href: '/Login', label: 'Login', className: 'px-4 py-1 text-sm rounded-full bg-white/10 hover:bg-white/20 text-white' },
    { href: '/Register', label: 'Registrar', className: 'px-4 py-1 text-sm rounded-full bg-blue-600 hover:bg-blue-700 text-white' },
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
          {authItems.map((item, index) => (
            'href' in item ? (
              <Link
                key={item.href}
                href={item.href}
                className={`text-white transition-colors ${item.className}`}
              >
                {item.label}
              </Link>
            ) : (
              <React.Fragment key={index}>
                {item.element}
              </React.Fragment>
            )
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
                  {user ? (
                    <>
                      <span className="text-white py-2 px-4 text-center">
                        Olá, {user.name.split(' ')[0]}
                      </span>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="px-4 py-2 text-sm rounded-full bg-red-600 hover:bg-red-700 text-white text-center"
                      >
                        Sair
                      </button>
                    </>
                  ) : (
                    authItems.map((item) => (
                      'href' in item && (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`text-center text-white transition-colors ${item.className} py-2`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )
                    ))
                  )}
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