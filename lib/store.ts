// store.ts
import { create } from 'zustand';

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  file?: any;
  fileContent?: string;
};

type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  esgData?: {
    generatedReport: string;
    answers: Record<string, string>;
    sections: any[];
  } | null;
};

type Store = {
  apiResponse: string | null;
  esgData: {
    generatedReport: string;
    answers: Record<string, string>;
    sections: any[];
  } | null;
  isLoading: boolean;
  error: string | null;
  conversations: Conversation[];
  currentConversationId: string | null;
  setApiResponse: (response: string) => void;
  setEsgData: (data: { 
    generatedReport: string; 
    answers: Record<string, string>; 
    sections: any[] 
  }) => void;
  clearApiResponse: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addConversation: (conversation: Conversation) => void;
  setCurrentConversation: (id: string) => void;
  updateConversation: (id: string, messages: Message[]) => void;
  deleteConversation: (id: string) => void;
};

export const useStore = create<Store>((set) => ({
  apiResponse: null,
  esgData: null,
  isLoading: false,
  error: null,
  conversations: [],
  currentConversationId: null,
  
  setApiResponse: (data) => set({ 
    apiResponse: data,
    error: null
  }),
  
  setEsgData: (data) => set({
    esgData: data,
    error: null
  }),
  
  clearApiResponse: () => set({ 
    apiResponse: null,
    esgData: null
  }),
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  addConversation: (conversation) => set((state) => ({
    conversations: [...state.conversations, conversation],
    currentConversationId: conversation.id
  })),
  
  setCurrentConversation: (id) => set({ currentConversationId: id }),
  
  updateConversation: (id, messages) => set((state) => ({
    conversations: state.conversations.map(conv => 
      conv.id === id ? { ...conv, messages } : conv
    )
  })),
  
  deleteConversation: (id) => set((state) => ({
    conversations: state.conversations.filter(conv => conv.id !== id),
    currentConversationId: 
      state.currentConversationId === id ? 
        state.conversations[0]?.id || null : 
        state.currentConversationId
  }))
}));