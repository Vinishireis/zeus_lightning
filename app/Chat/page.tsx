"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FiUpload, FiFile, FiImage, FiSend, FiUser, FiCpu, FiMessageSquare, FiPlus, FiTrash2, FiX } from "react-icons/fi";
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
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    apiResponse,
    esgData,
    clearApiResponse,
    conversations,
    currentConversationId,
    addConversation,
    setCurrentConversation,
    updateConversation,
    deleteConversation
  } = useStore();
  
  const currentConversation = conversations.find(c => c.id === currentConversationId) || 
    (conversations.length > 0 ? conversations[0] : null);

  const messages = currentConversation?.messages || [];

  // Cria nova conversa
  const createNewConversation = useCallback(() => {
    const newConversation = {
      id: Date.now().toString(),
      title: `Conversa ${conversations.length + 1}`,
      messages: [],
      createdAt: Date.now(),
      esgData: null
    };
    addConversation(newConversation);
    setCurrentConversation(newConversation.id);
    setShowHistory(false);
  }, [conversations.length, addConversation, setCurrentConversation]);

  // Efeito para adicionar relatório ESG à conversa
  useEffect(() => {
    if (apiResponse && esgData && currentConversation && 
        !currentConversation.messages.some(msg => msg.id.startsWith('report-'))) {
      
      const reportMessage: Message = {
        id: `report-${Date.now()}`,
        content: `📊 Relatório ESG Gerado\n\n${apiResponse}`,
        role: "assistant"
      };
      
      const updatedMessages = [...currentConversation.messages, reportMessage];
      updateConversation(currentConversation.id, updatedMessages);
      clearApiResponse();
      
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [apiResponse, esgData, currentConversation, clearApiResponse, updateConversation]);

  // Configuração do dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const newFiles = acceptedFiles.map(file => ({
      ...file,
      preview: URL.createObjectURL(file),
      type: file.type || "application/octet-stream",
      size: file.size || 0,
      name: file.name || "Arquivo sem nome"
    }));

    setFiles([newFiles[0]]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
      "text/*": [".txt", ".csv"],
      "application/json": [".json"],
      "application/vnd.openxmlformats-officedocument.*": [".docx", ".xlsx", ".pptx"]
    },
    maxSize: 50 * 1024 * 1024,
    multiple: false,
    noClick: false,
    noKeyboard: true
  });

  // Remove arquivo
  const removeFile = useCallback(() => {
    setFiles(prevFiles => {
      if (prevFiles.length > 0) {
        URL.revokeObjectURL(prevFiles[0].preview);
      }
      return [];
    });
  }, []);

  // Extrai texto do arquivo em chunks
  const extractTextFromFile = async (file: FileWithPreview): Promise<string> => {
    try {
      setProcessingStage('Lendo arquivo...');
      
      if (file.type.startsWith("image/")) {
        return `[Arquivo de imagem: ${file.name}]`;
      } else if (file.type === "application/pdf") {
        return await processPdfInChunks(file);
      } else if (file.type.startsWith("text/")) {
        return await processTextFileInChunks(file);
      } else {
        return `[Arquivo: ${file.name}, Tipo: ${file.type}]`;
      }
    } catch (error) {
      console.error("Erro ao extrair texto:", error);
      return `[Erro ao processar arquivo: ${file.name}]`;
    } finally {
      setProcessingStage('');
    }
  };

  // Processa PDF em chunks
  const processPdfInChunks = async (file: File): Promise<string> => {
    // Implementação simulada - na prática use uma lib como pdf-parse
    const chunkSize = 1024 * 1024; // 1MB
    const totalChunks = Math.ceil(file.size / chunkSize);
    let content = '';
    
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      
      setUploadProgress(Math.round(((i + 1) / totalChunks) * 100));
      setProcessingStage(`Processando PDF (parte ${i+1}/${totalChunks})...`);
      
      // Simula processamento do chunk
      await new Promise(resolve => setTimeout(resolve, 500));
      content += `[PDF Chunk ${i+1}]\n`;
    }
    
    return content;
  };

  // Processa arquivos de texto em chunks
  const processTextFileInChunks = async (file: File): Promise<string> => {
    const chunkSize = 1024 * 1024; // 1MB
    const totalChunks = Math.ceil(file.size / chunkSize);
    let content = '';
    
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      
      setUploadProgress(Math.round(((i + 1) / totalChunks) * 100));
      setProcessingStage(`Lendo arquivo (parte ${i+1}/${totalChunks})...`);
      
      const text = await chunk.text();
      content += text;
    }
    
    return content;
  };

  // Envia mensagem
  const handleSendMessage = async () => {
    if ((!inputMessage.trim() && files.length === 0) || isProcessing || !currentConversation) return;

    let fileContent = "";
    if (files.length > 0) {
      try {
        setIsProcessing(true);
        setUploadProgress(0);
        fileContent = await extractTextFromFile(files[0]);
      } catch (error) {
        console.error("Erro ao processar arquivo:", error);
        fileContent = `[Erro ao processar arquivo: ${files[0].name}]`;
      }
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      file: files[0] || null,
      fileContent
    };

    const updatedMessages = [...currentConversation.messages, userMessage];
    updateConversation(currentConversation.id, updatedMessages);
    
    setInputMessage("");
    setFiles([]);

    try {
      setProcessingStage('Processando resposta...');
      
      // Simula processamento da IA
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const responseContent = files.length > 0
        ? `Analisei seu arquivo ${files[0].name}:\n${fileContent.substring(0, 150)}${fileContent.length > 150 ? '...' : ''}`
        : `Resposta para: "${inputMessage}"`;

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: "assistant"
      };

      updateConversation(currentConversation.id, [...updatedMessages, aiResponse]);
    } catch (error) {
      console.error("Error processing message:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
        role: "assistant"
      };
      updateConversation(currentConversation.id, [...updatedMessages, errorResponse]);
    } finally {
      setIsProcessing(false);
      setUploadProgress(0);
      setProcessingStage('');
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // Ícone do arquivo
  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <FiImage className="text-blue-400" />;
    if (type === "application/pdf") return <FiFile className="text-red-400" />;
    return <FiFile className="text-zinc-400" />;
  };

  // Formata tamanho do arquivo
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Efeitos para scroll e limpeza
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  useEffect(() => {
    if (conversations.length === 0) {
      createNewConversation();
    }
  }, [conversations.length, createNewConversation]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6 lg:px-8 min-w-[320px]">
      {/* History Panel */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/80 z-20 flex justify-center items-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-700 w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Histórico de Conversas</h2>
              <button
                onClick={() => setShowHistory(false)}
                className="p-1 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <button
                onClick={createNewConversation}
                className="w-full mb-4 flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-white transition-colors"
              >
                <FiPlus /> Nova Conversa
              </button>
              
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => {
                      setCurrentConversation(conversation.id);
                      setShowHistory(false);
                    }}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      currentConversation?.id === conversation.id
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-gray-800/50 hover:bg-gray-800/70"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-white truncate">
                        {conversation.title}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteConversation(conversation.id);
                        }}
                        className="text-gray-500 hover:text-red-400 p-1"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(conversation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Chat Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-3xl mx-auto"
      >
        <div className="bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-800 shadow-xl overflow-hidden flex flex-col h-[80vh] max-h-[800px]">
          {/* Header */}
          <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
            <button
              onClick={() => setShowHistory(true)}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <FiMessageSquare size={20} />
            </button>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-white">
                {currentConversation?.title || 'Nova Conversa'}
              </h1>
              <p className="text-xs text-gray-400">
                {messages.length > 0 ? `${messages.length} mensagens` : 'Comece uma nova conversa'}
              </p>
            </div>
            <div className="w-8"></div> {/* Spacer for balance */}
          </div>
  
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="p-3 bg-gray-800/50 rounded-full mb-4">
                  <Image 
                    src="/atena.png" 
                    alt="Atena" 
                    width={72} 
                    height={72} 
                    className="object-cover rounded-full"
                  />
                </div>
                <h2 className="text-xl font-medium text-white mb-2">
                  Como posso ajudar?
                </h2>
                <p className="text-sm text-gray-400 max-w-md">
                  Envie arquivos ou digite sua dúvida para começar
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
                      className={`max-w-[85%] rounded-xl p-3 ${
                        message.role === "user"
                          ? "bg-blue-600/20 border border-blue-500/30"
                          : "bg-gray-800/60 border border-gray-700"
                      }`}
                    >
                      <div className="flex items-center mb-1.5 gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === "user" ? "bg-blue-500" : "bg-indigo-500"
                          }`}
                        >
                          {message.role === "user" ? (
                            <FiUser className="h-3 w-3 text-white" />
                          ) : (
                            <FiCpu className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span className="text-xs font-medium text-gray-300">
                          {message.role === "user" ? "Você" : "ATENA"}
                        </span>
                      </div>
  
                      {message.file && (
                        <div className="mb-2 p-2 bg-gray-900/40 rounded-lg border border-gray-700">
                          <div className="flex items-center gap-2">
                            <div className="flex-shrink-0">
                              {message.file.type?.startsWith("image/") ? (
                                <div className="w-10 h-10 rounded bg-gray-700 flex items-center justify-center overflow-hidden">
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
                                <div className="w-10 h-10 rounded bg-gray-700 flex items-center justify-center">
                                  {getFileIcon(message.file.type || '')}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">
                                {message.file.name}
                              </p>
                              {message.file.type && (
                                <p className="text-xs text-gray-400">
                                  {message.file.type.split('/')[1]?.toUpperCase() || message.file.type}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
  
                      <p className="text-sm text-gray-100 whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[85%] rounded-xl p-3 bg-gray-800/60 border border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                          <FiCpu className="h-3 w-3 text-white" />
                        </div>
                        <div className="flex space-x-1.5">
                          {[...Array(3)].map((_, i) => (
                            <div 
                              key={i}
                              className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
                              style={{ animationDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
  
          {/* Input Area */}
          <div className="p-4 border-t border-gray-800 bg-gray-900/50">
            {files.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-300">Arquivo anexado</span>
                  <button
                    onClick={removeFile}
                    className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    Remover
                  </button>
                </div>
                <div className="p-2 bg-gray-800/40 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center flex-shrink-0">
                      {files[0].type.startsWith("image/") ? (
                        <Image
                          src={files[0].preview}
                          alt={`Preview ${files[0].name}`}
                          width={32}
                          height={32}
                          className="object-cover rounded"
                          unoptimized
                        />
                      ) : (
                        getFileIcon(files[0].type)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {files[0].name}
                      </p>
                      <p className="text-xs text-gray-400">
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
                className={`p-2 rounded-lg flex-shrink-0 ${
                  isDragActive 
                    ? 'bg-blue-900/30 border border-blue-500/50' 
                    : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                } cursor-pointer transition-colors`}
              >
                <input {...getInputProps()} />
                <FiUpload className="h-5 w-5 text-gray-400" />
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
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 px-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isProcessing}
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={(!inputMessage.trim() && files.length === 0) || isProcessing}
                className={`p-2 rounded-lg flex-shrink-0 ${
                  (!inputMessage.trim() && files.length === 0) || isProcessing
                    ? "bg-blue-600/30 cursor-not-allowed text-gray-500"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } transition-colors`}
              >
                <FiSend className="h-5 w-5" />
              </button>
            </div>
            
            <p className="mt-2 text-xs text-gray-500 text-center">
              Formatos suportados: JPG, PNG, PDF, TXT, CSV, JSON (Até 50MB)
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}