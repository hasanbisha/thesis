import { Field, Form, Formik } from "formik";
import { Fragment, useCallback } from "react";
import Input from "../Inputs";
import Password from "../Inputs/Password";
import ResourceSelect from "../Inputs/ResourceSelect";
import Select from "../Inputs/Select";

export default function DynamicForm({ config, close, ...props }) {
    const getInput = useCallback((item, props) => {
        switch (item.type) {
            case "password": {
                const { name, inputProps } = item;
                return (
                    <Password
                        id={name}
                        name={name}
                        autoComplete={name}
                        {...props}
                        {...inputProps}
                    />
                );
            }
            case "text":
            case "email":
            case "time":
            default: {
                const { name, inputProps } = item;
                return (
                    <Input
                        id={name}
                        name={name}
                        autoComplete={name}
                        type={item.type}
                        {...props}
                        {...inputProps}
                    />
                );
            }
            case "select": {
                return (
                    <Select
                        {...props}
                        {...item}
                        onChange={(value) => {
                            const event = { target: { name: item.name, value } };
                            props.onChange(event);
                        }}
                    />
                );
            }
            case "resource-select": {
                return (
                    <ResourceSelect
                        {...props}
                        {...item}
                        onChange={(value) => {
                            const event = { target: { name: item.name, value } };
                            props.onChange(event);
                        }}
                    />
                );
            }
        }
    }, []);

    const getField = useCallback((item) => {
        if (Array.isArray(item)) {
            return (
                <div className="flex gap-x-6">
                    {item.map((item, i) => (
                        <Fragment key={i}>
                            {getField(item)}
                        </Fragment>
                    ))}
                </div>
            );
        }
        return (
            <div className="w-full">
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
                        {({ field, meta }) => (
                            <Fragment>
                                {getInput(item, field)}

                                {meta.error && (
                                    <div className="text-sm text-red-600">{meta.error}</div>
                                )}
                            </Fragment>
                        )}
                    </Field>
                </div>
            </div>
        );
    }, [getInput]);

    return (
        <Formik {...props}>
            <Form>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8">
                    {config.map((item, i) => (
                        <Fragment key={i}>
                            {getField(item)}
                        </Fragment>
                    ))}
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={close}>
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

