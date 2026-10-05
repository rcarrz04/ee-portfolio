import Profile from "../components/Profile";

const experience = [
  {
    role: "Software Engineering Lead",
    org: "THG Health Capital – HeartPulse",
    dates: "Aug 2026 – Present",
    points: [
      "Building core workflows for a HIPAA-regulated pediatric in-home nursing platform: turning doctors' orders into timed tasks for nurses on shift, medication logging, nurse license and background verification, and secure logins for doctors and family caregivers.",
      "Owned 4 compliance features closing 46 tracked requirements for records custody, data retention, and care timing, backed by roughly 3,900 tests.",
    ],
  },
  {
    role: "Teaching Assistant, CS106A/B",
    org: "Stanford University",
    dates: "Sep 2025 – Present",
    points: [
      "Lead weekly Python and C++ discussion sections for Stanford's 900+ student introductory programming sequence, with about 15 students per section.",
      "Mentor students through debugging in section and office hours, and work to make sure students from every background feel they belong in CS.",
    ],
  },
];

const About = () => {
  return (
    <div className="min-h-screen pt-16 pb-12 font-sfpro">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          <div className="md:col-span-1">
            <Profile />
          </div>
          <div className="md:col-span-2 space-y-10">
            <section>
              <h1 className="text-4xl font-medium mb-6">About Me</h1>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  I'm an electrical engineering student at Stanford (hardware and software
                  track) interested in building accessibility-enabling devices: things like
                  glasses that caption conversations or describe surroundings, which depend on
                  chips efficient enough to disappear into a frame.
                </p>
                <p>
                  My work spans both sides of that problem. On the hardware side, I've designed
                  a systolic-array DNN accelerator through the full ASIC flow, a SIMD matrix
                  accelerator, and a pipelined MIPS processor. On the software side, I've
                  trained a physics-constrained neural network that predicts chip heat maps, and
                  I build healthcare software at HeartPulse. I'm especially interested in how
                  compilers, parallelism, and memory locality determine what hardware can
                  actually do.
                </p>
                <p>
                  I also love teaching: I lead sections for Stanford's introductory programming
                  courses, and I enjoy helping students find the same excitement in CS that I
                  did.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-6">Experience</h2>
              <div className="space-y-8">
                {experience.map((job) => (
                  <div key={job.role}>
                    <div className="flex flex-wrap justify-between gap-x-4">
                      <h3 className="text-lg font-semibold text-gray-900">{job.role}</h3>
                      <span className="text-gray-600">{job.dates}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{job.org}</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
