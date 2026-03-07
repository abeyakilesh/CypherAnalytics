import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function MetricCard({ label, value, icon: Icon, trend, trendValue, trendUp, iconColor = 'var(--primary)', delay = 0 }) {
    return (
        <div className="card card-hover animate-fade-in" style={{
            padding: '24px', animationDelay: `${delay}ms`,
        }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: `color-mix(in srgb, ${iconColor} 10%, transparent)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <Icon style={{ width: 20, height: 20, color: iconColor }} />
                </div>
                {trendValue !== undefined && (
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '4px',
                        fontSize: '12px', fontWeight: 600,
                        color: trendUp === true ? 'var(--success-text)' : trendUp === false ? 'var(--danger-text)' : 'var(--text-secondary)',
                    }}>
                        {trendUp === true ? <TrendingUp style={{ width: 14, height: 14 }} /> :
                            trendUp === false ? <TrendingDown style={{ width: 14, height: 14 }} /> :
                                <Minus style={{ width: 14, height: 14 }} />}
                        {trendValue}
                    </div>
                )}
            </div>
            <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-heading)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{value}</p>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>{label}</p>
        </div>
    );
}
