import { useMemo, useState } from "react";

export const useTableStateQueryParams = (state) => {
    return useMemo(() => {
        const params = {};
        params.filters = state.columnFilters.reduce((total, filter) => {
            total[filter.id] = filter.value;
            return total;
        }, {});
        const [sort] = state.sorting;
        if (sort) {
            params.sortBy = sort.id;
            params.orderBy = sort.desc ? "DESC" : "ASC";
        }
        return params;
    }, [state]);
}

export const useTableState = () => {
    return useState({
        columnFilters: [{}],
        sorting: [],
    });
}
