import { createColumnHelper } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useCallback, useMemo, useState } from "react";
import Table from "../../../components/Table";
import Button from "../../../components/Button";
import Filters from "../../../components/Filters";
import { useVisible } from "../../../utils/hooks/useVisible";
import { useTable } from "../../../components/Table/hook";
import useSWR from "swr";
import Form from "./Form";
import useApi from "../../../utils/api";
import { useRemoveModal } from "./DM";

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
				id: "actions",
				cell: (info) => {
					const { original } = info.row;
					return (
						<div className="flex space-x-2">
							<PencilIcon
								className="cursor-pointer"
								height={14}
								onClick={() => open(original)}
							/>

							<TrashIcon
								className="cursor-pointer"
								height={14}
								onClick={() => remove(original.id)}
							/>
						</div>
					);
				},
			}),
		];
	}, [open, remove]);

	const { data, isLoading, mutate } = useSWR({
		url: "/jobs",
		params: table.getState(),
	});
	const [state, setState] = useState({
		pagination: {},
		columnFilters: [{}],
	});
	const table = useTable({ data, columns, isLoading });

	const { authPost, authPatch, authDelete } = useApi();
	const create = useCallback(async (data, { setErrors }) => {
		try {
			await authPost("/jobs", { data });
			close();
			mutate();
		} catch (err) {
			if (Array.isArray(err)) {
				console.log(err);
				setErrors(err);
			}
		}
	}, [mutate, authPost, close]);
	const update = useCallback(async (id, data) => {
		try {
			await authPatch(`/jobs/${id}`, { data });
			close();
			mutate();
		} catch (err) {}
	}, [mutate, authPatch, close]);
	const onConfirmRemove = useCallback(async (id) => {
		await authDelete(`/jobs/${id}`);
		mutate();
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
				<Filters table={table} />

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
