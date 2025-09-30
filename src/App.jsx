import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ChevronDown,
  Code,
  Briefcase,
  Award,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const sections = {
    home: useRef(null),
    about: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    contact: useRef(null)
  };

  useEffect(() => {
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);

      const order = ['home', 'about', 'experience', 'projects', 'contact'];
      for (let id of order) {
        const el = sections[id].current;
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.35 && rect.bottom > window.innerHeight * 0.25) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const navigate = (id) => {
    setMenuOpen(false);
    sections[id].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const social = [
    { Icon: Github, link: 'https://github.com/arjun11120' },
    { Icon: Linkedin, link: 'https://linkedin.com/in/arjun-krishnakumar11120' },
    { Icon: Mail, link: 'mailto:arjunarjun2159@gmail.com' },
    { Icon: Phone, link: 'tel:+917593911819' }
  ];

  const skills = [
    { name: 'React', pct: 95 },
    { name: 'JavaScript', pct: 90 },
    { name: 'Python', pct: 85 },
    { name: 'Next.js', pct: 80 },
    { name: 'Redux/RTK', pct: 88 },
    { name: 'TypeScript', pct: 75 }
  ];

  const experiences = [
    {
      title: 'Software Engineer',
      company: 'Innovature Software Labs',
      location: 'Kochi',
      period: 'Aug 2024 - Present',
      points: [
        'Built full-stack features using React and Flask',
        'Improved data pipeline using AWS Glue and ETL best practices',
        'Reduced page load by 35% through optimisation'
      ]
    },
    {
      title: 'Associate Software Engineer',
      company: 'Techversant Infotech',
      location: 'Thiruvananthapuram',
      period: 'Jun 2022 - Jul 2024',
      points: [
        'Implemented reusable React components and design system',
        'Led R&D for performance and accessibility improvements',
        'Maintained critical modules and bug fixes'
      ]
    }
  ];

  const projects = [
    {
      title: 'Big Data Analysis Platform',
      period: '2024 – 2025',
      desc: 'End-to-end data management and analytics platform with real-time dashboards.',
      tech: ['React', 'Flask', 'MySQL', 'AWS Glue', 'React Flow', 'React Context', 'echart'],
      highlights: ['Data sanitization', 'Real-time analytics', 'Interactive visualizations']
    },
    {
      title: 'Compliance & Learning Management',
      period: '2022 – 2024',
      desc: 'Cloud-based EHS and learning platform for training and incident tracking.',
      tech: ['React', 'npm', 'PNPM', 'Redux', 'RTK', 'Google Address API', 'Rechart'],
      highlights: ['Dynamic forms', 'LMS features', 'Digital inspection tools']
    },
    {
      title: 'Distribution & Streaming Platform',
      period: '2025 – Present',
      desc: 'Backend platform to deliver music to major digital stores such as Apple Music, Spotify, LINE MUSIC, etc. Handles ingestion of audio files and metadata and orchestrates delivery.',
      tech: ['Python (Flask)', 'AWS (Lambda, S3, Step Functions)', 'MySQL', 'REST APIs'],
      highlights: ['Automated ingestion and validation of music files & metadata',
      'Integrated with multiple DSPs (Apple Music, Spotify, LINE MUSIC)',
      'Scalable architecture using AWS services']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-800 antialiased">

      {/* Global small styles */}
      <style>{`
        .no-select { user-select: none; }
        .cursor-none * { cursor: none !important; }
      `}</style>

      {/* Custom Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{ left: 0, top: 0 }}
        animate={{ x: cursor.x - 12, y: cursor.y - 12, scale: hovering ? 1.7 : 1 }}
        transition={{ type: 'spring', stiffness: 800, damping: 40 }}
      >
        <div className="w-6 h-6 rounded-full border-2 border-cyan-500/80 flex items-center justify-center bg-transparent">
          <div className="w-2 h-2 rounded-full bg-cyan-500/90" />
        </div>
      </motion.div>

      {/* Bloob trailing */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        animate={{ x: cursor.x - 80, y: cursor.y - 60, opacity: hovering ? 0.15 : 0.06 }}
        transition={{ ease: 'easeOut', duration: 0.4 }}
      >
        <div style={{ width: 160, height: 90, borderRadius: 90 }} className="bg-gradient-to-r from-cyan-400/20 via-blue-400/10 to-violet-400/10 blur-2xl" />
      </motion.div>

      {/* NAV */}
      <header className={`fixed w-full z-40 transition-all ${scrollY > 30 ? 'backdrop-blur-md bg-white/60 py-3 shadow-lg' : 'py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">AK</div>
            <div className="hidden md:flex gap-6 items-center">
              {['home', 'about', 'experience', 'projects', 'contact'].map((k) => (
                <button
                  key={k}
                  onClick={() => navigate(k)}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  className={`capitalize text-sm font-medium ${active === k ? 'text-cyan-500' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex gap-3">
              {social.map(({ Icon, link }, i) => (
                <a
                  href={link}
                  key={i}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  className="w-10 h-10 rounded-full grid place-items-center bg-white/50 shadow hover:scale-105 transition-transform"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <button
              className="md:hidden p-2 rounded-md bg-white/50 shadow"
              onClick={() => setMenuOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden mt-2"
            >
              <div className="max-w-6xl mx-auto px-6 py-4 bg-white/60 shadow rounded-b-lg">
                {['home', 'about', 'experience', 'projects', 'contact'].map(k => (
                  <button key={k} onClick={() => navigate(k)} className="block w-full text-left py-3 border-b border-gray-200 text-gray-700">{k}</button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-24">
        {/* HERO */}
        <section ref={sections.home} id="home" className="min-h-[80vh] flex items-center">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400"
              >
                Arjun Krishnakumar
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-4 text-xl text-gray-700">
                Software Engineer — building fast, accessible, and delightful web experiences using React & Python.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-8 flex flex-wrap gap-4">
                <button onClick={() => navigate('projects')} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 text-white shadow-lg font-semibold hover:scale-105 transition-transform">
                  Explore Projects
                </button>

                <a href="mailto:arjunarjun2159@gmail.com" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className="px-6 py-3 rounded-full border border-gray-300 bg-white/50 flex items-center gap-3 hover:scale-105 transition-transform">
                  <Mail size={16} /> <span>Email Me</span>
                </a>
              </motion.div>
            </div>

            {/* HERO CARD */}
            <div className="relative">
              <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.25 }} className="p-6 rounded-2xl bg-white/60 backdrop-blur-md shadow-lg border border-gray-200">
                <div className="h-64 md:h-80 flex flex-col justify-center items-start">
                  <div className="text-sm text-cyan-500 mb-2">FEATURED</div>
                  <h3 className="text-2xl font-bold text-gray-800">Big Data Analysis Platform</h3>
                  <p className="text-gray-700 mt-2">End-to-end data solution with real-time analytics and clean ETL pipelines.</p>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-200">React</span>
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-200">Python</span>
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-200">AWS Glue</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section ref={sections.about} id="about" className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">About Me</motion.h2>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }} className="mt-8 grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2 text-gray-700 leading-relaxed">
                <p>
                  I am an Software Engineer with 3+ years of experience building robust, accessible, and performant web applications. I enjoy translating user needs into beautiful interfaces and clean architecture.
                </p>
                <p className="mt-4">
                  My focus areas include React, modern front-end tooling, and backend services with Python. I like working closely with product and design teams to ship features that matter.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {skills.map((s, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm text-gray-700"><span>{s.name}</span><span className="text-cyan-500">{s.pct}%</span></div>
                      <div className="mt-2 h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all" style={{ width: `${s.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/60 backdrop-blur-md shadow border border-gray-200">
                  <div className="text-sm text-cyan-500">ROLE</div>
                  <div className="text-lg font-semibold">Software Engineer</div>
                  <div className="text-sm text-gray-600 mt-1">Kochi, India</div>
                </div>

                <div className="p-4 rounded-xl bg-white/60 backdrop-blur-md shadow border border-gray-200">
                  <div className="text-sm text-cyan-500">AVAILABILITY</div>
                  <div className="text-lg font-semibold">Open to opportunities</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section ref={sections.experience} id="experience" className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Experience</h2>
            <div className="mt-10 space-y-6">
              {experiences.map((e,i)=>(
                <motion.div key={i} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="p-6 rounded-xl bg-white/60 backdrop-blur-md shadow border border-gray-200">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="text-xl font-semibold text-cyan-500">{e.title}</div>
                      <div className="text-sm text-gray-700">{e.company} • {e.location}</div>
                    </div>
                    <div className="text-sm text-gray-500">{e.period}</div>
                  </div>
                  <ul className="mt-4 list-inside list-disc text-gray-700 space-y-1">
                    {e.points.map((p,j)=><li key={j}>{p}</li>)}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section ref={sections.projects} id="projects">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Projects</h2>
            <div className="mt-10 grid md:grid-cols-2 gap-8">
              {projects.map((p,i)=>(
                <motion.div key={i} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="p-6 rounded-2xl bg-white/60 backdrop-blur-md shadow border border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-semibold text-cyan-500">{p.title}</div>
                    <div className="text-sm text-gray-500">{p.period}</div>
                  </div>
                  <p className="mt-2 text-gray-700">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t,j)=><span key={j} className="text-xs px-3 py-1 rounded-full bg-gray-200">{t}</span>)}
                  </div>
                  <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1">
                    {p.highlights.map((h,j)=><li key={j}>{h}</li>)}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section ref={sections.contact} id="contact" className="py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Contact Me</h2>
            <p className="mt-4 text-gray-700">Feel free to reach out via email, phone, or connect on social platforms.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {social.map(({Icon,link},i)=>(
                <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full grid place-items-center bg-white/50 shadow hover:scale-105 transition-transform">
                  <Icon size={18}/>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-white/50 shadow-inner">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-600">© 2025 Arjun Krishnakumar — Built with ⚛️</div>
      </footer>
    </div>
  );
}
