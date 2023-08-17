import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
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
import { renderSetting } from "../../utils/helpers/settings";
import { ROLE } from "../../utils/helpers/user";
import { useVisible } from "../../utils/hooks/useVisible";
import Form from "./Form";

function Users() {
	const { visible, selected, open, close } = useVisible();

	const [remove, RemoveModal] = useRemoveModal();

	const columns = useMemo(() => {
		const columnHelper = createColumnHelper();
		return [
			columnHelper.accessor("firstName", {
				enableColumnFilter: true,
				header: "First name",
			}),
			columnHelper.accessor("lastName", {
				enableColumnFilter: true,
				header: "Last name",
			}),
			columnHelper.accessor("email", {
				enableColumnFilter: true,
				header: "Email",
			}),
			columnHelper.accessor("role", {
				enableColumnFilter: true,
				header: "Role",
				cell: (info) => {
					switch (info.getValue()) {
						case ROLE.Admin: {
							return "Admin";
						}
						case ROLE.Manager: {
							return "Manager";
						}
						case ROLE.User: {
							return "User";
						}
					}
				},
				filter: {
					type: "select",
					options: [
						{ label: "Admin", value: ROLE.Admin },
						{ label: "Manager", value: ROLE.Manager },
						{ label: "User", value: ROLE.User },
					],
					renderOption: (r) => r.label,
					valuePropName: "value",
				},
			}),
			columnHelper.accessor("jobs", {
				enableColumnFilter: true,
				enableSorting: false,
				header: "Jobs",
				cell: (info) => {
					const value = info.getValue()?.map(renderSetting).join(", ");
					return (
						<span
							className="inline-block max-w-[300px] truncate"
							title={value}
						>
							{value}
						</span>
					);
				},
				filter: {
					type: "resource-select",
					url: "/jobs",
					renderOption: renderSetting,
				},
			}),
			columnHelper.accessor("locations", {
				enableColumnFilter: true,
				enableSorting: false,
				header: "Locations",
				cell: (info) => {
					const value = info.getValue()?.map(renderSetting).join(", ");
					return (
						<span
							className="inline-block max-w-[300px] truncate"
							title={value}
						>
							{value}
						</span>
					);
				},
				filter: {
					type: "resource-select",
					url: "/locations",
					renderOption: renderSetting,
				},
			}),
			columnHelper.accessor("projects", {
				enableColumnFilter: true,
				enableSorting: false,
				header: "Projects",
				cell: (info) => {
					const value = info.getValue()?.map(renderSetting).join(", ");
					return (
						<span
							className="inline-block max-w-[300px] truncate"
							title={value}
						>
							{value}
						</span>
					);
				},
				filter: {
					type: "resource-select",
					url: "/projects",
					renderOption: renderSetting,
				},
			}),
			columnHelper.accessor("paymentGroup", {
				enableColumnFilter: true,
				enableSorting: false,
				header: "Payment group",
				cell: (info) => {
					let value = info.getValue();
					if (value) {
						value = renderSetting(value);
					}
					return (
						<span
							className="inline-block max-w-[300px] truncate"
							title={value}
						>
							{value}
						</span>
					);
				},
				filter: {
					type: "resource-select",
					url: "/payment-groups",
					renderOption: renderSetting,
				},
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
		url: "/user",
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
