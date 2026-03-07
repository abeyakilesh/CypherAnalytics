import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '8px 12px',
            boxShadow: 'var(--shadow-tooltip)',
        }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '2px' }}>{payload[0].payload.merchant}</p>
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)' }}>{payload[0].value} transactions</p>
        </div>
    );
};

export default function TopMerchantsChart({ data }) {
    const { theme } = useTheme();
    const gridColor = theme === 'dark' ? '#1E293B' : '#F3F4F6';
    const axisColor = theme === 'dark' ? '#334155' : '#E5E7EB';
    const textColor = theme === 'dark' ? '#64748B' : '#9CA3AF';
    const labelColor = theme === 'dark' ? '#94A3B8' : '#6B7280';
    const barColor = theme === 'dark' ? '#818CF8' : '#6366F1';

    return (
        <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis type="number" tick={{ fontSize: 12, fill: textColor }} axisLine={{ stroke: axisColor }} tickLine={false} />
                <YAxis dataKey="merchant" type="category" tick={{ fontSize: 12, fill: labelColor }} axisLine={false} tickLine={false} width={90} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill={barColor} radius={[0, 4, 4, 0]} barSize={14} />
            </BarChart>
        </ResponsiveContainer>
    );
}
