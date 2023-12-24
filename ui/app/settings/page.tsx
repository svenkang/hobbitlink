import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings - Hobbitlink',
  description: 'User Settings Hobbitlink',
};

export default function Settings() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-6">Settings</h1>
      <p className="text-gray-600 text-sm">Last Updated: December 22nd, 2023</p>
    </main>
  );
}
