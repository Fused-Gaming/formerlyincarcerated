/**
 * SyncPulse Session Hook (Client-side API wrapper)
 * Manages orchestration through server-side API routes
 * Server-side implementation: /pages/api/orchestration.js
 */

import { useEffect, useState, useRef } from 'react';

/**
 * Hook to manage SyncPulse orchestration via API
 * Provides methods for calling server-side orchestration functions
 * @returns {Object} Session state and API methods
 */
export function useSyncPulseSession() {
  const [isInitialized, setIsInitialized] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Call orchestration API
   */
  const callApi = async (action, payload) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/orchestration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'API call failed');
      }

      return data.result;
    } catch (err) {
      setError(err.message);
      console.error('Orchestration API error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isInitialized,
    isLoading,
    error,

    // Task execution
    tasks: {
      execute: (tasks, swarmId) => callApi('execute-tasks', { tasks, swarmId }),
    },

    // Email operations
    email: {
      send: (options) => callApi('send-email', options),
      sendCampaign: (options) => callApi('send-campaign', options),
    },

    // Cache operations
    cache: {
      set: (key, value, ttl) => callApi('set-cache', { key, value, ttl }),
      get: (key) => callApi('get-cache', { key }),
    },

    // Analytics
    analytics: {
      performance: (timeRange) => callApi('get-analytics', { timeRange }),
    },
  };
}

export default useSyncPulseSession;
