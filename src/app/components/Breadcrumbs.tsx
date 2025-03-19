import Link from "next/link";
import { useRouter } from "next/router";
import { usePosts } from "../context/PostsContext";

const Breadcrumbs = () => {
  const router = useRouter();
  const pathArray = router.pathname.split("/").filter((path) => path);
  const { id } = router.query;
  const {posts} = usePosts();

  const post = posts.find((p) => p._id === id);

  return (
    <nav className="text-sm text-gray-500">
      <ul className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-blue-500 hover:underline">
            Home
          </Link>
        </li>
        {pathArray.map((path, index) => {
          let displayName = path;
          let href = "/" + pathArray.slice(0, index + 1).join("/");
          const isLast = index === pathArray.length - 1;

          if (path === "edit") {
            href = "/blog";
          }

          if (path === "[id]" && id) {
            displayName = post?.title || "Carregando...";
          }

          return (
            <li key={href} className="flex items-center space-x-2">
              <span>/</span>
              {isLast ? (
                <span className="text-gray-700">{displayName}</span>
              ) : (
                <Link href={href} className="text-blue-500 hover:underline">
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
