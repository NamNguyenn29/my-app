'use client'
import "../globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { bookings } from "../data/booking";
import { rooms } from "../data/room";
import { users } from "../data/user";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function UserBooking() {
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

    const handleClickName = () => {
        console.log("Click user name"); // test
        router.push("/member")
    };

    const getBookingList = (id: number) => bookings.filter(b => b.id === id);

    const getUser = (id: number) => users.find(u => u.id === id);
    const getRoom = (id: number) => rooms.find(r => r.id === id);

    const bookingsOfUser = getBookingList(user?.id);

    const initials =
        user?.name
            ?.trim()                // xóa khoảng trắng 2 đầu
            .split(/\s+/)            // tách theo khoảng trắng
            .map(word => word[0]?.toUpperCase()) // lấy chữ cái đầu, nếu có
            .join("") || "UN";       // fallback nếu trống



    return (
        <>
            <div className="bg-[rgb(250,247,245)] mx-auto container py-5 ">
                <div className="grid grid-cols-12">
                    <div className="col-start-9 col-span-4 p-6">
                        <div className="flex items-center justify-end gap-4">
                            <div className="w-20 h-20 rounded-full bg-[rgb(217,217,217)] flex items-center justify-center text-lg font-semibold select-none">
                                {initials}
                            </div>

                            {/* Dùng button để chắc chắn nhận click */}
                            <button
                                type="button"
                                onClick={handleClickName}
                                className="text-left text-xl font-semibold underline cursor-pointer focus:outline-none"
                            >
                                {user.name}
                            </button>

                            <button type="button" className="p-2" aria-label="menu">
                                <FontAwesomeIcon icon={faBars} size="2xl" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="text-4xl mx-10 ">My Bookings</div>
            </div>
            <div className=" border border-b-1 container mx-auto bg-black "></div>


            <div className="bg-[rgb(248,250,252)] container mx-auto p-10">
                <form className="-ml-1 flex justify-start gap-5 p-2  container mx-20 mb-10">
                    <input
                        type="search"
                        placeholder="Search by email, name, role ..."
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
                                    <div className="my-10 grid grid-cols-12 border rounded-lg gap-10 px-10 py-10">
                                        <div className="col-span-3 ">
                                            <img src={room?.imgUrls[1]} alt="" />
                                        </div>
                                        <div className="col-span-3">
                                            <div className="text-rose-500 font-bold text-2xl">{room?.roomName}</div>
                                            <div className="text-lg font-semibold">Code : {booking.id}</div>
                                            <div className="text-lg font-semibold">Guest : {user?.fullName}</div>
                                            <div className="text-lg font-semibold">Room : {room?.roomType}</div>

                                        </div>
                                        <div className="col-span-3">
                                            <div className=" font-semibold text-lg mt-8">Check-in: {booking.checkIn} - 14:00</div>
                                            <div className=" font-semibold text-lg">Check-out: {booking.checkOut} - 12:00</div>
                                            <div className=" font-semibold text-lg">Payment: {booking.price}đ </div>
                                        </div>
                                        <div className="col-span-3">
                                            <div className={` mt-8 border rounded-md px-3 py-2 text-center font-semibold text-white  w-32
                                              ${booking.status === "approved" ? "bg-green-500" : ""}
      ${booking.status === "pending" ? "bg-yellow-500" : ""}
      ${booking.status === "cancel" ? "bg-red-500" : ""}
                                            `}>{booking.status}</div>
                                            <div className="mt-4 border rounded-md px-3 py-2 text-center font-semibold text-white bg-blue-500 w-64">Download Invoice</div>
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