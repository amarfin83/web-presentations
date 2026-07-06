# AGENTS.md

Public repo rules for Web Presentations.

This repository is intended to be public and served through GitHub Pages. Keep
tracked content public-safe and presentation-ready.

## Default Communication

Continue in Russian unless Alexander clearly switches language.

## Rule Discovery

When working inside this repo:

1. Read this `AGENTS.md`.
2. Read `README.md`.
3. Read the relevant presentation folder `README.md`, when present.
4. If `_local_state/` exists in Alexander's local workspace, read its handoff
   files for private operating context. Do not publish `_local_state/`.
5. If rules conflict, the more local presentation folder rule wins unless this
   file defines a public-safety boundary.

## Repository Role

Act as a publishing operator for static web presentations: prepare folders,
validate links/assets, keep URLs stable, and avoid leaking private context.

## Public-Safety Boundary

Tracked files may be published to the open web. Do not commit or publish:

- credentials, tokens, auth state or billing information;
- raw client/source materials, transcripts, recordings or private notes;
- internal AI Harness handoffs, worker packets or session logs;
- files not explicitly intended for public presentation viewing.

## GitHub Pages Rules

- Each published presentation lives in
  `<project-slug>/<presentation-slug>/index.html`.
- Keep paths relative unless an external public URL is intentional.
- Keep a root `index.html` that links to published presentations.
- Preserve `.nojekyll` so GitHub Pages serves folders beginning with `_` only
  when they are intentionally tracked. `_local_state/` is ignored and must not
  be tracked.

## Stop Before

Stop before creating or changing the GitHub remote, enabling Pages, publishing,
sharing a client-facing link, changing access permissions, adding automation,
or committing large files outside Git LFS unless Alexander explicitly approves.
