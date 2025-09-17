
import "../globals.css"

interface MyBookingProps {
    datedif: number;
    start: Date;
    end: Date;
}

export default function MyBooking({ datedif, start, end }: MyBookingProps) {
    return (
        <>
            <div className="bg-[rgb(253,233,230)] p-7 rounded-t-lg ">
                My Booking
            </div>
            <div className="mt-10 ml-10">
                <div className="bg-[rgb(253,233,230)] p-3 w-58 mb-5">{datedif} night</div>
                <div className="grid grid-cols-12 ">
                    <div className="text-xl col-span-6" >
                        <div>{start.getDate()} - {start.getMonth()}</div>
                    </div>
                    <div className="text-xl col-span-6" >{start.getDate()} - {start.getMonth()}</div>
                </div>
            </div>
        </>
    )
}