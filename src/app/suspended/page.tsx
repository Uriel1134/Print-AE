"use client";

import React from "react";
import { Lock, AlertTriangle, ShieldAlert } from "lucide-react";

export default function SuspendedPage() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "#0b0d13",
      backgroundImage: "radial-gradient(circle at 50% 50%, #1a1d29 0%, #0b0d13 100%)",
      color: "#eef0f4",
      padding: "2rem",
      textAlign: "center",
      fontFamily: "var(--font-sans), sans-serif",
    }}>
      {/* Outer Glow Container */}
      <div style={{
        maxWidth: "500px",
        width: "100%",
        padding: "3rem 2rem",
        borderRadius: "16px",
        background: "rgba(20, 24, 32, 0.65)",
        border: "1px solid rgba(224, 36, 36, 0.25)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4), 0 0 40px rgba(224, 36, 36, 0.05)",
        backdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem"
      }}>
        {/* Animated Icon Circle */}
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "rgba(224, 36, 36, 0.1)",
          border: "2px solid rgba(224, 36, 36, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
          boxShadow: "0 0 20px rgba(224, 36, 36, 0.15)",
        }}>
          <ShieldAlert size={40} color="#f05252" />
        </div>

        {/* Brand/Service Badge */}
        <span style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#9aa3b2",
          fontSize: "0.75rem",
          fontWeight: 700,
          padding: "5px 12px",
          borderRadius: "100px",
          letterSpacing: "0.1em",
          textTransform: "uppercase"
        }}>
          Accès Restreint
        </span>

        {/* Title */}
        <h1 style={{
          fontSize: "1.75rem",
          fontWeight: 800,
          color: "#ffffff",
          margin: 0,
          letterSpacing: "-0.02em",
          lineHeight: 1.2
        }}>
          Service Temporairement Suspendu
        </h1>

        {/* Horizontal separator */}
        <div style={{
          width: "50px",
          height: "2px",
          background: "linear-gradient(90deg, transparent, #f05252, transparent)",
          margin: "0.5rem 0"
        }} />

        {/* Message */}
        <p style={{
          fontSize: "0.95rem",
          color: "#9aa3b2",
          lineHeight: 1.6,
          margin: 0
        }}>
          Ce site internet n&apos;est plus disponible pour le moment.
        </p>

        <p style={{
          fontSize: "0.9rem",
          color: "#6b7380",
          lineHeight: 1.6,
          margin: 0,
          background: "rgba(0, 0, 0, 0.2)",
          padding: "1rem",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.03)"
        }}>
          Si vous êtes le propriétaire de cet espace, veuillez contacter votre administrateur ou prestataire technique pour régulariser votre situation et rétablir le service.
        </p>
      </div>

      {/* Footer Text */}
      <span style={{
        marginTop: "2rem",
        fontSize: "0.75rem",
        color: "#4b5563",
        letterSpacing: "0.05em"
      }}>
        AE PRINT SERVICES &bull; INDISPONIBILITÉ TEMPORAIRE
      </span>
    </div>
  );
}
