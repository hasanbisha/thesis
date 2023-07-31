import { Field, Form, Formik } from "formik";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import ResourceSelect from "../../../components/Inputs/ResourceSelect";
import Header from "../../../components/Layout/Header";

function CF({ config }) {
    const getInput = useCallback((item, props) => {
        switch (item.type) {
            case "text":
            case undefined: {
                const { name } = item;
                return (
                    <input
                        type="text"
                        id={name}
                        autoComplete={name}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...props}
                    />
                );
            }
            case "resource-select": {
                const { name, multiple, url } = item;
                return (
                    <ResourceSelect
                        name={name}
                        multiple={multiple || false}
                        url={url}
                        {...props}
                    />
                );
            }
        }
    }, []);

    return (
        <Formik>
            <Form>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {config.map((item) => (
                        <div className="sm:col-span-4">
                            <label
                                htmlFor={item.name}
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {item.label}
                            </label>
                            <div className="mt-2">
                                <Field
                                    key={item.name}
                                    name={item.name}
                                    as={() => getInput(item)}
                                >
                                    {({ field }) => getInput(item, field)}
                                </Field>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </Form>
        </Formik>
    );
}

const config = [
    {
        label: "First name",
        name: "firstName",
    },
    {
        label: "Last name",
        name: "lastName",
    },
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
                    <CF config={config} />
                </div>
            </div>
        </div>
    );
}

export default Add;
