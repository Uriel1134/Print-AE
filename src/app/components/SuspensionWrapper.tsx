"use client";

import React, { useEffect, useState } from "react";
import SuspendedPage from "../suspended/page";

interface SuspensionWrapperProps {
  children: React.ReactNode;
}

export default function SuspensionWrapper({ children }: SuspensionWrapperProps) {
  const [isBypassed, setIsBypassed] = useState<boolean | null>(null);

  // Next.js static exports bake process.env at build time.
  const suspendMode = process.env.NEXT_PUBLIC_SUSPEND_MODE === "true";
  const bypassToken = "ae-secret-bypass-2026"; 

  useEffect(() => {
    if (!suspendMode) {
      setIsBypassed(true);
      return;
    }

    // Check URL parameters for bypass
    const params = new URLSearchParams(window.location.search);
    const queryBypass = params.get("bypass");
    
    // Check localStorage
    const localBypass = localStorage.getItem("suspend_bypass");

    if (queryBypass === bypassToken) {
      localStorage.setItem("suspend_bypass", bypassToken);
      setIsBypassed(true);
      
      // Clean the bypass query param from the URL to keep the URL clean
      params.delete("bypass");
      const newSearch = params.toString();
      const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : "");
      window.history.replaceState({}, "", newUrl);
    } else if (localBypass === bypassToken) {
      setIsBypassed(true);
    } else {
      setIsBypassed(false);
    }
  }, [suspendMode]);

  // Show a black screen while determining if the bypass exists
  if (suspendMode && isBypassed === null) {
    return (
      <div style={{
        background: "#0b0d13",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {/* Elegant blank dark loader */}
      </div>
    );
  }

  // If suspend mode is active and not bypassed, show the suspended screen
  if (suspendMode && !isBypassed) {
    return <SuspendedPage />;
  }

  return <>{children}</>;
}
