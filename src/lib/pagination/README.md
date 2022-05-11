# [Pagination](./src/lib/pagination/README.md)

`Pagination` is a small function that returns an array containing information for the pagination creation. 

## Installation

Install using [Yarn](https://yarnpkg.com):

```sh
yarn add @resourge/pagination
```

or NPM:

```sh
npm install @resourge/pagination --save
```

## Usage

```Typescript
import { pagination } from '@resourge/pagination';

pagination({
	/**
	 * Current page
	 */
	page: 0,
	/**
	 * Total page number
	 */
	totalPages: 10,
	/**
	 * Number of "pages" displaying.
	 * * Note: Current page will try to stay in the middle
	 */
	displayRange: 5,
	/**
	 * If pagination is disabled
	 */
	disabled: false,
	/**
	 * Method for "page" click
	 */
	onPageChange: (page: number) => {},
	/**
	 * Defines the "page" for first page
	 * * When undefined the item will not be included
	 */
	firstLabel: () => 'First Page',
	/**
	 * Defines the "page" for previous page
	 * * When undefined the item will not be included
	 */
	previousLabel: () => 'Previous Page',
	/**
	 * Defines the "page" for next page
	 * * When undefined the item will not be included
	 */
	nextLabel: () => 'Next Page',
	/**
	 * Defines the "page" for last page
	 * * When undefined the item will not be included
	 */
	lastLabel: () => 'Last Page'
})
```

## Others

react-hook: [React-hook-pagination](../react-hook-pagination/README.md)

react component: [React-pagination](../lib/react-pagination/README.md)

## License

MIT Licensed.