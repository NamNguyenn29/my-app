'use client'

import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation"; // thêm import
export default function BookingPayment() {

    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname(); // lấy path hiện tại

    useEffect(() => {
        if (!user) {
            const target = `/login?returnUrl=${encodeURIComponent(pathname)}`;
            router.replace(target);
        }
    }, [user, pathname]);



    return (
        <>


            <div className="text-center text-5xl text-white bg-black font-semibold  p-10">Booking Room</div>
            <div className=" mx-auto container py-5 ">
                <UserMenu />
            </div>
        </>
    )
}