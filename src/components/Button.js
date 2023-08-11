import clsx from "clsx";
import { useMemo } from "react";

function Button({ className, color = "primary", mode = "primary", ...props }) {
    const baseClassName = "inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent px-3 py-1.5 text-base text-sm font-medium shadow-sm disabled:cursor-not-allowed";
    const colorClassName = useMemo(() => {
        switch (color) {
            default:
            case "primary": {
                switch (mode) {
                    default:
                    case "primary":
                        return "bg-indigo-600 hover:bg-indigo-700 text-white";
                    case "secondary":
                        return "bg-indigo-100 hover:bg-indigo-200 text-indigo-600";
                    case "link":
                        return "bg-transparent text-indigo-600 shadow-none";
                }
            }
            case "danger": {
                switch (mode) {
                    default:
                    case "primary":
                        return "bg-red-600 hover:bg-red-700 text-white";
                    case "secondary":
                        return "bg-red-100 hover:bg-red-200 text-red-600";
                    case "link":
                        return "bg-transparent text-red-600 shadow-none";
                }
            }
            case "plain": {
                switch (mode) {
                    default:
                    case "primary":
                        return "bg-gray-800 hover:bg-gray-900 text-white";
                    case "secondary":
                        return "bg-gray-200 hover:bg-gray-300 text-gray-900";
                    case "link":
                        return "bg-transparent text-gray-900 shadow-none";
                }
            }
        }
    }, [color, mode]);

    const _className = clsx(
        baseClassName,
        colorClassName,
        className,
    );

    return (
        <button className={_className} {...props} />
    );
}

export default Button;
