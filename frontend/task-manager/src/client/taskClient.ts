const BASE_URL = 'http://localhost:8090/api/task';

export const getAllTaskByUserId = async (userId) => {
		const response = await fetch(BASE_URL + `/all/user/${userId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});
		if(response.ok) {
			return await response.json();
		}
		return  null;
};

export const createTask = async (body) => {

	// try {
		const response = await fetch(BASE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: body,
		});

		if(response.ok) {
			return await response.json();
		} else {
			return null;
		}
};

export const updateTask = async (id, body) => {
	const response = await fetch(BASE_URL + `${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		} ,
		body : body
	});
	if(response.ok) {
		return await response.json();
	}
	return  null;
};