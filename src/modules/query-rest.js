export default async function queryRest({ url, options = {} }) {
	const responseQuery = await fetch(url, {
		headers: { 'Content-Type': 'application/json' },
		method: 'GET',
		...options,
	})
		.then(async (response) => {
			const responseResult = {
				status: response.status,
				statusText: response.statusText,
				response: {},
			};

			if (response.ok && response.status !== 204) {
				responseResult.response = await response.json();
			}

			return responseResult;
		})
		.catch((error) => {
			return {
				status: 'Error',
				statusText: error?.message || 'URL doesnt return response api',
				...error,
			};
		});

	return responseQuery;
}
