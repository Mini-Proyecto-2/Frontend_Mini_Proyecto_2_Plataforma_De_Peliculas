/**
 * @file useIsMobile Hook
 * @description Custom React hook that detects mobile viewport sizes.
 * Uses matchMedia API to listen for viewport changes and determine
 * if the current screen size is mobile (< 768px).
 * 
 * Features:
 * - Reactive to window resize
 * - SSR-safe (starts undefined)
 * - Automatic cleanup
 * - Standard mobile breakpoint (768px)
 * - Performance optimized with matchMedia API
 * 
 * @module useIsMobile
 */

import * as React from "react"

const MOBILE_BREAKPOINT = 1024

/**
 * Determines if the current viewport width is smaller than the defined mobile breakpoint.
 * Automatically updates when the screen size changes.
 *
 * @function useIsMobile
 * @returns {boolean} `true` if the viewport width is less than 768px, otherwise `false`.
 *
 * @remarks
 * - Uses `window.matchMedia` for accurate detection.
 * - Reactively updates when the viewport width crosses the breakpoint.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    /**
     * Updates the state whenever the viewport crosses the mobile breakpoint.
     */
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
