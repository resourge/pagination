import React, { useMemo, useRef } from 'react';

import { pagination, PaginationConfig } from '../../pagination/src/pagination';

export type UsePaginationProps = Pick<PaginationConfig, 
	'page' | 'totalPages' | 'displayRange' | 'disabled'
> & {
	/**
	 * Method for "page" click
	 */
	onPageChange?: PaginationConfig['onPageChange']
	/**
	 * Method to render the "page" for first page
	 * * When undefined the item will not be included
	 */
	renderFirst?: React.ReactNode
	/**
	 * Method to render the "page" for previous page
	 * * When undefined the item will not be included
	 */
	renderPrevious?: React.ReactNode
	/**
	 * Method to render the "page" for next page
	 * * When undefined the item will not be included
	 */
	renderNext?: React.ReactNode
	/**
	 * Method to render the "page" for last page
	 * * When undefined the item will not be included
	 */
	renderLast?: React.ReactNode
}

/**
 * Hook to generate an array of "pages"
 * @param props {@link UsePaginationProps} 
 * @returns an array containing the "pages"
 */
export const usePagination = (
	props: UsePaginationProps
) => {
	const onPageChange = props.onPageChange ?? (() => {})

	const onPageChangeRef = useRef<PaginationConfig['onPageChange']>(onPageChange);

	onPageChangeRef.current = onPageChange;

	return useMemo(() => pagination({
		...props,
		onPageChange: (page: number) => onPageChangeRef.current(page),
		firstLabel: props.renderFirst,
		previousLabel: props.renderPrevious,
		nextLabel: props.renderNext,
		lastLabel: props.renderLast
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}), [props.page, props.totalPages, props.disabled]);
}
