import { useContext } from "react";
import Input from "../../../components/Inputs";
import { DateRangeContext } from "./context";

function DateRange() {
    const {
        startDate,
        endDate,
        onStartDateChange,
        onEndDateChange
    } = useContext(DateRangeContext);

    return <div className="flex gap-2 items-center">
        <Input
            type="date"
            value={startDate}
            onChange={onStartDateChange}
        />

        <Input
            type="date"
            value={endDate}
            onChange={onEndDateChange}
            min={startDate}
        />
    </div>
}

export default DateRange;