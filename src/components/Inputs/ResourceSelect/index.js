import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import useSWR from "swr";
import Loading from '../../Loaders/Loading';
import clsx from 'clsx';

function ResourceSelect({ value, onChange, renderOption, url, multiple }) {
    const { data, isLoading, error } = useSWR({ url });

    return (
        <Listbox value={value} onChange={onChange} multiple={multiple}>
            {({ open }) => (
                <>
                    <div className="relative mt-2">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 h-9">
                            <span className="flex items-center">
                                <span className="ml-3 block truncate">
                                    {multiple
                                        ? value.map((item) => renderOption(item))
                                        : value && renderOption(value)}
                                </span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {!isLoading && !data?.data.length && (
                                    <Listbox.Label className="text-gray-900 relative cursor-default select-none py-3 pl-3 pr-9">
                                        No options available
                                    </Listbox.Label>
                                )}
                                {isLoading ? (
                                    <Listbox.Label className="flex items-center justify-center py-2">
                                        <Loading />
                                    </Listbox.Label>
                                ) : (
                                    data?.data.map((item) => (
                                        <Listbox.Option
                                            key={item.id}
                                            className={({ active }) =>
                                                clsx(
                                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                                )
                                            }
                                            value={item}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <div className="flex items-center">
                                                        {renderOption(item)}
                                                    </div>

                                                    {selected ? (
                                                        <span
                                                            className={clsx(
                                                                active ? 'text-white' : 'text-indigo-600',
                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                            )}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    )))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}

export default ResourceSelect;
