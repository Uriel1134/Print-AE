"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import FAQ from "../components/FAQ";
import { useApp } from "../context/store";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle } from "lucide-react";

export default function Contact() {
  const { settings } = useApp();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Silent mitigation for bots filling the honeypot
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setHoneypot("");
      return;
    }
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 6000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const rawWhatsApp = settings.whatsapp.replace(/[^\d]/g, "");

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <h1>Nous contacter</h1>
          <p>
            Une question ou un projet spécifique ? Notre équipe commerciale est disponible
            à Libreville du lundi au samedi.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2-cols">
          <div>
            <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
              Parlons de votre projet
            </h2>
            <p style={{ marginBottom: "2rem", lineHeight: 1.75 }}>
              Appelez-nous directement, écrivez-nous par email ou passez à l&apos;atelier
              au centre-ville de Libreville.
            </p>

            <div className="contact-info-item">
              <div className="contact-info-icon"><Phone size={16} /></div>
              <div>
                <div className="contact-info-label">Téléphone</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <a href={`tel:${settings.whatsapp}`} className="contact-info-value">+241 77 88 30 05</a>
                  <a href={`tel:${settings.phone}`} className="contact-info-value">+241 66 72 00 13</a>
                </div>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon"><MessageCircle size={16} /></div>
              <div>
                <div className="contact-info-label">WhatsApp</div>
                <a
                  href={`https://wa.me/${rawWhatsApp}?text=${encodeURIComponent("Bonjour AE PRINT Services, je souhaite des informations.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-value"
                  style={{ color: "#128C7E" }}
                >
                  {settings.whatsapp}
                </a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon"><Mail size={16} /></div>
              <div>
                <div className="contact-info-label">Email</div>
                <a href={`mailto:${settings.email}`} className="contact-info-value">{settings.email}</a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon"><MapPin size={16} /></div>
              <div>
                <div className="contact-info-label">Adresse</div>
                <span className="contact-info-value">{settings.address}</span>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon"><Clock size={16} /></div>
              <div>
                <div className="contact-info-label">Horaires</div>
                <span className="contact-info-value">{settings.hours}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1.5rem" }}>Envoyer un message</h3>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <CheckCircle size={40} style={{ color: "var(--accent)", margin: "0 auto 1rem" }} />
                <h4 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Message envoyé</h4>
                <p style={{ fontSize: "0.9rem" }}>Notre équipe vous répondra dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Honeypot field (hidden from users, but filled by bots) */}
                <input
                  type="text"
                  name="website_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <div className="form-group">
                  <label className="form-label">Nom complet *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="form-input" placeholder="Jean Dupont" />
                </div>
                <div className="grid-2-cols-equal" style={{ gap: "0.75rem" }}>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Téléphone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Sujet</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="form-input" placeholder="Devis habillage véhicule" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea name="message" rows={5} required value={formData.message} onChange={handleChange} className="form-textarea" placeholder="Décrivez votre projet…" />
                </div>
                <button type="submit" className="btn-premium btn-premium-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                  <Send size={16} />
                  Envoyer
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: "4rem" }}>
        <div className="container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.08343743477!2d9.444760073574972!3d0.3901849767226848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x107f3b89098722b5%3A0xb35520e5fd5be401!2sLibreville!5e0!3m2!1sfr!2sga!4v1716301292026!5m2!1sfr!2sga"
            width="100%"
            height="380"
            style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation AE PRINT Services — Libreville"
          />
        </div>
      </section>

      <FAQ />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
