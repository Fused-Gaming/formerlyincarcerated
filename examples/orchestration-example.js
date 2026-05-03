/**
 * Bitcoin Land Bond - Orchestration Usage Examples
 *
 * This file demonstrates practical use cases for the SyncPulse orchestration system
 */

import initializeOrchestration from '../lib/orchestration.js';
import {
  SWARM_TOPOLOGIES,
  EMAIL_TEMPLATES,
  CACHE_CONFIG,
  TASK_TYPES,
  TASK_PRIORITIES,
} from '../orchestration.config.js';

/**
 * Example 1: Deployment Coordination
 * Deploy to production with multi-agent coordination
 */
export async function exampleDeploymentCoordination() {
  console.log('\n📦 Example 1: Deployment Coordination\n');

  const orch = initializeOrchestration();

  // Create deployment swarm
  const swarm = SWARM_TOPOLOGIES.PRODUCTION_DEPLOYMENT;
  console.log(`Creating ${swarm.name}...`);

  // Define deployment tasks
  const deploymentTasks = [
    {
      id: 'pre-deploy-checks',
      name: 'Pre-Deployment Health Checks',
      priority: TASK_PRIORITIES.CRITICAL,
      status: 'pending',
      createdAt: Date.now(),
      type: TASK_TYPES.HEALTH_CHECK,
    },
    {
      id: 'build-assets',
      name: 'Build and Optimize Assets',
      priority: TASK_PRIORITIES.HIGH,
      status: 'pending',
      createdAt: Date.now(),
      type: TASK_TYPES.DEPLOYMENT,
    },
    {
      id: 'deploy-to-edge',
      name: 'Deploy to Edge Network',
      priority: TASK_PRIORITIES.HIGH,
      status: 'pending',
      createdAt: Date.now(),
      type: TASK_TYPES.DEPLOYMENT,
    },
    {
      id: 'post-deploy-validation',
      name: 'Post-Deployment Validation',
      priority: TASK_PRIORITIES.HIGH,
      status: 'pending',
      createdAt: Date.now(),
      type: TASK_TYPES.HEALTH_CHECK,
    },
  ];

  // Execute tasks
  console.log('Executing deployment tasks...');
  const results = await orch.tasks.execute(deploymentTasks, swarm.id);
  console.log('Deployment results:', results);

  // Cache deployment state
  await orch.cache.set(
    CACHE_CONFIG.DEPLOYMENT_HISTORY.key,
    {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: 'production',
      domain: 'https://formerlyincarcerated.org',
      status: 'completed',
      taskCount: deploymentTasks.length,
    },
    CACHE_CONFIG.DEPLOYMENT_HISTORY.ttl
  );

  console.log('✓ Deployment coordination example complete');
}

/**
 * Example 2: Marketing Campaign Distribution
 * Send bulk email campaigns across distributed agents
 */
export async function exampleMarketingCampaign() {
  console.log('\n📧 Example 2: Marketing Campaign Distribution\n');

  const orch = initializeOrchestration();

  // Campaign recipients with personalization
  const campaignRecipients = [
    {
      email: 'partner1@housing-nonprofit.org',
      name: 'Housing Partner 1',
      variables: {
        partnerType: 'Housing Developer',
        benefit1: 'Access to $500M deployment fund',
        benefit2: 'Partnership with established governance',
        benefit3: 'Recurring revenue model',
      },
    },
    {
      email: 'partner2@reentry-org.org',
      name: 'Reentry Partner 2',
      variables: {
        partnerType: 'Reentry Services',
        benefit1: 'Wraparound services infrastructure',
        benefit2: 'Governance board representation',
        benefit3: 'Stable funding through 7-year model',
      },
    },
  ];

  // Send marketing campaign
  console.log('Sending partnership invitation campaign...');
  const campaignResult = await orch.email.sendCampaign({
    campaignName: 'Q2-2026-Partnership-Drive',
    recipients: campaignRecipients,
    subject: 'Join the Bitcoin Land Bond Initiative - {{partnerType}} Partner',
    htmlBody: EMAIL_TEMPLATES.PARTNER_INVITATION.htmlBody,
    trackingPixel: true,
  });

  console.log('Campaign result:', campaignResult);
  console.log(`✓ Sent campaign to ${campaignRecipients.length} recipients`);
}

/**
 * Example 3: Impact Metrics Collection
 * Collect and cache impact metrics across distributed agents
 */
export async function exampleMetricsCollection() {
  console.log('\n📊 Example 3: Impact Metrics Collection\n');

  const orch = initializeOrchestration();

  // Define metrics collection tasks
  const metricsTasks = [
    {
      id: 'housing-occupancy',
      name: 'Housing Occupancy Rate',
      priority: TASK_PRIORITIES.HIGH,
      status: 'pending',
      createdAt: Date.now(),
      type: TASK_TYPES.METRIC_COLLECTION,
      target: 95,
      unit: 'percent',
    },
    {
      id: 'recidivism-reduction',
      name: 'Recidivism Reduction',
      priority: TASK_PRIORITIES.HIGH,
      status: 'pending',
      createdAt: Date.now(),
      type: TASK_TYPES.METRIC_COLLECTION,
      target: 25,
      unit: 'percent',
    },
    {
      id: 'employment-increase',
      name: 'Employment Rate Increase',
      priority: TASK_PRIORITIES.HIGH,
      status: 'pending',
      createdAt: Date.now(),
      type: TASK_TYPES.METRIC_COLLECTION,
      target: 70,
      unit: 'percent',
    },
  ];

  // Execute metrics collection
  console.log('Collecting impact metrics...');
  const metricsResults = await orch.tasks.execute(
    metricsTasks,
    SWARM_TOPOLOGIES.ELASTIC_PROCESSING.id
  );

  // Cache metrics
  const metricsData = {
    collectionTime: new Date().toISOString(),
    period: 'Q2-2026',
    metrics: {
      housingOccupancy: 95,
      recidivismReduction: 22,
      employmentIncrease: 68,
    },
    targets: {
      housingOccupancy: 95,
      recidivismReduction: 25,
      employmentIncrease: 70,
    },
    status: 'on-track',
  };

  await orch.cache.set(
    CACHE_CONFIG.IMPACT_METRICS.key,
    metricsData,
    CACHE_CONFIG.IMPACT_METRICS.ttl
  );

  console.log('Metrics data:', metricsData);
  console.log('✓ Metrics collection and caching complete');
}

