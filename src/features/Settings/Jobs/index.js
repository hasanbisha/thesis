import { createColumnHelper } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useCallback, useMemo } from "react";
import Table from "../../../components/Table";
import Button from "../../../components/Button";
import { useRemoveModal } from "../../../components/DeleteModal";
import { useVisible } from "../../../utils/hooks/useVisible";
import { useTable, useTableState, useTableStateQueryParams } from "../../../components/Table/hook";
import useSWR from "swr";
import Form from "./Form";
import useApi from "../../../utils/api";
import { toast } from "react-toastify";

function Jobs() {
	const { visible, selected, open, close } = useVisible();

	const [remove, RemoveModal] = useRemoveModal();

	const columns = useMemo(() => {
		const columnHelper = createColumnHelper();
		return [
			columnHelper.accessor("code", {
				enableColumnFilter: true,
				header: "Code"
			}),
			columnHelper.accessor("description", {
				enableColumnFilter: true,
				header: "Description"
			}),
			columnHelper.accessor("rate", {
				enableColumnFilter: true,
				header: "Rate"
			}),
			columnHelper.accessor("startTime", {
				header: "Start time"
			}),
			columnHelper.accessor("endTime", {
				header: "End time"
			}),
			columnHelper.group({
				enableHiding: false,
				id: "actions",
				cell: (info) => {
					const { original } = info.row;
					return (
						<div className="flex space-x-2">
							<PencilIcon
								className="cursor-pointer"
								height={16}
								onClick={() => open(original)}
							/>

							<TrashIcon
								className="cursor-pointer"
								height={16}
								onClick={() => remove(original.id)}
							/>
						</div>
					);
				},
			}),
		];
	}, [open, remove]);

	const [state, onStateChange] = useTableState();
	const params = useTableStateQueryParams(state);
	const { data, isLoading, mutate } = useSWR({
		url: "/jobs",
		params,
	});
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
			await authPost("/jobs", { data });
			close();
			mutate();
			toast.success("Job added successfully");
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
			await authPatch(`/jobs/${id}`, { data });
			close();
			mutate();
			toast.success("Job updated successfully");
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
		await authDelete(`/jobs/${id}`);
		mutate();
		toast.success("Job removed successfully");
	}, [authDelete, mutate])
	const onSubmit = useMemo(() => {
		if (selected) {
			return update.bind(null, selected.id);
		}
		return create
	}, [selected, create, update]);

	return (
		<div>
			<div className="flex justify-between items-start mb-4">
				<div />

				<Button onClick={() => open()}>
					+ Add
				</Button>
			</div>

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

export default Jobs;
