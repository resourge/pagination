import React, { useMemo } from 'react';

import { pagination, PaginationConfig } from '../pagination/pagination';

export type UsePaginationProps = Pick<PaginationConfig, 
	'page' | 'totalPages' | 'displayRange' | 'disabled'
	> & {
	onPageChange?: PaginationConfig['onPageChange']
	renderFirst?: React.ReactNode
	renderPrevious?: React.ReactNode
	renderNext?: React.ReactNode
	renderLast?: React.ReactNode
}

export const usePagination = (
	props: UsePaginationProps
) => {
	const onPageChange = props.onPageChange ?? (() => {})

	return useMemo(() => pagination({
		...props,
		onPageChange,
		firstLabel: props.renderFirst,
		previousLabel: props.renderPrevious,
		nextLabel: props.renderNext,
		lastLabel: props.renderLast
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}), [props.page, props.totalPages, props.disabled]);
}
