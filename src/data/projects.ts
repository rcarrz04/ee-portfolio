export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\.?\//, "")}`;

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
  /** Headline numbers shown at the top of the detail page. */
  metrics?: { value: string; label: string }[];
  detailImages?: { src: string; alt: string; ratio: number; fit?: "cover" | "contain"; caption?: string }[];
  report?: { src: string; label: string };
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    id: "thermal-map-predictor",
    tag: "ML·01",
    title: "Physics-Constrained Thermal Map Predictor",
    image: asset("thermal-cover.png"),
    date: "Jan. — Jun. 2026",
    course: "Stanford University | CS231N, Deep Learning for Computer Vision. Joint work with Fabian Molina.",
    skills: ["PyTorch", "U-Net", "Physics-Informed Loss", "HotSpot", "CircuitNet 2.0", "Modal", "OOD Evaluation"],
    overview:
      "A U-Net that predicts full-chip thermal heatmaps from floorplan and power-density images, with the 2D heat equation built into the training loss so no simulator calls are needed during training. It cut in-distribution error by 11% over an MSE-only baseline.",
    description:
      "Thermal simulation is a bottleneck in chip design-space exploration: a simulator like HotSpot takes seconds to minutes per design, but floorplan optimization needs many thousands of evaluations. We framed thermal prediction as image-to-image regression: the input is a 2-channel 256×256 image (post-placement floorplan and power density) and the output is a steady-state temperature map. Beyond the standard data loss, we added a differentiable heat-equation residual computed with a fixed 3×3 Laplacian convolution on the network's output. We trained on 153 HotSpot-labeled layouts from the CircuitNet 2.0 GPU/accelerator designs (Vortex and NVDLA), and compared 12 models (3 architectures × 4 physics-loss weights) on Modal. The best model, a U-Net with pixel-shuffle upsampling and physics weight 0.01, reached 0.895 K RMSE and 0.841 hotspot IoU, 11% lower RMSE than the MSE-only baseline. We also tested generalization to die thicknesses and convection resistances outside the training sweep. The physics loss helped modestly under moderate convection shifts (8–11% lower RMSE) but did not help die-thickness extrapolation, which suggests that stronger physics priors are needed for robust extrapolation.",
    metrics: [
      { value: "0.895 K", label: "RMSE (best model)" },
      { value: "0.841", label: "hotspot IoU" },
      { value: "−11%", label: "RMSE vs. MSE-only" },
      { value: "12", label: "models compared" },
    ],
    detailImages: [
      { src: asset("thermal-predictions.png"), alt: "Per-family thermal predictions versus ground truth", ratio: 2387 / 1439, fit: "contain" },
      { src: asset("thermal-architectures.png"), alt: "The three architectures compared: PlainCNN, EncoderDecoder, and U-Net", ratio: 1026 / 476, fit: "contain", caption: "The three architectures compared: PlainCNN (~600K params), EncoderDecoder (~28M), and U-Net with skip connections (~2M)." },
      { src: asset("thermal-indist-rmse.png"), alt: "In-distribution RMSE for all 12 models", ratio: 2, fit: "contain" },
      { src: asset("thermal-ood-convection.png"), alt: "RMSE under out-of-distribution convection resistance", ratio: 1.6, fit: "contain" },
    ],
    report: { src: asset("thermal-poster.pdf"), label: "Project Poster" },
  },
  {
    id: "dnn-inference-accelerator",
    tag: "VLSI·02",
    title: "DNN Inference Hardware Accelerator",
    image: asset("dnn-layout.png"),
    date: "Jan. — Mar. 2026",
    course: "Stanford University | EE272, VLSI Projects I",
    skills: ["HLS", "RTL", "UVM", "Synopsys Design Compiler", "Cadence Innovus", "Systolic Array", "Dataflow Optimization"],
    overview:
      "A 16×16 systolic-array accelerator for DNN inference, taken from high-level synthesis through RTL, synthesis, place-and-route, and signoff. The final HLS design meets the target cycle count on every ResNet-18 convolution layer group, with MAC utilization peaking at 85%.",
    description:
      "This project implements a 16×16 weight-stationary systolic array for convolutional layers. Weights are loaded into the processing elements, skewed inputs stream across the array, and partial sums accumulate down the columns, with double buffers hiding memory latency for both inputs and weights. The design was written in C++ for high-level synthesis, then optimized with loop pipelining, unrolling, and dataflow restructuring. We evaluated it on the convolution layers of ResNet-18: the final HLS design beat the target cycle count on all eight layer groups (for example, conv2_x ran in about 530,000 cycles against a 540,000-cycle target at 85% MAC utilization), and reached 0.59–0.85 utilization on every layer group except the first convolution (0.16). The design was then driven through the full ASIC flow: synthesis with Synopsys Design Compiler, and place-and-route and signoff with Cadence Innovus. A UVM testbench provided functional verification and validation across the design flow.",
    metrics: [
      { value: "16×16", label: "systolic array" },
      { value: "85%", label: "peak MAC utilization (conv2_x)" },
      { value: "8 / 8", label: "ResNet-18 layer groups meet target cycles" },
      { value: "Full", label: "RTL-to-signoff ASIC flow" },
    ],
    detailImages: [
      { src: asset("dnn-array-architecture.png"), alt: "Systolic array with input, weight, and accumulation buffers and the MAC processing element", ratio: 1170 / 692, fit: "contain", caption: "Systolic array with input, weight, and accumulation buffers, and the MAC processing element." },
      { src: asset("dnn-layer-results.png"), alt: "Cycles and MAC utilization per ResNet-18 layer: target, unoptimized Verilog, and final HLS design", ratio: 1306 / 590, fit: "contain" },
      { src: asset("dnn-resnet18-layers.png"), alt: "ResNet-18 convolution layers grouped for evaluation", ratio: 526 / 1188, fit: "contain" },
      { src: asset("dnn-layout.png"), alt: "Place-and-route layout of the accelerator", ratio: 688 / 590, fit: "contain" },
    ],
  },
  {
    id: "mips-pipelined-processor",
    tag: "ARCH·01",
    title: "5-Stage Pipelined MIPS Processor",
    image: asset("mips-sobel-output.png"),
    date: "Jan. — Mar. 2026",
    course: "Stanford University | EE180, Digital Systems Architecture",
    skills: ["SystemVerilog", "FPGA", "Xilinx Vivado", "Pipelining", "Hazard Resolution", "MIPS"],
    overview:
      "A 5-stage pipelined MIPS processor supporting more than 40 instructions with full hazard resolution, validated on an FPGA running a Sobel edge-detection workload.",
    description:
      "This project implements a classic five-stage MIPS pipeline (fetch, decode, execute, memory, write-back) in SystemVerilog. It resolves data hazards with forwarding and stalling, and handles control hazards from branches. The processor supports more than 40 instructions and was validated on an FPGA with a Sobel edge-detection workload, which exercises the pipeline with real image-processing code.",
    metrics: [
      { value: "5", label: "pipeline stages" },
      { value: "40+", label: "instructions" },
    ],
    detailImages: [
      { src: asset("mips-sobel-output.png"), alt: "Sobel edge-detection output", ratio: 1106 / 630, fit: "contain", caption: "Output of the Sobel edge-detection workload." },
      { src: asset("mips-reference-datapath.png"), alt: "Reference single-cycle MIPS datapath", ratio: 1320 / 765, fit: "contain", caption: "Reference single-cycle MIPS datapath from course lecture slides. The pipelined design splits this into five stages and adds forwarding and hazard control." },
      { src: asset("mips-pipeline-control.jpeg"), alt: "Control signals propagating through the pipeline registers", ratio: 1610 / 788, fit: "contain", caption: "Control signals propagating through the pipeline registers (IF/ID, ID/EX, EX/MEM, MEM/WB)." },
    ],
  },
  {
    id: "wearable-vr-glove",
    tag: "VR·01",
    title: "Wearable VR Glove",
    image: asset("vr_glove.JPG"),
    date: "May 2025 — Present",
    course: "Stanford University | EE267, Virtual Reality",
    skills: ["Teensy-ESP32", "Unity", "ESP-NOW", "Flex Sensors", "IMU", "Quaternion Tracking"],
    overview:
      "A wireless glove controller that uses flex sensors and an IMU to recognize simple hand gestures for real-time interaction in Unity. Data is transmitted through ESP-NOW to a Teensy for processing, enabling natural, untethered control in VR environments.",
    description:
      "This project presents a wireless VR glove controller that integrates five flex sensors and an IMU to enable real-time gesture recognition and interaction in Unity. Sensor data is transmitted using ESP-NOW between ESP32 modules, while a Teensy performs calibration and quaternion-based orientation tracking to classify hand gestures accurately and with low latency, achieving <50 ms latency and ~86% average gesture classification accuracy. The system supports natural interaction in VR without external cameras or traditional handheld controllers, demonstrating strong integration of embedded sensing, wireless communication, signal processing, and VR software development.",
    detailImages: [{ src: asset("vr_glove_headset.jpg"), alt: "Wearable VR Glove", ratio: 16 / 9 }],
    links: [{ label: "Source on GitHub", href: "https://github.com/rcarrz04/glove-vr-controller" }],
    report: { src: asset("wearable vr glove report.pdf"), label: "Project Report" },
  },
  {
    id: "ac-dc-converter",
    tag: "PWR·01",
    title: "AC to DC Converter",
    image: asset("acdcconverter.JPG"),
    date: "Jan. — Feb. 2025",
    course: "Stanford University | EE101A, Circuits I",
    skills: ["Full-Bridge", "LTspice", "Oscilloscope", "Capacitive Filtering", "Ripple Reduction"],
    overview:
      "A full-bridge rectifier circuit designed to convert an AC input to a stable DC output. The design uses filtering and a Zener-based stage to reduce ripple and improve voltage consistency under varying load conditions.",
    description:
      "This project explores a full-bridge AC to DC converter designed to provide a steady DC output from an AC source. The circuit uses a diode bridge to rectify the input, a capacitor to reduce ripple, and a simple Zener-referenced transistor stage to help stabilize the voltage under changing loads. LTspice simulations supported component selection and helped predict behavior before testing. Measurements with an oscilloscope and waveform generator were used to observe filtering effects and confirm basic regulation. The design demonstrates foundational power-electronics concepts such as rectification, filtering, and voltage referencing while gaining hands-on experience with circuit simulation and bench testing. Across 3 load conditions (100 Ω to 10 kΩ), the converter held peak ripple under 50 mV over a 0–22 V adjustable output range.",
    metrics: [
      { value: "0–22 V", label: "adjustable output" },
      { value: "<50 mV", label: "peak ripple" },
      { value: "3", label: "load conditions tested" },
    ],
    detailImages: [
      { src: asset("acdcconverter.JPG"), alt: "AC-DC Converter", ratio: 2 / 1 },
      { src: asset("acdccircuit.png"), alt: "AC-DC Circuit Diagram", ratio: 4 / 1, fit: "contain" },
    ],
  },
  {
    id: "music-synthesizer",
    tag: "DSP·01",
    title: "Enhanced Music Synthesizer & Display",
    image: asset("music-synthesizer.jpg"),
    date: "Jan. — Feb. 2025",
    course: "Stanford University | EE108, Digital Design",
    skills: ["Verilog", "FPGA", "VGA", "Waveform Mixing", "Harmonic Generation", "Xilinx Vivado"],
    overview:
      "A Verilog-based music synthesizer running on an FPGA that can play multiple notes, adjust amplitude through a rotary input, and visualize audio output on a VGA display. PWM support provides simple LED feedback.",
    description:
      "This project implements a Verilog-based music synthesizer on an FPGA that can mix waveforms, generate simple harmonics, and output signals to a VGA display. Multiple tones can be played at once by scheduling up to three notes in parallel, and amplitude can be adjusted through a rotary-encoder interface. The design also includes basic PWM output for visual feedback using LEDs. Development was done in Xilinx Vivado, with debugging focused on timing control and stable VGA rendering. The project provided hands-on experience with digital audio generation, hardware description design, and FPGA-based signal visualization.",
    report: { src: asset("ee108finalreport.pdf"), label: "Project Report" },
  },
  {
    id: "robotic-arm",
    tag: "MECH·01",
    title: "Robotic Arm",
    image: asset("robotic-arm-card.jpg"),
    date: "Jan. — Mar. 2024",
    course: "Stanford University | EE 64, Mechanical Prototyping for Electrical Engineers. Joint work with Jess Fonseca.",
    skills: ["Fusion 360", "3D Printing", "Mechanical Design", "Arduino Mega", "Gear Linkage"],
    overview:
      "A robotic arm built with a partner for EE 64: a 3D-printed base and gripper, aluminum-extrusion links, and an Arduino Mega controller. The gripper is a gear-linkage design modeled in Fusion 360.",
    description:
      "EE 64 teaches electrical engineers to design mechanical assemblies for manufacture with 3D printers and laser cutters, and to interface them with store-bought parts. For the course project, we built a robotic arm that combines a 3D-printed base, aluminum-extrusion links, and a two-finger gripper, all driven from an Arduino Mega (the Arduino IDE is open on the laptop in the photo). The gripper is a 14-component assembly modeled in Fusion 360, with fingers, thumbs, base connectors, and gear linkages; in the photo it holds a chess king.",
    detailImages: [
      { src: asset("robotic-arm.jpg"), alt: "The robotic arm holding a chess king, with the Arduino IDE open on a laptop", ratio: 1600 / 1200, fit: "contain", caption: "The finished arm holding a chess king, with the Arduino IDE open on the laptop." },
      { src: asset("robotic-arm-gripper-cad.png"), alt: "Fusion 360 model of the gripper assembly", ratio: 1103 / 610, fit: "contain", caption: "Gripper assembly modeled in Fusion 360: fingers, thumbs, base connectors, and gear linkages." },
    ],
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
