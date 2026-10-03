import { buildLlmsTxt, llmsResponse } from "@/sanity/llms";

export const revalidate = 3600;

export async function GET() {
  return llmsResponse(await buildLlmsTxt({ full: true }));
}
