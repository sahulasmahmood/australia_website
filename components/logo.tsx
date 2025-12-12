export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <svg viewBox="0 0 60 60" className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden="true">
        {/* Tree trunk */}
        <rect x="27" y="35" width="6" height="20" fill="#8B7355" rx="1" />
        {/* Tree canopy - circles representing leaves */}
        <circle cx="30" cy="20" r="12" fill="#8CC63F" />
        <circle cx="20" cy="28" r="8" fill="#7AB82F" />
        <circle cx="40" cy="28" r="8" fill="#9DD64F" />
        <circle cx="25" cy="15" r="6" fill="#A8D86F" />
        <circle cx="35" cy="15" r="6" fill="#7AB82F" />
        {/* Person silhouette */}
        <circle cx="30" cy="22" r="4" fill="#1E3A5F" />
        <path d="M26 28 L30 38 L34 28 Z" fill="#1E3A5F" />
      </svg>
      <div className="flex flex-col">
        <span className="text-[#1E3A5F] font-bold text-base sm:text-lg leading-tight">Elegant</span>
        <span className="text-[#8CC63F] font-bold text-base sm:text-lg leading-tight">Care Service</span>
      </div>
    </div>
  )
}
