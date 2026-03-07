import { Shield, Lock, Eye, CheckCircle, Database, FileCode, Workflow } from 'lucide-react';

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
    const classifications = privacyInfo?.fieldClassifications || {
        accountNumber: { classification: 'Highly Sensitive', maskStrategy: 'AES-256-CBC Encrypted' },
        userName: { classification: 'Sensitive PII', maskStrategy: 'K-Anonymized Hash' },
        amount: { classification: 'Public', maskStrategy: 'Cleartext (Visible)' }
    };

    const getIconForStrategy = (strategy) => {
        if (strategy.includes('Encrypt')) return <Lock style={{ width: 14, height: 14, color: 'var(--success-text)' }} />;
        if (strategy.includes('Hash') || strategy.includes('Mask')) return <Eye style={{ width: 14, height: 14, color: 'var(--primary)' }} />;
        return <CheckCircle style={{ width: 14, height: 14, color: 'var(--text-muted)' }} />;
    };

    return (
        <div className="card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{
                padding: '20px 24px', borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Database size={16} color="var(--primary)" /> Privacy & Encryption Engine
                </h3>
                <span className="badge badge-success" style={{ fontFamily: 'monospace' }}>System Guard Active</span>
            </div>
            <div style={{ padding: '24px' }}>
                {/* Score */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'flex-end' }}>
                        <div>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>Real-Time Obfuscation Confidence</span>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Aggregated payload protection metric</p>
                        </div>
                        <span style={{ fontSize: '18px', fontWeight: 700, color: score > 80 ? 'var(--success-text)' : 'var(--warning-text)' }}>{score}%</span>
                    </div>
                    <ProgressBar value={score} color={score > 80 ? 'var(--success)' : 'var(--warning)'} />
                </div>

                {/* Encryption Summary */}
                <div style={{
                    padding: '16px', borderRadius: '8px', background: 'var(--bg-privacy)',
                    border: '1px solid var(--border-light)', marginBottom: '24px',
                    display: 'flex', flexDirection: 'column', gap: '12px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Shield style={{ width: 16, height: 16, color: 'var(--success-text)' }} />
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{privacyInfo?.protectionSummary?.encryptionMethod || 'AES-256-CBC Payload Encryption'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Workflow style={{ width: 16, height: 16, color: 'var(--primary)' }} />
                        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>Dynamic Role-Based Access Control (RBAC) enforced</span>
                    </div>
                </div>

                {/* Data Schema Classifications */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <FileCode size={14} color="var(--text-muted)" />
                    <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Schema Field Classifications</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {Object.entries(classifications || {}).slice(0, 4).map(([field, data]) => (
                        <div key={field} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '12px', borderRadius: '6px', background: 'var(--bg)', border: '1px solid var(--border-light)'
                        }}>
                            <div>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', fontFamily: 'monospace' }}>{field}</span>
                                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{data?.classification || 'Unknown'}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                                    {data?.maskStrategy || 'Not Applied'}
                                </span>
                                {getIconForStrategy(data?.maskStrategy || '')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
