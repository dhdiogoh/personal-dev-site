import { forwardRef } from 'react'

// Antigo <symbol id="cloud">. A classe global `cloud` (tokens.css) vem sempre; passe a variante via className.
const Cloud = forwardRef<SVGSVGElement, { className?: string }>(function Cloud({ className }, ref) {
  return (
    <svg ref={ref} className={className ? `cloud ${className}` : 'cloud'} viewBox="0 0 240 110" aria-hidden="true">
      <path fill="currentColor" d="M34 110a34 34 0 0 1 0-68 40 40 0 0 1 14 2A52 52 0 0 1 146 30a36 36 0 0 1 58 22 29 29 0 0 1 2 58Z" />
    </svg>
  )
})

export default Cloud
