import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, LogIn, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const router = useRouter();
    const {isAuthenticated} = useAuth();

    const handleLogout = async () => {
        try {
            await fetch("/api/logout", { method: "POST" });
            router.refresh();
        } catch (err) {
            console.error("Erro ao fazer logout", err);
        }
    };

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
            <h1 className="text-2xl font-bold">Meu Blog</h1>
            {isAuthenticated ? (
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
