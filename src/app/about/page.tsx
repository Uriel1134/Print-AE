"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import FAQ from "../components/FAQ";
import { useApp } from "../context/store";

export default function About() {
  const { settings } = useApp();

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <h1>Notre histoire et nos engagements</h1>
          <p>
            Depuis 2020, AE PRINT Services accompagne les entreprises, institutions et
            associations gabonaises dans leurs projets de communication visuelle.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2-cols" style={{ alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                Au service de votre image de marque depuis 2020
              </h2>
            </div>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.75 }}>{settings.history}</p>
            <p style={{ lineHeight: 1.75 }}>
              Nous accompagnons entrepreneurs, associations et grandes structures dans la
              réalisation de leurs supports : vêtements personnalisés, habillage de véhicules,
              enseignes lumineuses et signalétique grand format.
            </p>

            <div className="grid-2-cols-equal">
              <div className="card card--flat">
                <span className="section-label">Mission</span>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>{settings.mission}</p>
              </div>
              <div className="card card--flat">
                <span className="section-label">Vision</span>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>{settings.vision}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1.5rem" }}>
              Chronologie
            </h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot" />
                <span className="timeline-year">2020 – 2021</span>
                <h4 className="timeline-title">Création et débuts</h4>
                <p className="timeline-text">
                  Lancement de l&apos;atelier avec impression numérique et marquage textile pour les PME locales.
                </p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot" />
                <span className="timeline-year">2022 – 2023</span>
                <h4 className="timeline-title">Extension industrielle</h4>
                <p className="timeline-text">
                  Acquisition de traceurs DTF industriels et équipements de broderie automatisée.
                </p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot" />
                <span className="timeline-year">2024 – Aujourd&apos;hui</span>
                <h4 className="timeline-title">Offre full service</h4>
                <p className="timeline-text">
                  Habillage véhicules, enseignes lumineuses et signalétique pour une clientèle diversifiée.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" style={{ width: "100%" }}>Les principes qui guident notre travail</h2>
          </div>

          <div className="grid-4-cols">
            {settings.values.map((value, idx) => (
              <div key={idx} className="value-card">
                <div className="value-card-num">{String(idx + 1).padStart(2, "0")}</div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="promo-band">
            <div>
              <h3>Contrôle qualité sur chaque commande</h3>
              <p>
                Vérification des teintes, solidité des fixations et respect des dimensions
                avant toute livraison. Notre service client reste disponible après installation.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/quote" className="btn btn-primary">Obtenir un devis</Link>
              <Link href="/contact" className="btn btn-outline">Nous contacter</Link>
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
