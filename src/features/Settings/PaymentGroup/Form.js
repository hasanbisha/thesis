import Drawer from "../../../components/Drawer";
import DynamicForm from "../../../components/DynamicForm";
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
	code: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
	overtimeThreshold: Yup.number()
		.min(1, 'Overtime threshold should be bigger than 1')
		.max(24, 'Overtime threshold should be smaller than 24')
		.required('Required'),
	overtimeMultiplier: Yup.number()
		.min(1, 'Overtime multiplier should be bigger than 1')
		.required('Required'),
});

const config = [
	{ name: "code", label: "Code" },
	{ name: "description", label: "Description" },
	{ name: "overtimeThreshold", label: "Overtime threshold", type: "number" },
	{ name: "overtimeMultiplier", label: "Overtime multiplier", type: "number" },
];

export default function PaymentGroupForm({ visible, close, selected, onSubmit }) {
	const title = selected ? "Edit payment group" : "Add payment group";
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
