import { useMemo } from "react";
import { renderDurationAsFormat } from "../../../../utils/helpers/date";
import { currencyFormatter } from "../../../../utils/helpers/currencyFormatter";
import { renderSetting } from "../../../../utils/helpers/settings";
import { createColumnHelper } from "@tanstack/react-table";

export const useColumns = () => {
    const columnsHelper = createColumnHelper();

    return useMemo(() => [
        columnsHelper.accessor("date", {
            header: "Date",
            enableSorting: false,
            enableHiding: false,
        }),
        columnsHelper.accessor("job", {
            header: "Job",
            enableSorting: false,
            enableHiding: false,
            cell: (info) => {
                const value = info.getValue();
                return value && renderSetting(value);
            },
        }),
        columnsHelper.accessor("location", {
            header: "Location",
            enableSorting: false,
            enableHiding: false,
            cell: (info) => {
                const value = info.getValue();
                return value && renderSetting(value);
            },
        }),
        columnsHelper.accessor("project", {
            header: "Project",
            enableSorting: false,
            enableHiding: false,
            cell: (info) => {
                const value = info.getValue();
                return value && renderSetting(value);
            },
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

                return duration !== undefined
                    ? currencyFormatter(duration, "USD")
                    : "--"
            }
        })
    ], []);
}
