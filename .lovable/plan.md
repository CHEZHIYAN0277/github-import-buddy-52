# Live Investigation Surface

Turn the 14-stage timeline from a list of agent cards into one continuous investigation, where each stage consumes the previous stage's output and produces new evidence.

## 1. Stronger entry into the pipeline

Rework the intro section above the pipeline:

- Eyebrow: THE REPAIR PIPELINE
- Headline: "A bug enters. Evidence comes out."
- Sub-line: 14 agents. One evidence chain.

The current phase headers (PHASE 01 UNDERSTAND, etc.) stop being big full-width interruptions; the phase name becomes a small label inside each stage's header instead, so the scroll never breaks out of the investigation.

## 2. Persistent investigation instrument (right side)

Replace the current right-side stage list with a progress instrument that reads like equipment, not a menu:

```text
INVESTIGATION
─────────────────
01 / 14
ENVIRONMENT PRECHECK

EVIDENCE
██████░░░░░░░░░░
```

- Stage counter, current stage name, and an evidence bar that fills as the scroll advances (empty at stage 01, full at 14, then "PROVEN").
- Below it, the compact 14-row stage list stays clickable, with completed rows marked, active row highlighted, upcoming rows dimmed.
- Keeps the current behaviour: hidden while scrolling, appears ~200ms after scrolling stops, visible only inside the pipeline section.

## 3. Each stage becomes an evidence chamber

Every stage keeps its full-screen slot and gets a consistent three-part structure:

```text
01 / 14   UNDERSTAND

ENVIRONMENT PRECHECK
─────────────────────────────
Resolve the environment before the investigation begins.

LEFT: what the agent does   CENTER: live visualization   RIGHT: evidence produced

INPUT   repository
OUTPUT  reproducible environment
```

- The INPUT of each stage is literally the OUTPUT of the previous one, so the chain is visible and causal.
- The alternating left/right zigzag is replaced by this stable frame, so the eye stays anchored while the content transforms.
- Evidence panel shows structured, real-looking output (paths, counts, confidence values) rather than generic copy.

## 4. Distinct visualization per agent

Each of the 14 keeps its own visual language, upgraded from the current cards:

boot sequence, file indexing, semantic map, dependency propagation, findings on source, test replay, evidence convergence, impact propagation, context assembly, repair DAG, live diff, mutations being killed, vulnerability scan, trust gates.

## 5. Evidence spine instead of a timeline

The center rail keeps its position but changes meaning: as the user scrolls, labelled nodes are stamped onto it (Environment, Repository, Intelligence, Root Cause, Patch, Validation, Trust). Passed nodes stay filled and labelled — the spine visibly accumulates evidence instead of just tracking scroll.

## 6. Layered parallax inside each stage

Three depths per stage: a very slow background layer of repository fragments (paths, hashes, log lines), the visualization at mid speed, and the title plus conclusion nearly fixed. Motion stays subtle and is disabled under reduced-motion settings.

## 7. Carry-forward between stages

As a stage scrolls out, its key result compresses into a small evidence token that appears in the next stage's INPUT slot — so stage 07 visibly consumes stage 06's confirmed reproduction.

## 8. Ending: the timeline collapses into a decision

After stage 14 the spine converges into a single decision card:

```text
PROOF COMPLETE
Evidence ✓  Reproduction ✓  Root Cause ✓  Validation ✓  Security ✓
TRUST SCORE 0.91
```

Followed by the payoff: FROM POSSIBLE PATCH → PROVEN FIX, then the existing CTA and footer.

## Kept unchanged

Hero, PROOFIX branding, black/near-black palette, typography, spacing discipline, minimal top nav, full-screen scrolling, and the nav swap behaviour between section nav and pipeline instrument.

## Technical notes

- `stageData.ts` extends each stage with `phase`, `input`, `output`, `process` steps, and an evidence payload; phases remain but render as labels.
- New `StageChamber` replaces `StageRow`'s zigzag layout with the fixed three-column frame; `StageVisual` keeps its per-stage switch and gains the background fragment layer.
- `StageNav` becomes `InvestigationPanel` (counter + evidence bar + stage list), still driven by the existing `usePipelineInView` observer and the active-index observer in `Pipeline.tsx`.
- Evidence bar progress derives from the existing `useScroll` progress on the pipeline track — no new scroll listeners.
- Spine node labels rendered from `stageData`, keyed to phase boundaries.
- Framer Motion only; no new dependencies. All motion respects `useReducedMotion`.
