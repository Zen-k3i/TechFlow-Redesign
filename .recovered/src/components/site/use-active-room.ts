"use client";

import { useEffect, useState } from "react";
import { rooms, type RoomId } from "./content";

export function useActiveRoom() {
  const [active, setActive] = useState<RoomId>("galerie");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as RoomId);
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    for (const room of rooms) {
      const el = document.getElementById(room.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}
