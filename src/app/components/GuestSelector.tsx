'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../globals.css'
import { use, useEffect, useRef, useState } from "react";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

export default function GuestSelector() {
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
        if (type == "adult") setAdults(adults + 1);
        if (type == "child") setChildren(children + 1);
    };

    const decrement = (type: "adult" | "child") => {
        if (type == "adult" && adults > 1) setAdults(adults - 1);
        if (type == "child" && children) setChildren(children - 1);
    };

    return (
        <>
            <div className=" relative " ref={dropdownRef} >
                <label htmlFor="" className="text-xl block text-left text-amber-500 ">Guest</label>
                <div onClick={toggleDropdown} className="cursor-pointer flex justify-between items-center bg-white text-black text-xl ">
                    <span className="pr-5" >
                        {adults} Adult {adults > 1 ? "s" : ""} , {children} Child
                    </span>
                    <FontAwesomeIcon icon={faUserFriends} size="xs" color="black" />
                </div>
                {isOpen && (
                    <div className="absolute -top-42 mt-2 bg-white border rounded shdow-md w-full z-50 text-black text-xs">
                        <div className="flex justify-between items-center p-4 text-black">
                            <span>Adults</span>
                            <span className="flex items-center space-x-2 text-black">
                                <button
                                    onClick={() => decrement("adult")}
                                    className="border px-2 py-1 rounded "
                                >
                                    -
                                </button>
                                <span>{adults}</span>
                                <button
                                    onClick={() => increment("adult")}
                                    className="border px-2 py-1 rounded "
                                >
                                    +
                                </button>
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-4 ">
                            <span>Child</span>
                            <span className="flex items-center space-x-2">
                                <button
                                    onClick={() => decrement("child")}
                                    className="border px-2 py-1 rounded "
                                >
                                    -
                                </button>
                                <span>{children}</span>
                                <button
                                    onClick={() => increment("child")}
                                    className="border px-2 py-1 rounded bg-white "
                                >
                                    +
                                </button>
                            </span>
                        </div>
                    </div>

                )}

            </div>
        </>
    )
}
