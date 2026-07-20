:root {
  --bg: #ffffff;
  --ink: #111114;
  --muted: #6b6b76;
  --line: #e6e6ea;
  --accent: #ff3b2e;
  --accent-dim: #ffe6e3;
  --dark: #111114;
  --font: 'Cairo', sans-serif;
  --max: 1180px;
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  font-family: var(--font);
  background: var(--bg);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }

img { max-width: 100%; display: block; }

/* ---------- Header ---------- */

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px clamp(20px, 5vw, 64px);
  background: var(--bg);
  border-bottom: 2px solid var(--ink);
  flex-wrap: wrap;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.logo-mark {
  color: var(--accent);
  font-size: 16px;
}

.logo-text b {
  font-weight: 900;
  color: var(--accent);
}

nav {
  display: flex;
  gap: clamp(16px, 3vw, 32px);
  overflow-x: auto;
  scrollbar-width: none;
}

nav::-webkit-scrollbar { display: none; }

nav a {
  position: relative;
  font-size: 15px;
  font-weight: 700;
  padding: 6px 2px;
  white-space: nowrap;
  transition: color 0.15s ease;
}

nav a::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background: var(--accent);
  transition: width 0.2s ease;
}

nav a:hover {
  color: var(--accent);
}

nav a:hover::after {
  width: 100%;
}

nav a:focus-visible,
.logo:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

/* ---------- Breaking ticker ---------- */

.breaking {
  display: flex;
  align-items: stretch;
  background: var(--dark);
  color: #fff;
  overflow: hidden;
}

.breaking-badge {
  flex-shrink: 0;
  background: var(--accent);
  color: #fff;
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.5px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
}

.ticker {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
}

.ticker-track {
  display: inline-block;
  white-space: nowrap;
  padding-right: 100%;
  font-size: 14px;
  font-weight: 600;
  animation: ticker 22s linear infinite;
}

@keyframes ticker {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

@media (prefers-reduced-motion: reduce) {
  .ticker-track { animation: none; padding-right: 20px; }
}

/* ---------- Hero ---------- */

.hero {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(24px, 4vw, 56px);
  padding: clamp(28px, 5vw, 56px) clamp(20px, 5vw, 64px);
  align-items: center;
  border-bottom: 1px solid var(--line);
}

.hero-media {
  overflow: hidden;
  border-radius: 6px;
  aspect-ratio: 16 / 11;
  background: var(--line);
}

.hero-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-text { min-width: 0; }

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--accent);
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.6px;
  margin-bottom: 14px;
}

.eyebrow:empty { display: none; }

.eyebrow::before {
  content: "";
  width: 3px;
  height: 14px;
  background: var(--accent);
  display: inline-block;
}

#hero-title {
  font-size: clamp(1.9rem, 3.6vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 16px;
}

#hero-description {
  font-size: 1.05rem;
  color: var(--muted);
  line-height: 1.7;
  margin: 0;
  max-width: 56ch;
}

/* ---------- Section heading ---------- */

.latest {
  padding: clamp(32px, 5vw, 56px) clamp(20px, 5vw, 64px) 80px;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 32px;
}

.section-heading h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  padding-right: 12px;
  border-right: 4px solid var(--accent);
}

.section-heading .rule {
  flex: 1;
  height: 1px;
  background: var(--line);
}

/* ---------- News grid ---------- */

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 32px 28px;
}

.news-card {
  opacity: 0;
  animation: rise 0.5s ease forwards;
}

.news-card:nth-child(1) { animation-delay: 0.02s; }
.news-card:nth-child(2) { animation-delay: 0.06s; }
.news-card:nth-child(3) { animation-delay: 0.1s; }
.news-card:nth-child(4) { animation-delay: 0.14s; }
.news-card:nth-child(5) { animation-delay: 0.18s; }
.news-card:nth-child(6) { animation-delay: 0.22s; }

@keyframes rise {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .news-card { animation: none; opacity: 1; }
}

.news-card .thumb {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  aspect-ratio: 16 / 10;
  background: var(--line);
  margin-bottom: 14px;
}

.news-card .thumb::before {
  content: "";
  position: absolute;
  top: 0; right: 0; left: 0;
  height: 3px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.25s ease;
  z-index: 2;
}

.news-card:hover .thumb::before {
  transform: scaleX(1);
}

.news-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.news-card:hover img {
  transform: scale(1.04);
}

.news-card .card-eyebrow {
  display: block;
  color: var(--accent);
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.news-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.4;
  margin: 0 0 8px;
  transition: color 0.15s ease;
}

.news-card:hover h3 {
  color: var(--accent);
}

.news-card p {
  font-size: 0.92rem;
  color: var(--muted);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ---------- Footer ---------- */

footer {
  background: var(--dark);
  color: #fff;
  text-align: center;
  padding: 28px 20px;
  font-size: 13px;
  letter-spacing: 0.4px;
  opacity: 0.85;
}

/* ---------- Responsive ---------- */

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
  }
  .hero-media {
    aspect-ratio: 16 / 9;
  }
}

@media (max-width: 560px) {
  .site-header {
    padding: 14px 18px;
  }
  .breaking-badge {
    font-size: 11px;
    padding: 8px 14px;
  }
  .news-grid {
    grid-template-columns: 1fr;
  }
}
