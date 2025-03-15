import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";


export default async function validateToken(req: NextApiRequest, res: NextApiResponse){

  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const accessToken = cookies.access_token || null;
  //const username = cookies.username || null;
  const isLoggedIn = !!accessToken; // Se tem token, está logado

  let username = "Faça login para continuar";
  if(isLoggedIn){
    username = "Bem Vindo";
  }

  return res.status(200).json({ username, isLoggedIn });
}
