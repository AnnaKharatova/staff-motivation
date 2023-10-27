// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = 'http://31.129.110.130';

// const token = 'c0faa7cbff18fbd7a5c2bdb12ee732506405147d';

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
};

// Header
export function getUserData() {
	const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/api/curent_user_info/`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	}).then(checkResponse);
}

export function getNotification() {
	const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/api/user/my_notifications/`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// Authorization: `Token cccee5de88c1aae699e77440edfc7e93373ab3d4`,
			Authorization: `Token ${token}`,
		},
	}).then(checkResponse);
}

/* Главная страница */

export function getUsersProgress() {
	const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/api/progress/users/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
			// Authorization: `Token c0faa7cbff18fbd7a5c2bdb12ee732506405147d`,
		},
	}).then(checkResponse);
}

/* блок Тимлида */

export function getUsers() {
	const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/api/users/`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	}).then(checkResponse);
}

export function getTasks() {
	const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/api/tasks/`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	}).then(checkResponse);
}

export function getTaskInfo(id) {
	const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/api/tasks/${id}/`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	}).then(checkResponse);
}

export function confirmTask(id, data) {
	const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/api/tasks/${id}/send_for_review/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
			// Authorization: `Token cccee5de88c1aae699e77440edfc7e93373ab3d4`,
		},
		body: JSON.stringify({ data }),
	}).then(checkResponse);
}

export function reviewTask(id) {
	const token = localStorage.getItem('token');
	const data = {
		review_status: 'approved',
	};
	return fetch(`${BASE_URL}/api/tasks/${id}/review_task/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify(data),
	}).then(checkResponse);
}

export function rejectTask(id, data) {
	const newData = {
		status: 'returned_for_revision',
		assigned_to: data.assigned_to,
		created_at: data.created_at,
		deadline: data.deadline,
		department: data.department,
		description: data.description,
		id: data.id,
		is_overdue: data.is_overdue,
		reward_points: data.reward_points,
		title: data.title,
	};
	const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/api/tasks/${id}/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
			// Authorization: `Token cccee5de88c1aae699e77440edfc7e93373ab3d4`,
		},
		body: JSON.stringify(newData),
	}).then(checkResponse);
}

export function addTask(data) {
	const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/api/tasks/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
			// Authorization: `Token c0faa7cbff18fbd7a5c2bdb12ee732506405147d`,
		},
		body: JSON.stringify(data),
	}).then(checkResponse);
}

export function editTask(id, data) {
	const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/api/tasks/${id}`, {
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
			// Authorization: `Token cccee5de88c1aae699e77440edfc7e93373ab3d4`,
		},
		body: JSON.stringify(data),
	}).then(checkResponse);
}

/*  Profile */

// Личные данные
export function getUsersInfo() {
	const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/api/users/me/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	}).then(checkResponse);
}

export function setUsersInfo(data) {
	const token = localStorage.getItem('token');
	const currentData = [
		{
			contact_type: 'phone',
			link: data.phone,
		},
		{
			contact_type: 'linkedin',
			link: data.linkedin,
		},
		{
			contact_type: 'telegram',
			link: data.telegram,
		},
		{
			contact_type: 'phone',
			link: '88125921628',
		},
	];
	return fetch(`${BASE_URL}/api/users/me/`, {
		method: 'PUTCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify({ currentData }),
	}).then(checkResponse);
}

// регистрация
export function signup(data) {
	const newData = {
		first_name: data.firstName,
		last_name: data.lastName,
		password: data.password,
		email: data.email,
		password_confirmation: data.confirmPassword,
	};
	return fetch(`${BASE_URL}/api/users/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newData),
	}).then(checkResponse);
}

export function activateRegister(uid, token) {
	return fetch(`${BASE_URL}/api/users/activation/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ uid, token }),
	});
}

// вход/авторизация
export function login(email, password) {
	return fetch(`${BASE_URL}/api/token/login/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	}).then(checkResponse);
}

export function logout() {
	const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/api/token/logout/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	}).then(checkResponse);
}

// запрос на смену пароля
export function changePassword(email) {
	return fetch(`${BASE_URL}/api/users/reset_password/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
	}).then(checkResponse);
}

// новый пароль
export function setPassword(uid, token, data) {
	const currentData = {
		uid,
		token,
		new_password: data,
	};
	return fetch(`${BASE_URL}/api/users/reset_password_confirm/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(currentData),
	}).then(checkResponse);
}
