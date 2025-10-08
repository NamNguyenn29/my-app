'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

type GuestSelectorProps = {
    onChangeGuest?: (adults: number, children: number) => void;
};

export default function GuestSelector({ onChangeGuest }: GuestSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    const increment = (type: "adult" | "child") => {
        if (type === "adult") {
            setAdults(prev => {
                const newVal = prev + 1;
                onChangeGuest?.(newVal, children);
                return newVal;
            });
        }
        if (type === "child") {
            setChildren(prev => {
                const newVal = prev + 1;
                onChangeGuest?.(adults, newVal);
                return newVal;
            });
        }
    };

    const decrement = (type: "adult" | "child") => {
        if (type === "adult" && adults > 1) {
            setAdults(prev => {
                const newVal = prev - 1;
                onChangeGuest?.(newVal, children);
                return newVal;
            });
        }
        if (type === "child" && children > 0) {
            setChildren(prev => {
                const newVal = prev - 1;
                onChangeGuest?.(adults, newVal);
                return newVal;
            });
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="text-xl block text-left text-amber-500">Guest</label>
            <div
                onClick={toggleDropdown}
                className="cursor-pointer flex justify-between items-center bg-white text-black text-xl p-2"
            >
                <span className="pr-5">{adults} Adult{adults > 1 ? "s" : ""}, {children} Child{children > 1 ? "ren" : ""}</span>
                <FontAwesomeIcon icon={faUserFriends} size="xs" color="black" />
            </div>

            {isOpen && (
                <div className="absolute top-full mt-2 bg-white border rounded shadow-md w-full z-50 text-black text-sm">
                    <div className="flex justify-between items-center p-4">
                        <span>Adults</span>
                        <span className="flex items-center space-x-2">
                            <button onClick={() => decrement("adult")} className="border px-2 py-1 rounded">-</button>
                            <span>{adults}</span>
                            <button onClick={() => increment("adult")} className="border px-2 py-1 rounded">+</button>
                        </span>
                    </div>
                    <div className="flex justify-between items-center p-4">
                        <span>Children</span>
                        <span className="flex items-center space-x-2">
                            <button onClick={() => decrement("child")} className="border px-2 py-1 rounded">-</button>
                            <span>{children}</span>
                            <button onClick={() => increment("child")} className="border px-2 py-1 rounded">+</button>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
