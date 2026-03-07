# System Architecture

## Architecture Pipeline

```
┌─────────────────────────────────┐
│      React Dashboard (UI)       │
│   Charts · Tables · Alerts      │
│   Tailwind CSS · Recharts       │
└──────────────┬──────────────────┘
               │ WebSocket (Socket.io)
               │ REST API (Express)
┌──────────────┴──────────────────┐
│      Node.js API Server         │
│   Express · CORS · Routes       │
├─────────────────────────────────┤
│    Role-Based Access Control    │
│   Admin · Analyst · Viewer      │
├─────────────────────────────────┤
│    Privacy Protection Layer     │
│   Masking · Anonymization       │
├─────────────────────────────────┤
│   AI Sensitive Data Detector    │
│   Classification · Scoring      │
├─────────────────────────────────┤
│     Risk Detection Engine       │
│   Multi-factor Analysis         │
├─────────────────────────────────┤
│    AES-256-CBC Encryption       │
│   Encrypt · Decrypt             │
├─────────────────────────────────┤
│   Transaction Generator         │
│   Normal + Suspicious Patterns  │
└──────────────┬──────────────────┘
               │
┌──────────────┴──────────────────┐
│     MongoDB Database            │
│   Encrypted Data at Rest        │
└─────────────────────────────────┘
```

## Component Details

### Frontend (React + Tailwind CSS)
- **Layout**: Sidebar navigation + header bar with status indicators
- **Dashboard**: KPI cards, live transaction feed, fraud alert panel, analytics charts
- **Live Transactions**: Full table with real-time WebSocket updates
- **Fraud Alerts**: Filtered view of high-risk transactions (riskScore > 70)
- **Analytics**: Volume trends, risk distribution, top merchants, location breakdown
- **Data Explorer**: Privacy classifications, protection scores, explainable privacy
- **Settings**: Role selector, system status, access control matrix

### Backend (Node.js + Express)
- **server.js**: HTTP server, WebSocket server, transaction generation loop
- **Controllers**: Request handlers with role-based data filtering
- **Routes**: RESTful API endpoints (`/api/transactions`, `/api/alerts`, `/api/analytics`, `/api/privacy`, `/api/settings`)
- **Middleware**: RBAC authentication with three access tiers

### Services Layer
| Service | Responsibility |
|---------|---------------|
| `encryptionService.js` | AES-256-CBC encrypt/decrypt for sensitive fields |
| `transactionGenerator.js` | Simulates realistic financial transactions (1–2s interval) |
| `sensitiveDataDetector.js` | AI field classification (sensitive/semi-sensitive/safe) |
| `privacyService.js` | Data masking and anonymization by role |
| `riskEngine.js` | Multi-factor risk scoring (0–100) |

### Database (MongoDB)
- **Collection**: `transactions`
- **Encrypted Fields**: `accountNumber`, `userName` (AES-256-CBC)
- **Indexes**: `timestamp`, `status`, `riskScore` for query performance
