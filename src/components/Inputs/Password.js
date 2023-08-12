import Input from ".";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useVisible } from "../../utils/hooks/useVisible";

export default function PasswordInput({ className, ...props }) {
    const { visible, toggle } = useVisible();

    return (
        <div className="flex">
            <Input
                type={visible ? "text" : "password"}
                className="rounded-tr-none rounded-br-none"
                {...props}
            />

            <button
                type="button"
                className="h-full flex items-center px-3 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 rounded-tr-md rounded-br-md"
                onClick={toggle}
            >
                {visible ? (
                    <EyeSlashIcon height={14} />
                ) : (
                    <EyeIcon height={14} />
                )}
            </button>
        </div>
    );
}
