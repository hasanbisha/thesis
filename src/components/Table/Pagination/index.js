import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx';

function Page({ isActive, ...props }) {
  const className = clsx(
    "relative items-center px-4 py-2 text-sm font-semibold focus:z-20 inline-flex",
    isActive
      ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
  );
  return (
    <button className={className} {...props} />
  );
}

export default function Pagination({ table }) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white py-3 px-6">
      <div className="flex flex-1 items-center justify-end">
        <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          {table.getPageOptions().map((page) => (
            <Page
              key={page}
              isActive={table.getState().pagination.pageIndex === page}
              onClick={() => table.setPageIndex(page)}
            >
              {page + 1}
            </Page>
          ))}

          <button
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  )
}
