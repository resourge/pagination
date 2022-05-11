import { useState } from 'react'

import { Pagination } from './lib/react-pagination/src/Pagination'

function App() {
	const [page, setPage] = useState(0);
	return (
		<div>
			<Pagination 
				page={page}
				totalPages={10}
				onPageChange={setPage}
			/>
		</div>
	)
}

export default App
