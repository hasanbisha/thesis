import { createColumnHelper } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import Button from "../../components/Button";
import { useRemoveModal } from "../../components/DeleteModal";
import Header from "../../components/Layout/Header";
import Table from "../../components/Table";
import { useTable, useTableState, useTableStateQueryParams } from "../../components/Table/hook";
import useApi from "../../utils/api";
import { useVisible } from "../../utils/hooks/useVisible";
import Form from "./Form";

function Users() {
	const { visible, selected, open, close } = useVisible();

	const [remove, RemoveModal] = useRemoveModal();

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

	const [state, onStateChange] = useTableState();
	const params = useTableStateQueryParams(state);
    const { data, isLoading, mutate } = useSWR({ url: "/user", params });
	const table = useTable({
		data,
		columns,
		isLoading,
		state,
		onStateChange,
	});

	const { authPost, authPatch, authDelete } = useApi();
	const create = useCallback(async (data, { setErrors }) => {
		try {
			await authPost("/user", { data });
			close();
			mutate();
			toast.success("User added successfully");
		} catch (err) {
			if (Array.isArray(err)) {
				const errors = err.reduce((total, error) => {
					total[error.property] = error.message
					return total;
				}, {});
				setErrors(errors);
			}
		}
	}, [mutate, authPost, close]);
	const update = useCallback(async (id, data, { setErrors }) => {
		try {
			await authPatch(`/user/${id}`, { data });
			close();
			mutate();
			toast.success("User updated successfully");
		} catch (err) {
			if (Array.isArray(err)) {
				const errors = err.reduce((total, error) => {
					total[error.property] = error.message
					return total;
				}, {});
				setErrors(errors);
			}
		}
	}, [mutate, authPatch, close]);
	const onConfirmRemove = useCallback(async (id) => {
		await authDelete(`/user/${id}`);
		mutate();
		toast.success("User removed successfully");
	}, [authDelete, mutate])
	const onSubmit = useMemo(() => {
		if (selected) {
			return update.bind(null, selected.id);
		}
		return create
	}, [selected, create, update]);

    return (
        <div>
            <Header title="Users">
                <Button onClick={() => open()}>
                    + Add
                </Button>
            </Header>

            <Table table={table} />

			<Form
				visible={visible}
				close={close}
				selected={selected}
				onSubmit={onSubmit}
			/>

			<RemoveModal onConfirm={onConfirmRemove} />
        </div>
    );
}

export default Users;
