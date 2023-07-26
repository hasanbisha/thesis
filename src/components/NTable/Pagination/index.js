import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	CardFooter,
	Dropdown,
	Pagination as BasePagination,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Row,
	Col,
} from "reactstrap";
import Item from "./Item";
import { usePages } from "./usePages";

const options = [10, 20, 30, 40, 50];
// TODO: check out the fuck these 2 props are and find better names
function Pagination({
	page,
	pageCount,
	gotoPage,
	perPage,
	setPerPage,
	totalItems,
	showOnSizeChange = true,
	isListPagination = false,
}) {
	const { t } = useTranslation();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = useCallback(() => {
		setIsDropdownOpen(!isDropdownOpen);
	}, [isDropdownOpen, setIsDropdownOpen]);

	const onPerPageChange = useCallback(
		(value) => {
			setPerPage(value);
			gotoPage(0);
		},
		[setPerPage, gotoPage],
	);

	const firstElementOfPage = useMemo(() => page * perPage, [page, perPage]);

	const rangeStart = useMemo(() => {
		const range = firstElementOfPage + 1;
		if (range > totalItems && totalItems === 0) {
			return totalItems;
		} else {
			return range;
		}
	}, [firstElementOfPage, totalItems]);

	const rangeEnd = useMemo(() => {
		const rangeIfTotalFurfilled = firstElementOfPage + perPage;
		if (rangeIfTotalFurfilled > totalItems) {
			return totalItems;
		} else {
			return rangeIfTotalFurfilled;
		}
	}, [firstElementOfPage, perPage, totalItems]);

	const pages = usePages({ page, pageCount });

	return (
		pageCount > 0 && (
			<CardFooter className="p-3 border-top">
				<Row className="align-items-center">
					<Col
						className={classNames(
							isListPagination &&
							"d-flex justify-content-center mb-2",
						)}
					>
						<div className="font-weight-500 text-dark text-sm">
							{t("displaying")}{" "}
							<span className="font-weight-bolder">
								{rangeStart}
							</span>
							-
							<span className="font-weight-bolder">
								{rangeEnd}
							</span>{" "}
							{t("of")}{" "}
							<span className="font-weight-bolder">
								{totalItems}
							</span>{" "}
							{t("records")}
						</div>
					</Col>

					<Col
						className={classNames(
							isListPagination && "d-flex justify-content-center",
						)}
					>
						<BasePagination
							className="pagination justify-content-end mb-0"
							listClassName="justify-content-end mb-0"
						>
							<Item
								onClick={() => gotoPage(page - 1)}
								disabled={page < 1}
							>
								<i className="fas fa-angle-left" />
							</Item>

							{pages.map((item) => {
								if (item === null) {
									return (
										<span className="pt-2 text-gray">
											...
										</span>
									);
								}
								return (
									<Item
										key={item}
										active={item === page}
										onClick={() => gotoPage(item)}
									>
										{item + 1}
									</Item>

								);
							})}

							<Item
								onClick={() => gotoPage(page + 1)}
								disabled={page >= pageCount - 1}
							>
								<i className="fas fa-angle-right" />
							</Item>

							{showOnSizeChange && (
								<Dropdown
									isOpen={isDropdownOpen}
									toggle={toggleDropdown}
								>
									<DropdownToggle
										caret
										style={{
											height: "37px",
											padding: "0 9px",
										}}
										className="text-muted bg-secondary border border-gray bg-white shadow-none ml-2"
									>
										{perPage}
									</DropdownToggle>

									<DropdownMenu style={{ minWidth: "57px" }}>
										{options.map((option) => (
											<DropdownItem
												key={option}
												onClick={() => onPerPageChange(option)}
											>
												{option}
											</DropdownItem>
										))}
									</DropdownMenu>
								</Dropdown>
							)}
						</BasePagination>
					</Col>
				</Row>
			</CardFooter>
		)
	);
}

export default Pagination;
