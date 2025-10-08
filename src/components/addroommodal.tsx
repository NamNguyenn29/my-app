"use client";
import { useState } from "react";
const roomTypes = ["Deluxe", "Suite", "Standard", "Family"];
const statuses = ["Available", "Booked", "Maintenance"];
const allServices = ["Wi-Fi", "Pet Allowed", "Air conditioning", "Phone", "Breakfast"];
const bedOptions = ["1 King Bed", "2 Single Beds", "2 Queen Beds", "3 Beds"];

import { Room } from "@/types/Room";


export default function AddRoomModal({
    isOpen,
    onClose,
    onSave,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (room: Room) => void;
}) {





    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-[600px] max-h-[90vh] overflow-y-auto p-6">
                <h2 className="text-2xl font-bold mb-6">Add New Room</h2>

                <form className="space-y-4">
                    {/* Room Name */}
                    <div>
                        <label className="block text-sm font-medium">Room Name</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            placeholder="Enter room name..."
                            required
                        />
                    </div>

                    {/* Room Type */}
                    <div>
                        <label className="block text-sm font-medium">Room Type</label>
                        <select
                            className="w-full border rounded p-2"
                        >
                            {roomTypes.map((rt) => (
                                <option key={rt}>{rt}</option>
                            ))}
                        </select>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium">Price</label>
                        <input
                            type="number"
                            className="w-full border rounded p-2"
                            placeholder="Enter price..."
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium">Status</label>
                        <select
                            // value={formData.status}
                            // onChange={(e) => handleChange("status", e.target.value)}
                            className="w-full border rounded p-2"
                        >
                            {statuses.map((st) => (
                                <option key={st}>{st}</option>
                            ))}
                        </select>
                    </div>

                    {/* Bed */}
                    <div>
                        <label className="block text-sm font-medium">Bed</label>
                        <select
                            // value={formData.bed}
                            // onChange={(e) => handleChange("bed", e.target.value)}
                            className="w-full border rounded p-2"
                        >
                            {bedOptions.map((b) => (
                                <option key={b}>{b}</option>
                            ))}
                        </select>
                    </div>

                    {/* Services */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Services</label>
                        <div className="grid grid-cols-2 gap-2">
                            {allServices.map((service) => (
                                <label key={service} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                    // checked={formData.services.includes(service)}
                                    // onChange={() => handleServiceToggle(service)}
                                    />
                                    {service}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Note */}
                    <div>
                        <label className="block text-sm font-medium">Note</label>
                        <textarea
                            // value={formData.description}
                            // onChange={(e) => handleChange("description", e.target.value)}
                            className="w-full border rounded p-2"
                            placeholder="Sea view, early check-in..."
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium">Image URL</label>
                        <input
                            type="text"
                            // value={formData.imgUrls[0] || ""}
                            // onChange={(e) => handleChange("imgUrls", [e.target.value])}
                            className="w-full border rounded p-2"
                            placeholder="Paste image link..."
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="submit"
                            className="px-5 py-2 bg-green-500 text-white rounded-md"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 bg-red-500 text-white rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
