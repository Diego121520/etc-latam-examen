import axios from "axios";

const BASE_URL = "http://localhost:8091/api/user";

const authToken = localStorage.getItem('authToken');
const csrfToken = localStorage.getItem('csrfToken');
const userId = localStorage.getItem("userId");

const header = {
	'Content-Type': 'application/json',
	'Authorization': authToken,
	'X-CSRF-Token': csrfToken,
}

class UserClient {

	createUser(body) {
		return axios.post(BASE_URL, body)
			.then(response => { return response})
	}

	checkIfUserExists (username) {
		return axios.get(BASE_URL + "/exist/username/" + username, {headers:header})
			.then(response => {return response});
	}
}

export default new UserClient();