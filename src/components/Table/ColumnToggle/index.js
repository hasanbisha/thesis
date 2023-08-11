import { Popover, Transition } from '@headlessui/react'
import { AdjustmentsVerticalIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { Fragment } from 'react'
import Checkbox from "../../Inputs/Checkbox";

export default function ColumnToggle({ table }) {
	const columns = table
		.getAllLeafColumns()
		.filter((column) => {
			return column.getCanHide();
		});

	return (
		<Popover className="relative">
			{({ open }) => (
				<>
					<Popover.Button className={clsx(open && 'text-opacity-90  bg-indigo-100', "rounded-lg p-2 focus:outline-none")}>
						<AdjustmentsVerticalIcon height={20} />
					</Popover.Button>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<Popover.Panel className="absolute right-0 z-100 mt-3 z-20 bg-white">
							<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-4">
								{columns.map(column => {
									return (
										<div key={column.id} className="px-1">
											<label className="flex items-center py-2 space-x-4">
												<Checkbox
													{...{
														type: 'checkbox',
														checked: column.getIsVisible(),
														onChange: column.getToggleVisibilityHandler(),
													}}
												/>
												<span>{column.columnDef.header}</span>
											</label>
										</div>
									)
								})}
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

