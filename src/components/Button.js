import clsx from "clsx";

function Button({ className, ...props }) {
    return (
        <button
          className={
              clsx(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm bg-indigo-600 hover:bg-indigo-700",
                  className
              )
          }
          {...props}
        />
    );
}

export default Button;
