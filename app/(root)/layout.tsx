import type { ReactNode } from 'react';

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <meta httpEquiv="refresh" content="0; url=/fa" />
      </head>
      <body>{children}</body>
    </html>
  );
}
