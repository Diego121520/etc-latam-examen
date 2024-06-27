import axios from "axios";

const BASE_URL = "http://localhost:8092/api/auth";

class AuthClient {
	login(data) {
		return axios.post(BASE_URL + "/login", data)
			.then(response => {
				if(response) {
					const authToken = response.headers['authorization'];
					const csrfToken = response.headers['x-csrf-token'];
					const userId = response.headers['user-id'];

					if(authToken != null) {
						localStorage.setItem('authToken', authToken);
					}
					if(csrfToken != null) {
						localStorage.setItem('csrfToken', csrfToken);
					}
					if(userId != null) {
						localStorage.setItem('userId', userId);
					}
				}

				return response;
			})
	}
}

export default new AuthClient();

// export const login = async (data) => {
// 	const response = await fetch(BASE_URL + "/login", {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		credentials: "include",
// 		body: JSON.stringify(data),
// 	});
//
// 	if(response.ok) {
// 		const headers = response.headers;
// 		const responseData = await response.json();
// 		return { headers, data: responseData };
// 	}
// 	return  null;
// };
