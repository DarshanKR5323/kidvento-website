/**
 * KIDVENTO — MAIN INTERACTIVE LOGIC & MOTION SYSTEM
 * Brand: Kidvento | Tagline: "We Are You."
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initPillarsInteraction();
  initStatCounters();
  initEcosystemTabs();
  initUlipsuSkillMatrix();
  initProjectExhibition();
  initJourneyStepper();
  initRegionalPresence();
  initAudienceSelector();
  initContactForm();
  initModals();
  initBackToTop();
});

/* ==========================================================================
   1. STICKY HEADER & ACTIVE NAV
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy for navigation highlighting
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer .nav-link');

  if (!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      toggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   3. WHAT IS KIDVENTO — 3 INTERACTIVE PILLARS
   ========================================================================== */
const pillarData = {
  1: {
    title: "Technology That Makes Learning Relevant",
    description: "We bring real-world AI, robotics microcontrollers, IoT sensors, and block-to-Python coding directly into standard school timetables. Students don't just consume technology—they program, automate, and understand the foundational algorithms powering our world.",
    tags: ["Artificial Intelligence", "Robotics & Microcontrollers", "IoT Sensors", "Python & Algorithms"],
    image: "assets/images/ulipsu-ai-coding.jpg",
    curriculum: "NEP 2020 • Global K-12 Standards"
  },
  2: {
    title: "Learning Through Experimentation & Creation",
    description: "Through our Science Box and Tinkering Labs, learning transitions from rote memorization into tactile trial-and-error. Students cut, solder, assemble, calibrate, and build physical prototypes that solve tangible local challenges.",
    tags: ["Tinkering Labs", "Rapid Prototyping", "Science Box DIY Kits", "Failure-Tolerant Culture"],
    image: "assets/images/science-box-tinkering.jpg",
    curriculum: "GeM Certified • 600+ Innovation Labs"
  },
  3: {
    title: "Leadership, Creativity & Human Capability",
    description: "True future readiness demands empathetic problem-solving. Through Design Thinking and the Young Entrepreneur Program, learners interview stakeholders, map customer journeys, model financial sustainability, and pitch inventions to industry mentors.",
    tags: ["Design Thinking", "Entrepreneurship Pitching", "Collaboration", "Ethical Leadership"],
    image: "assets/images/entrepreneur-pitch.jpg",
    curriculum: "Global Skill-Ed Conclave • Dubai 2024"
  }
};

function initPillarsInteraction() {
  const pillarItems = document.querySelectorAll('.pillar-item');
  const headline = document.getElementById('pillar-display-headline');
  const desc = document.getElementById('pillar-display-desc');
  const img = document.getElementById('pillar-display-img');
  const tagsWrap = document.getElementById('pillar-display-tags');
  const curriculum = document.getElementById('pillar-curriculum-badge');

  if (!pillarItems.length) return;

  pillarItems.forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-pillar');
      const data = pillarData[id];
      if (!data) return;

      pillarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = data.image;
          img.style.opacity = '1';
        }, 150);
      }

      if (headline) headline.textContent = data.title;
      if (desc) desc.textContent = data.description;
      if (curriculum) curriculum.textContent = data.curriculum;

      if (tagsWrap) {
        tagsWrap.innerHTML = data.tags.map(t => `<span class="pillar-tag">${t}</span>`).join('');
      }
    });
  });
}

/* ==========================================================================
   4. STATS ANIMATED COUNTERS
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = 2000;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current).toLocaleString();
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statSection = document.getElementById('impact');
  if (statSection) observer.observe(statSection);
}

/* ==========================================================================
   5. KIDVENTO ECOSYSTEM TABS
   ========================================================================== */
function initEcosystemTabs() {
  const tabs = document.querySelectorAll('.eco-tab-btn');
  const panels = document.querySelectorAll('.ecosystem-panel');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.getAttribute('id') === `eco-${targetId}`) {
          panel.classList.add('active');
        }
      });
    });
  });
}

/* ==========================================================================
   6. ULIPSU INTERACTIVE SKILL MATRIX
   ========================================================================== */
