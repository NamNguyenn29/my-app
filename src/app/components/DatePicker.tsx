'use client';
import "../globals.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { DateRange, RangeKeyDict } from "react-date-range";
import type { Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useEffect, useRef, useState } from "react";
import { format, differenceInDays } from "date-fns";

type DatePickerProps = {
    onChangeRange?: (data: {
        days: number;
        startDate: Date;
        endDate: Date;
    }) => void;
};
export default function DatePicker({ onChangeRange }: DatePickerProps) {



    const [range, setRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const handleSelect = (ranges: RangeKeyDict) => {
        const newRange = [ranges.selection];
        setRange(newRange);

        const start = newRange[0].startDate!;
        const end = newRange[0].endDate!;
        const days = differenceInDays(end, start) + 1;

        // gọi callback về cha
        onChangeRange?.({ days, startDate: start, endDate: end });
    };


    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef}>
            <div className="relative w-72 " >
                <label htmlFor="" className="text-xl block text-left text-amber-500 ">Dates</label>
                <div onClick={() => setOpen(!open)} className="cursor-pointer flex justify-between items-center bg-white text-black text-xl ">
                    <span className="pr-5" > {range[0].startDate && format(range[0].startDate, "dd/MM/yyyy")} -
                        {range[0].endDate && format(range[0].endDate, "dd/MM/yyyy")} </span>
                    <FontAwesomeIcon icon={faCalendar} size="xs" color="black" />
                </div>
            </div>

            {open && (
                <div className="absolute top-78 left-120 mt-2 z-50 shadow-lg">
                    <DateRange
                        editableDateInputs={true}
                        onChange={(ranges) => handleSelect(ranges)}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        months={2}
                        direction="horizontal"
                        className="border rounded bg-white"
                    />
                </div>
            )}
        </div>
    )
}