# Portfolio

A responsive portfolio built with React, Vite, Tailwind CSS, and GSAP. The homepage brings together the hero, work, services, process, about, client, testimonial, and contact sections. Each featured project has a detail page at `/work/:slug`.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Update portfolio content

- Edit the project content and image URLs in `src/lib/projects.js`.
- Edit the homepage section order in `src/Pages/Home.jsx`.
- Shared page layout, navigation, and footer are in `src/components/Layout.jsx`, `src/components/Nav.jsx`, and `src/components/SiteFooter.jsx`.
- Global design tokens and animation styles are in `src/index.css`.
