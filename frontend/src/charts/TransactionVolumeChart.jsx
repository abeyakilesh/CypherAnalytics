import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '8px 12px',
            boxShadow: 'var(--shadow-tooltip)',
        }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '2px' }}>{label}</p>
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>{payload[0].value} transactions</p>
        </div>
    );
};

export default function TransactionVolumeChart({ data }) {
    const { theme } = useTheme();
    const gridColor = theme === 'dark' ? '#1E293B' : '#F3F4F6';
    const axisColor = theme === 'dark' ? '#334155' : '#E5E7EB';
    const textColor = theme === 'dark' ? '#64748B' : '#9CA3AF';
    const strokeColor = theme === 'dark' ? '#3B82F6' : '#2563EB';

    return (
        <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="tvGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={strokeColor} stopOpacity={0.12} />
                        <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="hour" tick={{ fontSize: 12, fill: textColor }} axisLine={{ stroke: axisColor }} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: textColor }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count" stroke={strokeColor} strokeWidth={2} fill="url(#tvGrad)" dot={false} />
            </AreaChart>
        </ResponsiveContainer>
    );
}
