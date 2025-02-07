// /hooks/useHoldAction.ts
"use client"

import * as React from "react"

//less complicated way then my first try just made another hook

export function useHoldAction(action: () => void, holdDuration = 1000) {
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const startHold = React.useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      action()
    }, holdDuration)
  }, [action, holdDuration])

  const cancelHold = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  return { startHold, cancelHold }
}
