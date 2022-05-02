import React from 'react';

type Props = {
	children?: React.ReactNode
	disabled?: boolean
	onClick?: () => void
	href?: string
	selected?: boolean
}

export const pageSelectedClassName = 'page-selected'

const PageItem: React.FC<Props> = ({ href, children, onClick, disabled, selected }: Props) => (
	<li
		className={`${selected ? pageSelectedClassName : ''}`}
		role={'navigation'} 
		// selected={selected} 
		// @ts-expect-error
		select={selected?.toString()} 
		disabled={disabled} 
		aria-label={typeof children === 'number' ? `Page ${children}` : undefined}
	>
		<a 
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
		>{ children }</a>
	</li>
);

export default PageItem;
