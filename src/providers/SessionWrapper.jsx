// src/providers/SessionWrapper.jsx
"use client";

import { SessionProvider } from "next-auth/react";

export default function SessionWrapper({ children, session }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60} refetchOnWindowFocus={true}>
      {children}
    </SessionProvider>
  );
}