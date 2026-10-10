const API_URL = '/api';

async function handleResponse(response) {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.error || 'Error en la solicitud');
    }

    return data;
}

export async function login(username, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    return handleResponse(response);
}

export async function getCurrentUser(token) {
    const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return handleResponse(response);
}

export async function getDashboard(token) {
    const response = await fetch(`${API_URL}/dashboard`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return handleResponse(response);
}