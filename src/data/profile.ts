export const profile = {
  name: "Ruben Carrazco",
  role: "B.S. Electrical Engineering — Hardware & Software",
  location: "Stanford, CA",
  email: "ruben04@stanford.edu",
  linkedin: "https://www.linkedin.com/in/ruben-carrazco-368b6a263/",
  github: "https://github.com/rcarrz04",
  tagline:
    "EE @ Stanford, focused on augmented reality and next-generation VLSI hardware.",
  bio: "I'm an Electrical Engineering student at Stanford (Hardware and Software track) working across the stack — from transistor-level circuits to the software that drives them. Recent work spans wireless VR sensing, FPGA-based signal generation, and a SIMD accelerator for matrix math, with a running interest in where AR/VR and next-generation VLSI hardware meet. Outside of coursework, I teach algorithmic thinking to Stanford CS students and help fly rockets with the Stanford Student Space Initiative.",
};

export const education = {
  school: "Stanford University",
  location: "Stanford, CA",
  degree: "B.S. Electrical Engineering (Hardware and Software Track)",
  dates: "Sep. 2023 — Present",
  gpa: "3.79 / 4.00",
  courses: [
    "Circuit Design",
    "Digital System Design",
    "Intro to VLSI Systems",
    "Probability and ML Foundations",
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
    role: "CS 198 — Student Leader (CS106A/B)",
    org: "Stanford University",
    dates: "Sept. 2025 — Present",
    points: [
      "Teach and mentor students in Python (CS106A) and C++ (CS106B) through weekly sections, emphasizing algorithmic thinking, abstraction, and debugging best practices.",
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
