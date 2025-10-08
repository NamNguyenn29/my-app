"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

export default function UserMenu() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Lấy chữ cái đầu tên để làm avatar
    const initials = user?.fullName
        ? user.fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "?";

    const handleClickName = () => {
        router.push("/member");
    };

    // Đóng menu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!user) return null;

    return (
        <div className="grid grid-cols-12">
            <div className="col-start-9 col-span-4 p-6">
                <div className="flex items-center justify-end gap-4">
                    {/* Avatar hình tròn */}
                    <div className="w-20 h-20 rounded-full bg-[rgb(217,217,217)] flex items-center justify-center text-lg font-semibold select-none">
                        {initials}
                    </div>

                    {/* Tên user */}
                    <button
                        type="button"
                        onClick={handleClickName}
                        className="text-left text-xl font-semibold underline cursor-pointer focus:outline-none"
                    >
                        {user.fullName}
                    </button>

                    {/* Menu */}
                    <div className="relative" ref={menuRef}>
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            className="p-2"
                            aria-label="menu"
                        >
                            <FontAwesomeIcon icon={faBars} size="2xl" />
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border py-2 z-50">
                                {/* Role Admin */}
                                {user.roles.includes("Admin") && (
                                    <>
                                        <button
                                            onClick={() => router.push("/member")}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Profile
                                        </button>
                                        <button
                                            onClick={() => router.push("/admin/bookingmanagement")}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Booking Management
                                        </button>
                                        <button
                                            onClick={() => router.push("/admin/roommangement")}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Room Management
                                        </button>
                                        <button
                                            onClick={() => router.push("/admin/usermangement")}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            User Management
                                        </button>
                                        <button
                                            onClick={() => router.push("/admin/viewallrequest")}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            View All Request
                                        </button>
                                    </>
                                )}

                                {/* Role User */}
                                {user.roles.includes("User") && (
                                    <>
                                        <button
                                            onClick={() => router.push("/member")}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Profile
                                        </button>
                                        <button
                                            onClick={() => router.push("/userbooking")}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            My Booking
                                        </button>
                                        <button
                                            onClick={() => router.push("/changepassword")}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Change Password
                                        </button>
                                    </>
                                )}



                                {/* Logout */}
                                <button
                                    onClick={() => {
                                        logout();
                                        router.replace("/login");
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                                >
                                    Log out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
