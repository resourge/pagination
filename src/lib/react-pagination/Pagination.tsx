/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React from 'react';

import { usePagination, UsePaginationProps } from '../react-hook-form/usePagination';

import PageItem from './components/pageItem/PageItem';

import './Pagination.css';

export type PaginationProps = Omit<UsePaginationProps, 'page'> & {
	page: number
	getHref?: (page: number) => string
	className?: string
}

const Pagination: React.VFC<PaginationProps> = ({ 
	className,
	page,
	totalPages = 1,
	displayRange = 5, 
	getHref,
	...usePaginationProps
}) => {
	const pages = usePagination({
		page,
		displayRange,
		totalPages,
		...usePaginationProps
	})

	return (
		<ul className={`pagination${className ? ` ${className}` : ''}`}>
			{
				pages
				.map(({ label, page, disabled, selected, onClick }, index) => (
					<PageItem 
						key={`pagination_page_item_${index}`}
						disabled={disabled}
						selected={selected}
						onClick={onClick}
						href={getHref && getHref(page)}
					>
						{ label }
					</PageItem>
				))
			}
		</ul>
	);
};

export default Pagination;
