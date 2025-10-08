'use client';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect } from "react";

type RoomSelectorProps = {
    selectedRoom?: string; // tên phòng được chọn từ cha
    onChangeRoom?: (room: string) => void; // callback khi chọn phòng
    top?: string;
};

export default function SelectedRoomBooking({ selectedRoom, onChangeRoom, top }: RoomSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const rooms = [
        "Single Room",
        "Family Room",
        "Deluxe Room",
        "Standard Room",
        "Suite Room",
    ];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (room: string) => {
        setIsOpen(false);
        onChangeRoom?.(room); // gửi tên phòng về cha
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-80 ml-20 mt-10" ref={dropdownRef}>
            <div
                onClick={toggleDropdown}
                className="cursor-pointer flex justify-between items-center bg-white text-black text-xl p-4 rounded-full border"
            >
                <span>{selectedRoom || "Select a room"}</span>
                <FontAwesomeIcon icon={faLocationDot} />
            </div>

            {isOpen && (
                <ul className={`absolute ${top || 'top-full'} left-0 w-full bg-white mt-1 z-50 max-h-60 overflow-auto p-2 border rounded shadow-lg`}>
                    {rooms.map(room => (
                        <li
                            key={room}
                            onClick={() => handleSelect(room)}
                            className="mb-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-black text-lg rounded"
                        >
                            {room}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
