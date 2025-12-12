interface PageBannerProps {
  title: string
  breadcrumb?: { label: string; href: string }[]
}

export function PageBanner({ title, breadcrumb }: PageBannerProps) {
  return (
    <section className="bg-[#1E3A5F] py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
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
