import { useEffect, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { selectionColumn } from "../commonColumns/selectionColumn";

export const useNewTable = ({
	data,
	totalItems,
	columns: baseColumns,
	loading,
}) => {
	const columns = ;

	const [pageCount, setPageCount] = useState(
		Math.ceil(totalItems / tableInitialState.pagination.pageSize),
	);

	const table = useReactTable({
		initialState: tableInitialState,
		meta: useMemo(() => ({
			...meta,
			totalItems,
			loading,
		}), [meta, totalItems, loading]),
		defaultColumn: useMemo(() => ({
			enableColumnFilter: false,
			enableHiding: true,
			filterType: "text",
		}), []),
        columns: useMemo(() => {
            return [selectionColumn, ...columns];
        }, [columns]),
		data,

		pageCount,
		getCoreRowModel: getCoreRowModel(),

		manualPagination: true,
		manualFiltering: true,
		manualSorting: true,

		enableSorting: true,
		enableFilters: true,
		enableRowSelection: true,
		enableHiding: true,
	});

	const state = table.getState();
	useEffect(() => {
		setPageCount(Math.ceil(totalItems / state.pagination.pageSize));
	}, [setPageCount, totalItems, state.pagination.pageSize]);

	return table;
};
