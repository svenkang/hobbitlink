import { Metadata } from 'next';
import { Settings } from './_settings';

export const metadata: Metadata = {
  title: 'Settings - Hobbitlink',
  description: 'User Settings Hobbitlink',
};

export default function SettingsPage() {
  return <Settings />;
}
