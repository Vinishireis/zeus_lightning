"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FiUpload, FiFile, FiImage, FiSend, FiUser, FiCpu } from "react-icons/fi";
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
  const hasAddedReport = useRef(false);
  // Zustand store for ESG report
  const { apiResponse, clearApiResponse } = useStore();

  // Add ESG report to messages when available
  useEffect(() => {
    if (apiResponse && !messages.some(msg => msg.id.startsWith('report-')) && !hasAddedReport.current) {
      hasAddedReport.current = true;
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
  }, [apiResponse, clearApiResponse]);

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
        className="container mx-auto px-4 py-12 max-w-4xl"
      >
        <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/90 backdrop-blur-xl rounded-2xl border border-zinc-700 shadow-2xl shadow-zinc-900/50 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-800">
            <h1 className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 text-transparent">
              {apiResponse ? 'Análise de Relatório ESG' : 'ATENA'}
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              {apiResponse ? 'Analise seu relatório ESG' : 'Consultoria ESG'}
            </p>
          </div>

          {/* Chat Container */}
          <div className="p-6 h-[500px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="p-4 bg-zinc-800/50 rounded-full mb-4">
                  <Image 
                  src="/atena.png" 
                  alt="Atena" 
                  width={100} 
                  height={100} 
                  className="object-cover rounded-full" 
                  />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  {apiResponse ? 'Seu relatório está pronto!' : 'Como posso ajudar?'}
                </h2>
                <p className="text-zinc-400 max-w-md">
                  {apiResponse 
                    ? 'Faça perguntas sobre seu relatório ESG' 
                    : 'Envie documentos, imagens e dúvidas para análise'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border border-blue-500/20"
                          : "bg-zinc-800/50 border border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                            message.role === "user" ? "bg-blue-500" : "bg-indigo-500"
                          }`}
                        >
                          {message.role === "user" ? (
                            <FiUser className="h-3 w-3 text-white" />
                          ) : (
                            <FiCpu className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span className="text-xs font-medium text-zinc-300">
                          {message.role === "user" ? "Você" : "Assistente"}
                        </span>
                      </div>

                      {message.file && (
                        <div className="mb-3 p-3 bg-zinc-900/50 rounded-lg border border-zinc-700">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 mr-3">
                              {message.file.type.startsWith("image/") ? (
                                <div className="w-10 h-10 rounded bg-zinc-700 flex items-center justify-center overflow-hidden">
                                  <Image
                                    src={message.file.preview}
                                    alt={`Preview ${message.file.name}`}
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                              ) : (
                                <div className="w-10 h-10 rounded bg-zinc-700 flex items-center justify-center">
                                  {getFileIcon(message.file.type)}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">
                                {message.file.name}
                              </p>
                              <p className="text-xs text-zinc-400">
                                {formatFileSize(message.file.size)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <p className="text-white whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[80%] rounded-2xl p-4 bg-zinc-800/50 border border-zinc-700">
                      <div className="flex space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div 
                            key={i}
                            className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse"
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

          {/* Input Area */}
          <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/30">
            {files.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-zinc-300">Arquivo selecionado</h3>
                  <button
                    onClick={removeFile}
                    className="text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
                  >
                    Remover
                  </button>
                </div>
                <div className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      {files[0].type.startsWith("image/") ? (
                        <div className="w-10 h-10 rounded bg-zinc-700 flex items-center justify-center overflow-hidden">
                          <Image
                            src={files[0].preview}
                            alt={`Preview ${files[0].name}`}
                            width={40}
                            height={40}
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded bg-zinc-700 flex items-center justify-center">
                          {getFileIcon(files[0].type)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {files[0].name}
                      </p>
                      <p className="text-xs text-zinc-400">
                        {formatFileSize(files[0].size)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <div
                {...getRootProps()}
                className={`p-2 rounded-lg ${isDragActive ? 'bg-blue-900/30 border border-blue-500/50' : 'bg-zinc-800 hover:bg-zinc-700'} cursor-pointer transition-colors`}
              >
                <input {...getInputProps()} />
                <FiUpload className="h-5 w-5 text-zinc-400" />
              </div>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={files.length > 0 
                    ? "Digite sua pergunta sobre o arquivo..." 
                    : "Digite sua mensagem..."}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isProcessing}
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={(!inputMessage.trim() && files.length === 0) || isProcessing}
                className={`p-3 rounded-lg focus:outline-none transition-all ${
                  (!inputMessage.trim() && files.length === 0) || isProcessing
                    ? "bg-blue-600/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                }`}
              >
                <FiSend className="h-5 w-5 text-white" />
              </button>
            </div>
            
            <p className="mt-2 text-xs text-zinc-500 text-center">
              Formatos suportados: JPG, PNG, PDF, TXT, CSV, JSON, DOCX, XLSX (Até 50MB)
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}