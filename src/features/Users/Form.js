import DynamicForm from "../../components/DynamicForm";
import { renderSetting } from "../../utils/helpers/settings";
import * as Yup from "yup";
import { ROLE } from "../../utils/helpers/user";
import { useUser } from "../../utils/hooks/useUser";
import { useMemo } from "react";
import Drawer from "../../components/Drawer";

function UserForm({ visible, close, selected, onSubmit }) {
    const user = useUser();

    const config = useMemo(() => {
        const roles = [
            { label: "User", value: ROLE.User },
        ];
        if (user.role === ROLE.Admin) {
            roles.unshift({ label: "Manager", value: ROLE.Manager });
        }
        return [
            [
                {
                    label: "First name",
                    name: "firstName",
                },
                {
                    label: "Middle name",
                    name: "middleName",
                },
                {
                    label: "Last name",
                    name: "lastName",
                },
            ],
            {
                label: "Email",
                name: "email",
                type: "email",
            },
            {
                label: "Password",
                name: "password",
                type: "password",
            },
            {
                label: "Jobs",
                name: "jobs",
                type: "resource-select",
                url: "/jobs",
                renderOption: renderSetting,
                multiple: true,
            },
            {
                label: "Locations",
                name: "locations",
                type: "resource-select",
                url: "/locations",
                renderOption: renderSetting,
                multiple: true,
            },
            {
                label: "Projects",
                name: "projects",
                type: "resource-select",
                url: "/projects",
                renderOption: renderSetting,
                multiple: true,
            },
            {
                label: "Payment group",
                name: "paymentGroup",
                type: "resource-select",
                url: "/payment-groups",
                renderOption: renderSetting,
            },
            {
                label: "Role",
                name: "role",
                type: "select",
                options: roles,
                renderOption: (r) => r.label,
                valuePropName: "value",
            },
        ];
    }, [user]);

    const initialValues = useMemo(() => {
        return {
            firstName: selected?.firstName || "",
            middleName: selected?.middleName || "",
            lastName: selected?.lastName || "",
            email: selected?.email || "",
            password: "",
            jobs: selected?.jobs?.map((j) => j.id) || [],
            locations: selected?.locations?.map((l) => l.id) || [],
            projects: selected?.projects?.map((l) => l.id) || [],
            paymentGroup: selected?.paymentGroup?.id || null,
            role: selected?.role !== undefined
                ? selected.role
                : null,
        };
    }, [selected]);

    const validationSchema = useMemo(() => {
        const validations = {
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email().required('Required'),
            role: Yup.number().required('Required'),
            jobs: Yup.array(Yup.number()),
            locations: Yup.array(Yup.number()),
            projects: Yup.array(Yup.number()),
            paymentGroup: Yup.number(),
        }
        if (!selected) {
            validations.password = Yup.string().required('Required');
        }
        return Yup.object().shape(validations);
    }, [selected]);

    const title = selected ? "Edit user" : "Add user";
    return (
        <Drawer title={title} visible={visible} close={close}>
            <div className="layout-content">
                <div className="mx-auto max-w-2xl">
                    <DynamicForm
                        config={config}
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                        close={close}
                    />
                </div>
            </div>
        </Drawer>
    );
}

export default UserForm;
