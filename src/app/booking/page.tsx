'use client'
import { useState, useEffect, Children } from "react";
import "../globals.css";
import { FormControl, MenuItem, Select, Button } from "@mui/material";
import DateBooking from "../components/DateBooking";
import GuestBooking from "../components/GuestBooking"
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
import RoomSlider from "../components/RoomSlider";
import { Modal, Box } from "@mui/material";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SelectedRoomBooking from "../components/SelectedRoomBooking";
import UserMenu from "../components/UserMenu";
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

export default function Booking() {
    const [selectedRoomDetail, setSelectedRoomDetail] = useState<Room | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<Room>();
    const searchParams = useSearchParams();
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const roomName = searchParams.get("room");
    const adultsParam = searchParams.get("adults");
    const childrenParam = searchParams.get("children");
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

    const [guest, setGuest] = useState({
        Adult: adultsParam ? parseInt(adultsParam) : 2,
        Children: childrenParam ? parseInt(childrenParam) : 0,
    });

    const [selectedRoomName, setSelectedRoomName] = useState<string | null>(roomName);

    return (
        <>
            <div className="text-center text-5xl text-white bg-black font-semibold  p-10">Booking Room</div>


            <div className="bg-[rgb(250,247,245)] mx-auto container py-5 ">
                <div className="flex">
                    <SelectedRoomBooking selectedRoom={selectedRoomName || undefined}
                        onChangeRoom={(roomName) => setSelectedRoomName(roomName)} />
                    <div className=" mx-auto container py-5 ">
                        <UserMenu />
                    </div>

                </div>
                <div className=" grid grid-cols-12 ">
                    <div className="col-span-4 text-center pl-20">
                        <DateBooking
                            range={range}
                            onChangeRange={({ days, startDate, endDate }) => {
                                setRange([{ startDate, endDate, key: "selection" }]);
                                setDatedif(days);

                            }
                            }

                        />
                    </div>
                    <div className="col-span-4 text-center px-20">
                        <GuestBooking
                            guest={guest}
                            onChangeGuest={(newGuest) => setGuest(newGuest)}
                        />
                    </div>
                </div>

            </div>
            <div className=" border border-b-1 border-rose-500 w-full mx-auto container  "></div>

            <div className="grid grid-cols-12 container mx-auto py-20 px-20 bg-[rgb(250,247,245)] gap-10">
                {/* Danh sách room */}
                <div className="col-span-9 space-y-10">
                    {rooms.map((room) => (
                        <div key={room.id} className="border border-none bg-white p-10 rounded-md">
                            <div className="grid grid-cols-12 gap-10">
                                <div className="col-span-3 mt-10">
                                    <RoomSlider images={room.imgUrls} alt={room.roomName} />
                                </div>
                                <div className="col-span-9">
                                    <div className="text-rose-500 font-semibold underline mb-5">{room.roomName}</div>
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
                                            <span className="ml-3">Pet Allowed</span>
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
                                            <span className="ml-3">Phone</span>
                                        </span>
                                        <span className="ml-5 bg-[rgb(243,244,246)] p-2 rounded-md">
                                            <span className="ml-3">+15</span>
                                        </span>
                                    </div>
                                    <div className="mt-10">
                                        Birds of a feather stay together in our urban view twin room on a low floor
                                    </div>
                                    <div
                                        onClick={() => setSelectedRoomDetail(room)}
                                        className="ml-100 my-10 inline-flex items-center gap-2 px-4 py-2 border rounded-full cursor-pointer
                                        text-gray-800 hover:bg-sky-900 hover:text-white transition"
                                    >
                                        <span>Show more</span>
                                        <FontAwesomeIcon icon={faChevronDown} size="lg" />
                                    </div>
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
                                            className="ml-25 mt-10 col-span-6 border w-35 text-xl/15 font-semibold h-15 text-center bg-rose-500 rounded-md text-white cursor-pointer"
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
                            guest={guest.Adult + guest.Children}
                        />
                    </div>
                </div>
            </div>
            <Modal open={!!selectedRoomDetail} onClose={() => setSelectedRoomDetail(null)}>
                <Box
                    sx={{
                        p: 4,
                        bgcolor: "white",
                        borderRadius: 2,
                        width: 1200,
                        mx: "auto",
                        mt: 5,
                        maxHeight: "90vh",
                        overflowY: "auto",
                    }}
                >
                    {/* Title */}
                    <h2 className="text-2xl font-bold mb-4">{selectedRoomDetail?.roomName}</h2>

                    {/* Slider + description */}
                    <div className="grid grid-cols-12 gap-6 mb-6">
                        <div className="mx-auto col-span-12 flex gap-4 overflow-x-auto">
                            {selectedRoomDetail?.imgUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`${selectedRoomDetail?.roomName} - ${index + 1}`}
                                    className="w-60 h-40 object-cover rounded-lg shadow-md"
                                />
                            ))}
                        </div>
                        <div className="col-span-12 grid grid-cols-12">
                            <div className="col-span-3">
                                <div className="text-gray-600 italic mb-2 ">
                                    <b>Accommodates {selectedRoomDetail?.guest} guests</b>
                                </div>
                                <div className="text-gray-600 mb-2">
                                    <FontAwesomeIcon icon={faArrowsLeftRight} size="lg" className="-rotate-45" />

                                    <b>{selectedRoomDetail?.space}</b> m<sup>2</sup>
                                </div>
                            </div>
                            <div className="col-span-9">
                                <p className="text-gray-700">{selectedRoomDetail?.description}</p>

                            </div>
                        </div>
                    </div>

                    {/* Dynamic tiện ích */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <span className="bg-gray-100 px-3 py-2 rounded-md">
                            <FontAwesomeIcon icon={faPaw} />{" "}
                            Pet Allowed
                        </span>
                        <span className="bg-gray-100 px-3 py-2 rounded-md">
                            <FontAwesomeIcon icon={faWifi} /> Wi-Fi
                        </span>
                        <span className="bg-gray-100 px-3 py-2 rounded-md">
                            <FontAwesomeIcon icon={faSnowflake} /> Air conditioning
                        </span>
                        <span className="bg-gray-100 px-3 py-2 rounded-md">
                            <FontAwesomeIcon icon={faBed} /> {selectedRoomDetail?.bed}
                        </span>
                        <span className="bg-gray-100 px-3 py-2 rounded-md">
                            <FontAwesomeIcon icon={faPhone} />{" "}
                            Phone
                        </span>
                    </div>

                    {/* Fixed tiện ích */}
                    {/* Services + tiện ích khác */}
                    <div className="grid grid-cols-4 gap-6 bg-gray-50 p-6 rounded-md">
                        <div>
                            <h3 className="font-semibold mb-2">Pet-friendly</h3>
                            <p>Pets allowed</p>

                            <h3 className="font-semibold mt-4 mb-2">Video and audio</h3>
                            <p>Flat-screen TV</p>
                            <p>Cable television</p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Electronic devices</h3>
                            <p>Air conditioning</p>
                            <p>Hair dryer</p>
                            <p>Refrigerator</p>

                            <h3 className="font-semibold mt-4 mb-2">Bathroom</h3>
                            <p>Shower</p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Furniture</h3>
                            <p>Desk</p>
                            <p>Wardrobe</p>
                            <p>Chair</p>
                            <p>Mirror</p>
                        </div>

                        {/* Cột mới: Services */}
                        <div>
                            <h3 className="font-semibold mb-2">Services</h3>
                            {selectedRoomDetail?.services?.map((service, index) => (
                                <p key={index}>{service}</p>
                            ))}
                        </div>
                    </div>


                    {/* Close button */}
                    <div className="flex justify-end mt-6">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setSelectedRoomDetail(null)}
                        >
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>


        </>

    )
}