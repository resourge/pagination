import React from 'react';
import { type ReactNode } from 'react';

import { css, type CSSObject } from '@emotion/css';

import {
	type CustomStyles,
	DefaultACss,
	DefaultLiCss,
	type StylesProps
} from '../../Pagination.styles'

export type StylesConfigFunction<Props> = (
	base: CSSObject,
	props: Props
) => CSSObject;

type Props = {
	children?: ReactNode
	customStyles?: Omit<CustomStyles, 'ul'>
	href?: string
	onClick?: () => void
} & StylesProps

const PageItem: React.FC<Props> = ({
	href, children, onClick, 
	disabled, selected, customStyles
}) => {
	const cssProps = {
		disabled,
		selected
	}

	const defaultLiCss = DefaultLiCss(cssProps);
	const defaultACss = DefaultACss(cssProps);
	const liCss = customStyles && customStyles.li ? customStyles.li(defaultLiCss, cssProps) : defaultLiCss
	const aCss = customStyles && customStyles.a ? customStyles.a(defaultACss, cssProps) : defaultACss

	return (
		<li
			aria-label={typeof children === 'number' ? `Page ${children}` : undefined}
			className={css(liCss)}
			role={'navigation'}
		>
			<a 
				className={css(aCss)}
				href={href} 
				rel="noreferrer" 
				target="_blank" 
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
			>
				{ children }
			</a>
		</li>
	)
};

export default PageItem;
