/**
 * Orchestration API Route
 * Server-side only endpoint for SyncPulse orchestration
 * Handles task execution, email sending, and state management
 */

import { initializeOrchestration } from '../../lib/orchestration';
import { initializationHook, shutdownHook } from '../../orchestration.config';

// Store session in memory (for demo - use Redis in production)
let session = null;

/**
 * Initialize orchestration session
 */
async function initSession() {
  if (!session) {
    try {
      session = initializeOrchestration();
      await initializationHook(session);
    } catch (error) {
      console.error('Session initialization error:', error);
      throw error;
    }
  }
  return session;
}

/**
 * Handle orchestration API requests
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, payload } = req.body;

  try {
    const orch = await initSession();

    switch (action) {
      case 'execute-tasks': {
        const result = await orch.tasks.execute(payload.tasks, payload.swarmId);
        return res.status(200).json({ success: true, result });
      }

      case 'send-email': {
        const result = await orch.email.send(payload);
        return res.status(200).json({ success: true, result });
      }

      case 'send-campaign': {
        const result = await orch.email.sendCampaign(payload);
        return res.status(200).json({ success: true, result });
      }

      case 'get-analytics': {
        const result = orch.analytics.performance(payload.timeRange || '1h');
        return res.status(200).json({ success: true, result });
      }

      case 'set-cache': {
        const result = await orch.cache.set(payload.key, payload.value, payload.ttl);
        return res.status(200).json({ success: true, result });
      }

      case 'get-cache': {
        const result = await orch.cache.get(payload.key);
        return res.status(200).json({ success: true, result });
      }

      default:
        return res.status(400).json({ error: 'Unknown action' });
    }
  } catch (error) {
    console.error('Orchestration error:', error);
    return res.status(500).json({ error: error.message });
  }
}
