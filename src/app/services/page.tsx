"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import FAQ from "../components/FAQ";
import { useApp, getServiceIcon } from "../context/store";
import { CheckCircle, MessageCircle } from "lucide-react";

export default function Services() {
  const { services, settings } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [calcProductId, setCalcProductId] = useState(services[1]?.id || "tshirt-coton");
  const [calcQuantity, setCalcQuantity] = useState(50);
  const [calcWidth, setCalcWidth] = useState(1);
  const [calcHeight, setCalcHeight] = useState(1);

  const categories = [
    { id: "all", name: "Tous" },
    { id: "textile", name: "Textile" },
    { id: "enseignes", name: "Enseignes" },
    { id: "habillage", name: "Branding auto" },
    { id: "kakemonos", name: "Kakémonos" },
    { id: "baches", name: "Bâches & VIP" },
    { id: "cartes", name: "Cartes & flyers" },
    { id: "conception", name: "Conception" },
    { id: "objets", name: "Objets" },
  ];

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const calculateEstimate = () => {
    const service = services.find((s) => s.id === calcProductId);
    if (!service) return 0;

    if (service.id === "tasse-sublimation") {
      const qty = Math.max(50, calcQuantity);
      if (qty >= 100) return qty * 2500;
      if (qty >= 80) return qty * 3000;
      return qty * 5000;
    }
    if (service.id.startsWith("textile-blanc")) return Math.max(50, calcQuantity) * 2500;
    if (service.id.startsWith("textile-couleur")) return Math.max(50, calcQuantity) * 3500;
    if (service.id.startsWith("tshirt-coton")) return Math.max(50, calcQuantity) * 4000;
    if (service.id.startsWith("casquette-blanche")) return Math.max(50, calcQuantity) * 2000;
    if (service.id.startsWith("foulard")) return Math.max(50, calcQuantity) * 2500;
    if (service.id === "branding-auto") return 60000 * calcQuantity;
    if (service.id === "cachet") return 15000 * calcQuantity;
    if (service.id === "carte-visite") return Math.max(1, Math.ceil(calcQuantity / 100)) * 15000;
    if (service.id === "banderole-vinyl") return Math.round(calcWidth * calcHeight * 15000);
    if (service.id === "enseigne-double") return Math.round(calcWidth * calcHeight * 400000);
    if (service.id === "enseigne-simple") return Math.round(calcWidth * calcHeight * 350000);
    if (service.id === "kakemono-petite") return 55000 * calcQuantity;
    return "Sur devis";
  };

  const estimate = calculateEstimate();
  const selectedService = services.find((s) => s.id === calcProductId);
  const showQuantity = selectedService && !["enseigne-double", "enseigne-simple", "banderole-vinyl"].includes(selectedService.id);
  const showDimensions = selectedService && ["enseigne-double", "enseigne-simple", "banderole-vinyl"].includes(selectedService.id);

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <h1>Solutions d&apos;impression professionnelle</h1>
          <p>
            Catalogue complet de nos prestations en communication visuelle.
            Tarifs indicatifs et simulateur intégré pour estimer votre projet.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="category-tab-container">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-tab-btn ${selectedCategory === cat.id ? "category-tab-btn-active" : ""}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid-3-cols" style={{ gap: "2rem" }}>
            {filteredServices.map((service) => (
              <article key={service.id} className="feature-card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                
                {/* Service Card Thumbnail - Vector Icon Illustration */}
                <div style={{ 
                  position: "relative", 
                  width: "100%", 
                  height: "140px", 
                  background: "linear-gradient(135deg, var(--primary), var(--accent-secondary))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff"
                }}>
                  {(() => {
                    const IconComponent = getServiceIcon(service.id);
                    return <IconComponent size={48} />;
                  })()}
                  <span className="badge-custom" style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(10, 12, 20, 0.85)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.15)", textTransform: "uppercase", fontSize: "0.65rem", fontWeight: 700 }}>
                    {service.category}
                  </span>
                </div>

                {/* Card Body */}
                <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem", flexGrow: 1 }}>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--ink-faint)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Livraison : {service.deliveryTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>{service.name}</h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.6, margin: 0, color: "var(--ink-muted)" }}>{service.description}</p>
                  
                  {service.details && (
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem", margin: 0, padding: 0 }}>
                      {service.details.map((detail, idx) => (
                        <li key={idx} style={{ display: "flex", gap: "0.5rem", fontSize: "0.8rem", color: "var(--ink-muted)", alignItems: "center" }}>
                          <CheckCircle size={13} style={{ color: "var(--primary)", flexShrink: 0 }} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Card Price & Action Footer */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "1.25rem", marginTop: "auto" }}>
                    <div>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ink-faint)" }}>Tarif</span>
                      <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--ink)" }}>{service.price}</div>
                    </div>
                    <Link href={`/quote?service=${service.id}`} className="btn-premium btn-premium-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>
                      <span>Choisir</span>
                    </Link>
                  </div>

                </div>

              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container grid-2-cols">
          <div>
            <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
              Simulateur de tarif
            </h2>
            <p style={{ lineHeight: 1.75, marginTop: "1rem" }}>
              Sélectionnez une prestation et ajustez la quantité ou les dimensions pour obtenir
              une estimation indicative. Les tarifs finaux sont confirmés après étude de votre brief.
            </p>
            <p style={{ fontSize: "0.875rem", marginTop: "1rem", color: "var(--ink-faint)" }}>
              Pour les textiles et objets, le tarif inclut le support et le marquage.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "1.5rem" }}>Calculateur</h3>

            <div className="form-group">
              <label className="form-label">Prestation</label>
              <select
                value={calcProductId}
                onChange={(e) => {
                  setCalcProductId(e.target.value);
                  const sel = services.find((s) => s.id === e.target.value);
                  setCalcQuantity(sel?.minQty ?? 1);
                }}
                className="form-select"
              >
                {services
                  .filter((s) => !s.price.includes("Sur devis"))
                  .map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
              </select>
            </div>

            {showQuantity && (
              <div className="form-group">
                <label className="form-label">
                  Quantité{selectedService?.unit ? ` (${selectedService.unit})` : ""}
                  {selectedService?.minQty && (
                    <span style={{ color: "var(--ink-faint)", fontWeight: 400 }}> — min. {selectedService.minQty}</span>
                  )}
                </label>
                <input
                  type="number"
                  min={selectedService?.minQty || 1}
                  value={calcQuantity}
                  onChange={(e) => setCalcQuantity(parseInt(e.target.value) || 1)}
                  className="form-input"
                />
              </div>
            )}

            {showDimensions && (
              <div className="grid-2-cols-equal" style={{ gap: "0.75rem" }}>
                <div className="form-group">
                  <label className="form-label">Largeur (m)</label>
                  <input type="number" min="0.5" step="0.1" value={calcWidth} onChange={(e) => setCalcWidth(parseFloat(e.target.value) || 1)} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Hauteur (m)</label>
                  <input type="number" min="0.5" step="0.1" value={calcHeight} onChange={(e) => setCalcHeight(parseFloat(e.target.value) || 1)} className="form-input" />
                </div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "var(--surface-alt)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", marginTop: "0.5rem" }}>
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--ink-muted)" }}>Estimation</span>
              <span style={{ fontSize: "1.25rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>
                {typeof estimate === "number" ? `${estimate.toLocaleString("fr-FR")} FCFA` : estimate}
              </span>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
              <Link
                href={`/quote?service=${calcProductId}&qty=${calcQuantity}&budget=${typeof estimate === "number" ? estimate : ""}`}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Commander
              </Link>
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(`Devis pour ${calcQuantity} x ${selectedService?.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
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
