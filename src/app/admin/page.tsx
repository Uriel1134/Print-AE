"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { useApp, QuoteRequest, BlogPost, GalleryItem } from "../context/store";
import { Lock, FileText, Plus, Trash2, Edit2, Check, Settings, Image as ImageIcon, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
  const {
    quotes, updateQuoteStatus, deleteQuoteRequest,
    blogPosts, addBlogPost, updateBlogPost, deleteBlogPost,
    galleryItems, addGalleryItem, deleteGalleryItem,
    settings, updateSettings
  } = useApp();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("quotes");

  // Auth Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin" || password === "aeprint") {
      setIsAuthenticated(true);
    } else {
      alert("Mot de passe incorrect ! (Conseil : utilisez 'admin')");
    }
  };

  // State for forms
  const [newBlog, setNewBlog] = useState({ title: "", excerpt: "", content: "", category: "Conseils en communication visuelle", image: "" });
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  
  const [newGallery, setNewGallery] = useState({ title: "", category: "textile", image: "", client: "", description: "" });
  
  const [editSettings, setEditSettings] = useState({
    slogan: settings.slogan,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    email: settings.email,
    address: settings.address,
    hours: settings.hours
  });

  // Blog Actions
  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBlog.title && newBlog.content) {
      if (editingBlogId) {
        updateBlogPost(editingBlogId, newBlog);
        setEditingBlogId(null);
      } else {
        addBlogPost(newBlog);
      }
      setNewBlog({ title: "", excerpt: "", content: "", category: "Conseils en communication visuelle", image: "" });
    }
  };

  const handleEditBlogTrigger = (post: BlogPost) => {
    setEditingBlogId(post.id);
    setNewBlog({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image
    });
  };

  // Gallery Actions
  const handleCreateGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGallery.title && newGallery.image) {
      addGalleryItem(newGallery);
      setNewGallery({ title: "", category: "textile", image: "", client: "", description: "" });
    }
  };

  // Settings Actions
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(editSettings);
    alert("Paramètres mis à jour avec succès !");
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <section className="admin-login-section">
          <div className="glass-card admin-login-card">
            <Lock size={28} style={{ color: "var(--accent)", marginBottom: "1rem" }} />
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>Administration</h2>
            <p style={{ fontSize: "0.875rem", color: "var(--ink-muted)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              Accès réservé à l&apos;équipe AE PRINT Services.
            </p>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                Se connecter
              </button>
            </form>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="admin-dashboard">
        <div className="container admin-layout">

          <aside className="glass-card admin-sidebar">
            <div className="admin-sidebar-title">Console</div>
            <nav className="admin-nav">
              <button
                onClick={() => setActiveTab("quotes")}
                className={`admin-nav-btn ${activeTab === "quotes" ? "admin-nav-btn--active" : ""}`}
              >
                <FileText size={16} />
                Devis ({quotes.length})
              </button>
              <button
                onClick={() => setActiveTab("blog")}
                className={`admin-nav-btn ${activeTab === "blog" ? "admin-nav-btn--active" : ""}`}
              >
                <FileText size={16} />
                Blog
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`admin-nav-btn ${activeTab === "gallery" ? "admin-nav-btn--active" : ""}`}
              >
                <ImageIcon size={16} />
                Galerie
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`admin-nav-btn ${activeTab === "settings" ? "admin-nav-btn--active" : ""}`}
              >
                <Settings size={16} />
                Paramètres
              </button>
            </nav>
            <button onClick={() => setIsAuthenticated(false)} className="admin-logout">
              Déconnexion
            </button>
          </aside>

          <div className="admin-content">
            
            {/* Tab 1: Quotes */}
            {activeTab === "quotes" && (
              <div className="glass-card admin-panel">
                <h2 className="admin-panel-title">Demandes de devis</h2>
                <p className="admin-panel-desc">Suivi des requêtes soumises via le site.</p>
                
                {quotes.length > 0 ? (
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Client</th>
                          <th>Service</th>
                          <th>Qté</th>
                          <th>Ville</th>
                          <th>Statut</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quotes.map((q) => (
                          <tr key={q.id}>
                            <td>{new Date(q.createdAt).toLocaleDateString("fr-FR")}</td>
                            <td>
                              <div style={{ fontWeight: 700 }}>{q.firstName} {q.lastName}</div>
                              <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>{q.company || "Particulier"}</div>
                              <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>Tel: {q.phone}</div>
                            </td>
                            <td>{q.serviceType}</td>
                            <td>{q.quantity}</td>
                            <td>{q.city}</td>
                            <td>
                              <select
                                value={q.status}
                                onChange={(e) => updateQuoteStatus(q.id, e.target.value as QuoteRequest["status"])}
                                className="admin-status-select"
                              >
                                <option value="En attente">En attente</option>
                                <option value="Contacté">Contacté</option>
                                <option value="Terminé">Terminé</option>
                              </select>
                            </td>
                            <td>
                              <div style={{ display: "flex", gap: "0.5rem" }}>
                                <a
                                  href={`https://wa.me/${q.whatsapp.replace(/[^\d]/g, "")}?text=Bonjour%20${q.firstName}%2C%20je%20vous%20contacte%20suite%20%C3%A0%20votre%20demande%20de%20devis%20AE%20PRINT%20Services.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="admin-action-btn"
                                  title="WhatsApp"
                                >
                                  <MessageSquare size={15} style={{ color: "#128C7E" }} />
                                </a>
                                <button
                                  onClick={() => deleteQuoteRequest(q.id)}
                                  className="admin-action-btn"
                                  title="Supprimer"
                                >
                                  <Trash2 size={15} style={{ color: "var(--error)" }} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p style={{ opacity: 0.7, padding: "2rem", textAlign: "center" }}>Aucune demande de devis n'a encore été soumise.</p>
                )}
              </div>
            )}

            {/* Tab 2: Blog Manager */}
            {activeTab === "blog" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {/* Form to add/edit article */}
                <div className="glass-card admin-panel">
                  <h2 style={contentTitleStyles}>{editingBlogId ? "Modifier l'article" : "Publier un nouvel article"}</h2>
                  <form onSubmit={handleCreateBlog} style={formStyles}>
                    <div style={formRowStyles}>
                      <div style={formGroupStyles}>
                        <label style={labelStyles}>Titre de l'article *</label>
                        <input
                          type="text"
                          required
                          value={newBlog.title}
                          onChange={(e) => setNewBlog(prev => ({ ...prev, title: e.target.value }))}
                          style={inputStyles}
                          placeholder="Ex: 5 conseils pour vos impressions..."
                        />
                      </div>
                      <div style={formGroupStyles}>
                        <label style={labelStyles}>Catégorie *</label>
                        <select
                          value={newBlog.category}
                          onChange={(e) => setNewBlog(prev => ({ ...prev, category: e.target.value }))}
                          style={selectStyles}
                        >
                          <option value="Conseils en communication visuelle">Conseils en communication visuelle</option>
                          <option value="Astuces d'impression">Astuces d'impression</option>
                          <option value="Tendances graphiques">Tendances graphiques</option>
                          <option value="Nouveautés produits">Nouveautés produits</option>
                        </select>
                      </div>
                    </div>

                    <div style={formGroupStyles}>
                      <label style={labelStyles}>URL de l'image de couverture</label>
                      <input
                        type="text"
                        value={newBlog.image}
                        onChange={(e) => setNewBlog(prev => ({ ...prev, image: e.target.value }))}
                        style={inputStyles}
                        placeholder="Ex: https://images.unsplash.com/photo-..."
                      />
                    </div>

                    <div style={formGroupStyles}>
                      <label style={labelStyles}>Extrait (Court résumé) *</label>
                      <input
                        type="text"
                        required
                        value={newBlog.excerpt}
                        onChange={(e) => setNewBlog(prev => ({ ...prev, excerpt: e.target.value }))}
                        style={inputStyles}
                        placeholder="Court texte accrocheur affiché sur les cartes..."
                      />
                    </div>

                    <div style={formGroupStyles}>
                      <label style={labelStyles}>Contenu de l'article *</label>
                      <textarea
                        required
                        rows={6}
                        value={newBlog.content}
                        onChange={(e) => setNewBlog(prev => ({ ...prev, content: e.target.value }))}
                        style={textareaStyles}
                        placeholder="Écrivez le contenu détaillé ici..."
                      />
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                      <button type="submit" className="btn btn-primary">
                        <Check size={18} />
                        <span>{editingBlogId ? "Enregistrer les modifications" : "Publier l'article"}</span>
                      </button>
                      {editingBlogId && (
                        <button type="button" onClick={() => { setEditingBlogId(null); setNewBlog({ title: "", excerpt: "", content: "", category: "Conseils en communication visuelle", image: "" }); }} className="btn btn-secondary">
                          Annuler
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* List of articles */}
                <div className="glass-card admin-panel">
                  <h3 style={sectionHeadingStyles}>Articles en ligne</h3>
                  <div style={listGridStyles}>
                    {blogPosts.map((post) => (
                      <div key={post.id} style={listItemStyles}>
                        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                          <img src={post.image || "https://images.unsplash.com/photo-1590650154751-121dbd9b48c0?q=80&w=100&auto=format&fit=crop"} alt={post.title} style={listItemImgStyles} />
                          <div>
                            <h4 style={{ fontWeight: 700, fontSize: "0.95rem" }}>{post.title}</h4>
                            <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>{post.category} - {post.date}</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button onClick={() => handleEditBlogTrigger(post)} style={actionBtnStyles} title="Modifier">
                            <Edit2 size={16} style={{ color: "var(--primary)" }} />
                          </button>
                          <button onClick={() => deleteBlogPost(post.id)} style={actionBtnStyles} title="Supprimer">
                            <Trash2 size={16} style={{ color: "var(--error)" }} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Gallery Manager */}
            {activeTab === "gallery" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {/* Form to add realization */}
                <div className="glass-card admin-panel">
                  <h2 style={contentTitleStyles}>Ajouter une réalisation à la Galerie</h2>
                  <form onSubmit={handleCreateGallery} style={formStyles}>
                    <div style={formRowStyles}>
                      <div style={formGroupStyles}>
                        <label style={labelStyles}>Nom du projet *</label>
                        <input
                          type="text"
                          required
                          value={newGallery.title}
                          onChange={(e) => setNewGallery(prev => ({ ...prev, title: e.target.value }))}
                          style={inputStyles}
                          placeholder="Ex: T-shirts d'équipe brodés"
                        />
                      </div>
                      <div style={formGroupStyles}>
                        <label style={labelStyles}>Catégorie *</label>
                        <select
                          value={newGallery.category}
                          onChange={(e) => setNewGallery(prev => ({ ...prev, category: e.target.value }))}
                          style={selectStyles}
                        >
                          <option value="textile">Impression Textile</option>
                          <option value="enseignes">Enseignes</option>
                          <option value="baches">Bâches</option>
                          <option value="kakemonos">Kakémonos & Roll-up</option>
                          <option value="cartes">Cartes de Visite</option>
                          <option value="flyers">Flyers & Brochures</option>
                          <option value="habillage">Habillage Véhicules</option>
                          <option value="objets">Objets Personnalisés</option>
                        </select>
                      </div>
                    </div>

                    <div style={formRowStyles}>
                      <div style={formGroupStyles}>
                        <label style={labelStyles}>URL de la photo *</label>
                        <input
                          type="text"
                          required
                          value={newGallery.image}
                          onChange={(e) => setNewGallery(prev => ({ ...prev, image: e.target.value }))}
                          style={inputStyles}
                          placeholder="Ex: https://images.unsplash.com/photo-..."
                        />
                      </div>
                      <div style={formGroupStyles}>
                        <label style={labelStyles}>Nom du Client (Optionnel)</label>
                        <input
                          type="text"
                          value={newGallery.client}
                          onChange={(e) => setNewGallery(prev => ({ ...prev, client: e.target.value }))}
                          style={inputStyles}
                          placeholder="Ex: Clinique du Centre"
                        />
                      </div>
                    </div>

                    <div style={formGroupStyles}>
                      <label style={labelStyles}>Description du projet</label>
                      <textarea
                        rows={3}
                        value={newGallery.description}
                        onChange={(e) => setNewGallery(prev => ({ ...prev, description: e.target.value }))}
                        style={textareaStyles}
                        placeholder="Décrivez brièvement le support, la matière, la dimension..."
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      <Plus size={18} />
                      <span>Ajouter le projet</span>
                    </button>
                  </form>
                </div>

                {/* List of items */}
                <div className="glass-card admin-panel">
                  <h3 style={sectionHeadingStyles}>Galerie en ligne</h3>
                  <div style={listGridStyles}>
                    {galleryItems.map((item) => (
                      <div key={item.id} style={listItemStyles}>
                        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                          <img src={item.image} alt={item.title} style={listItemImgStyles} />
                          <div>
                            <h4 style={{ fontWeight: 700, fontSize: "0.95rem" }}>{item.title}</h4>
                            <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>Catégorie: {item.category} | Client: {item.client || "AE PRINT"}</span>
                          </div>
                        </div>
                        <button onClick={() => deleteGalleryItem(item.id)} style={actionBtnStyles} title="Supprimer">
                          <Trash2 size={16} style={{ color: "var(--error)" }} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Site Settings */}
            {activeTab === "settings" && (
              <div className="glass-card admin-panel">
                <h2 style={contentTitleStyles}>Informations & Textes du Site</h2>
                <p style={contentDescStyles}>Modifiez les coordonnées, horaires et slogan. Les changements s'appliqueront immédiatement.</p>
                <form onSubmit={handleSaveSettings} style={formStyles}>
                  <div style={formRowStyles}>
                    <div style={formGroupStyles}>
                      <label style={labelStyles}>Slogan de l'entreprise *</label>
                      <input
                        type="text"
                        required
                        value={editSettings.slogan}
                        onChange={(e) => setEditSettings(prev => ({ ...prev, slogan: e.target.value }))}
                        style={inputStyles}
                      />
                    </div>
                    <div style={formGroupStyles}>
                      <label style={labelStyles}>Adresse e-mail *</label>
                      <input
                        type="email"
                        required
                        value={editSettings.email}
                        onChange={(e) => setEditSettings(prev => ({ ...prev, email: e.target.value }))}
                        style={inputStyles}
                      />
                    </div>
                  </div>

                  <div style={formRowStyles}>
                    <div style={formGroupStyles}>
                      <label style={labelStyles}>Téléphone Mobile *</label>
                      <input
                        type="text"
                        required
                        value={editSettings.phone}
                        onChange={(e) => setEditSettings(prev => ({ ...prev, phone: e.target.value }))}
                        style={inputStyles}
                      />
                    </div>
                    <div style={formGroupStyles}>
                      <label style={labelStyles}>Numéro WhatsApp *</label>
                      <input
                        type="text"
                        required
                        value={editSettings.whatsapp}
                        onChange={(e) => setEditSettings(prev => ({ ...prev, whatsapp: e.target.value }))}
                        style={inputStyles}
                      />
                    </div>
                  </div>

                  <div style={formRowStyles}>
                    <div style={formGroupStyles}>
                      <label style={labelStyles}>Adresse Physique *</label>
                      <input
                        type="text"
                        required
                        value={editSettings.address}
                        onChange={(e) => setEditSettings(prev => ({ ...prev, address: e.target.value }))}
                        style={inputStyles}
                      />
                    </div>
                    <div style={formGroupStyles}>
                      <label style={labelStyles}>Horaires d'ouverture *</label>
                      <input
                        type="text"
                        required
                        value={editSettings.hours}
                        onChange={(e) => setEditSettings(prev => ({ ...prev, hours: e.target.value }))}
                        style={inputStyles}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
                    Enregistrer les paramètres
                  </button>
                </form>
              </div>
            )}
            
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

const contentTitleStyles: React.CSSProperties = {
  fontSize: "1.75rem",
  fontWeight: 800,
  fontFamily: "var(--font-display)",
};

const contentDescStyles: React.CSSProperties = {
  fontSize: "0.9rem",
  opacity: 0.75,
  lineHeight: 1.5,
  marginBottom: "2rem",
};

const actionBtnStyles: React.CSSProperties = {
  background: "var(--border)",
  border: "none",
  borderRadius: "6px",
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s",
};

// Form layouts inside admin
const formStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
};

const formRowStyles: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
};

const formGroupStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const labelStyles: React.CSSProperties = {
  fontSize: "0.85rem",
  fontWeight: 600,
  opacity: 0.9,
};

const inputStyles: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "var(--background)",
  border: "1px solid var(--border)",
  color: "var(--foreground)",
  borderRadius: "8px",
  outline: "none",
  fontSize: "0.9rem",
};

const selectStyles: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "var(--background)",
  border: "1px solid var(--border)",
  color: "var(--foreground)",
  borderRadius: "8px",
  outline: "none",
  fontSize: "0.9rem",
};

const textareaStyles: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "var(--background)",
  border: "1px solid var(--border)",
  color: "var(--foreground)",
  borderRadius: "8px",
  outline: "none",
  fontSize: "0.9rem",
  fontFamily: "var(--font-sans)",
  resize: "vertical",
};

const sectionHeadingStyles: React.CSSProperties = {
  fontSize: "1.1rem",
  fontWeight: 700,
  marginBottom: "1rem",
  fontFamily: "var(--font-display)",
};

const listGridStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
};

const listItemStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  background: "var(--background)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
};

const listItemImgStyles: React.CSSProperties = {
  width: "48px",
  height: "48px",
  objectFit: "cover",
  borderRadius: "6px",
};
