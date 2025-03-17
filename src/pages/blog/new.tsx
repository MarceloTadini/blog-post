import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormPost from "@/app/components/FormPost";
import { IPost } from "@/app/types";

export default function NewPostPage() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const tokenResponse = await axios.get("/api/token");
        if (tokenResponse.data.access_token) {
          setAccessToken(tokenResponse.data.access_token);
        } else {
          router.push("/login"); // Redireciona se não estiver logado
        }
      } catch (error) {
        router.push("/login"); // Redireciona se houver erro ao obter o token
      }
    }

    fetchToken();
  }, [router]);

  const handleCreatePost = async (postData: IPost) => {
    if (!accessToken) return;

    await axios.post("https://blog-posts-hori.onrender.com/post", postData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  if (!accessToken) return <p className="text-center mt-10">Verificando autenticação...</p>;

  return <FormPost onSubmit={handleCreatePost} />;
}
