import { useMemo } from "react";
import useSWR from "swr";
import { firstToUpper } from "../../../utils/helpers/string";

function Overall({ from, to }) {
    const { data } = useSWR({
        url: "/timesheets/overall?from=1692403200&to=1692489599",
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
                        {data[type]?.duration}
                    </td>
                )}
                <td className="border border-indigo-600 text-center py-2 px-3">
                    {duration}
                </td>
            </tr>
            <tr>
                {types?.map((type) =>
                    <td className="border border-indigo-600 text-center py-2 px-3">
                        {data[type]?.total}
                    </td>
                )}
                <td className="border border-indigo-600 text-center py-2 px-3">
                    {total}
                </td>
            </tr>
        </tbody>
    </table>
}

export default Overall;
