import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BackgroundFx } from './components/BackgroundFx';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Journey } from './components/Journey';
import { OpenSource } from './components/OpenSource';
import { Blogs } from './components/Blogs';
import { Toolkit } from './components/Toolkit';
import { Contact } from './components/Contact';
import { VisitorCursor } from './components/VisitorCursor';
import { Toast } from './components/Toast';
import { PikachuCompanion } from './components/PikachuCompanion';
import { ArchitectureModal } from './components/ArchitectureModal';
import { SystemsTerminal } from './components/SystemsTerminal';
import { BlogReaderModal } from './components/BlogReaderModal';
import { BlogPost } from './types';
import { BLOG_POSTS } from './data/blogsData';

export default function App() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [inspectProjectId, setInspectProjectId] = useState<string | null>(null);
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(null);
  const [pikachuActive, setPikachuActive] = useState<boolean>(() => {
    const saved = localStorage.getItem('pikachu_companion_active');
    return saved !== null ? saved === 'true' : true;
  });

  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check URL hash for direct blog link on mount
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#blog-')) {
        const slug = hash.replace('#blog-', '');
        const match = BLOG_POSTS.find((p) => p.slug === slug);
        if (match) {
          setActiveBlogPost(match);
        }
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 2400);
  }, []);

  const togglePikachu = useCallback(() => {
    setPikachuActive((prev) => {
      const next = !prev;
      localStorage.setItem('pikachu_companion_active', String(next));
      showToast(next ? '⚡ Pikachu companion awakened!' : 'Pikachu resting');
      return next;
    });
  }, [showToast]);

  const handleCopyEmail = useCallback(() => {
    const email = 'jyotirmya.jm@gmail.com';
    const notifySuccess = () => showToast('Email copied: jyotirmya.jm@gmail.com');

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(notifySuccess, fallbackCopy);
    } else {
      fallbackCopy();
    }

    function fallbackCopy() {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        notifySuccess();
      } catch (err) {
        showToast(`Email: ${email}`);
      }
      document.body.removeChild(textarea);
    }
  }, [showToast]);

  return (
    <div id="portfolio-root">
      <BackgroundFx />
      <Header />

      <main id="main-content">
        <Hero onCopyEmail={handleCopyEmail} />
        <About />
        <Projects onInspectArchitecture={(id) => setInspectProjectId(id)} />
        <Journey />
        <OpenSource />
        <Blogs onSelectPost={(post) => setActiveBlogPost(post)} />
        <Toolkit onShowToast={showToast} />
      </main>

      <Contact onCopyEmail={handleCopyEmail} onShowToast={showToast} />
      <VisitorCursor />
      <PikachuCompanion enabled={pikachuActive} onToggle={togglePikachu} />
      <SystemsTerminal onTogglePikachu={togglePikachu} pikachuActive={pikachuActive} />
      <ArchitectureModal projectId={inspectProjectId} onClose={() => setInspectProjectId(null)} />
      <BlogReaderModal
        post={activeBlogPost}
        onClose={() => {
          setActiveBlogPost(null);
          // If hash was blog slug, clear it gracefully
          if (window.location.hash.startsWith('#blog-')) {
            window.history.replaceState(null, '', window.location.pathname + '#blogs');
          }
        }}
        onSelectPost={(p) => setActiveBlogPost(p)}
        allPosts={BLOG_POSTS}
      />
      <Toast message={toastMessage} visible={toastVisible} />
    </div>
  );
}
