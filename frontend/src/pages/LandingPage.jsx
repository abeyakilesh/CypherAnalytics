import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Shield, ArrowRight, Activity, Lock, BarChart3, Zap, Globe, Eye, Sun, Moon } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

export default function LandingPage() {
    const navigate = useNavigate();
    const { theme, toggle } = useTheme();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const features = [
        { icon: Activity, title: 'Real-Time Monitoring', desc: 'Stream and analyze transactions in real-time with sub-second latency.' },
        { icon: Lock, title: 'Privacy Protection', desc: 'AES-256 encryption with role-based data masking.' },
        { icon: BarChart3, title: 'Fraud Detection', desc: 'AI-driven risk scoring identifies suspicious patterns instantly.' },
        { icon: Zap, title: 'Lightning Fast', desc: 'Process thousands of transactions per second without delay.' },
        { icon: Globe, title: 'Global Coverage', desc: 'Monitor transactions across multiple regions and currencies.' },
        { icon: Eye, title: 'Smart Analytics', desc: 'Comprehensive dashboards with actionable insights.' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', transition: 'background 0.3s, color 0.3s' }}>
            <AnimatedBackground />

            {/* ── Sticky Nav ── */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                padding: '16px 40px',
                background: scrolled ? 'var(--bg-card)' : 'transparent',
                borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                transition: 'all 0.3s',
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Shield style={{ width: 16, height: 16, color: 'white' }} />
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-heading)' }}>CypherAnalytics</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Link to="/login" style={{
                            fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)',
                            textDecoration: 'none', transition: 'color 0.15s',
                        }}>Sign In</Link>
                        <Link to="/login" style={{
                            fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)',
                            textDecoration: 'none', transition: 'color 0.15s',
                        }}>Sign In</Link>
                        <button className="btn-primary" onClick={() => navigate('/signup')}
                            style={{ fontSize: '13px', padding: '8px 18px' }}>
                            Get Started <ArrowRight style={{ width: 14, height: 14, marginLeft: '4px', display: 'inline' }} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Hero ── */}
            <section style={{
                textAlign: 'center', padding: '160px 40px 80px',
                maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1,
            }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'var(--primary-light)', border: '1px solid var(--border)',
                    borderRadius: '9999px', padding: '6px 16px', marginBottom: '24px',
                }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--primary)' }}>Now in Beta</span>
                </div>
                <h1 style={{
                    fontSize: '56px', fontWeight: 800, lineHeight: 1.1,
                    letterSpacing: '-0.03em', color: 'var(--text-heading)',
                    marginBottom: '20px',
                }}>
                    Privacy-First<br />Transaction Intelligence
                </h1>
                <p style={{
                    fontSize: '18px', lineHeight: 1.7, color: 'var(--text-secondary)',
                    maxWidth: '580px', margin: '0 auto 40px',
                }}>
                    Enterprise-grade real-time transaction monitoring with AI-driven privacy
                    protection and fraud detection.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                    <button className="btn-primary" onClick={() => navigate('/signup')}
                        style={{ padding: '12px 32px', fontSize: '15px' }}>
                        Get Started <ArrowRight style={{ width: 16, height: 16, marginLeft: '6px', display: 'inline', verticalAlign: '-3px' }} />
                    </button>
                </div>
            </section>

            {/* ── Stats Bar ── */}
            <div style={{
                maxWidth: '900px', margin: '0 auto 80px',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: '16px', padding: '32px 0',
                boxShadow: 'var(--shadow-card)',
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                position: 'relative', zIndex: 1,
            }}>
                {[
                    { stat: '10K+', label: 'Transactions / sec' },
                    { stat: 'AES-256', label: 'Encryption' },
                    { stat: '99.97%', label: 'Uptime SLA' },
                    { stat: '<50ms', label: 'Alert Latency' },
                ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-heading)' }}>{s.stat}</p>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{s.label}</p>
                    </div>
                ))}
            </div>

            {/* ── Features ── */}
            <section style={{
                maxWidth: '1100px', margin: '0 auto 100px', padding: '0 40px',
                position: 'relative', zIndex: 1,
            }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>
                        Everything you need
                    </h2>
                    <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                        Built for enterprise fintech teams
                    </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {features.map((f, i) => (
                        <div key={i} className="card card-hover" style={{ padding: '28px', borderRadius: '12px' }}>
                            <div style={{
                                width: '44px', height: '44px', borderRadius: '10px',
                                background: 'var(--primary-light)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '16px',
                            }}>
                                <f.icon style={{ width: 20, height: 20, color: 'var(--primary)' }} />
                            </div>
                            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '8px' }}>{f.title}</h3>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{
                textAlign: 'center', padding: '64px 40px',
                borderTop: '1px solid var(--border)',
                background: 'var(--bg-card)', position: 'relative', zIndex: 1,
            }}>
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '12px', letterSpacing: '-0.02em' }}>
                    Ready to get started?
                </h2>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
                    Deploy in minutes. No infrastructure changes required.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                    <button className="btn-primary" onClick={() => navigate('/signup')}
                        style={{ padding: '12px 32px', fontSize: '15px' }}>
                        Start Free Trial
                    </button>
                </div>
            </section>

            <footer style={{ padding: '24px 40px', borderTop: '1px solid var(--border)', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>© {new Date().getFullYear()} CypherAnalytics. All rights reserved.</p>
            </footer>
        </div>
    );
}
