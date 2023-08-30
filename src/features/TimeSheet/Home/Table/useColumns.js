import { useMemo } from "react";

export const useColumns = () => {
    return useMemo(() => [
        {
            header: "Date",
            accessor: "date",
            cell: ({ row }) => row?.original?.date && row?.original?.date
        }
    ], []);
}
