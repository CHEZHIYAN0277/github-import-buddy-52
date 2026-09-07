# Live Investigation Surface

Turn the 14-stage timeline from a list of feature cards into one continuous investigation, where each stage consumes the previous stage's output and produces new evidence. The information transformation itself is the animation.

Repository → evidence → diagnosis → impact → repair → proof → decision.

## 1. Entry into the pipeline

- Eyebrow: THE REPAIR PIPELINE
- Headline: "A bug enters. A proven repair comes out."
- Sub-line: 14 stages. One evidence chain.

## 2. No more giant phase headers

The full-screen PHASE 01 / UNDERSTAND interruptions are removed. Each stage carries its phase as a small label in its own header:

```text
01 / 14    UNDERSTAND

ENVIRONMENT PRECHECK
Resolve the environment before the investigation begins.
```

## 3. Persistent investigation instrument (right side)

The stage list becomes an instrument that reads like a debugging console, not a menu:

```text
INVESTIGATION
────────────────
07 / 14
BLAST RADIUS

EVIDENCE
███████░░░░░░░

CURRENT EVIDENCE
12 reachable functions
4 runtime paths
2 untested paths
1 high-risk boundary

✓ Environment   ✓ Indexing   ● Blast Radius   ○ Context ...
```

- Counter, active stage name, evidence bar that fills across the 14 stages, and a live per-stage evidence readout that changes with the active stage.
- Compact 14-row list stays clickable: passed rows checked, active row marked, upcoming rows dimmed.
- Keeps current behaviour: hidden while scrolling, reappears ~200ms after scrolling stops, only inside the pipeline section.

## 4. Each stage is an evidence chamber

Same spatial frame every stage, different content:

```text
01 / 14   UNDERSTAND        ENVIRONMENT PRECHECK

WHAT IT DOES          LIVE INVESTIGATION          EVIDENCE
repository            (stage-specific visual)     Python 3.11
→ environment                                     27 deps
                                                  tests: available
                                                  confidence 0.96

INPUT  repository        OUTPUT  reproducible environment
```

Each stage's INPUT is literally the previous stage's OUTPUT.

## 5. Stage-specific visualizations

No shared card template. Each visual represents the actual job:

1. Environment fingerprint (runtime / framework / test runner / deps / status)
2. Repository decomposing into a tree, files indexed progressively
3. Semantic relationships — a function and what it means, not a node blob
4. Dependency propagation
5. Code fragment with findings pinned to exact lines
6. Execution trace to failure, then Run 01/02/03 FAIL → REPRODUCIBLE
7. Multiple evidence sources converging on one root cause
8. Impact propagation: changed function → callers → contracts → runtime paths → coverage
9. Context funnel: 247 files → 31 → 12 → 7, ending in the patch context
10. Repair DAG with nodes unlocking by dependency
11. Minimal diff plus +3 / −1 / 2 files
12. Mutants killed vs survived, ending in an MCI score
13. Security delta before/after patch, with NEW FINDINGS 0
14. Gates converging into a decision — and it can say PROVEN FIX or DRAFT ONLY / MANUAL REVIEW REQUIRED

## 6. Evidence chain as the backbone

The center rail stops reading as a timeline. As the user scrolls, it accumulates named evidence artifacts — Environment, Repository Model, Dependency Graph, Static Findings, Reproduced Failure, Root Cause, Blast Radius, Repair Context, Repair Plan, Patch, Validation, Security Delta, Merge Decision. Only the recent portion is shown expanded; earlier artifacts compress into small tokens so the chain never becomes a permanent wall diagram.

## 7. Stage transition is the signature interaction

A stage doesn't vanish. Its output compresses into an evidence token, travels along the chain, and lands in the next stage's INPUT slot — so stage 07 visibly consumes stage 06's confirmed reproduction.

## 8. Parallax, used selectively

Three depths only:

- Background: slow, faint repository/evidence texture
- Mid: the investigation visualization, normal scroll-linked motion
- Foreground: the evidence readout, nearly pinned

Text and headers stay still. All motion respects reduced-motion settings.

## 9. Ending: the chain collapses into a decision

```text
EVIDENCE ✓  REPRODUCTION ✓  ROOT CAUSE ✓  BLAST RADIUS ✓
VALIDATION ✓  SECURITY ✓  MERGEABILITY ✓

PROVEN FIX
Confidence 0.91
READY FOR REVIEW
```

With the honest alternative shown alongside (DRAFT ONLY / MANUAL REVIEW REQUIRED), then the payoff line and existing CTA and footer.

## Kept unchanged

Hero, PROOFIX branding, black/near-black palette, typography, spacing discipline, minimal top nav, full-screen scrolling, and the nav swap between section nav and pipeline instrument.

## Technical notes

- `stageData.ts` extends each stage with `phase`, `input`, `output`, short "what it does" copy, and a structured evidence payload (label/value pairs) consumed by both the chamber and the side instrument.
- New `StageChamber` replaces `StageRow`'s zigzag with the fixed three-zone frame; `StageVisual` keeps its per-stage switch and each branch is rewritten to the visuals above.
- `StageNav` becomes `InvestigationPanel`: counter, evidence bar, current-evidence readout, stage list — driven by the existing `usePipelineInView` observer and the active-index observer in `Pipeline.tsx`.
- Evidence bar and chain progress derive from the existing `useScroll` progress on the pipeline track; no new scroll listeners.
- Framer Motion only, no new dependencies; layout transitions use shared-layout animation for the evidence token handoff.
