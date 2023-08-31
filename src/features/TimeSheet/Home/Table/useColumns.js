import { useMemo } from "react";
import { renderDurationAsFormat } from "../../../../utils/helpers/date";
import { currencyFormatter } from "../../../../utils/helpers/currencyFormatter";
import { createColumnHelper } from "@tanstack/react-table";

export const useColumns = () => {
    const columnsHelper = createColumnHelper();

    return useMemo(() => [
        columnsHelper.accessor("date", {
            header: "Date",
            enableSorting: false,
            enableHiding: false,
        }),
        columnsHelper.accessor("duration", {
            header: "Shifts Duration",
            enableSorting: false,
            cell: ({ row }) => {
                const duration = row?.original?.values?.reduce((total, current) => {
                    return total += current?.duration
                }, 0);
                return renderDurationAsFormat(duration, "HH:mm:ss")
            }
        }),
        columnsHelper.accessor("total", {
            header: "Payment",
            enableSorting: false,
            cell: ({ row }) => {
                const duration = row?.original?.values?.reduce((total, current) => {
                    return total += current?.total
                }, 0);

                return duration > 0
                    ? currencyFormatter(duration, "USD")
                    : "--"
            }
        })
    ], []);
}
