import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '8px 12px',
            boxShadow: 'var(--shadow-tooltip)',
        }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '2px' }}>{payload[0].payload.range}</p>
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{payload[0].value} transactions</p>
        </div>
    );
};

export default function RiskDistributionChart({ data }) {
    const { theme } = useTheme();
    const gridColor = theme === 'dark' ? '#1E293B' : '#F3F4F6';
    const axisColor = theme === 'dark' ? '#334155' : '#E5E7EB';
    const textColor = theme === 'dark' ? '#64748B' : '#9CA3AF';

    return (
        <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="range" tick={{ fontSize: 12, fill: textColor }} axisLine={{ stroke: axisColor }} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: textColor }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={32}>
                    {data?.map((_, i) => (
                        <Cell key={i} fill={theme === 'dark' ? '#3B82F6' : '#2563EB'} fillOpacity={1 - (i * 0.15)} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
