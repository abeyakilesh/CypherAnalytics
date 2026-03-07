# Workflow

## End-to-End Data Flow

### Step 1: Transaction Generated
The transaction generator creates a new financial transaction every 1–2 seconds with realistic attributes:
- **User**: Randomly selected from a pool of 10 simulated users
- **Amount**: Normal range ($5–$500) or suspicious range ($5,000–$25,000)
- **Merchant**: From a pool including normal retailers and high-risk entities
- **Location**: US cities for normal transactions, international for suspicious ones
- **Probability**: ~15% chance of generating a suspicious transaction pattern

```
Output: Raw transaction with userID, userName, accountNumber, amount, merchant, location, timestamp
```

### Step 2: Risk Detection
The risk engine analyzes each transaction against 5 independent factors:
1. **Amount Analysis**: Is the amount above $5,000? (0–35 risk points)
2. **Merchant Risk**: Is the merchant in the suspicious category? (+20 points)
3. **Location Risk**: Is the location in a high-risk jurisdiction? (+20 points)
4. **Transaction Velocity**: Multiple transactions within 60 seconds? (+15 points)
5. **Location Velocity**: Impossible location change detected? (+15 points)

```
Output: riskScore (0–100), status (normal/suspicious), riskFactors[]
```

### Step 3: Encrypted Storage
Before saving to MongoDB, the encryption service processes the transaction:
- `accountNumber` → AES-256-CBC encrypted hex string
- `userName` → AES-256-CBC encrypted hex string
- All other fields stored as plaintext (safe fields per classification)

```
Output: Transaction document saved to MongoDB with encrypted sensitive fields
```

### Step 4: Sensitive Data Detection
The AI classifier evaluates every field in the transaction schema:
- **Sensitive**: `accountNumber`, `userName` → require encryption + masking
- **Semi-sensitive**: `location`, `userID` → require pseudonymization
- **Safe**: `amount`, `merchant`, `timestamp`, `riskScore`, `status` → no protection needed

This classification drives the privacy score calculation and explainable privacy layer.

### Step 5: Privacy Protection
Before any data reaches the frontend, the privacy service applies role-based masking:
- **Account Number**: `4532-8891-0023-2391` → `XXXX-XXXX-XXXX-2391`
- **User Name**: `Alice Johnson` → `User_1001`
- Role determines the masking level (Admin/Analyst/Viewer)

```
Output: Privacy-masked transaction safe for dashboard display
```

### Step 6: Dashboard Visualization
The masked transaction is broadcast via WebSocket to all connected React clients:
1. **Live Transaction Feed** updates with new row (animated entry)
2. **KPI Cards** update counts and aggregates
3. **Charts** refresh with latest data points
4. If `riskScore > 70`, a **Fraud Alert** fires with highlighted card
5. The **Privacy Score** remains visible, confirming all protections are active

```
Final Output: Enterprise dashboard displaying real-time financial intelligence with zero PII exposure
```

## Data Flow Diagram

```
[Generator] → Raw Transaction
                    ↓
            [Risk Engine] → riskScore + status
                    ↓
          [Encryption Service] → Encrypted sensitive fields
                    ↓
             [MongoDB] → Encrypted storage
                    ↓
          [Privacy Service] → Masked for role
                    ↓
           [WebSocket] → Real-time broadcast
                    ↓
         [React Dashboard] → Visual display (no PII)
```
