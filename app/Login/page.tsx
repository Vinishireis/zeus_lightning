"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Validação de email em tempo real
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    // Validação de senha em tempo real
    setPasswordValid(password.length >= 8);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
  
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) throw new Error(error.message);
      
      // Redireciona após login bem-sucedido
      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          scopes: 'email profile', // Escopos simplificados
          redirectTo: 'https://zeuslightning.vercel.app/dashboard' 
        }
      });
  
      if (error) throw error;
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no login");
    }
  };
  
  

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-black ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-[80vh] px-4">

        {/* Container do formulário */}  
        <div className="w-full max-w-md p-8 space-y-6 bg-gradient-to-br from-zinc-900/80 to-zinc-800/90 backdrop-blur-xl rounded-2xl border border-zinc-700 shadow-2xl shadow-zinc-900/50">
          {/* Logo e título */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-white"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold text-white bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Zeus Lightning
            </h1>
            <p className="mt-2 text-zinc-400">Acesse sua conta para continuar</p>
          </div>

          {/* Formulário */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full pl-10 pr-4 py-3 text-white ${emailValid && email ? 'bg-emerald-900/20' : 'bg-zinc-800/50'} border ${emailValid && email ? 'border-emerald-500/50' : 'border-zinc-700'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  placeholder="seu@email.com"
                />
                {email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {emailValid ? (
                      <FiCheckCircle className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <FiAlertCircle className="h-5 w-5 text-amber-500" />
                    )}
                  </div>
                )}
              </div>
              {email && !emailValid && (
                <p className="mt-1 text-xs text-amber-500">Por favor, insira um email válido</p>
              )}
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full pl-10 pr-4 py-3 text-white ${passwordValid && password ? 'bg-emerald-900/20' : 'bg-zinc-800/50'} border ${passwordValid && password ? 'border-emerald-500/50' : 'border-zinc-700'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  placeholder="••••••••"
                />
                {password && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {passwordValid ? (
                      <FiCheckCircle className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <FiAlertCircle className="h-5 w-5 text-amber-500" />
                    )}
                  </div>
                )}
              </div>
              {password && !passwordValid && (
                <p className="mt-1 text-xs text-amber-500">A senha deve ter pelo menos 8 caracteres</p>
              )}
            </div>

            {/* Botão Google */}
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <FaGoogle />
              Continuar com Google
            </button>

            {/* Link "Esqueceu a senha" */}
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Esqueceu sua senha?
              </Link>
            </div>

            {/* Mensagem de erro */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-900/30 text-red-300 rounded-lg flex items-center"
              >
                <FiAlertCircle className="mr-2" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Botão de submit */}
            <motion.button
              type="submit"
              disabled={!emailValid || !passwordValid || isSubmitting}
              whileTap={{ scale: 0.98 }}
              className={`w-full px-6 py-3 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center ${
                (!emailValid || !passwordValid || isSubmitting)
                  ? 'bg-blue-600/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg hover:shadow-blue-500/20'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </>
              ) : (
                <span className="text-white">Acessar minha conta</span>
              )}
            </motion.button>
          </form>

          {/* Link para registro */}
          <div className="text-center pt-4 border-t border-zinc-800">
            <p className="text-sm text-zinc-400">
              Não tem uma conta?{' '}
              <Link href="/Register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}