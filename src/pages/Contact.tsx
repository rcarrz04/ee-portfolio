import { Mail, Linkedin, Github } from "lucide-react";
import { profile } from "@/data/profile";

const contactLinks = [
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
  { icon: Linkedin, label: "LinkedIn Profile", href: profile.linkedin },
  { icon: Github, label: "GitHub Profile", href: profile.github },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-paper pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">§ Contact</p>
        <h1 className="font-display text-3xl sm:text-4xl font-medium text-ink mb-12">Get in touch</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-5">
            {contactLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-graphite hover:text-signal transition-colors group"
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="border-b border-transparent group-hover:border-signal">{label}</span>
              </a>
            ))}
          </div>

          <div className="md:col-span-2">
            <div className="w-48 border border-line rounded-lg overflow-hidden -rotate-2 shadow-sm">
              <img src="/ee-portfolio/skydiving.jpg" alt="Skydiving" className="w-full h-56 object-cover" />
              <p className="font-mono text-[10px] text-graphite px-2 py-1.5 border-t border-line">
                off the clock
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
