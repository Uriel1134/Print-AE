"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../context/store";
import Logo from "./Logo";
import { Sun, Moon, Menu, X, Phone, Mail, Clock } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme, settings } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Galerie", path: "/gallery" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div className="top-bar">
        <div className="container top-bar-container">
          <div className="top-bar-item top-bar-hours">
            <Clock size={13} />
            <span>{settings.hours}</span>
          </div>
          <div className="top-bar-actions" style={{ display: "flex", gap: "1.5rem" }}>
            <a href={`tel:${settings.whatsapp}`} className="top-bar-link">
              <Phone size={13} />
              <span>+241 77 88 30 05</span>
            </a>
            <a href={`tel:${settings.phone}`} className="top-bar-link">
              <Phone size={13} />
              <span>+241 66 72 00 13</span>
            </a>
            <a href={`mailto:${settings.email}`} className="top-bar-link top-bar-email">
              <Mail size={13} />
              <span>{settings.email}</span>
            </a>
          </div>
        </div>
      </div>

      <header className={`header-premium ${scrolled ? "header-premium-scrolled" : ""}`}>
        <div className="container header-container">
          <Link href="/" className="logo-premium" onClick={closeMenu} style={{ padding: 0 }}>
            <img 
              src="/logo AE.png" 
              alt="AE PRINT Services Logo" 
              style={{ height: "46px", width: "auto", objectFit: "contain", display: "block" }} 
            />
          </Link>

          <nav className="nav-desktop" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`nav-link-premium ${pathname === link.path ? "nav-link-premium-active" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <Link href="/quote" className="btn-premium btn-premium-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>
              <span>Demander un devis</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-toggle"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="mobile-menu-drawer">
            <nav className="mobile-nav-links" aria-label="Navigation mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={closeMenu}
                  className={`mobile-nav-link ${pathname === link.path ? "mobile-nav-link-active" : ""}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/quote" onClick={closeMenu} className="btn btn-primary" style={{ marginTop: "0.75rem" }}>
                Demander un devis
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
