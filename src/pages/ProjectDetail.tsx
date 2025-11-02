import { useParams } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Project {
  id: string;
  title: string;
  image: string;
  skills: string[];
  overview: string;
  description: string;
  acknowledgements?: string;
}

const projects: Record<string, Project> = {
  "wearable-vr-glove": {
    id: "wearable-vr-glove",
    title: "Wearable VR Glove",
    image: "./vr_glove_headset.jpg",
    overview: "A wireless microcontroller-based glove integrating flex sensors and an IMU for real-time gesture-based control in Unity.",
    skills: ["Teensy-ESP32", "Unity", "ESP-NOW", "Flex Sensors", "IMU", "Quaternion Tracking"],
    description: "This project presents a wireless VR glove controller that integrates five flex sensors and an IMU to enable real-time gesture recognition and interaction in Unity. Sensor data is transmitted using ESP NOW between ESP32 modules, while a Teensy performs calibration and quaternion-based orientation tracking to classify hand gestures accurately and with low latency. The system supports natural interaction in VR without external cameras or traditional handheld controllers, demonstrating strong integration of embedded sensing, wireless communication, signal processing, and VR software development.",
    acknowledgements: "Stanford University | EE267, Virtual Reality"
  },
        "ac-dc-converter": {
          id: "ac-dc-converter",
          title: "AC to DC Converter",
          image: "/ee-portfolio/acdcconverter.JPG",
          overview: "A high-performance full-bridge AC-DC converter featuring advanced capacitive filtering and voltage regulation for optimal power delivery across diverse load conditions.",
          skills: ["Full-Bridge", "LTspice", "Oscilloscope", "Capacitive Filtering", "Ripple Reduction"],
          description: "This project explores a full-bridge AC to DC converter designed to provide a steady DC output from an AC source. The circuit uses a diode bridge to rectify the input, a capacitor to reduce ripple, and a simple Zener-referenced transistor stage to help stabilize the voltage under changing loads. LTspice simulations supported component selection and helped predict behavior before testing. Measurements with an oscilloscope and waveform generator were used to observe filtering effects and confirm basic regulation. The design demonstrates foundational power-electronics concepts such as rectification, filtering, and voltage referencing while gaining hands-on experience with circuit simulation and bench testing.",
          acknowledgements: "Stanford University | EE101A, Circuits I"
        },
  "music-synthesizer": {
    id: "music-synthesizer",
    title: "Enhanced Music Synthesizer & Display",
    image: "/ee-portfolio/music snythesizer.jpg",
    overview: "An advanced Verilog-based music synthesizer implemented on FPGA with sophisticated waveform mixing, harmonic generation, and real-time VGA visualization capabilities.",
    skills: ["Verilog", "FPGA", "VGA", "Waveform Mixing", "Harmonic Generation", "Xilinx Vivado"],
    description: "This project implements a Verilog-based music synthesizer on an FPGA that can mix waveforms, generate simple harmonics, and output signals to a VGA display. Multiple tones can be played at once by scheduling up to three notes in parallel, and amplitude can be adjusted through a rotary-encoder interface. The design also includes basic PWM output for visual feedback using LEDs. Development was done in Xilinx Vivado, with debugging focused on timing control and stable VGA rendering. The project provided hands-on experience with digital audio generation, hardware description design, and FPGA-based signal visualization.",
    acknowledgements: "Stanford University | EE108, Digital Design"
  },
  "simd-gemm-accelerator": {
    id: "simd-gemm-accelerator",
    title: "SIMD GEMM Accelerator",
    image: "./coming-soon-poster.svg",
    overview: "An advanced SIMD GEMM accelerator implementation utilizing cutting-edge EDA tools and high-level synthesis for optimal performance in matrix operations.",
    skills: ["SystemVerilog", "C/C++", "VLSI", "SIMD", "GEMM", "High-Level Synthesis", "EDA Tools"],
    description: "This project is currently in development and focuses on building a SIMD GEMM accelerator for matrix operations. The work begins with writing C/C++ code to express high-level system behavior, followed by implementing the accelerator in SystemVerilog and synthesizing it using EDA tools. The design is then optimized to improve performance. A later stage involves porting the design to high-level synthesis and comparing results. This project introduces practical experience with hardware design, optimization, and accelerator implementation for matrix computation.",
    acknowledgements: "Stanford University | EE271, Introduction to VLSI Systems"
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects[id || ""];

  if (!project) {
    return <div className="min-h-screen pt-16">Project not found</div>;
  }

  return (
    <div className="min-h-screen pt-16 pb-12 font-sfpro">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          <div className="md:col-span-1">
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p className="text-gray-600">{project.overview}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {project.acknowledgements && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Acknowledgements</h2>
                  <p className="text-gray-600">{project.acknowledgements}</p>
                </div>
              )}
            </div>
          </div>

                <div className="md:col-span-2">
                  <div className="space-y-6">
                    {project.id === "ac-dc-converter" ? (
                      <div className="space-y-4">
                        <AspectRatio ratio={2 / 1} className="bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={project.image}
                            alt="AC-DC Converter"
                            className="w-full h-full object-cover object-top"
                          />
                        </AspectRatio>
                        <AspectRatio ratio={4 / 1} className="bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src="/ee-portfolio/acdccircuit.png"
                            alt="AC-DC Circuit Diagram"
                            className="w-full h-full object-contain"
                          />
                        </AspectRatio>
                      </div>
                    ) : (
                      <AspectRatio ratio={16 / 9} className="bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    )}
              <div className="prose max-w-none">
                <p className="text-gray-600">{project.description}</p>
              </div>
              
              {/* PDF Viewer for VR Glove Project */}
              {project.id === "wearable-vr-glove" && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Project Report</h3>
                  <div className="w-full h-[100vh] border border-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      src="./wearable vr glove report.pdf#toolbar=1&navpanes=1&scrollbar=1"
                      className="w-full h-full"
                      title="Wearable VR Glove Report"
                      style={{ minHeight: '800px' }}
                    />
                  </div>
                </div>
              )}

              {/* PDF Viewer for Music Synthesizer Project */}
              {project.id === "music-synthesizer" && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Project Report</h3>
                  <div className="w-full h-[100vh] border border-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      src="./ee108finalreport.pdf#toolbar=1&navpanes=1&scrollbar=1"
                      className="w-full h-full"
                      title="Music Synthesizer Report"
                      style={{ minHeight: '800px' }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
