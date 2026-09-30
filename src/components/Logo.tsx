import { useId } from 'react'

// Antigo <symbol id="logo-dh">. O d e o h são grupos separados (data-mark) para animar um de cada vez.
export default function Logo({ className }: { className?: string }) {
  const clipId = useId()
  return (
    <svg className={className} viewBox="0 0 198 140" aria-hidden="true">
      <clipPath id={clipId}><rect x="-10" y="-10" width="220" height="150" /></clipPath>
      <g clipPath={`url(#${clipId})`} fill="none" stroke="currentColor" strokeWidth="26" strokeLinecap="round">
        <g data-mark="d">
          <circle cx="45" cy="97" r="30" />
          <line x1="75" y1="13" x2="75" y2="160" />
        </g>
        <g data-mark="h">
          <line x1="118" y1="13" x2="118" y2="160" />
          <path d="M118 160V100a32 32 0 0 1 64 0v60" />
        </g>
      </g>
    </svg>
  )
}
