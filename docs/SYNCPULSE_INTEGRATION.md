# SyncPulse Integration Guide

**Last Updated:** May 3, 2026  
**Status:** Production-Ready

---

## Overview

SyncPulse is an intelligent project state caching and multi-agent coordination system integrated into the Bitcoin Land Bond application. It provides:

- **Multi-Agent Orchestration**: Coordinate swarms of agents with 5 different topologies
- **Project State Caching**: Distribute and synchronize state across agents
- **Task Coordination**: Execute distributed tasks with priority management
- **Secure Email Automation**: Send marketing campaigns and notifications
- **Performance Analytics**: Monitor system health and efficiency

---

## Session Initialization

The SyncPulse session is automatically initialized when the application starts via the `SyncPulseProvider` component.

### Application Setup

The `_app.jsx` file wraps the entire application with the SyncPulse provider:

```jsx
import { SyncPulseProvider } from '../contexts/SyncPulseContext';

export default function App({ Component, pageProps }) {
  return (
    <SyncPulseProvider>
      <Component {...pageProps} />
    </SyncPulseProvider>
  );
}
```

### Session Lifecycle

1. **Initialization** (Component Mount)
   - Orchestration system initialized
   - Default swarms created (hierarchical, mesh, adaptive, ring, star)
   - Project state cached with 1-hour TTL
   - System ready for task execution

2. **Active** (Component Mounted)
   - Session maintains agent pools
   - Cache continuously updated
   - Tasks routed to appropriate swarms
   - Metrics collected in real-time

3. **Shutdown** (Component Unmount)
   - Cleanup routines executed
   - Cache flushed
   - Agents terminated gracefully
   - System logs exported

---

## Using the Session

### In Any React Component

```jsx
import { useSyncPulse } from '../contexts/SyncPulseContext';

export default function MyComponent() {
  const {
    session,
    isInitialized,
    isInitializing,
    error,
    swarm,
    cache,
    tasks,
    email,
    analytics,
  } = useSyncPulse();

  if (isInitializing) return <div>Initializing orchestration...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!isInitialized) return <div>Not initialized</div>;

  // Use session...
}
```

### Swarm Management

```jsx
const { swarm } = useSyncPulse();

// Create custom swarm
const mySwarm = swarm.create(
  'custom-swarm-1',
  'My Custom Swarm',
  'adaptive',
  8
);
```

### Cache/State Management

```jsx
const { cache } = useSyncPulse();

// Store state
await cache.set('my-data', { value: 'test' }, 600000); // 10min TTL

// Retrieve state
const data = await cache.get('my-data');

// Query with similarity search
const results = await cache.query('deployment status', 10);
```

### Task Execution

```jsx
const { tasks } = useSyncPulse();

const deploymentTasks = [
  {
    id: 'build',
    name: 'Build Application',
    priority: 10,
    status: 'pending',
    createdAt: Date.now(),
  },
  {
    id: 'test',
    name: 'Run Tests',
    priority: 7,
    status: 'pending',
    createdAt: Date.now(),
  },
];

// Execute across swarm
const results = await tasks.execute(deploymentTasks, 'prod-deploy-swarm');
```

### Email Automation

```jsx
const { email } = useSyncPulse();

// Send single email
await email.send({
  recipients: [{ email: 'user@example.com', name: 'User' }],
  subject: 'Deployment {{status}}',
  htmlBody: '<h1>{{status}}</h1>',
  variables: { status: 'Successful' },
});

// Send bulk campaign
await email.sendBulk({
  recipients: [
    { email: 'user1@example.com', name: 'User 1', variables: { tier: 'Gold' } },
    { email: 'user2@example.com', name: 'User 2', variables: { tier: 'Silver' } },
  ],
  subject: 'Offer for {{tier}} Members',
  htmlBody: '<p>Special offer: {{discount}}% off</p>',
  globalVariables: { discount: '20' },
});

// Send marketing campaign with tracking
await email.sendCampaign({
  campaignName: 'Q2-Launch-2026',
  recipients: campaignList,
  subject: 'Product Launch',
  htmlBody: campaignTemplate,
  trackingPixel: true,
});

// Verify email configuration
const config = await email.verify();
```

### Performance Analytics

```jsx
const { analytics } = useSyncPulse();

// Get swarm performance (1h, 24h, 7d)
const perf = analytics.performance('1h');

// Get agent metrics for specific swarm
const agents = analytics.agents('prod-deploy-swarm');

// Get cache statistics
const cacheMetrics = analytics.cache();
```

