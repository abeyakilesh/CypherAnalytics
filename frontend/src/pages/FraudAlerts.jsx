import AlertPanel from '../components/AlertPanel';
import { useCurrency } from '../context/CurrencyContext';

export default function FraudAlerts({ alerts }) {
    const { formatCurrency } = useCurrency();

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>Fraud Detection</h1>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>High-risk transactions flagged for investigation</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {[
                    { label: 'Total Alerts', value: alerts.length, color: 'var(--danger)' },
                    { label: 'Avg Risk Score', value: alerts.length ? Math.round(alerts.reduce((s, a) => s + a.riskScore, 0) / alerts.length) : 0, color: 'var(--warning)' },
                    { label: 'Total Flagged Volume', value: formatCurrency(alerts.reduce((s, a) => s + (a.amount || 0), 0)), color: 'var(--accent)' },
                ].map((s, i) => (
                    <div key={i} className="card" style={{ padding: '24px', borderRadius: '12px' }}>
                        <p style={{ fontSize: '32px', fontWeight: 700, color: s.color }}>{s.value}</p>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>{s.label}</p>
                    </div>
                ))}
            </div>

            <AlertPanel alerts={alerts} maxItems={20} />
        </div>
    );
}
