// src/app/dashboard/page.tsx
'use client';  // If using client-side hooks
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from '@clerk/nextjs';  // Imports

export default function Dashboard() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />  // Auto-redirect if not logged in
      </SignedOut>
      <SignedIn>
        <div className="p-4">
          <h1 className="text-2xl">Welcome to Dashboard</h1>
          <UserButton />  // Profile button for logout, etc.
          {/* Add your form, etc. here later */}
        </div>
      </SignedIn>
    </>
  );
}