import { sanityFetch } from "@/sanity/client";
import { REVIEWS_QUERY } from "@/sanity/queries";
import { TestimonialsMarquee } from "./testimonials-marquee";

/** Client reviews from the CMS, in a looping marquee. Server component: pass it to client pages as a slot. */
export async function Testimonials() {
  const reviews = await sanityFetch(REVIEWS_QUERY);
  return <TestimonialsMarquee reviews={reviews} />;
}
