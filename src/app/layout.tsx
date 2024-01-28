import type { Metadata } from 'next';

import '../styles/globals.scss';

export const metadata: Metadata = {
  title: 'PalServer Crash Logs',
  description: 'View logs and performance metrics for PalServer crash events'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
