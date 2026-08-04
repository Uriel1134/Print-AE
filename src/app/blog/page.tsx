"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { useApp, BlogPost } from "../context/store";
import { Search, Calendar, Clock, ArrowRight, X } from "lucide-react";

export default function Blog() {
  const { blogPosts } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = [
    { id: "all", name: "Tous" },
    { id: "Conseils en communication visuelle", name: "Conseils visuels" },
    { id: "Astuces d'impression", name: "Impression" },
    { id: "Tendances graphiques", name: "Tendances" },
    { id: "Nouveautés produits", name: "Produits" },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <h1>Blog & conseils</h1>
          <p>
            Guides pratiques, tendances graphiques et actualités de notre atelier
            pour optimiser vos supports de communication.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
            <div style={{ position: "relative", maxWidth: 420 }}>
              <Search size={15} style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)" }} />
              <input
                type="search"
                placeholder="Rechercher un article…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
                style={{ paddingLeft: "2.5rem" }}
              />
            </div>

            <div className="category-tab-container" style={{ marginBottom: 0 }}>
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
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid-3-cols">
              {filteredPosts.map((post) => (
                <article key={post.id} className="blog-card" onClick={() => setActivePost(post)}>
                  <img src={post.image} alt={post.title} className="blog-card-image" />
                  <div className="blog-card-body">
                    <span className="badge">{post.category}</span>
                    <div className="blog-card-meta">
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <Calendar size={12} /> {post.date}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <span className="blog-card-read">
                      Lire l&apos;article <ArrowRight size={13} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <p style={{ marginBottom: "1rem" }}>Aucun article trouvé.</p>
              <button
                onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                className="btn btn-outline"
              >
                Réinitialiser
              </button>
            </div>
          )}
        </div>
      </section>

      {activePost && (
        <div className="lightbox-backdrop" onClick={() => setActivePost(null)} role="dialog" aria-modal="true">
          <div className="lightbox-panel" style={{ maxWidth: 720 }} onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setActivePost(null)} aria-label="Fermer">
              <X size={18} />
            </button>
            <img src={activePost.image} alt={activePost.title} style={{ width: "100%", height: 240, objectFit: "cover" }} />
            <div style={{ padding: "2rem" }}>
              <span className="badge">{activePost.category}</span>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 600, margin: "0.75rem 0" }}>{activePost.title}</h2>
              <div style={{ display: "flex", gap: "1rem", fontSize: "0.78rem", color: "var(--ink-faint)", marginBottom: "1.25rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><Calendar size={12} /> {activePost.date}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><Clock size={12} /> {activePost.readTime}</span>
              </div>
              <div style={{ lineHeight: 1.75, fontSize: "0.9375rem", color: "var(--ink-muted)" }}>
                {activePost.content.split("\n\n").map((para, idx) => (
                  <p key={idx} style={{ marginBottom: "1rem" }}>{para}</p>
                ))}
              </div>
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem", marginTop: "0.5rem" }}>
                <button onClick={() => setActivePost(null)} className="btn btn-outline">Fermer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </>
  );
}
