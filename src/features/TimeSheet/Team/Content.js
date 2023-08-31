import { useCallback, useContext, useMemo } from "react";
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

function Content() {
    const filtersColumns = useFiltersColumns();
    const { startDate, endDate } = useContext(DateRangeContext);

    const { open, visible, close } = useVisible();

    const openAnalytics = useCallback(() => {
        if (visible) {
            close();
        } else {
            open();
        }
    }, [visible, open, close]);

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
        <div className="">
            <div className="flex bg-white items-center p-5">
                <button
                    type="button"
                    className="flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={openAnalytics}
                >
                    Analytics

                    {visible
                        ? <ChevronUpIcon className="h-5" />
                        : <ChevronDownIcon className="h-5" />}
                </button>

                <div className="mx-5">
                    <DateRange />
                </div>
            </div>

            {visible && (
                <div className="p-5 bg-white">
                    <Overall params={params} />
                </div>
            )}

            <Table table={table} filtersColumns={filtersColumns} />
        </div>
    );
}

export default Content;
