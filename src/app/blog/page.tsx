"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { useApp, BlogPost } from "../context/store";
import { Search, Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react";

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

  // Sync with URL query parameter ?id=...
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      if (id) {
        const post = blogPosts.find((p) => p.id === id);
        if (post) {
          setActivePost(post);
        } else {
          setActivePost(null);
        }
      } else {
        setActivePost(null);
      }
    };

    // Run on initial mount
    handlePopState();

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [blogPosts]);

  const selectPost = (post: BlogPost | null) => {
    setActivePost(post);
    if (post) {
      window.history.pushState(null, "", `?id=${post.id}`);
    } else {
      window.history.pushState(null, "", `/blog`);
    }
  };

  const filteredPosts = blogPosts.filter((post) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Dedicated single blog article page layout
  if (activePost) {
    return (
      <>
        <Navbar />
        
        <article className="section" style={{ padding: "4rem 0 6rem" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            {/* Breadcrumb / Back button */}
            <div style={{ marginBottom: "2rem" }}>
              <button 
                onClick={() => selectPost(null)} 
                className="btn btn-outline" 
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                <ArrowLeft size={16} /> Retour aux articles
              </button>
            </div>

            {/* Header info */}
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
            }}>{activePost.category}</span>
            
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: "1.5rem", color: "var(--ink)" }}>
              {activePost.title}
            </h1>
            
            <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.85rem", color: "var(--ink-faint)", marginBottom: "2.5rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><Calendar size={14} /> {activePost.date}</span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><Clock size={14} /> {activePost.readTime}</span>
              <span>Par {activePost.author}</span>
            </div>

            {/* Main Image */}
            <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: "3rem", border: "1px solid var(--border)", maxHeight: "450px" }}>
              <img src={activePost.image} alt={activePost.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>

            {/* Content body */}
            <div style={{ lineHeight: 1.8, fontSize: "1.0625rem", color: "var(--ink-muted)" }}>
              {activePost.content.split("\n\n").map((para, idx) => (
                <p key={idx} style={{ marginBottom: "1.5rem" }}>{para}</p>
              ))}
            </div>

            {/* Bottom Actions */}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem", marginTop: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
              <button onClick={() => selectPost(null)} className="btn btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <ArrowLeft size={16} /> Retour au blog
              </button>
              <a 
                href={`https://wa.me/24177883005?text=Bonjour%20AE%20PRINT%20Services%2C%20je%20viens%20de%20lire%20votre%20article%20%22${encodeURIComponent(activePost.title)}%22%20et%20j'aimerais%20en%20savoir%20plus.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium btn-premium-primary"
                style={{ padding: "0.75rem 1.5rem" }}
              >
                Discuter sur WhatsApp
              </a>
            </div>
          </div>
        </article>

        <Footer />
        <WhatsAppButton />
      </>
    );
  }

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
                <article key={post.id} className="blog-card" onClick={() => selectPost(post)} style={{ cursor: "pointer" }}>
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

      <Footer />
      <WhatsAppButton />
    </>
  );
}
