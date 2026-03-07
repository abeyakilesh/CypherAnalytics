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
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '2px' }}>{payload[0].payload.location}</p>
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>{payload[0].value} transactions</p>
        </div>
    );
};

export default function LocationDistributionChart({ data }) {
    const { theme } = useTheme();
    const gridColor = theme === 'dark' ? '#1E293B' : '#F3F4F6';
    const axisColor = theme === 'dark' ? '#334155' : '#E5E7EB';
    const textColor = theme === 'dark' ? '#64748B' : '#9CA3AF';
    const baseColor = theme === 'dark' ? '#3B82F6' : '#2563EB';

    return (
        <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="location" tick={{ fontSize: 11, fill: textColor }} axisLine={{ stroke: axisColor }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={32}>
                    {data?.map((_, i) => (
                        <Cell key={i} fill={baseColor} fillOpacity={1 - (i * 0.1)} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
