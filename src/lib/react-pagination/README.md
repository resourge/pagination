# [React-pagination](./src/lib/react-pagination/README.md)

`react-pagination` is a small, highly customizable, component to render the pagination. 

## Installatio   

Install using [Yarn](https://yarnpkg.com):

```sh
yarn add @resourge/react-pagination
```

or NPM:

```sh
npm install @resourge/react-pagination --save
```

## Usage

```Typescript
import { Pagination } from '@resourge/react-pagination';

function App() {
  const [page, setPage] = useState(0);
  return (
    <Pagination 
      /**
       * Current page
       */
      page={page}
      /**
       * Total page number
       */
      totalPages={10}
      /**
       * Number of "pages" displaying.
       * * Note: Current page will try to stay in the middle
       */
      displayRange={5}
      /**
       * If pagination is disabled
       */
      disabled={false}
      /**
       * Method for "page" click
       */
      onPageChange={setPage}
      /**
       * Method to render the "page" for first page
       * * When undefined the item will not be included
       */
      renderFirst={() => 'Icon for first Page'}
      /**
       * Method to render the "page" for previous page
       * * When undefined the item will not be included
       */
      renderPrevious={() => 'Icon for previous Page'}
      /**
       * Method to render the "page" for next page
       * * When undefined the item will not be included
       */
      renderNext={() => 'Icon for next Page'}
      /**
       * Method to render the "page" for last page
       * * When undefined the item will not be included
       */
      renderLast={() => 'Icon for last Page'}
    />
  )
}
```

## Others

javascript: [Pagination](../pagination/README.md)

react-hook: [React-hook-pagination](../react-hook-pagination/README.md)

## License

MIT Licensed.