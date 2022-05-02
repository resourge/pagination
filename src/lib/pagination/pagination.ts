
const getMinMaxPage = (
	page: number, 
	displayRange: number, 
	totalPage: number
) => {
	const diff = Math.floor(displayRange / 2);
	let minPage = page - diff;
	let maxPage = page + diff;
	
	if ( minPage < 0 ) {
		minPage = 0;
		maxPage = totalPage > displayRange ? displayRange - 1 : totalPage;
	}
	if ( maxPage >= totalPage ) {
		maxPage = totalPage - 1;
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
	label: any
	type: 'page' | 'nextPage' | 'previousPage' | 'firstPage' | 'lastPage'
	page: number
	disabled?: boolean
	selected?: boolean
	onClick: () => void
}

export type PaginationConfig = {
	page: number
	totalPages: number
	displayRange: number
	disabled?: boolean

	onPageChange: (page: number) => void
	firstLabel?: any | (() => any)
	previousLabel?: any | (() => any)

	nextLabel?: any | (() => any)
	lastLabel?: any | (() => any)
}

export const pagination = ({
	page,
	totalPages,
	displayRange,
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

	const pages: Page[] = firstLabel ? [
		{
			label: typeof firstLabel === 'function' ? firstLabel() : firstLabel,
			type: 'firstPage',
			page: 0,
			disabled: disabled || page <= 0,
			onClick: () => {
				onPageChange(0);
			}
		}
	] : [];
	if ( previousLabel ) {
		const previousPage = page - 1;

		pages.push({
			label: typeof previousLabel === 'function' ? previousLabel() : previousLabel,
			type: 'previousPage',
			page: previousPage,
			disabled: disabled || (previousPage < 0),
			onClick: () => {
				onPageChange(previousPage);
			}
		})
	}

	for (let i = minPage; i <= maxPage; i++) {
		pages.push({
			label: i + 1,
			page: i,
			type: 'page',
			disabled: disabled,
			selected: page === i,
			onClick: () => {
				onPageChange(i);
			}
		});
	}

	if ( nextLabel ) {
		const nextPage = page + 1;
		pages.push({
			label: typeof nextLabel === 'function' ? nextLabel() : nextLabel,
			page: nextPage,
			type: 'nextPage',
			disabled: disabled || nextPage === totalPages,
			onClick: () => {
				onPageChange(nextPage);
			}
		})
	}

	if ( lastLabel ) {
		const lastPage = totalPages - 1;
		pages.push({
			label: typeof lastLabel === 'function' ? lastLabel() : lastLabel,
			page: lastPage,
			type: 'lastPage',
			disabled: disabled || page === lastPage,
			onClick: () => {
				onPageChange(lastPage);
			}
		})
	}

	/* 
	if ( pages[0] !== '1' ) {
		if ( pages[0] !== '2' ) {
			pages.unshift('....');
		}
		pages.unshift('1');
	} 

	if ( pages[pages.length - 1] !== totalPage.toString() ) {
		if ( pages[pages.length - 1] !== (totalPage - 1).toString() ) {
			pages.push('....');
		} 
		pages.push(totalPage.toString());
	} 
	*/

	return pages;
}
