// src/app/layout.tsx
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
export const metadata = { title: 'Script SaaS', description: 'Generate viral scripts' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
  
<ClerkProvider>
      <html lang="en">
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}




