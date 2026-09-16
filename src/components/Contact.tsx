import React, { useState } from 'react';

interface ContactProps {
  onCopyEmail: () => void;
  onShowToast: (msg: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onCopyEmail, onShowToast }) => {
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [hint, setHint] = useState('');
  const [hintColor, setHintColor] = useState('#5B4A70');
  const [isSending, setIsSending] = useState(false);

  const myEmail = 'jyotirmya.jm@gmail.com';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanNote = note.trim();

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setHintColor('#B3245F');
      setHint('Add a valid email so Jyotirmya can reply.');
      return;
    }

    if (!cleanNote) {
      setHintColor('#B3245F');
      setHint('Write a note first, then send it.');
      return;
    }

    setHintColor('#5B4A70');
    setHint('Preparing your note…');
    setIsSending(true);

    // Form mailto link
    const subject = encodeURIComponent(`Portfolio Message from ${cleanEmail}`);
    const body = encodeURIComponent(
      `From: ${cleanEmail}\n\nMessage:\n${cleanNote}\n\n---\nSent via Jyotirmya's portfolio`
    );
    const mailtoUrl = `mailto:${myEmail}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSending(false);
      window.location.href = mailtoUrl;
      onShowToast('Sent! Your note landed in the inbox.');
      setHint('');
      setEmail('');
      setNote('');
    }, 400);
  };

  return (
    <footer className="contact" id="contact">
      <div className="wrap">
        <div className="contact-grid">
          <div>
            <h2 className="h2" id="contact-heading">
              Let's build something.
            </h2>
            <p className="contact-copy">
              Have an interesting problem, a system that needs building, or just want to talk engineering?
              I'm always happy to hear from you.
            </p>
            <ul className="handles" aria-label="Contact links">
              <li>
                <a href={`mailto:${myEmail}`} id="link-email">
                  <span>Email</span>
                  <span>{myEmail}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/jyotirmya17"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="link-github"
                >
                  <span>GitHub</span>
                  <span>github.com/jyotirmya17</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/jyotirmya-sharma-aa3485210/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="link-linkedin"
                >
                  <span>LinkedIn</span>
                  <span>in/jyotirmya-sharma</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onCopyEmail}
                  id="link-quick-copy"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '16px 2px',
                    fontSize: '17.5px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'inherit',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ color: '#bbaed0' }}>Quick Copy</span>
                  <span className="hover:text-[var(--butter)]">Copy Email to Clipboard</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="thread">
            <span className="pin-comment" aria-hidden="true">
              J
            </span>
            <div className="msg">
              <div style={{ paddingLeft: '18px' }}>
                <b>Jyotirmya</b>
                <time>pinned</time>
                <p>Hi! Tell me what you're building, or just say hello.</p>
              </div>
            </div>

            <form className="composer" onSubmit={handleSend}>
              <label htmlFor="from-email">Your email</label>
              <input
                id="from-email"
                className="cinput"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (hint) setHint('');
                }}
              />

              <label htmlFor="note">Your note</label>
              <textarea
                id="note"
                placeholder="Hey Jyotirmya, I'm working on…"
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                  if (hint) setHint('');
                }}
              />

              <div className="composer-actions">
                <button className="btn btn-ghost" type="button" onClick={onCopyEmail}>
                  Copy email
                </button>
                <button className="btn btn-ink" type="submit" id="send" disabled={isSending}>
                  {isSending ? 'Sending…' : 'Send as email'}
                </button>
              </div>
            </form>
            {hint && (
              <p className="hint" id="hint" style={{ color: hintColor }} aria-live="polite">
                {hint}
              </p>
            )}
          </div>
        </div>

        <div className="foot">
          <span className="sign" aria-hidden="true">
            JYOTIRMYA
          </span>
          <p>
            Designed &amp; built by Jyotirmya Sharma.
            <br />
            Still figuring things out. Still building anyway.
          </p>
        </div>
      </div>
    </footer>
  );
};
