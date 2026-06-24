# Bitcoin Land Bond - API Specification

## Overview
RESTful API for managing residents, properties, capital allocations, and outcomes. All endpoints require JWT authentication except `/auth/login` and `/health`.

## Core Endpoints (v1)

### Authentication
- `POST /auth/login` - Login with email/password
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - Invalidate token

### Residents
- `POST /residents` - Enroll new resident (case manager only)
- `GET /residents` - List residents (paginated, filterable by city/status)
- `GET /residents/:id` - Retrieve resident profile
- `PATCH /residents/:id` - Update resident info
- `POST /residents/:id/verify` - Verify Dignifi ID
- `GET /residents/:id/audit` - Access audit log

### Properties
- `POST /properties` - Register property (admin only)
- `GET /properties` - List properties (filterable by city/status/program)
- `GET /properties/:id` - Retrieve property details
- `PATCH /properties/:id` - Update property (admin)
- `POST /properties/:id/assign` - Assign to resident
- `DELETE /properties/:id/assign` - Unassign resident

### Capital Allocations
- `POST /allocations` - Create allocation (finance team)
- `GET /allocations` - List allocations (filterable by resident/status)
- `GET /allocations/:id` - Retrieve allocation details
- `PATCH /allocations/:id` - Update allocation status
- `POST /allocations/:id/disburse` - Disburse funds
- `GET /allocations/:id/transactions` - Transaction history

### Outcomes
- `GET /outcomes` - Retrieve metrics dashboard
- `POST /outcomes/quarterly` - Submit quarterly report
- `GET /outcomes/:resident_id` - Resident outcome history
- `GET /outcomes/report` - Generate aggregate report

### Admin
- `POST /admin/cases` - Create case record
- `GET /admin/cases` - List all cases
- `PATCH /admin/access/:user_id` - Manage user permissions
- `GET /admin/audit-log` - Full system audit trail

## Response Format
```json
{
  "success": true,
  "data": {...},
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  },
  "timestamp": "2026-06-24T10:00:00Z"
}
```

## Error Codes
- `400` - Validation error
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not found
- `409` - Conflict (duplicate)
- `429` - Rate limited
- `500` - Server error

## Rate Limiting
- 100 req/min per user
- 1000 req/min per IP
- Returns `Retry-After` header
