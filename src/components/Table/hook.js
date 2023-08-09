import { useEffect, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { selectionColumn } from "./commonColumns/selectionColumn";

const emptyData = [];

export const useTable = ({
	data: _data,
	columns,
	isLoading,
	meta,
}) => {
	const [data, totalItems] = _data || [emptyData, 0];

	const [pageCount, setPageCount] = useState(
		Math.ceil(totalItems / 10),
	);

	const table = useReactTable({
		initialState: {
			columnFilters: [{}],
			pagination: {
				pageSize: 10
			},
		},
		meta: useMemo(() => ({
			...meta,
			totalItems,
			isLoading,
		}), [meta, totalItems, isLoading]),
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
