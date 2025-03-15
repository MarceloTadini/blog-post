// middlewares/authMiddleware.ts

import validateToken from '@/pages/api/validateToken';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

export function withAuth(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT' || req.method === 'DELETE' || req.method === 'POST') {
      const { isLoggedIn } = validateToken(req); // Chama validateToken e extrai o isLoggedIn
      if (!isLoggedIn) {
        return res.status(401).json({ message: 'Não autenticado. Faça login para continuar.' });
      }
    }
    return handler(req, res); // Chama o handler se o usuário estiver logado
  };
}
