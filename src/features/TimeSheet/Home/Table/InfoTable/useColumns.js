import moment from "moment";
import { useMemo } from "react"

export const useColumns = () => {
    return useMemo(() => [
        {
            header: "Start",
            accessor: "start",
            cell: ({ row }) => row?.original?.start
                && moment.unix(row.original.start).format("HH:mm:ss A")
        },
        {
            header: "End",
            accessor: "end",
            cell: ({ row }) => row?.original?.end
                && moment.unix(row.original.end).format("HH:mm:ss A")
        }
    ], []);
}