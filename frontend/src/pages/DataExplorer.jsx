import { useState } from 'react';
import { Shield, TrendingUp, Activity, Network, AlertTriangle, Lock, Eye, CheckCircle, Clock, MapPin, Users, DollarSign, Database, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

function ProgressBar({ label, value, max = 100, color = 'var(--primary)' }) {
    const pct = Math.round((value / max) * 100);
    return (
        <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>{label}</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)' }}>{pct}%</span>
            </div>
            <div style={{ height: '6px', background: 'var(--border-light)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                    width: `${pct}%`, height: '100%', background: color,
                    borderRadius: '3px', transition: 'width 0.6s ease',
                }} />
            </div>
        </div>
    );
}

const InsightCard = ({ title, icon: Icon, color, children, extendedContent }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div
            className={`card animate-fade-in ${isExpanded ? 'ring-2' : ''}`}
            style={{
                borderRadius: '12px',
                overflow: 'hidden',
                height: isExpanded ? 'auto' : '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                ...(isExpanded ? { ringColor: color, boxShadow: `0 0 0 1px ${color}33`, gridRow: 'span 2' } : {})
            }}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: isExpanded ? 'var(--bg-card)' : 'transparent' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '8px',
                        background: `color-mix(in srgb, ${color} 15%, transparent)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: color
                    }}>
                        <Icon size={18} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-heading)' }}>{title}</h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{isExpanded ? 'Click to collapse' : 'Click to expand details'}</p>
                    </div>
                </div>
                <div style={{ color: 'var(--text-muted)', background: 'var(--bg)', padding: '6px', borderRadius: '6px' }}>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
            </div>
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {children}
                {isExpanded && (
                    <div className="animate-fade-in" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                        {extendedContent}
                    </div>
                )}
            </div>
        </div>
    );
};


const Metric = ({ label, value, subtext, highlightColor }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</p>
            {subtext && <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{subtext}</p>}
        </div>
        <p style={{ fontSize: '15px', fontWeight: 700, color: highlightColor || 'var(--text)' }}>{value}</p>
    </div>
);

export default function DataExplorer() {
    const { formatCurrency } = useCurrency();

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '40px' }}>
            <div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>Insights</h1>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Click on any intelligence card to expand and view deep analytical insights.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px', alignItems: 'start' }}>

                {/* 1. Privacy Intelligence Insights */}
                <InsightCard
                    title="Privacy Intelligence" icon={Shield} color="var(--success)"
                    extendedContent={
                        <>
                            <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '12px' }}>Protected Fields Inventory</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Card Numbers</span>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--success-text)' }}>AES-256 Masked</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>User Names</span>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--success-text)' }}>Anonymized</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>IP Addresses</span>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--success-text)' }}>SHA-256 Hash</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Location Data</span>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--warning-text)' }}>Aggregated</span>
                                </div>
                            </div>
                        </>
                    }
                >
                    <Metric label="Privacy Protection Score" value="98%" highlightColor="var(--success)" />
                    <Metric label="Sensitive Identifiers Masked" value="100%" />
                    <Metric label="Unprotected Fields Exposing PII" value="0" highlightColor="var(--success)" />
                    <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px dotted var(--border)' }}>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Lock size={14} /> Full field-level encryption active on Name, SSN, and Account data.
                        </p>
                    </div>
                </InsightCard>

                {/* 2. Financial Behavior Insights */}
                <InsightCard
                    title="Financial Behavior" icon={TrendingUp} color="var(--primary)"
                    extendedContent={
                        <>
                            <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '16px' }}>Category Breakdown (Last 30 Days)</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <ProgressBar label="Food & Dining" value={35} color="var(--primary)" />
                                <ProgressBar label="Retail & Shopping" value={28} color="var(--info)" />
                                <ProgressBar label="Travel & Transportation" value={20} color="var(--accent)" />
                                <ProgressBar label="Subscriptions & Digital" value={17} color="var(--warning)" />
                            </div>
                        </>
                    }
                >
                    <Metric label="Peak Transaction Period" value="7 PM – 9 PM" />
                    <Metric label="Top Merchant Category" value="Food & Dining" />
                    <Metric label="Average Transaction Amount" value={formatCurrency(75.50)} />
                    <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px dotted var(--border)' }}>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <DollarSign size={14} /> 12% increase in dining expenses compared to last week.
                        </p>
                    </div>
                </InsightCard>

                {/* 3. System Performance Insights */}
                <InsightCard
                    title="System Performance" icon={Activity} color="var(--accent)"
                    extendedContent={
                        <>
                            <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '12px' }}>Latency Percentiles (Real-time)</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
                                <div style={{ padding: '16px 12px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>p50 (Median)</p>
                                    <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginTop: '6px' }}>24ms</p>
                                </div>
                                <div style={{ padding: '16px 12px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>p90</p>
                                    <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginTop: '6px' }}>48ms</p>
                                </div>
                                <div style={{ padding: '16px 12px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>p99</p>
                                    <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--warning-text)', marginTop: '6px' }}>112ms</p>
                                </div>
                            </div>
                        </>
                    }
                >
                    <Metric label="Transaction Processing Rate" value="1,240 / sec" />
                    <Metric label="Average Processing Latency" value="42ms" />
                    <Metric label="Fraud Detection Response" value="0.15s" />
                    <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px dotted var(--border)' }}>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Zap size={14} /> Platform operating at high efficiency. No bottlenecks detected.
                        </p>
                    </div>
                </InsightCard>

                {/* 4. Transaction Network Intelligence */}
                <InsightCard
                    title="Network Intelligence" icon={Network} color="#8b5cf6"
                    extendedContent={
                        <>
                            <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '12px' }}>Active Cluster Analysis</h4>
                            <div style={{ padding: '16px', background: 'var(--danger-light)', borderRadius: '8px', border: '1px solid var(--danger-border, rgba(239, 68, 68, 0.2))' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--danger-text)' }}>Cluster #C-992</p>
                                    <span className="badge badge-danger">High Severity</span>
                                </div>
                                <ul style={{ fontSize: '13px', color: 'var(--danger-text)', paddingLeft: '20px', margin: 0, opacity: 0.9, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <li>8 linked accounts via shared digital fingerprint.</li>
                                    <li>Sequential transactions of $49.99 across all accounts.</li>
                                    <li>Merchant: <strong>TechStore NYC</strong> (Terminal ID: 8821)</li>
                                    <li>Action Taken: Automated block applied at 19:42 UTC.</li>
                                </ul>
                            </div>
                        </>
                    }
                >
                    <Metric label="Suspicious Clusters Detected" value="1 Active" highlightColor="var(--warning)" />
                    <Metric label="Cluster Detail" value="8 users at same merchant in 10m" subtext="Merchant: TechStore NYC" />
                    <Metric label="Repeated Payment Patterns" value="Normal" />
                    <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px dotted var(--border)' }}>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Users size={14} /> Network analysis algorithm is tracking 43 active sub-networks.
                        </p>
                    </div>
                </InsightCard>

                {/* 5. Risk Intelligence */}
                <InsightCard
                    title="Risk Intelligence" icon={AlertTriangle} color="var(--danger)"
                    extendedContent={
                        <>
                            <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '12px' }}>Top Flagged Merchants (Dispute Ratio)</h4>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'left', paddingBottom: '10px', color: 'var(--text-secondary)', fontWeight: 500 }}>Merchant Name</th>
                                            <th style={{ textAlign: 'right', paddingBottom: '10px', color: 'var(--text-secondary)', fontWeight: 500 }}>Risk Score</th>
                                            <th style={{ textAlign: 'right', paddingBottom: '10px', color: 'var(--text-secondary)', fontWeight: 500 }}>Dispute Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ borderTop: '1px solid var(--border-light)' }}>
                                            <td style={{ padding: '10px 0', color: 'var(--text)', fontWeight: 500 }}>CryptoEx Direct</td>
                                            <td style={{ textAlign: 'right', padding: '10px 0', color: 'var(--danger)', fontWeight: 700 }}>94/100</td>
                                            <td style={{ textAlign: 'right', padding: '10px 0', color: 'var(--text)' }}>14.2%</td>
                                        </tr>
                                        <tr style={{ borderTop: '1px solid var(--border-light)' }}>
                                            <td style={{ padding: '10px 0', color: 'var(--text)', fontWeight: 500 }}>Global Electronics</td>
                                            <td style={{ textAlign: 'right', padding: '10px 0', color: 'var(--danger)', fontWeight: 700 }}>88/100</td>
                                            <td style={{ textAlign: 'right', padding: '10px 0', color: 'var(--text)' }}>9.8%</td>
                                        </tr>
                                        <tr style={{ borderTop: '1px solid var(--border-light)' }}>
                                            <td style={{ padding: '10px 0', color: 'var(--text)', fontWeight: 500 }}>Betting Services UK</td>
                                            <td style={{ textAlign: 'right', padding: '10px 0', color: 'var(--warning-text)', fontWeight: 700 }}>76/100</td>
                                            <td style={{ textAlign: 'right', padding: '10px 0', color: 'var(--text)' }}>5.1%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    }
                >
                    <Metric label="Highest Risk Region" value="South East Asia" highlightColor="var(--danger-text)" />
                    <Metric label="High-Risk Category" value="Electronics & Cryptos" />
                    <Metric label="Merchants w/ High Disputes" value="4 flagged" />
                    <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px dotted var(--border)' }}>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MapPin size={14} /> Regional risk model updated 2 hours ago.
                        </p>
                    </div>
                </InsightCard>

                {/* 6. Live Ecosystem Activity (Bonus as requested implicitly by the theme) */}
                <InsightCard
                    title="Live Ecosystem Activity" icon={Activity} color="var(--info)"
                    extendedContent={
                        <>
                            <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '16px' }}>Recent Audit Log Events</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', width: '60px', fontFamily: 'monospace', flexShrink: 0 }}>12:04:11</span>
                                    <span style={{ fontSize: '13px', color: 'var(--success-text)', lineHeight: 1.4 }}>Anomaly detection model re-trained successfully via federated pipeline.</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', width: '60px', fontFamily: 'monospace', flexShrink: 0 }}>12:03:45</span>
                                    <span style={{ fontSize: '13px', color: 'var(--warning-text)', lineHeight: 1.4 }}>Spike in API requests from IP block 192.168.x.x. Aggressive throttling applied.</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', width: '60px', fontFamily: 'monospace', flexShrink: 0 }}>12:01:22</span>
                                    <span style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.4 }}>Distributed privacy encryption key rotated automatically.</span>
                                </div>
                            </div>
                        </>
                    }
                >
                    <Metric label="Current Transaction Surge" value="+35%" highlightColor="var(--info-text)" />
                    <Metric label="Highest Activity Region" value="North America (East)" />
                    <Metric label="Busiest Payment Channel" value="Mobile App" />
                    <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px dotted var(--border)' }}>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Clock size={14} /> Live feed active. Metrics updating in real-time.
                        </p>
                    </div>
                </InsightCard>

            </div>
        </div>
    );
}
