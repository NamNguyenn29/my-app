'use client';

import { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: number;
    fullName: string;
    email: string;
    dateOfBirth: string;
    address: string;
    phone: string;
    password: string;
    role: string;
    status: string;
    activeCode: string;
    isActived: boolean;
    forgotPassword: string;
    isDeleted: boolean;
    lastlogin: string;
    createdDate: string;
};

type AuthContextType = {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        if (userData.isDeleted) {
            alert("This account has been deleted.");
            return; // không login
        }
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // <--- quan trọng
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser: User = JSON.parse(storedUser);
            if (parsedUser.isDeleted) {
                localStorage.removeItem("user"); // xoá nếu bị deleted
                setUser(null);
            } else {
                setUser(parsedUser);
            }
        }
    }, []);


    const logout = () => {
        setUser(null);
        localStorage.removeItem("user"); // clear khi logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
