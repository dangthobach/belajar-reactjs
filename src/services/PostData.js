export function PostData(type, userData) {
	//api URL
	let BaseURL = 'http://localhost/api-belajar-reactjs/index.php';
	return new Promise((resolve, reject) => {
		fetch(BaseURL + '?tp=' + type,
			{
				method: 'POST',
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(userData)
			})
			.then((response) => response.json()
				.then((res) => {
					resolve(res);
				}))
			.catch((error) => {
				reject(error);
			});
	});
}