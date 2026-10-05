export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\.?\//, "")}`;

export interface Project {
  id: string;
  title: string;
  /** How the hero image fills its frame; defaults to "cover". */
  imageFit?: "cover" | "contain";
  /** Card thumbnail and detail hero image (path under public/). */
  image: string;
  /** Card thumbnail, if different from the detail hero (path under public/). */
  thumb?: string;
  /** Short tags shown on cards. */
  cardSkills: string[];
  skills: string[];
  overview: string;
  description: string;
  acknowledgements?: string;
  /** Headline numbers shown on the detail page. */
  metrics?: { value: string; label: string }[];
  /** Extra images shown under the hero (path under public/). */
  gallery?: { src: string; alt: string; ratio: number; fit?: "cover" | "contain" }[];
  /** PDFs embedded on the detail page (path under public/). */
  reports?: { title: string; src: string }[];
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    id: "thermal-map-predictor",
    title: "Physics-Constrained Thermal Map Predictor",
    image: "thermal-predictions.png",
    imageFit: "contain",
    thumb: "thermal-thumb.png",
    cardSkills: ["PyTorch", "U-Net", "Physics-Informed ML"],
    skills: ["PyTorch", "U-Net", "Physics-Informed Loss", "HotSpot", "CircuitNet 2.0", "Modal", "OOD Evaluation"],
    overview:
      "A U-Net that predicts full-chip thermal heatmaps from floorplan and power-density images, with the 2D heat equation built into the training loss so no simulator calls are needed during training. It cut in-distribution error by 11% over an MSE-only baseline.",
    description:
      "Thermal simulation is a bottleneck in chip design-space exploration: a simulator like HotSpot takes seconds to minutes per design, but floorplan optimization needs many thousands of evaluations. We framed thermal prediction as image-to-image regression: the input is a 2-channel 256×256 image (post-placement floorplan and power density) and the output is a steady-state temperature map. Beyond the standard data loss, we added a differentiable heat-equation residual computed with a fixed 3×3 Laplacian convolution on the network's output. We trained on 153 HotSpot-labeled layouts from the CircuitNet 2.0 GPU/accelerator designs (Vortex and NVDLA), and compared 12 models (3 architectures × 4 physics-loss weights) on Modal. The best model, a U-Net with pixel-shuffle upsampling and physics weight 0.01, reached 0.895 K RMSE and 0.841 hotspot IoU, 11% lower RMSE than the MSE-only baseline. We also tested generalization to die thicknesses and convection resistances outside the training sweep. The physics loss helped modestly under moderate convection shifts (8–11% lower RMSE) but did not help die-thickness extrapolation, which suggests that stronger physics priors are needed for robust extrapolation.",
    acknowledgements: "Stanford University | CS231N, Deep Learning for Computer Vision. Joint work with Fabian Molina.",
    metrics: [
      { value: "0.895 K", label: "RMSE (best model)" },
      { value: "0.841", label: "hotspot IoU" },
      { value: "−11%", label: "RMSE vs. MSE-only" },
      { value: "12", label: "models compared" },
    ],
    gallery: [
      { src: "thermal-indist-rmse.png", alt: "In-distribution RMSE for all 12 models", ratio: 2, fit: "contain" },
      { src: "thermal-ood-convection.png", alt: "RMSE under out-of-distribution convection resistance", ratio: 1.6, fit: "contain" },
    ],
    reports: [{ title: "Project Poster", src: "thermal-poster.pdf" }],
  },
  {
    id: "dnn-inference-accelerator",
    title: "DNN Inference Hardware Accelerator",
    image: "dnn-accelerator-diagram.svg",
    imageFit: "contain",
    thumb: "dnn-accelerator-thumb.svg",
    cardSkills: ["HLS", "SystolicArray", "ASIC Flow"],
    skills: ["HLS", "RTL", "UVM", "Synopsys Design Compiler", "Cadence Innovus", "Systolic Array", "Dataflow Optimization"],
    overview:
      "A 16×16 systolic-array accelerator for DNN inference, taken from high-level synthesis through RTL, synthesis, place-and-route, and signoff. Loop pipelining, unrolling, and dataflow optimization reached 85% MAC utilization.",
    description:
      "This project implements a 16×16 weight-stationary systolic array for convolutional layers. Weights are loaded into the processing elements, skewed inputs stream across the array, and partial sums accumulate down the columns, with double buffers hiding memory latency for both inputs and weights. The design was written in C++ for high-level synthesis, then optimized with loop pipelining, unrolling, and dataflow restructuring to reach 85% MAC utilization. It was then driven through the full ASIC flow: synthesis with Synopsys Design Compiler, and place-and-route and signoff with Cadence Innovus. A UVM testbench provided functional verification and validation across the design flow.",
    acknowledgements: "Stanford University | EE272, VLSI Projects I",
    metrics: [
      { value: "16×16", label: "systolic array" },
      { value: "85%", label: "MAC utilization" },
      { value: "Full", label: "RTL-to-signoff ASIC flow" },
      { value: "UVM", label: "verification testbench" },
    ],
  },
  {
    id: "mips-pipelined-processor",
    title: "5-Stage Pipelined MIPS Processor",
    image: "mips-pipeline-diagram.svg",
    imageFit: "contain",
    thumb: "mips-pipeline-thumb.svg",
    cardSkills: ["SystemVerilog", "FPGA", "Pipelining"],
    skills: ["SystemVerilog", "FPGA", "Xilinx Vivado", "Pipelining", "Hazard Resolution", "MIPS"],
    overview:
      "A 5-stage pipelined MIPS processor supporting more than 40 instructions with full hazard resolution, validated on an FPGA running a Sobel edge-detection workload.",
    description:
      "This project implements a classic five-stage MIPS pipeline (fetch, decode, execute, memory, write-back) in SystemVerilog. It resolves data hazards with forwarding and stalling, and handles control hazards from branches. The processor supports more than 40 instructions and was validated on an FPGA with a Sobel edge-detection workload, which exercises the pipeline with real image-processing code.",
    acknowledgements: "Stanford University | EE180, Digital Systems Architecture",
    metrics: [
      { value: "5", label: "pipeline stages" },
      { value: "40+", label: "instructions" },
    ],
  },
  {
    id: "wearable-vr-glove",
    title: "Wearable VR Glove",
    image: "vr_glove_headset.jpg",
    thumb: "vr_glove.JPG",
    cardSkills: ["Teensy-ESP32", "Unity", "ESP-NOW"],
    skills: ["Teensy-ESP32", "Unity", "ESP-NOW", "Flex Sensors", "IMU", "Quaternion Tracking"],
    overview:
      "A wireless glove controller that uses flex sensors and an IMU to recognize simple hand gestures for real-time interaction in Unity. Data is transmitted through ESP-NOW to a Teensy for processing, enabling natural, untethered control in VR environments.",
    description:
      "This project presents a wireless VR glove controller that integrates five flex sensors and an IMU to enable real-time gesture recognition and interaction in Unity. Sensor data is transmitted using ESP NOW between ESP32 modules, while a Teensy performs calibration and quaternion-based orientation tracking to classify hand gestures accurately and with low latency. The system supports natural interaction in VR without external cameras or traditional handheld controllers, demonstrating strong integration of embedded sensing, wireless communication, signal processing, and VR software development.",
    acknowledgements: "Stanford University | EE267, Virtual Reality",
    reports: [{ title: "Project Report", src: "wearable vr glove report.pdf" }],
    links: [{ label: "Source on GitHub", href: "https://github.com/rcarrz04/glove-vr-controller" }],
  },
  {
    id: "ac-dc-converter",
    title: "AC to DC Converter",
    image: "acdcconverter.JPG",
    cardSkills: ["Full-Bridge", "LTspice", "Oscilloscope"],
    skills: ["Full-Bridge", "LTspice", "Oscilloscope", "Capacitive Filtering", "Ripple Reduction"],
    overview:
      "A full-bridge rectifier circuit designed to convert an AC input to a stable DC output. The design uses filtering and a Zener-based stage to reduce ripple and improve voltage consistency under varying load conditions.",
    description:
      "This project explores a full-bridge AC to DC converter designed to provide a steady DC output from an AC source. The circuit uses a diode bridge to rectify the input, a capacitor to reduce ripple, and a simple Zener-referenced transistor stage to help stabilize the voltage under changing loads. LTspice simulations supported component selection and helped predict behavior before testing. Measurements with an oscilloscope and waveform generator were used to observe filtering effects and confirm basic regulation. The design demonstrates foundational power-electronics concepts such as rectification, filtering, and voltage referencing while gaining hands-on experience with circuit simulation and bench testing.",
    acknowledgements: "Stanford University | EE101A, Circuits I",
    gallery: [{ src: "acdccircuit.png", alt: "AC-DC Circuit Diagram", ratio: 4, fit: "contain" }],
  },
  {
    id: "music-synthesizer",
    title: "Enhanced Music Synthesizer & Display",
    image: "music-synthesizer.jpg",
    cardSkills: ["Verilog", "FPGA", "VGA"],
    skills: ["Verilog", "FPGA", "VGA", "Waveform Mixing", "Harmonic Generation", "Xilinx Vivado"],
    overview:
      "A Verilog-based music synthesizer running on an FPGA that can play multiple notes, adjust amplitude through a rotary input, and visualize audio output on a VGA display. PWM support provides simple LED feedback.",
    description:
      "This project implements a Verilog-based music synthesizer on an FPGA that can mix waveforms, generate simple harmonics, and output signals to a VGA display. Multiple tones can be played at once by scheduling up to three notes in parallel, and amplitude can be adjusted through a rotary-encoder interface. The design also includes basic PWM output for visual feedback using LEDs. Development was done in Xilinx Vivado, with debugging focused on timing control and stable VGA rendering. The project provided hands-on experience with digital audio generation, hardware description design, and FPGA-based signal visualization.",
    acknowledgements: "Stanford University | EE108, Digital Design",
    reports: [{ title: "Project Report", src: "ee108finalreport.pdf" }],
  },
  {
    id: "simd-gemm-accelerator",
    title: "SIMD GEMM Accelerator",
    image: "simd-gemm-diagram.svg",
    imageFit: "contain",
    thumb: "simd-gemm-thumb.svg",
    cardSkills: ["SystemVerilog", "HLS", "VLSI"],
    skills: ["SystemVerilog", "HLS", "C/C++", "SIMD", "GEMM", "PPA Optimization", "Design-Space Exploration"],
    overview:
      "A SIMD matrix-multiply (GEMM) accelerator optimized for power, area, and latency. Architecture and resource trade-off exploration improved the combined power-area-latency figure of merit by more than 60%.",
    description:
      "This project builds a SIMD GEMM accelerator for matrix operations, starting from a C/C++ model of the intended behavior and moving through high-level synthesis and SystemVerilog. The optimization work centered on architecture and resource trade-offs: sharing hardware cut the multiplier count from 7 to 4, a 17% area reduction, and the design was then scaled to 64 processing elements for a 4× latency reduction while maintaining timing closure. Together these changes improved the power-area-latency figure of merit by more than 60%.",
    acknowledgements: "Stanford University | EE271, Introduction to VLSI Systems",
    metrics: [
      { value: "60%+", label: "PAL figure-of-merit gain" },
      { value: "7 → 4", label: "multipliers (−17% area)" },
      { value: "64", label: "processing elements" },
      { value: "4×", label: "latency reduction" },
    ],
  },
];
