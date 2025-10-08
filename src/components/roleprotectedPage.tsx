"use client";
import { useAuth } from "../context/authContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RoleProtectedPage({
    children,
    requiredRole,
    redirectTo,
    unauthorizedTo
}: {
    children: React.ReactNode;
    requiredRole: string;
    redirectTo: string;       // Trang login
    unauthorizedTo: string;   // Trang unauthorized
}) {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!user) {
            // chưa login => chuyển qua login, kèm query ?redirect=pathname
            router.push(`${redirectTo}?redirect=${pathname}`);
        } else if (!user.roles.includes(requiredRole)) {
            // sai role
            router.push(unauthorizedTo);
        }
    }, [user, router, pathname, requiredRole, redirectTo, unauthorizedTo]);

    if (!user || !user.roles.includes(requiredRole)) return null;

    return <>{children}</>;
}
