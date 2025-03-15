import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { FilePenLineIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IPost } from "@/app/types";

export default function Blog() {
  const router = useRouter();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get("https://blog-posts-hori.onrender.com/post");
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center mt-10">Carregando posts...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Erro ao carregar posts.</p>;

  return (
    <div className="w-4/5 mx-auto py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Postagens</h1>
        <Link href="/blog/new" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md">
          Cadastrar Post
        </Link>
      </div>

      {posts.length === 0 && <p className="text-center text-gray-500 mt-6">Nenhum post encontrado.</p>}

      {posts.map((post) => (
        <article
          key={post.title}
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
          <div className="flex flex-col justify-center gap-2">
            <Trash2Icon onClick={() => alert("Remover post")} className="cursor-pointer text-red-500" />
            <FilePenLineIcon onClick={() => router.push(`/blog/edit/${post._id}`)} className="cursor-pointer text-blue-500" />
          </div>
        </article>
      ))}
    </div>
  );
}
