import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import Header from "../../components/Layout/Header";
import Table from "../../components/Table";
import { useTable } from "../../components/Table/hook";

const useUsers = () => {
    return useSWR("/users");
}

function Users() {
    const { data, isLoading } = useUsers();

    const columns = useMemo(() => {
        const columnHelper = createColumnHelper();
        return [
            columnHelper.accessor("firstName", {
                header: "First name",
            }),
            columnHelper.accessor("lastName", {
                header: "Last name",
            }),
            columnHelper.accessor("email", {
                header: "Email",
            }),
            columnHelper.accessor("job", {
                header: "Job",
            }),
            columnHelper.accessor("location", {
                header: "Location",
            }),
        ];
    }, []);

    const table = useTable({ data, columns, isLoading });

    return (
        <div>
            <Header title="Users">
                <Link to="/users/add">
                    + Add
                </Link>
            </Header>

            <div className="layout-content">
                <Table table={table} />
            </div>
        </div>
    );
}

export default Users;
