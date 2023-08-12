import Input from "../../components/Inputs";
import Button from "../../components/Button";
import PasswordInput from "../../components/Inputs/Password";
import useSWRMutation from "swr/mutation";
import { useCallback } from "react";
import { useNonAuthApi } from "../../utils/api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup"
import { toast } from "react-toastify";
import { useAuthentication } from "../Authentication";
import { Navigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
	email: Yup.string().required('Required').email(),
	password: Yup.string().required('Required'),
});

export default function LogIn() {
    const { nonAuthPost } = useNonAuthApi();
    const { token, login } = useAuthentication();

    const { trigger, isMutating } = useSWRMutation(
        "/auth/login",
        useCallback(async (url, { arg }) => {
            try {
                const { token, user } = await nonAuthPost(url, { data: arg });
                localStorage.setItem("token", token);
                login(user, token);
            } catch (err) {
                toast.error(err);
                throw err;
            }
        }, [nonAuthPost, login]),
    );

    console.log(token);
    if (token) {
        return <Navigate to="/" />
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center items-center px-8 py-12">
            <div className="mx-auto w-full max-w-sm">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in
                </h2>
            </div>

            <div className="mt-10 mx-auto w-full max-w-sm">
                <Formik
                    initialValues={{
                        email: "admin@admin.com",
                        password: "password",
                    }}
                    onSubmit={trigger}
                    validationSchema={validationSchema}
                >
                    <Form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <Field name="email" type="email" as={Input} />
                                <ErrorMessage name="email">
                                    {(err) => err && (
                                        <div className="text-sm text-red-600">
                                            {err}
                                        </div>
                                    )}
                                </ErrorMessage>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                {/*
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                                */}
                            </div>

                            <div className="mt-2">
                                <Field name="password" as={PasswordInput} />

                                <ErrorMessage name="password">
                                    {(err) => err && (
                                        <div className="text-sm text-red-600">
                                            {err}
                                        </div>
                                    )}
                                </ErrorMessage>
                            </div>
                        </div>

                        <div>
                            <Button type="submit" className="w-full" disabled={isMutating}>
                                Sign in
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
