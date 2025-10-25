import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TypeAnimation } from 'react-type-animation';
import AnimatedBackground from "@/components/AnimatedBackground";

const sections = [
  {
    title: "About",
    path: "/about",
    description: "Learn more about my background in Electrical Engineering and my passion for innovation.",
    image: "/ee-portfolio/headshot_Carrazco.JPEG",
  },
  {
    title: "Projects",
    path: "/projects",
    description: "Explore my portfolio of electrical engineering projects, from power systems to IoT solutions.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Resume",
    path: "/resume",
    description: "View my professional experience, education, and technical skills.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Contact",
    path: "/contact",
    description: "Get in touch with me for collaborations or opportunities.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
  },
];

const Home = () => {
  const refs = sections.map(() => useRef(null));
  const inViews = refs.map(ref => useInView(ref, { 
    once: true,
    margin: "-100px 0px"
  }));


  return (
    <div className="min-h-screen bg-white">
      <div className="h-[45vh] relative bg-slate-900">
        <AnimatedBackground />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center space-y-2">
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <TypeAnimation
                  sequence={[
                    '',
                    1500,
                    'Hello my name is Ruben Carrazco',
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
                <TypeAnimation
                  sequence={[
                    3500,
                    'Welcome to my Engineering Portfolio',
                    2000,
                  ]}
                  wrapper="div"
                  speed={50}
                  className="banner-text"
                  style={{
                    fontSize: '1.875rem', // 30px - same as top line
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
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              ref={refs[index]}
              initial={{ x: -100, opacity: 0 }}
              animate={inViews[index] ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={section.path}
                className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center p-4">
                  <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={section.image}
                      alt={section.title}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        section.title === "About" 
                          ? "object-top scale-110" 
                          : ""
                      }`}
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-medium mb-2 text-gray-900 group-hover:text-primary transition-colors">
                      {section.title}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {section.description}
                    </p>
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