### Manual Control

```jsx
const { reinitialize, shutdown } = useSyncPulse();

// Restart session
await reinitialize();

// Graceful shutdown
await shutdown();
```

---

## Swarm Topologies

### Hierarchical (Production Deployments)
**Best for:** Tight control, anti-drift coordination
- Centralized command structure
- Master-agent relationship
- Strong consistency guarantees
- Used for production deployments

```js
swarm.create(id, name, 'hierarchical', 5-7);
```

### Mesh (Distributed Tasks)
**Best for:** Independent parallel processing
- Peer-to-peer connections
- Distributed responsibility
- Better fault tolerance
- Used for campaign distribution

```js
swarm.create(id, name, 'mesh', 5-15);
```

### Adaptive (Variable Workloads)
**Best for:** Elastic scaling, unpredictable loads
- Auto-scales between 5-15 agents
- Dynamic topology reconfiguration
- Load-based agent allocation
- Used for metrics collection, elastic processing

```js
swarm.create(id, name, 'adaptive', 5-15);
```

### Ring (Sequential Workflows)
**Best for:** Pipeline execution, sequential dependencies
- Linear task flow
- Sequential processing guarantee
- Lower latency for dependent tasks
- Used for CI/CD pipelines

```js
swarm.create(id, name, 'ring', 3-7);
```

### Star (Hub-and-Spoke)
**Best for:** Simple coordination, centralized control
- Single coordinator with spokes
- Simple topology
- Easy to monitor and debug
- Used for simple routing

```js
swarm.create(id, name, 'star', 3-7);
```

---

## Email Configuration

### Environment Variables

Set these in `.env.local`:

```bash
MAIL_HOST=smtp.vln.gg
MAIL_PORT=587
MAIL_USER=test@mail.vln.gg
MAIL_PASS=your-app-password
MAIL_FROM=noreply@formerlyincarcerated.org
```

### Campaign Templates

Pre-configured templates available in `orchestration.config.js`:

1. **DEPLOYMENT_NOTIFICATION** - Deployment status updates
2. **IMPACT_MILESTONE** - Impact achievement announcements
3. **GOVERNANCE_UPDATE** - Board updates and decisions
4. **PARTNER_INVITATION** - Partner recruitment campaigns

### Variable Interpolation

Use double-curly-braces for template variables:

```html
<h1>Hello {{name}}</h1>
<p>You have {{itemCount}} items</p>
```

Variables are provided per-recipient or globally:

```jsx
// Per-recipient
recipients: [
  { email: 'user@example.com', variables: { name: 'John' } },
]

// Global (applied to all)
globalVariables: { siteUrl: 'https://formerlyincarcerated.org' }
```

---

## Cache Configuration

### Pre-configured Cache Keys

| Key | TTL | Purpose |
|-----|-----|---------|
| `bitcoin-land-bond:state` | 1h | Project state |
| `bitcoin-land-bond:deployments` | 24h | Deployment history |
| `bitcoin-land-bond:metrics` | 30min | Impact metrics |
| `bitcoin-land-bond:governance` | 7d | Governance records |
| `bitcoin-land-bond:partners` | 30d | Partner data |

### Custom Cache Usage

```jsx
const { cache } = useSyncPulse();

// Set with custom key and TTL
await cache.set(
  'custom:key',
  { data: 'value' },
  3600000 // 1 hour in milliseconds
);

// Get by key
const data = await cache.get('custom:key');

// Query with text search
const results = await cache.query('deployment', 5);
```

---

## Task Priority Levels

| Level | Value | Usage |
|-------|-------|-------|
| CRITICAL | 10 | Urgent system tasks |
| HIGH | 7 | Important operations |
| NORMAL | 5 | Standard tasks |
| LOW | 2 | Background work |

---

## Error Handling

### Session Initialization Errors

```jsx
const { error, isInitialized } = useSyncPulse();

if (error) {
  console.error('Session error:', error);
  // Fallback behavior
}
```

### Task Execution Errors

```jsx
try {
  const results = await tasks.execute(taskList, swarmId);
} catch (error) {
  console.error('Task execution failed:', error);
  // Retry logic or fallback
}
```

### Email Delivery Errors

```jsx
try {
  await email.send(emailOptions);
} catch (error) {
  console.error('Email delivery failed:', error);
  // Queue for retry or log to system
}
```

---

## Performance Monitoring

### Check Session Health

