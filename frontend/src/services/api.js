const API_BASE = 'http://localhost:5001/api';

async function fetchJSON(url, role = 'analyst', options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        'x-user-role': role,
        ...(options.headers || {})
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
        ...options,
        headers
    });
    if (!res.ok) {
        let errData;
        try { errData = await res.json(); } catch { /* ignore parsing errors */ }
        throw { response: { data: errData, status: res.status } };
    }
    return res.json();
}

export async function getTransactions(role = 'analyst', limit = 50) {
    return fetchJSON(`${API_BASE}/transactions?limit=${limit}`, role);
}

export async function getAlerts(role = 'analyst') {
    return fetchJSON(`${API_BASE}/alerts`, role);
}

export async function getAnalytics(role = 'analyst') {
    return fetchJSON(`${API_BASE}/analytics`, role);
}

export async function getPrivacyInfo(role = 'analyst') {
    return fetchJSON(`${API_BASE}/privacy`, role);
}

export async function getSettings(role = 'analyst') {
    return fetchJSON(`${API_BASE}/settings`, role);
}

/* ── Auth helpers ── */
export async function login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
        let errData;
        try { errData = await res.json(); } catch { /* ignore parsing errors */ }
        throw { response: { data: errData || { error: 'Login failed' } } };
    }
    return { data: await res.json() };
}

export async function signup(name, email, password) {
    const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) {
        let errData;
        try { errData = await res.json(); } catch { /* ignore parsing errors */ }
        throw { response: { data: errData || { error: 'Signup failed' } } };
    }
    return { data: await res.json() };
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('fp-user');
}

export function getStoredUser() {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;
        const payload = token.split('.')[1];
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(atob(base64));
        return decoded.user;
    } catch { return null; }
}

