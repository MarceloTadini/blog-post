import { useState } from "react";
import { useRouter } from "next/navigation";
import { IPost } from "../types";

interface FormPostProps {
  initialData?: IPost;
  onSubmit: (postData: IPost) => Promise<void>;
}

export default function FormPost({ initialData, onSubmit }: FormPostProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [intro, setIntro] = useState(initialData?.intro || "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      await onSubmit({ title, author, content, intro, imageUrl, videoUrl });
      router.push("/blog");
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-4/5 mx-auto py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {initialData ? "Editar Post" : "Criar Novo Post"}
      </h1>

      {error && <p className="text-center text-red-500 mb-4">Erro ao salvar post.</p>}

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
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
