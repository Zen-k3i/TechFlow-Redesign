const domains: Record<string, string | undefined> = {
  "mandil-avocats": "mandil-avocats.com",
  "opco-ep": undefined,
  leapmotor: "vivemotors.com.kh",
  "little-green-spark": "littlegreenspark.com",
  concorde: "concorde.asia",
  exelmans: "exelmans.com",
  "place-des-aines": "placedesaines.fr",
  "ama-campus": undefined,
  "tandem-partners": "tandempartners.fr",
};

export const projectPreviews = (slug: string) =>
  slug in domains ? [1, 2, 3].map((n) => `/images/previews/${slug}-${n}.webp`) : [];

export const projectDomain = (slug: string) => domains[slug];
