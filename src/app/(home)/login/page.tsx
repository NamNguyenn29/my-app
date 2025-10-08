'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../../context/authContext";

export default function Login() {
    const { user, login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get("returnUrl");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            if (returnUrl && returnUrl !== "/login") {
                router.replace(returnUrl);
                return;
            }
            // fallback theo role
            if (user.roles?.includes("Admin")) router.replace("/admin/bookingmangement");
            else if (user.roles?.includes("User")) router.replace("/userbooking");
            else router.replace("/");
        }
    }, [user, returnUrl, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password); // Gọi login từ context
            router.push("/"); // hoặc redirect theo role như bạn đã làm
        } catch (err) {
            console.error(err);
            setError("Sai email hoặc mật khẩu");
        }
    };


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-lg shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
                {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 text-sm font-medium">Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}
