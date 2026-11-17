import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import CustomCursor from "@/components/CustomCursor";
import OpeningCurtain from "@/components/OpeningCurtain";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import { initSmoothScroll } from "@/lib/motion";

export default function Layout() {
  useLayoutEffect(() => initSmoothScroll(), []);

  return (
    <div className="relative min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-foreground focus:px-5 focus:py-2 focus:text-[11px] focus:uppercase focus:tracking-[0.2em] focus:text-background"
      >
        Skip to content
      </a>
      <OpeningCurtain />
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}