"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "Quels sont vos délais de fabrication à Libreville ?",
    answer: "Nos délais varient généralement de 24h à 72h selon la complexité de votre projet et les quantités demandées. Pour les commandes urgentes (marquage textile DTF, cartes de visite, etc.), n'hésitez pas à nous le signaler pour un traitement prioritaire."
  },
  {
    question: "Quels formats de fichiers acceptez-vous pour l'impression ?",
    answer: "Nous acceptons les fichiers vectoriels (PDF, AI, EPS, SVG) ainsi que les images haute définition (PNG, TIFF, JPEG) en 300 DPI minimum. Notre équipe peut également vous accompagner dans la conception ou l'adaptation de vos maquettes."
  },
  {
    question: "Proposez-vous la livraison à Akanda ou Owendo ?",
    answer: "Oui, nous livrons sur l'ensemble de Libreville et sa périphérie (Akanda, Owendo). Les frais de livraison sont évalués en fonction de votre localisation et du volume de la commande."
  },
  {
    question: "Quels sont vos modes de paiement ?",
    answer: "Pour faciliter vos transactions au Gabon, nous acceptons Airtel Money, Moov Money, les chèques de banque, les virements bancaires et les espèces. Un acompte de 50% à 70% est requis pour valider le lancement en production."
  },
  {
    question: "Puis-je commander de petites ou de grandes séries ?",
    answer: "Absolument. Nous sommes équipés pour répondre aussi bien aux besoins unitaires (t-shirts personnalisés à l'unité) qu'aux productions industrielles de masse (commandes de plus de 1000 t-shirts, habillage de parcs entiers de véhicules, etc.). Des tarifs dégressifs très avantageux s'appliquent sur les volumes."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section" style={{ padding: "6rem 0", borderTop: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="section-header">
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
              FAQ
            </span>
            <h2 className="section-title" style={{ marginTop: "0.5rem" }}>Foire Aux Questions</h2>
          </div>
        </div>
        
        <div style={{ 
          maxWidth: "800px", 
          margin: "2.5rem auto 0 auto", 
          display: "flex", 
          flexDirection: "column", 
          gap: "1rem" 
        }}>
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                style={{ 
                  background: "var(--surface)", 
                  border: "1px solid var(--border)", 
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  boxShadow: isOpen ? "var(--shadow-sm)" : "var(--shadow-xs)",
                  transition: "all var(--transition)"
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    padding: "1.5rem 2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "var(--ink)",
                    fontWeight: 700,
                    fontSize: "1.1rem"
                  }}
                >
                  <span>{item.question}</span>
                  <ChevronDown 
                    size={18} 
                    style={{ 
                      color: "var(--primary)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      flexShrink: 0,
                      marginLeft: "1rem"
                    }} 
                  />
                </button>
                
                <div 
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    opacity: isOpen ? 1 : 0,
                    transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                    overflow: "hidden"
                  }}
                >
                  <div style={{ 
                    padding: "0 2rem 1.5rem 2rem", 
                    color: "var(--ink-muted)", 
                    fontSize: "0.975rem", 
                    lineHeight: 1.7 
                  }}>
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
