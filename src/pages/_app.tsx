import { AppProps } from "next/app";
import '../app/globals.css';
import Header from "@/app/components/Header";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { useRouter } from "next/router";
import { PostsProvider } from "@/app/context/PostsContext";
import { AuthProvider } from "@/app/context/AuthContext";

function Pages({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideHeader = router.pathname === "/register"; // Esconde na página de registro

  return (
    <PostsProvider>
      <AuthProvider>
        {!hideHeader && <Header />}
        {!hideHeader && <Breadcrumbs />}
        <Component {...pageProps} />
      </AuthProvider>
    </PostsProvider>
  );
}

export default Pages;
