\*\*\*name: backlog
description: Manage the project backlog in BACKLOG.md — create it on a fresh project, add/triage/prioritize items, pick the next task, and mark work done. Use when the user says "backlog", "add a task/todo/idea", "what's next", "what should I work on", "triage", or finishes a piece of work.

---

Backlog

A single, human-readable BACKLOG.md at the project root is the source of truth for planned work. It works for any stack or project type. Keep it short, current, and honest.

Core rules

One file, project root: BACKLOG.md. Never create a second backlog. If one exists elsewhere (docs/, TODO.md, ROADMAP.md), use that one and tell the user.
Read before write. Always read the current file before editing. Edit in place; never regenerate the whole file from memory.
The user owns priority. You may suggest priority and order; you only change them when asked or when adding a new item.
Small, concrete items. Each item should be doable in roughly one working session. Split anything bigger into sub-items.
No silent deletions. Finished items move to Done; abandoned items move to Dropped with a one-line reason.
Stay in sync with reality. If the code shows an item is already done (or no longer relevant), say so and propose moving it — don't just leave it stale.

Fresh start (no backlog yet)

If BACKLOG.md doesn't exist:

Skim the project quickly: README, package/manifest files, top-level folders, existing TODO/FIXME comments (grep -rn "TODO\|FIXME"), open issues if a tool is available.
Create BACKLOG.md from the template below.
Seed Inbox with what you found (TODO comments, obvious gaps like missing tests/README/CI). Mark each seeded item (found) so the user knows it wasn't their idea.
Ask the user for their top 1–3 goals and put those in Now / Next.

File template

# Backlog

_Last updated: YYYY-MM-DD_

## Now

<!-- 1–3 items max. What is actively being worked on. -->

## Next

<!-- Prioritized, top = most important. Ready to start. -->

## Later

<!-- Good ideas, not yet prioritized. -->

## Inbox

<!-- Unsorted captures. Triage regularly into Now/Next/Later/Dropped. -->

## Done

<!-- Most recent first. Keep the last ~20; archive older to BACKLOG-ARCHIVE.md. -->

## Dropped

<!-- Item — reason. -->

Item format

- [ ] **B-012** Short imperative title `P1` `#area`
  - Why: one line on the value or problem
  - Done when: concrete acceptance check
  - Notes: links, files, blockers (optional)

ID: B-###, incrementing, never reused. Find the highest existing ID first.
Priority: P0 (urgent/broken) · P1 (important) · P2 (nice to have) · P3 (someday).
Tags: free-form #area tags (#api, #ui, #docs, #bug, #tech-debt). Reuse existing tags before inventing new ones.
Status: [ ] open · [~] in progress · [x] done · [!] blocked (add Blocked by: in Notes).
Sub-tasks go as nested checkboxes under the item.

Commands (what the user might say → what you do)

User says Action
"add X to the backlog" Add to Inbox (or Next if they give a priority). Assign ID. Confirm in one line.
"triage" Go through Inbox, propose a section + priority for each, apply after the user agrees.
"what's next?" Show Now, then the top 3 of Next. Recommend one with a one-line reason.
"start B-012" Move to Now, mark [~]. If Now already has 3 items, ask which to pause.
"done with B-012" / work just finished Mark [x], move to top of Done with the date. Suggest the next item.
"drop B-012" Move to Dropped with the reason.
"backlog status" Counts per section, anything blocked, anything stale (in Now for a long time).
"clean up the backlog" Check items against the code, flag done/stale/duplicate items, archive old Done. Propose before applying.
While doing other work

When you notice a bug, missing test, or refactor opportunity that's out of scope for the current task, don't fix it — add it to Inbox tagged (found) and mention it in one line at the end.
When you finish a task that matches a backlog item, update the item without being asked and say so briefly.
Update _Last updated:_ on every edit.

Output style

Confirm changes in one or two lines (Added B-014 to Next (P1)), not a dump of the whole file.
Only print the full backlog when the user asks to see it.
