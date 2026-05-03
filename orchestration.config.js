/**
 * Bitcoin Land Bond - Orchestration Configuration
 *
 * This configuration sets up multi-agent coordination for:
 * - Project state caching and synchronization
 * - Distributed task execution across agent swarms
 * - Email notifications and campaign automation
 * - Performance monitoring and analytics
 */

/**
 * Swarm Topologies for Different Use Cases
 */
export const SWARM_TOPOLOGIES = {
  // Tight control, anti-drift coordination
  PRODUCTION_DEPLOYMENT: {
    id: 'prod-deploy-swarm',
    name: 'Production Deployment Coordinator',
    topology: 'hierarchical',
    agentCount: 7,
    description: 'Manages production deployments with centralized control',
  },

  // Distributed independent tasks
  CAMPAIGN_DISTRIBUTION: {
    id: 'campaign-mesh-swarm',
    name: 'Campaign Distribution Network',
    topology: 'mesh',
    agentCount: 10,
    description: 'Distributes email campaigns across multiple agents',
  },

  // Variable workload handling
  ELASTIC_PROCESSING: {
    id: 'elastic-swarm',
    name: 'Elastic Processing Swarm',
    topology: 'adaptive',
    agentCount: 15,
    description: 'Auto-scales for variable workloads (5-15 agents)',
  },

  // Sequential workflow
  PIPELINE_EXECUTION: {
    id: 'pipeline-swarm',
    name: 'Pipeline Execution Ring',
    topology: 'ring',
    agentCount: 5,
    description: 'Executes sequential workflows in ring topology',
  },

  // Simple hub-and-spoke
  COORDINATION_HUB: {
    id: 'hub-swarm',
    name: 'Coordination Hub',
    topology: 'star',
    agentCount: 5,
    description: 'Central coordinator with spoke agents',
  },
};

/**
 * Email Campaign Templates
 */
export const EMAIL_TEMPLATES = {
  DEPLOYMENT_NOTIFICATION: {
    name: 'Deployment Notification',
    subject: 'Bitcoin Land Bond - Deployment {{status}}',
    htmlBody: `
      <div style="font-family: sans-serif; color: #333;">
        <h2 style="color: #f59e0b;">Deployment {{status}}</h2>
        <p>Version <strong>{{version}}</strong> deployed to <strong>{{environment}}</strong></p>
        <p>Deployed at: {{timestamp}}</p>
        <p>
          <a href="{{dashboardUrl}}" style="background: #f59e0b; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
            View Dashboard
          </a>
        </p>
      </div>
    `,
  },

  IMPACT_MILESTONE: {
    name: 'Impact Milestone',
    subject: '{{milestoneName}} - Bitcoin Land Bond Impact Report',
    htmlBody: `
      <div style="font-family: sans-serif; color: #333;">
        <h2 style="color: #10b981;">{{milestoneName}} Achieved! 🎉</h2>
        <p><strong>{{metric}}</strong>: {{value}}</p>
        <p>{{description}}</p>
        <div style="background: #f0fdf4; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <p><strong>Impact Summary:</strong></p>
          <ul>
            <li>{{impact1}}</li>
            <li>{{impact2}}</li>
            <li>{{impact3}}</li>
          </ul>
        </div>
      </div>
    `,
  },

  GOVERNANCE_UPDATE: {
    name: 'Governance Update',
    subject: 'Board Update - Bitcoin Land Bond Initiative',
    htmlBody: `
      <div style="font-family: sans-serif; color: #333;">
        <h2 style="color: #3b82f6;">Governance Update</h2>
        <p>Dear {{recipientName}},</p>
        <p>{{updateContent}}</p>
        <div style="background: #f0f9ff; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <p><strong>Key Decisions:</strong></p>
          <ul>
            <li>{{decision1}}</li>
            <li>{{decision2}}</li>
          </ul>
        </div>
        <p>For more information, visit <strong>{{dashboardUrl}}</strong></p>
      </div>
    `,
  },

  PARTNER_INVITATION: {
    name: 'Partner Invitation',
    subject: 'Join the Bitcoin Land Bond Initiative - {{partnerType}} Partner',
    htmlBody: `
      <div style="font-family: sans-serif; color: #333;">
        <h2 style="color: #f59e0b;">Partnership Opportunity</h2>
        <p>Dear {{organizationName}},</p>
        <p>We invite you to join the Bitcoin Land Bond initiative as a {{partnerType}} partner.</p>
        <div style="background: #fffbeb; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <p><strong>Partnership Benefits:</strong></p>
          <ul>
            <li>{{benefit1}}</li>
            <li>{{benefit2}}</li>
            <li>{{benefit3}}</li>
          </ul>
        </div>
        <p>
          <a href="{{applicationUrl}}" style="background: #f59e0b; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
            Apply Now
          </a>
        </p>
      </div>
    `,
  },
};

