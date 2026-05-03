/**
 * SyncPulse Session Hook
 * Initializes and manages multi-agent orchestration session lifecycle
 */

import { useEffect, useState, useRef } from 'react';
import { initializeOrchestration } from '../lib/orchestration';
import { SWARM_TOPOLOGIES, initializationHook, shutdownHook } from '../orchestration.config';

/**
 * Hook to manage SyncPulse orchestration session
 * @returns {Object} Session state and methods
 */
export function useSyncPulseSession() {
  const [session, setSession] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState(null);
  const sessionRef = useRef(null);

  // Initialize session on mount
  useEffect(() => {
    const initializeSession = async () => {
      if (sessionRef.current || isInitialized) return;

      try {
        setIsInitializing(true);
        setError(null);

        // Initialize orchestration system
        const orch = initializeOrchestration();
        sessionRef.current = orch;

        // Call initialization hook for Bitcoin Land Bond specific setup
        await initializationHook(orch);

        setSession(orch);
        setIsInitialized(true);

        // Log session initialization
        if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
          console.log('✓ SyncPulse Session Initialized', {
            timestamp: new Date().toISOString(),
            sessionId: Math.random().toString(36).substring(7),
          });
        }
      } catch (err) {
        setError(err.message || 'Failed to initialize SyncPulse session');
        console.error('Session initialization error:', err);
      } finally {
        setIsInitializing(false);
      }
    };

    // Only initialize on client side
    if (typeof window !== 'undefined') {
      initializeSession();
    }

    // Cleanup on unmount
    return () => {
      const cleanup = async () => {
        if (sessionRef.current) {
          try {
            await shutdownHook(sessionRef.current);
          } catch (err) {
            console.error('Session shutdown error:', err);
          }
        }
      };

      cleanup();
    };
  }, [isInitialized]);

  return {
    session,
    isInitialized,
    isInitializing,
    error,

    // Methods for using the session
    swarm: session?.swarm,
    cache: session?.cache,
    tasks: session?.tasks,
    email: session?.email,
    analytics: session?.analytics,

    // Manual control
    reinitialize: async () => {
      setIsInitializing(true);
      setError(null);
      try {
        if (sessionRef.current) {
          await shutdownHook(sessionRef.current);
        }
        sessionRef.current = null;
        setSession(null);
        setIsInitialized(false);

        const orch = initializeOrchestration();
        sessionRef.current = orch;
        await initializationHook(orch);
        setSession(orch);
        setIsInitialized(true);
      } catch (err) {
        setError(err.message);
        console.error('Reinitialization error:', err);
      } finally {
        setIsInitializing(false);
      }
    },

    shutdown: async () => {
      try {
        if (sessionRef.current) {
          await shutdownHook(sessionRef.current);
          sessionRef.current = null;
          setSession(null);
          setIsInitialized(false);
        }
      } catch (err) {
        setError(err.message);
        console.error('Shutdown error:', err);
      }
    },
  };
}

export default useSyncPulseSession;
