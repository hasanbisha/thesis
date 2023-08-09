import Drawer from "../../../components/Drawer";
import DynamicForm from "../../../components/DynamicForm";
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	// code: Yup.string().required('Required'),
	// description: Yup.string().required('Required'),
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
	return (
		<Drawer title="Add job" visible={visible} close={close}>
			<DynamicForm
				config={config}
				close={close}
				initialValues={selected || {}}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			/>
		</Drawer>
	)
}
