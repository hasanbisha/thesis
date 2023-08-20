import { useCallback, useEffect, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { selectionColumn } from "./commonColumns/selectionColumn";

const emptyData = [];

export const useTableStateQueryParams = (state) => {
	return useMemo(() => {
		const params = {
			page: state.pagination.pageIndex,
			pageSize: state.pagination.pageSize,
		};
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
		pagination: {
			pageIndex: 0,
			pageSize: 10,
		},
		columnFilters: [{}],
		sorting: [],
	});
}

const expandColumn = {
	id: "expanded",
	header: ({ table }) => (
		<button
			onClick={table.getToggleAllRowsExpandedHandler()}
		>
			{table.getIsAllRowsExpanded()
				? <ChevronUpIcon className="text-gray-800 h-5" />
				: <ChevronDownIcon className="text-gray-800 h-5" />}
		</button>
	),
	cell: ({ row }) => (
		<div
			style={{
				paddingLeft: `${row.depth * 2}rem`,
			}}
		>
			<button
				onClick={row.getToggleExpandedHandler()}
				style={{ cursor: 'pointer' }}
			>
				{row.getIsExpanded()
					? <ChevronUpIcon className="text-gray-800 h-5" />
					: <ChevronDownIcon className="text-gray-800 h-5" />}
			</button>
		</div>
	),
};

export const useTable = ({
	data: _data,
	columns: baseColumns,
	isLoading,
	meta,
	state: _state,
	onStateChange,
	rowIdProperty = "id",
	...props
}) => {
	const columns = useMemo(() => {
		if (props.enableRowSelection === false) {
			return [expandColumn, ...baseColumns];
		}
		return [
			expandColumn,
			selectionColumn,
			...baseColumns
		];
	}, [baseColumns, props.enableRowSelection]);

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
		columns,
		data,

		pageCount,
		getCoreRowModel: getCoreRowModel(),
		getRowId: useCallback((row, _, parent) => {
			const id = row[rowIdProperty];
			if (parent) {
				return [parent.id, id].join('.');
			}
			return id;
		}, [rowIdProperty]),

		state: _state,
		onStateChange,

		manualPagination: true,
		manualFiltering: true,
		manualSorting: true,

		enableSorting: true,
		enableFilters: true,
		enableRowSelection: true,
		enableHiding: true,
		...props
	});

	const state = table.getState();
	useEffect(() => {
		setPageCount(Math.ceil(totalItems / state.pagination.pageSize));
	}, [setPageCount, totalItems, state.pagination.pageSize]);

	return table;
};
