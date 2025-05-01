// pages/api/auth/callback.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, error: authError } = req.query;

  if (authError) {
    return res.redirect(302, '/login?error=auth_failed');
  }

  if (!code || typeof code !== 'string') {
    return res.redirect(302, '/login?error=invalid_code');
  }

  try {
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error || !session) {
      throw error || new Error('Session not created');
    }

    // Redireciona para a página inicial com o token
    return res.redirect(302, '/dashboard');
    
  } catch (err) {
    console.error('Callback error:', err);
    return res.redirect(302, '/login?error=auth_failed');
  }
}