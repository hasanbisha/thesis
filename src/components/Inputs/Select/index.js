import { Fragment, useMemo } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Loading from '../../Loaders/Loading';
import clsx from 'clsx';
import { isNil } from 'lodash';

export default function Select({ value, onChange, renderOption, options, valuePropName = "id", loading, multiple }) {
    const map = useMemo(() => {
        if (!options) {
            return {};
        }
        return options?.reduce((total, item) => {
            total[item[valuePropName]] = item;
            return total;
        }, {});
    }, [options, valuePropName]);

    const fullValue = useMemo(() => {
        if (multiple) {
            if (isNil(value)) {
                return [];
            }
            return value.map((item) => map[item]);
        } else {
            if (isNil(value)) {
                return null;
            }
            return map[value];
        }
    }, [value, multiple, map]);

    return (
        <Listbox value={value} onChange={onChange} multiple={multiple}>
            {({ open }) => (
                <>
                    <div className="relative">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 h-9">
                            <span className="flex items-center">
                                <span className="block truncate">
                                    {loading
                                        ? "Loading..."
                                        : multiple
                                            ? fullValue?.map((item) => renderOption(item)).join(", ")
                                            : fullValue && renderOption(fullValue)}
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
                                {!loading && !options?.length && (
                                    <Listbox.Label className="text-gray-900 relative cursor-default select-none py-3 pl-3 pr-9">
                                        No options available
                                    </Listbox.Label>
                                )}
                                {loading ? (
                                    <Listbox.Label className="flex items-center justify-center py-2">
                                        <Loading />
                                    </Listbox.Label>
                                ) : (
                                    options?.map((item, i) => (
                                        <Listbox.Option
                                            key={item.id || i}
                                            className={({ active }) =>
                                                clsx(
                                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                                )
                                            }
                                            value={item[valuePropName]}
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
