"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "../context/store";
import Logo from "./Logo";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const { settings } = useApp();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-premium">
      <div className="container footer-grid">
        <div className="footer-col">
          <div className="footer-logo">
            <img 
              src="/logo AE.png" 
              alt="AE PRINT Services Logo" 
              style={{ height: "55px", width: "auto", objectFit: "contain", display: "block" }} 
            />
          </div>
          <p className="footer-bio">{settings.slogan}</p>
          <div className="footer-socials">
            <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links-list">
            <li><Link href="/" className="footer-link">Accueil</Link></li>
            <li><Link href="/about" className="footer-link">À propos</Link></li>
            <li><Link href="/services" className="footer-link">Nos services</Link></li>
            <li><Link href="/gallery" className="footer-link">Galerie</Link></li>
            <li><Link href="/blog" className="footer-link">Blog</Link></li>
            <li><Link href="/contact" className="footer-link">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Coordonnées</h4>
          <ul className="footer-links-list">
            <li className="footer-contact-item">
              <Phone size={15} />
              <a href={`tel:${settings.phone}`} className="footer-link">{settings.phone}</a>
            </li>
            <li className="footer-contact-item">
              <Mail size={15} />
              <a href={`mailto:${settings.email}`} className="footer-link">{settings.email}</a>
            </li>
            <li className="footer-contact-item">
              <MapPin size={15} />
              <span>{settings.address}</span>
            </li>
            <li className="footer-contact-item">
              <Clock size={15} />
              <span>{settings.hours}</span>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Newsletter</h4>
          <p className="footer-newsletter-text">
            Recevez nos actualités et offres professionnelles par email.
          </p>
          <form onSubmit={handleSubscribe} className="footer-form">
            <input
              type="email"
              placeholder="Votre email professionnel"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="footer-input"
            />
            <button type="submit" className="footer-submit-btn" aria-label="S'inscrire">
              <Send size={15} />
            </button>
          </form>
          {subscribed && (
            <p className="footer-success-msg">Inscription enregistrée.</p>
          )}
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container footer-bottom-container">
          <span>&copy; {currentYear} {settings.companyName}. Tous droits réservés.</span>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
            <div className="calibration-strip" aria-hidden="true">
              <div className="calibration-block calibration-cyan" />
              <div className="calibration-block calibration-magenta" />
              <div className="calibration-block calibration-yellow" />
              <div className="calibration-block calibration-key" />
            </div>
            <Link href="/admin" className="footer-admin-link">
              Administration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
