"use client"
import { useEffect, useState } from "react";
import AddRoomModal from "../../../components/addroommodal";
import RoleProtectedPage from "../../../components/roleprotectedPage";
import UserMenu from "../../../components/UserMenu"
import Pagination from "../../../components/Pagination";
import { getRooms } from "@/api/api";
import { Room } from "@/types/Room";





export default function RoomManagement() {

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([]);
    // const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    useEffect(() => {
        getRooms().then(setRooms);
    }, []);

    // const handleEdit = (room: Room) => {
    //     setSelectedRoom(room);
    //     setFormData({ ...room });
    // };

    // const handleChange = <K extends keyof Room>(field: K, value: Room[K]) => {
    //     if (!formData) return;
    //     setFormData({ ...formData, [field]: value });
    // };

    // const handleServiceToggle = (service: string) => {
    //     if (!formData) return;
    //     const newServices = formData.services.includes(service)
    //         ? formData.services.filter((s) => s !== service)
    //         : [...formData.services, service];
    //     setFormData({ ...formData, services: newServices });
    // };

    // const handleSave = () => {
    //     if (!formData) return;
    //     setRooms((prev) =>
    //         prev.map((r) => (r.id === formData.id ? formData : r))
    //     );
    //     setSelectedRoom(null);
    //     setFormData(null);
    // };

    // const handleImgUrlChange = (index: number, value: string) => {
    //     if (!formData) return;
    //     const updatedUrls = [...formData.imgUrls];
    //     updatedUrls[index] = value;
    //     setFormData({ ...formData, imgUrls: updatedUrls });
    // }

    // const handleAddImgUrl = () => {
    //     if (!formData) return;
    //     setFormData({ ...formData, imgUrls: [...formData.imgUrls, ""] });
    // };

    // const handleRemoveImgUrl = (index: number) => {
    //     if (!formData) return;
    //     const updatedUrls = formData.imgUrls.filter((_, i) => i !== index);
    //     setFormData({ ...formData, imgUrls: updatedUrls });
    // };

    // const handleRemove = (id: number) => {
    //     setRooms((prev) => prev.filter((room) => room.id !== id));
    // };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);


    const totalRoom = rooms.length;
    const availableCount = rooms.filter(r => r.status === 1).length;
    const unavailableCount = rooms.filter(r => r.status === 0).length;

    // const [SearchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | 0 | 1>("all");

    const filteredByStatus = statusFilter === "all" ? rooms : rooms.filter(r => r.status === statusFilter);

    // const filteredRooms = filteredByStatus.filter((r) => {
    //     if (!SearchTerm.trim()) return true;

    //     const roomName = r.roomName?.toLocaleLowerCase() || "";
    //     const roomNumber = r.roomNumber || "";
    //     const roomId = r.id || "";

    //     return (
    //         roomId.toString().includes(SearchTerm) ||
    //         roomNumber.toString().includes(SearchTerm) ||
    //         roomName.includes(SearchTerm)

    //     )
    // })

    const handleFilterClick = (filter: "all" | 0 | 1) => {
        setStatusFilter(filter);
        setCurrentPage(1);
    }

    // Tính toán dữ liệu hiển thị
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentRooms = filteredByStatus.slice(indexOfFirst, indexOfLast);

    const getStatusLabel = (status: number) => {
        switch (status) {
            case 0:
                return { text: "Unavailable", color: "bg-yellow-500" };
            case 1:
                return { text: "Available", color: "bg-green-500" };
            default:
                return { text: "Unknown", color: "bg-gray-500" };
        }
    };
    return (
        <RoleProtectedPage requiredRole="Admin" redirectTo="/login" unauthorizedTo="/login">

            <div className=" mx-auto container py-5 ">
                <UserMenu />
            </div>
            <div className="mt-10 my-3 border border-b-1 container mx-auto bg-black "></div>
            <div className="mx-20 font-semibold text-lg">DashBoard/ Room Mangement</div>
            <div className="flex justify-start gap-5 p-2 container mx-20 mb-10">
                <input type="search"
                    placeholder="Search by id, roomNumber, roomName ... "
                    className="border p-2 rouded-md w-96"
                    onChange={(e) => {
                        // setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <button
                    type="button"
                    onClick={() => setIsAddOpen(true)}
                    className="bg-sky-900  text-white text-xl font-semibold  px-4 py-1  rounded-md hover:bg-blue-600"
                >
                    Add room

                </button>
            </div>
            {/*Search */}

            {/*summary box */}
            <div className="flex gap-5 container mx-auto mb-10">
                <div
                    onClick={() => handleFilterClick("all")}
                    className={`cursor-pointer flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-64 transition ${statusFilter === "all" ? "bg-blue-100 border-blue-500 " : "hover:bg-gray-50"}`}>
                    <div className="flex item-center gap-3">
                        <span className="w-8 h-8 bg-blue-300 rounded-full inline-block"></span>
                        <span className="inline-block w-32 ">Total Room</span>
                    </div>
                    <span>{totalRoom}</span>

                </div>
                <div
                    onClick={() => handleFilterClick(1)}
                    className={`cursor-pointer flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-64 transition ${statusFilter === 1 ? "bg-green-100 border-green-500 " : "hover:bg-gray-50"}`}>
                    <div className="flex item-center gap-3">
                        <span className="w-8 h-8 bg-green-300 rounded-full inline-block"></span>
                        <span className="inline-block w-32 ">Available</span>
                    </div>
                    <span>{availableCount}</span>

                </div>
                <div
                    onClick={() => handleFilterClick(0)}
                    className={`cursor-pointer flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-64 transition ${statusFilter === 0 ? "bg-yellow-100 border-yellow-500 " : "hover:bg-gray-50"}`}>
                    <div className="flex item-center gap-3">
                        <span className="w-8 h-8 bg-yellow-300 rounded-full inline-block"></span>
                        <span className="inline-block w-32 ">Unavailable</span>
                    </div>
                    <span>{unavailableCount}</span>

                </div>
            </div>

            {/* Table */}
            <div className="container mx-auto my-10 bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full text-base">
                    <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-left text-gray-700 text-lg font-semibold">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Room Name</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Bed</th>
                            <th className="px-6 py-3">Guests</th>
                            <th className="px-6 py-3">Space</th>
                            <th className="px-6 py-3">Image URL</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentRooms.map((room, index) => {
                            const status = getStatusLabel(room.status);
                            return (
                                <tr key={room.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-3">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                    <td className="px-6 py-3 font-medium text-gray-800"><div>{room.roomName} - {room.roomNumber}</div>
                                    </td>
                                    <td className="px-6 py-3 font-semibold text-blue-600">
                                        {room.basePrice.toLocaleString("vi-VN")} đ
                                    </td>
                                    <td className="px-6 py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-base font-medium
                                            } ${status.color}`}
                                        >
                                            {status.text}
                                        </span>
                                    </td>

                                    <td className="px-6 py-3 text-gray-500 truncate max-w-[150px]">
                                        {room.description || "-"}
                                    </td>
                                    <td className="px-6 py-3">{room.bedType}</td>
                                    <td className="px-6 py-3">
                                        {room.adult} Adults, {room.children} Children
                                    </td>
                                    <td className="px-6 py-3">{room.space} m²</td>
                                    <td className="px-6 py-3 truncate max-w-[200px] text-blue-500">
                                        {room.imageURls[0]}
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        <div className="flex justify-center gap-2">
                                            <div className="bg-emerald-400 p-3 px-5 text-white rounded rounded-(200px)" >Edit</div>
                                            <div className="bg-rose-400 p-3 px-5 text-white rounded rounded-(200px)"  >Remove</div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>



            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalItems={rooms.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
            />
            {/* <AddRoomModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onSave={(newRoom) => setRooms([...rooms, newRoom])}
            /> */}


        </RoleProtectedPage>
    );
}
