"use client";

import { usePathname } from "next/navigation";
import { NotFoundContent } from "@/components/page/not-found";
import { PageShell } from "@/components/page/shell";

export default function NotFound() {
  const lang = usePathname().startsWith("/en") ? "en" : "fr";
  return (
    <PageShell lang={lang}>
      <NotFoundContent />
    </PageShell>
  );
}
