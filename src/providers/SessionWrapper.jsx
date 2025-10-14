// src/providers/SessionWrapper.jsx
"use client";

import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export default function SessionWrapper({ children }) {
  const [session, setSession] = useState(null);

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}