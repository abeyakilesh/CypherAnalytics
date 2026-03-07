import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Shield, Mail, Lock, User, Eye, EyeOff, ArrowRight, Sun, Moon } from 'lucide-react';
import NetworkBackground from '../components/NetworkBackground';
import { signup } from '../services/api';

export default function Signup() {
    const navigate = useNavigate();
    const { theme, toggle } = useTheme();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signup(form.name, form.email, form.password);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed');
        } finally { setLoading(false); }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', transition: 'background 0.3s' }}>
            {/* Left Brand */}
            <div style={{
                flex: 1, background: 'var(--sidebar-bg)', position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px',
            }}>
                <NetworkBackground />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                        <div style={{ position: 'absolute', width: '120px', height: '120px', background: 'var(--primary)', filter: 'blur(44px)', opacity: 0.4, borderRadius: '50%' }} />
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative', zIndex: 1 }}>
                            <rect width="64" height="64" rx="16" fill="url(#brandGrad)" />

                            {/* Inner abstract geometry */}
                            <path d="M20 32C20 25.3726 25.3726 20 32 20C38.6274 20 44 25.3726 44 32C44 38.6274 38.6274 44 32 44" stroke="white" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6" />
                            <circle cx="32" cy="32" r="6" fill="white" />
                            <path d="M32 14V20M32 44V50M14 32H20M44 32H50" stroke="white" strokeWidth="3" strokeLinecap="round" />
                            <circle cx="32" cy="14" r="2" fill="white" />
                            <circle cx="32" cy="50" r="2" fill="white" />
                            <circle cx="14" cy="32" r="2" fill="white" />
                            <circle cx="50" cy="32" r="2" fill="white" />

                            <defs>
                                <linearGradient id="brandGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#3B82F6" />
                                    <stop offset="1" stopColor="#1D4ED8" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <h1 style={{ fontSize: '38px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.04em', marginBottom: '16px', textAlign: 'center', lineHeight: 1.1 }}>
                        Cypher<span style={{ color: '#3B82F6' }}>Analytics</span>
                    </h1>
                    <p style={{ fontSize: '16px', color: '#9CA3AF', textAlign: 'center', maxWidth: '360px', lineHeight: 1.6, fontWeight: 400 }}>
                        Enterprise-grade transaction monitoring with AI-powered privacy protection.
                    </p>
                </div>
            </div>

            {/* Right Form */}
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
                    <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '6px' }}>Create account</h2>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px' }}>Start monitoring in minutes</p>

                    {error && (
                        <div style={{
                            padding: '12px 16px', marginBottom: '20px', borderRadius: '8px',
                            background: 'var(--bg-badge-danger)', color: 'var(--danger-text)', fontSize: '13px', fontWeight: 500,
                            border: '1px solid var(--border-light)',
                        }}>{error}</div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '6px' }}>Full Name</label>
                            <div style={{
                                display: 'flex', alignItems: 'center', border: '1px solid var(--border-input)',
                                borderRadius: '8px', padding: '0 12px', background: 'var(--bg-input)',
                            }}>
                                <User style={{ width: 16, height: 16, color: 'var(--text-muted)', flexShrink: 0 }} />
                                <input type="text" value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="John Doe" required
                                    style={{
                                        flex: 1, border: 'none', outline: 'none', padding: '12px 10px',
                                        fontSize: '14px', background: 'transparent', color: 'var(--text)',
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '6px' }}>Email</label>
                            <div style={{
                                display: 'flex', alignItems: 'center', border: '1px solid var(--border-input)',
                                borderRadius: '8px', padding: '0 12px', background: 'var(--bg-input)',
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
                            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '6px' }}>Password</label>
                            <div style={{
                                display: 'flex', alignItems: 'center', border: '1px solid var(--border-input)',
                                borderRadius: '8px', padding: '0 12px', background: 'var(--bg-input)',
                            }}>
                                <Lock style={{ width: 16, height: 16, color: 'var(--text-muted)', flexShrink: 0 }} />
                                <input type={showPw ? 'text' : 'password'} value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="Min 8 characters" required
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
                            {loading ? 'Creating account...' : <>Create Account <ArrowRight style={{ width: 16, height: 16 }} /></>}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
