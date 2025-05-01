import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { code } = req.query;

    if (typeof code === 'string') {
      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) throw error;

        return res.redirect(302, '/Dashboard');
      } catch (err) {
        console.error('Authentication error:', err);
        return res.redirect(302, '/login?error=auth_failed');
      }
    }

    return res.status(400).json({ error: 'Código de autenticação inválido ou ausente' });
  }

  return res.status(405).json({ error: 'Método não suportado' });
}