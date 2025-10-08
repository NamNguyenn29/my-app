'use client';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

type RoomSelectorProps = {
    selectedRoom?: string;
    onChangeRoom?: (room: string) => void;
    top?: string;
}

export default function RoomSelector({ selectedRoom: initialRoom, onChangeRoom, top }: RoomSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(initialRoom || "");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const rooms = [
        "Strav Single Room",
        "Strav Double Room",
        "Strav Deluxe",
        "Strav Twin Deluxe",
        "Strav City View",
    ];

    const handleSelect = (room: string) => {
        setSelectedRoom(room);
        setIsOpen(false);
        onChangeRoom?.(room); // gọi callback về cha
    }

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="text-xl block text-left text-amber-500">Room</label>
            <div onClick={toggleDropdown} className="cursor-pointer flex justify-between items-center bg-white text-black text-xl p-2">
                <span className="pr-5">{selectedRoom || "Selected Room"}</span>
                <FontAwesomeIcon icon={faLocationDot} size="xs" color="black" />
            </div>

            {isOpen && (
                <ul className={`absolute ${top || 'top-full'} left-0 w-80 bg-white mt-1 z-10 max-h-60 overflow-auto p-2 border rounded shadow-lg`}>
                    {rooms.map(room => (
                        <li
                            key={room}
                            onClick={() => handleSelect(room)}
                            className="mb-2 hover:bg-gray-100 cursor-pointer text-black text-xl font-light p-1 rounded"
                        >
                            {room}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
