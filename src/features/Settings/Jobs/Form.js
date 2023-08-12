import Drawer from "../../../components/Drawer";
import DynamicForm from "../../../components/DynamicForm";
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	code: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
	rate: Yup.number().required('Required'),
	startTime: Yup.string().required('Required'),
	endTime: Yup.string().required('Required'),
});

const config = [
	{ name: "code", label: "Code" },
	{ name: "description", label: "Description" },
	{ name: "rate", label: "Rate", type: "number" },
	[
		{ name: "startTime", label: "Start time", type: "time" },
		{ name: "endTime", label: "End time", type: "time" },
	],
];

export default function JobForm({ visible, close, selected, onSubmit }) {
	const title = selected ? "Edit job" : "Add job";
	return (
		<Drawer title={title} visible={visible} close={close}>
			<DynamicForm
				config={config}
				close={close}
				initialValues={selected || {
					code: "",
					description: "",
					rate: 0,
					startTime: "",
					endTime: "",
				}}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			/>
		</Drawer>
	)
}
