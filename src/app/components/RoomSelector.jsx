'use client';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../globals.css'
import { useEffect, useRef, useState } from "react";
export default function RoomSelector({ top, hidden }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState("");
    const dropdownRef = useRef(null);
    const rooms = [
        "Strav Single Room",
        "Strav Double Room",
        "Strav Deluxe",
        "Strav Twin Deluxe",
        "Strav City View",
    ]

    const handleSelect = (room) => {
        setSelectedRoom(room);
        setIsOpen(false);
    }

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className=" relative " ref={dropdownRef} >
                <label htmlFor="" className="text-xl block text-left text-amber-500 ">Room</label>
                <div onClick={toggleDropdown} className="cursor-pointer flex justify-between items-center bg-white text-black text-xl ">
                    <span className="pr-5" > {selectedRoom || "Selected Room"} </span>
                    <FontAwesomeIcon icon={faLocationDot} size="xs" color="black" />
                </div>

                {isOpen && (
                    <ul className={`absolute ${top} left-0 w-80 bg-white mt-1 z-10 max-h-60 overflow-auto p-5`}>
                        {rooms.map((room) =>
                            <li key={room}
                                onClick={() => handleSelect(room)}
                                className="mb-3 hover:bg-gray-100 cursor-pointer text-black text-xl font-light"
                            >
                                {room}
                            </li>
                        )}
                    </ul>
                )}
            </div>


        </>
    )
}