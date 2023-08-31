import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { renderSetting } from "../../../../utils/helpers/settings";

export const useFiltersColumns = () => {
    return useMemo(() => {
        const columnHelper = createColumnHelper();

        return [
            columnHelper.accessor("paymentGroup", {
                header: "Payment group",
                enableColumnFilter: true,
                id: "paymentGroup",
                filter: {
                    type: "resource-select",
                    url: "/payment-groups",
                    renderOption: renderSetting,
                },
            }),
            columnHelper.accessor("projects", {
                header: "Project",
                enableColumnFilter: true,
                id: "projects",
                filter: {
                    type: "resource-select",
                    url: "/projects",
                    renderOption: renderSetting,
                },
            }),
            columnHelper.accessor("locations", {
                enableColumnFilter: true,
                header: "Locations",
                id: "locations",
                filter: {
                    type: "resource-select",
                    url: "/locations",
                    renderOption: renderSetting,
                },
            }),
            columnHelper.accessor("jobs", {
                enableColumnFilter: true,
                header: "Jobs",
                id: "jobs",
                filter: {
                    type: "resource-select",
                    url: "/jobs",
                    renderOption: renderSetting,
                },
            }),
        ]
    }, [])
}