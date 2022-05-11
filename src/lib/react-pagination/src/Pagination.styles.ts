import { CSSObject } from '@emotion/css'

export type StylesProps = {
	disabled?: boolean
	selected?: boolean
}

export type CustomStyles = {
	/**
	 * @param base - Default styles for ul. {@link CSSObject}
	 */
	ul?: (base: CSSObject) => CSSObject
	/**
	 * @param base - Default styles for ul. {@link CSSObject}
	 * @param props - Props containing if "page" is disabled or selected. {@link StylesProps}
	 */
	li?: (base: CSSObject, props: StylesProps) => CSSObject
	/**
	 * @param base - Default styles for ul. {@link CSSObject}
	 * @param props - Props containing if "page" is disabled or selected. {@link StylesProps}
	 */
	a?: (base: CSSObject, props: StylesProps) => CSSObject
}

const PrimaryColor = '#2E3641';
const DisableColor = '#D0D0D0';

const pageItemLinkSelectedDisabled: CSSObject = {
	backgroundColor: DisableColor,
	color: 'white'
}

const pageItemDisabled = ({ selected }: StylesProps): CSSObject => ({
	cursor: 'not-allowed',
	border: `2px solid ${DisableColor}`,
	color: DisableColor,
	'& > *': {
		cursor: 'not-allowed',
		opacity: 0.5
	},
	...(selected ? pageItemLinkSelectedDisabled : {})
})

export const DefaultUlCss: CSSObject = ({
	listStyle: 'none',
	display: 'flex',
	alignItems: 'center',
	gap: '0.75rem',
	padding: 0
})

export const DefaultACss = (_: StylesProps): CSSObject => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	color: 'inherit',
	width: '1.875rem',
	height: '1.875rem'
})

export const DefaultLiCss = ({ disabled, selected }: StylesProps): CSSObject => ({
	cursor: 'pointer',
	borderRadius: '5px',
	border: `2px solid ${PrimaryColor}`,
	color: PrimaryColor,
	'& > *': {
		color: PrimaryColor
	},
	...(disabled ? pageItemDisabled({ disabled, selected }) : {}),
	'&:hover': {
		backgroundColor: 'rgba(46,54,65, 0.15)',
		color: PrimaryColor
	},
	...(selected ? {
		backgroundColor: PrimaryColor,
		color: 'white',
		'& > *': {
			color: 'white'
		},
		'&:hover': {
			opacity: 0.75
		}
	} : {})
})
