"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import FAQ from "./components/FAQ";
import { useApp, getServiceIcon } from "./context/store";
import { ArrowRight, Cpu, Layers, Award, ChevronDown } from "lucide-react";

export default function Home() {
  const { services, galleryItems } = useApp();

  const featuredServices = [
    "agrandissement-photo",
    "kakemono-petite",
    "dtf",
    "branding-auto"
  ]
    .map((id) => services.find((s) => s.id === id))
    .filter((s) => s !== undefined) as typeof services;

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero" style={{ 
        padding: "8rem 0 6rem", 
        background: "var(--bg-secondary)", 
        borderBottom: "1px solid var(--border)",
        backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }}>
        <div className="container hero-grid" style={{ alignItems: "center" }}>
          
          <div className="hero-content" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <span className="badge-custom" style={{ 
              alignSelf: "flex-start", 
              background: "var(--primary-glow)", 
              color: "var(--primary)", 
              border: "1px solid rgba(42, 171, 186, 0.2)", 
              fontSize: "0.75rem", 
              fontWeight: 700, 
              padding: "6px 14px", 
              borderRadius: "var(--radius-full)",
              letterSpacing: "0.05em"
            }}>
              EXCELLENCE & RAPIDITÉ À LIBREVILLE
            </span>
            <h1 style={{ fontSize: "clamp(2.35rem, 4.5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0 }}>
              Votre image mérite <br />
              <span style={{ 
                background: "linear-gradient(135deg, var(--primary), var(--accent-secondary))", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent",
                display: "inline-block"
              }}>
                une impression d&apos;exception.
              </span>
            </h1>
            <p className="hero-lead" style={{ margin: 0, color: "var(--ink-muted)", fontSize: "1.0625rem", lineHeight: 1.75 }}>
              AE PRINT Services conçoit et produit vos supports de communication visuelle à Libreville :
              marquage textile DTF, enseignes lumineuses, habillage véhicules et impressions grand format.
            </p>
            <div className="hero-actions" style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <Link href="/quote" className="btn-premium btn-premium-primary" style={{ padding: "0.8rem 2rem" }}>
                <span>Lancer un projet</span>
              </Link>
              <Link href="/services" className="btn-premium btn-premium-secondary" style={{ padding: "0.8rem 2rem" }}>
                <span>Découvrir nos services</span>
              </Link>
            </div>
          </div>

          <div className="hero-visual" style={{ position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img 
              src="/hero-main.png" 
              alt="AE PRINT Services Illustration" 
              className="hero-illustration"
            />
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="stats-strip" style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)", padding: "2rem 0" }}>
        <div className="container stats-grid">
          <div className="stat-item">
            <span className="stat-value">2020</span>
            <span className="stat-label">Année de création</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">18+</span>
            <span className="stat-label">Prestations disponibles</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">24 h</span>
            <span className="stat-label">Délai moyen de livraison</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">100 %</span>
            <span className="stat-label">Contrôle qualité systématique</span>
          </div>
        </div>
      </section>

      {/* Capacités de production */}
      <section className="section" style={{ padding: "6rem 0" }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Un parc machines adapté aux exigences professionnelles</h2>
            <p className="section-desc">
              Nos équipements couvrent l&apos;ensemble de la chaîne de production, du fichier numérique au support fini.
            </p>
          </div>

          <div className="grid-3" style={{ gap: "2rem" }}>
            <div className="feature-card">
              <div className="feature-card-icon" style={{ background: "var(--primary-glow)", color: "var(--primary)" }}><Cpu size={20} /></div>
              <h3>Impression DTF industrielle</h3>
              <p>
                Marquage textile haute définition sur coton, polyester et mélanges.
                Encres pigmentaires résistantes aux lavages répétés.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon" style={{ background: "var(--primary-glow)", color: "var(--primary)" }}><Layers size={20} /></div>
              <h3>Traceurs grand format</h3>
              <p>
                Production de vinyles publicitaires, enseignes et habillages véhicules.
                Encres éco-solvants avec protection UV intégrée.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card-icon" style={{ background: "var(--primary-glow)", color: "var(--primary)" }}><Award size={20} /></div>
              <h3>Broderie automatisée</h3>
              <p>
                Marquage en relief pour textiles professionnels : polos, casquettes,
                chemises et uniformes d&apos;entreprise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prestations phares (Sleek vector layouts instead of stock photos) */}
      <section className="section section--alt" style={{ padding: "6rem 0", background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nos prestations les plus demandées</h2>
            <p className="section-desc">
              Une sélection de nos services phares. Consultez le catalogue complet pour l&apos;ensemble de nos offres.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {featuredServices.map((service) => {
              const IconComponent = getServiceIcon(service.id);
              return (
                <article key={service.id} className="service-row">
                  <div className="service-row-icon-container">
                    <IconComponent size={32} />
                  </div>
                  <div className="service-row-body" style={{ flexGrow: 1 }}>
                    <span className="badge-custom" style={{ fontSize: "0.65rem", padding: "3px 8px" }}>{service.category}</span>
                    <h3 style={{ margin: "0.5rem 0 0.25rem 0", fontSize: "1.25rem", fontWeight: 700 }}>{service.name}</h3>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--ink-muted)" }}>{service.description}</p>
                  </div>
                  <div className="service-row-meta">
                    <span className="service-row-meta-label" style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "var(--ink-faint)", fontWeight: 700 }}>Tarif</span>
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--ink)", margin: "0.25rem 0 0.75rem 0" }}>{service.price}</div>
                    <Link href={`/quote?service=${service.id}`} className="btn-premium btn-premium-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem", display: "inline-flex" }}>
                      <span>Choisir</span> <ArrowRight size={12} style={{ marginLeft: "4px" }} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <Link href="/services" className="btn-premium btn-premium-secondary" style={{ padding: "0.8rem 2.5rem" }}>
              <span>Voir les 18 prestations</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="section" style={{ padding: "6rem 0" }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">De la demande à la livraison en 4 étapes</h2>
          </div>

          <div className="process-grid">
            <div className="process-step">
              <div className="process-step-num">01</div>
              <h3>Prise de brief</h3>
              <p>Transmission de vos fichiers, quantités et contraintes via notre formulaire de devis en ligne.</p>
            </div>
            <div className="process-step">
              <div className="process-step-num">02</div>
              <h3>Validation du BAT</h3>
              <p>Contrôle graphique de vos fichiers et envoi d&apos;un bon à tirer numérique pour approbation.</p>
            </div>
            <div className="process-step">
              <div className="process-step-num">03</div>
              <h3>Production</h3>
              <p>Impression et façonnage dans nos ateliers de Libreville, selon les normes de qualité définies.</p>
            </div>
            <div className="process-step">
              <div className="process-step-num">04</div>
              <h3>Contrôle & livraison</h3>
              <p>Vérification finale et remise de vos supports dans les délais convenus.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Offre volume */}
      <section className="section" style={{ padding: "2rem 0 6rem" }}>
        <div className="container">
          <div className="promo-band" style={{ padding: "3rem", borderRadius: "var(--radius-lg)", background: "var(--grad-dark)", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
            <div>
              <h3 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>Tarifs dégressifs sur les commandes textiles</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", margin: "0.5rem 0 0 0" }}>Remises appliquées à partir de 50 unités. Contactez-nous pour un chiffrage personnalisé.</p>
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/quote" className="btn-premium btn-premium-primary" style={{ padding: "0.8rem 2rem" }}>
                <span>Obtenir un devis</span>
              </Link>
              <a
                href="https://wa.me/24177883005?text=Bonjour%20AE%20PRINT%20Services%2C%20je%20souhaite%20un%20tarif%20d%C3%A9gressif."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium btn-premium-secondary"
                style={{ padding: "0.8rem 2rem" }}
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Réalisations récentes */}
      <section className="section" style={{ padding: "6rem 0", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.25rem" }}>
            <div style={{ maxWidth: "640px" }}>
              <span className="badge-custom" style={{ 
                background: "var(--primary-glow)", 
                color: "var(--primary)", 
                border: "1px solid rgba(42, 171, 186, 0.2)", 
                fontSize: "0.75rem", 
                fontWeight: 700, 
                padding: "6px 14px", 
                borderRadius: "var(--radius-full)",
                letterSpacing: "0.05em",
                marginBottom: "1rem",
                display: "inline-block"
              }}>
                PORTFOLIO
              </span>
              <h2 className="section-title" style={{ marginTop: "0.5rem", width: "100%" }}>Nos réalisations récentes</h2>
            </div>
            <Link href="/gallery" className="btn-premium btn-premium-secondary" style={{ padding: "0.6rem 1.5rem", fontSize: "0.9rem" }}>
              <span>Voir toute la galerie</span>
            </Link>
          </div>

          <div className="grid-3" style={{ gap: "2rem", marginTop: "2.5rem" }}>
            {["gal-4", "gal-5", "gal-7"]
              .map(id => galleryItems.find(item => item.id === id))
              .filter((item): item is typeof galleryItems[0] => !!item)
              .map((item) => (
                <Link href="/gallery" key={item.id} className="portfolio-card-hover" style={{ display: "block", textDecoration: "none" }}>
                  <div style={{
                    position: "relative",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    height: "280px",
                    border: "1px solid var(--border)",
                    background: "var(--surface-elevated)"
                  }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                      className="gallery-image"
                    />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Spot publicitaire */}
      <section className="section" style={{ padding: "6rem 0", background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div className="video-section-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            
            {/* Texte */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <span style={{
                alignSelf: "flex-start",
                background: "var(--primary-glow)",
                color: "var(--primary)",
                border: "1px solid rgba(42, 171, 186, 0.2)",
                fontSize: "0.72rem",
                fontWeight: 700,
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                letterSpacing: "0.08em",
                textTransform: "uppercase"
              }}>
                QUI SOMMES-NOUS ?
              </span>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.025em", margin: 0 }}>
                AE Print Services en <br />
                <span style={{
                  background: "linear-gradient(135deg, var(--primary), var(--accent-secondary))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block"
                }}>
                  quelques secondes.
                </span>
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--ink-muted)", margin: 0, maxWidth: "480px" }}>
                Impression textile DTF, enseignes lumineuses, habillage véhicules,
                grands formats… Découvrez en images tout ce que nous faisons
                pour donner vie à votre communication visuelle à Libreville.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", paddingTop: "0.5rem" }}>
                <Link href="/quote" className="btn-premium btn-premium-primary" style={{ padding: "0.75rem 2rem" }}>
                  <span>Demander un devis</span>
                  <ArrowRight size={16} style={{ marginLeft: "8px" }} />
                </Link>
                <Link href="/contact" className="btn-premium btn-premium-secondary" style={{ padding: "0.75rem 1.75rem" }}>
                  <span>Nous contacter</span>
                </Link>
              </div>
            </div>

            {/* Vidéo */}
            <div style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)", aspectRatio: "16/9", background: "#000" }}>
              <video
                src="/spot-publicitaire.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* Badge overlay */}
              <div style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                background: "rgba(15,18,25,0.75)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "var(--radius-full)",
                padding: "6px 14px",
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                pointerEvents: "none"
              }}>
                Les Amis de l&apos;Emmanuel
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="section" style={{ padding: "6rem 0", background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header section-header--center">
            <h2 className="section-title">Ce que disent nos partenaires</h2>
          </div>

          <div className="grid-2-cols-equal" style={{ gap: "2rem" }}>
            <blockquote className="testimonial" style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "2.5rem", borderRadius: "var(--radius-md)" }}>
              <div className="testimonial-stars" aria-label="5 étoiles sur 5" style={{ color: "gold", fontSize: "1.1rem", marginBottom: "1rem" }}>
                {"★★★★★"}
              </div>
              <p className="testimonial-text" style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--ink-muted)", fontStyle: "italic" }}>
                T-shirts imprimés en DTF pour notre équipe commerciale. Couleurs fidèles à notre charte,
                tissu solide, impression qui tient au lavage. Livraison dans les délais annoncés.
              </p>
              <footer className="testimonial-author" style={{ marginTop: "1.5rem" }}>
                <strong style={{ display: "block", fontSize: "0.95rem" }}>Marie G.</strong>
                <span style={{ fontSize: "0.8rem", color: "var(--ink-faint)" }}>Directrice commerciale — Libreville</span>
              </footer>
            </blockquote>

            <blockquote className="testimonial" style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "2.5rem", borderRadius: "var(--radius-md)" }}>
              <div className="testimonial-stars" aria-label="5 étoiles sur 5" style={{ color: "gold", fontSize: "1.1rem", marginBottom: "1rem" }}>
                {"★★★★★"}
              </div>
              <p className="testimonial-text" style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--ink-muted)", fontStyle: "italic" }}>
                Habillage complet de notre flotte logistique et signalétique de nos bureaux.
                Travail soigné, équipe réactive et professionnelle du début à la fin.
              </p>
              <footer className="testimonial-author" style={{ marginTop: "1.5rem" }}>
                <strong style={{ display: "block", fontSize: "0.95rem" }}>Koffi M.</strong>
                <span style={{ fontSize: "0.8rem", color: "var(--ink-faint)" }}>Responsable logistique — Owendo</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <FAQ />

      {/* CTA final */}
      <section className="cta-band" style={{ padding: "6rem 0", background: "var(--grad-dark)", color: "#ffffff", borderTop: "1px solid var(--border)" }}>
        <div className="container cta-band-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#ffffff", margin: 0 }}>Un projet de communication visuelle ?</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", margin: "0.5rem 0 0 0" }}>
              Transmettez-nous votre cahier des charges en ligne ou contactez directement
              notre équipe commerciale.
            </p>
          </div>
          <div className="cta-band-actions" style={{ display: "flex", gap: "1rem" }}>
            <Link href="/quote" className="btn-premium btn-premium-primary" style={{ padding: "0.8rem 2rem" }}>
              <span>Demander un devis gratuit</span>
            </Link>
            <Link href="/contact" className="btn-premium btn-premium-secondary" style={{ padding: "0.8rem 2rem" }}>
              <span>Nous contacter</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
