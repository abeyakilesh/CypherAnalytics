const API_BASE = 'http://localhost:5001/api';

async function fetchJSON(url, role = 'analyst') {
    const res = await fetch(url, {
        headers: { 'x-user-role': role }
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
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

/* ── Auth helpers (client-side demo) ── */
export async function login(email, password) {
    // Demo: accept any credentials, store in localStorage
    if (!email || !password) throw { response: { data: { error: 'Email and password required' } } };
    const token = btoa(JSON.stringify({ email, ts: Date.now() }));
    return { data: { token, user: { email, name: email.split('@')[0] } } };
}

export async function signup(name, email, password) {
    if (!name || !email || !password) throw { response: { data: { error: 'All fields required' } } };
    return { data: { message: 'Account created' } };
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('fp-user');
}

export function getStoredUser() {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;
        return JSON.parse(atob(token));
    } catch { return null; }
}

