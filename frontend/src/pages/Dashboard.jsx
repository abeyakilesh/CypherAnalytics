import { useEffect, useState } from 'react';
import {
    Activity, ShieldAlert, DollarSign, TrendingUp, Shield
} from 'lucide-react';
import { getAnalytics, getPrivacyInfo } from '../services/api';
import MetricCard from '../components/MetricCard';
import ChartCard from '../components/ChartCard';
import AlertPanel from '../components/AlertPanel';
import PrivacyStatusCard from '../components/PrivacyStatusCard';
import TransactionVolumeChart from '../charts/TransactionVolumeChart';
import RiskDistributionChart from '../charts/RiskDistributionChart';
import { useCurrency } from '../context/CurrencyContext';

export default function Dashboard({ stats, transactions, alerts }) {
    const [analytics, setAnalytics] = useState(null);
    const [privacyInfo, setPrivacyInfo] = useState(null);
    const { formatCurrency } = useCurrency();

    useEffect(() => {
        const load = async () => {
            try {
                const [a, p] = await Promise.all([getAnalytics(), getPrivacyInfo()]);
                setAnalytics(a.data);
                setPrivacyInfo(p.data);
            } catch { /* socket fallback */ }
        };
        load();
        const iv = setInterval(load, 10000);
        return () => clearInterval(iv);
    }, []);

    const kpis = [
        { label: 'Total Transactions', value: stats.totalTransactions.toLocaleString(), icon: Activity, iconColor: 'var(--primary)', trendValue: '+12.5%', trendUp: true },
        { label: 'Fraud Alerts', value: stats.suspiciousTransactions.toLocaleString(), icon: ShieldAlert, iconColor: 'var(--danger)', trendValue: `${stats.totalTransactions > 0 ? ((stats.suspiciousTransactions / stats.totalTransactions) * 100).toFixed(1) : 0}%`, trendUp: false },
        { label: 'Transaction Volume', value: formatCurrency(stats.transactionVolume || 0), icon: DollarSign, iconColor: 'var(--success)', trendValue: '+8.3%', trendUp: true },
        { label: 'Avg Risk Score', value: String(stats.averageRiskScore || 0), icon: TrendingUp, iconColor: 'var(--warning)', trendValue: 'Normal', trendUp: null },
        { label: 'Privacy Score', value: `${privacyInfo?.privacyScore?.score || 92}%`, icon: Shield, iconColor: 'var(--accent)', trendValue: 'Strong', trendUp: true },
    ];

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Page Header */}
            <div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>Overview</h1>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Real-time financial transaction monitoring</p>
            </div>

            {/* ── KPI Metrics Row ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                {kpis.map((kpi, i) => (
                    <MetricCard key={i} {...kpi} delay={i * 50} />
                ))}
            </div>

            {/* ── Main Analytics Grid (2 col) ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <ChartCard title="Transaction Volume">
                    <TransactionVolumeChart data={analytics?.volumeOverTime || []} />
                </ChartCard>
                <ChartCard title="Risk Score Distribution">
                    <RiskDistributionChart data={analytics?.riskDistribution || []} />
                </ChartCard>
            </div>

            {/* ── Live Activity Feed ── */}
            <div className="card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{
                    padding: '20px 24px', borderBottom: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>Live Transaction Feed</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Live</span>
                    </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                        <thead>
                            <tr>
                                {['Status', 'Merchant', 'Amount', 'Location', 'Risk Score'].map((h) => (
                                    <th key={h} style={{
                                        padding: '10px 24px', fontSize: '12px', fontWeight: 600,
                                        color: 'var(--text-secondary)', textAlign: 'left', background: 'var(--bg-table-head)',
                                        borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap',
                                    }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.slice(0, 8).map((tx, i) => (
                                <tr key={tx.transactionID || i} className="table-row" style={{ borderBottom: '1px solid var(--border-light)', transition: 'background 0.1s' }}>
                                    <td style={{ padding: '12px 24px' }}>
                                        <span className={`badge ${tx.status === 'suspicious' ? 'badge-danger' : 'badge-success'}`}>
                                            {tx.status === 'suspicious' ? 'Suspicious' : 'Normal'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 24px', fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>{tx.merchant}</td>
                                    <td style={{ padding: '12px 24px', fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>{formatCurrency(tx.amount)}</td>
                                    <td style={{ padding: '12px 24px', fontSize: '14px', color: 'var(--text-secondary)' }}>{tx.location}</td>
                                    <td style={{ padding: '12px 24px' }}>
                                        <span className={`badge ${tx.riskScore > 70 ? 'badge-danger' : tx.riskScore > 40 ? 'badge-warning' : 'badge-success'}`}>
                                            {tx.riskScore}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {transactions.length === 0 && (
                    <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                        <Activity style={{ width: 20, height: 20, margin: '0 auto 8px', color: 'var(--border)' }} />
                        Waiting for transactions...
                    </div>
                )}
            </div>

            {/* ── Bottom: Alerts + Privacy ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <AlertPanel alerts={alerts} maxItems={6} />
                <PrivacyStatusCard privacyInfo={privacyInfo} />
            </div>
        </div>
    );
}
