import { flexRender } from "@tanstack/react-table";
import clsx from "clsx";
import ColumnToggle from "../../../../../components/Table/ColumnToggle";
import Loading from "../../../../../components/Loaders/Loading";

function Content({ table }) {
    const { isLoading, totalItems } = table.options.meta;

    return (
        <div className="shadow-md rounded-lg bg-white z-10">
            <div className="flex justify-end py-2 px-4">
                <ColumnToggle table={table} />
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    const className = clsx(
                                        "px-6 py-3",
                                        header.column.getCanSort() && 'cursor-pointer select-none',
                                    );

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
            </div>
        </div>
    );
}

export default Content;