const ulipsuSkillData = {
  ai: {
    title: "AI & Machine Learning Foundations",
    description: "Hands-on exploration of neural networks, computer vision, natural language models, and ethical AI stewardship. Students train custom image recognition models and deploy intelligent chatbots.",
    grade: "Grades 5 to 12",
    tools: "Teachable Machine, OpenCV, Python",
    outcome: "Certified AI Student Developer",
    projects: "Smart Attendance System, Autonomous Object Sorter",
    image: "assets/images/ulipsu-ai-coding.jpg"
  },
  robotics: {
    title: "Robotics & Embedded Systems",
    description: "Building autonomous rovers, sensor networks, motor telemetry, and wireless robotics control. Bridges schematic physics with real embedded C++ and block architectures.",
    grade: "Grades 3 to 12",
    tools: "Arduino, ESP32, Motor Shields, Ultrasonic Sensors",
    outcome: "Hardware & Robotics Master Certificate",
    projects: "Obstacle Avoidance Rover, Line Tracker, IoT Weather Beacon",
    image: "assets/images/hero-robotics.jpg"
  },
  design: {
    title: "Design Thinking & Human-Centered Innovation",
    description: "A structured 5-stage methodology (Empathize, Define, Ideate, Prototype, Test). Students solve real community challenges ranging from clean water filtration to elderly assistance.",
    grade: "Grades 6 to 12",
    tools: "Stakeholder Journey Maps, Figma, Rapid Cardboard/3D Prototyping",
    outcome: "Design Innovation Fellow",
    projects: "PureFlow Community Filter, Ergonomic Backpack Concept",
    image: "assets/images/entrepreneur-pitch.jpg"
  },
  coding: {
    title: "Algorithms, Web & App Development",
    description: "From visual logic syntax to production-grade Python, JavaScript, and mobile app architecture. Students build dynamic calculators, responsive websites, and data visualizers.",
    grade: "Grades 1 to 12",
    tools: "Blockly, Scratch, Python, HTML5/CSS, VS Code",
    outcome: "Certified Junior Software Architect",
    projects: "Interactive Science Simulator, Student Council Voting App",
    image: "assets/images/catalyst-classroom.jpg"
  },
  data: {
    title: "Data Science & Environmental Analytics",
    description: "Collecting sensor telemetry, analyzing patterns, and transforming raw numbers into actionable environmental charts. Teaches students how data drives modern discovery.",
    grade: "Grades 7 to 12",
    tools: "Pandas, Matplotlib, IoT Cloud, Google Sheets",
    outcome: "Data Literacy & Analytics Certification",
    projects: "School Carbon Footprint Tracker, Air Quality Heatmap",
    image: "assets/images/project-smart-agri.jpg"
  },
  entrepreneurship: {
    title: "Young Entrepreneurship & Pitching",
    description: "Transforming innovative student prototypes into viable, sustainable ventures. Students craft Lean Canvas business models, analyze unit economics, and deliver investor-grade pitches.",
    grade: "Grades 8 to 12",
    tools: "Business Model Canvas, Financial Models, Pitch Decks",
    outcome: "Youth Innovation Venture Leader",
    projects: "EcoSeed Biodegradable Pens, Rural Micro-Cold Storage Pitch",
    image: "assets/images/entrepreneur-pitch.jpg"
  }
};

function initUlipsuSkillMatrix() {
  const pills = document.querySelectorAll('.skill-pill-btn');
  const title = document.getElementById('skill-matrix-title');
  const desc = document.getElementById('skill-matrix-desc');
  const grade = document.getElementById('skill-matrix-grade');
  const tools = document.getElementById('skill-matrix-tools');
  const outcome = document.getElementById('skill-matrix-outcome');
  const projects = document.getElementById('skill-matrix-projects');
  const img = document.getElementById('skill-matrix-img');

  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const skillKey = pill.getAttribute('data-skill');
      const data = ulipsuSkillData[skillKey];
      if (!data) return;

      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.description;
      if (grade) grade.textContent = data.grade;
      if (tools) tools.textContent = data.tools;
      if (outcome) outcome.textContent = data.outcome;
      if (projects) projects.textContent = data.projects;

      if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = data.image;
          img.style.opacity = '1';
        }, 150);
      }
    });
  });
}

