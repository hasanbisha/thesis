import { Link } from "react-router-dom";
import DynamicForm from "../../../components/DynamicForm";
import Header from "../../../components/Layout/Header";

const config = [
    [
        {
            label: "First name",
            name: "firstName",
        },
        {
            label: "Last name",
            name: "lastName",
        },
    ],
    {
        label: "Email",
        name: "email",
    },
    {
        label: "Password",
        name: "password",
    },
    {
        label: "Jobs",
        name: "jobs",
        type: "resource-select",
        url: "/jobs",
    },
    {
        label: "Locations",
        name: "locations",
        type: "resource-select",
        url: "/locations",
    },
];

function Add() {
    return (
        <div>
            <Header title={(
                <>
                    <Link to="/users/add">
                        {"<-"} Go back
                    </Link>

                    Add user
                </>
            )}>
            </Header>

            <div className="layout-content">
                <div className="mx-auto max-w-2xl">
                    <DynamicForm config={config} />
                </div>
            </div>
        </div>
    );
}

export default Add;
