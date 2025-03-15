import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function FormPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [intro, setIntro] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      title,
      author,
      content,
      intro,
      imageUrl,
      videoUrl,
    };

    setLoading(true);
    try {
      await axios.post("https://blog-posts-hori.onrender.com/post", newPost);
      router.push("/blog"); // Redireciona para a página de blog após o sucesso
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-4/5 mx-auto py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Criar Novo Post</h1>

      {error && <p className="text-center text-red-500 mb-4">Erro ao criar post.</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-semibold text-gray-700">Autor</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="intro" className="block text-sm font-semibold text-gray-700">Introdução</label>
          <input
            type="text"
            id="intro"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-semibold text-gray-700">Conteúdo</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={5}
            required
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700">URL da Imagem</label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="videoUrl" className="block text-sm font-semibold text-gray-700">URL do Vídeo</label>
          <input
            type="url"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
            disabled={loading}
          >
            {loading ? "Criando..." : "Criar Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
