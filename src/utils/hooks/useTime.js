import { useEffect, useState } from "react";
import moment from "moment";

const DEFAULT_INTERVAL_DURATION = 1000;

export function useTime() {
    const [value, setValue] = useState(moment().toDate());

    useEffect(() => {
        const i = setInterval(() => {
            setValue(moment().toDate());
        }, DEFAULT_INTERVAL_DURATION);

        return () => clearInterval(i);
    }, [setValue]);

    return value;
}