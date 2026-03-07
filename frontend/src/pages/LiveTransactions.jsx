import { useState } from 'react';
import { Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const PAGE_SIZE = 15;

export default function LiveTransactions({ transactions }) {
    const [page, setPage] = useState(0);
    const { formatCurrency } = useCurrency();
    const totalPages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE));
    const paginated = transactions.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>Transactions</h1>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>Live feed with privacy masking · {transactions.length} total</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--success-text)' }}>Streaming</span>
                </div>
            </div>

            <div className="card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '960px' }}>
                        <thead>
                            <tr>
                                {['Status', 'User ID', 'Masked Account', 'Amount', 'Merchant', 'Location', 'Timestamp', 'Risk Score'].map((h) => (
                                    <th key={h} style={{
                                        padding: '12px 20px', fontSize: '12px', fontWeight: 600,
                                        color: 'var(--text-secondary)', textAlign: h === 'Amount' ? 'right' : h === 'Risk Score' ? 'center' : 'left',
                                        background: 'var(--bg-table-head)', borderBottom: '1px solid var(--border)',
                                        whiteSpace: 'nowrap',
                                    }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((tx, i) => (
                                <tr key={tx.transactionID || i} className="table-row" style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '12px 20px' }}>
                                        <span className={`badge ${tx.status === 'suspicious' ? 'badge-danger' : 'badge-success'}`}>
                                            {tx.status === 'suspicious' ? 'Suspicious' : 'Normal'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 20px', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{tx.userName || tx.userID}</td>
                                    <td style={{ padding: '12px 20px', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{tx.accountNumber}</td>
                                    <td style={{ padding: '12px 20px', fontSize: '14px', fontWeight: 600, color: 'var(--text)', textAlign: 'right' }}>{formatCurrency(tx.amount)}</td>
                                    <td style={{ padding: '12px 20px', fontSize: '14px', color: 'var(--text)' }}>{tx.merchant}</td>
                                    <td style={{ padding: '12px 20px', fontSize: '14px', color: 'var(--text-secondary)' }}>{tx.location}</td>
                                    <td style={{ padding: '12px 20px', fontSize: '12px', color: 'var(--text-muted)' }}>{new Date(tx.timestamp).toLocaleTimeString()}</td>
                                    <td style={{ padding: '12px 20px', textAlign: 'center' }}>
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
                    <div style={{ padding: '64px 24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                        <Activity style={{ width: 24, height: 24, margin: '0 auto 8px', color: 'var(--border)' }} />
                        Waiting for transactions...
                    </div>
                )}

                {transactions.length > PAGE_SIZE && (
                    <div style={{
                        padding: '12px 24px', borderTop: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        background: 'var(--bg-table-head)',
                    }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                            Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, transactions.length)} of {transactions.length}
                        </span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}
                                className="btn-secondary" style={{
                                    padding: '6px 12px', fontSize: '13px',
                                    cursor: page === 0 ? 'not-allowed' : 'pointer',
                                    opacity: page === 0 ? 0.4 : 1,
                                    display: 'flex', alignItems: 'center', gap: '4px',
                                }}>
                                <ChevronLeft style={{ width: 14, height: 14 }} /> Prev
                            </button>
                            <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1}
                                className="btn-secondary" style={{
                                    padding: '6px 12px', fontSize: '13px',
                                    cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer',
                                    opacity: page >= totalPages - 1 ? 0.4 : 1,
                                    display: 'flex', alignItems: 'center', gap: '4px',
                                }}>
                                Next <ChevronRight style={{ width: 14, height: 14 }} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
