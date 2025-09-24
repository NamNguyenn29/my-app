

import "../globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { bookings } from "../data/booking";
import { rooms } from "../data/room";
import { users } from "../data/user";
import RoleProtectedPage from "../components/roleprotectedPage";


export default function BookingMangement() {

    const totalBooking = bookings.length;
    const approvedCount = bookings.filter(b => b.status === "approved").length;
    const pendingCount = bookings.filter(b => b.status === "pending").length;
    const cancelCount = bookings.filter(b => b.status === "cancel").length;
    const income = bookings
        .filter(b => b.status === "approved")
        .reduce((sum, b) => sum + b.price, 0);

    // Hàm helper: tìm phòng theo ID
    const getRoom = (id: number) => rooms.find(r => r.id === id);
    // Hàm helper: tìm user theo ID
    const getUser = (id: number) => users.find(u => u.id === id);
    return (
        <RoleProtectedPage requiredRole="admin" redirectTo="/login" unauthorizedTo="/unauthorized">

            <div className="text-center text-5xl text-white bg-black font-semibold  p-10">
                Booking  Management
            </div>

            <div className="bg-[rgb(250,247,245)] mx-auto container py-5 ">
                <div className="grid grid-cols-12">
                    <div className="col-start-9 col-span-4 text-center p-20 grid grid-cols-12">
                        <div className="col-span-4 bg-[rgb(217,217,217)] text-center text-lg/20 w-20 h-20 rounded-full">
                            NN
                        </div>
                        <div className="col-span-4 text-left text-xl font-semibold pt-2">
                            <div>Profile</div>
                            <FontAwesomeIcon icon={faUser} size="xl" />
                        </div>
                        <div className="col-span-4 -ml-30 mt-5">
                            <FontAwesomeIcon
                                icon={faBars}
                                size="2xl"
                                className="item-self-center"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-10 border border-b-1 container mx-auto bg-black "></div>
            <form className="flex justify-start gap-5 p-2  container mx-20 mb-10">
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
            <div className="flex gap-5 container mx-auto mb-10">
                <div className="flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-40">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-blue-300 rounded-full inline-block "></span>
                        <span>Total Booking</span>
                    </div>
                    <span className="text-xl font-bold">{totalBooking}</span>
                </div>

                <div className="flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-40">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-green-300 rounded-full inline-block "></span>
                        <span>Approved</span>
                    </div>
                    <span className="text-xl font-bold">{approvedCount}</span>
                </div>

                <div className="flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-40">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-yellow-300 rounded-full inline-block "></span>
                        <span>Pending</span>
                    </div>
                    <span className="text-xl font-bold">{pendingCount}</span>
                </div>

                <div className="flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-40">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-rose-300 rounded-full inline-block "></span>
                        <span>Cancelled</span>
                    </div>
                    <span className="text-xl font-bold">{cancelCount}</span>
                </div>

                <div className="flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-40">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-purple-300 rounded-full inline-block "></span>
                        <span>Income</span>
                    </div>
                    <span className="text-xl font-bold">{income.toLocaleString()} đ</span>
                </div>
            </div>

            <table className="w-full container mx-auto my-10 text-base">
                <thead className="bg-gray-100 text-left text-lg">
                    <tr>
                        <th className="border-b-2 border-gray-400 px-4 py-2">ID</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Room ID</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">User ID</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Check In - Check Out</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Price</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Discount</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Status</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => {
                        const room = getRoom(booking.roomID);
                        const user = getUser(booking.userID);

                        return (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{booking.id}</td>
                                <td className="px-4 py-2"> {room ? `${room.roomName} (${room.id})` : "Unknown"}</td>
                                <td className="px-4 py-2">{user ? `${user?.fullName}` : "Unknown"}
                                    <div>{user?.email}</div>
                                </td>
                                <td className="px-4 py-2">{booking.checkIn} - {booking.checkOut}</td>
                                <td className="px-4 py-2">{booking.price}</td>
                                <td className="px-4 py-2">{booking.discountID}</td>
                                <td className="px-4 py-2"><span
                                    className={`px-5 py-3 rounded-md text-white font-semibold
      ${booking.status === "approved" ? "bg-green-500" : ""}
      ${booking.status === "pending" ? "bg-yellow-500" : ""}
      ${booking.status === "cancel" ? "bg-red-500" : ""}`}
                                >
                                    {booking.status}
                                </span></td>
                                <td className="px-4 py-2">
                                    <div className="flex gap-3 mt-4">
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md"

                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded-md"

                                        >
                                            Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>

        </RoleProtectedPage>
    )
}