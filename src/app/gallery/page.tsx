"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { useApp, GalleryItem } from "../context/store";
import { X, Printer, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery() {
  const { galleryItems } = useApp();
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Animation variants
  const itemVariant: any = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <>
      <Navbar />

      <section className="page-hero" style={{ padding: "6rem 0 4rem" }}>
        <div className="container">
          <h1>Galerie photos & vidéos</h1>
          <p>
            Un aperçu réel et authentique de nos impressions et marquages réalisés directement au sein de notre atelier à Libreville.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: "3rem 0 6rem" }}>
        <div className="container">
          
          {/* Grid List of Gallery Items */}
          {galleryItems.length > 0 ? (
            <div className="grid-3-cols" style={{ gap: "1.75rem" }}>
              {galleryItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  variants={itemVariant}
                  initial="hidden"
                  animate="visible"
                  type="button"
                  className="portfolio-item"
                  onClick={() => setActiveItem(item)}
                  style={{ 
                    border: "none", 
                    padding: 0, 
                    background: "none", 
                    cursor: "pointer", 
                    position: "relative",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    height: "320px",
                    width: "100%"
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  {/* Media Type Indicator */}
                  {item.video && (
                    <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(10, 12, 20, 0.8)", color: "#ffffff", padding: "6px 10px", borderRadius: "var(--radius-sm)", fontSize: "0.68rem", display: "flex", alignItems: "center", gap: "6px", zIndex: 5, border: "1px solid rgba(255,255,255,0.15)", fontWeight: 600, letterSpacing: "0.05em" }}>
                      <Play size={10} fill="currentColor" />
                      <span>VIDÉO</span>
                    </div>
                  )}
                  
                  {/* Image tag displaying the cover of the work */}
                  <img 
                    src={item.image} 
                    alt="AE PRINT Services Réalisation" 
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                    className="gallery-image-hover"
                  />

                  {/* Dark transparent tint overlay on hover */}
                  <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.15)", transition: "background 0.3s ease" }} className="gallery-tint-hover" />
                </motion.button>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p style={{ marginBottom: "1.5rem", color: "var(--foreground-light)" }}>Aucune réalisation disponible pour le moment.</p>
              <Link href="/quote" className="btn-premium btn-premium-primary">Demander un devis</Link>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox / Video Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="lightbox-backdrop" onClick={() => setActiveItem(null)} role="dialog" aria-modal="true">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="lightbox-panel" 
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "720px", background: "#06080d", display: "flex", flexDirection: "column", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <button className="lightbox-close" onClick={() => setActiveItem(null)} aria-label="Fermer" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <X size={18} />
              </button>
              
              {/* Centered Media Container (Image or Video) */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "360px", position: "relative" }}>
                {activeItem.video ? (
                  <video 
                    src={activeItem.video} 
                    controls 
                    autoPlay 
                    style={{ width: "100%", maxHeight: "540px", objectFit: "contain", outline: "none" }} 
                  />
                ) : (
                  <img 
                    src={activeItem.image} 
                    alt="AE PRINT Services Réalisation" 
                    style={{ width: "100%", maxHeight: "540px", objectFit: "contain" }} 
                  />
                )}
              </div>

              {/* Simple Bottom Action Bar (No titles, no categories) */}
              <div style={{ padding: "1.5rem", background: "var(--surface)", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "center", gap: "1rem" }}>
                <Link href="/quote" className="btn-premium btn-premium-primary" style={{ padding: "0.6rem 2rem" }} onClick={() => setActiveItem(null)}>
                  <Printer size={16} />
                  <span>Obtenir un devis similaire</span>
                </Link>
                <button onClick={() => setActiveItem(null)} className="btn-premium btn-premium-secondary" style={{ padding: "0.6rem 1.5rem" }}>
                  <span>Fermer</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
