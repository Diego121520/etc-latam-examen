import axios from "axios";

const BASE_URL = 'http://localhost:8090/api/task';

const authToken = localStorage.getItem('authToken');
const csrfToken = localStorage.getItem('csrfToken');
const userId = localStorage.getItem("userId");

const header = {
	'Content-Type': 'application/json',
	'Authorization': authToken,
	'X-CSRF-Token': csrfToken,
}
class TaskClient {
	getAllTask() {
		return axios.get(BASE_URL + `/all/user/${userId}`, {headers: header})
			.then(response => {
				return response;
			})
	}

	createTask(body) {
		return axios.post(BASE_URL, body, {headers: header})
			.then(response => {
				return response;
			}).catch(e => console.log(e));
	}

	deleteTask(id) {
		return axios.delete(BASE_URL + "/" + id, {headers: header})
			.then(response => {
				return response
			})
	}

	updateTask = async (id, body) => {
		return axios.patch(BASE_URL + "/" + id, body, {headers: header})
			.then(r => {
				return r
			})
	}
}

export default new TaskClient();