import { createClient, type QueryParams } from "next-sanity";
import { dataset, projectId } from "./env";

export { dataset, projectId };

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-09-29",
  useCdn: true,
});

/** Published content, regenerated in the background at most once a minute. */
export function sanityFetch<const Query extends string>(query: Query, params: QueryParams = {}) {
  return client.fetch(query, params, { next: { revalidate: 60 } });
}
