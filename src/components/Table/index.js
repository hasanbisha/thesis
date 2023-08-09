import {flexRender} from "@tanstack/react-table";
import Pagination from "./Pagination";
import Loading from "../Loaders/Loading";
import { ArrowUpIcon, ArrowDownIcon, ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

function Table({ table }) {
    const { isLoading, totalItems } = table.options.meta;

    return (
        <div className="relative overflow-x-auto shadow-md rounded-lg">
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
                                    <Loading/>
                                </div>
                            </td>
                        </tr>
                    ) : totalItems === 0 ? (
                        <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4" colSpan="999">
                                <div className="flex justify-center">
                                    No data
                                </div>
                            </td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map((row) => {
                            return (
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
                            );
                        })
                    )}
                </tbody>
            </table>

            <Pagination table={table} />
        </div>
    );
}

export default Table;
