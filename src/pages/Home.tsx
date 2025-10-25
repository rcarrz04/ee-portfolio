import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TypeAnimation } from 'react-type-animation';
import AnimatedBackground from "@/components/AnimatedBackground";

const projects = [
  {
    id: "power-electronics-lab",
    title: "Power Electronics Lab",
    image: "/ee-portfolio/headshot_Carrazco.JPEG",
    skills: ["DC-DC Converters", "MOSFET Design", "LTspice"],
  },
  {
    id: "microcontroller-project",
    title: "Microcontroller Project",
    image: "/ee-portfolio/headshot_Carrazco.JPEG",
    skills: ["Arduino", "C Programming", "Sensors"],
  },
  {
    id: "circuit-analysis",
    title: "Circuit Analysis",
    image: "/ee-portfolio/headshot_Carrazco.JPEG",
    skills: ["AC/DC Analysis", "MATLAB", "Simulink"],
  },
  {
    id: "digital-signal-processing",
    title: "Digital Signal Processing",
    image: "/ee-portfolio/headshot_Carrazco.JPEG",
    skills: ["Filter Design", "FFT", "Python"],
  },
  {
    id: "control-systems",
    title: "Control Systems",
    image: "/ee-portfolio/headshot_Carrazco.JPEG",
    skills: ["PID Control", "State Space", "MATLAB"],
  },
  {
    id: "embedded-systems",
    title: "Embedded Systems",
    image: "/ee-portfolio/headshot_Carrazco.JPEG",
    skills: ["ARM Cortex", "RTOS", "Debugging"],
  },
];

const Home = () => {
  const refs = projects.map(() => useRef(null));
  const inViews = refs.map(ref => useInView(ref, { 
    once: true,
    margin: "-100px 0px"
  }));


  return (
    <div className="min-h-screen bg-white">
      <div className="h-[45vh] relative bg-slate-900 pt-16">
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center space-y-2">
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <TypeAnimation
                  sequence={[
                    '',
                    1500,
                    'Welcome to my Engineering Portfolio',
                    2000,
                  ]}
                  wrapper="div"
                  speed={50}
                  className="banner-text"
                  style={{
                    fontSize: '1.875rem', // 30px
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: 'SF Pro Display, system-ui, sans-serif',
                    lineHeight: '1.2'
                  }}
                  repeat={0}
                  cursor={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium mb-4">Featured Projects</h1>
          <p className="text-lg text-gray-600">Explore my electrical engineering portfolio</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              ref={refs[index]}
              initial={{ y: 50, opacity: 0 }}
              animate={inViews[index] ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={`/projects/${project.id}`} 
                className="group hover:scale-105 transition-transform duration-200 block"
              >
                <div className="flex flex-col items-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-gray-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-center mb-2 group-hover:text-gray-600">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {project.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
