'use client';

import { createContext, useContext, useEffect, useState } from "react";

export type User = {
    id: string;
    email: string;
    fullName: string;
    roles: string[];
    isDeleted?: boolean;
};

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => { },
    logout: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // 🟢 Hàm login: gọi API login, backend set cookie HttpOnly
    const login = async (email: string, password: string) => {
        const res = await fetch("http://localhost:5199/api/Auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            throw new Error("Login failed");
        }

        const data = await res.json();

        if (data.user.isDeleted) {
            alert("This account has been deleted.");
            await logout();
            return;
        }

        setUser(data.user);
    };

    // 🟢 Hàm logout: gọi API để xóa cookie
    const logout = async () => {
        await fetch("http://localhost:5199/api/Auth/logout", {
            method: "POST",
            credentials: "include", // gửi cookie để backend xóa
        });
        setUser(null);
    };

    // 🟢 Khi reload trang: lấy user từ cookie bằng API /me
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:5199/api/Auth/me", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include", // cookie jwt được gửi kèm
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch {
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
