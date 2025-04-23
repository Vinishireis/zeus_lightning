"use client";

import { AuroraBackground } from "@/components/aurora-background";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheckCircle } from "react-icons/fi";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail className="w-5 h-5" />,
      title: "Email",
      value: "contato@zeuslightning.com",
      link: "mailto:contato@zeuslightning.com"
    },
    {
      icon: <FiPhone className="w-5 h-5" />,
      title: "Telefone",
      value: "+55 (11) 98765-4321",
      link: "tel:+5511987654321"
    },
    {
      icon: <FiMapPin className="w-5 h-5" />,
      title: "Endereço",
      value: "Av. Paulista, 1000 - São Paulo, SP",
      link: "https://maps.google.com/?q=Av. Paulista, 1000, São Paulo"
    }
  ];

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 max-w-6xl"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Fale <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">conosco</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Tem alguma dúvida ou precisa de suporte? Nossa equipe está pronta para ajudar.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400 mr-4">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-blue-400 transition-colors"
                  >
                    {item.value}
                  </a>
                </div>
              </div>
            ))}

            {/* Social Media */}
            <div className="pt-6 border-t border-zinc-800">
              <h3 className="text-lg font-medium text-white mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                {["LinkedIn", "Twitter", "Facebook", "Instagram"].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                  >
                    {social.charAt(0)}
                  </a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden h-48">
              <div className="w-full h-full flex items-center justify-center text-zinc-500">
                Mapa do Local
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {submitSuccess ? (
              <div className="bg-emerald-900/30 border border-emerald-800/50 rounded-xl p-8 text-center">
                <FiCheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Mensagem Enviada!</h3>
                <p className="text-zinc-300 mb-6">
                  Obrigado por entrar em contato. Nossa equipe responderá em breve.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg font-medium transition-all duration-200"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-500 transition-all duration-200"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-500 transition-all duration-200"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-zinc-300 mb-1">
                      Assunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-500 transition-all duration-200"
                      placeholder="Qual é o assunto?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-1">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-zinc-500 transition-all duration-200"
                      placeholder="Sua mensagem..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center ${
                      isSubmitting
                        ? 'bg-blue-600/50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-2" /> Enviar Mensagem
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}