/* ==========================================================================
   7. STUDENT PROJECTS DIGITAL EXHIBITION & LIGHTBOX
   ========================================================================== */
const projectDetails = {
  agri: {
    title: "Automated Smart Agriculture (ASAM)",
    category: "STEM & IoT Invention",
    school: "Army Public School • Bengaluru, Karnataka",
    grade: "Grade 9 Student Team",
    image: "assets/images/project-smart-agri.jpg",
    challenge: "Farmers in dry rural regions face severe crop yield loss due to inefficient manual water scheduling and undetected soil moisture depletion.",
    solution: "Students deployed soil hygrometer probes coupled with an Arduino Uno controller and solar-powered micro-submersible pump. An OLED display provides real-time moisture telemetry, automatically triggering pulsed drip irrigation only when soil hits critical dryness thresholds.",
    impact: "Cut water consumption by 42% in experimental crop beds; demonstrated at the National STEM Fair 2024."
  },
  cv: {
    title: "AI Computer Vision Classroom Classifier",
    category: "AI & Machine Learning",
    school: "Navodaya Vidyalaya • Mysuru",
    grade: "Grade 8 Students",
    image: "assets/images/ulipsu-ai-coding.jpg",
    challenge: "Understanding how artificial intelligence identifies and classifies physical objects in real-time without expensive cloud hardware.",
    solution: "Trained an edge object detection model using OpenCV and Python on local laptops. The classifier accurately recognizes stationery, tools, and bottles with 98% accuracy and real-time bounding boxes.",
    impact: "Presented at school open house; adapted into an automated recycling bin sorter."
  },
  rover: {
    title: "Autonomous Obstacle-Navigating Rover",
    category: "Robotics & Automation",
    school: "Delhi Public School • Hyderabad",
    grade: "Grade 10 Robotics Club",
    image: "assets/images/hero-robotics.jpg",
    challenge: "Building a rugged terrain mapping rover capable of autonomous indoor navigation without GPS.",
    solution: "Equipped an aluminum dual-motor chassis with HC-SR04 ultrasonic distance sensors, servo-mounted sweep arrays, and motor driver H-bridges. Integrated wireless telemetry transmits distance graphs to a companion teacher laptop.",
    impact: "1st Place Winner at Inter-School STEM Techfest 2024."
  },
  pureflow: {
    title: "PureFlow Eco-Filter Water Purification",
    category: "Design Thinking & Sustainability",
    school: "Bharatiya Vidya Bhavan • Coimbatore",
    grade: "Grade 7 Team",
    image: "assets/images/entrepreneur-pitch.jpg",
    challenge: "High contamination levels in local open rainwater reservoirs in suburban schools.",
    solution: "Utilized the 5-stage Design Thinking process to prototype a multi-layer gravity eco-filter utilizing activated charcoal, fine silica sand, and moringa oleifera seed coagulant, enclosed in an accessible modular casing.",
    impact: "Purified 50 liters/day for school garden and handwashing stations; student team pitched at the School Innovation Showcase."
  },
  sciencebox: {
    title: "Science Box Kinetic Dynamo Generator",
    category: "Hands-on STEM Prototyping",
    school: "Government Model High School • Mandya",
    grade: "Grade 6 Students",
    image: "assets/images/science-box-tinkering.jpg",
    challenge: "Abstract textbook concepts of electromagnetic induction and gear ratios were difficult for young learners to grasp.",
    solution: "Using Kidvento Science Box modular components, students assembled high-torque gear trains connected to a DC dynamo and solar cell, illuminating multi-colored LED arrays and powering mechanical fans.",
    impact: "100% of students scored above 85% on following conceptual physics assessments."
  },
  catalystlab: {
    title: "Interactive Classroom Circuit Discovery",
    category: "Catalyst Curriculum Solutions",
    school: "Kendriya Vidyalaya • Bengaluru",
    grade: "Grade 4 & 5 Learners",
    image: "assets/images/catalyst-classroom.jpg",
    challenge: "Bridging textbook diagrams with safe, tactile electricity experiments for elementary grades.",
    solution: "Catalyst structured lesson packs provided each student team with tactile breadboards, low-voltage battery packs, switches, and conductive ink journals. Teachers facilitated guided discovery with interactive digital rubrics.",
    impact: "Adopted across all 6 sections; classroom engagement index rose by 94%."
  }
};

