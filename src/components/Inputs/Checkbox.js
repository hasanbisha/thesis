import { useEffect, useRef } from "react";

function Checkbox({ indeterminate, ...props }) {
    const ref = useRef(null);

    useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !props.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            ref={ref}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            {...props}
        />
    );
}

export default Checkbox;
