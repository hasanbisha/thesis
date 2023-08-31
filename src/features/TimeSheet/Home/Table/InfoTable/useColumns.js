import { useMemo } from "react"
import moment from "moment";
import { createColumnHelper } from "@tanstack/react-table";
import { firstToUpper } from "../../../../../utils/helpers/string";
import { renderDurationAsFormat } from "../../../../../utils/helpers/date";
import { currencyFormatter } from "../../../../../utils/helpers/currencyFormatter";

export const useColumns = () => {
    const columnHelper = createColumnHelper();

    return useMemo(() => [
        columnHelper.accessor("start", {
            header: "Start",
            enableSorting: false,
            enableHiding: false,
            cell: ({ row }) => row?.original?.start
                && moment.unix(row.original.start).format("HH:mm:ss A")
        }),
        columnHelper.accessor("end", {
            header: "End",
            enableSorting: false,
            enableHiding: false,
            cell: ({ row }) => row?.original?.end
                && moment.unix(row.original.end).format("HH:mm:ss A")
        }),
        columnHelper.accessor("type", {
            header: "Payment group",
            enableSorting: false,
            cell: ({ row }) => row?.original?.type
                && firstToUpper(row?.original?.type)
        }),
        columnHelper.accessor("duration", {
            header: "Duration",
            cell: ({ row }) => row?.original?.duration
                && renderDurationAsFormat(row?.original?.duration, "HH:mm:ss")
        }),
        columnHelper.accessor("payment", {
            header: "Payment",
            cell: ({ row }) => row?.original?.total
                ? currencyFormatter(row?.original?.total, "USD")
                : "--"
        })
    ], []);
}