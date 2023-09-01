import { Field, FieldArray, Form, Formik } from "formik";
import { startCase } from "lodash";
import { useCallback, useMemo } from "react";
import { MinusIcon, PlusIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import Input from "../Inputs";
import Select from "../Inputs/Select";
import Button from "../Button";
import { useVisible } from "../../utils/hooks/useVisible";
import clsx from "clsx";
import ResourceSelect from "../Inputs/ResourceSelect";

export default function Filters({ table }) {
	const { columnFilters } = table.getState();

	const { visible, toggle } = useVisible(true);

	const getFieldOptions = useCallback((current, otherFilters) => {
		return table
			.getAllColumns()
			.filter((column) => column.getCanFilter())
			.filter((f) => {
				const filter = f.id;
				if (filter === current) {
					return true;
				}
				const existing = otherFilters.find(({ id }) => {
					if (!id) {
						return false;
					}
					return id === filter;
				});
				if (existing) {
					return false;
				}
				return true;
			})
			.map((column) => ({
				label: column.id,
				value: column.id,
			}));
	}, [table]);

	const map = useMemo(() => {
		return table
			.getAllColumns()
			.reduce((total, column) => {
				if (!column.getCanFilter()) {
					return total;
				}
				total[column.id] = column
				return total;
			}, {});
	}, [table]);
	const getFilterInput = useCallback((id, props) => {
		const config = map[id]?.columnDef?.filter;
		let type = config?.type || "text";
		switch (type) {
			default:
			case "text": {
				return <Input {...props} />
			}
			case "select": {
				return (
					<Select
						options={config.options}
						renderOption={config.renderOption}
						valuePropName={config.valuePropName}
						{...props}
						onChange={(value) => {
							const event = { target: { name: props.name, value } };
							props.onChange(event);
						}}
					/>
				);
			}
			case "resource-select": {
				return (
					<ResourceSelect
						url={config.url}
						renderOption={config.renderOption}
						valuePropName={config.valuePropName}
						{...props}
						onChange={(value) => {
							const event = { target: { name: props.name, value } };
							props.onChange(event);
						}}
					/>
				);
			}
		}
	}, [map]);

	const initialValues = useMemo(() => {
		const filters = columnFilters.map((columnFilter) => {
			const { id, value } = columnFilter;
			return { id, value };
		});
		return { filters };
	}, [columnFilters]);

	const onSubmit = useCallback((values) => {
		table.setColumnFilters(values.filters);
	}, [table.setColumnFilters]);

	return (
		<div className="flex items-start space-x-4">
			<span
				className={clsx("cursor-pointer p-2 rounded-lg", visible && "bg-indigo-100")}
				onClick={toggle}
			>
				<AdjustmentsHorizontalIcon height={20} />
			</span>

			<div className={clsx(!visible && "hidden")}>
				<Formik initialValues={initialValues} onSubmit={onSubmit}>
					{({ values, setValues, submitForm }) => (
						<Form className="flex items-start gap-x-4">
							<div className="inline-flex flex-col space-y-4">
								<FieldArray name="filters">
									{({ push, remove }) => values.filters.map((filter, i) => (
										<div className="inline-flex" key={filter?.id || i}>
											<div className="w-52 mr-4">
												<Field name={`filters.${i}.id`}>
													{({ field, form }) => (
														<Select
															{...field}
															onChange={(value) => {
																const event = {
																	target: { name: field.name, value }
																};
																field.onChange(event);
															}}
															options={getFieldOptions(field.value, form.values.filters)}
															valuePropName="value"
															renderOption={(option) => startCase(option.label)}
														/>
													)}
												</Field>
											</div>

											<div className="w-52">
												<Field name={`filters.${i}.value`}>
													{({ field }) => getFilterInput(filter?.id, field)}
												</Field>
											</div>

											<div className="inline-flex">
												<Button
													type="button"
													onClick={() => push({ id: null })}
													disabled={false}
													color="primary"
													mode="link"
												>
													<PlusIcon className="w-4 h-4" />
												</Button>

												<Button
													type="button"
													onClick={() => remove(i)}
													disabled={values.filters.length <= 1}
													color="plain"
													mode="link"
												>
													<MinusIcon className="w-4 h-4" />
												</Button>
											</div>
										</div>
									))}
								</FieldArray>
							</div>

							<div>
								<Button type="submit" color="primary" mode="secondary">
									Submit
								</Button>

								<Button
									type="button"
									color="plain"
									mode="link"
									onClick={() => {
										setValues({ filters: [{ id: null, value: null }] });
										submitForm();
									}}
								>
									Clear
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
