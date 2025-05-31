// lib/supabase-chat-service.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const ChatService = {
  // Cria uma nova sessão de chat
  async createChatSession(userId: string, title: string = 'Nova Conversa') {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert([
        { 
          user_id: userId,
          title: title
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Atualiza o título de uma sessão de chat
  async updateChatSession(sessionId: string, title: string) {
    const { data, error } = await supabase
      .from('chat_sessions')
      .update({ title })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Obtém todas as sessões de chat de um usuário
  async getUserChatSessions(userId: string) {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Deleta uma sessão de chat e todas as suas mensagens
  async deleteChatSession(sessionId: string) {
    // Primeiro deleta as mensagens associadas
    await supabase
      .from('messages')
      .delete()
      .eq('session_id', sessionId);

    // Depois deleta a sessão
    const { error } = await supabase
      .from('chat_sessions')
      .delete()
      .eq('id', sessionId);

    if (error) throw error;
  },

  // Adiciona uma mensagem a uma sessão de chat
  async addMessage(
    sessionId: string,
    content: string,
    role: 'user' | 'assistant',
    file?: {
      name: string;
      type: string;
      url?: string;
      content?: string;
    }
  ) {
    const { data, error } = await supabase
      .from('messages')
      .insert([
        { 
          session_id: sessionId,
          content,
          role,
          file_name: file?.name,
          file_type: file?.type,
          file_url: file?.url,
          file_content: file?.content
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Obtém todas as mensagens de uma sessão de chat
  async getMessages(sessionId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Upload de arquivo para storage
  async uploadFile(userId: string, file: File) {
    const filePath = `uploads/${userId}/${Date.now()}-${file.name}`;
    
    const { data, error } = await supabase
      .storage
      .from('chat-files')
      .upload(filePath, file);

    if (error) throw error;

    // Obtém a URL pública do arquivo
    const { data: { publicUrl } } = supabase
      .storage
      .from('chat-files')
      .getPublicUrl(data.path);

    return {
      path: data.path,
      url: publicUrl,
      name: file.name,
      type: file.type,
      size: file.size
    };
  }
};