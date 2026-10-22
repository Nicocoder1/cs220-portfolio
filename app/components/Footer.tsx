"use client"; // Client-side component
import React, { useState } from "react";

// Footer for the site
export default function Footer() {
  const year = new Date().getFullYear(); // Current year
  const [showEmail, setShowEmail] = useState(false); // Show email modal?

  return (
    <footer className="w-full shrink-0">
      {/* Green line above footer */}
      <div className="h-px w-full bg-[#003B00]" />

      <div className="max-w-5xl mx-auto py-3 sm:py-4 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Footer text and name */}
        <p className="text-sm text-[var(--fg)] text-center sm:text-left">
          <span className="font-semibold text-[var(--fg)]">Nicolas Soria</span>
          <span className="ml-2 text-[var(--muted)]">— I am a computer scientist and software engineer who loves technology, AI, and innovation.</span>
          <span className="block sm:inline sm:ml-2 text-[var(--muted)]">© {year}</span>
        </p>

        <div className="flex items-center gap-4">
          {/* Social links and email modal */}
          {/* ...existing Instagram and LinkedIn links... */}
          {/* Email popup modal */}
          {typeof window !== "undefined" && showEmail && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-neutral-900 rounded-xl shadow-lg p-6 w-full max-w-xs flex flex-col gap-4">
                <h3 className="text-lg font-semibold mb-2">Send me an email</h3>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const subject = (form.elements.namedItem('subject') as HTMLInputElement).value;
                    const body = (form.elements.namedItem('body') as HTMLTextAreaElement).value;
                    window.location.href = `mailto:nikosoriagomez@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    setShowEmail(false);
                  }}
                >
                  <input name="subject" type="text" placeholder="Subject" className="w-full mb-2 px-3 py-2 rounded border border-gray-700" required />
                  <textarea name="body" rows={3} placeholder="Message" className="w-full mb-2 px-3 py-2 rounded border border-gray-700" required />
                  <div className="flex gap-2 justify-end">
                <button type="button" className="px-3 py-1 rounded bg-gray-700" onClick={() => setShowEmail(false)}>Cancel</button>
                <button type="submit" className="px-3 py-1 rounded bg-[var(--accent)] text-white font-semibold">Send</button>
              </div>
            </form>
          </div>
        </div>
      )}



          {/* LinkedIn icon */}
          <a
            href="https://linkedin.com/in/nikosoriag"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:brightness-105 transition duration-150"
          >
            <img src="/linkedin.png" alt="LinkedIn" className="w-8 h-8" />
          </a>

          {/* Gmail icon opens Gmail compose */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=nikosoriagomez@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Gmail"
            className="hover:brightness-105 transition duration-150"
          >
            <img src="/gmail.png" alt="Gmail" className="w-8 h-8" />
          </a>

          {/* Instagram icon */}
          <a
            href="https://instagram.com/nikosoriag"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:brightness-105 transition duration-150"
          >
            <img src="/instagram.png" alt="Instagram" className="w-8 h-8" />
          </a>
        </div>
      </div>
    </footer>
  );
}
