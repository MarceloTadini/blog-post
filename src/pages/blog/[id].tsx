import YoutubeVideo from "@/app/components/YoutubeVideo";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


interface Post {
    title: string;
    author: string;
    content: string;
    intro: string;
    imageUrl: string;
    videoUrl: string;
}

export default function Post() {
    const router = useRouter();
    const { id } = router.query; // Pega o parâmetro `id` da URL
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      if (!id) return; // Não tenta carregar os dados até que o `id` esteja disponível
  
      async function fetchPost() {
        try {
          const response = await axios.get(`https://blog-posts-hori.onrender.com/post/${id}`);
          setPost(response.data);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
  
      fetchPost();
    }, [id]); // A dependência `id` garante que o post seja recarregado quando o `id` mudar
  
    if (loading) return <p className="text-center mt-10">Carregando post...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Erro ao carregar o post.</p>;
    if (!post) return <p className="text-center mt-10 text-gray-500">Post não encontrado.</p>;
  


    return (
        <div className="flex flex-1 py-10 md:flex-row max-md:flex-col">

            <div className="flex flex-col w-2/4 mx-auto">
                <h1 className="text-3xl font-bold text-[var(--tw-title-text)]">{post.title}</h1>
                <p className="text-sm text-[var(--tw-subtitle-text)] mt-1">{post.author}</p>

                <p className="text-lg text-gray-700 mt-4">{post.intro}</p>
                <p className="text-xl text-gray-900 mt-4">{post.content}</p>

            </div>

            <div className="flex flex-col w-1/4 mx-auto">
                <img
                        src={post.imageUrl}
                        className="w-full max-h-96 object-cover rounded-lg mt-6 shadow-md mb-5"
                    />

                <YoutubeVideo videoId="wDCJWxeGxJw" />
            </div>

        </div>
    );
}
