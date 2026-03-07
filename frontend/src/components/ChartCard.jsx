export default function ChartCard({ title, action, children, style }) {
    return (
        <div className="card" style={{ borderRadius: '12px', overflow: 'hidden', ...style }}>
            <div style={{
                padding: '20px 24px 0', display: 'flex',
                alignItems: 'center', justifyContent: 'space-between',
            }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>{title}</h3>
                {action && <div>{action}</div>}
            </div>
            <div style={{ padding: '16px 24px 24px' }}>
                {children}
            </div>
        </div>
    );
}
