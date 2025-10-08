declare module "react-date-range" {
    import * as React from "react";

    export interface Range {
        startDate: Date;
        endDate: Date;
        key: string;
    }

    export type RangeKeyDict = {
        [key: string]: Range;
    };

    export interface DateRangeProps {
        ranges: Range[];
        onChange: (ranges: RangeKeyDict) => void;
        moveRangeOnFirstSelection?: boolean;
        editableDateInputs?: boolean;
        months?: number;
        direction?: "horizontal" | "vertical";
        className?: string;
    }

    export class DateRange extends React.Component<DateRangeProps> { }
}
