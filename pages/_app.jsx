import '../styles/globals.css';
import { SyncPulseProvider } from '../contexts/SyncPulseContext';

export default function App({ Component, pageProps }) {
  return (
    <SyncPulseProvider>
      <Component {...pageProps} />
    </SyncPulseProvider>
  );
}
