import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">
            Kavya<span className="text-primary">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm opacity-80">
            Traditional handcraft, re-cut for the new generation. Every piece is
            made by artisan hands in small batches.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase opacity-70">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link to="/shop" className="opacity-80 transition-opacity hover:opacity-100">Shop all</Link>
            <Link to="/about" className="opacity-80 transition-opacity hover:opacity-100">Our craft</Link>
            <Link to="/contact" className="opacity-80 transition-opacity hover:opacity-100">Contact</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase opacity-70">Say hello</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a href="mailto:hello@kavya.in" className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100">
              <Mail className="h-4 w-4" /> hello@kavya.in
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100">
              <Instagram className="h-4 w-4" /> @kavya.collective
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 py-5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} Kavya Collective. Handmade with patience.
      </div>
    </footer>
  );
}
