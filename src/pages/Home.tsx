import { Link } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';

const sections = [
  {
    title: "About",
    path: "/about",
    description: "Learn more about my background in Electrical Engineering and my passion for innovation.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a6a2a5aee158",
  },
  {
    title: "Projects",
    path: "/projects",
    description: "Explore my portfolio of electrical engineering projects, from power systems to IoT solutions.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
  {
    title: "Resume",
    path: "/resume",
    description: "View my professional experience, education, and technical skills.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
  {
    title: "Contact",
    path: "/contact",
    description: "Get in touch with me for collaborations or opportunities.",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="h-[60vh] relative">
        <img
          src="/ee-portfolio/pcbbanner.jpg"
          alt="PCB Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <TypeAnimation
            sequence={[
              'Welcome to my Engineering Portfolio',
              1000,
            ]}
            wrapper="h1"
            speed={50}
            className="text-6xl font-bold text-white font-sfpro text-center"
            repeat={0}
          />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-24">
          {sections.map((section) => (
            <Link 
              key={section.title}
              to={section.path}
              className="group block"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="h-64 overflow-hidden rounded-lg">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-medium mb-4 group-hover:text-gray-600 transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
