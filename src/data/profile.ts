export const profile = {
  name: "Ruben Carrazco",
  role: "B.S. Electrical Engineering — Hardware & Software",
  location: "Stanford, CA",
  email: "ruben04@stanford.edu",
  linkedin: "https://www.linkedin.com/in/ruben-carrazco-368b6a263/",
  github: "https://github.com/rcarrz04",
  tagline:
    "Stanford EE: designing efficient hardware, and the software that shapes it.",
  bio: "I'm an Electrical Engineering student at Stanford (Hardware and Software track) interested in building accessibility-enabling devices: things like glasses that caption conversations or describe surroundings, which depend on chips efficient enough to disappear into a frame. My work spans both sides of that problem. On the hardware side, I've designed a systolic-array DNN accelerator through the full ASIC flow and a pipelined MIPS processor. On the software side, I've trained a physics-constrained neural network that predicts chip heat maps, and I build healthcare software at HeartPulse. I'm especially interested in how compilers, parallelism, and memory locality determine what hardware can actually do. I also teach: I lead sections for Stanford's introductory programming courses and help fly rockets with the Stanford Student Space Initiative.",
};

export const education = {
  school: "Stanford University",
  location: "Stanford, CA",
  degree: "B.S. Electrical Engineering (Hardware and Software Track)",
  dates: "Sep. 2023 — Present",
  gpa: "3.70 / 4.00",
  courses: [
    "Deep Learning for CV",
    "Computer Organization & Systems",
    "VLSI Systems",
    "Digital Systems Architecture",
    "Circuit Design",
  ],
};

export interface ExperienceItem {
  role: string;
  org: string;
  dates: string;
  points: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineering Lead — HeartPulse",
    org: "THG Health Capital",
    dates: "Aug. 2026 — Present",
    points: [
      "Building core workflows for a HIPAA-regulated pediatric in-home nursing platform: turning doctors' orders into timed tasks for nurses on shift, medication logging, nurse license and background verification, and secure logins for doctors and family caregivers.",
      "Owned 4 compliance features closing 46 tracked requirements for records custody, data retention, and care timing, backed by roughly 3,900 tests.",
    ],
  },
  {
    role: "CS 198 — Student Leader (CS106A/B)",
    org: "Stanford University",
    dates: "Sept. 2025 — Present",
    points: [
      "Lead weekly Python and C++ discussion sections for Stanford's 900+ student introductory programming sequence, with about 15 students per section.",
      "Mentor students through debugging in section and office hours, emphasizing algorithmic thinking, abstraction, and debugging best practices.",
    ],
  },
  {
    role: "Avionics Team Member — Stanford Student Space Initiative (SSI)",
    org: "Stanford University",
    dates: "Apr. — June 2025",
    points: [
      "Developed an I2C-based gas control system using a Teensy microcontroller to monitor real-time pressure and temperature inside the rocket's tank system.",
      "Programmed Arduino IDE drivers for solenoid valves and co-designed a modular electronics stand to verify bidirectional communication across all subsystems.",
    ],
  },
];

export const skills = {
  "Hardware & Electronics": ["Circuit Design", "Signal Processing", "Sensor Integration", "Soldering"],
  Programming: ["Embedded C/C++", "Verilog", "Python", "Arduino IDE", "Assembly (x86-64)", "I2C", "Unity C#"],
  "Tools & Software": ["LTspice", "Xilinx Vivado", "KiCad", "Fusion 360", "Logic Analyzers", "Oscilloscopes", "Multimeters"],
  Languages: ["English", "Spanish (Working Proficiency)"],
};
