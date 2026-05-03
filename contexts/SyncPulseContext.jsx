/**
 * SyncPulse Context Provider
 * Makes orchestration session available throughout the application
 */

import React, { createContext, useContext } from 'react';
import { useSyncPulseSession } from '../hooks/useSyncPulseSession';

const SyncPulseContext = createContext(null);

/**
 * SyncPulse Provider Component
 * Wraps the application to provide orchestration session access
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
 * @returns {Object} Session state and methods
 * @throws {Error} If used outside SyncPulseProvider
 */
export function useSyncPulse() {
  const context = useContext(SyncPulseContext);

  if (!context) {
    throw new Error('useSyncPulse must be used within SyncPulseProvider');
  }

  return context;
}

export default SyncPulseContext;
