"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FiUpload, FiX, FiFile, FiImage, FiVideo, FiMusic, FiFileText, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { AuroraBackground } from "@/components/aurora-background";
import Image from "next/image";

type FileWithPreview = File & {
  preview: string;
  uploadProgress: number;
  status: "pending" | "uploading" | "completed" | "error";
};

export default function UploadPage() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadComplete(false);
    setError("");

    const validFiles = acceptedFiles.filter(file => {
      if (!file.type) {
        console.warn(`Arquivo ${file.name} não tem tipo definido`);
        return false;
      }
      return true;
    });

    const newFiles = validFiles.map(file => ({
      ...file,
      preview: URL.createObjectURL(file),
      uploadProgress: 0,
      status: "pending" as const
    }));

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
      "video/*": [".mp4", ".mov", ".avi"],
      "audio/*": [".mp3", ".wav"],
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/json": [".json"]
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: true
  });

  const removeFile = useCallback((index: number) => {
    setFiles(prevFiles => {
      const newFiles = [...prevFiles];
      const removedFile = newFiles.splice(index, 1)[0];
      URL.revokeObjectURL(removedFile.preview);
      return newFiles;
    });
  }, []);

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Selecione pelo menos um arquivo para upload");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      await Promise.all(files.map(async (_, index) => {
        setFiles(prev => prev.map((f, i) => 
          i === index ? {...f, status: "uploading"} : f
        ));

        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
          setFiles(prev => prev.map((f, i) => 
            i === index ? {...f, uploadProgress: progress} : f
          ));
        }

        setFiles(prev => prev.map((f, i) => 
          i === index ? {...f, status: "completed"} : f
        ));
      }));

      setUploadComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no upload");
      setFiles(prev => prev.map(f => 
        f.status === "uploading" ? {...f, status: "error"} : f
      ));
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpload = useCallback(() => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
    setFiles([]);
    setUploadComplete(false);
  }, [files]);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <FiImage className="text-blue-400" />;
    if (type.startsWith("video/")) return <FiVideo className="text-purple-400" />;
    if (type.startsWith("audio/")) return <FiMusic className="text-emerald-400" />;
    if (type === "application/pdf") return <FiFileText className="text-red-400" />;
    return <FiFile className="text-zinc-400" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12 max-w-4xl"
      >
        <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/90 backdrop-blur-xl rounded-2xl border border-zinc-700 shadow-2xl shadow-zinc-900/50 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 text-transparent">
                Upload de Arquivos
              </h1>
              {files.length > 0 && !uploadComplete && (
                <button
                  onClick={resetUpload}
                  className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                  Limpar tudo
                </button>
              )}
            </div>
            <p className="mt-1 text-sm text-zinc-400">
              Envie seus arquivos para análise e geração de relatórios
            </p>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {uploadComplete ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="mx-auto w-20 h-20 bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30">
                  <FiCheckCircle className="h-10 w-10 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Upload concluído!</h2>
                <p className="text-zinc-400 mb-6">
                  {files.length} {files.length === 1 ? "arquivo foi" : "arquivos foram"} enviados com sucesso.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={resetUpload}
                    className="px-6 py-2 font-medium rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors border border-zinc-700"
                  >
                    Enviar mais arquivos
                  </button>
                  <button className="px-6 py-2 font-medium rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-200">
                    Ver relatórios
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Dropzone */}
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                    isDragActive
                      ? "border-blue-500 bg-blue-900/10"
                      : "border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-4 bg-zinc-800/50 rounded-full">
                      <FiUpload className="h-6 w-6 text-blue-400" />
                    </div>
                    {isDragActive ? (
                      <p className="text-lg font-medium text-blue-400">
                        Solte os arquivos aqui...
                      </p>
                    ) : (
                      <>
                        <p className="text-lg font-medium text-white">
                          Arraste e solte arquivos aqui
                        </p>
                        <p className="text-sm text-zinc-400">ou clique para selecionar</p>
                      </>
                    )}
                    <p className="text-xs text-zinc-500 mt-2">
                      Formatos suportados: JPG, PNG, GIF, MP4, PDF, TXT, JSON (Até 50MB cada)
                    </p>
                  </div>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <h3 className="text-sm font-medium text-zinc-300">
                      Arquivos selecionados ({files.length})
                    </h3>
                    <div className="space-y-3">
                      {files.map((file, index) => (
                        <motion.div
                          key={`${file.name}-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center p-3 bg-zinc-800/50 rounded-lg border border-zinc-700"
                        >
                          <div className="flex-shrink-0 mr-3">
                            {file.type.startsWith("image/") ? (
                              <div className="w-10 h-10 rounded bg-zinc-700 flex items-center justify-center overflow-hidden">
                                <Image
                                  src={file.preview}
                                  alt={`Preview ${file.name}`}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded bg-zinc-700 flex items-center justify-center">
                                {getFileIcon(file.type)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium text-white truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-zinc-400 ml-2">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                            <div className="mt-1">
                              {file.status === "uploading" && (
                                <div className="w-full bg-zinc-700 rounded-full h-1.5">
                                  <div
                                    className="h-1.5 rounded-full bg-blue-500"
                                    style={{ width: `${file.uploadProgress}%` }}
                                  ></div>
                                </div>
                              )}
                              {file.status === "completed" && (
                                <p className="text-xs text-emerald-400">Upload concluído</p>
                              )}
                              {file.status === "error" && (
                                <p className="text-xs text-red-400">Erro no upload</p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(index);
                            }}
                            className="ml-3 text-zinc-400 hover:text-zinc-300 transition-colors"
                            disabled={file.status === "uploading"}
                          >
                            <FiX />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-6 flex justify-between items-center">
                  <div>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-400 flex items-center"
                      >
                        <FiAlertCircle className="mr-1" /> {error}
                      </motion.div>
                    )}
                  </div>
                  <motion.button
                    onClick={handleUpload}
                    disabled={isUploading || files.length === 0}
                    whileTap={{ scale: 0.98 }}
                    className={`px-6 py-3 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-blue-500 transition-all duration-200 flex items-center ${
                      isUploading || files.length === 0
                        ? "bg-blue-600/50 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg hover:shadow-blue-500/20"
                    }`}
                  >
                    {isUploading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <FiUpload className="mr-2" />
                        Enviar {files.length > 0 && `(${files.length})`}
                      </>
                    )}
                  </motion.button>
                </div>
              </>
            )}
          </div>

          {/* Recent Uploads */}
          {!uploadComplete && (
            <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/30">
              <h3 className="text-sm font-medium text-zinc-300 mb-3">Uploads recentes</h3>
              <div className="flex items-center justify-center py-6 text-sm text-zinc-500">
                <p>Nenhum upload recente encontrado</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AuroraBackground>
  );
}