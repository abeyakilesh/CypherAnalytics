import { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, Info, Clock, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

function AlertItem({ alert }) {
    const [expanded, setExpanded] = useState(false);
    const [actionState, setActionState] = useState(null);
    const { formatCurrency } = useCurrency();

    // Generate some dynamic mock context based on the alert
    const getFlagReason = () => {
        if (alert.amount > 10000) return `Anomaly detected: Transaction (TxID: ${alert.transactionID}) deviates >4.2σ from historical baseline volume.`;
        if (alert.riskScore > 80) return `Composite Risk >80: Correlated IP velocity mismatch and unauthorized merchant MCC classification.`;
        return `Geolocation Mismatch Threshold Exceeded: IP coordinates drift >500mi from stored localized device fingerprint.`;
    };

    const getProblemDetails = () => {
        if (alert.riskScore > 85) return `Engine flagged anomalous transaction velocity vectors combined with unverified multi-factor token persistence failure.`;
        return `Algorithm identified severe spatial-temporal divergence against user's trained K-Means behavioral clustering model.`;
    };

    const getResolutionSteps = () => {
        if (alert.riskScore > 85) return '1. Initiate automated account throttle protocol. 2. Trigger secure biometric re-verification loop. 3. Dispatch L3 manual review ticket.';
        return '1. Execute out-of-band push notification for SMS-2FA confirmation. 2. Await cryptographic challenge-response validation.';
    };

    const getDowntime = () => {
        if (alert.riskScore > 85) return 'Resolution SLA: < 12 hours (L3 Manual Intervention Protocol Engaged)';
        return 'Resolution SLA: < 2 mins (Automated Cryptographic Verification Pending)';
    };

    const handleAction = (message) => {
        setActionState(message);
        setTimeout(() => setExpanded(false), 2000);
    };

    return (
        <div style={{ borderBottom: '1px solid var(--border-light)' }}>
            <button
                onClick={() => setExpanded(!expanded)}
                style={{
                    width: '100%', padding: '14px 24px', background: 'none', border: 'none',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: 'var(--bg-badge-danger)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                        <AlertTriangle style={{ width: 16, height: 16, color: 'var(--danger-text)' }} />
                    </div>
                    <div>
                        <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>{alert.merchant}</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{alert.location} · {new Date(alert.timestamp).toLocaleTimeString()}</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>{formatCurrency(alert.amount)}</span>
                    <span className={`badge ${alert.riskScore > 70 ? 'badge-danger' : 'badge-warning'}`}>
                        Risk: {alert.riskScore}
                    </span>
                    {expanded ? <ChevronUp style={{ width: 16, height: 16, color: 'var(--text-muted)' }} /> : <ChevronDown style={{ width: 16, height: 16, color: 'var(--text-muted)' }} />}
                </div>
            </button>
            {expanded && (
                <div className="animate-fade-in" style={{
                    padding: '0 24px 24px', background: 'var(--bg)', borderTop: '1px solid var(--border-light)',
                    display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '16px'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)' }}>
                        {[
                            { label: 'Account', value: alert.accountNumber },
                            { label: 'Transaction ID', value: alert.transactionID || '—' },
                            { label: 'User', value: alert.userName || alert.userID || '—' },
                            { label: 'Status', value: 'Under Investigation' },
                        ].map((d) => (
                            <div key={d.label}>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '2px' }}>{d.label}</p>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500, fontFamily: d.label === 'Account' ? 'monospace' : 'inherit' }}>{d.value}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Reasons & Problem */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div>
                                <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                    <ShieldAlert size={14} color="var(--danger)" /> Algorithmic Flag Reason
                                </h4>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, background: 'var(--bg-card)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                    {getFlagReason()}
                                </p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                    <Info size={14} color="var(--info)" /> Technical Core Problem
                                </h4>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, background: 'var(--bg-card)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                    {getProblemDetails()}
                                </p>
                            </div>
                        </div>

                        {/* Resolution & Downtime */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div>
                                <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                    <CheckCircle size={14} color="var(--success)" /> Intelligent Auto-Resolution Path
                                </h4>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, background: 'var(--bg-card)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                    {getResolutionSteps()}
                                </p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                    <Clock size={14} color="var(--warning)" /> Resolution SLA & Impact
                                </h4>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, background: 'var(--bg-card)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                    {getDowntime()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {actionState ? (
                        <div className="animate-fade-in" style={{
                            padding: '12px 16px', background: 'var(--bg-badge-success)', color: 'var(--success-text)',
                            borderRadius: '8px', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px'
                        }}>
                            <CheckCircle size={16} /> {actionState}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                            <button className="btn btn-primary" onClick={() => handleAction('Protocol successfully initiated')} style={{ padding: '8px 16px', fontSize: '13px' }}>
                                Initiate Protocol
                            </button>
                            <button className="btn btn-secondary" onClick={() => handleAction('Alert marked as false positive')} style={{ padding: '8px 16px', fontSize: '13px' }}>
                                <XCircle size={14} style={{ marginRight: '6px' }} /> Mark False Positive
                            </button>
                            <button className="btn btn-secondary" onClick={() => handleAction('Alert escalated to Level 2 Analyst')} style={{ padding: '8px 16px', fontSize: '13px' }}>
                                Escalate to L2 Analyst
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function AlertPanel({ alerts, maxItems = 10 }) {
    return (
        <div className="card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{
                padding: '20px 24px', borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>Fraud Alerts</h3>
                <span className="badge badge-danger">{alerts.length} Active</span>
            </div>
            {alerts.slice(0, maxItems).map((alert, i) => (
                <AlertItem key={alert.transactionID || i} alert={alert} />
            ))}
            {alerts.length === 0 && (
                <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                    No fraud alerts detected
                </div>
            )}
        </div>
    );
}
