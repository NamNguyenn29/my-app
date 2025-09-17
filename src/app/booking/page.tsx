'use client'
import { useState, useEffect } from "react";
import "../globals.css";
import { FormControl, MenuItem, Select, Button } from "@mui/material";
import DateBooking from "../components/DateBooking";
import GuestBooking from "../components/GuestVBooking"
import { faRotateLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons/faArrowsLeftRight";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import { differenceInDays } from "date-fns";
import MyBooking from "../components/MyBooking";
import { rooms } from "../data/room"

type Room = {
    id: number;
    name: string;
    guest: number,
    Adult: number,
    Children: number,
    space: number,
    petAllow: boolean,
    wifi: boolean,
    bed: string,
    phone: boolean,
    description?: string,
    price: number,
    imgUrl: string,
}
export default function Booking() {
    const [selectedRoom, setSelectedRoom] = useState<Room>();
    const searchParams = useSearchParams();
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const [range, setRange] = useState<Range[]>([
        {
            startDate: start ? new Date(start) : new Date(),
            endDate: end ? new Date(end) : new Date(),
            key: "selection",
        },
    ]);
    const [datedif, setDatedif] = useState(1);
    useEffect(() => {
        if (range[0].startDate && range[0].endDate) {
            const days = differenceInDays(range[0].endDate, range[0].startDate) || 0;
            setDatedif(days + 1); // +1 để tính cả ngày check-in
        }
    }, [range]);


    return (
        <>
            <div className="text-center text-5xl text-white bg-black font-semibold  p-10">Booking Room</div>
            <div className="bg-[rgb(250,247,245)] mx-auto container py-5 ">
                <div className="mx-20 mt-10 text-center p-5  w-80 bg-rose-500 rounded-full  text-white font-semibold text-xl">TRAVSAY Ho Chi Minh</div>
                <div className=" grid grid-cols-12 ">
                    <div className="col-span-4 text-center p-20">
                        <DateBooking
                            range={range}
                            onChangeRange={({ days, startDate, endDate }) => {
                                setRange([{ startDate, endDate, key: "selection" }]);
                                setDatedif(days);

                            }
                            }

                        />
                    </div>
                    <div className="col-span-4 text-center p-20">
                        <GuestBooking />
                    </div>
                    <div className="col-span-4 text-center p-20 grid grid-cols-12">
                        <div className="col-span-4 bg-[rgb(217,217,217)]  text-center  text-lg/20 w-20 h-20 rounded-full">NN</div>
                        <div className="col-span-6 text-left text-xl font-semibold  pt-2">
                            <div>Profile</div>
                            <FontAwesomeIcon icon={faUser} size="xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-3 bg-rose-500 w-full mx-auto container  "></div>

            <div className="grid grid-cols-12 container mx-auto py-20 px-20 bg-[rgb(250,247,245)] gap-10">
                {/* Danh sách room */}
                <div className="col-span-9 space-y-10">
                    {rooms.map((room) => (
                        <div key={room.id} className="border border-none bg-white p-10 rounded-md">
                            <div className="grid grid-cols-12 gap-10">
                                <div className="col-span-3 mt-10">
                                    <img src={room.imgUrl} alt="" />
                                </div>
                                <div className="col-span-9">
                                    <div className="text-rose-500 font-semibold underline mb-5">{room.name}</div>
                                    <div className="mb-5">
                                        <span className="bg-[rgb(243,244,246)] p-2 rounded-md">
                                            <FontAwesomeIcon icon={faUserFriends} size="lg" />
                                            <span className="ml-3">Up to {room.guest} guests</span>
                                        </span>
                                        <span className="ml-5 bg-[rgb(243,244,246)] p-2 rounded-md">
                                            <FontAwesomeIcon icon={faArrowsLeftRight} size="lg" className="-rotate-45" />
                                            <span className="ml-3">{room.space} m<sup>2</sup></span>
                                        </span>
                                    </div>
                                    <div className="mb-5">
                                        <span className="bg-[rgb(243,244,246)] p-2 rounded-md">
                                            <FontAwesomeIcon icon={faPaw} size="lg" />
                                            <span className="ml-3">{room.petAllow ? "Pet Allowed" : "Pet Denied"}</span>
                                        </span>
                                        <span className="ml-5 bg-[rgb(243,244,246)] p-2 rounded-md">
                                            <FontAwesomeIcon icon={faWifi} size="lg" />
                                            <span className="ml-3">Wi-Fi</span>
                                        </span>
                                        <span className="ml-5 bg-[rgb(243,244,246)] p-2 rounded-md">
                                            <FontAwesomeIcon icon={faSnowflake} size="lg" />
                                            <span className="ml-3">Aircondition</span>
                                        </span>
                                    </div>
                                    <div>
                                        <span className="bg-[rgb(243,244,246)] p-2 rounded-md">
                                            <FontAwesomeIcon icon={faBed} size="lg" />
                                            <span className="ml-3">{room.bed}</span>
                                        </span>
                                        <span className="ml-5 bg-[rgb(243,244,246)] p-2 rounded-md">
                                            <FontAwesomeIcon icon={faPhone} size="lg" />
                                            <span className="ml-3">{room.phone ? "Phone" : "No Phone"}</span>
                                        </span>
                                        <span className="ml-5 bg-[rgb(243,244,246)] p-2 rounded-md">
                                            <span className="ml-3">+15</span>
                                        </span>
                                    </div>
                                    <div className="mt-10">
                                        Birds of a feather stay together in our urban view twin room on a low floor
                                    </div>
                                    <div className="ml-100 cursor-pointer border w-30 text-center rounded-full my-5">Show more</div>
                                </div>
                            </div>

                            <div className="border-t-1 bg-gray-500"></div>

                            <div className="grid grid-cols-12">
                                <div className="col-span-6 my-10">
                                    <div className="text-rose-500 font-semibold mb-3">Room and BreakFast</div>
                                    <div className="mb-5">
                                        <FontAwesomeIcon icon={faUtensils} size="lg" />
                                        <span className="ml-2">Breakfast : <b>Include</b></span>
                                    </div>
                                    <div className="mb-5">
                                        <FontAwesomeIcon icon={faRotateLeft} size="lg" />
                                        <span className="ml-2">Cancellation policy</span>
                                    </div>
                                    <div className="mb-5">
                                        <FontAwesomeIcon icon={faMoneyBill} size="lg" />
                                        <span className="ml-2">Payment : bank card</span>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faGift} size="lg" />
                                        <span className="ml-2"><b>Include</b>: TRAVSTAY Anytime: 24/7 Perks That {`Don't`} Sleep</span>
                                    </div>
                                </div>

                                <div className="col-span-6 my-10">
                                    <div className="text-xl font-bold text-right">Price for 1 night</div>
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-6">
                                            <div>
                                                <span className="border p-2 rounded-md px-4 bg-rose-500 text-white">-10%</span>
                                                <span className="ml-5 text-lg font-semibold line-through">
                                                    {room.price.toLocaleString()} đ
                                                </span>
                                                <div className="mt-5 ml-18">
                                                    <FontAwesomeIcon icon={faDollarSign} />
                                                    <span className="text-lg font-semibold">
                                                        {(room.price * 0.9).toLocaleString()} đ
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="ml-25 mt-10 col-span-6 border w-35 h-15 text-center bg-rose-500 rounded-md text-white cursor-pointer"
                                            onClick={() => setSelectedRoom(room)}
                                        >
                                            Select
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar MyBooking */}
                <div className="col-span-3">
                    <div className="sticky top-5">
                        <MyBooking
                            datedif={datedif}
                            start={range[0].startDate}
                            end={range[0].endDate}
                            room={selectedRoom}
                        />
                    </div>
                </div>
            </div>

        </>

    )
}