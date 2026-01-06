const teamMembers = [
  {
    name: "Sarah Mitchell",
    position: "Managing Director",
    image: "/avatar-1.png",
  },
  {
    name: "James Chen",
    position: "Operations Manager",
    image: "/professional-man-headshot-smiling.jpg",
  },
  {
    name: "Emily Thompson",
    position: "Support Coordinator",
    image: "/professional-woman-coordinator-headshot.jpg",
  },
  {
    name: "Michael Roberts",
    position: "Clinical Lead",
    image: "/professional-doctor-headshot.png",
  },
  {
    name: "Jessica Williams",
    position: "Community Manager",
    image: "/professional-woman-manager-headshot-smiling.jpg",
  },
  {
    name: "David Anderson",
    position: "Quality Assurance",
    image: "/professional-man-quality-assurance-headshot.jpg",
  },
]

export function TeamSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <span className="text-secondary">MEET OUR</span> <span className="text-primary">TEAM</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mt-3 sm:mt-4 mb-4 sm:mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-4 sm:px-0 text-justify">
            Our dedicated team of professionals is committed to providing exceptional support services with compassion
            and expertise.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 text-center shadow-md hover:shadow-lg active:shadow-lg transition-all group"
            >
              <div className="mb-3 sm:mb-4 flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-3 sm:border-4 border-primary group-hover:scale-105 transition-transform">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-primary hover:text-primary-hover cursor-pointer transition-colors">
                {member.name}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
