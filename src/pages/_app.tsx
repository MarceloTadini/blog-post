import { AppProps } from "next/app";
import '../app/globals.css';
import Header from "@/app/components/Header";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { useRouter } from "next/router";

function Pages({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideHeader = router.pathname === "/register"; // Esconde na página de registro

  return (
    <div>
      {!hideHeader && <Header />}
      {!hideHeader && <Breadcrumbs />}
      <Component {...pageProps} />
    </div>
  );
}

export default Pages;
