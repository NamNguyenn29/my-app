'use client';

import "../globals.css";
import { bookings } from "../data/booking";
import { rooms } from "../data/room";
import { users } from "../data/user";
import RoleProtectedPage from "../components/roleprotectedPage";
import UserMenu from "../components/UserMenu";
import Pagination from "../components/Pagination";
import { useState } from "react";

export type Booking = {
    id: number;
    userID: number;
    roomID: number;
    checkIn: string;
    checkOut: string;
    price: number;
    discountID: number | null;
    status: string;
};

export default function BookingMangement() {
    const totalBooking = bookings.length;
    const approvedCount = bookings.filter(b => b.status === "approved").length;
    const pendingCount = bookings.filter(b => b.status === "pending").length;
    const cancelCount = bookings.filter(b => b.status === "cancel").length;
    const income = bookings
        .filter(b => b.status === "approved")
        .reduce((sum, b) => sum + b.price, 0);

    const getRoom = (id: number) => rooms.find(r => r.id === id);
    const getUser = (id: number) => users.find(u => u.id === id);

    const [bookingList, setBookingList] = useState(bookings);
    const [activeFilter, setActiveFilter] = useState<"all" | "approved" | "pending" | "cancel">("all");
    const [searchTerm, setSearchTerm] = useState("");

    const handleRemove = (id: number) => {
        if (confirm("Are you sure you want to remove this booking?")) {
            setBookingList(prev => prev.filter(b => b.id !== id));
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // lọc theo status
    const filteredByStatus =
        activeFilter === "all" ? bookingList : bookingList.filter(b => b.status === activeFilter);

    // lọc thêm theo search
    const filteredBookings = filteredByStatus.filter((b) => {
        if (!searchTerm.trim()) return true;
        const room = getRoom(b.roomID)?.roomNumber?.toString() || "";
        const user = getUser(b.userID);
        const name = user?.fullName?.toLowerCase() || "";
        const phone = user?.phone || "";
        return (
            room.includes(searchTerm) ||
            name.includes(searchTerm.toLowerCase()) ||
            phone.includes(searchTerm)
        );
    });

    // phân trang
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentBooking = filteredBookings.slice(indexOfFirst, indexOfLast);

    const handleFilterClick = (filter: "all" | "approved" | "pending" | "cancel") => {
        setActiveFilter(filter);
        setCurrentPage(1);
    };

    return (
        <RoleProtectedPage requiredRole="admin" redirectTo="/login" unauthorizedTo="/login">
            <div className=" mx-auto container py-5 ">
                <UserMenu />
            </div>
            <div className="mt-10 my-3 border border-b-1 container mx-auto bg-black "></div>
            <div className="mx-20 font-semibold text-lg">DashBoard/ Booking Mangement</div>

            {/* Search */}
            <div className="flex justify-start gap-5 p-2  container mx-20 mb-10">
                <input
                    type="search"
                    placeholder="Search by room number, guest name, or phone"
                    className="w-96 border p-2  rounded-md "
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // reset về page 1 khi search
                    }}
                />
            </div>

            {/* Summary box */}
            <div className="flex gap-5 container mx-auto mb-10">
                <div
                    onClick={() => handleFilterClick("all")}
                    className={`cursor-pointer flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-64 transition
                        ${activeFilter === "all" ? "bg-blue-100 border-blue-500" : "hover:bg-gray-50"}`}
                >
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-blue-300 rounded-full inline-block "></span>
                        <span className="inline-block w-32">Total Booking</span>
                    </div>
                    <span className="text-xl font-bold">{totalBooking}</span>
                </div>

                <div
                    onClick={() => handleFilterClick("approved")}
                    className={`cursor-pointer flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-40 transition
                        ${activeFilter === "approved" ? "bg-green-100 border-green-500" : "hover:bg-gray-50"}`}
                >
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-green-300 rounded-full inline-block "></span>
                        <span>Approved</span>
                    </div>
                    <span className="text-xl font-bold">{approvedCount}</span>
                </div>

                <div
                    onClick={() => handleFilterClick("pending")}
                    className={`cursor-pointer flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-40 transition
                        ${activeFilter === "pending" ? "bg-yellow-100 border-yellow-500" : "hover:bg-gray-50"}`}
                >
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-yellow-300 rounded-full inline-block "></span>
                        <span>Pending</span>
                    </div>
                    <span className="text-xl font-bold">{pendingCount}</span>
                </div>

                <div
                    onClick={() => handleFilterClick("cancel")}
                    className={`cursor-pointer flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-40 transition
                        ${activeFilter === "cancel" ? "bg-red-100 border-red-500" : "hover:bg-gray-50"}`}
                >
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-rose-300 rounded-full inline-block "></span>
                        <span>Cancelled</span>
                    </div>
                    <span className="text-xl font-bold">{cancelCount}</span>
                </div>

                <div className="flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-64">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-purple-300 rounded-full inline-block "></span>
                        <span>Income</span>
                    </div>
                    <span className="text-xl font-bold">{income.toLocaleString()} đ</span>
                </div>
            </div>
            {/* Table */}
            <div className="bg-white shadow-md rounded-xl overflow-hidden container mx-auto">
                <table className="min-w-full text-base">
                    <thead className="bg-gray-100 text-gray-700 text-left text-base font-semibold">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Room</th>
                            <th className="px-6 py-3">Check In</th>
                            <th className="px-6 py-3">Check Out</th>
                            <th className="px-6 py-3 text-center">Price</th>
                            <th className="px-6 py-3">Discount</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentBooking.length > 0 ? (
                            currentBooking.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">{booking.id}</td>
                                    <td className="px-6 py-4">
                                        <div>{getUser(booking.userID)?.fullName}</div>
                                        <div className="text-gray-500 text-sm">{getUser(booking.userID)?.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">{getRoom(booking.roomID)?.roomNumber}</td>
                                    <td className="px-6 py-4">{booking.checkIn}</td>
                                    <td className="px-6 py-4">{booking.checkOut}</td>
                                    <td className="px-6 py-4 text-right">{booking.price.toLocaleString()}₫</td>
                                    <td className="px-6 py-4">{booking.discountID ? `#${booking.discountID}` : "-"}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide
                                            ${booking.status === "approved"
                                                    ? "bg-green-500 text-white"
                                                    : booking.status === "pending"
                                                        ? "bg-yellow-500 text-white"
                                                        : "bg-red-500 text-white"
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleRemove(booking.id)}
                                            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg shadow"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9} className="text-center py-6 text-gray-500">
                                    No bookings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalItems={filteredBookings.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
            />
        </RoleProtectedPage>
    )
}
