import { flexRender } from "@tanstack/react-table";
import { ArrowUpIcon, ArrowDownIcon, ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Loading from "../../../../components/Loaders/Loading";
import Filters from "../../../../components/Filters";
import ColumnToggle from "../../../../components/Table/ColumnToggle";
import DateTable from "./DateTable";

function Table({ table }) {
    const { isLoading, totalItems } = table.options.meta;

    return (
        <div className="shadow-md rounded-lg bg-white z-10">
            <div className="flex justify-between items-start py-2 px-4">
                <Filters table={table} />

                <ColumnToggle table={table} />
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    const canSort = header.column.getCanSort();
                                    const className = clsx(
                                        "px-6 py-3",
                                        header.column.getCanSort() && 'cursor-pointer select-none',
                                    );
                                    const sortDirection = header.column.getIsSorted();
                                    const SortIcon = sortDirection
                                        ? sortDirection === "desc" ? ArrowDownIcon : ArrowUpIcon
                                        : ArrowsUpDownIcon;
                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className={className}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div className="flex">
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}

                                                    {canSort && <SortIcon height={14} />}
                                                </div>
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4" colSpan="999">
                                    <div className="flex justify-center">
                                        <Loading />
                                    </div>
                                </td>
                            </tr>
                        ) : totalItems === 0 || !totalItems ? (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4" colSpan="999">
                                    <div className="flex justify-center">
                                        No data
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => {
                                const isExpanded = row.getIsExpanded();
                                console.log({ a: row.state })
                                return (
                                    <>
                                        <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
                                            {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id} className="px-6 py-4">
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext(),
                                                    )}
                                                </td>
                                            ))}
                                        </tr>


                                        {isExpanded && (
                                            ///TODO: team state
                                            <tr>
                                                <td className="border" colSpan={1000}>
                                                    <DateTable userId={row.original.id} state={{}} />
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
