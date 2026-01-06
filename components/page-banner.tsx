interface PageBannerProps {
  title: string
  breadcrumb?: { label: string; href: string }[]
  backgroundImage?: string
}

export function PageBanner({ title, breadcrumb, backgroundImage }: PageBannerProps) {
  return (
    <section 
      className="relative bg-secondary py-10 sm:py-14 md:py-16 lg:py-20"
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight px-2">
          {title}
        </h1>
        {breadcrumb && (
          <nav 
            className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/80 px-2"
            aria-label="Breadcrumb"
          >
            {breadcrumb.map((item, index) => (
              <span key={item.href} className="flex items-center gap-1.5 sm:gap-2">
                {index > 0 && <span className="text-primary" aria-hidden="true">/</span>}
                {index === breadcrumb.length - 1 ? (
                  <span className="text-primary font-medium truncate max-w-[150px] sm:max-w-[200px] md:max-w-none" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <a 
                    href={item.href} 
                    className="hover:text-white transition-colors truncate max-w-[100px] sm:max-w-[150px] md:max-w-none"
                  >
                    {item.label}
                  </a>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </section>
  )
}
