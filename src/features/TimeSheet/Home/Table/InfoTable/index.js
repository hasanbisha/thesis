import { useMemo } from "react";
import { useTable } from "../../../../../components/Table/hook";
import Content from "./Content";
import { useColumns } from "./useColumns";

function InfoTable({ data }) {
    const columns = useColumns();

    const tableData = useMemo(() => [
        data,
        data?.length
    ], [data]);

    const table = useTable({
        data: tableData,
        columns,
        enableRowSelection: false,
        manualRowSelection: false,
    });

    return <Content table={table} />
}

export default InfoTable;
