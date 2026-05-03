/**
 * SyncPulse Context Provider (Optional)
 * Provides access to server-side orchestration API
 * Note: SyncPulse orchestration runs server-side only via /api/orchestration
 */

import React, { createContext, useContext } from 'react';
import { useSyncPulseSession } from '../hooks/useSyncPulseSession';

const SyncPulseContext = createContext(null);

/**
 * SyncPulse Provider Component (Optional)
 * Wraps the application to provide orchestration session access
 * Note: Can be used optionally or components can call useSyncPulseSession directly
 */
export function SyncPulseProvider({ children }) {
  const session = useSyncPulseSession();

  return (
    <SyncPulseContext.Provider value={session}>
      {children}
    </SyncPulseContext.Provider>
  );
}

/**
 * Hook to access SyncPulse session from anywhere in the app
 * Can be used with or without SyncPulseProvider
 * @returns {Object} Session state and methods (API-based)
 */
export function useSyncPulse() {
  const context = useContext(SyncPulseContext);

  // Return context if available, otherwise create a new session
  return context || useSyncPulseSession();
}

export default SyncPulseContext;
