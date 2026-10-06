import { profile, education, experience, skills } from "@/data/profile";

const About = () => {
  return (
    <div className="min-h-screen bg-paper pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">§ About</p>
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-ink mb-6">About</h1>
          <p className="text-lg text-graphite leading-relaxed">{profile.bio}</p>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Education</h2>
          <div className="border border-line rounded-lg p-6">
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
              <h3 className="font-display text-lg font-medium text-ink">{education.school}</h3>
              <span className="font-mono text-xs text-graphite">{education.dates}</span>
            </div>
            <p className="text-graphite text-sm mb-1">{education.degree}</p>
            <p className="font-mono text-xs text-graphite mb-4">GPA {education.gpa}</p>
            <div className="flex flex-wrap gap-1.5">
              {education.courses.map((course) => (
                <span
                  key={course}
                  className="text-[11px] font-mono text-graphite border border-line rounded px-1.5 py-0.5"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Experience</h2>
          <div className="space-y-6">
            {experience.map((item) => (
              <div key={item.role} className="border-l-2 border-line pl-5 relative">
                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-signal" />
                <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
                  <h3 className="font-display text-base font-medium text-ink">{item.role}</h3>
                  <span className="font-mono text-xs text-graphite">{item.dates}</span>
                </div>
                <p className="text-graphite text-sm mb-2">{item.org}</p>
                <ul className="space-y-1.5">
                  {item.points.map((point) => (
                    <li key={point} className="text-graphite text-sm leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-4">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-mono text-xs text-graphite mb-2">{category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] font-mono text-graphite border border-line rounded px-1.5 py-0.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
