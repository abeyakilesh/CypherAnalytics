import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';

function ProgressBar({ value, color = 'var(--primary)' }) {
    return (
        <div style={{ height: '6px', background: 'var(--border-light)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
                width: `${Math.min(value, 100)}%`, height: '100%',
                background: color, borderRadius: '3px',
                transition: 'width 0.6s ease',
            }} />
        </div>
    );
}

export default function PrivacyStatusCard({ privacyInfo }) {
    const score = privacyInfo?.privacyScore?.score || 92;
    const fields = [
        { name: 'accountNumber', level: 'Protected', icon: Lock, color: 'var(--success-text)' },
        { name: 'userName', level: 'Anonymized', icon: Eye, color: 'var(--primary)' },
        { name: 'amount', level: 'Visible', icon: CheckCircle, color: 'var(--text-secondary)' },
    ];

    return (
        <div className="card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{
                padding: '20px 24px', borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>Privacy Protection</h3>
                <span className="badge badge-success">Active</span>
            </div>
            <div style={{ padding: '24px' }}>
                {/* Score */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>Privacy Score</span>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: score > 80 ? 'var(--success-text)' : 'var(--warning-text)' }}>{score}%</span>
                    </div>
                    <ProgressBar value={score} color={score > 80 ? 'var(--success)' : 'var(--warning)'} />
                </div>

                {/* Encryption */}
                <div style={{
                    padding: '14px 16px', borderRadius: '8px', background: 'var(--bg-privacy)',
                    border: '1px solid var(--border-light)', marginBottom: '20px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                    <Shield style={{ width: 16, height: 16, color: 'var(--success-text)' }} />
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--success-text)' }}>AES-256 Encryption Active</span>
                </div>

                {/* Fields */}
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>Protected Fields</p>
                {fields.map((f) => (
                    <div key={f.name} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '10px 0', borderBottom: '1px solid var(--border-light)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <f.icon style={{ width: 14, height: 14, color: f.color }} />
                            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{f.name}</span>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 500, color: f.color }}>{f.level}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
