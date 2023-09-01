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
        const dates = Object.keys(data || {});
        const formattedData = dates?.map((date) => ({
            date,
            job: data[date][0].job,
            location: data[date][0]?.location,
            project: data[date][0]?.project,
            values: data[date]
        }));

        return [
            formattedData,
            formattedData?.length
        ]
    }, [data]);

    const table = useTable({
        data: tableData,
        columns,
        isLoading,
        enableRowSelection: false,
        manualRowSelection: false,
        enableExpanding: true,
        manualExpanding: true,
        getRowCanExpand: () => true,
    });

    return <Table table={table} hasFilters={false} />;
}

export default DateTable;
