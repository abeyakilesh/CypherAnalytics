import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCurrency, CURRENCIES } from '../context/CurrencyContext';
import { logout, getStoredUser } from '../services/api';
import {
    LayoutDashboard, Activity, ShieldAlert, BarChart3,
    Database, Settings, Bell, Search, Shield,
    ChevronLeft, ChevronRight, User, Sun, Moon, LogOut
} from 'lucide-react';

const navSections = [
    {
        title: 'MAIN',
        items: [
            { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
            { path: '/dashboard/live', icon: Activity, label: 'Transactions' },
            { path: '/dashboard/alerts', icon: ShieldAlert, label: 'Fraud Detection' },
            { path: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
        ],
    },
    {
        title: 'SYSTEM',
        items: [
            { path: '/dashboard/explorer', icon: Database, label: 'Insights' },
            { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
        ],
    },
];

export default function Layout({ isConnected, alertCount }) {
    const [collapsed, setCollapsed] = useState(false);
    const { theme, toggle } = useTheme();
    const { currency, setCurrency } = useCurrency();
    const navigate = useNavigate();
    const storedUser = getStoredUser();

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
            {/* ── Sidebar ── */}
            <aside style={{
                width: collapsed ? '64px' : '240px',
                background: 'var(--sidebar-bg)',
                display: 'flex', flexDirection: 'column',
                transition: 'width 0.25s ease',
                flexShrink: 0, overflow: 'hidden',
            }}>
                {/* Brand */}
                <div style={{
                    height: '56px', display: 'flex', alignItems: 'center',
                    padding: collapsed ? '0 16px' : '0 20px', gap: '12px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                        background: 'var(--primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Shield style={{ width: 16, height: 16, color: 'white' }} />
                    </div>
                    {!collapsed && (
                        <span style={{ fontWeight: 700, fontSize: '14px', color: '#F9FAFB', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>CypherAnalytics</span>
                    )}
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, padding: '16px 8px', overflowY: 'auto' }}>
                    {navSections.map((section) => (
                        <div key={section.title} style={{ marginBottom: '24px' }}>
                            {!collapsed && (
                                <p style={{
                                    fontSize: '11px', fontWeight: 600, color: 'var(--sidebar-text)',
                                    padding: '0 12px', marginBottom: '8px',
                                    letterSpacing: '0.06em',
                                }}>{section.title}</p>
                            )}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                {section.items.map(({ path, icon: Icon, label }) => (
                                    <NavLink
                                        key={path}
                                        to={path}
                                        end={path === '/dashboard'}
                                        style={({ isActive }) => ({
                                            display: 'flex', alignItems: 'center', gap: '12px',
                                            padding: collapsed ? '10px 0' : '8px 12px',
                                            justifyContent: collapsed ? 'center' : 'flex-start',
                                            borderRadius: '8px', fontSize: '13px', fontWeight: 500,
                                            textDecoration: 'none', transition: 'all 0.15s',
                                            color: isActive ? 'var(--sidebar-text-active)' : 'var(--sidebar-text)',
                                            background: isActive ? 'var(--sidebar-active)' : 'transparent',
                                        })}
                                    >
                                        <Icon style={{ width: 18, height: 18, flexShrink: 0 }} />
                                        {!collapsed && <span>{label}</span>}
                                        {!collapsed && path === '/dashboard/alerts' && alertCount > 0 && (
                                            <span style={{
                                                marginLeft: 'auto', background: 'var(--danger)', color: 'white',
                                                fontSize: '10px', fontWeight: 700, padding: '1px 6px', borderRadius: '9999px',
                                                lineHeight: '16px',
                                            }}>{alertCount}</span>
                                        )}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Collapse toggle */}
                <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            width: '100%', padding: '7px', background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px',
                            color: 'var(--sidebar-text)', cursor: 'pointer', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                        }}
                    >
                        {collapsed ? <ChevronRight style={{ width: 14, height: 14 }} /> : <ChevronLeft style={{ width: 14, height: 14 }} />}
                    </button>
                </div>
            </aside>

            {/* ── Main Area ── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
                {/* Header */}
                <header style={{
                    height: '56px', flexShrink: 0,
                    background: 'var(--bg-card)',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 24px',
                    transition: 'background 0.3s, border-color 0.3s',
                }}>
                    {/* Status */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                            width: '7px', height: '7px', borderRadius: '50%',
                            background: isConnected ? 'var(--success)' : 'var(--danger)',
                        }} />
                        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                            {isConnected ? 'System Online' : 'Disconnected'}
                        </span>
                    </div>

                    {/* Search */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        background: 'var(--bg)', border: '1px solid var(--border)',
                        borderRadius: '8px', padding: '7px 12px', width: '320px',
                        transition: 'background 0.3s, border-color 0.3s',
                    }}>
                        <Search style={{ width: 14, height: 14, color: 'var(--text-muted)' }} />
                        <input
                            type="text" placeholder="Search transactions, alerts..."
                            style={{
                                background: 'transparent', border: 'none', outline: 'none',
                                color: 'var(--text)', fontSize: '13px', width: '100%',
                            }}
                        />
                        <kbd style={{
                            fontSize: '10px', color: 'var(--text-muted)', padding: '1px 5px',
                            background: 'var(--bg-card)', borderRadius: '4px',
                            border: '1px solid var(--border)', fontFamily: 'inherit',
                        }}>⌘K</kbd>
                    </div>

                    {/* Right actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {/* ── Currency Toggle ── */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                style={{
                                    background: 'var(--bg)', border: '1px solid var(--border)',
                                    color: 'var(--text)', borderRadius: '6px', padding: '4px 8px',
                                    fontSize: '12px', fontWeight: 500, outline: 'none', cursor: 'pointer'
                                }}
                            >
                                {Object.keys(CURRENCIES).map(c => (
                                    <option key={c} value={c}>{c} ({CURRENCIES[c].symbol})</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ height: '24px', width: '1px', background: 'var(--border)' }} />

                        {/* ── Theme Toggle ── */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Sun style={{ width: 14, height: 14, color: theme === 'light' ? 'var(--warning)' : 'var(--text-muted)' }} />
                            <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme" />
                            <Moon style={{ width: 14, height: 14, color: theme === 'dark' ? 'var(--primary)' : 'var(--text-muted)' }} />
                        </div>

                        <div style={{ height: '24px', width: '1px', background: 'var(--border)' }} />

                        <button style={{
                            position: 'relative', padding: '6px', borderRadius: '6px',
                            background: 'transparent', border: 'none', cursor: 'pointer',
                        }}>
                            <Bell style={{ width: 18, height: 18, color: 'var(--text-secondary)' }} />
                            {alertCount > 0 && (
                                <span style={{
                                    position: 'absolute', top: '0', right: '0',
                                    width: '14px', height: '14px', borderRadius: '50%',
                                    background: 'var(--danger)', color: 'white', fontSize: '9px',
                                    fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '2px solid var(--bg-card)',
                                }}>
                                    {alertCount > 9 ? '9+' : alertCount}
                                </span>
                            )}
                        </button>

                        <div style={{ height: '24px', width: '1px', background: 'var(--border)' }} />

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                width: '30px', height: '30px', borderRadius: '50%',
                                background: 'var(--primary-light)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <User style={{ width: 14, height: 14, color: 'var(--primary)' }} />
                            </div>
                            <div>
                                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>
                                    {storedUser?.email?.split('@')[0] || 'Analyst'}
                                </p>
                                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                    {storedUser?.email || 'analyst@cypheranalytics.com'}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => { logout(); navigate('/login'); }}
                            title="Sign out"
                            style={{
                                padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 500,
                                background: 'var(--bg)', border: '1px solid var(--border)',
                                color: 'var(--text-secondary)', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '6px',
                                transition: 'all 0.15s',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--danger)'; e.currentTarget.style.borderColor = 'var(--danger)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                        >
                            <LogOut style={{ width: 14, height: 14 }} />
                            Logout
                        </button>
                    </div>
                </header>

                {/* Content */}
                <main style={{ flex: 1, overflowY: 'auto', padding: '32px 32px' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
