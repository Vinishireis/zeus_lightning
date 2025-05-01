"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiAlertCircle, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => setNameValid(name.length >= 3), [name]);
  useEffect(() => setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)), [email]);
  useEffect(() => {
    setPasswordValid(password.length >= 8);
    setPasswordsMatch(password === confirmPassword && confirmPassword.length > 0);
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
  
    try {
      // 1. Cria o usuário no Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }, // Campos adicionais (opcional)
        },
      });
  
      if (error) throw new Error(error.message);
      
      // 2. Mostra mensagem de sucesso
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao cadastrar");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center min-h-screen p-6"
        >
          <div className="w-full max-w-md bg-gradient-to-br from-zinc-900/80 to-zinc-800/90 backdrop-blur-sm sm:backdrop-blur-md rounded-xl border border-zinc-700 shadow-lg p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mx-auto w-16 h-16 bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30"
            >
              <FiCheckCircle className="h-8 w-8 text-emerald-400" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-white mb-3">Conta criada com sucesso!</h2>
            <p className="text-zinc-400 mb-6">Bem-vindo ao Zeus Lightning</p>
            
            <Link
              href="/Login"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-medium transition-all duration-300"
            >
              Ir para Login
            </Link>
          </div>
        </motion.div>
      </AuroraBackground>
    );
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-black ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col min-h-screen p-4 sm:p-6"
      >
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto bg-gradient-to-br from-zinc-900/80 to-zinc-800/90 backdrop-blur-sm sm:backdrop-blur-md rounded-xl border border-zinc-700 shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-6 sm:p-8">
              <Link href="/Login" className="inline-flex items-center text-sm text-zinc-400 hover:text-zinc-300 mb-6">
                <FiArrowLeft className="mr-2" /> Voltar
              </Link>
              
              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Criar Conta</h1>
                <p className="text-sm sm:text-base text-zinc-400">Preencha seus dados para começar</p>
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Name Field */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-zinc-300 mb-1">Nome Completo</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 sm:py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Seu nome completo"
                      required
                    />
                    {name && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {nameValid ? (
                          <FiCheckCircle className="text-emerald-500" />
                        ) : (
                          <FiAlertCircle className="text-amber-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {name && !nameValid && (
                    <p className="mt-1 text-xs text-amber-500">Mínimo 3 caracteres</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-zinc-300 mb-1">Email</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 sm:py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="seu@email.com"
                      required
                    />
                    {email && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {emailValid ? (
                          <FiCheckCircle className="text-emerald-500" />
                        ) : (
                          <FiAlertCircle className="text-amber-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {email && !emailValid && (
                    <p className="mt-1 text-xs text-amber-500">Email inválido</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-zinc-300 mb-1">Senha</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 sm:py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
                      required
                    />
                    {password && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {passwordValid ? (
                          <FiCheckCircle className="text-emerald-500" />
                        ) : (
                          <FiAlertCircle className="text-amber-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {password && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-zinc-400 mb-1">
                        <span>Força da senha:</span>
                        <span>
                          {password.length >= 12 ? "Forte" :
                           password.length >= 8 ? "Média" : "Fraca"}
                        </span>
                      </div>
                      <div className="w-full bg-zinc-700 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            password.length >= 12 ? "bg-emerald-500" :
                            password.length >= 8 ? "bg-amber-500" : "bg-red-500"
                          }`}
                          style={{ width: `${Math.min(100, (password.length / 12) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-zinc-300 mb-1">Confirmar Senha</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 sm:py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
                      required
                    />
                    {confirmPassword && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {passwordsMatch ? (
                          <FiCheckCircle className="text-emerald-500" />
                        ) : (
                          <FiAlertCircle className="text-amber-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {confirmPassword && !passwordsMatch && (
                    <p className="mt-1 text-xs text-amber-500">As senhas não coincidem</p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-zinc-600 rounded bg-zinc-800 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <label htmlFor="terms" className="ml-3 text-xs sm:text-sm text-zinc-300">
                    Concordo com os <Link href="/Terms" className="text-blue-400 hover:underline">Termos</Link> e <Link href="/Privacy_Policy" className="text-blue-400 hover:underline">Política de Privacidade</Link>
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-900/30 text-red-300 rounded-lg flex items-center text-sm">
                    <FiAlertCircle className="mr-2 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!nameValid || !emailValid || !passwordValid || !passwordsMatch || isSubmitting}
                  className={`w-full py-2 sm:py-3 px-4 rounded-lg font-medium text-white transition-colors duration-300 ${
                    isSubmitting || !nameValid || !emailValid || !passwordValid || !passwordsMatch
                      ? 'bg-blue-600/50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Criando conta...
                    </span>
                  ) : (
                    'Criar Conta'
                  )}
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="px-6 sm:px-8 py-4 border-t border-zinc-800 text-center">
              <p className="text-xs sm:text-sm text-zinc-400">
                Já tem uma conta?{' '}
                <Link href="/Login" className="font-medium text-blue-400 hover:text-blue-300">
                  Fazer Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}