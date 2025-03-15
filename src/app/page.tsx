"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

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
    <main className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
      {/* Seção informativa */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Bem-vindo ao Blog Posts</h1>
        <p className="text-lg text-gray-200 max-w-lg mx-auto">
          Descubra histórias incríveis, novidades do mundo tech e muito mais! Faça login para acessar e compartilhar seus próprios posts.
        </p>
      </section>

      {/* Card de Login */}
      <div className="flex flex-col w-[90vw] sm:w-[400px] bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">Login</h2>

        <label className="text-sm text-gray-700 mb-1">Email</label>
        <input
          className="text-lg bg-gray-100 border border-gray-300 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm text-gray-700 mb-1">Senha</label>
        <input
          className="text-lg bg-gray-100 border border-gray-300 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        <button
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
          disabled={loading || email === "" || password === ""}
          onClick={handleLogin}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {/* Link para cadastro */}
        <p className="text-center text-sm text-gray-700 mt-4">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </main>
  );
}
