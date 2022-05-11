# [React-hook-pagination](./src/lib/react-hook-pagination/README.md)

`react-hook-pagination` is a small hook that returns an array containing "pages" for the pagination creation. 

## Installation

Install using [Yarn](https://yarnpkg.com):

```sh
yarn add @resourge/react-hook-pagination
```

or NPM:

```sh
npm install @resourge/react-hook-pagination --save
```

## Usage

```Typescript
import { usePagination } from '@resourge/react-hook-pagination';

const Pagination = ({
  getHref
}: {
  getHref?: (page: number) => string
}) => {
  const pages = usePagination({
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
     * Method to render the "page" for first page
     * * When undefined the item will not be included
     */
    renderFirst: () => 'First Page',
    /**
     * Method to render the "page" for previous page
     * * When undefined the item will not be included
     */
    renderPrevious: () => 'Previous Page',
    /**
     * Method to render the "page" for next page
     * * When undefined the item will not be included
     */
    renderNext: () => 'Next Page',
    /**
     * Method to render the "page" for last page
     * * When undefined the item will not be included
     */
    renderLast: () => 'Last Page'
  })
  return (
    <ul>
      {
        pages
        .map(({ label, page, disabled, selected, onClick }, index) => (
          <li 
            key={`pagination_page_item_${index}`}
            // styles for disabled 
            // styles for selected 
          >
            <a href={getHref && getHref(page)} onClick={onClick}>
              { label }
            </a>
          </li>
        ))
      }
    </ul>
  );
};
```

## Others

javascript: [Pagination](../pagination/README.md)

react component: [React-pagination](../lib/react-pagination/README.md)

## License

MIT Licensed.