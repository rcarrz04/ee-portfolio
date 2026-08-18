import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const Home = () => {
  const projectsRef = useRef(null);
  const projectsInView = useInView(projectsRef, { once: true, margin: "-80px 0px" });

  return (
    <div className="min-h-screen bg-paper">
      {/* Hero */}
      <section className="grid-paper pt-32 pb-20 border-b border-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-start">
            <motion.div {...fadeUp} transition={{ duration: 0.5, ease: "easeOut" }}>
              <p className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
                § Home
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink leading-[1.1] mb-5 max-w-xl">
                {profile.name}
              </h1>
              <p className="text-lg text-graphite leading-relaxed max-w-md mb-8">
                {profile.tagline}
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 bg-ink text-paper font-mono text-xs uppercase tracking-wide px-5 py-3 rounded hover:bg-signal transition-colors"
                >
                  View Work <ArrowRight size={14} />
                </Link>
                <Link
                  to="/resume"
                  className="font-mono text-xs uppercase tracking-wide text-graphite border-b border-line hover:text-ink hover:border-ink pb-0.5 transition-colors"
                >
                  Résumé
                </Link>
              </div>
            </motion.div>

            {/* Title block — engineering-drawing revision block */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              className="w-full md:w-64 border border-line rounded-lg overflow-hidden font-mono text-xs bg-paper/80 backdrop-blur-sm"
            >
              <div className="w-full h-40 overflow-hidden border-b border-line">
                <img
                  src="/ee-portfolio/headshot_Carrazco.JPEG"
                  alt={profile.name}
                  className="w-full h-full object-cover object-[center_25%] grayscale-[20%]"
                />
              </div>
              {[
                ["NAME", profile.name],
                ["ROLE", "EE, Hardware + Software"],
                ["LOC", profile.location],
                ["REV", "2026.08"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-3 py-2 border-t border-line first:border-t-0"
                >
                  <span className="text-graphite">{label}</span>
                  <span className="text-ink text-right">{value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section ref={projectsRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
          § Projects
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-medium text-ink mb-12">
          Featured work
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
