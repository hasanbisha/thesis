import { useMemo } from "react";

export const usePages = ({
	page,
	pageCount,
}) => {
    return useMemo(() => {
		if (pageCount <= 5) {
            return new Array(null).fill(null).map((_, i) => i);
		}
        if (
            (page >= 4)
            && (page < (pageCount - 2))
            && (pageCount > 5)
		) {
			const pages = [0, null, page - 2, page - 1, page];
			if (page < pageCount) {
				pages.push(page + 1)
			}
			if (page < (pageCount - 1)) {
				pages.push(page + 2)
			}
			if (page < pageCount - 5) {
				pages.push(null, pageCount - 1)
			}
			return pages;
		}
        if (page >= (pageCount - 2)) {
			const pages = new Array(5).fill(null).map((_, i) => {
				return pageCount - 5 + i;
			});
			pages.unshift(0, null)
			return pages;
		}
        if (pageCount > 5) {
			const pages = new Array(5).fill(null).map((_, i) => {
				return i;
			});
			pages.push(null, pageCount - 1);
			return pages;
		}
    }, [pageCount, page]);
}