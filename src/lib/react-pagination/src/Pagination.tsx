/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React from 'react';

import { css } from '@emotion/css';

import { usePagination, UsePaginationProps } from '../../react-hook-pagination/src/usePagination';

import { DefaultUlCss, CustomStyles } from './Pagination.styles';
import PageItem from './components/pageItem/PageItem';

export type PaginationProps = UsePaginationProps & {
	/**
	 * Method to define the "page" `href`
	 */
	getHref?: (page: number) => string
	/**
	 * Method to define the "page" `href`
	 */
	className?: string
	/**
	 * Defines custom styles for the ul, li, a.
	 * * Note: Use @emotion/css to convert styles into a classname
	 */
	customStyles?: CustomStyles
}

export const Pagination: React.FC<PaginationProps> = ({ 
	className,
	page,
	totalPages = 1,
	getHref,
	customStyles,
	...usePaginationProps
}) => {
	const pages = usePagination({
		page,
		totalPages,
		...usePaginationProps
	})

	const ulCss = customStyles && customStyles.ul ? customStyles.ul(DefaultUlCss) : DefaultUlCss

	return (
		<ul className={`${css(ulCss)}${className ? ` ${className}` : ''}`}>
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
