import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { usePosts } from "@/app/context/PostsContext";

export default function SearchInput() {
  const { posts, setPosts } = usePosts();
  const [searchTerm, setSearchTerm] = useState("");
  const [originalPosts, setOriginalPosts] = useState(posts);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setPosts(originalPosts);
      return;
    }

    const filteredPosts = originalPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.intro.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term)
    );

    setPosts(filteredPosts);
  };

  return (
    <div className="relative w-90">
      <input
        type="text"
        placeholder="Buscar post por título, autor ou introdução"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <SearchIcon className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
    </div>
  );
}
