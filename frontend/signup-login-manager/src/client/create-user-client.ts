const BASE_URL = "http://localhost:8091/api/user";

export const createUser = async (data) => {
		const response = await fetch(BASE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	if(response.ok) {
		return await response.json();
	}
	return  null;
};