import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, message: "Nenhum arquivo enviado" });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Caminho onde os arquivos serão salvos
  const uploadDir = path.join(process.cwd(), "public/uploads");
  const filePath = path.join(uploadDir, file.name);

  try {
    await writeFile(filePath, buffer);
    return NextResponse.json({ 
      success: true, 
      message: "Arquivo enviado com sucesso",
      filePath: `/uploads/${file.name}`
    });
  } catch (error) {
    console.error("Erro ao salvar o arquivo:", error);
    return NextResponse.json({ success: false, message: "Erro ao salvar o arquivo" });
  }
}