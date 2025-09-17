"use client"
import "../globals.css"
import RoomSelector from "../components/RoomSelector"
import DatePicker from "./DatePicker"
import GuestSelector from "./GuestSelector"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Range } from "react-date-range";

export default function BookingBox() {

    const [range, setRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const router = useRouter();

    const handleFindNow = () => {
        const start = range[0].startDate?.toISOString();
        const end = range[0].endDate?.toISOString();
        router.push(`/booking?start=${start}&end=${end}`);
    };
    return (
        <>

            <div className="bg-center bg-cover " style={{ backgroundImage: "url('/Slider1.jpg')" }}>
                <div className=" p-25  text-white text-6xl font-semibold text-center bg-black/25">
                    <div className="mt-20 mb-15">WellCOME TO TRAVSTAY</div>
                    <div>Your Gateway To Great Stays</div>
                    <div className="mx-20 mt-40 h-[120px] bg-white flex justify-center gap-10 p-8 ">
                        <RoomSelector top='-top-75' hidden='' />
                        <DatePicker
                            onChangeRange={({ startDate, endDate }) => {
                                setRange([{
                                    startDate,
                                    endDate,
                                    key: "selection",
                                }]);
                            }}
                        />
                        <GuestSelector />
                        <div className="bg-rose-500 text-2xl/15 px-5 text-center h-15 cursor-pointer hover:bg-blue-900 " onClick={handleFindNow}>Find Now</div>
                    </div>

                </div>
            </div>
        </>
    )
}