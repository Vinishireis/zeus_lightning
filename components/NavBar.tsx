"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [, setLoading] = useState(true);
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", session.user.id)
          .single();

        setUser({
          email: session.user.email,
          name: profile?.name || session.user.email?.split("@")[0] || "Usuário",
        });
      }
      setLoading(false);
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setUser({
          email: session.user.email,
          name:
            session.user.user_metadata?.name ||
            session.user.email?.split("@")[0] ||
            "Usuário",
        });
      } else {
        setUser(null);
      }
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      subscription?.unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsOpen(false);
    router.push("/");
  };

  const unauthenticatedNavItems = [
    { href: "/Pricing", label: "Planos" },
    { href: "/Contact", label: "Contato" },
  ];

  const authenticatedNavItems = [
    { href: "/Chat", label: "Atena" },
    { href: "/Forms", label: "Formulário" },
    { href: "/Services", label: "Vitrine ESG" },
    { href: "/Investors", label: "Investidores" },
    { href: "/Pricing", label: "Planos" },
    { href: "/Dashboard", label: "Dashboard" },
    { href: "/Contact", label: "Contato" },
  ];

  const navItems = user ? authenticatedNavItems : unauthenticatedNavItems;

  const authItems = user
    ? [
        {
          element: (
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-sm text-white">
                Olá, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-1 text-sm rounded-full bg-red-600 hover:bg-red-700 text-white"
              >
                Sair
              </button>
            </div>
          ),
        },
      ]
    : [
        {
          href: "/Login",
          label: "Login",
          className:
            "px-4 py-1 text-sm rounded-full bg-white/10 hover:bg-white/20 text-white",
        },
        {
          href: "/Register",
          label: "Registrar",
          className:
            "px-4 py-1 text-sm rounded-full bg-blue-600 hover:bg-blue-700 text-white",
        },
      ];

  return (
    <>
      {/* Navbar Principal */}
      <div ref={navRef}>
        <nav
          className={`z-50 fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl flex flex-wrap items-center justify-between py-2 px-6 rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-black/80 backdrop-blur-lg border border-zinc-800 shadow-lg"
              : "bg-black/60 backdrop-blur-md border border-zinc-800"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="Zeus Lightning Logo"
              width={50}
              height={50}
              className="text-3xl md:text-4xl text-white"
            />
            <span className="ml-2 text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Zeus Lightning
            </span>
          </Link>

          {/* Itens Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-blue-300 transition-colors text-sm font-medium relative group"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Autenticação Desktop */}
          <div className="hidden lg:flex items-center gap-3 flex-wrap justify-end">
            {authItems.map((item, index) =>
              "href" in item ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-white transition-colors ${item.className}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <React.Fragment key={index}>{item.element}</React.Fragment>
              )
            )}
          </div>

          {/* Botão Menu Mobile */}
          <button
            className="lg:hidden text-white p-2 focus:outline-none"
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

        {/* Menu Mobile e Tablet */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed z-40 top-20 inset-x-0 bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800 shadow-xl lg:hidden"
            >
              <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-white hover:text-blue-300 py-3 px-4 rounded-lg hover:bg-zinc-800/50 transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="flex flex-col sm:flex-row sm:justify-center gap-3 pt-4 border-t border-zinc-800">
                  {user ? (
                    <>
                      <span className="text-white py-2 text-center">
                        Olá, {user.name.split(" ")[0]}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm rounded-full bg-red-600 hover:bg-red-700 text-white text-center"
                      >
                        Sair
                      </button>
                    </>
                  ) : (
                    authItems.map(
                      (item) =>
                        "href" in item && (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`text-white transition-colors ${item.className} text-center`}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.label}
                          </Link>
                        )
                    )
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default NavBar;