function initProjectExhibition() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 200);
        }
      });
    });
  });

  // Modal open on project card click
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project-id');
      const data = projectDetails[id];
      if (!data) return;

      openProjectModal(data);
    });
  });
}

function openProjectModal(data) {
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('project-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="aspect-ratio: 16/9; overflow: hidden; border-radius: var(--kv-radius-lg); margin-bottom: 1.5rem; background: var(--kv-dark-surface);">
      <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.75rem;">
      <span class="eyebrow" style="margin-bottom: 0;">${data.category}</span>
      <span style="font-size: 0.8125rem; font-weight: 700; color: var(--kv-text-muted);">${data.grade}</span>
    </div>
    <h3 style="font-size: 1.75rem; font-weight: 850; color: var(--kv-text-headline-dark); margin-bottom: 0.25rem;">${data.title}</h3>
    <p style="font-size: 0.875rem; color: var(--kv-text-muted); margin-bottom: 1.5rem;">📍 ${data.school}</p>

    <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2rem;">
      <div style="background: var(--kv-bg-canvas); padding: 1.25rem; border-radius: var(--kv-radius-md); border-left: 3px solid #CBD5E1;">
        <h4 style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--kv-text-muted); margin-bottom: 0.25rem;">The Challenge</h4>
        <p style="font-size: 0.9375rem; color: var(--kv-text-secondary); line-height: 1.5;">${data.challenge}</p>
      </div>

      <div style="background: var(--kv-bg-canvas); padding: 1.25rem; border-radius: var(--kv-radius-md); border-left: 3px solid var(--kv-brand-red);">
        <h4 style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--kv-brand-red); margin-bottom: 0.25rem;">The Student Prototype</h4>
        <p style="font-size: 0.9375rem; color: var(--kv-text-secondary); line-height: 1.5;">${data.solution}</p>
      </div>

      <div style="background: var(--kv-brand-blush); padding: 1.25rem; border-radius: var(--kv-radius-md); border-left: 3px solid var(--kv-brand-red);">
        <h4 style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--kv-brand-red); margin-bottom: 0.25rem;">Verified Outcome</h4>
        <p style="font-size: 0.9375rem; color: #7E0002; font-weight: 600; line-height: 1.5;">${data.impact}</p>
      </div>
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 1rem;">
      <button class="btn btn-outline-red btn-sm" onclick="closeAllModals()">Close Exhibition</button>
      <a href="#contact" class="btn btn-primary btn-sm" onclick="closeAllModals(); openConsultationFor('Student Projects in Your School');">Replicate This in Your School →</a>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   SHOWREEL VIDEO MODAL
   ========================================================================== */
