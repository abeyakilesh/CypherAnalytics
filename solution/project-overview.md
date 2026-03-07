# Project Overview

## Privacy-Preserving Real-Time FinTech Intelligence Platform

### What This Platform Does
This platform is an enterprise-grade **real-time financial transaction monitoring system** that enables financial institutions to analyze transactions for fraud and anomalies **without exposing sensitive customer information** in the user interface.

Every second, the system simulates realistic financial transactions flowing through a pipeline that:
1. **Generates** transactions with varied patterns (normal purchases, high-value transfers, cross-border payments)
2. **Encrypts** sensitive fields (account numbers, user names) with AES-256-CBC before database storage
3. **Analyzes** each transaction through a multi-factor risk detection engine
4. **Masks** all personally identifiable information before displaying in the dashboard
5. **Streams** processed data to connected clients via WebSocket in real time

### How Real-Time Transaction Monitoring Works
The system uses a **pipeline architecture** where each transaction flows through multiple processing stages:

- **Transaction Generator**: Creates realistic transactions every 1–2 seconds with a 15% chance of generating suspicious patterns (large amounts, risky locations, rapid repeats)
- **Risk Detection Engine**: Scores each transaction 0–100 based on amount thresholds, merchant risk, location risk, transaction velocity, and location velocity anomalies
- **WebSocket Broadcasting**: Pushes processed transactions to all connected dashboard clients instantly, enabling true real-time monitoring without polling

### How Privacy Protection Is Integrated
Privacy is built into every layer of the system:

| Layer | Protection |
|-------|-----------|
| **Storage** | AES-256-CBC encryption on `accountNumber` and `userName` before MongoDB storage |
| **API Transit** | Role-based masking: Admin sees encrypted data, Analyst sees masked data, Viewer sees redacted data |
| **Dashboard Display** | Account numbers shown as `XXXX-XXXX-XXXX-2391`, usernames as `User_1001` |
| **Access Control** | Three-tier RBAC ensures each role sees only appropriate data |
| **Explainability** | Every field classification is documented with reasons and protection methods |

The platform achieves a **Privacy Score of 92%+** with all sensitive fields encrypted and masked, exposure risk rated as **Low**, and full compliance status.
