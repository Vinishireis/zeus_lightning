import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { code } = req.query;
    
    if (code) {
      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) throw error;
        
        return res.redirect(302, '/Dashboard');
      } catch (err) {
        return res.redirect(302, '/login?error=auth_failed');
      }
    }
  }
  
  return res.status(400).json({ error: 'Método não suportado' });
}