window.openShowreelModal = function() {
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('project-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="aspect-ratio: 16/9; border-radius: var(--kv-radius-lg); overflow: hidden; position: relative; background: #0F172A; margin-bottom: 1.5rem;">
      <img src="assets/images/hero-robotics.jpg" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85;" alt="Kidvento Classroom Showreel">
      <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.4); text-align: center; padding: 2rem;">
        <div style="width: 72px; height: 72px; border-radius: 50%; background: var(--kv-brand-red); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; box-shadow: 0 10px 30px rgba(197, 3, 6, 0.6);">
          <span style="width: 0; height: 0; border-top: 12px solid transparent; border-bottom: 12px solid transparent; border-left: 20px solid #FFFFFF; margin-left: 4px;"></span>
        </div>
        <h3 style="color: #FFFFFF; font-size: 1.5rem; font-weight: 850; margin-bottom: 0.25rem;">Kidvento Innovation Showreel (02:14)</h3>
        <p style="color: #E2E8F0; font-size: 0.9375rem; max-width: 480px;">A glimpse into 600+ Tinkering Labs across 850+ partner schools—experiential learning in action.</p>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 0.8125rem; font-weight: 700; color: var(--kv-text-muted);">🎥 Featuring authentic students and educators across India &amp; UAE</span>
      <button class="btn btn-primary btn-sm" onclick="closeAllModals()">Close Showreel</button>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

/* ==========================================================================
   8. STUDENT JOURNEY (6 PROGRESSIVE STAGES)
   ========================================================================== */
const journeyStages = {
  1: {
    stage: "Stage 01 — Sparking Wonder",
    title: "Explore: Unpacking the Physical World",
    text: "Students encounter real scientific phenomena not as intimidating mathematical formulas, but through tactile curiosities: magnetic levitation, gear gearboxes, conductive liquids, and visual logic puzzles.",
    skills: ["Natural Curiosity", "Sensory Engagement", "Safe Laboratory Practice", "Observation Journals"],
    image: "assets/images/science-box-tinkering.jpg"
  },
  2: {
    stage: "Stage 02 — Conceptual Scaffolding",
    title: "Learn: Structured Foundations in AI & Code",
    text: "Guided by Catalyst curriculum workbooks and certified master educators, students master foundational algorithmic logic, circuit schematics, Ohm's law, and sensor physics step-by-step.",
    skills: ["Block-to-Text Syntax", "Electronic Circuitry", "Computational Thinking", "Vocabulary Mastery"],
    image: "assets/images/catalyst-classroom.jpg"
  },
  3: {
    stage: "Stage 03 — Maker Competency",
    title: "Build: Hands-on Hardware & Software Assembly",
    text: "Learners sit together at lab benches to solder breadboard leads, assemble stepper motor brackets, program microcontroller ports, and debug syntax exceptions in real-time.",
    skills: ["Breadboard Prototyping", "Motor Telemetry", "Embedded C++ / Python", "Collaborative Assembly"],
    image: "assets/images/hero-robotics.jpg"
  },
  4: {
    stage: "Stage 04 — Failure-Tolerant Inquiry",
    title: "Experiment: Calibrating & Troubleshooting",
    text: "When a sensor gives erratic readings or a robot drifts off-track, failure is reframed as valuable telemetry. Students methodically isolate code variables and mechanical frictions.",
    skills: ["Methodical Debugging", "Empirical Testing", "Tolerance for Ambiguity", "Iterative Calibration"],
    image: "assets/images/ulipsu-ai-coding.jpg"
  },
  5: {
    stage: "Stage 05 — Purposeful Invention",
    title: "Create: Original Solutions for Real Needs",
    text: "Students transition from guided kit exercises to autonomous team inventions addressing clean water, energy conservation, smart farming, and community accessibility.",
    skills: ["Design Thinking", "Rapid Prototyping", "Community Field Research", "User Empathy"],
    image: "assets/images/project-smart-agri.jpg"
  },
  6: {
    stage: "Stage 06 — Global Confidence",
    title: "Lead: Pitching & International Exhibitions",
    text: "Learners present functional prototypes to academic juries, parent conclaves, and international forums like the Global Skill-Ed Conclave Dubai, earning globally accredited certificates.",
    skills: ["Public Pitching", "Lean Business Modeling", "Youth Mentorship", "International Credentialing"],
    image: "assets/images/entrepreneur-pitch.jpg"
  }
};

function initJourneyStepper() {
  const steps = document.querySelectorAll('.journey-step-btn');
  const stageTag = document.getElementById('journey-stage-tag');
  const heading = document.getElementById('journey-display-heading');
  const text = document.getElementById('journey-display-text');
  const skillsWrap = document.getElementById('journey-skills-wrap');
  const img = document.getElementById('journey-display-img');

  if (!steps.length) return;

  steps.forEach(step => {
    step.addEventListener('click', () => {
      const id = step.getAttribute('data-step');
      const data = journeyStages[id];
      if (!data) return;

      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      if (stageTag) stageTag.textContent = data.stage;
      if (heading) heading.textContent = data.title;
      if (text) text.textContent = data.text;

      if (skillsWrap) {
        skillsWrap.innerHTML = data.skills.map(s => `<span class="journey-skill-chip">${s}</span>`).join('');
      }

      if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = data.image;
          img.style.opacity = '1';
        }, 150);
      }
    });
  });
}

/* ==========================================================================
   9. SCHOOL PARTNERS REGIONAL PRESENCE
   ========================================================================== */
