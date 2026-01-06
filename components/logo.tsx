"use client"

import { useSettings } from "@/hooks/use-settings"
import Image from "next/image"

export function Logo({ className = "" }: { className?: string }) {
  const { settings } = useSettings()

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      {settings?.logo ? (
        <Image
          src={settings.logo}
          alt={settings.siteName || "Logo"}
          width={48}
          height={48}
          className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
          priority
        />
      ) : (
        <Image
          src="/placeholder-logo.png"
          alt="Elegant Care Service Logo"
          width={48}
          height={48}
          className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
          priority
        />
      )}
      <div className="flex flex-col">
        <span className="text-secondary font-bold text-base sm:text-lg leading-tight">
          {settings?.siteName?.split(" ")[0] || "Elegant"}
        </span>
        <span className="text-primary font-bold text-base sm:text-lg leading-tight">
          {settings?.siteName?.split(" ").slice(1).join(" ") || "Care Service"}
        </span>
      </div>
    </div>
  )
}

