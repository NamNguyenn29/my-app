'use client'
import "../globals.css";
import { bookings } from "../data/booking";
import { rooms } from "../data/room";
import { users } from "../data/user";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import RoomSlider from "../components/RoomSlider";
import UserMenu from "../components/UserMenu";

export default function UserBooking() {


    // đóng menu khi click ra ngoài

    const { user, logout } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.replace("/login");
        }
    }, [user, router]);

    if (!user) {
        return null; // hoặc spinner loading
    }


    const getBookingList = (id: number) => bookings.filter(b => b.id === id);

    const getUser = (id: number) => users.find(u => u.id === id);
    const getRoom = (id: number) => rooms.find(r => r.id === id);

    const bookingsOfUser = getBookingList(user?.id);

    return (
        <>
            <div className="bg-[rgb(250,247,245)] mx-auto container py-5 ">
                <UserMenu />
                <div className="text-4xl mx-10 ">My Bookings</div>
            </div>
            <div className=" border border-b-1 container mx-auto bg-black "></div>


            <div className="bg-[rgb(248,250,252)] container mx-auto p-10">
                <form className="-ml-1 flex justify-start gap-5 p-2  container mx-20 mb-10">
                    <input
                        type="search"
                        placeholder="Search by room, Code, ..."
                        className="w-96 border p-2  rounded-md "
                    />
                    <button
                        type="button"
                        className="bg-rose-500  text-white text-xl font-semibold  px-4 py-1  rounded-md hover:bg-blue-600"
                    >
                        Search
                    </button>

                </form>
                <div>
                    {bookingsOfUser.length === 0 ? (
                        <div className="text-center text-2xl font-semibold py-10">No Booking Fount</div>

                    ) : (

                        bookingsOfUser.map((booking) => {
                            const room = getRoom(booking.roomID);
                            const user = getUser(booking.userID);
                            return (
                                <>
                                    <div className="my-8 rounded-xl shadow-lg bg-white p-6 hover:shadow-2xl transition-shadow">
                                        <div className="flex gap-6">
                                            {/* Ảnh slider */}
                                            <div className="w-1/3">
                                                <RoomSlider images={room?.imgUrls || []} alt={room?.roomName || "room"} />
                                            </div>

                                            {/* Thông tin chính */}
                                            <div className="w-2/3 flex flex-col justify-between">
                                                {/* 2 cột thông tin */}
                                                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                                    {/* Trái */}
                                                    <div>
                                                        <h2 className="text-2xl font-bold text-rose-500 mb-2">{room?.roomName}</h2>
                                                        <p className="text-gray-700 text-lg mb-2"><span className="font-semibold">Code:</span> {booking.id}</p>
                                                        <p className="text-gray-700 text-lg mb-2"><span className="font-semibold">Guest:</span> {user?.fullName}</p>
                                                        <p className="text-gray-700 text-lg mb-2"><span className="font-semibold">Room:</span> {room?.roomNumber}</p>
                                                    </div>

                                                    {/* Phải */}
                                                    <div>
                                                        <p className="text-gray-700 text-lg mb-2 mt-10"><span className="font-semibold">Check-in:</span> {booking.checkIn} - 14:00</p>
                                                        <p className="text-gray-700 text-lg mb-2"><span className="font-semibold">Check-out:</span> {booking.checkOut} - 12:00</p>
                                                        <p className="text-gray-700 text-lg mb-2"><span className="font-semibold">Payment:</span> <span className="text-rose-500">{booking.price.toLocaleString()} đ</span></p>
                                                    </div>
                                                </div>

                                                {/* Status + Nút */}
                                                <div className="flex justify-end items-center gap-4 mt-6">
                                                    <span
                                                        className={`px-4 py-1 rounded-full text-md font-semibold text-white
                                                            ${booking.status === "approved" ? "bg-green-500" : ""}
                                                            ${booking.status === "pending" ? "bg-yellow-500" : ""}
                                                            ${booking.status === "cancel" ? "bg-red-500" : ""}
                                                        `}
                                                    >
                                                        {booking.status}
                                                    </span>
                                                    <button className="px-5 py-2 rounded-md font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                                                        Download Invoice
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </>
                            )
                        })

                    )}
                </div>
            </div>
        </>
    )
}   