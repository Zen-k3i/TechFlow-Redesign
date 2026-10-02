/** Sanity project and dataset; kept apart from client.ts so browser code (image URLs) doesn't bundle @sanity/client. */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "ce31dig5";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
