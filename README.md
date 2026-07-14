# Web Presentations

Status: active public GitHub Pages repo

## Purpose

`Web Presentations` is the public GitHub Pages publishing repository for
Alexander's static web presentations.

The repository should contain only presentation files that are safe to expose
through unauthenticated public links. Drafts, private transcripts, client
sources, internal analysis and AI Harness operating notes do not belong in the
tracked public repo.

## Public URL Shape

GitHub repository:

```text
amarfin83/web-presentations
```

GitHub Pages URLs:

```text
https://amarfin83.github.io/web-presentations/
https://amarfin83.github.io/web-presentations/<project-slug>/<presentation-slug>/
```

## Folder Map

- `index.html` - public landing index for available presentations.
- `assets/` - public shared assets that are safe to reuse across presentations.
- `_templates/` - public presentation folder templates and publishing notes.
- `Values/` - public presentation area for the Values / Value Driven AI
  project.
- `family/` - public family-oriented sites and presentations.
- `<project-slug>/<presentation-slug>/` - one published presentation per folder,
  each with its own `index.html`.
- `_local_state/` - local-only AI Harness operating state. This folder is
  ignored by Git and must not be published.

## Publishing Rules

- A presentation folder must contain an `index.html` at its root.
- Use lowercase URL slugs with hyphens, for example
  `value-driven-ai/diagnostics/`.
- Keep only public, presentation-ready assets in tracked files.
- Do not commit credentials, private source files, transcripts, client raw
  materials, billing data or internal handoff notes.
- Files larger than 50 MiB should use Git LFS before being committed.

## Source Of Truth

- Public repository structure and rules: this `README.md`.
- Public agent rules: `AGENTS.md`.
- External artifact plan and GitHub Pages state: `_local_state/ARTIFACTS.md`
  while the repo is local-only.
- Local continuation state: `_local_state/HANDOFF.md`.

## Published Presentations

- `Values/VDB_AI_Diagnostics_Result/` - VDB AI diagnostics result.
- `family/pokrovskoe-family-weekends/` - family activities near Pokrovskoe / New Riga.

## Next Presentation Step

Add each approved presentation under its own project and presentation slug,
include an `index.html`, update the public root index, validate, commit and
push.
