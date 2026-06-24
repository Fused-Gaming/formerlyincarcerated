# Authentication & Authorization - Bitcoin Land Bond

## JWT Token Management

### Token Structure
```
Header: { alg: "HS256", typ: "JWT" }
Payload: {
  sub: user_id,
  email: user_email,
  role: "admin|case_manager|finance|viewer",
  iat: issued_at,
  exp: expiration_time
}
Signature: HMAC-SHA256(secret)
```

### Token Lifecycle
- **Access Token:** 7 days (configurable via JWT_EXPIRE)
- **Refresh Token:** 30 days (stored in HttpOnly cookie)
- **Rotation:** Refresh endpoint issues new token pair

### Endpoints
```
POST /auth/login
  Body: { email, password }
  Returns: { accessToken, refreshToken, expiresIn }

POST /auth/refresh
  Headers: { Authorization: "Bearer <refreshToken>" }
  Returns: { accessToken, expiresIn }

POST /auth/logout
  Headers: { Authorization: "Bearer <accessToken>" }
  Returns: { success: true }
```

## Role-Based Access Control (RBAC)

### Roles & Permissions

| Role | Residents | Properties | Allocations | Outcomes | Admin |
|------|-----------|-----------|-------------|----------|-------|
| **Admin** | Full | Full | Full | Full | Full |
| **Case Manager** | Create/View own | View | Propose | Submit | None |
| **Finance** | View | View | Full | View | None |
| **Viewer** | View | View | View | View | None |

### Middleware
```javascript
// Protect route with auth + role check
app.post('/allocations',
  authenticate,
  authorize(['admin', 'finance']),
  createAllocationController
);
```

### User Creation (Admin Only)
```
POST /admin/users
  Body: { email, role, name }
  Creates user with temporary password
```

## Dignifi API Authentication

### Integration
```env
DIGNIFI_API_KEY="your-api-key"
DIGNIFI_API_URL="https://api.dignifi.com"
```

### Verification Flow
1. Case manager initiates: `POST /residents/:id/verify`
2. Backend calls Dignifi API with resident data
3. Returns verification status + Dignifi ID
4. Hash Dignifi ID before storing (never plain text)

### Hash Storage
```javascript
const dignifiHash = hashFunction(dignifiId);
await db.residents.create({
  dignifi_id_hash: dignifiHash,
  // ... other fields
});
```

## Rate Limiting & API Keys

### Rate Limits (Middleware)
- **Per User:** 100 requests/minute
- **Per IP:** 1000 requests/minute
- **Global:** 10,000 requests/minute

```
Returns 429 with header:
Retry-After: 60
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1687891234
```

### API Key Management
Generate keys for service-to-service calls:

```
POST /admin/api-keys
  Body: { name: "Finance System" }
  Returns: { key: "blb_sk_abc123xyz..." }

Authorization: ApiKey blb_sk_abc123xyz...
```

Keys rotated every 90 days.

## Security Best Practices

### Password Requirements
- Minimum 12 characters
- 1 uppercase, 1 lowercase, 1 number, 1 special char
- Hashed with bcrypt (cost=12)

### Audit Logging
Every user action logged to `audit_log` table:
- User ID, timestamp, action, entity, changes
- Retained for 7 years (CORI requirements)

### HTTPS & TLS
- Required in production
- HSTS header: `Strict-Transport-Security: max-age=31536000`

### CORS
Allowed origins (config):
```
CORS_ORIGINS="https://formerlyincarcerated.org,https://admin.formerlyincarcerated.org"
```

### Session Management
- No server-side sessions (stateless JWT)
- Logout: Add token to blacklist (Redis, 7 days)
- Concurrent login: Only latest token valid

## Integration Checklist
- [ ] Generate JWT_SECRET (32+ char random string)
- [ ] Configure Dignifi API credentials
- [ ] Set CORS_ORIGINS for frontend domain
- [ ] Enable HTTPS in production
- [ ] Configure rate limiting thresholds
- [ ] Set up audit log retention policy
- [ ] Create default admin user (CLI tool)
- [ ] Test token refresh flow
