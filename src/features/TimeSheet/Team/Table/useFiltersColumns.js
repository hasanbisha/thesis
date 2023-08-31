import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useFiltersColumns as useDateFiltersColumns } from "../../Home/Table/useFiltersColumns";

export const useFiltersColumns = () => {
    const dateTableFilters = useDateFiltersColumns();
    return useMemo(() => {
        const columnHelper = createColumnHelper();

        return [
            columnHelper.accessor("user", {
                header: "Name",
                enableColumnFilter: true,
                id: "user",
                filter: {
                    type: "resource-select",
                    url: "/user",
                    renderOption: (value) =>
                        value?.firstName + " " + value?.lastName,
                },
            }),
            ...dateTableFilters
        ]
    }, [dateTableFilters])
}