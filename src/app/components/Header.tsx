"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, LogIn, User } from "lucide-react";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/token");
                if (!response.ok) throw new Error("Token inválido");

                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch("/api/logout", { method: "POST" });
            setIsLoggedIn(false);
            router.refresh();
        } catch (err) {
            console.error("Erro ao fazer logout", err);
        }
    };

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
            <h1 className="text-2xl font-bold">Meu Blog</h1>
            {isLoggedIn ? (
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 text-lg">
                        <User className="w-5 h-5" /> Olá, seja bem-vindo!
                    </span>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow-md transition duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            ) : (
                <Link
                    href="/"
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg shadow-md transition duration-200"
                >
                    <LogIn className="w-5 h-5" />
                    Login
                </Link>
            )}
        </header>
    );
};

export default Header;
