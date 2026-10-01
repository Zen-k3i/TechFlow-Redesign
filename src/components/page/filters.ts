/**
 * Filter buttons for a listing: the names from the Sanity list (sectors, article categories) that at
 * least one item uses, most-used first, with the item count. Names an item uses that aren't in the
 * list (content still coded locally) are kept too, so nothing becomes unfilterable.
 */
export function filterOptions(list: readonly string[], used: readonly (readonly string[])[]): [string, number][] {
  const counts = new Map<string, number>();
  for (const names of used) for (const name of new Set(names)) if (name) counts.set(name, (counts.get(name) ?? 0) + 1);
  const known = new Set(list);
  const names = [...list.filter((name) => counts.has(name)), ...[...counts.keys()].filter((name) => !known.has(name))];
  return names.map((name) => [name, counts.get(name) ?? 0] as [string, number]).sort((a, b) => b[1] - a[1]);
}
