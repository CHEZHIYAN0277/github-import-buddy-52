# Move pipeline stage nav to the right, swap with section nav

## Goal
- The 14-stage pipeline list appears on the **right side** of the screen (instead of left).
- It is visible **only while scrolling inside the Pipeline section**; in all other sections (Hero, Evidence, Validation, Trust, footer) it is hidden and the normal section nav is visible instead.

## Current state (verified)
- `StageNav.tsx` renders a fixed list on the **left** (`fixed left-0 top-1/2`), and `Pipeline.tsx` already toggles it via a `navVisible` IntersectionObserver on the pipeline track — so "only visible inside pipeline" already works; it just lives on the left and overlaps visually with nothing, while the main section nav sits bottom-right.
- `Navigation.tsx` always shows the section nav (Pipeline / Evidence / Validation / Trust) fixed **bottom-right**, even while inside the pipeline.

## Changes

1. **`src/components/pipeline/StageNav.tsx`**
   - Move from left to right: `fixed left-0 top-1/2` → `fixed right-0 top-1/2`.
   - Flip the hide animation direction: `-translate-x-8` → `translate-x-8`.
   - Right-align the stage list (`items-end`, text-right) so it hugs the right edge like the section nav does.

2. **`src/components/Navigation.tsx`** (desktop section nav, bottom-right)
   - Hide the bottom-right section nav while the pipeline section is active, so the two right-side lists never overlap: reuse `useActiveSection()` — when `activeSection === 'pipeline'`, fade/slide the section nav out (same animation language as StageNav), fade back in for all other sections.
   - Result: inside pipeline → only the stage list on the right; outside pipeline → only the section nav on the right. Both keep the existing hide-while-scrolling behavior.

3. **Mobile**: unchanged — stage nav is already `hidden lg:block`, mobile header untouched.

## Verification
- Playwright scroll-through: confirm stage list on the right inside pipeline, section nav on the right outside it, no overlap, hide-while-scrolling still works, and check build log is clean.
