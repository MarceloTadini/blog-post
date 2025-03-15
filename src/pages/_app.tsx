import { AppProps } from "next/app";
import '../app/globals.css';
import Header from "@/app/components/Header";
import Breadcrumbs from "@/app/components/Breadcrumbs";

function Pages({Component, pageProps}: AppProps) {
    return (
        <div className="p-4">
            <Header/>
            <Breadcrumbs/>
            <Component {...pageProps}/>
        </div>
    )
}

export default Pages;