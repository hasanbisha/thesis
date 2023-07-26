import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const useExpandColumn = (hooks) => {
    hooks.visibleColumns.push((columns) => [
        {
            id: 'expander',
            Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                <span {...getToggleAllRowsExpandedProps()}>
                    <FontAwesomeIcon icon={isAllRowsExpanded ? faChevronUp : faChevronDown} />
                </span>
            ),
            Cell: ({ row }) => (
                <span {...row.getToggleRowExpandedProps()}>
                    <FontAwesomeIcon icon={row.isExpanded ? faChevronUp : faChevronDown} />
                </span>
            ),
        },
        ...columns,
    ]);
};
