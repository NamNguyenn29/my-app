'use client';


import { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    createddate: string;
    lastlogin: string;
};

const AuthContext = createContext<{
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}>({
    user: null,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("user");
        if (saved) setUser(JSON.parse(saved));
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
