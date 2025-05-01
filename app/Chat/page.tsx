"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FiUpload, FiX, FiFile, FiImage, FiVideo, FiFileText, FiSend, FiUser, FiCpu } from "react-icons/fi";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Image from "next/image";

type FileWithPreview = File & {
  preview: string;
  status: "pending" | "uploaded" | "error";
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
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      ...file,
      preview: URL.createObjectURL(file),
      status: "pending" as const,
      type: file.type || "application/octet-stream",
      size: file.size || 0,
      name: file.name || "Arquivo sem nome"
    }));

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/json": [".json"],
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"]
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: false
  });

  const removeFile = useCallback(() => {
    setFiles(prevFiles => {
      const removedFile = prevFiles[0];
      URL.revokeObjectURL(removedFile.preview);
      return [];
    });
  }, []);

  const extractTextFromFile = async (file: FileWithPreview): Promise<string> => {
    try {
      if (file.type.startsWith("image/")) {
        // Para imagens, retornamos apenas informações básicas
        return `[Imagem: ${file.name}]`;
      } else if (file.type === "application/pdf") {
        // Simulação de extração de texto de PDF
        return `[Conteúdo extraído do PDF: ${file.name}]`;
      } else if (file.type === "text/plain" || file.type === "application/json" || file.type === "text/csv") {
        // Para arquivos de texto, lemos o conteúdo
        const text = await file.text();
        return text;
      } else {
        // Para outros tipos de arquivo
        return `[Arquivo: ${file.name}, Tipo: ${file.type}]`;
      }
    } catch (error) {
      console.error("Erro ao extrair texto do arquivo:", error);
      return `[Erro ao processar o arquivo: ${file.name}]`;
    }
  };

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
      file: files.length > 0 ? files[0] : null,
      fileContent
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    
    if (files.length > 0) {
      setFiles([]);
    }

    setIsProcessing(true);
    
    try {
      // Simulação de chamada à API para processar a mensagem e o arquivo
      const response = await processMessageWithAPI(userMessage.content, fileContent, userMessage.file);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant"
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Erro ao processar mensagem:", error);
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
        role: "assistant"
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsProcessing(false);
    }
  };


  // Simulação de chamada à API
  const processMessageWithAPI = async (message: string, fileContent: string, file?: FileWithPreview | null): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("message", message);
      
      if (file) {
        formData.append("file", file);
      } else if (fileContent) {
        formData.append("fileContent", fileContent);
      }
  
      const response = await fetch("#", {
        method: "POST",
        body: formData
      });
  
      if (!response.ok) {
        throw new Error("Erro ao processar mensagem");
      }
  
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Erro na chamada da API:", error);
      throw error;
    }
  };

  const getFileIcon = (type: string) => {
    if (!type) return <FiFile className="text-zinc-400" />;
    if (type.startsWith("image/")) return <FiImage className="text-blue-400" />;
    if (type.startsWith("video/")) return <FiVideo className="text-purple-400" />;
    if (type === "application/pdf") return <FiFileText className="text-red-400" />;
    if (type === "text/plain") return <FiFileText className="text-green-400" />;
    if (type === "application/json") return <FiFileText className="text-yellow-400" />;
    return <FiFile className="text-zinc-400" />;
  };

  const formatFileSize = (bytes: number) => {
    if (isNaN(bytes) || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-black">
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
              Chat com Arquivos
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Envie arquivos e interaja com seu conteúdo
            </p>
          </div>

          {/* Chat Container */}
          <div className="p-6 h-[500px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="p-4 bg-zinc-800/50 rounded-full mb-4">
                  <FiCpu className="h-8 w-8 text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Como posso ajudar hoje?</h2>
                <p className="text-zinc-400 max-w-md">
                  Envie documentos, imagens ou textos e faça perguntas sobre seu conteúdo.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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
                              {message.file.type?.startsWith("image/") ? (
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
                                {message.file.size ? formatFileSize(message.file.size) : "Tamanho não disponível"}
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
                        <div className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse delay-100"></div>
                        <div className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse delay-200"></div>
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
                  <h3 className="text-sm font-medium text-zinc-300">Arquivo para enviar</h3>
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
                      {files[0].type?.startsWith("image/") ? (
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
                        {files[0].size ? formatFileSize(files[0].size) : "Tamanho não disponível"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <div
                {...getRootProps()}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 cursor-pointer transition-colors"
              >
                <input {...getInputProps()} />
                <FiUpload className="h-5 w-5 text-zinc-400" />
              </div>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={files.length > 0 ? "Digite sua pergunta sobre o arquivo..." : "Digite sua mensagem..."}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              Formatos suportados: JPG, PNG, PDF, TXT, JSON, CSV, DOCX, XLSX, PPTX (Até 50MB)
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}