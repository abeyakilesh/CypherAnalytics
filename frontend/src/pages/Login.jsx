import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, Sun, Moon } from 'lucide-react';
import { login } from '../services/api';

export default function Login() {
    const navigate = useNavigate();
    const { theme, toggle } = useTheme();
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await login(form.email, form.password);
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally { setLoading(false); }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', transition: 'background 0.3s' }}>
            {/* Left – Brand */}
            <div style={{
                flex: 1, background: 'var(--sidebar-bg)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px',
            }}>
                <div style={{
                    width: '56px', height: '56px', borderRadius: '14px', background: 'var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px',
                }}>
                    <Shield style={{ width: 28, height: 28, color: 'white' }} />
                </div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#F9FAFB', marginBottom: '8px' }}>CypherAnalytics</h1>
                <p style={{ fontSize: '14px', color: '#9CA3AF', textAlign: 'center', maxWidth: '300px', lineHeight: 1.6 }}>
                    Enterprise-grade transaction monitoring with AI-powered privacy protection.
                </p>
            </div>

            {/* Right – Form */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px',
                position: 'relative',
            }}>
                {/* Theme toggle */}
                <div style={{ position: 'absolute', top: '24px', right: '24px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sun style={{ width: 14, height: 14, color: theme === 'light' ? 'var(--warning)' : 'var(--text-muted)' }} />
                    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme" />
                    <Moon style={{ width: 14, height: 14, color: theme === 'dark' ? 'var(--primary)' : 'var(--text-muted)' }} />
                </div>

                <div style={{ width: '100%', maxWidth: '380px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '6px' }}>Welcome back</h2>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px' }}>Sign in to your dashboard</p>

                    {error && (
                        <div style={{
                            padding: '12px 16px', marginBottom: '20px', borderRadius: '8px',
                            background: 'var(--bg-badge-danger)', color: 'var(--danger-text)', fontSize: '13px', fontWeight: 500,
                            border: '1px solid var(--border-light)',
                        }}>{error}</div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '6px' }}>Email</label>
                            <div style={{
                                display: 'flex', alignItems: 'center', border: '1px solid var(--border-input)',
                                borderRadius: '8px', padding: '0 12px', background: 'var(--bg-input)',
                                transition: 'border-color 0.15s, background 0.3s',
                            }}>
                                <Mail style={{ width: 16, height: 16, color: 'var(--text-muted)', flexShrink: 0 }} />
                                <input type="email" value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="you@company.com" required
                                    style={{
                                        flex: 1, border: 'none', outline: 'none', padding: '12px 10px',
                                        fontSize: '14px', background: 'transparent', color: 'var(--text)',
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>Password</label>
                                <Link to="#" style={{ fontSize: '12px', color: 'var(--primary)', textDecoration: 'none' }}>Forgot password?</Link>
                            </div>
                            <div style={{
                                display: 'flex', alignItems: 'center', border: '1px solid var(--border-input)',
                                borderRadius: '8px', padding: '0 12px', background: 'var(--bg-input)',
                                transition: 'border-color 0.15s, background 0.3s',
                            }}>
                                <Lock style={{ width: 16, height: 16, color: 'var(--text-muted)', flexShrink: 0 }} />
                                <input type={showPw ? 'text' : 'password'} value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="••••••••" required
                                    style={{
                                        flex: 1, border: 'none', outline: 'none', padding: '12px 10px',
                                        fontSize: '14px', background: 'transparent', color: 'var(--text)',
                                    }}
                                />
                                <button type="button" onClick={() => setShowPw(!showPw)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--text-muted)' }}>
                                    {showPw ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="btn-primary" disabled={loading}
                            style={{ padding: '12px', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {loading ? 'Signing in...' : <>Sign In <ArrowRight style={{ width: 16, height: 16 }} /></>}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', margin: '24px 0' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>or</span>
                    </div>
                    <button className="btn-secondary" style={{
                        width: '100%', padding: '11px', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px',
                    }}>
                        <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 7.5 29.3 5.5 24 5.5 13.2 5.5 4.5 14.2 4.5 25s8.7 19.5 19.5 19.5S43.5 35.8 43.5 25c0-.8-.1-1.7-.2-2.5z" /><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8c1.8-4.4 6.2-7.5 11.1-7.5 3 0 5.8 1.1 7.9 3l5.7-5.7C34 7.5 29.3 5.5 24 5.5c-7.1 0-13.3 3.8-16.7 9.2z" /><path fill="#4CAF50" d="M24 44.5c5.2 0 9.9-1.9 13.4-5.1l-6.2-5.2c-2 1.5-4.5 2.3-7.2 2.3-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44.5 24 44.5z" /><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2C36.5 39.6 43.5 34 43.5 25c0-1.7-.2-3.3-.5-4.9z" /></svg>
                        Continue with Google
                    </button>
                    <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                        Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
