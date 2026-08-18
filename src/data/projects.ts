export interface Project {
  id: string;
  tag: string; // domain-coded reference designator, e.g. "VR·01"
  title: string;
  image: string;
  date: string;
  course: string; // "Stanford University | EE267, Virtual Reality"
  skills: string[];
  overview: string;
  description: string;
  status?: "in-progress";
  detailImages?: { src: string; alt: string; ratio: number }[];
  report?: { src: string; label: string };
}

export const projects: Project[] = [
  {
    id: "wearable-vr-glove",
    tag: "VR·01",
    title: "Wearable VR Glove",
    image: "/ee-portfolio/vr_glove.JPG",
    date: "May 2025 — Present",
    course: "Stanford University | EE267, Virtual Reality",
    skills: ["Teensy-ESP32", "Unity", "ESP-NOW", "Flex Sensors", "IMU", "Quaternion Tracking"],
    overview:
      "A wireless glove controller that uses flex sensors and an IMU to recognize simple hand gestures for real-time interaction in Unity. Data is transmitted through ESP-NOW to a Teensy for processing, enabling natural, untethered control in VR environments.",
    description:
      "This project presents a wireless VR glove controller that integrates five flex sensors and an IMU to enable real-time gesture recognition and interaction in Unity. Sensor data is transmitted using ESP-NOW between ESP32 modules, while a Teensy performs calibration and quaternion-based orientation tracking to classify hand gestures accurately and with low latency, achieving <50 ms latency and ~86% average gesture classification accuracy. The system supports natural interaction in VR without external cameras or traditional handheld controllers, demonstrating strong integration of embedded sensing, wireless communication, signal processing, and VR software development.",
    detailImages: [{ src: "/ee-portfolio/vr_glove_headset.jpg", alt: "Wearable VR Glove", ratio: 16 / 9 }],
    report: { src: "/ee-portfolio/wearable vr glove report.pdf", label: "Project Report" },
  },
  {
    id: "ac-dc-converter",
    tag: "PWR·01",
    title: "AC to DC Converter",
    image: "/ee-portfolio/acdcconverter.JPG",
    date: "Jan. — Feb. 2025",
    course: "Stanford University | EE101A, Circuits I",
    skills: ["Full-Bridge", "LTspice", "Oscilloscope", "Capacitive Filtering", "Ripple Reduction"],
    overview:
      "A full-bridge rectifier circuit designed to convert an AC input to a stable DC output. The design uses filtering and a Zener-based stage to reduce ripple and improve voltage consistency under varying load conditions.",
    description:
      "This project explores a full-bridge AC to DC converter designed to provide a steady DC output from an AC source. The circuit uses a diode bridge to rectify the input, a capacitor to reduce ripple, and a simple Zener-referenced transistor stage to help stabilize the voltage under changing loads. LTspice simulations supported component selection and helped predict behavior before testing. Measurements with an oscilloscope and waveform generator were used to observe filtering effects and confirm basic regulation. The design demonstrates foundational power-electronics concepts such as rectification, filtering, and voltage referencing while gaining hands-on experience with circuit simulation and bench testing.",
    detailImages: [
      { src: "/ee-portfolio/acdcconverter.JPG", alt: "AC-DC Converter", ratio: 2 / 1 },
      { src: "/ee-portfolio/acdccircuit.png", alt: "AC-DC Circuit Diagram", ratio: 4 / 1 },
    ],
  },
  {
    id: "music-synthesizer",
    tag: "DSP·01",
    title: "Enhanced Music Synthesizer & Display",
    image: "/ee-portfolio/music snythesizer.jpg",
    date: "Jan. — Feb. 2025",
    course: "Stanford University | EE108, Digital Design",
    skills: ["Verilog", "FPGA", "VGA", "Waveform Mixing", "Harmonic Generation", "Xilinx Vivado"],
    overview:
      "A Verilog-based music synthesizer running on an FPGA that can play multiple notes, adjust amplitude through a rotary input, and visualize audio output on a VGA display. PWM support provides simple LED feedback.",
    description:
      "This project implements a Verilog-based music synthesizer on an FPGA that can mix waveforms, generate simple harmonics, and output signals to a VGA display. Multiple tones can be played at once by scheduling up to three notes in parallel, and amplitude can be adjusted through a rotary-encoder interface. The design also includes basic PWM output for visual feedback using LEDs. Development was done in Xilinx Vivado, with debugging focused on timing control and stable VGA rendering. The project provided hands-on experience with digital audio generation, hardware description design, and FPGA-based signal visualization.",
    report: { src: "/ee-portfolio/ee108finalreport.pdf", label: "Project Report" },
  },
  {
    id: "simd-gemm-accelerator",
    tag: "VLSI·01",
    title: "SIMD GEMM Accelerator",
    image: "/ee-portfolio/coming-soon-poster.svg",
    date: "Sep. 2025 — Present",
    course: "Stanford University | EE271, Introduction to VLSI Systems",
    skills: ["SystemVerilog", "C/C++", "VLSI", "SIMD", "GEMM", "High-Level Synthesis", "EDA Tools"],
    overview:
      "A work-in-progress design of a SIMD GEMM accelerator for matrix operations. The project begins with high-level behavior in C/C++, then implements the design in SystemVerilog, synthesizes it using EDA tools, and later explores high-level synthesis for comparison.",
    description:
      "This project is currently in development and focuses on building a SIMD GEMM accelerator for matrix operations. The work begins with writing C/C++ code to express high-level system behavior, followed by implementing the accelerator in SystemVerilog and synthesizing it using EDA tools. The design is then optimized to improve performance. A later stage involves porting the design to high-level synthesis and comparing results. This project introduces practical experience with hardware design, optimization, and accelerator implementation for matrix computation.",
    status: "in-progress",
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
