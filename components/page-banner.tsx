interface PageBannerProps {
  title: string
  breadcrumb?: { label: string; href: string }[]
  backgroundImage?: string
}

export function PageBanner({ title, breadcrumb, backgroundImage }: PageBannerProps) {
  return (
    <section 
      className="relative bg-[#1E3A5F] py-12 sm:py-16 md:py-20"
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{title}</h1>
        {breadcrumb && (
          <nav className="flex justify-center items-center gap-2 text-sm text-white/80">
            {breadcrumb.map((item, index) => (
              <span key={item.href} className="flex items-center gap-2">
                {index > 0 && <span className="text-[#8CC63F]">/</span>}
                {index === breadcrumb.length - 1 ? (
                  <span className="text-[#8CC63F]">{item.label}</span>
                ) : (
                  <a href={item.href} className="hover:text-white transition-colors">
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
