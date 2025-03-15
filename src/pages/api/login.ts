// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Substitua pela lógica de autenticação da sua API
      const response = await fetch('https://blog-posts-hori.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Usuário ou senha inválidos');
      }

      const data = await response.json();
      const accessToken = data.access_token;

      // Armazena o access_token em um cookie HTTP-only
      res.setHeader('Set-Cookie', `access_token=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`);

      res.status(200).json({ message: 'Login realizado com sucesso' });
    } catch (err: any) {
      res.status(401).json({ message: err.message || 'Erro ao fazer login' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}