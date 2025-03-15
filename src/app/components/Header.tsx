"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        console.log("FETCH no USER")
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/validateToken");
                const data = await response.json();

                setIsLoggedIn(data.isLoggedIn);
                setUsername(data.username || null);
            } catch (error) {
                setIsLoggedIn(false);
                setUsername(null);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
          const response = await fetch('/api/logout', { method: 'POST' });
    
          if (!response.ok) {
            throw new Error('Erro ao fazer logout');
          }
    
          router.refresh();
        } catch (err) {
          console.error(err);
        }
      };

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Meu Site</h1>
            {isLoggedIn ? (
                <div className="flex gap-4">
                    <span>Olá, {username}!</span>
                    <button onClick={handleLogout} className="text-white underline">
                        Logout
                    </button>
                </div>
            ) : (
                <Link href="/" className="text-white underline">Login</Link>
            )}
        </header>
    );
};

export default Header;
