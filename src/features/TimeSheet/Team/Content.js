import { useContext } from "react";
import useSWR from "swr";
import moment from "moment";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid"
import Overall from "./Overall";
import Table from "./Table";
import DateRange from "../DateRange";
import { useVisible } from "../../../utils/hooks/useVisible";
import { useTable } from "../../../components/Table/hook";
import { useTableState, useTableStateQueryParams } from "../hooks";
import { useColumns } from "./Table/useColumns";
import { useFiltersColumns } from "./Table/useFiltersColumns";
import { DateRangeContext } from "../DateRange/context";
import "./style.css";
import Header from "../../../components/Layout/Header";

function Content() {
    const filtersColumns = useFiltersColumns();
    const { startDate, endDate } = useContext(DateRangeContext);

    const { toggle, visible } = useVisible();

    const columns = useColumns();
    const [state, onStateChange] = useTableState();
    const params = useTableStateQueryParams(state);
    const { data, isLoading } = useSWR({
        url: "/timesheets/team",
        params: {
            ...params,
            from: moment(startDate).unix(),
            to: moment(endDate).unix()
        },
    });

    const table = useTable({
        data,
        columns,
        isLoading,
        state,
        onStateChange,
        enableRowSelection: false,
        manualRowSelection: false,
        enableExpanding: true,
        manualExpanding: true,
        getRowCanExpand: () => true,
    });

    return (
        <div>
            <Header title="Team timesheet">
                <div className="flex items-center">
                    <button
                        type="button"
                        className="flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={toggle}
                    >
                        Analytics

                        {visible
                            ? <ChevronUpIcon className="h-5" />
                            : <ChevronDownIcon className="h-5" />}
                    </button>

                    <div className="ml-5">
                        <DateRange />
                    </div>
                </div>
            </Header>

            {visible && (
                <div className="p-5 bg-white">
                    <Overall params={params} />
                </div>
            )}

            <div className="layout-content">
                <Table table={table} filtersColumns={filtersColumns} />
            </div>
        </div>
    );
}

export default Content;
