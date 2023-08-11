import Drawer from "../../../components/Drawer";
import DynamicForm from "../../../components/DynamicForm";
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	code: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
	country: Yup.string().required('Required'),
	city: Yup.string().required('Required'),
});

const config = [
	{ name: "code", label: "Code" },
	{ name: "description", label: "Description" },
	{ name: "country", label: "Country" },
	{ name: "city", label: "City" },
];

export default function LocationForm({ visible, close, selected, onSubmit }) {
	const title = selected ? "Edit location" : "Add location";
	return (
		<Drawer title={title} visible={visible} close={close}>
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
