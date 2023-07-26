import {flexRender} from "@tanstack/react-table";
import {Card, Table as BaseTable} from "reactstrap";
import classNames from "classnames";
import Pagination from "./Pagination";
import Loading from "../Loaders/Loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSort, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";

function Table({ table }) {
    const { loading } = table.options.meta;

    return (
        <Card className="mb-0 h-100">
            <BaseTable
                className="align-items-center table-flush"
                hover
                responsive
            >
                <thead className="thead-light">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                const canSort = header.column.getCanSort();
                                const className = classNames(
                                    header.column.getCanSort() && 'cursor-pointer select-none',
                                );
                                const sortDirection = header.column.getIsSorted();
                                const sortIcon = sortDirection
                                    ? sortDirection === "desc" ? faSortDown : faSortUp
                                    : faSort;
                                return (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className={className}
                                        onClick={header.column.getToggleSortingHandler()}
                                        style={{ color: "#676767" }}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}

                                                {canSort && (
                                                    <FontAwesomeIcon className="ml-2" icon={sortIcon} />
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
                    {loading ? (
                        <tr>
                            <td colSpan="999">
                                <div className="d-flex justify-content-center">
                                    <Loading/>
                                </div>
                            </td>
                        </tr>
                    ) : totalItems === 0 ? (
                        <tr>
                            <td colSpan="999">
                                <div className="d-flex justify-content-center">
                                    No data
                                </div>
                            </td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map((row) => {
                            /*
                                TODO: ne te tilla rastesh ta shperblefsha eljan
                                    (row.original?.summaryColumns?.length > 0 ||
                                        row.original?.footerColumns?.length > 0) ? (
                                        <tr
                                            className={classNames(
                                                "w-100 text-white font-weight-bolder",
                                                row.original.class
                                                    ? row.original.class
                                                    : row.original
                                                        ?.summaryColumns
                                                        ?.length > 0
                                                        ? "bg-info"
                                                        : "bg-gray",
                                            )}
                                        >
                                            {(
                                                row.original.summaryColumns ||
                                                row.original.footerColumns
                                            ).map((r) => {
                                                return (
                                                    <td
                                                        className="text-sm"
                                                        colSpan={r.colSpan}
                                                        key={r.accessor}
                                                    >
                                                        {r.value}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                            */
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id}>
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
            </BaseTable>

            <Pagination
                page={table.getState().pagination.pageIndex}
                pageCount={table.getPageCount()}
                perPage={table.getState().pagination.pageSize}
                gotoPage={table.setPageIndex}
                setPerPage={table.setPageSize}
            />
        </Card>
    );
}

export default Table;
