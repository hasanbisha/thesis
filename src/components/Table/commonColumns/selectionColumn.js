import Checkbox from "../../Inputs/Checkbox";

// TODO: implement the modified logic or whatever, ask paci
export const selectionColumn = {
    id: 'select',
    enableHiding: false,
    enableColumnFilter: false,
    header: ({ table }) => (
        <Checkbox
            id="selection-all"
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
        />
    ),
    cell: ({ row }) => (
        <Checkbox
            id={`selection-${row.id}`}
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
        />
    ),
};