/**
 * Example 4: Governance Update Notification
 * Notify board members of governance updates
 */
export async function exampleGovernanceNotification() {
  console.log('\n🏛️ Example 4: Governance Update Notification\n');

  const orch = initializeOrchestration();

  const boardMembers = [
    {
      email: 'board1@example.com',
      name: 'Board Member 1',
      variables: {
        recipientName: 'Member 1',
        updateContent:
          'The Board has approved the Q2-2026 deployment targets.',
        decision1: '2,000+ residents housed by year 7',
        decision2: '5 pilot cities with balanced geographic distribution',
      },
    },
    {
      email: 'board2@example.com',
      name: 'Board Member 2',
      variables: {
        recipientName: 'Member 2',
        updateContent:
          'The Board has approved the Q2-2026 deployment targets.',
        decision1: '2,000+ residents housed by year 7',
        decision2: '5 pilot cities with balanced geographic distribution',
      },
    },
  ];

  // Send governance updates
  console.log('Sending governance update notifications...');
  const updateResult = await orch.email.sendBulk({
    recipients: boardMembers,
    subject: 'Board Update - Bitcoin Land Bond Initiative',
    htmlBody: EMAIL_TEMPLATES.GOVERNANCE_UPDATE.htmlBody,
  });

  console.log('Update result:', updateResult);
  console.log(`✓ Sent governance update to ${boardMembers.length} board members`);
}

/**
 * Example 5: State Synchronization
 * Synchronize project state across all agents
 */
export async function exampleStateSynchronization() {
  console.log('\n🔄 Example 5: State Synchronization\n');

  const orch = initializeOrchestration();

  // Define state sync tasks
  const syncTasks = [
    {
      id: 'sync-deployment-status',
      name: 'Sync Deployment Status',
      priority: TASK_PRIORITIES.HIGH,
      status: 'pending',
      createdAt: Date.now(),
      type: TASK_TYPES.STATE_SYNC,
    },
    {
      id: 'sync-metrics',
      name: 'Sync Impact Metrics',
      priority: TASK_PRIORITIES.NORMAL,
      status: 'pending',
      createdAt: Date.now(),
      type: TASK_TYPES.STATE_SYNC,
    },
    {
      id: 'sync-governance-records',
      name: 'Sync Governance Records',
      priority: TASK_PRIORITIES.NORMAL,
      status: 'pending',
      createdAt: Date.now(),
      type: TASK_TYPES.STATE_SYNC,
    },
  ];

  // Execute sync across mesh topology (distributed)
  console.log('Synchronizing state across agents...');
  const syncResults = await orch.tasks.execute(
    syncTasks,
    SWARM_TOPOLOGIES.CAMPAIGN_DISTRIBUTION.id
  );

  console.log('Sync results:', syncResults);
  console.log('✓ State synchronization complete');
}

/**
 * Example 6: Performance Monitoring
 * Monitor orchestration system performance
 */
export async function examplePerformanceMonitoring() {
  console.log('\n📈 Example 6: Performance Monitoring\n');

  const orch = initializeOrchestration();

  // Get performance metrics
  console.log('Retrieving performance metrics...');
  const performanceMetrics = orch.analytics.performance('1h');
  console.log('Performance metrics (last 1 hour):', performanceMetrics);

  // Get agent utilization
  const agentMetrics = orch.analytics.agents(
    SWARM_TOPOLOGIES.PRODUCTION_DEPLOYMENT.id
  );
  console.log('Agent utilization:', agentMetrics);

  // Get cache statistics
  const cacheMetrics = orch.analytics.cache();
  console.log('Cache statistics:', cacheMetrics);

  console.log('✓ Performance monitoring complete');
}

/**
 * Run all examples
 */
export async function runAllExamples() {
  console.log(
    '🎯 Bitcoin Land Bond - Orchestration System Examples\n' +
      '================================================\n'
  );

  try {
    await exampleDeploymentCoordination();
    await exampleMarketingCampaign();
    await exampleMetricsCollection();
    await exampleGovernanceNotification();
    await exampleStateSynchronization();
    await examplePerformanceMonitoring();

    console.log(
      '\n✓ All examples completed successfully\n' +
        '================================================'
    );
  } catch (error) {
    console.error('❌ Error running examples:', error.message);
  }
}

// Run examples if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllExamples();
}

export default {
  exampleDeploymentCoordination,
  exampleMarketingCampaign,
  exampleMetricsCollection,
  exampleGovernanceNotification,
  exampleStateSynchronization,
  examplePerformanceMonitoring,
  runAllExamples,
};
