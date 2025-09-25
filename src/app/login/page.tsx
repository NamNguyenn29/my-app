'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";
import { users } from "../data/user";

export default function Login() {
    const { user, login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            // nếu đã login thì chuyển hướng theo role
            if (user.role === "admin") router.push("/bookingmangement");
            else if (user.role === "user") router.push("/userbooking");
            else router.push("/");
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const foundUser = users.find(
            (u) => u.email === email && u.password === password
        );

        if (foundUser) {
            if (foundUser.isDeleted) {
                setError("Tài khoản này đã bị xóa");
                return; // không login
            }
            login(foundUser); // set user + lưu localStorage
            // ✅ sau khi login thì useEffect sẽ tự redirect
        } else {
            setError("Email hoặc mật khẩu không đúng");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
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
