import { useEffect, useState } from 'react'

/**
 * Shared "is the pipeline section in view" state, driven by ONE
 * IntersectionObserver no matter how many components subscribe.
 * State flips are debounced so the section nav and the pipeline stage nav
 * never both show (mixed-opacity states) at section edges.
 */

type Listener = (inView: boolean) => void

const DEBOUNCE_MS = 120
const OBSERVER_OPTIONS: IntersectionObserverInit = {
  // Section counts as active only once it occupies the middle 80% band
  // of the viewport — avoids flicker while the edge is barely touching.
  rootMargin: '-10% 0px -10% 0px',
  threshold: 0,
}

const listeners = new Set<Listener>()
let observer: IntersectionObserver | null = null
let debounceTimer: ReturnType<typeof setTimeout> | null = null
let currentInView = false
let refCount = 0

function applyInView(next: boolean) {
  if (next === currentInView) return
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    if (next === currentInView) return
    currentInView = next
    listeners.forEach((listener) => listener(next))
  }, DEBOUNCE_MS)
}

function ensureObserver() {
  if (observer) return
  const element = document.getElementById('pipeline')
  if (!element) return
  observer = new IntersectionObserver(([entry]) => {
    applyInView(entry.isIntersecting)
  }, OBSERVER_OPTIONS)
  observer.observe(element)
}

function teardownObserverIfIdle() {
  if (refCount > 0) return
  observer?.disconnect()
  observer = null
  if (debounceTimer) {
    clearTimeout(debounceTimer)
    debounceTimer = null
  }
}

export function usePipelineInView(): boolean {
  const [inView, setInView] = useState(currentInView)

  useEffect(() => {
    listeners.add(setInView)
    refCount += 1
    ensureObserver()
    // Sync immediately in case the observer was already running.
    setInView(currentInView)

    return () => {
      listeners.delete(setInView)
      refCount -= 1
      teardownObserverIfIdle()
    }
  }, [])

  return inView
}
