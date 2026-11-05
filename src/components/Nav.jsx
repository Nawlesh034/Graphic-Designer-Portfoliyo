import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import PillButton from "@/components/PillButton";
import useSectionNav from "@/Hooks/useSectionNav";

const LINKS = [
  { label: "Works", id: "work" },
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const go = useSectionNav();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleGo = (id) => {
    setOpen(false);
    go(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-500 ${
          scrolled ? "border-b border-border bg-background/90 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <nav className="container-editorial flex h-[72px] items-center justify-between md:h-20">
          <Link to="/" className="flex items-center gap-2.5" data-cursor="link">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[11px] font-medium text-accent-foreground">
              A
            </span>
            <span className="text-base font-medium tracking-[-0.01em] md:text-lg">Aman</span>
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            {LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleGo(link.id)}
                data-cursor="link"
                className="text-sm text-muted-foreground transition-colors duration-500 hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <PillButton
              as="button"
              onClick={() => handleGo("contact")}
              className="hidden md:inline-flex"
              badgeClassName="h-9 w-9"
            >
              Start a project
            </PillButton>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors duration-500 hover:border-foreground lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-[105] bg-background lg:hidden">
          <div className="animate-overlay-in flex h-full flex-col justify-between p-6">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[11px] font-medium text-accent-foreground">
                  A
                </span>
                <span className="text-base font-medium">Aman</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {LINKS.map((link, i) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleGo(link.id)}
                  style={{ animationDelay: `${0.06 + i * 0.07}s` }}
                  className="animate-overlay-line border-b border-border py-5 text-left text-3xl font-light"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="space-y-4">
              <PillButton
                as="button"
                variant="solid"
                onClick={() => handleGo("contact")}
                className="w-full justify-between"
              >
                Start a project
              </PillButton>
              <a className="text-sm text-muted-foreground" href="mailto:hello@example.com">
                hello@example.com
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}