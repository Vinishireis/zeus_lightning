import { create } from 'zustand';

type Store = {
  apiResponse: string;
  setApiResponse: (data: string) => void;
  clearApiResponse: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
};

export const useStore = create<Store>((set) => ({
  apiResponse: "",
  isLoading: false,
  error: null,
  
  setApiResponse: (data) => set({ 
    apiResponse: data,
    error: null // Clear any previous errors when setting new response
  }),
  
  clearApiResponse: () => set({ 
    apiResponse: "",
    error: null
  }),
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error })
}));