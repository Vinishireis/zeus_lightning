"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FiUpload, FiFile, FiImage, FiSend, FiUser, FiCpu, FiMessageSquare } from "react-icons/fi";
import Image from "next/image";
import { useStore } from "@/lib/store";

type FileWithPreview = File & {
  preview: string;
  type: string;
  size: number;
  name: string;
};

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  file?: FileWithPreview | null;
  fileContent?: string;
};

export default function ChatPage() {
  // State management
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Zustand store for ESG report
  const { apiResponse, clearApiResponse } = useStore();

  // Add ESG report to messages when available
  useEffect(() => {
    if (apiResponse && !messages.some(msg => msg.id.startsWith('report-'))) {
      const reportMessage: Message = {
        id: `report-${Date.now()}`,
        content: `📊 Relatório ESG Gerado\n\n${apiResponse}`,
        role: "assistant"
      };
      
      setMessages(prev => [...prev, reportMessage]);
      clearApiResponse();
      
      // Scroll to bottom after adding report
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [apiResponse, messages, clearApiResponse]);

  // File drop handler
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const newFiles = acceptedFiles.map(file => ({
      ...file,
      preview: URL.createObjectURL(file),
      type: file.type || "application/octet-stream",
      size: file.size || 0,
      name: file.name || "Arquivo sem nome"
    }));

    // Only keep the first file if multiple is false
    setFiles([newFiles[0]]);
  }, []);

  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
      "text/*": [".txt", ".csv"],
      "application/json": [".json"],
      "application/vnd.openxmlformats-officedocument.*": [".docx", ".xlsx", ".pptx"]
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: false,
    noClick: false,
    noKeyboard: true
  });

  // Remove file handler
  const removeFile = useCallback(() => {
    setFiles(prevFiles => {
      if (prevFiles.length > 0) {
        URL.revokeObjectURL(prevFiles[0].preview);
      }
      return [];
    });
  }, []);

  // Extract text from different file types
  const extractTextFromFile = async (file: FileWithPreview): Promise<string> => {
    try {
      if (file.type.startsWith("image/")) {
        return `[Arquivo de imagem: ${file.name}]`;
      } else if (file.type === "application/pdf") {
        return `[Conteúdo PDF: ${file.name}]`;
      } else if (file.type.startsWith("text/")) {
        return await file.text();
      } else {
        return `[Arquivo: ${file.name}, Tipo: ${file.type}]`;
      }
    } catch (error) {
      console.error("Erro ao extrair texto:", error);
      return `[Erro ao processar arquivo: ${file.name}]`;
    }
  };

  // Send message handler
  const handleSendMessage = async () => {
    if ((!inputMessage.trim() && files.length === 0) || isProcessing) return;

    let fileContent = "";
    if (files.length > 0) {
      fileContent = await extractTextFromFile(files[0]);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      file: files[0] || null,
      fileContent
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setFiles([]);
    setIsProcessing(true);

    try {
      // Simulate API processing with actual API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const responseContent = files.length > 0
        ? `Analisei seu arquivo ${files[0].name}:\n${fileContent.substring(0, 150)}${fileContent.length > 150 ? '...' : ''}`
        : `Resposta para: "${inputMessage}"`;

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: "assistant"
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error processing message:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
        role: "assistant"
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // File icon component
  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <FiImage className="text-blue-400" />;
    if (type === "application/pdf") return <FiFile className="text-red-400" />;
    return <FiFile className="text-zinc-400" />;
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Auto-scroll to new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mx-auto px-4 py-6"
      >
        <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/90 backdrop-blur-xl rounded-xl border border-zinc-700 shadow-lg shadow-zinc-900/50 overflow-hidden">
          {/* Header compacto */}
          <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 text-transparent">
                {apiResponse ? 'Análise ESG' : 'ATENA'}
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                {apiResponse ? 'Analisando seu relatório' : 'Consultoria inteligente'}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
              <FiMessageSquare className="text-blue-400" />
            </div>
          </div>
  
          {/* Área de mensagens ajustada */}
          <div className="p-4 h-[60vh] max-h-[500px] overflow-y-auto custom-scrollbar">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="p-3 bg-zinc-800/50 rounded-full mb-3">
                  <Image 
                    src="/atena.png" 
                    alt="Atena" 
                    width={60} 
                    height={60} 
                    className="object-cover rounded-full"
                  />
                </div>
                <h2 className="text-lg font-medium text-white mb-1">
                  {apiResponse ? 'Relatório carregado!' : 'Como posso ajudar?'}
                </h2>
                <p className="text-sm text-zinc-400 max-w-xs">
                  {apiResponse 
                    ? 'Faça perguntas sobre seu documento' 
                    : 'Envie arquivos ou digite sua dúvida'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-blue-600/20 border border-blue-500/30"
                          : "bg-zinc-800/40 border border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                            message.role === "user" ? "bg-blue-500" : "bg-indigo-500"
                          }`}
                        >
                          {message.role === "user" ? (
                            <FiUser className="h-2.5 w-2.5 text-white" />
                          ) : (
                            <FiCpu className="h-2.5 w-2.5 text-white" />
                          )}
                        </div>
                        <span className="text-xs font-medium text-zinc-300">
                          {message.role === "user" ? "Você" : "ATENA"}
                        </span>
                      </div>
  
                      {message.file && (
                        <div className="mb-2 p-2 bg-zinc-900/40 rounded border border-zinc-700">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 mr-2">
                              {message.file.type.startsWith("image/") ? (
                                <div className="w-8 h-8 rounded bg-zinc-700 flex items-center justify-center overflow-hidden">
                                  <Image
                                    src={message.file.preview}
                                    alt={`Preview ${message.file.name}`}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                              ) : (
                                <div className="w-8 h-8 rounded bg-zinc-700 flex items-center justify-center">
                                  {getFileIcon(message.file.type)}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-white truncate">
                                {message.file.name}
                              </p>
                              <p className="text-[10px] text-zinc-400">
                                {formatFileSize(message.file.size)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
  
                      <p className="text-sm text-white whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[85%] rounded-lg p-3 bg-zinc-800/40 border border-zinc-700">
                      <div className="flex space-x-1.5">
                        {[...Array(3)].map((_, i) => (
                          <div 
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse"
                            style={{ animationDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
  
          {/* Área de input compacta */}
          <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/30">
            {files.length > 0 && (
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-zinc-300">Arquivo anexado</span>
                  <button
                    onClick={removeFile}
                    className="text-xs text-zinc-400 hover:text-zinc-200"
                  >
                    Remover
                  </button>
                </div>
                <div className="p-2 bg-zinc-800/40 rounded border border-zinc-700">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded bg-zinc-700 flex items-center justify-center mr-2">
                      {files[0].type.startsWith("image/") ? (
                        <Image
                          src={files[0].preview}
                          alt={`Preview ${files[0].name}`}
                          width={24}
                          height={24}
                          className="object-cover rounded"
                          unoptimized
                        />
                      ) : (
                        getFileIcon(files[0].type)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">
                        {files[0].name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
  
            <div className="flex items-center gap-2">
              <div
                {...getRootProps()}
                className={`p-1.5 rounded-md ${
                  isDragActive 
                    ? 'bg-blue-900/30 border border-blue-500/50' 
                    : 'bg-zinc-800 hover:bg-zinc-700'
                } cursor-pointer transition-colors`}
              >
                <input {...getInputProps()} />
                <FiUpload className="h-4 w-4 text-zinc-400" />
              </div>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={files.length > 0 
                    ? "Digite sua pergunta..." 
                    : "Digite sua mensagem..."}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  disabled={isProcessing}
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={(!inputMessage.trim() && files.length === 0) || isProcessing}
                className={`p-2 rounded-md ${
                  (!inputMessage.trim() && files.length === 0) || isProcessing
                    ? "bg-blue-600/30 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                }`}
              >
                <FiSend className="h-4 w-4 text-white" />
              </button>
            </div>
            
            <p className="mt-1 text-[10px] text-zinc-500 text-center">
              Formatos: JPG, PNG, PDF, TXT, CSV, JSON (Até 50MB)
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}