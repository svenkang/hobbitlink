import { Metadata } from 'next';
import { Links } from './_links';

export const metadata: Metadata = {
  title: 'Links - Hobbitlink',
  description: 'Links for Hobbitlink',
};

export default function SettingsPage() {
  return <Links />;
}
