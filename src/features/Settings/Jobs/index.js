import { createColumnHelper, noop } from "@tanstack/react-table";
import { PencilIcon } from "@heroicons/react/20/solid";
import { useMemo } from "react";

function Jobs() {
	const columns = useMemo(() => {
		const columnHelper = createColumnHelper();
		return [
			columnHelper.accessor("code", {
				header: "code"
			}),
			columnHelper.accessor("description", {
				header: "description"
			}),
			columnHelper.accessor("status", {
				header: "status"
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
								onClick={noop}
							/>

							<PencilIcon
								className="cursor-pointer"
								height={14}
								onClick={noop}
							/>

							<PencilIcon
								className="cursor-pointer"
								height={14}
								onClick={noop}
							/>
						</div>
					);
				},
			}),
		];
	}, []);

	const table = useTable();

	return (
		<div>
			<Table table={table} />
		</div>
	);
}

export default Jobs;