const regionData = {
  karnataka: {
    title: "Karnataka & Southern Hub",
    description: "Home to Kidvento's headquarters in Bengaluru and Mysuru. Partnered with over 350 urban private institutions and rural district model schools.",
    schools: ["Kendriya Vidyalaya Hubballi", "Mysore Public School", "BGS International Bengaluru", "Navodaya Vidyalaya Mysuru", "Army Public School ASC"],
    impact: "185,000+ Students Impacted • 240+ Active Tinkering Labs"
  },
  delhi: {
    title: "Delhi-NCR & North India",
    description: "Extensive deployment of NEP-aligned Catalyst curricula and high-tech STEM tinkering packages across top CBSE and ICSE institutions.",
    schools: ["Delhi Public School Network", "Apeejay Education", "Modern School Barakhamba Associates", "Ryan International", "DAV Centenary Public"],
    impact: "120,000+ Students Impacted • 150+ Partner Campuses"
  },
  ap: {
    title: "Andhra Pradesh & Telangana",
    description: "Large-scale government and private school integration of hands-on Science Box kits and interactive coding curricula.",
    schools: ["Hyderabad International Academy", "Tirupati Model School", "Sri Chaitanya Associated Wings", "Vijayawada STEM High"],
    impact: "95,000+ Students Impacted • 110+ Robotics Labs"
  },
  northeast: {
    title: "Northeast India (Nagaland & Beyond)",
    description: "Pioneering technology access in remote northeastern regions, establishing government-accredited innovation spaces under GeM frameworks.",
    schools: ["Nagaland State Model Tinkering Centers", "Don Bosco Kohima", "Shillong Innovation Academy"],
    impact: "30,000+ Students Impacted • 45+ Specialized Labs"
  },
  uae: {
    title: "Middle East (Dubai Regional Office)",
    description: "Falcon House, Dubai Investment Park. Kidvento coordinates international student showcases, masterclasses, and the annual Global Skill-Ed Conclave.",
    schools: ["GEMS Education Partner Networks", "Dubai Modern High School Affiliates", "Sharjah Indian School"],
    impact: "70,000+ Global Learners Connected • Annual International Summit"
  }
};

function initRegionalPresence() {
  const regionBtns = document.querySelectorAll('.region-btn');
  const title = document.getElementById('region-card-title');
  const desc = document.getElementById('region-card-desc');
  const impact = document.getElementById('region-card-impact');
  const tagsWrap = document.getElementById('region-card-schools');

  if (!regionBtns.length) return;

  regionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-region');
      const data = regionData[key];
      if (!data) return;

      regionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.description;
      if (impact) impact.textContent = data.impact;

      if (tagsWrap) {
        tagsWrap.innerHTML = data.schools.map(s => `<span class="region-school-chip">🏫 ${s}</span>`).join('');
      }
    });
  });
}

/* ==========================================================================
   10. AUDIENCE SELECTOR ("WHAT BRINGS YOU HERE?")
   ========================================================================== */
