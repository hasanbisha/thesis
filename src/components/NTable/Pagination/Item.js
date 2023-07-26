import classNames from "classnames";
import { PaginationItem, PaginationLink } from "reactstrap";

function Item({ active, children, onClick, disabled }) {
    return (
        <PaginationItem className={classNames(active && "active")} disabled={disabled}>
            <PaginationLink onClick={onClick}>
                {children}
            </PaginationLink>
        </PaginationItem>
    );
}

export default Item;
