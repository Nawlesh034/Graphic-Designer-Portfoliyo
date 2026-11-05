import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/Pages/Home";
import ProjectDetail from "@/Pages/ProjectDetail";

function NotFound() {
  return (
    <section className="container-editorial min-h-[60vh] py-40">
      <p className="text-sm text-muted-foreground">404 — Page not found</p>
      <h1 className="mt-4 text-4xl font-light tracking-[-0.03em]">This page wandered off.</h1>
      <a className="mt-8 inline-block text-sm text-accent underline underline-offset-4" href="/">
        Back to the portfolio
      </a>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
