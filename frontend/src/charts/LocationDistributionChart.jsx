import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const COLORS = ['#3B82F6', '#818CF8', '#22C55E', '#F59E0B', '#EF4444', '#EC4899', '#14B8A6'];

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '8px 12px',
            boxShadow: 'var(--shadow-tooltip)',
        }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '2px' }}>{payload[0].payload._id}</p>
            <p style={{ fontSize: '13px', fontWeight: 600, color: payload[0].payload.fill }}>{payload[0].value} transactions</p>
        </div>
    );
};

const renderLabel = ({ _id, percent }) => `${_id} (${(percent * 100).toFixed(0)}%)`;

export default function LocationDistributionChart({ data }) {
    const { theme } = useTheme();
    const strokeColor = theme === 'dark' ? '#111827' : '#FFFFFF';

    return (
        <ResponsiveContainer width="100%" height={240}>
            <PieChart>
                <Pie
                    data={data} dataKey="count" nameKey="_id"
                    cx="50%" cy="50%" outerRadius={85} innerRadius={45}
                    label={renderLabel} labelLine={false}
                    stroke={strokeColor} strokeWidth={2}
                >
                    {data.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
            </PieChart>
        </ResponsiveContainer>
    );
}
