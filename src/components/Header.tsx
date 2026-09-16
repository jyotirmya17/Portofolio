import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bar" id="navbar">
      <div className="wrap bar-in">
        <a className="file" href="#top" id="nav-brand">
          <span className="font-bold text-[18px] tracking-tight text-[var(--fg)] hover:text-[var(--blue)] transition-colors">
            Jyotirmya Sharma
          </span>
        </a>
        <nav className="nav" aria-label="Sections">
          <a href="#about" id="nav-link-about">About</a>
          <a href="#work" id="nav-link-work">Work</a>
          <a href="#journey" id="nav-link-journey">Journey</a>
          <a href="#opensource" id="nav-link-opensource">Open Source</a>
          <a href="#blogs" id="nav-link-blogs">Blogs</a>
          <a href="#toolkit" id="nav-link-toolkit">Toolkit</a>
        </nav>
        <div className="bar-right">
          <a className="btn btn-butter" href="#contact" id="nav-cta-contact">Say hello</a>
        </div>
      </div>
    </header>
  );
};
