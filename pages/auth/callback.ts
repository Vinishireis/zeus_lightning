import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { code, error: authError } = req.query;

  if (authError) {
    return res.redirect(302, '/login?error=auth_failed');
  }

  if (!code || typeof code !== 'string') {
    return res.redirect(302, '/login?error=invalid_code');
  }

  try {
    // Troca o código pela sessão
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error || !session) throw error || new Error('Sessão não criada');

    // Redireciona com token para o frontend
    return res.redirect(302, `/?access_token=${session.access_token}`);
    
  } catch (err) {
    console.error('Callback Error:', err);
    return res.redirect(302, '/login?error=auth_failed');
  }
}