import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

export const expandColumn = {
    id: "expanded",
    enableHiding: false,
    enableColumnFilter: false,
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
