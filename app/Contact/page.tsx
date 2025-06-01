"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheckCircle } from "react-icons/fi";
import { FiLinkedin, FiTwitter, FiFacebook, FiInstagram } from "react-icons/fi";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação dos campos obrigatórios
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validação básica de email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitError("Por favor, insira um email válido.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Simulação de envio (substitua por sua lógica real)
      console.log("Dados do formulário:", formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Limpar formulário após envio bem-sucedido
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setSubmitError("Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.");
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
      title: "Telefone (Victor Rosseti)",
      value: "+55 (27) 99903-2832 ",
      link: "tel:+5527999032832"
    },
    {
      icon: <FiMapPin className="w-5 h-5" />,
      title: "Endereço",
      value: "Av. Liberdade, 532 - Liberdade, São Paulo - SP",
      link: "https://maps.google.com/?q=Av. Liberdade, 532, São Paulo"
    }
  ];

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6 lg:px-8 min-w-[320px]">
      <div className="z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 sm:px-6 py-12 md:py-16 max-w-6xl"
        >
          {/* Header */}
          <div className="text-center pt-10 pb-20">
            <motion.h1 
              className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white mb-3 sm:mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Fale <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">conosco</span>
            </motion.h1>
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-md sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Tem alguma dúvida ou precisa de suporte? Nossa equipe está pronta para ajudar.
            </motion.p>
          </div>

          {/* Grid Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* Seção de Informações de Contato */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-5 sm:space-y-6"
            >
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2.5 sm:p-3 bg-blue-900/30 rounded-lg text-blue-400">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-white mb-1">{item.title}</h3>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-zinc-400 hover:text-blue-400 transition-colors"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}

              {/* Redes Sociais */}
              <div className="pt-5 sm:pt-6 border-t border-zinc-800">
                <h3 className="text-base sm:text-lg font-medium text-white mb-3 sm:mb-4">Redes Sociais</h3>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {[
                    { name: "LinkedIn", icon: <FiLinkedin className="w-5 h-5" />, color: "hover:bg-blue-600" },
                    { name: "Twitter", icon: <FiTwitter className="w-5 h-5" />, color: "hover:bg-blue-400" },
                    { name: "Facebook", icon: <FiFacebook className="w-5 h-5" />, color: "hover:bg-blue-700" },
                    { name: "Instagram", icon: <FiInstagram className="w-5 h-5" />, color: "hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-yellow-500" }
                  ].map((social, index) => (
                    <div key={index} className="relative group">
                      <a
                        href="#"
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-colors ${social.color}`}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                      <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-xs text-white bg-zinc-700 rounded whitespace-nowrap">
                        {social.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mapa */}
              <div className="mt-6 sm:mt-8 bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden h-40 sm:h-48">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.3120178119443!2d-46.6395273593805!3d-23.557234778890834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59a8b4d648f9%3A0x862df06cefe8bc3e!2sFECAP%20-%20Funda%C3%A7%C3%A3o%20Escola%20de%20Com%C3%A9rcio%20%C3%81lvares%20Penteado%20-%20Campus%20Liberdade!5e0!3m2!1sen!2sbr!4v1745637594036!5m2!1sen!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}