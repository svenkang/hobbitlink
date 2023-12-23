import { Dashboard } from './_dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Hobbitlink',
  description: 'Dashboard Hobbitlink',
};

export default function DashboardPage() {
  return <Dashboard />;
}