```jsx
const { analytics } = useSyncPulse();

// Get metrics for last hour
const health = analytics.performance('1h');

console.log({
  swarmHealth: health.swarmStatus,
  agentUtilization: health.agentMetrics,
  taskThroughput: health.taskMetrics,
  cachePerfomance: health.cacheMetrics,
});
```

### Monitor Agent Utilization

```jsx
const agents = analytics.agents('prod-deploy-swarm');

agents.forEach(agent => {
  console.log(`${agent.id}: ${agent.utilization}% busy`);
});
```

---

## Development & Debugging

### Enable Debug Logging

In development mode, detailed logs are output to console:

```js
// In development, useSyncPulseSession logs to console
if (process.env.NODE_ENV === 'development') {
  console.log('✓ SyncPulse Session Initialized');
}
```

### Session State Inspection

```jsx
const { session } = useSyncPulse();

// Access raw orchestration object
console.log(session.skill.tools); // All available tools
console.log(session.email); // Email service
console.log(session.cache); // Cache service
```

---

## Example: Complete Integration

Here's a complete example component using SyncPulse:

```jsx
import React, { useState } from 'react';
import { useSyncPulse } from '../contexts/SyncPulseContext';

export default function DeploymentDashboard() {
  const { tasks, email, analytics, isInitialized, error } = useSyncPulse();
  const [deploymentStatus, setDeploymentStatus] = useState('idle');

  if (error) return <div>Session Error: {error}</div>;
  if (!isInitialized) return <div>Loading...</div>;

  const handleDeploy = async () => {
    try {
      setDeploymentStatus('deploying');

      // Execute deployment tasks
      const taskResults = await tasks.execute(
        [
          {
            id: 'pre-check',
            name: 'Pre-deployment Checks',
            priority: 10,
            status: 'pending',
            createdAt: Date.now(),
          },
          {
            id: 'deploy',
            name: 'Deploy Application',
            priority: 10,
            status: 'pending',
            createdAt: Date.now(),
          },
        ],
        'prod-deploy-swarm'
      );

      // Send notification
      await email.send({
        recipients: [{ email: 'team@example.com', name: 'Team' }],
        subject: 'Deployment Successful',
        htmlBody: '<h1>✓ Deployment Complete</h1>',
      });

      // Get performance metrics
      const metrics = analytics.performance('1h');

      setDeploymentStatus('success');
    } catch (err) {
      console.error('Deployment failed:', err);
      setDeploymentStatus('error');
    }
  };

  return (
    <div>
      <h1>Deployment Dashboard</h1>
      <p>Status: {deploymentStatus}</p>
      <button onClick={handleDeploy} disabled={deploymentStatus !== 'idle'}>
        Start Deployment
      </button>
    </div>
  );
}
```

---

## Best Practices

1. **Check Initialization** - Always verify `isInitialized` before using session
2. **Error Handling** - Wrap session calls in try-catch blocks
3. **Cache TTLs** - Set appropriate TTLs based on data freshness needs
4. **Task Priorities** - Use CRITICAL only for urgent operations
5. **Email Templates** - Use pre-configured templates for consistency
6. **Monitoring** - Regularly check analytics for system health
7. **Cleanup** - Call `shutdown()` before app teardown if needed

---

## Troubleshooting

### Session Not Initializing

1. Check that `SyncPulseProvider` wraps the app
2. Verify dependencies are installed: `npm list @h4shed/skill-syncpulse`
3. Check browser console for errors
4. Restart development server

### Email Not Sending

1. Verify environment variables in `.env.local`
2. Check email configuration: `await email.verify()`
3. Test with simple email first
4. Check spam folder
5. Review SMTP logs

### Cache Operations Slow

1. Check cache hit rates: `analytics.cache()`
2. Reduce cache TTLs for less critical data
3. Query cache efficiently with limit parameter
4. Monitor cache size with `analytics.cache()`

### Tasks Not Executing

1. Verify swarm exists and is healthy
2. Check task priority levels
3. Review task status: `tasks.status(taskId)`
4. Check agent utilization: `analytics.agents(swarmId)`
5. Review orchestration logs

---

## API Reference

See `lib/orchestration.js` and `orchestration.config.js` for complete API documentation.

---

**Bitcoin Land Bond** | SyncPulse Integration | May 2026

For more information, see:
- `lib/orchestration.js` - Core implementation
- `orchestration.config.js` - Configuration
- `examples/orchestration-example.js` - Usage examples
- `hooks/useSyncPulseSession.js` - Hook implementation
- `contexts/SyncPulseContext.jsx` - Context provider
