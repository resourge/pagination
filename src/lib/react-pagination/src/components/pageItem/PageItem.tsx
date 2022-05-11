import React from 'react';

import { css, CSSObject } from '@emotion/css';

import { CustomStyles, DefaultACss, DefaultLiCss, StylesProps } from '../../Pagination.styles';

export type StylesConfigFunction<Props> = (
	base: CSSObject,
	props: Props
) => CSSObject;

type Props = {
	children?: React.ReactNode
	onClick?: () => void
	href?: string
	customStyles?: Omit<CustomStyles, 'ul'>
} & StylesProps

const PageItem: React.FC<Props> = ({
	href, children, onClick, 
	disabled, selected, customStyles
}) => {
	const cssProps = {
		disabled, selected
	}

	const defaultLiCss = DefaultLiCss(cssProps);
	const defaultACss = DefaultACss(cssProps);
	const liCss = customStyles && customStyles.li ? customStyles.li(defaultLiCss, cssProps) : defaultLiCss
	const aCss = customStyles && customStyles.a ? customStyles.a(defaultACss, cssProps) : defaultACss

	return (
		<li
			className={css(liCss)}
			role={'navigation'}
			aria-label={typeof children === 'number' ? `Page ${children}` : undefined}
		>
			<a 
				className={css(aCss)}
				href={href} 
				rel="noreferrer" 
				onClick={(event) => {
					if ( event.ctrlKey || event.metaKey ) {
						return;
					}
					event.preventDefault();
					event.stopPropagation();
	
					if ( !disabled ) {
						onClick && onClick();
					}
				}} 
				target="_blank"
			>
				{ children }
			</a>
		</li>
	)
};

export default PageItem;