const audienceData = {
  school: {
    title: "Empowering Your School with Turnkey Future Skills",
    description: "Kidvento partners with your administration to transform standard classrooms into vibrant, NEP 2020-compliant innovation hubs without curriculum disruption.",
    features: [
      "Complete GeM-Registered Tinkering & STEM Packages (Packages 1 to 4)",
      "NEP-Aligned Illustrated Textbooks, Workbooks & Lesson Rubrics (Catalyst)",
      "Continuous On-Site & Online Teacher Professional Development (CPD)",
      "Comprehensive Annual Maintenance, Kit Replenishment & On-Field Support"
    ],
    sideBoxTitle: "School Implementation Consultation",
    sideBoxDesc: "Request a custom curriculum mapping and lab blueprint tailored for your school's infrastructure.",
    ctaText: "Book School Leadership Consultation →",
    interestTopic: "School Partnership & Tinkering Labs"
  },
  parent: {
    title: "Igniting Your Child's True Creative Potential",
    description: "Watch your child transition from passive screen time to active engineering, programming, and real-world invention with international certifications.",
    features: [
      "Gamified Skill Dashboards & Live Milestone Tracking (Ulipsu)",
      "International Certifications Aligned with US, UK & Singapore Standards",
      "Hands-on Science Box DIY Kits for Home and Classroom Exploration",
      "Mentorship from First-Generation Technologists & Innovators"
    ],
    sideBoxTitle: "Parental Skill Discovery",
    sideBoxDesc: "Explore our age-appropriate student portfolios and see how your learner builds future-ready confidence.",
    ctaText: "Explore Student Programs →",
    interestTopic: "Ulipsu Skill Portfolio for Learners"
  },
  educator: {
    title: "Equipping Teachers with World-Class Pedagogy",
    description: "We believe teachers are the true catalysts of education. Kidvento provides deep pedagogical scaffolding, certified training, and effortless lesson planning.",
    features: [
      "Structured Day-by-Day Lesson Plans & Interactive Smartboard Media",
      "Formative & Summative Scientific Progress Rubrics",
      "Teacher Training Workshops with Official Kidvento Certification",
      "Direct Access to Academic Mentors & Dedicated Customer Success Managers"
    ],
    sideBoxTitle: "Educator Upskilling Cohort",
    sideBoxDesc: "Join 4,500+ certified Ventonian educators mastering 21st-century STEM facilitation.",
    ctaText: "Join Teacher Certification Program →",
    interestTopic: "Teacher CPD & Catalyst Resources"
  }
};

function initAudienceSelector() {
  const cards = document.querySelectorAll('.audience-card-btn');
  const title = document.getElementById('aud-title');
  const desc = document.getElementById('aud-desc');
  const list = document.getElementById('aud-list');
  const sideTitle = document.getElementById('aud-side-title');
  const sideDesc = document.getElementById('aud-side-desc');
  const cta = document.getElementById('aud-cta');

  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-audience');
      const data = audienceData[type];
      if (!data) return;

      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.description;
      if (sideTitle) sideTitle.textContent = data.sideBoxTitle;
      if (sideDesc) sideDesc.textContent = data.sideBoxDesc;

      if (list) {
        list.innerHTML = data.features.map(f => `
          <div class="audience-feature-row">
            <span class="audience-feature-bullet"></span>
            <span>${f}</span>
          </div>
        `).join('');
      }

      if (cta) {
        cta.textContent = data.ctaText;
        cta.onclick = () => {
          openConsultationFor(data.interestTopic);
        };
      }
    });
  });
}

/* ==========================================================================
   11. CONTACT FORM WITH VALIDATION & FEEDBACK
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('kidvento-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const org = form.querySelector('[name="org"]').value.trim();
    const interest = form.querySelector('[name="interest"]').value;

    if (!name || !email || !phone) {
      showToast('⚠️ Please fill in all required fields (Name, Email, Phone).');
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Connecting with Academic Team...';

    setTimeout(() => {
      btn.innerHTML = '✓ Enquiry Submitted Successfully!';
      btn.style.backgroundColor = '#16A34A';
      showToast(`🎉 Thank you, ${name}! A Kidvento Senior Academic Advisor will reach out to ${email} within 24 hours.`);
      form.reset();

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
      }, 5000);
    }, 1200);
  });
}

/* ==========================================================================
   12. MODALS & CONSULTATION ENGINE
   ========================================================================== */
function initModals() {
  const overlay = document.querySelector('.modal-overlay');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

function closeAllModals() {
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}

window.closeAllModals = closeAllModals;

window.openShowreelModal = function() {
  const modal = document.getElementById('showreel-modal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.openConsultationFor = function(topic) {
  const interestSelect = document.getElementById('contact-interest');
  if (interestSelect) {
    for (let i = 0; i < interestSelect.options.length; i++) {
      if (interestSelect.options[i].text.toLowerCase().includes(topic.toLowerCase())) {
        interestSelect.selectedIndex = i;
        break;
      }
    }
  }

  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    const nameInput = contactSection.querySelector('input[name="name"]');
    if (nameInput) setTimeout(() => nameInput.focus(), 600);
  }
};

/* ==========================================================================
   13. TOAST NOTIFICATION & BACK TO TOP
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

function initBackToTop() {
  const backBtn = document.querySelector('.back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
