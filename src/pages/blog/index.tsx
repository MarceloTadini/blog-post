import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { FilePenLineIcon, Trash2Icon, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IPost } from "@/app/types";

export default function Blog() {
  const router = useRouter();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar login

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get("https://blog-posts-hori.onrender.com/post");
        setPosts(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    async function checkAuth() {
      try {
        const tokenResponse = await axios.get("/api/token");
        const accessToken = tokenResponse.data.access_token;
        setIsLoggedIn(!!accessToken); // Define isLoggedIn com base no token
      } catch {
        setIsLoggedIn(false);
      }
    }

    fetchPosts();
    checkAuth();
  }, []);

  async function handleRemove(id: string) {
    try {
      const isConfirmed = window.confirm("Tem certeza de que deseja remover este post?");
      if (!isConfirmed) return;

      const tokenResponse = await axios.get("/api/token");
      const accessToken = tokenResponse.data.access_token;

      if (!accessToken) {
        alert("Você precisa estar logado para remover um post.");
        return;
      }

      await axios.delete(`https://blog-posts-hori.onrender.com/post/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert("Post removido com sucesso");
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Erro ao remover post!");
      }
    }
  }

  if (loading) return <p className="text-center mt-10">Carregando posts...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Erro ao carregar posts.</p>;

  return (
    <div className="w-4/5 mx-auto py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Postagens</h1>
        
        {/* Exibir botão "Cadastrar Post" apenas se estiver logado */}
        {isLoggedIn && (
          <Link href="/blog/new" className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md">
            <PlusCircleIcon className="w-5 h-5" />
            Cadastrar Post
          </Link>
        )}
      </div>

      {posts.length === 0 && <p className="text-center text-gray-500 mt-6">Nenhum post encontrado.</p>}

      {posts.map((post) => (
        <article
          key={post._id}
          className="mt-6 flex justify-between items-center border border-gray-300 p-4 bg-white rounded-lg shadow-sm hover:shadow-md"
        >
          <div onClick={() => router.push(`/blog/${post._id}`)} className="flex flex-1 gap-4 cursor-pointer">
            <Image
              src={post.imageUrl || "/placeholder.png"}
              alt={post.title}
              className="w-32 h-32 object-cover rounded-lg"
              width={100}
              height={100}
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
              <p className="text-sm text-gray-500">{post.author}</p>
              <p className="text-gray-700 mt-2">{post.intro}</p>
            </div>
          </div>

          {/* Exibir botões de editar e excluir apenas se estiver logado */}
          {isLoggedIn && (
            <div className="flex flex-col justify-center gap-2">
              <Trash2Icon
                onClick={() => post._id && handleRemove(post._id)}
                className="cursor-pointer text-red-500 hover:text-red-700"
              />
              <FilePenLineIcon
                onClick={() => router.push(`/blog/edit/${post._id}`)}
                className="cursor-pointer text-blue-500 hover:text-blue-700"
              />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
