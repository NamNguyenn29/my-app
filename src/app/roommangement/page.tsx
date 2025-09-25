"use client"
import { useState } from "react";
import "../globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { rooms as initialRooms } from "../data/room";
import AddRoomModal from "../components/addroommodal";
import RoleProtectedPage from "../components/roleprotectedPage";
import UserMenu from "../components/UserMenu"
import Pagination from "../components/Pagination";

type Room = {
    id: number;
    roomName: string;
    roomNumber: number;
    isAvailable: boolean;
    guest: number;
    Adult: number;
    Children: number;
    space: number;
    floor: number;
    bed: string;
    description: string;
    price: number;
    status: string;
    roomType: string;
    imgUrls: string[];
    services: string[];
};



const roomTypes = ["Deluxe", "Suite", "Standard", "Family"];
const statuses = ["Available", "Booked", "Maintenance"];
const allServices = ["Wi-Fi", "Pet Allowed", "Air conditioning", "Phone", "Breakfast"];
const bedOptions = ["1 King Bed", "2 Single Beds", "2 Queen Beds", "3 Beds"];

export default function RoomManagement() {

    const [isAddOpen, setIsAddOpen] = useState(false);

    const [rooms, setRooms] = useState<Room[]>(initialRooms);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [formData, setFormData] = useState<Room | null>(null);

    const handleEdit = (room: Room) => {
        setSelectedRoom(room);
        setFormData({ ...room });
    };

    const handleChange = <K extends keyof Room>(field: K, value: Room[K]) => {
        if (!formData) return;
        setFormData({ ...formData, [field]: value });
    };

    const handleServiceToggle = (service: string) => {
        if (!formData) return;
        const newServices = formData.services.includes(service)
            ? formData.services.filter((s) => s !== service)
            : [...formData.services, service];
        setFormData({ ...formData, services: newServices });
    };

    const handleSave = () => {
        if (!formData) return;
        setRooms((prev) =>
            prev.map((r) => (r.id === formData.id ? formData : r))
        );
        setSelectedRoom(null);
        setFormData(null);
    };

    const handleImgUrlChange = (index: number, value: string) => {
        if (!formData) return;
        const updatedUrls = [...formData.imgUrls];
        updatedUrls[index] = value;
        setFormData({ ...formData, imgUrls: updatedUrls });
    }

    const handleAddImgUrl = () => {
        if (!formData) return;
        setFormData({ ...formData, imgUrls: [...formData.imgUrls, ""] });
    };

    const handleRemoveImgUrl = (index: number) => {
        if (!formData) return;
        const updatedUrls = formData.imgUrls.filter((_, i) => i !== index);
        setFormData({ ...formData, imgUrls: updatedUrls });
    };

    const handleRemove = (id: number) => {
        setRooms((prev) => prev.filter((room) => room.id !== id));
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Tính toán dữ liệu hiển thị
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentRooms = rooms.slice(indexOfFirst, indexOfLast);




    return (
        <RoleProtectedPage requiredRole="admin" redirectTo="/login" unauthorizedTo="/login">

            <div className=" mx-auto container py-5 ">
                <UserMenu />
            </div>
            <div className="mt-10 my-3 border border-b-1 container mx-auto bg-black "></div>
            <div className="mx-20 font-semibold text-lg">DashBoard/ Room Mangement</div>
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
                <button
                    type="button"
                    onClick={() => setIsAddOpen(true)}
                    className="bg-sky-900  text-white text-xl font-semibold  px-4 py-1  rounded-md hover:bg-blue-600"
                >
                    Add room

                </button>

            </form>
            {/* Table */}
            {/* Table */}
            <div className="container mx-auto my-10 bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full text-base">
                    <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-left text-gray-700 text-lg font-semibold">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Room Name</th>
                            <th className="px-6 py-3">Room Type</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Services</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Bed</th>
                            <th className="px-6 py-3">Guests</th>
                            <th className="px-6 py-3">Space</th>
                            <th className="px-6 py-3">Image URL</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentRooms.map((room) => (
                            <tr key={room.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-3">{room.id}</td>
                                <td className="px-6 py-3 font-medium text-gray-800">{room.roomName}</td>
                                <td className="px-6 py-3">{room.roomType}</td>
                                <td className="px-6 py-3 font-semibold text-blue-600">
                                    {room.price.toLocaleString("vi-VN")} đ
                                </td>
                                <td className="px-6 py-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-base font-medium
                ${room.status === "Available"
                                                ? "bg-green-100 text-green-700"
                                                : room.status === "Booked"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {room.status}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-base text-gray-600">
                                    {room.services.join(", ")}
                                </td>
                                <td className="px-6 py-3 text-gray-500 truncate max-w-[150px]">
                                    {room.description || "-"}
                                </td>
                                <td className="px-6 py-3">{room.bed}</td>
                                <td className="px-6 py-3">
                                    {room.Adult} Adults, {room.Children} Children
                                </td>
                                <td className="px-6 py-3">{room.space} m²</td>
                                <td className="px-6 py-3 truncate max-w-[200px] text-blue-500">
                                    {room.imgUrls[0]}
                                </td>
                                <td className="px-6 py-3 text-center">
                                    <div className="flex justify-center gap-2">
                                        <div className="bg-emerald-400 p-3 px-5 text-white rounded rounded-(200px)" onClick={() => handleEdit(room)}>Edit</div>
                                        <div className="bg-rose-400 p-3 px-5 text-white rounded rounded-(200px)" onClick={() => handleRemove(room.id)} >Remove</div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Modal */}
            {formData && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-[500px] max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">
                            Edit Room #{formData.id}
                        </h2>

                        {/* Name */}
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={formData.roomName}
                            onChange={(e) => handleChange("roomName", e.target.value)}
                            className="w-full p-2 rounded-md border border-gray-300 mb-3"
                        />

                        {/* Price */}
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => handleChange("price", Number(e.target.value))}
                            className="w-full p-2 rounded-md border border-gray-300 mb-3"
                        />

                        {/* Room Type */}
                        <label className="block text-sm font-medium mb-1">Room Type</label>
                        <select
                            value={formData.roomType}
                            onChange={(e) => handleChange("roomType", e.target.value)}
                            className="w-full p-2 rounded-md border border-gray-300 mb-3"
                        >
                            {roomTypes.map((rt) => (
                                <option key={rt}>{rt}</option>
                            ))}
                        </select>

                        {/* Status */}
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => handleChange("status", e.target.value)}
                            className="w-full p-2 rounded-md border border-gray-300 mb-3"
                        >
                            {statuses.map((st) => (
                                <option key={st}>{st}</option>
                            ))}
                        </select>

                        {/* Bed */}
                        <label className="block text-sm font-medium mb-1">Bed</label>
                        <select
                            value={formData.bed}
                            onChange={(e) => handleChange("bed", e.target.value)}
                            className="w-full p-2 rounded-md border border-gray-300 mb-3"
                        >
                            {bedOptions.map((b) => (
                                <option key={b}>{b}</option>
                            ))}
                        </select>

                        {/* Guests */}
                        <div className="flex gap-3 mb-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Adults
                                </label>
                                <input
                                    type="number"
                                    value={formData.Adult}
                                    onChange={(e) =>
                                        handleChange("Adult", Number(e.target.value))
                                    }
                                    className="w-full p-2 rounded-md border border-gray-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Children
                                </label>
                                <input
                                    type="number"
                                    value={formData.Children}
                                    onChange={(e) =>
                                        handleChange("Children", Number(e.target.value))
                                    }
                                    className="w-full p-2 rounded-md border border-gray-300"
                                />
                            </div>
                        </div>

                        {/* Space */}
                        <label className="block text-sm font-medium mb-1">Space (m²)</label>
                        <input
                            type="number"
                            value={formData.space}
                            onChange={(e) => handleChange("space", Number(e.target.value))}
                            className="w-full p-2 rounded-md border border-gray-300 mb-3"
                        />

                        {/* Description */}
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="w-full p-2 rounded-md border border-gray-300 mb-3"
                        />

                        {/* Services */}
                        <label className="block text-sm font-medium mb-2">Services</label>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            {allServices.map((service) => (
                                <label key={service} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.services.includes(service)}
                                        onChange={() => handleServiceToggle(service)}
                                    />
                                    {service}
                                </label>
                            ))}
                        </div>

                        {/* Image URLs (edit nhiều ảnh) */}
                        <label className="block text-sm font-medium mb-2">Image URLs</label>
                        <div className="space-y-2 mb-3">
                            {formData.imgUrls.map((url, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) =>
                                            handleImgUrlChange(index, e.target.value)
                                        }
                                        className="flex-1 p-2 rounded-md border border-gray-300"
                                    />
                                    <button
                                        onClick={() => handleRemoveImgUrl(index)}
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={handleAddImgUrl}
                                className="px-3 py-1 bg-blue-500 text-white rounded"
                            >
                                + Add Image
                            </button>
                        </div>


                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={handleSave}
                                className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedRoom(null);
                                    setFormData(null);
                                }}
                                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalItems={rooms.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
            />
            <AddRoomModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onSave={(newRoom) => setRooms([...rooms, newRoom])}
            />


        </RoleProtectedPage>
    );
}
