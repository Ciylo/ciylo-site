/**
 * PLACEHOLDER TESTIMONIALS: names and companies are real clients, but the
 * quotes are drafts. Replace with approved quotes, roles and photos before
 * launch (see PROVIDE.md). Set `photo` to a /public path when available.
 */
export type Testimonial = {
  name: string;
  role?: string;
  company: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  photo?: string;
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Ola",
    company: "ChipMango",
    quote:
      "Ciylo felt like an extension of our own team. They took real ownership from idea to launch, communicated clearly every step of the way and delivered code we're proud to build on.",
    rating: 5,
    placeholder: true,
  },
  {
    name: "Chiddi",
    company: "SplitMart",
    quote:
      "The quality of work was outstanding. Every sprint put something real in front of our users, and the team kept pushing the product to be better than our original brief.",
    rating: 5,
    placeholder: true,
  },
  {
    name: "Jovan",
    company: "MedSynq",
    quote:
      "From design to deployment, the Ciylotrons were responsive, thoughtful and genuinely invested in our success. We'd happily work with them again.",
    rating: 5,
    placeholder: true,
  },
];
