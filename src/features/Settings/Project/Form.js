import Drawer from "../../../components/Drawer";
import DynamicForm from "../../../components/DynamicForm";
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	code: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
});

const config = [
	{ name: "code", label: "Code" },
	{ name: "description", label: "Description" },
];

export default function ProjectForm({ visible, close, selected, onSubmit }) {
	const title = selected ? "Edit project" : "Add project";
	return (
		<Drawer title={title} visible={visible} close={close}>
			<DynamicForm
				config={config}
				close={close}
				initialValues={selected || {
					code: "",
					description: "",
				}}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			/>
		</Drawer>
	)
}
