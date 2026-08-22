/**
 * ── i18n: UI Translations ─────────────────────────────
 * 
 * Central dictionary for all user-facing strings.
 * Every page and component pulls text from here.
 * 
 * To add a new language, add a key to `Languages` and
 * a matching entry in every translation object.
 */

export const languages = {
  en: 'EN',
  es: 'ES',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

/**
 * Navigation items — shared across Navbar on every page.
 * `href` is the base path; the i18n util will prefix `/es/` when needed.
 */
export const navItems = [
  { id: 'work',    href: '/work'    },
  { id: 'about',   href: '/about'   },
  { id: 'journal', href: '/journal' },
  { id: 'contact', href: '/contact' },
] as const;

export type NavItemId = (typeof navItems)[number]['id'];

/**
 * ── Translation Dictionary ────────────────────────────
 * 
 * Flat keys are preferred for simplicity and grep-ability.
 * Group by feature using dot-notation in the key name.
 */
export const ui = {
  en: {
    // ── Nav ──
    'nav.work':       'Work',
    'nav.about':      'About',
    'nav.journal':    'Journal',
    'nav.contact':    'Contact',
    'nav.resume':     'Resume',

    // ── Hero ──
    'hero.descriptor':  'Ventures · Capital Allocation · Digital Infrastructure',
    'hero.cta.work':    'View Work',
    'hero.cta.contact': 'Get in Touch',

    // ── About ──
    'about.eyebrow':   'About',
    'about.heading':   'Finance student. Operator by instinct.',
    'about.p1':        'Operating at the intersection of strategic capital allocation, market arbitrage, and scalable software infrastructure deployment.',
    'about.p2':        'My focus is on building scalable assets, optimizing unit economics, and designing high-performance commercial models to maximize free cash flow.',
    
    'about.experience.title': 'Experience & Ventures',
    'about.education.title': 'Education & Credentials',
    
    // ── Work ──
    'work.eyebrow':    'Selected Work',
    'work.heading':    'Holdings & Ventures',
    'work.cord.desc':  'SaaS',
    'work.flouvia.desc': 'Private Growth Boutique',
    'work.cta':        'Case Study',

    // ── Home Extensions ──
    'home.memos.eyebrow': 'Journal',
    'home.competencies.eyebrow': 'Core Competencies',
    'home.competencies.list': 'Capital Allocation / GTM Strategy / SaaS Infrastructure / Financial Modeling',
    'home.status.eyebrow': 'Status',
    'home.status.building': 'CURRENTLY BUILDING: Flouvia v2',
    'home.status.researching': 'CURRENTLY RESEARCHING: LatAm B2B Payment Rails',
    'home.status.reading': 'CURRENTLY READING: The Outsiders (William Thorndike)',

    // ── Journal ──
    'journal.eyebrow': 'Journal',
    'journal.heading': 'Memos & Essays',

    // ── Newsletter ──
    'newsletter.heading': 'Receive new memos.',
    'newsletter.placeholder': 'Email address',
    'newsletter.button': 'Subscribe',
    'journal.heading':  'Thoughts & Essays',

    // ── Contact ──
    'contact.eyebrow':  'Contact',
    'contact.heading':  'Let\'s connect.',
    'contact.p1':       'Whether you have a project in mind, a question, or simply want to connect — I\'m always open to conversation.',
    'contact.cta':      'Send Email',

    // ── Typeform Contact ──
    'typeform.q1': "Hi. What's your name?",
    'typeform.q1.placeholder': "Type your name...",
    'typeform.q2': "Nice to meet you, {name}. What brings you here today?",
    'typeform.q2.opt1': "Exploring a partnership / Investment",
    'typeform.q2.opt2': "Project inquiry (Flouvia / Architectures)",
    'typeform.q2.opt3': "Just networking / Saying hi",
    
    // Branch A (Partnership/Investment)
    'typeform.q3.a': "Got it. What type of capital allocation or partnership are we discussing?",
    'typeform.q3.a.opt1': "Venture Capital / Tech",
    'typeform.q3.a.opt2': "Search Fund / Private Equity",
    'typeform.q3.a.opt3': "Strategic Partnership",
    'typeform.q4.a': "Understood. Briefly, what's the thesis or scale of the operation?",
    
    // Branch B (Project/Flouvia)
    'typeform.q3.b': "Understood. What's the current scale of your operations?",
    'typeform.q3.b.opt1': "Early Stage / Pre-revenue",
    'typeform.q3.b.opt2': "Scaling ($10k - $50k MRR)",
    'typeform.q3.b.opt3': "Enterprise ($1M+ ARR)",
    'typeform.q4.b': "Got it. What's the primary bottleneck you want me to architect a solution for?",
    
    // Branch C (Networking)
    'typeform.q3.c': "Always glad to connect. What space are you currently operating in?",
    'typeform.q3.c.opt1': "Finance / Markets",
    'typeform.q3.c.opt2': "Tech / Software",
    'typeform.q3.c.opt3': "Both / Other",
    'typeform.q4.c': "Awesome. Tell me a bit more about what you're focused on right now.",
    
    'typeform.q4.placeholder': "Type your answer...",
    'typeform.q5': "Perfect. What's the best email to reach you at?",
    'typeform.q5.placeholder': "name@example.com",
    'typeform.submit': "Send message",
    'typeform.success': "Message sent. I'll get back to you soon.",
    'typeform.error': "Something went wrong. Please try again or email me directly.",
    'typeform.pressEnter': "press Enter ↵",

    // ── Footer ──
    'footer.copy': '© 2026 André Valle Ortega',
  },

  es: {
    // ── Nav ──
    'nav.work':       'Trabajo',
    'nav.about':      'Acerca',
    'nav.journal':    'Diario',
    'nav.contact':    'Contacto',
    'nav.resume':     'Currículum',

    // ── Hero ──
    'hero.descriptor':  'Ventures · Capital Allocation · Infraestructura Digital',
    'hero.cta.work':    'Ver Trabajo',
    'hero.cta.contact': 'Contacto',

    // ── About ──
    'about.eyebrow':   'Acerca',
    'about.heading':   'Estudiante de finanzas. Operador por instinto.',
    'about.p1':        'Operando en la intersección de la asignación estratégica de capital, el arbitraje de mercados y el despliegue de infraestructura digital escalable.',
    'about.p2':        'Mi enfoque está en la construcción de activos escalables, optimización de unit economics y el diseño de modelos comerciales de alto rendimiento para maximizar el flujo de caja libre.',
    
    'about.experience.title': 'Experiencia & Ventures',
    'about.education.title': 'Educación & Credenciales',

    // ── Work ──
    'work.eyebrow':    'Trabajo Selecto',
    'work.heading':    'Holdings & Ventures',
    'work.cord.desc':  'SaaS',
    'work.flouvia.desc': 'Private Growth Boutique',
    'work.cta':        'Caso de Estudio',

    // ── Home Extensions ──
    'home.memos.eyebrow': 'Diario',
    'home.competencies.eyebrow': 'Competencias Centrales',
    'home.competencies.list': 'Asignación de Capital / Estrategia GTM / Infraestructura SaaS / Modelado Financiero',
    'home.status.eyebrow': 'Status',
    'home.status.building': 'CONSTRUYENDO: Flouvia v2',
    'home.status.researching': 'INVESTIGANDO: Rieles de Pago B2B en LatAm',
    'home.status.reading': 'LEYENDO: The Outsiders (William Thorndike)',

    // ── Journal ──
    'journal.eyebrow': 'Diario',
    'journal.heading': 'Memos & Ensayos',

    // ── Newsletter ──
    'newsletter.heading': 'Recibe nuevos memos.',
    'newsletter.placeholder': 'Correo electrónico',
    'newsletter.button': 'Suscribirse',
    'journal.heading':  'Pensamientos & Ensayos',

    // ── Contact ──
    'contact.eyebrow':  'Contacto',
    'contact.heading':  'Conectemos.',
    'contact.p1':       'Ya sea que tengas un proyecto en mente, una pregunta o simplemente quieras conectar — siempre estoy abierto a la conversación.',
    'contact.cta':      'Enviar Email',

    // ── Typeform Contact ──
    'typeform.q1': "Hola. ¿Cuál es tu nombre?",
    'typeform.q1.placeholder': "Escribe tu nombre...",
    'typeform.q2': "Un gusto, {name}. ¿Qué te trae por aquí hoy?",
    'typeform.q2.opt1': "Explorar una asociación / Inversión",
    'typeform.q2.opt2': "Consulta de proyecto (Flouvia / Arquitecturas)",
    'typeform.q2.opt3': "Networking / Saludar",
    
    // Branch A
    'typeform.q3.a': "Entendido. ¿Qué tipo de asignación de capital o asociación estamos discutiendo?",
    'typeform.q3.a.opt1': "Venture Capital / Tech",
    'typeform.q3.a.opt2': "Search Fund / Private Equity",
    'typeform.q3.a.opt3': "Asociación Estratégica",
    'typeform.q4.a': "Perfecto. Brevemente, ¿cuál es la tesis o escala de la operación?",
    
    // Branch B
    'typeform.q3.b': "Entendido. ¿Cuál es la escala actual de tus operaciones?",
    'typeform.q3.b.opt1': "Early Stage / Pre-revenue",
    'typeform.q3.b.opt2': "Scaling ($10k - $50k MRR)",
    'typeform.q3.b.opt3': "Enterprise ($1M+ ARR)",
    'typeform.q4.b': "Entendido. ¿Cuál es el principal cuello de botella que quieres que resuelva?",
    
    // Branch C
    'typeform.q3.c': "Siempre es un gusto conectar. ¿En qué sector operas actualmente?",
    'typeform.q3.c.opt1': "Finanzas / Mercados",
    'typeform.q3.c.opt2': "Tech / Software",
    'typeform.q3.c.opt3': "Ambos / Otro",
    'typeform.q4.c': "Increíble. Cuéntame un poco más sobre en qué estás enfocado ahora mismo.",
    
    'typeform.q4.placeholder': "Escribe tu respuesta...",
    'typeform.q5': "Perfecto. ¿A qué correo te puedo contactar?",
    'typeform.q5.placeholder': "nombre@ejemplo.com",
    'typeform.submit': "Enviar mensaje",
    'typeform.success': "Mensaje enviado. Te responderé pronto.",
    'typeform.error': "Hubo un error. Por favor intenta de nuevo o escríbeme directamente.",
    'typeform.pressEnter': "presiona Enter ↵",

    // ── Footer ──
    'footer.copy': '© 2026 André Valle Ortega',
  },
} as const;
