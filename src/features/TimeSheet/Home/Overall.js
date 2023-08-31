import { useContext, useMemo } from "react";
import useSWR from "swr";
import moment from "moment";
import { DateRangeContext } from "../DateRange/context";
import { firstToUpper } from "../../../utils/helpers/string";
import { renderDurationAsFormat } from "../../../utils/helpers/date";
import { currencyFormatter } from "../../../utils/helpers/currencyFormatter";

function Overall({ params }) {
    const { startDate, endDate } = useContext(DateRangeContext);

    const { data } = useSWR({
        url: "/timesheets/overall",
        params: {
            ...params,
            from: moment(startDate).unix(),
            to: moment(endDate).unix()
        }
    });

    const types = useMemo(() => {
        return Object.keys(data || [])
    }, [data]);

    const duration = useMemo(() => {
        return Object.values(data || [])?.reduce((total, current) => {
            return total += current?.duration;
        }, 0)
    }, [data]);

    const total = useMemo(() => {
        return Object.values(data || [])?.reduce((total, current) => {
            return total += current?.total;
        }, 0)
    }, [data]);

    return <table className="w-full">
        <thead>
            <tr>
                {types?.map((type) =>
                    <th className="overall-th">
                        {firstToUpper(type)}
                    </th>
                )}
                <th className="rounded-tr-lg bg-indigo-600 text-white px-4 py-2">
                    Total
                </th>
            </tr>
        </thead>

        <tbody>
            <tr>
                {types?.map((type) =>
                    <td className="border border-indigo-600 text-center py-2 px-3">
                        {renderDurationAsFormat(data[type]?.duration, "HH:mm:ss")}
                    </td>
                )}
                <td className="border border-indigo-600 text-center py-2 px-3">
                    {renderDurationAsFormat(duration, "HH:mm:ss")}
                </td>
            </tr>
            <tr>
                {types?.map((type) =>
                    <td className="border border-indigo-600 text-center py-2 px-3">
                        {currencyFormatter(data[type]?.total, "USD")}
                    </td>
                )}
                <td className="border border-indigo-600 text-center py-2 px-3">
                    {currencyFormatter(total, "USD")}
                </td>
            </tr>
        </tbody>
    </table>
}

export default Overall;
