import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo
} from "react";
import moment from "moment";

export const DateRangeContext = createContext();

export const DateRangeProvider = ({ children }) => {
    const [startDate, setStartDate] = useState(moment().startOf("week").format("yyyy-MM-DD"));
    const [endDate, setEndDate] = useState(moment().endOf("week").format("yyyy-MM-DD"));

    const onStartDateChange = useCallback((e) => {
        setStartDate(e.target.value);
        setEndDate(moment(e.target.value).add(6, "days").format("yyyy-MM-DD"));
    }, [setStartDate, setEndDate]);

    const onEndDateChange = useCallback((e) => {
        setEndDate(e.target.value);
    }, [setEndDate]);

    const value = useMemo(() => {
        return {
            startDate,
            endDate,
            onStartDateChange,
            onEndDateChange
        }
    }, [
        startDate,
        endDate,
        onStartDateChange,
        onEndDateChange
    ])

    return (
        <DateRangeContext.Provider value={value}>
            {children}
        </DateRangeContext.Provider>
    )
};

export const useDateRangeContext = () => {
    const context = useContext(DateRangeContext);
    if (context === undefined) {
        throw new Error("useDateRangeContext should be used within a provider");
    }
    return context;
};