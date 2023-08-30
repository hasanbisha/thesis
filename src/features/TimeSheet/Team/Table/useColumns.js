import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { renderSetting } from "../../../../utils/helpers/settings";

export const useColumns = () => {
    return useMemo(() => {
        const columnHelper = createColumnHelper();

        return [
            columnHelper.accessor("name", {
                enableColumnFilter: true,
                header: "Name",
                cell: ({ row: { original } }) => original
                    && original?.firstName + " " + original?.lastName
            }),
            columnHelper.accessor("email", {
                enableColumnFilter: true,
                header: "Email",
            }),
            columnHelper.accessor("paymentGroup", {
                enableColumnFilter: true,
                enableSorting: false,
                header: "Payment group",
                cell: (info) => {
                    let value = info.getValue();
                    if (value) {
                        value = renderSetting(value);
                    }
                    return (
                        <span
                            className="inline-block max-w-[300px] truncate"
                            title={value}
                        >
                            {value}
                        </span>
                    );
                },
                filter: {
                    type: "resource-select",
                    url: "/payment-groups",
                    renderOption: renderSetting,
                },
            }),
        ]
    }, [])
}