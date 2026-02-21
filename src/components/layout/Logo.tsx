export default function Logo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className={className}>
      <line x1="16" y1="9"  x2="9"  y2="23" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="16" y1="9"  x2="23" y2="23" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="9"  y1="23" x2="23" y2="23" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="16" cy="9"  r="3.5" fill="#6366f1"/>
      <circle cx="9"  cy="23" r="3.5" fill="#6366f1"/>
      <circle cx="23" cy="23" r="3.5" fill="#6366f1"/>
    </svg>
  );
}
