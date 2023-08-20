import Table from "../../../../../components/Table";
import { useTable } from "../../../../../components/Table/hook";

const data = [], columns = [];

function InfoTable() {

    const table = useTable({
        data,
        columns,
        enableRowSelection: false
    })
    return <Table table={table} pagination={false} />
}

export default InfoTable;
