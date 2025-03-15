"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Usuário ou senha inválidos");
      }
      router.push("/blog");
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen bg-mint-500">
      <p className="text-2xl text-fontColor-900">Blog Posts</p>
      <div className="flex flex-col w-[80vw] max-h-[45vh] justify-center items-center bg-background-800 rounded-[10px] p-4">
        <p className="text-lg text-fontColor-900">Digite seu email</p>
        <input
          className="text-lg bg-background-900 border border-fontColor-900 rounded-3xl p-2 w-5/6"
          type="text"
          placeholder="Digite seu email aqui"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-lg text-fontColor-900">Digite sua senha</p>
        <input
          className="text-lg bg-background-900 border border-fontColor-900 rounded-3xl p-2 w-5/6"
          type="password"
          placeholder="Digite sua senha aqui"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          className="w-32 mt-2 p-2 bg-fontColor-900 rounded-xl hover:opacity-80 text-white bg-blue-500"
          disabled={loading || email === "" || password === ""}
          onClick={handleLogin}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </main>
  );
}
