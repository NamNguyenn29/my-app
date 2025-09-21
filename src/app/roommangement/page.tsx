"use client"
import { useState } from "react";
import "../globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { rooms as initialRooms } from "../data/room";

type Room = {
    id: number;
    name: string;
    guest: number;
    Adult: number;
    Children: number;
    space: number;
    bed: string;
    description?: string;
    price: number;
    imgUrls: string[];
    services: string[];
    roomType: string;
    status: string;
};

const roomTypes = ["Deluxe", "Suite", "Standard", "Family"];
const statuses = ["Available", "Booked", "Maintenance"];
const allServices = ["Wi-Fi", "Pet Allowed", "Air conditioning", "Phone", "Breakfast"];
const bedOptions = ["1 King Bed", "2 Single Beds", "2 Queen Beds", "3 Beds"];

export default function RoomManagement() {


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

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10); // mặc định 10 item/trang

    // Tính toán dữ liệu hiển thị
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentRooms = rooms.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(rooms.length / rowsPerPage);


    return (
        <>
            <div className="text-center text-5xl text-white bg-black font-semibold  p-10">
                Booking Room Management
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
            <div className="my-10 h-2 container mx-auto bg-black "></div>

            {/* Table */}
            <table className="w-full container mx-auto my-10 text-base">
                <thead className="bg-gray-100 text-left text-lg">
                    <tr>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Room</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Room Name</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Room Type</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Price</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Status</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Services</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Note</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Bed</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Guests</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Space (m²)</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Image URL</th>
                        <th className="border-b-2 border-gray-400 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRooms.map((room) => (
                        <tr key={room.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{room.id}</td>
                            <td className="px-4 py-2">{room.name}</td>
                            <td className="px-4 py-2">{room.roomType}</td>
                            <td className="px-4 py-2">{room.price.toLocaleString("vi-VN")} đ</td>
                            <td className="px-4 py-2">{room.status}</td>
                            <td className="px-4 py-2">{room.services.join(", ")}</td>
                            <td className="px-4 py-2">{room.description || "-"}</td>
                            <td className="px-4 py-2">{room.bed}</td>
                            <td className="px-4 py-2">
                                {room.Adult} Adults, {room.Children} Children
                            </td>
                            <td className="px-4 py-2">{room.space} m²</td>
                            <td className="px-4 py-2 truncate max-w-[200px]">
                                {room.imgUrls[0]}
                            </td>
                            <td className="px-4 py-2">
                                <button
                                    className="px-3 py-1 bg-green-500 text-white rounded"
                                    onClick={() => handleEdit(room)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

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
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
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
            <div className="flex items-center justify-between container mx-auto mt-5">
                {/* Select rows per page */}
                <div className="flex items-center gap-2">
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1); // reset về trang 1 khi đổi page size
                        }}
                        className="border rounded px-2 py-1"
                    >
                        {[5, 10, 20, 50].map((size) => (
                            <option key={size} value={size}>
                                {size} / page
                            </option>
                        ))}
                    </select>
                    <span>
                        {indexOfFirst + 1}-{Math.min(indexOfLast, rooms.length)} /{" "}
                        {rooms.length}
                    </span>
                </div>

                {/* Page numbers */}
                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        className="px-2 py-1 border rounded disabled:opacity-50"
                    >
                        {"<"}
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-white"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className="px-2 py-1 border rounded disabled:opacity-50"
                    >
                        {">"}
                    </button>
                </div>
            </div>

        </>
    );
}
