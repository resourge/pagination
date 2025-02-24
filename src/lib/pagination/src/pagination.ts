
const getMinMaxPage = (
	page: number, 
	displayRange: number, 
	totalPage: number
) => {
	const diff = Math.floor(displayRange / 2);
	let minPage = Math.max(0, page - diff);
	let maxPage = Math.min(totalPage - 1, page + diff);
	
	if ( minPage < 0 ) {
		maxPage = totalPage > displayRange ? displayRange - 1 : totalPage;
	}
	if ( maxPage >= totalPage ) {
		minPage = totalPage - displayRange;
		if ( maxPage < displayRange ) {
			minPage = 0;
		}
	}

	return {
		minPage,
		maxPage
	}
}

type Page = {
	/**
	 * "Page" label
	 */
	label: any
	/**
	 * Method to change page.
	 */
	onClick: () => void
	/**
	 * Page number
	 */
	page: number
	/**
	 * Type of "page".
	 */
	type: 'page' | 'nextPage' | 'previousPage' | 'firstPage' | 'lastPage'
	/**
	 * If "page" is disabled
	 */
	disabled?: boolean
	/**
	 * If "page" is equal to currentPage
	 */
	selected?: boolean
}

export type PaginationConfig = {
	/**
	 * Method for "page" click
	 */
	onPageChange: (page: number) => void
	/**
	 * Current page
	 */
	page: number
	/**
	 * Total page number
	 */
	totalPages: number
	/**
	 * If pagination is disabled
	 */
	disabled?: boolean
	/**
	 * Number of "pages" displaying.
	 * * Note: Current page will try to stay in the middle
	 */
	displayRange?: number
	/**
	 * Defines the "page" for first page
	 * * When undefined the item will not be included
	 */
	firstLabel?: any | (() => any)
	/**
	 * Defines the "page" for last page
	 * * When undefined the item will not be included
	 */
	lastLabel?: any | (() => any)
	/**
	 * Defines the "page" for next page
	 * * When undefined the item will not be included
	 */
	nextLabel?: any | (() => any)
	/**
	 * Defines the "page" for previous page
	 * * When undefined the item will not be included
	 */
	previousLabel?: any | (() => any)
}

/**
 * Method to generate an array of "pages"
 * @param config {@link PaginationConfig} 
 * @returns an array containing the "pages"
 */
export const pagination = ({
	page,
	totalPages,
	displayRange = 5,
	disabled = false,

	onPageChange,
	firstLabel,
	previousLabel, 
	nextLabel,
	lastLabel
}: PaginationConfig): Page[] => {
	const {
		minPage,
		maxPage
	} = getMinMaxPage(page <= totalPages ? page : 0, displayRange, totalPages);

	const createPage = (label: any, type: Page['type'], page: number): Page | null =>
		label ? {
			label: typeof label === 'function' ? label() : label,
			type,
			page,
			disabled: disabled || page < 0 || page >= totalPages,
			onClick: () => {
				onPageChange(page); 
			} 
		} : null;

	return [
		createPage(firstLabel, 'firstPage', 0),
		createPage(previousLabel, 'previousPage', page - 1),
		...Array.from({
			length: maxPage - minPage + 1 
		}, (_, i) => {
			const p = minPage + i;
			return {
				label: p + 1,
				page: p,
				type: 'page',
				disabled,
				selected: page === p,
				onClick: () => {
					onPageChange(p); 
				} 
			};
		}),
		createPage(nextLabel, 'nextPage', page + 1),
		createPage(lastLabel, 'lastPage', totalPages - 1)
	].filter(Boolean) as Page[];
}
