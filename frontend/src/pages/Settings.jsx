import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
    User, Mail, Lock, Shield, Bell, Smartphone,
    Globe, Clock, Key, CreditCard, ChevronRight, CheckCircle, Moon, Sun
} from 'lucide-react';

// Reusable Toggle Switch Component
const Toggle = ({ enabled, onChange }) => (
    <button
        onClick={() => onChange(!enabled)}
        style={{
            width: '44px', height: '24px', borderRadius: '12px',
            background: enabled ? 'var(--primary)' : 'var(--border-light)',
            position: 'relative', cursor: 'pointer', border: 'none',
            transition: 'background 0.2s', padding: 0
        }}
    >
        <div style={{
            position: 'absolute', top: '2px', left: enabled ? '22px' : '2px',
            width: '20px', height: '20px', borderRadius: '50%',
            background: 'white', transition: 'left 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }} />
    </button>
);

export default function Settings() {
    const { theme, toggle } = useTheme();
    const [selectedTab, setSelectedTab] = useState('profile');

    // Mock states for interactive settings
    const [notifications, setNotifications] = useState({ email: true, push: false, weekly: true });
    const [security, setSecurity] = useState({ twoFactor: false, loginAlerts: true });

    // Privacy Monitor Specific
    const [selectedRole, setSelectedRole] = useState('analyst');

    const tabs = [
        { id: 'profile', label: 'My Profile', icon: User },
        { id: 'preferences', label: 'Preferences', icon: Globe },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security & Access', icon: Shield },
        { id: 'privacy_demo', label: 'Privacy Simulator', icon: Lock },
    ];

    return (
        <div className="animate-fade-in" style={{ display: 'flex', gap: '32px', height: 'calc(100vh - 100px)' }}>

            {/* Sidebar Navigation */}
            <div style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-0.02em', marginBottom: '16px' }}>Settings</h1>

                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                            padding: '12px 16px', borderRadius: '8px',
                            background: selectedTab === tab.id ? 'var(--primary-light)' : 'transparent',
                            color: selectedTab === tab.id ? 'var(--primary)' : 'var(--text-secondary)',
                            fontWeight: selectedTab === tab.id ? 600 : 500,
                            cursor: 'pointer', border: 'none', textAlign: 'left',
                            transition: 'all 0.15s'
                        }}
                        onMouseEnter={(e) => {
                            if (selectedTab !== tab.id) e.currentTarget.style.background = 'var(--bg-card)';
                        }}
                        onMouseLeave={(e) => {
                            if (selectedTab !== tab.id) e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        <tab.icon style={{ width: 18, height: 18 }} />
                        <span style={{ fontSize: '14px' }}>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, maxWidth: '800px', overflowY: 'auto', paddingRight: '20px' }}>

                {selectedTab === 'profile' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-heading)' }}>My Profile</h2>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Manage your personal information and contact details.</p>
                        </div>

                        <div className="card" style={{ padding: '32px', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
                                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User style={{ width: 32, height: 32, color: 'var(--primary)' }} />
                                </div>
                                <button style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 500, background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer' }}>
                                    Change Avatar
                                </button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>First Name</label>
                                    <input type="text" defaultValue="System" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Last Name</label>
                                    <input type="text" defaultValue="Analyst" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Email Address</label>
                                    <input type="email" defaultValue="analyst@cypheranalytics.com" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }} />
                                </div>
                            </div>

                            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
                                <button style={{ padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer' }}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === 'preferences' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-heading)' }}>Application Preferences</h2>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Customize your workspace appearance and regional settings.</p>
                        </div>

                        <div className="card" style={{ padding: '32px', borderRadius: '12px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '24px' }}>Appearance</h3>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
                                <div>
                                    <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>Theme Mode</p>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Toggle between light and dark modes</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg)', padding: '6px', borderRadius: '30px', border: '1px solid var(--border)' }}>
                                    <button onClick={() => theme === 'dark' && toggle()} style={{ padding: '8px', borderRadius: '50%', background: theme === 'light' ? 'var(--bg-card)' : 'transparent', border: 'none', cursor: 'pointer', boxShadow: theme === 'light' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                                        <Sun style={{ width: 16, height: 16, color: theme === 'light' ? 'var(--primary)' : 'var(--text-muted)' }} />
                                    </button>
                                    <button onClick={() => theme === 'light' && toggle()} style={{ padding: '8px', borderRadius: '50%', background: theme === 'dark' ? 'var(--bg-card)' : 'transparent', border: 'none', cursor: 'pointer', boxShadow: theme === 'dark' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                                        <Moon style={{ width: 16, height: 16, color: theme === 'dark' ? 'var(--primary)' : 'var(--text-muted)' }} />
                                    </button>
                                </div>
                            </div>

                            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-heading)', marginTop: '32px', marginBottom: '24px' }}>Localization</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Language</label>
                                    <select style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', cursor: 'pointer' }}>
                                        <option>English (United States)</option>
                                        <option>Spanish (Spain)</option>
                                        <option>French (France)</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Timezone</label>
                                    <select style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', cursor: 'pointer' }}>
                                        <option>Eastern Time (EST)</option>
                                        <option>Pacific Time (PST)</option>
                                        <option>Coordinated Universal Time (UTC)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === 'notifications' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-heading)' }}>Notification Settings</h2>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Choose what alerts you receive and how they are delivered.</p>
                        </div>

                        <div className="card" style={{ padding: '8px 24px', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border-light)' }}>
                                <div>
                                    <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>Email Alerts</p>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Receive critical fraud alerts via email immediately.</p>
                                </div>
                                <Toggle enabled={notifications.email} onChange={(val) => setNotifications(prev => ({ ...prev, email: val }))} />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border-light)' }}>
                                <div>
                                    <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>Browser Push Notifications</p>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Get desktop alerts for high-risk transactions while active.</p>
                                </div>
                                <Toggle enabled={notifications.push} onChange={(val) => setNotifications(prev => ({ ...prev, push: val }))} />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
                                <div>
                                    <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>Weekly Analytics Report</p>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>A summary email of the week's transaction volume and flags.</p>
                                </div>
                                <Toggle enabled={notifications.weekly} onChange={(val) => setNotifications(prev => ({ ...prev, weekly: val }))} />
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === 'security' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-heading)' }}>Security & Access</h2>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Protect your account and manage active sessions.</p>
                        </div>

                        <div className="card" style={{ padding: '8px 24px', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border-light)' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <Smartphone style={{ width: 24, height: 24, color: 'var(--primary)' }} />
                                    <div>
                                        <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>Two-Factor Authentication (2FA)</p>
                                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Add an extra layer of system security.</p>
                                    </div>
                                </div>
                                <Toggle enabled={security.twoFactor} onChange={(val) => setSecurity(prev => ({ ...prev, twoFactor: val }))} />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border-light)' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <Mail style={{ width: 24, height: 24, color: 'var(--text-muted)' }} />
                                    <div>
                                        <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>New Login Alerts</p>
                                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Get notified of logins from new devices.</p>
                                    </div>
                                </div>
                                <Toggle enabled={security.loginAlerts} onChange={(val) => setSecurity(prev => ({ ...prev, loginAlerts: val }))} />
                            </div>

                            <div style={{ padding: '16px 0' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                                    <Key style={{ width: 24, height: 24, color: 'var(--text-muted)' }} />
                                    <div>
                                        <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>API Keys</p>
                                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Manage your programmatic access tokens.</p>
                                    </div>
                                </div>
                                <button style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 500, background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer', marginLeft: '40px' }}>
                                    Generate New Key
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === 'privacy_demo' && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-heading)' }}>Privacy Simulator</h2>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Demo interaction: Test how the actual App's RBAC adapts the dashboard data.</p>
                        </div>

                        {/* Role Selector */}
                        <div className="card" style={{ borderRadius: '12px', padding: '24px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '16px' }}>Role-Based Access Control Simulator</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                                {[
                                    { role: 'admin', desc: 'Full encrypted access' },
                                    { role: 'analyst', desc: 'Masked identifiers' },
                                    { role: 'viewer', desc: 'Aggregated insights only' },
                                ].map(({ role, desc }) => (
                                    <button
                                        key={role} onClick={() => setSelectedRole(role)}
                                        className="card-hover"
                                        style={{
                                            padding: '20px', borderRadius: '10px', textAlign: 'left',
                                            cursor: 'pointer',
                                            background: selectedRole === role ? 'var(--primary-light)' : 'var(--bg-card)',
                                            border: `1px solid ${selectedRole === role ? 'var(--primary)' : 'var(--border)'}`,
                                            color: 'var(--text)', transition: 'all 0.15s',
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                            <Shield style={{ width: 18, height: 18, color: selectedRole === role ? 'var(--primary)' : 'var(--text-muted)' }} />
                                            <span style={{ fontSize: '14px', fontWeight: 600, textTransform: 'capitalize' }}>{role}</span>
                                            {selectedRole === role && <CheckCircle style={{ width: 14, height: 14, color: 'var(--primary)', marginLeft: 'auto' }} />}
                                        </div>
                                        <p style={{ fontSize: '13px', color: selectedRole === role ? 'var(--primary)' : 'var(--text-secondary)' }}>{desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Data Demo */}
                        <div className="card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>Live Data Transformation</h3>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>See how a sample transaction is transformed based on the selected role.</p>
                            </div>

                            <div style={{ padding: '24px', background: 'var(--bg)' }}>
                                {/* Example Transaction Card */}
                                <div style={{
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    background: 'var(--bg-card)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                                            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>Sample Transaction #TRX-9921</span>
                                        </div>
                                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Just now</span>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div>
                                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Account Number</p>
                                            <p style={{
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                color: selectedRole === 'viewer' ? 'var(--text-muted)' : (selectedRole === 'admin' ? 'var(--danger-text)' : 'var(--text)'),
                                                fontFamily: selectedRole !== 'viewer' ? 'monospace' : 'inherit'
                                            }}>
                                                {selectedRole === 'admin' ? 'U2FsdGVkX19z...8qPjM' : (selectedRole === 'analyst' ? '********4829' : '[HIDDEN]')}
                                            </p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>User Name</p>
                                            <p style={{
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                color: selectedRole === 'viewer' ? 'var(--text-muted)' : (selectedRole === 'admin' ? 'var(--danger-text)' : 'var(--text)'),
                                                fontFamily: selectedRole === 'admin' ? 'monospace' : 'inherit'
                                            }}>
                                                {selectedRole === 'admin' ? 'U2FsdGVkX18...1a9Q' : (selectedRole === 'analyst' ? 'User_9921' : '[HIDDEN]')}
                                            </p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Amount</p>
                                            <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>$1,250.00</p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Merchant</p>
                                            <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>Apple Store</p>
                                        </div>
                                    </div>

                                    <div style={{
                                        marginTop: '8px',
                                        padding: '12px',
                                        background: 'var(--danger-light)',
                                        borderRadius: '6px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--danger-text)' }}>Computed Risk Score</span>
                                        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--danger)' }}>85 / 100</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

