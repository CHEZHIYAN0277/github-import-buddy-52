export type Stage = {
  n: string
  name: string
  desc: string
}

export type Phase = {
  id: string
  label: string
  title: string
  desc: string
  stages: Stage[]
}

export const phases: Phase[] = [
  {
    id: 'pipeline',
    label: 'Phase 01',
    title: 'Understand',
    desc: 'Understand the repository before touching the code.',
    stages: [
      {
        n: '01',
        name: 'Environment Precheck',
        desc: 'Resolves runtimes, toolchains and lockfiles so every later step runs against a reproducible environment.',
      },
      {
        n: '02',
        name: 'Repository Indexing',
        desc: 'Walks the tree and builds a durable index of files, symbols and build entrypoints.',
      },
      {
        n: '03',
        name: 'Repository Intelligence',
        desc: 'Maps modules, functions and their semantic relationships into a queryable model of the codebase.',
      },
      {
        n: '04',
        name: 'Dependency Analyzer',
        desc: 'Resolves internal and external imports into a directed graph of who depends on what.',
      },
      {
        n: '05',
        name: 'Static Analysis',
        desc: 'Scans for defects, unsafe patterns and type violations, ranked by severity and confidence.',
      },
    ],
  },
  {
    id: 'evidence',
    label: 'Phase 02',
    title: 'Prove',
    desc: 'Establish that the problem exists and understand its impact.',
    stages: [
      {
        n: '06',
        name: 'Failure Reproduction',
        desc: 'Executes the suite in an isolated sandbox until the failure is deterministically reproduced.',
      },
      {
        n: '07',
        name: 'Root Cause Analysis',
        desc: 'Traces the failure back through evidence nodes to the exact source line responsible.',
      },
      {
        n: '08',
        name: 'Blast Radius',
        desc: 'Expands the dependency graph outward to measure every module the change can reach.',
      },
    ],
  },
  {
    id: 'repair',
    label: 'Phase 03',
    title: 'Repair',
    desc: 'Generate the smallest justified repair.',
    stages: [
      {
        n: '09',
        name: 'Context Engineering',
        desc: 'Selects only the evidence-relevant files and discards the rest to keep the repair focused.',
      },
      {
        n: '10',
        name: 'Repair Planner',
        desc: 'Constructs an ordered fix DAG so each edit lands with its prerequisites satisfied.',
      },
      {
        n: '11',
        name: 'Patch Generator',
        desc: 'Emits a minimal diff — the fewest lines that resolve the proven root cause.',
      },
    ],
  },
  {
    id: 'validation',
    label: 'Phase 04',
    title: 'Validate',
    desc: 'Prove the repair is safe enough to recommend.',
    stages: [
      {
        n: '12',
        name: 'Mutation Validation',
        desc: 'Runs the suite plus mutated variants to confirm the tests actually detect the defect.',
      },
      {
        n: '13',
        name: 'Security Re-scan',
        desc: 'Re-scans the patched tree to confirm no new vulnerability was introduced by the repair.',
      },
      {
        n: '14',
        name: 'Mergeability Assessment',
        desc: 'Weighs evidence, validation and security signals into a single, honest merge decision.',
      },
    ],
  },
]

export const allStages = phases.flatMap((p) => p.stages)
