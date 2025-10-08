'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

type Guest = {
    Adult: number;
    Children: number;
};

type GuestBookingProps = {
    guest: Guest; // nhận state từ cha
    onChangeGuest?: (guest: Guest) => void; // callback gửi về cha
};

export default function GuestBooking({ guest, onChangeGuest }: GuestBookingProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [localGuest, setLocalGuest] = useState<Guest>(guest); // state nội bộ
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Khi props thay đổi, sync với localGuest
    useEffect(() => {
        setLocalGuest(guest);
    }, [guest]);

    const increment = (type: "Adult" | "Children") => {
        const newGuest = { ...localGuest };
        if (type === "Adult") newGuest.Adult += 1;
        if (type === "Children") newGuest.Children += 1;
        setLocalGuest(newGuest);
        onChangeGuest?.(newGuest);
    };

    const decrement = (type: "Adult" | "Children") => {
        const newGuest = { ...localGuest };
        if (type === "Adult" && newGuest.Adult > 1) newGuest.Adult -= 1;
        if (type === "Children" && newGuest.Children > 0) newGuest.Children -= 1;
        setLocalGuest(newGuest);
        onChangeGuest?.(newGuest);
    };

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
        <div className="relative border p-10" ref={dropdownRef}>
            <label className="text-xl block text-left mb-5">Guest</label>
            <div onClick={toggleDropdown} className="cursor-pointer flex justify-between items-center text-black text-xl">
                <span className="pr-5">
                    {localGuest.Adult} Adult{localGuest.Adult > 1 ? "s" : ""} , {localGuest.Children} Child{localGuest.Children > 1 ? "ren" : ""}
                </span>
                <FontAwesomeIcon icon={faUserFriends} size="xs" color="black" />
            </div>
            {isOpen && (
                <div className="absolute left-0 top-40 mt-2 bg-white border rounded shadow-md w-full z-50 text-black text-xl">
                    <div className="flex justify-between items-center p-4">
                        <span>Adults</span>
                        <span className="flex items-center space-x-2">
                            <button onClick={() => decrement("Adult")} className="border px-2 py-1 rounded">-</button>
                            <span>{localGuest.Adult}</span>
                            <button onClick={() => increment("Adult")} className="border px-2 py-1 rounded">+</button>
                        </span>
                    </div>
                    <div className="flex justify-between items-center p-4">
                        <span>Children</span>
                        <span className="flex items-center space-x-2">
                            <button onClick={() => decrement("Children")} className="border px-2 py-1 rounded">-</button>
                            <span>{localGuest.Children}</span>
                            <button onClick={() => increment("Children")} className="border px-2 py-1 rounded">+</button>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

