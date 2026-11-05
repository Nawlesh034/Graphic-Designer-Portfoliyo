const photo = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=85`;

export const projects = [
  {
    slug: "aurelia-skincare",
    title: "Aurelia Skincare",
    industry: "Beauty & Wellness",
    type: "Concept project",
    services: ["Brand Identity", "Packaging"],
    image: photo("photo-1608248543803-ba4f8c70ae0b"),
    imageAlt: "Skincare products arranged in warm natural light",
    overview:
      "A concept identity and packaging direction for a botanical skincare brand, designed to feel calm, tactile and easy to recognise.",
    challenge:
      "The concept explores how a skincare brand can communicate a close relationship with nature without leaning on familiar category clichés.",
    approach:
      "A restrained wordmark, warm colour palette and clear typographic hierarchy create a flexible starting point for the product range.",
    outcome:
      "The visual system is imagined across product labels, outer packaging and a simple digital storefront.",
    color: "#cba78e",
  },
  {
    slug: "terra-firma-coffee",
    title: "Terra Firma Coffee",
    industry: "Food & Beverage",
    type: "Concept project",
    services: ["Packaging", "Art Direction"],
    image: photo("photo-1445116572660-236099ec97a0"),
    imageAlt: "Coffee shop interior with warm wood and morning light",
    overview:
      "A concept packaging and art-direction system for a specialty coffee label built around place, craft and traceable origins.",
    challenge:
      "The concept looks at how to make individual coffee origins easy to tell apart while keeping the overall range cohesive.",
    approach:
      "A flexible typographic grid and a distinct colour for each origin bring order to the range, supported by photography of people and place.",
    outcome:
      "The system is explored across coffee bags, shipping materials and a small set of digital launch assets.",
    color: "#b68452",
  },
  {
    slug: "long-form-quarterly",
    title: "The Long Form Quarterly",
    industry: "Publishing",
    type: "Concept project",
    services: ["Editorial Design", "Typography"],
    image: photo("photo-1455390582262-044cdead277a"),
    imageAlt: "Open notebook and pen on a writing desk",
    overview:
      "A concept redesign for an independent journal devoted to essays and ideas that reward a slower read.",
    challenge:
      "The exploration focuses on making long-form writing inviting while giving each contributor room for a distinctive voice.",
    approach:
      "A considered type hierarchy, generous margins and an adaptable grid let each story find its own rhythm.",
    outcome:
      "The editorial system is shown across a printed issue, cover artwork and a digital reading experience.",
    color: "#9caa9a",
  },
  {
    slug: "nocturne-sound",
    title: "Nocturne Sound",
    industry: "Music & Culture",
    type: "Concept project",
    services: ["Art Direction", "Campaign"],
    image: photo("photo-1506157786151-b8491531f063"),
    imageAlt: "Crowd gathered at a live music event",
    overview:
      "A concept identity for an independent music label that moves between intimate releases and late-night events.",
    challenge:
      "The identity needs to feel recognisable across different artists and formats without making every release look the same.",
    approach:
      "A flexible wordmark and high-contrast art direction give the label a consistent frame while leaving room for each release.",
    outcome:
      "The direction is applied to imagined record sleeves, event posters and social campaign graphics.",
    color: "#9994b7",
  },
  {
    slug: "field-notes-journal",
    title: "Field Notes Journal",
    industry: "Culture & Travel",
    type: "Concept project",
    services: ["Editorial Design", "Print"],
    image: photo("photo-1470770841072-f978cf4d019e"),
    imageAlt: "Mountain landscape reflected in a still lake",
    overview:
      "A concept identity and print direction for a journal collecting stories from the outdoors.",
    challenge:
      "The concept explores how a publication can feel like a lasting object while keeping the reading experience clear and welcoming.",
    approach:
      "An understated masthead and modular editorial layout give photography and writing room to lead.",
    outcome:
      "The direction is developed across an imagined printed issue, cover and online journal.",
    color: "#9bab88",
  },
  {
    slug: "marle-studio",
    title: "Marlé Studio",
    industry: "Fashion",
    type: "Concept project",
    services: ["Brand Identity", "Digital"],
    image: photo("photo-1490481651871-ab68de25d43d"),
    imageAlt: "Carefully arranged clothing in a soft neutral palette",
    overview:
      "A concept identity for an independent fashion studio centred on considered materials and small-run collections.",
    challenge:
      "The design exploration seeks a visual language that feels personal and premium across both physical and digital spaces.",
    approach:
      "A refined typographic identity, warm palette and flexible editorial layouts create a quiet, adaptable system.",
    outcome:
      "The identity is explored across garment labels, collection notes and an imagined online shop.",
    color: "#c6aeb2",
  },
];
