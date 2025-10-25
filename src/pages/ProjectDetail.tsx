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
    image: "https://images.unsplash.com/photo-1592478411213-6153e4c4c8f0",
    overview: "A wireless microcontroller-based glove integrating flex sensors and an IMU for real-time gesture-based control in Unity.",
    skills: ["Teensy-ESP32", "Unity", "ESP-NOW", "Flex Sensors", "IMU", "Quaternion Tracking"],
    description: "Built a wireless microcontroller-based glove integrating flex sensors and an IMU for real-time gesture-based control in Unity, achieving <50 ms latency and seamless head-tracked interaction. Programmed a Teensy–ESP32 system using ESP-NOW and quaternion-based tracking, reaching ~86% average gesture classification accuracy without reliance on cameras or external controllers. This project demonstrates advanced embedded systems design, wireless communication protocols, and real-time signal processing for VR applications.",
    acknowledgements: "Stanford University | EE267, Virtual Reality"
  },
  "ac-dc-converter": {
    id: "ac-dc-converter",
    title: "AC to DC Converter",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
    overview: "A full-bridge AC-DC converter with capacitive filtering to reduce ripple and regulate output voltage under various load conditions.",
    skills: ["Full-Bridge", "LTspice", "Oscilloscope", "Capacitive Filtering", "Ripple Reduction"],
    description: "Implemented a full-bridge AC-DC converter with capacitive filtering to reduce ripple and regulate output voltage under various load conditions. Measured performance using oscilloscopes and waveform generators; validated and refined transient behavior through iterative LTspice simulations. This project showcases fundamental power electronics principles, circuit analysis techniques, and simulation-based design validation.",
    acknowledgements: "Stanford University | EE101A, Circuits I"
  },
  "music-synthesizer": {
    id: "music-synthesizer",
    title: "Enhanced Music Synthesizer & Display",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    overview: "A Verilog-based music synthesizer for FPGA capable of waveform mixing, harmonic generation, and amplitude control displayed via VGA output.",
    skills: ["Verilog", "FPGA", "VGA", "Waveform Mixing", "Harmonic Generation", "Xilinx Vivado"],
    description: "Created a Verilog-based music synthesizer for FPGA capable of waveform mixing, harmonic generation, and amplitude control displayed via VGA output. Debugged timing and control logic using Xilinx Vivado for glitch-free output on VGA hardware. This project demonstrates digital design principles, FPGA programming, and real-time audio processing using hardware description languages.",
    acknowledgements: "Stanford University | EE108, Digital Design"
  },
  "simd-gemm-accelerator": {
    id: "simd-gemm-accelerator",
    title: "SIMD GEMM Accelerator",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176",
    overview: "A SIMD GEMM accelerator implementation using EDA tools with performance optimization through high-level synthesis.",
    skills: ["SystemVerilog", "C/C++", "VLSI", "SIMD", "GEMM", "High-Level Synthesis", "EDA Tools"],
    description: "Writing C/C++ and SystemVerilog code to implement and synthesize a SIMD GEMM accelerator using EDA tools, with performance optimization through high-level synthesis. This ongoing project explores advanced VLSI design methodologies, parallel computing architectures, and optimization techniques for matrix operations in hardware. The accelerator is designed to significantly improve computational performance for machine learning and scientific computing applications.",
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
              <AspectRatio ratio={16 / 9} className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <div className="prose max-w-none">
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
