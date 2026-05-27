import { useEffect, useState } from "react";
import { navLinks } from "../content";
import "./MobileNav.css";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-open", open);
    return () => document.body.classList.remove("mobile-nav-open");
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav-sheet"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="mobile-nav-toggle-icon" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <button
        type="button"
        className="mobile-nav-backdrop"
        aria-label="Close menu"
        hidden={!open}
        onClick={() => setOpen(false)}
      />

      <nav id="mobile-nav-sheet" className="mobile-nav-sheet" hidden={!open} aria-label="Mobile navigation">
        <p className="mobile-nav-sheet-label">Go to</p>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
