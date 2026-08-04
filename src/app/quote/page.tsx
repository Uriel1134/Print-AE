"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import FAQ from "../components/FAQ";
import { useApp } from "../context/store";
import { Send, FileUp, CheckCircle, Clipboard, AlertCircle, MessageCircle } from "lucide-react";

function QuoteForm() {
  const { services, addQuoteRequest, settings } = useApp();
  const searchParams = useSearchParams();

  // Form Fields
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    company: "",
    phone: "",
    whatsapp: "",
    email: "",
    city: "Libreville",
    serviceType: "textile-blanc",
    description: "",
    quantity: 50,
    budget: "",
    desiredDate: ""
  });

  const [file, setFile] = useState<{ name: string; size: number; type: string; dataUrl?: string } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Read URL query params to auto-fill fields
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const qtyParam = searchParams.get("qty");
    const budgetParam = searchParams.get("budget");

    if (serviceParam) {
      setFormData((prev) => ({ ...prev, serviceType: serviceParam }));
      const matchingService = services.find(s => s.id === serviceParam);
      if (matchingService && matchingService.minQty) {
        setFormData((prev) => ({ ...prev, quantity: matchingService.minQty ?? 1 }));
      }
    }
    if (qtyParam) {
      setFormData((prev) => ({ ...prev, quantity: parseInt(qtyParam) || 50 }));
    }
    if (budgetParam) {
      setFormData((prev) => ({ ...prev, budget: budgetParam }));
    }
  }, [searchParams, services]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Drag and Drop File Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (uploadedFile: File) => {
    if (uploadedFile.size > 10 * 1024 * 1024) {
      alert("La taille du fichier ne doit pas dépasser 10 Mo.");
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile({
        name: uploadedFile.name,
        size: uploadedFile.size,
        type: uploadedFile.type,
        dataUrl: reader.result as string
      });
    };
    reader.readAsDataURL(uploadedFile);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Mitigate bots silently
      setShowConfirmation(true);
      setSubmittedQuote({
        firstName: formData.firstName,
        lastName: formData.lastName,
        serviceType: formData.serviceType,
        quantity: formData.quantity,
        budget: formData.budget,
        city: formData.city,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        desiredDate: formData.desiredDate,
        description: formData.description
      });
      setHoneypot("");
      return;
    }
    
    const quoteData = {
      ...formData,
      quantity: Number(formData.quantity),
      file: file
    };

    addQuoteRequest(quoteData);
    setSubmittedQuote(quoteData);
    setShowConfirmation(true);

    // Reset Form
    setFormData({
      lastName: "",
      firstName: "",
      company: "",
      phone: "",
      whatsapp: "",
      email: "",
      city: "Libreville",
      serviceType: "textile-blanc",
      description: "",
      quantity: 50,
      budget: "",
      desiredDate: ""
    });
    setFile(null);
  };

  // WhatsApp Formatting
  const getWhatsAppLink = () => {
    if (!submittedQuote) return "#";
    
    const matchingService = services.find(s => s.id === submittedQuote.serviceType);
    const serviceName = matchingService ? matchingService.name : submittedQuote.serviceType;
    
    const rawNumber = settings.whatsapp.replace(/[^\d]/g, "");
    const cleanWhatsApp = rawNumber.startsWith("+") ? rawNumber.slice(1) : `241${rawNumber.replace(/^241/, "").replace(/^0/, "")}`;

    const text = `Bonjour AE PRINT Services,\n` +
      `Je souhaite obtenir un devis pour :\n` +
      `• *Prestation :* ${serviceName}\n` +
      `• *Quantité :* ${submittedQuote.quantity}\n` +
      `• *Budget estimatif :* ${submittedQuote.budget || "Non spécifié"} FCFA\n` +
      `• *Nom du client :* ${submittedQuote.firstName} ${submittedQuote.lastName}\n` +
      `• *Entreprise :* ${submittedQuote.company || "Particulier"}\n` +
      `• *Ville :* ${submittedQuote.city}\n` +
      `• *Téléphone / WhatsApp :* ${submittedQuote.phone} / ${submittedQuote.whatsapp || "-"}\n` +
      `• *Date souhaitée :* ${submittedQuote.desiredDate || "Dès que possible"}\n` +
      `• *Description du besoin :* ${submittedQuote.description}\n` +
      `${submittedQuote.file ? `• *Fichier joint :* ${submittedQuote.file.name}` : ""}`;

    return `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(text)}`;
  };

  const copyToClipboard = () => {
    if (!submittedQuote) return;

    const matchingService = services.find(s => s.id === submittedQuote.serviceType);
    const serviceName = matchingService ? matchingService.name : submittedQuote.serviceType;

    const text = `--- DEMANDE DE DEVIS AE PRINT Services ---\n` +
      `Client : ${submittedQuote.firstName} ${submittedQuote.lastName}\n` +
      `Entreprise : ${submittedQuote.company || "Particulier"}\n` +
      `Ville : ${submittedQuote.city}\n` +
      `Email : ${submittedQuote.email}\n` +
      `Téléphone : ${submittedQuote.phone}\n` +
      `WhatsApp : ${submittedQuote.whatsapp || "Non spécifié"}\n` +
      `Service demandé : ${serviceName}\n` +
      `Quantité : ${submittedQuote.quantity}\n` +
      `Budget estimatif : ${submittedQuote.budget ? `${submittedQuote.budget} FCFA` : "Non spécifié"}\n` +
      `Date souhaitée : ${submittedQuote.desiredDate || "Dès que possible"}\n` +
      `Description du besoin : ${submittedQuote.description}\n` +
      `${submittedQuote.file ? `Fichier : ${submittedQuote.file.name}` : ""}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <h1>Demande de devis</h1>
          <p>
            Décrivez votre projet et recevez une offre tarifaire sous 24 heures.
            Vous pouvez également transmettre votre demande directement via WhatsApp.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="card">
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Honeypot anti-spam field */}
              <input
                type="text"
                name="website_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />
              
              {/* Section 1: Informations Personnelles */}
              <h3 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border)" }}>
                1. Informations personnelles
              </h3>
              <div className="grid-2-cols-equal" style={{ gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Nom *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Dupont"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Prénom *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Jean"
                  />
                </div>
              </div>

              <div className="grid-2-cols-equal" style={{ gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Nom de l'entreprise</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Ma Société SARL (Optionnel)"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Ville *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Libreville">Libreville</option>
                    <option value="Owendo">Owendo</option>
                    <option value="Akanda">Akanda</option>
                    <option value="Port-Gentil">Port-Gentil</option>
                    <option value="Franceville">Franceville</option>
                    <option value="Oyem">Oyem</option>
                    <option value="Moanda">Moanda</option>
                    <option value="Lambaréné">Lambaréné</option>
                    <option value="Mouila">Mouila</option>
                    <option value="Tchibanga">Tchibanga</option>
                  </select>
                </div>
              </div>

              <div className="grid-3-cols" style={{ gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="jean.dupont@email.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone Mobile *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="066720013"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp (Optionnel)</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="077883005"
                  />
                </div>
              </div>

              {/* Section 2: Détails de la Commande */}
              <h3 className="form-section-title form-section-title--spaced">
                2. Détails de la commande
              </h3>
              
              <div className="grid-2-cols-equal" style={{ gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Type de Prestation *</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} ({service.price})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Quantité souhaitée *</label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid-2-cols-equal" style={{ gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Budget Estimatif (FCFA)</label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Ex: 50 000 (Optionnel)"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Date limite souhaitée</label>
                  <input
                    type="date"
                    name="desiredDate"
                    value={formData.desiredDate}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description du besoin *</label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Décrivez votre projet (dimensions, couleurs, types de textile, finitions souhaitées...)"
                />
              </div>

              {/* File Upload Area */}
              <div className="form-group">
                <label className="form-label">Joindre un fichier (Logo, Maquette, PDF... Max 10 Mo)</label>
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`file-upload-zone ${dragActive ? "file-upload-zone--active" : ""}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf,.ai,.psd,.zip"
                  />
                  <FileUp size={32} style={{ color: "var(--accent)", margin: "0 auto" }} />
                  <p>Glissez-déposez votre fichier ou cliquez pour parcourir</p>
                  <p>PNG, JPG, PDF, ZIP, AI, PSD — max. 10 Mo</p>
                </div>

                {file && (
                  <div className="file-preview">
                    <div>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--ink)" }}>{file.name}</span>
                      <span style={{ display: "block", fontSize: "0.75rem", color: "var(--ink-faint)" }}>{(file.size / (1024 * 1024)).toFixed(2)} Mo</span>
                    </div>
                    <button type="button" onClick={removeFile} className="file-preview-remove">
                      Supprimer
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-premium btn-premium-primary" style={{ width: "100%", marginTop: "1.5rem" }}>
                <Send size={16} />
                Envoyer ma demande
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirmation && submittedQuote && (
        <div className="modal-backdrop" onClick={() => setShowConfirmation(false)}>
          <div className="modal-panel modal-panel--center" onClick={(e) => e.stopPropagation()}>
            <CheckCircle size={44} style={{ color: "var(--primary)" }} />
            <h2 style={{ fontSize: "1.375rem", fontWeight: 600 }}>Demande enregistrée</h2>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
              Merci <strong>{submittedQuote.firstName}</strong>. Nous vous répondrons sous 24 heures.
            </p>

            <div className="modal-notice">
              <AlertCircle size={16} style={{ color: "var(--primary)", flexShrink: 0, marginTop: 2 }} />
              <p>
                Pour un traitement prioritaire, transmettez ce devis directement à notre équipe via WhatsApp.
              </p>
            </div>

            <div className="modal-actions" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium"
                style={{ background: "#25D366", color: "#ffffff" }}
                onClick={() => setShowConfirmation(false)}
              >
                <MessageCircle size={16} />
                Envoyer via WhatsApp
              </a>
              <button onClick={copyToClipboard} className="btn-premium btn-premium-secondary">
                <Clipboard size={15} />
                {copied ? "Copié" : "Copier le récapitulatif"}
              </button>
              <button onClick={() => setShowConfirmation(false)} className="btn-premium btn-premium-secondary" style={{ background: "transparent", borderColor: "transparent" }}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <FAQ />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center", color: "var(--foreground)", fontFamily: "var(--font-display)" }}>Chargement...</div>}>
      <QuoteForm />
    </Suspense>
  );
}