/**
 * Cache Keys and Default TTLs
 */
export const CACHE_CONFIG = {
  PROJECT_STATE: {
    key: 'bitcoin-land-bond:state',
    ttl: 3600000, // 1 hour
  },
  DEPLOYMENT_HISTORY: {
    key: 'bitcoin-land-bond:deployments',
    ttl: 86400000, // 24 hours
  },
  IMPACT_METRICS: {
    key: 'bitcoin-land-bond:metrics',
    ttl: 1800000, // 30 minutes
  },
  GOVERNANCE_RECORDS: {
    key: 'bitcoin-land-bond:governance',
    ttl: 604800000, // 7 days
  },
  PARTNER_DATA: {
    key: 'bitcoin-land-bond:partners',
    ttl: 2592000000, // 30 days
  },
};

/**
 * Task Priority Levels
 */
export const TASK_PRIORITIES = {
  CRITICAL: 10,
  HIGH: 7,
  NORMAL: 5,
  LOW: 2,
};

/**
 * Task Types
 */
export const TASK_TYPES = {
  // Infrastructure
  DEPLOYMENT: 'deploy',
  HEALTH_CHECK: 'health',
  BACKUP: 'backup',

  // Communication
  EMAIL_NOTIFICATION: 'email',
  BULK_CAMPAIGN: 'campaign',
  REPORT_GENERATION: 'report',

  // Data
  METRIC_COLLECTION: 'metrics',
  STATE_SYNC: 'sync',
  CACHE_CLEANUP: 'cleanup',

  // Governance
  GOVERNANCE_VOTE: 'vote',
  DECISION_LOGGING: 'decision',
  AUDIT: 'audit',
};

/**
 * Email Service Configuration
 * Uses environment variables: MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_FROM
 */
export const EMAIL_CONFIG = {
  from: process.env.MAIL_FROM || 'noreply@formerlyincarcerated.org',
  replyTo: 'hello@formerlyincarcerated.org',

  // Send limits to prevent rate limiting
  rateLimit: {
    perSecond: 5,
    perMinute: 100,
    perHour: 1000,
  },

  // Campaign settings
  campaign: {
    trackingEnabled: true,
    trackingPixelTransparency: 0.01, // 1% opacity for invisible tracking
    unsubscribeRequired: true,
  },
};

/**
 * Analytics Configuration
 */
export const ANALYTICS_CONFIG = {
  // Metrics collection intervals
  intervals: {
    swarmHealth: 60000, // 1 minute
    agentMetrics: 300000, // 5 minutes
    cacheMetrics: 600000, // 10 minutes
    performanceAnalysis: 3600000, // 1 hour
  },

  // Retention policies
  retention: {
    realtime: 3600000, // 1 hour
    detailed: 86400000, // 24 hours
    summary: 2592000000, // 30 days
  },
};

/**
 * Initialization Hook
 * Called when orchestration system starts
 */
export async function initializationHook(orchService) {
  console.log('🚀 Bitcoin Land Bond Orchestration System Initializing...');

  // Create default swarms
  for (const [key, config] of Object.entries(SWARM_TOPOLOGIES)) {
    try {
      await orchService.swarm.create(
        config.id,
        config.name,
        config.topology,
        config.agentCount
      );
      console.log(`✓ ${config.name} initialized`);
    } catch (error) {
      console.error(`✗ Failed to initialize ${config.name}:`, error.message);
    }
  }

  // Initialize cache with project state
  await orchService.cache.set(
    CACHE_CONFIG.PROJECT_STATE.key,
    {
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'production',
      initiatedAt: new Date().toISOString(),
      domain: 'https://formerlyincarcerated.org',
      mission: 'Criminal Asset Recovery Initiative - Reentry Housing Program',
    },
    CACHE_CONFIG.PROJECT_STATE.ttl
  );

  console.log('✓ Project state cached');
  console.log('✓ Orchestration system ready');
}

/**
 * Shutdown Hook
 * Called when orchestration system shuts down
 */
export async function shutdownHook(orchService) {
  console.log('🛑 Bitcoin Land Bond Orchestration System Shutting Down...');
  // Perform cleanup, flush caches, notify agents
  console.log('✓ System shutdown complete');
}

export default {
  SWARM_TOPOLOGIES,
  EMAIL_TEMPLATES,
  CACHE_CONFIG,
  TASK_PRIORITIES,
  TASK_TYPES,
  EMAIL_CONFIG,
  ANALYTICS_CONFIG,
  initializationHook,
  shutdownHook,
};
