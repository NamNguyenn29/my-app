'use client'
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
export default function Login() {
    const { login } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        const user = {
            id: 1,
            name: "Nguyen A",
            email: "a.nguyen@gmail.com",
            role: "admin",
            status: "active",
            createddate: "15/09/2025",
            lastlogin: "1 days ago",
        };
        login(user);
    }, []);

    const redirect = searchParams.get("redirect");
    if (redirect) {
        router.push(redirect);
    } else {
        router.push("/"); // mặc định về trang chủ
    }
    return (
        <div>Login</div>
    );
}
