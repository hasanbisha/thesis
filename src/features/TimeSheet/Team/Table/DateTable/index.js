import { useContext, useMemo } from "react";
import moment from "moment";
import useSWR from "swr";
import Table from "../../../Home/Table";
import { useTable } from "../../../../../components/Table/hook";
import { useColumns } from "../../../Home/Table/useColumns";
import { useTableStateQueryParams } from "../../../hooks";
import { DateRangeContext } from "../../../DateRange/context";

function DateTable({ userId, state }) {
    const { startDate, endDate } = useContext(DateRangeContext);
    const columns = useColumns();
    const params = useTableStateQueryParams(state);
    const { data, isLoading } = useSWR({
        url: `/timesheets/team/${userId}`,
        params: {
            ...params,
            from: moment(startDate).unix(),
            to: moment(endDate).unix()
        },
    });

    const tableData = useMemo(() => {
        return [
            Object?.keys(data || []),
            Object.keys(data || [])?.length]
    }, [data])

    const table = useTable({
        data: tableData,
        columns,
        isLoading,
        state,
        enableRowSelection: false,
        manualRowSelection: false,
    });

    return <Table table={table} hasFilters={false} />;
}

export default DateTable;
