import { useEffect, useState } from 'react';
import { getAnalytics } from '../services/api';
import { BarChart3, DollarSign, TrendingUp, Users } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import ChartCard from '../components/ChartCard';
import TransactionVolumeChart from '../charts/TransactionVolumeChart';
import RiskDistributionChart from '../charts/RiskDistributionChart';
import TopMerchantsChart from '../charts/TopMerchantsChart';
import LocationDistributionChart from '../charts/LocationDistributionChart';
import { useCurrency } from '../context/CurrencyContext';

export default function Analytics() {
    const [data, setData] = useState(null);
    const { formatCurrency } = useCurrency();

    useEffect(() => {
        const load = async () => {
            try { setData((await getAnalytics()).data); }
            catch (err) { console.error(err); }
        };
        load();
        const iv = setInterval(load, 15000);
        return () => clearInterval(iv);
    }, []);

    const summaries = [
        { label: 'Total Processed', value: data?.totalTransactions?.toLocaleString() || '—', icon: BarChart3, iconColor: 'var(--primary)', trendValue: '+5.2%', trendUp: true },
        { label: 'Avg Amount', value: data?.avgAmount ? formatCurrency(data.avgAmount) : '—', icon: DollarSign, iconColor: 'var(--success)', trendValue: '+2.1%', trendUp: true },
        { label: 'Avg Risk Score', value: data?.avgRiskScore?.toFixed(1) || '—', icon: TrendingUp, iconColor: 'var(--warning)', trendValue: 'Stable', trendUp: null },
        { label: 'Unique Merchants', value: String(data?.topMerchants?.length || '—'), icon: Users, iconColor: 'var(--accent)' },
    ];

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>Analytics</h1>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Comprehensive transaction analytics and insights</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {summaries.map((s, i) => <MetricCard key={i} {...s} delay={i * 50} />)}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <ChartCard title="Transaction Volume Over Time">
                    <TransactionVolumeChart data={data?.volumeOverTime || []} />
                </ChartCard>
                <ChartCard title="Risk Score Distribution">
                    <RiskDistributionChart data={data?.riskDistribution || []} />
                </ChartCard>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <ChartCard title="Top Merchants">
                    <TopMerchantsChart data={data?.topMerchants || []} />
                </ChartCard>
                <ChartCard title="Location Distribution">
                    <LocationDistributionChart data={data?.locationDistribution || []} />
                </ChartCard>
            </div>
        </div>
    );
}
