import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";

function Link({ className, ...props }) {
    return (
        <RouterLink
            className={clsx("text-base font-medium text-gray-500 hover:text-gray-900", className)}
            {...props}
        />
    );
}

export default Link;
