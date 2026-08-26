/*
 * Innovation Archive direction: editorial Arabic RTL portfolio with ink navy, warm paper,
 * road-copper accents, evidence-first copy, asymmetric sections, and restrained reveal motion.
 */
import { useEffect, useMemo, useState } from "react";
import { resumeFiles } from "@/lib/resume-files";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  CarFront,
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  FileCheck2,
  FileText,
  FolderOpen,
  Globe2,
  GraduationCap,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  MapPinned,
  Menu,
  Newspaper,
  PenTool,
  Route,
  ShieldCheck,
  Sparkles,
  Tractor,
  X,
  Youtube,
} from "lucide-react";

type Language = "ar" | "en";
type ProjectFilter = "all" | "islamic" | "languages" | "sports" | "community" | "tools" | "innovation";

const assets = {
  portrait: "/manus-storage/emad-portrait_ef332295.jpg",
  patent: "/manus-storage/emad-patent_29564aa5.jpg",
  hero: "/manus-storage/emad-hero-archive_8837c7af.jpg",
  fleet: "/manus-storage/emad-fleet-editorial_edf245e7.jpg",
  digital: "/manus-storage/emad-digital-atelier_43b0b31a.jpg",
  mark: "/manus-storage/emad-mark-symbol_da02099d.png",
  coursesAwards: "/manus-storage/courses-awards_6aaf590d.pdf",
  balatatEmblem: "/manus-storage/balatat-emblem_1b0fbbb4.jpeg",
  balatatOfficial: "/manus-storage/balatat-official-document_1b6cd1f8.pdf",
  balatatRules: "/manus-storage/balatat-rules_bf6e7ffe.pdf",
  identityIcon: "/manus-storage/emad-identity-icon_8e247d60.jpg",
  bookMiracles: "/manus-storage/book-miracles-prophet_3ac8fef2.png",
  bookMultiplication: "/manus-storage/book-multiplication-table_4d16a5fc.png",
  bookIpman: "/manus-storage/book-ipman_d8efecb4.png",
  bookRaheel: "/manus-storage/book-raheel_78b33ee6.png",
  bookHasanat: "/manus-storage/book-hasanat-sayyiat_fc8bdb18.webp",
  bookQuestionGrave: "/manus-storage/book-question-grave_05a64104.webp",
  bookTakeEnemy: "/manus-storage/book-take-him-enemy_84344611.webp",
  pressSphinx: "/manus-storage/press-sphinx-square_b1a1eb5f.jpg",
  pressAlmasry: "/manus-storage/press-almasry-inventor_9787b344.jpg",
  projectCamino: "/manus-storage/project-camino-espanol_6a721207.png",
  projectSpeak: "/manus-storage/project-speak6000_e39aa65b.png",
  projectItaliano: "/manus-storage/project-italiano-interview_59f2eaa1.png",
  projectEmadLingoPoster: "/manus-storage/project-emadlingo-poster_61106f07.png",
  projectCompleteJapanese: "/manus-storage/project-complete-japanese_c770045c.png",
  projectMultiLingo: "/manus-storage/project-multilingo_7b3b0c73.webp",
  gameMultiplicationAdventure: "/manus-storage/game-multiplication-adventure_69d0d30f.png",
  gameMandaAlada: "/manus-storage/game-manda-alada-vitamin-city_250064e8.png",
  projectEmadLingo: "/manus-storage/project-emadlingo_62c2f256.webp",
  projectFinhim: "/manus-storage/project-finhim_cca4ae0b.jpeg",
  projectDrivepass: "/manus-storage/project-drivepass-us_238dcfce.jpg",
  projectMama: "/manus-storage/project-mama_4e9e785f.jpeg",
  projectRawdat: "/manus-storage/project-rawdat-aliman_cdda6b85.png",
  projectPalette: "/manus-storage/project-palette_8d85e0ca.png",
  projectWazira: "/manus-storage/project-wazira-masriya_aef3c34f.jpg",
  projectShaer: "/manus-storage/project-shaer-mokhtare3_1594105b.webp",
  bookMuscle: "/manus-storage/book-muscle-melodies_8e9d87de.webp",
  bookMendahDe: "/manus-storage/book-mendah-aladah-de_215da6bc.png",
  bookMendahEn: "/manus-storage/book-mendah-aladah-en_178762e7.png",
  bookAswany: "/manus-storage/book-aswany-future-egypt_15fc9ec0.webp",
  pressThird: "/manus-storage/press-third-clipping_08c8d4c0.jpg",
  careerPg: "/manus-storage/career-pg_5adf3dcf.webp",
  careerKandil: "/manus-storage/career-kandil-steel_8c173c97.png",
  careerAlkan: "/manus-storage/career-alkan-consult_3e3c6959.jpg",
  careerMisrTravel: "/manus-storage/career-misr-travel_8b28defa.jpg",
  careerTravco: "/manus-storage/career-travco-group_7663e5ba.png",
  careerUber: "/manus-storage/career-uber-driver_d51859c4.png",
  careerAlJazeera: "/manus-storage/career-aljazeera-academy_0a809bb7.png",
  careerEmbassy: "/manus-storage/career-us-embassy-egypt_8a23bc75.webp",
  careerDigital: "/manus-storage/career-digital-projects_ab864f22.png",
};

const externalProps = { target: "_blank", rel: "noreferrer" } as const;

const projectTabs: { key: ProjectFilter; ar: string; en: string; }[] = [
  { key: "all", ar: "الكل", en: "All" },
  { key: "islamic", ar: "إسلامي", en: "Islamic" },
  { key: "languages", ar: "لغات", en: "Languages" },
  { key: "sports", ar: "رياضي", en: "Sport" },
  { key: "community", ar: "مجتمعي", en: "Community" },
  { key: "tools", ar: "أدوات وتصميم", en: "Tools & Design" },
  { key: "innovation", ar: "أفكار وابتكار", en: "Ideas & Innovation" },
];

const copy = {
  ar: {
    nav: [
      ["about", "عنّي"],
      ["career", "المسار"],
      ["fleet", "القيادة والأسطول"],
      ["digital", "الرقمي والذكاء الاصطناعي"],
      ["projects", "المشروعات"],
      ["games", "GAMES"],
      ["inventions", "الاختراعات"],
      ["publications", "المنشورات"],
      ["press", "الصحافة"],
      ["achievements", "الإنجازات"],
      ["contact", "تواصل"],
    ],
    archive: "ملف مهني / 01",
    eyebrow: "من الطريق إلى الفكرة",
    heroTitle: "خبرة تُدار على الطريق، وفضولٌ يبني ما بعده.",
    heroBody: "أنا عماد حمدي — سائق محترف ومشرف أسطول، صانع محتوى رقمي، متعلم للذكاء الاصطناعي، مهندس زراعي ومبتكر. هذا أرشيف مفتوح لمسار يجمع الانضباط الميداني بالتجربة المستقلة.",
    explore: "استكشف الرحلة",
    resumes: "ملفات السيرة",
    projectsCta: "شاهد المشروعات",
    contactCta: "تواصل معي",
    portraitAlt: "صورة مهنية لعماد حمدي ببدلة رسمية في فعالية مهنية",
    portraitNote: "الصورة المهنية / لحظة تمثيل",
    scroll: "مرّر لاكتشاف المسار",
    proof: "مختارات موثقة",
    proofBody: "المعروض هنا مبني على الملفات والروابط التي تم توفيرها، مع ترك مساحة واضحة لما يحتاج إلى مستند أو رابط لاحقاً.",
    aboutKicker: "02 — الهوية المهنية",
    aboutTitle: "رحلة واحدة، بعدسات متعددة.",
    aboutBody: "سائق محترف ومشرف أسطول بخبرة في النقل الدبلوماسي والتنفيذي والسياحي والتجاري. تقوم هويتي الأساسية على السلامة والموثوقية وتخطيط المسارات والعناية بالمركبة والإشراف على السائقين؛ ويأتي العمل الرقمي والذكاء الاصطناعي كمجال عملي داعم لهذه الخبرة.",
    careerKicker: "03 — المسار",
    careerTitle: "من الخبرة اليومية إلى مسؤولية أكبر.",
    careerBody: "سجل مهني موثق يبدأ بالتطوير الصناعي ثم يمتد عبر النقل التنفيذي والسياحي والقيادة المستقلة وإدارة السائقين والبيئة الدبلوماسية.",
    fleetKicker: "04 — قيادة وإدارة أسطول",
    fleetTitle: "الطريق ليس مسافة فقط؛ إنه قرار في كل دقيقة.",
    fleetBody: "خبرة عملية تمتد إلى النقل السياحي، النقل الخاص، الإشراف على السائقين، ومراقبة سلامة المركبات والطرق في القاهرة وخارجها.",
    digitalKicker: "05 — تجربة رقمية مستقلة",
    digitalTitle: "أدوات جديدة، بعقلية عملية.",
    digitalBody: "تطوير مواقع وتطبيقات، صناعة محتوى، أدوات الذكاء الاصطناعي، والتحليلات الرقمية — كمسار مستقل وتعلم ذاتي، لا كمسمى وظيفي مخترع.",
    projectsKicker: "06 — مختبر المشروعات",
    projectsTitle: "أفكار خرجت من الدفتر إلى الشاشة.",
    projectsBody: "مواقع وأدوات رقمية ومشروعات تعليمية وإبداعية متاحة للزيارة، مع توضيح غرض كل عمل بصورة مختصرة ومهنية.",
    inventionsKicker: "07 — اختراعات وهندسة",
    inventionsTitle: "حين تصبح الملاحظة بداية اختراع.",
    inventionsBody: "براءة اختراع أصلية رقم 20093 صادرة من وزارة البحث العلمي والتكنولوجيا المصرية. وتظهر رياضة «بلاطات» الآن كملف موثق بشعار وقانون ووثيقة رسمية مرفقة.",
    publicationsKicker: "08 — منشورات",
    achievementsKicker: "09 — إنجازات",
    resumesKicker: "10 — ملفات مهنية",
    contactKicker: "11 — خط مفتوح",
    contactTitle: "لنبنِ الخطوة التالية بوضوح.",
    contactBody: "للتعاون المهني أو طلب ملف محدد، استخدم LinkedIn أو أرسل بيانات التواصل التي تريد عرضها هنا في النسخة القادمة.",
    linkedin: "LinkedIn",
    pending: "بانتظار الملف",
    view: "عرض المشروع",
    visit: "فتح السجل",
    openPdf: "فتح الملف PDF",
    download: "تنزيل",
    details: "تفاصيل",
    all: "الكل",
    websites: "مواقع",
    android: "تطبيقات Android",
    ai: "ذكاء اصطناعي",
    education: "تعليم",
    creative: "إبداعي",
    engineering: "هندسة",
    other: "أخرى",
  },
  en: {
    nav: [
      ["about", "About"],
      ["career", "Career"],
      ["fleet", "Driving & Fleet"],
      ["digital", "Digital & AI"],
      ["projects", "Projects"],
      ["games", "GAMES"],
      ["inventions", "Inventions"],
      ["publications", "Publications"],
      ["press", "Press"],
      ["achievements", "Achievements"],
      ["contact", "Contact"],
    ],
    archive: "Professional file / 01",
    eyebrow: "From the road to the idea",
    heroTitle: "Experience managed on the road, curiosity building what comes next.",
    heroBody: "I am Emad Hamdy — professional driver and fleet supervisor, digital creator, AI learner, agricultural engineer, and inventor. This is an open archive of a path that pairs field discipline with independent experimentation.",
    explore: "Explore the journey",
    resumes: "Professional files",
    projectsCta: "View projects",
    contactCta: "Contact me",
    portraitAlt: "Professional portrait of Emad Hamdy in a formal suit at a professional event",
    portraitNote: "Professional portrait / representing a moment",
    scroll: "Scroll to discover the path",
    proof: "Selected evidence",
    proofBody: "This presentation is built from the supplied files and links, with clear room for details that still need a document or URL.",
    aboutKicker: "02 — Professional identity",
    aboutTitle: "One journey, several lenses.",
    aboutBody: "A Professional Driver and Fleet Supervisor with experience across diplomatic, executive, tourism, and commercial transportation. My primary identity is built on safety, reliability, route planning, vehicle care, and driver supervision, while digital and AI work support that practical experience.",
    careerKicker: "03 — Career",
    careerTitle: "From daily expertise to wider responsibility.",
    careerBody: "A documented professional record that begins with industrial development and continues through executive and tourism transport, independent driving, driver supervision, and a diplomatic environment.",
    fleetKicker: "04 — Driving & fleet",
    fleetTitle: "The road is not only distance; it is a decision every minute.",
    fleetBody: "Practical experience across tourism transport, private transport, driver supervision, and vehicle and route safety monitoring in Cairo and beyond.",
    digitalKicker: "05 — Independent digital practice",
    digitalTitle: "New tools, practical thinking.",
    digitalBody: "Websites and apps, content creation, AI tools, and digital analytics — presented as independent work and self-directed learning, not an invented job title.",
    projectsKicker: "06 — Project lab",
    projectsTitle: "Ideas moved from notebook to screen.",
    projectsBody: "Websites, digital tools, educational work, and creative projects available to visit, with each project framed by a concise professional purpose.",
    inventionsKicker: "07 — Inventions & engineering",
    inventionsTitle: "When observation becomes the beginning of an invention.",
    inventionsBody: "Original patent no. 20093, issued by Egypt’s Ministry of Scientific Research and Technology. “Balatat” now appears as a documented file with a supplied emblem, rules, and official document.",
    publicationsKicker: "08 — Publications",
    achievementsKicker: "09 — Achievements",
    resumesKicker: "10 — Professional files",
    contactKicker: "11 — Open line",
    contactTitle: "Let’s define the next step clearly.",
    contactBody: "For professional collaboration or a specific file request, use LinkedIn or send the contact details you want displayed in the next version.",
    linkedin: "LinkedIn",
    pending: "File pending",
    view: "View project",
    visit: "Open record",
    openPdf: "Open PDF",
    download: "Download",
    details: "Details",
    all: "All",
    websites: "Websites",
    android: "Android apps",
    ai: "AI",
    education: "Education",
    creative: "Creative",
    engineering: "Engineering",
    other: "Other",
  },
} as const;

const identityCards = [
  { icon: BriefcaseBusiness, ar: "هوية مهنية مركبة", en: "A layered professional identity", bodyAr: "قيادة، إشراف، هندسة، وصناعة رقمية في مسار واحد.", bodyEn: "Driving, supervision, engineering, and digital making in one path." },
  { icon: CarFront, ar: "خبرة قيادة", en: "Driving experience", bodyAr: "29 عاماً من الخبرة في القيادة والنقل وخدمة المسافرين.", bodyEn: "29 years across driving, transport, and passenger service." },
  { icon: Layers3, ar: "إشراف الأسطول", en: "Fleet supervision", bodyAr: "مراقبة السائقين، المركبات، المسارات، والسلامة اليومية.", bodyEn: "Daily coordination across drivers, vehicles, routes, and safety." },
  { icon: Bot, ar: "تعلم رقمي مستقل", en: "Independent digital learning", bodyAr: "مواقع وتطبيقات ومحتوى وأدوات ذكاء اصطناعي بالتجربة العملية.", bodyEn: "Websites, applications, content, and AI tools through practice." },
  { icon: Tractor, ar: "خلفية هندسية", en: "Engineering background", bodyAr: "هندسة زراعية واهتمام بتحويل الملاحظة إلى حل.", bodyEn: "Agricultural engineering and an instinct for practical solutions." },
  { icon: PenTool, ar: "صناعة إبداعية", en: "Creative work", bodyAr: "كتابة وتحرير وتصميم وصور وفيديو ومشروعات تعليمية.", bodyEn: "Writing, editing, design, photo, video, and educational work." },
];

const timeline = [
  { year: "2000 — 2001", icon: assets.careerPg, labelAr: "منسق مخازن ولوجستيات — Procter & Gamble", labelEn: "Warehouse & Logistics Coordinator — Procter & Gamble", textAr: "إدارة تخزين المنتجات النهائية واستلامها وتنظيمها على أرفف معدنية متعددة المستويات باستخدام الرافعة الشوكية، مع تنسيق التحميل والشحن لأسواق التصدير ومتابعة المخزون وإعداد التقارير اليومية للكميات المستلمة والمشحونة والمتبقية.", textEn: "Managed finished-product storage, receiving, multi-level metal-rack organization using a forklift, export loading and shipping coordination, inventory monitoring, and daily reconciliation reports." },
  { year: "2004 — 2005", icon: assets.careerKandil, labelAr: "منسق بحث وتطوير — Qandil Steel / KAMA", labelEn: "R&D Coordinator — Qandil Steel / KAMA", textAr: "ساهم في تطوير المنتجات والعمليات، وتحسين الجودة وكفاءة التكلفة واستغلال المواد وتقليل زمن الإنتاج من خلال تحليل المشكلات والحلول العملية.", textEn: "Contributed to product and process development, quality improvement, cost efficiency, material use, and lead-time reduction through practical problem analysis." },
  { year: "2007 — 2008", icon: assets.careerAlkan, labelAr: "سائق — Alkan Consult", labelEn: "Driver — Alkan Consult", textAr: "قدم نقلًا مهنيًا وآمنًا لموظفي الشركة وعملياتها، مع الالتزام بالمسارات والجداول وفحوص المركبة الأساسية.", textEn: "Provided professional, safe transportation for staff and business operations while following schedules and conducting basic vehicle checks." },
  { year: "2008 — 2009", icon: assets.careerMisrTravel, labelAr: "سائق ليموزين — Misr Travel", labelEn: "Limousine Driver — Misr Travel", textAr: "خدمات نقل ليموزين للسياح والعملاء وضيوف VIP في مطار شرم الشيخ الدولي، مع الالتزام بالراحة والوقت وخدمة العملاء.", textEn: "Provided limousine transportation for tourists, clients, and VIP passengers at Sharm El Sheikh International Airport with reliable, comfortable service." },
  { year: "2010 — 2011", icon: assets.careerTravco, labelAr: "سائق حافلة — Travco Group", labelEn: "Bus Driver — Travco Group", textAr: "تشغيل حافلات نقل سياحي عبر جنوب سيناء ونقل الزوار بين الفنادق والمطارات والمعالم مع الالتزام بالسلامة والمواعيد.", textEn: "Operated tourism buses across South Sinai, transporting visitors between hotels, airports, and attractions with safety and punctuality." },
  { year: "2011 — 2015", icon: assets.careerUber, labelAr: "سائق مستقل / Uber Driver", labelEn: "Independent / Uber Driver", textAr: "إدارة عمليات النقل اليومية باستخدام مركبة مملوكة، بما في ذلك المسارات والجداول وصيانة المركبة وخدمة الركاب.", textEn: "Managed independent passenger transport using a personally owned vehicle, including routes, schedules, maintenance, and customer service." },
  { year: "2015 — 2020", icon: assets.careerAlJazeera, labelAr: "سائق ثم مشرف سائقين — Al Jazeera Academy", labelEn: "Driver then Driver Supervisor — Al Jazeera Academy", textAr: "بدأ كسائق لمدة عامين ثم تولى الإشراف على السائقين لمدة ثلاثة أعوام، مع تخطيط المسارات ومتابعة المركبات والجداول وتقليل وقت الانتظار.", textEn: "Started as a Driver for two years, then supervised drivers for three years, coordinating routes, vehicles, schedules, and reduced waiting time." },
  { year: "2020 — 2025", icon: assets.careerEmbassy, labelAr: "سائق محترف — السفارة الأمريكية بمصر", labelEn: "Professional Driver — U.S. Embassy in Egypt", textAr: "قدم نقلًا آمنًا وموثوقًا في بيئة دبلوماسية، شمل فحوص المركبة ومتابعة حالتها وإجراءات السلامة وتخطيط المسارات. وحصل على تقدير من U.S. Mission Egypt عن عام من القيادة الحكومية الآمنة والموثوقة دون حادث.", textEn: "Provided safe and reliable transport in a diplomatic environment, including vehicle checks, condition monitoring, safety procedures, and route planning. Recognized by U.S. Mission Egypt for one year of safe, reliable government driving without an accident." },
  { year: "اليوم", icon: assets.careerDigital, labelAr: "مشروعات رقمية ومحتوى تطبيقي", labelEn: "Digital projects and practical content", textAr: "تطوير مواقع وأدوات ومحتوى ومشروعات تعليمية وخدمية باستخدام التعلم الذاتي وأدوات مساعدة بالذكاء الاصطناعي.", textEn: "Developing websites, tools, content, and educational and public-service projects through self-directed learning and AI-assisted tools." },
];

const projects = [
  { name: "EMAD-LINGO", category: "languages", tagAr: "لغات ومهارات عمل", tagEn: "Languages & career skills", descAr: "منصة للتدرب على المقابلات واللغات والاختبارات والمصطلحات الدبلوماسية، مع أدوات تساعد على تطوير مهارات الحياة والعمل.", descEn: "A hub for interviews, languages, exams, diplomatic terminology, and practical career skills.", url: "https://omdapay.github.io/Emad-Lingo", mark: "01", image: assets.projectEmadLingo, position: "center" },
  { name: "Speak6000", category: "languages", tagAr: "تعلم الإنجليزية", tagEn: "English learning", descAr: "تجربة عملية لتعلم المحادثة الإنجليزية عبر الكلمات والجمل والمواقف اليومية.", descEn: "A practical English-conversation experience built around words, phrases, and real-life situations.", url: "https://omdapay.github.io/speak6000/", mark: "02", image: assets.projectSpeak, position: "top" },
  { name: "Complete Japanese", category: "languages", tagAr: "تعلم اليابانية", tagEn: "Japanese learning", descAr: "تدريب عملي على المقابلات والمفردات المهنية والنطق باللغة اليابانية.", descEn: "Practical training for Japanese interviews, professional vocabulary, and pronunciation.", url: "https://omdapay.github.io/complete-japanese/", mark: "03", image: assets.projectCompleteJapanese, position: "center" },
  { name: "MultiLingo", category: "languages", tagAr: "تعلم 10 لغات", tagEn: "10-language learning", descAr: "تطبيق لتعلّم عشر لغات في مكان واحد، يتضمن الترجمة والحروف والجمل اليومية والبرومبتات، وفق الصفحة العامة للتطبيق.", descEn: "A ten-language learning app with translation, alphabets, daily phrases, and prompts, as shown on its public page.", url: "https://multilingo-emad.lovable.app/", mark: "15", image: assets.projectMultiLingo, position: "center" },
  { name: "Camino-Español", category: "languages", tagAr: "تعلم الإسبانية", tagEn: "Spanish learning", descAr: "برنامج تفاعلي لتعلم المحادثة الإسبانية للعمل أو السفر.", descEn: "An interactive Spanish-conversation program for work or travel.", url: "https://omdapay.github.io/camino-espanol/", mark: "04", image: assets.projectCamino, position: "top" },
  { name: "Italiano Interview Prep", category: "languages", tagAr: "تحضير مقابلات", tagEn: "Interview preparation", descAr: "تدريب على المقابلات والمفردات المهنية والتقييم العملي باللغة الإيطالية.", descEn: "Italian interview practice, professional vocabulary, and practical assessment.", url: "https://omdapay.github.io/italiano-interview-prep/", mark: "05", image: assets.projectItaliano, position: "top" },
  { name: "Balatat", category: "sports", tagAr: "ابتكار رياضي", tagEn: "Sport innovation", descAr: "لعبة تنافسية موثقة بقانون رسمي ومساحة لعب محددة، أسسها وابتكرها عماد ياسين وفق الوثائق المرفقة.", descEn: "A competitive sport documented by supplied rules and a defined court, founded and created by Emad Yassin according to the supplied documents.", url: assets.balatatRules, mark: "06", image: assets.balatatEmblem, position: "center" },
  { name: "FINHIM", category: "community", tagAr: "سلامة مجتمعية", tagEn: "Community safety", descAr: "مشروع للتنبيه ودعم البحث عن الأطفال المفقودين، مستفيداً من GPS والتنبيهات وفق وصف المشروع.", descEn: "A public-safety project supporting alerts and missing-child search, using GPS and notifications as described.", url: "https://finhim.bolt.host", mark: "07", image: assets.projectFinhim, position: "center" },
  { name: "DrivePass-US", category: "community", tagAr: "تدريب قيادة", tagEn: "Driving practice", descAr: "محاكي مجاني للتدرب على اختبار القيادة الأمريكي مع أسئلة وتحدي وقت.", descEn: "A free U.S. driving-test practice simulator with questions and a timed challenge.", url: "https://omdapay.github.io/DrivePass-US/", mark: "08", image: assets.projectDrivepass, position: "center" },
  { name: "Palette", category: "tools", tagAr: "أداة تصميم", tagEn: "Design tool", descAr: "أداة لاختيار الألوان ونسخ أكوادها وتصدير تقرير PDF ومشاركته، مع أنظمة تناغم عربية وإنجليزية.", descEn: "A color tool for copying codes, exporting a PDF report, and sharing palettes in Arabic and English.", url: "https://omdapay.github.io/palette/", mark: "09", image: assets.projectPalette, position: "center" },
  { name: "Rawdat Aliman", category: "islamic", tagAr: "محتوى إسلامي", tagEn: "Islamic content", descAr: "مجمع مواقع ومحتوى إسلامي ضمن أعمال عماد حمدي الرقمية.", descEn: "A hub of Islamic websites and content within Emad Hamdy’s digital work.", url: "https://omdapay.github.io/rawdat-aliman/", mark: "10", image: assets.projectRawdat, position: "center" },
  { name: "Mama", category: "islamic", tagAr: "عمل إنساني", tagEn: "Human-centered work", descAr: "عمل إبداعي شخصي يحمل دعاءً للأم، متاح للزيارة عبر الرابط المرسل.", descEn: "A personal creative work carrying a prayer for one’s mother, available through the supplied link.", url: "https://omdapay.github.io/Mama/", mark: "11", image: assets.projectMama, position: "center" },
  { name: "Abouman Site", category: "innovation", tagAr: "موقع الكتاب", tagEn: "Book website", descAr: "الموقع المصاحب لكتاب Ipman / 叶问传奇، متاح بالرابط العام الذي أرسله المؤلف.", descEn: "The companion website for the Ipman / 叶问传奇 book, available through the author-supplied public link.", url: "https://galalemad75-creator.github.io/abouman-site/", alternateUrl: "https://lnkd.in/dN7Hzme6", mark: "12", image: assets.bookIpman, position: "top" },
  { name: "مدونة الوزيرة مصرية", category: "innovation", tagAr: "مدونة أفكار", tagEn: "Ideas blog", descAr: "مدونة عامة تنشر مقالات وأفكاراً في الشأن العام والنقل والابتكار والخدمات.", descEn: "A public blog publishing ideas and articles across public affairs, transport, innovation, and services.", url: "https://waziramisriya.blogspot.com/", mark: "13", image: assets.projectWazira, position: "top" },
  { name: "شاعر ومخترع — YouTube", category: "innovation", tagAr: "قناة محتوى", tagEn: "Content channel", descAr: "قناة «شاعر ومخترع» لمحتوى الإبداع والاختراعات وحل المشكلات العملية.", descEn: "The ‘Poet and Inventor’ channel for creativity, inventions, and practical problem-solving.", url: "https://www.youtube.com/@ldayafakra", mark: "14", image: assets.projectShaer, position: "center" },
];

const games = [
  { name: "Multiplication Adventure — Save Princess Hasbah", tagAr: "لعبة جدول الضرب", tagEn: "Multiplication game", descAr: "مغامرة لتعلّم جدول الضرب عبر قصة إنقاذ الأميرة حسبة، موجّهة للأعمار من 6 إلى 13 عاماً وفق صفحة اللعبة العامة.", descEn: "A multiplication-table adventure about rescuing Princess Hasbah, for ages 6–13 according to its public page.", url: "https://1076587-df707a0617784d1ca7e43a8963e03eb7-5-latest.app.atoms.dev/", mark: "G-01", image: assets.gameMultiplicationAdventure },
  { name: "Manda & Alada — Vitamin City", tagAr: "لعبة تعليمية", tagEn: "Educational game", descAr: "لعبة تعليمية بعنوان «منده وعلادة — مدينة الفيتامينات» تتوفر بالعربية والإنجليزية عبر الرابط المرفق.", descEn: "An educational game titled ‘Manda & Alada — Vitamin City’, available in Arabic and English through the supplied link.", url: "https://1076256-882d2d9689c647a3981ca909f5d77b94-4-v4.app.atoms.dev/", mark: "G-02", image: assets.gameMandaAlada },
];

const publications = [
  { title: "The Miracles of Prophet Muhammad (PBUH)", descriptionAr: "غلاف كتاب إسلامي مرفق من أعمال عماد ياسين.", descriptionEn: "A supplied cover for an Islamic book by Emad Yassin.", url: "https://play.google.com/books/publish/u/0/a/718414871861262774#list?sortby=last_updated&sortdir=desc", cover: assets.bookMiracles, sourceAr: "Google Play Books", sourceEn: "Google Play Books" },
  { title: "Kamoos: The New Multiplication Table", descriptionAr: "كتاب تعليمي منشور على Amazon، مع غلاف مرفق.", descriptionEn: "An educational book published on Amazon with a supplied cover.", url: "https://www.amazon.com/New-Multiplication-Table-emad-yassin/dp/B0DFML53QN", cover: assets.bookMultiplication, sourceAr: "Amazon / غلاف مرفق", sourceEn: "Amazon / supplied cover" },
  { title: "RAHEEL: The Guardian of the Ancient Sword", descriptionAr: "رواية متاحة عبر Amazon، مع غلاف مرفق.", descriptionEn: "A novel available on Amazon with a supplied cover.", url: "https://www.amazon.com/Raheel-killer-doctors-Emad-yassin-ebook/dp/B0DFRQXZWJ", cover: assets.bookRaheel, sourceAr: "Amazon / غلاف مرفق", sourceEn: "Amazon / supplied cover" },
  { title: "Ipman / 叶问传奇", descriptionAr: "كتاب متاح للقراءة والتنزيل مجاناً عبر موقع Abouman المرفق.", descriptionEn: "A book available to read and download free through the supplied Abouman website.", url: "https://galalemad75-creator.github.io/abouman-site/", cover: assets.bookIpman, sourceAr: "موقع Abouman / تنزيل مجاني", sourceEn: "Abouman website / free download" },
  { title: "اعرف دينك عن طريق الأسئلة — الحسنات والسيئات", descriptionAr: "الجزء الأول من سلسلة إسلامية، إعداد المهندس عماد حمدي.", descriptionEn: "Part one of an Islamic series prepared by Engineer Emad Hamdy.", url: "https://play.google.com/books/publish/u/0/a/718414871861262774#list?sortby=last_updated&sortdir=desc", cover: assets.bookHasanat, sourceAr: "Google Play Books", sourceEn: "Google Play Books" },
  { title: "سؤال القبر", descriptionAr: "الجزء الثالث من سلسلة «اعرف دينك عن طريق الأسئلة»؛ جمع وترتيب م./ عماد حمدي.", descriptionEn: "Part three of the ‘Know Your Religion Through Questions’ series, compiled by Engineer Emad Hamdy.", url: "https://play.google.com/books/publish/u/0/a/718414871861262774#list?sortby=last_updated&sortdir=desc", cover: assets.bookQuestionGrave, sourceAr: "Google Play Books", sourceEn: "Google Play Books" },
  { title: "فاتخذوه عدواً", descriptionAr: "الجزء الثاني من سلسلة «اعرف دينك عن طريق الأسئلة»؛ م./ عماد حمدي.", descriptionEn: "Part two of the ‘Know Your Religion Through Questions’ series by Engineer Emad Hamdy.", url: "https://play.google.com/books/publish/u/0/a/718414871861262774#list?sortby=last_updated&sortdir=desc", cover: assets.bookTakeEnemy, sourceAr: "Google Play Books", sourceEn: "Google Play Books" },
  { title: "Muscle Melodies", descriptionAr: "كتاب متاح عبر Amazon بحسب الرابط المرسل، مع غلاف مرفق.", descriptionEn: "A book available on Amazon through the supplied link with a supplied cover.", url: "https://www.amazon.com/Muscle-Melodies-Emad-Yassin-ebook/dp/B0DF8XK6SN", cover: assets.bookMuscle, sourceAr: "Amazon / غلاف مرفق", sourceEn: "Amazon / supplied cover" },
  { title: "Mendah and Aladah in the City of Vitamins", descriptionAr: "إصدار إنجليزي متاح عبر Amazon، مع غلاف مرفق.", descriptionEn: "An English edition available on Amazon with a supplied cover.", url: "https://www.amazon.com/Mendah-Aladah-City-Vitamins-Scientific/dp/B0DFQK8GXC", cover: assets.bookMendahEn, sourceAr: "Amazon / غلاف مرفق", sourceEn: "Amazon / supplied cover" },
  { title: "Mendah und Aladah in der Stadt der Vitamine", descriptionAr: "إصدار ألماني متاح عبر Amazon، مع غلاف مرفق.", descriptionEn: "A German edition available on Amazon with a supplied cover.", url: "https://www.amazon.com/Mendah-Aladah-Vitamine-einfache-wissenschaftliche/dp/B0DFPJPZ7G", cover: assets.bookMendahDe, sourceAr: "Amazon / غلاف مرفق", sourceEn: "Amazon / supplied cover" },
  { title: "الأسواني ومستقبل مصر", descriptionAr: "كتاب باللغة العربية متاح عبر Amazon بحسب الرابط المرسل، مع غلاف مرفق.", descriptionEn: "An Arabic-language book available on Amazon through the supplied link with a supplied cover.", url: "https://www.amazon.com/%E2%80%AB%D8%A7%D9%84%D8%A7%D8%B3%D9%88%D8%A7%D9%86%D9%89-%D9%88%D9%85%D8%B3%D8%AA%D9%82%D8%A8%D9%84-%D9%85%D8%B5%D8%B1%E2%80%AC-Arabic-yassin-ebook/dp/B0DC57WLMJ", cover: assets.bookAswany, sourceAr: "Amazon / غلاف مرفق", sourceEn: "Amazon / supplied cover" },
];

const pressMentions = [
  { sourceAr: "جريدة المصري", sourceEn: "Al Masry newspaper", date: "28.09.1992", titleAr: "أصغر مخترع يسجل ابتكاراً", titleEn: "Young inventor registers an innovation", textAr: "قصاصة صحفية مرفقة توثق مادة عن عماد حمدي والابتكار.", textEn: "A supplied press clipping documenting an article about Emad Hamdy and innovation.", image: assets.pressAlmasry },
  { sourceAr: "قصاصة صحفية مرفقة", sourceEn: "Supplied press clipping", date: "24.12.2011", titleAr: "فكرة تطوير ميدان سفنكس", titleEn: "A proposal to develop Sphinx Square", textAr: "قصاصة صحفية مرفقة تنسب فكرة تطوير ميدان سفنكس إلى المهندس عماد حمدي.", textEn: "A supplied press clipping attributes a Sphinx Square development proposal to Engineer Emad Hamdy.", image: assets.pressSphinx },
  { sourceAr: "قصاصة صحفية مرفقة", sourceEn: "Supplied press clipping", date: "أرشيف صحفي", titleAr: "ظهور صحفي موثق", titleEn: "Documented press appearance", textAr: "قصاصة صحفية ثالثة مرفقة ضمن أرشيف الظهور الإعلامي لعماد حمدي.", textEn: "A third supplied press clipping in Emad Hamdy’s media-appearance archive.", image: assets.pressThird },
];

const skillGroups = [
  { titleAr: "الميدان", titleEn: "Field", skillsAr: ["قيادة دفاعية", "نقل سياحي", "نقل VIP", "تخطيط المسارات", "معرفة طرق القاهرة", "متابعة الحوادث"], skillsEn: ["Defensive driving", "Tourism transport", "VIP transport", "Route planning", "Greater Cairo roads", "Accident monitoring"] },
  { titleAr: "الأسطول", titleEn: "Fleet", skillsAr: ["إشراف السائقين", "متابعة حالة المركبة", "تنسيق السائقين", "تقليل الانتظار", "السلامة التشغيلية"], skillsEn: ["Driver supervision", "Vehicle condition", "Driver coordination", "Less unnecessary waiting", "Operational safety"] },
  { titleAr: "الرقمي", titleEn: "Digital", skillsAr: ["تطوير المواقع", "تطبيقات الويب", "Android", "AI-assisted development", "تحرير الصور والفيديو", "التسويق وSEO", "Google Analytics", "Meta Pixel", "كتابة وترجمة"], skillsEn: ["Website development", "Web applications", "Android", "AI-assisted development", "Photo and video editing", "Marketing and SEO", "Google Analytics", "Meta Pixel", "Writing and translation"] },
];


function SectionIntro({ kicker, title, body, number }: { kicker: string; title: string; body?: string; number?: string }) {
  return (
    <div className="section-intro reveal">
      <div className="section-index"><span>{number ?? kicker.split(" ")[0]}</span><i /></div>
      <div>
        <p className="eyebrow">{kicker}</p>
        <h2>{title}</h2>
        {body && <p className="section-lead">{body}</p>}
      </div>
    </div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all");
  const t = copy[language];
  const isArabic = language === "ar";
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.title = isArabic ? "عماد حمدي | ملف مهني مفتوح" : "Emad Hamdy | Open Professional Archive";
  }, [isArabic, language]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [language, projectFilter]);

  const visibleProjects = useMemo(() => projectFilter === "all" ? projects : projects.filter((project) => project.category === projectFilter), [projectFilter]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const toggleLanguage = () => setLanguage((current) => current === "ar" ? "en" : "ar");

  return (
    <main className="site-shell">
      <header className="topbar" aria-label={isArabic ? "التنقل الرئيسي" : "Main navigation"}>
        <div className="topbar-inner">
          <button className="brand-lockup" onClick={() => goTo("home")} aria-label={isArabic ? "العودة إلى البداية" : "Back to home"}>
            <span className="brand-mark brand-mark-source"><img src={assets.identityIcon} alt="" /></span>
            <span className="brand-name"><strong>EMAD</strong><span className="wordmark-divider" /><em>HAMDY</em></span>
          </button>
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
            {t.nav.map(([id, label]) => <button key={id} onClick={() => goTo(id)}>{label}</button>)}
            <button onClick={() => goTo("resumes")}>{isArabic ? "السير الذاتية" : "Resumes"}</button>
          </nav>
          <div className="topbar-actions">
            <button className="language-toggle" onClick={toggleLanguage} aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}><span>{isArabic ? "EN" : "ع"}</span><i>{isArabic ? "English" : "العربية"}</i></button>
            <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={isArabic ? "فتح القائمة" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          </div>
        </div>
      </header>

      <section id="home" className="hero" style={{ backgroundImage: `url(${assets.hero})` }}>
        <div className="hero-grain" />
        <div className="hero-inner container">
          <div className="hero-copy">
            <div className="archive-label reveal"><span className="dot" /> {t.archive}</div>
            <div className="hero-stamp reveal reveal-delay-1"><img src={assets.mark} alt="" /><span>INNOVATION<br />ARCHIVE</span></div><p className="hero-eyebrow reveal reveal-delay-1">{t.eyebrow}</p>
            <h1 className="reveal reveal-delay-2">{t.heroTitle}</h1>
            <p className="hero-body reveal reveal-delay-3">{t.heroBody}</p>
            <div className="hero-actions reveal reveal-delay-4">
              <button className="button button-copper" onClick={() => goTo("about")}>{t.explore} <Arrow size={17} /></button>
              <button className="button button-outline-light" onClick={() => goTo("resumes")}>{t.resumes} <FileText size={16} /></button>
            </div>
            <div className="hero-links reveal reveal-delay-5">
              <a href="https://www.linkedin.com/in/emad-hamdy-41a650213/" {...externalProps}><Linkedin size={15} /> {t.linkedin}</a>
              <button onClick={() => goTo("projects")}><FolderOpen size={15} /> {t.projectsCta}</button>
              <button onClick={() => goTo("contact")}><Mail size={15} /> {t.contactCta}</button>
            </div>
          </div>
          <div className="portrait-stage reveal reveal-delay-2">
            <div className="portrait-label top-label"><span>01</span> {isArabic ? "حضور مهني" : "Professional presence"}</div>
            <div className="portrait-frame">
              <div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" />
              <div className="portrait-image-wrap"><img src={assets.portrait} alt={t.portraitAlt} /></div>
              <div className="portrait-caption"><span>{t.portraitNote}</span><span>EG / 2024</span></div>
            </div>
            <div className="portrait-label bottom-label"><span className="line" /> {isArabic ? "شخص حقيقي. مسار متطور." : "A real person. A growing path."}</div>
          </div>
        </div>
        <button className="scroll-cue" onClick={() => goTo("about")}><ArrowDown size={16} /><span>{t.scroll}</span></button>
      </section>

      <section className="proof-strip">
        <div className="container proof-grid">
          <div className="proof-lead reveal"><span className="stamp"><img src={assets.mark} alt="" /></span><div><p className="eyebrow">{t.proof}</p><p>{t.proofBody}</p></div></div>
          <div className="proof-stat reveal reveal-delay-1"><strong>29</strong><span>{isArabic ? "عاماً من القيادة" : "years driving"}</span></div>
          <div className="proof-stat reveal reveal-delay-2"><strong>05</strong><span>{isArabic ? "سنوات في السفارة الأمريكية بمصر" : "years at the U.S. Embassy in Egypt"}</span></div>
          <div className="proof-stat reveal reveal-delay-3"><strong>20093</strong><span>{isArabic ? "براءة اختراع أصلية — وزارة البحث العلمي والتكنولوجيا المصرية" : "original patent — Egypt’s Ministry of Scientific Research and Technology"}</span></div>
        </div>
      </section>

      <section id="about" className="paper-section about-section">
        <div className="container">
          <SectionIntro kicker={t.aboutKicker} title={t.aboutTitle} body={t.aboutBody} number="02" />
          <div className="identity-layout">
            <div className="identity-note reveal"><div className="note-top"><span>IDENTITY FILE</span><span>EH / 02</span></div><p>{isArabic ? "«العمل الجيد يترك أثراً يمكن تتبعه.»" : "“Good work leaves a trace that can be followed.”"}</p><div className="note-signature">Emad Hamdy <span>—</span> Cairo</div></div>
            <div className="identity-grid">
              {identityCards.map(({ icon: Icon, ar, en, bodyAr, bodyEn }, index) => <article className={`identity-card reveal reveal-delay-${(index % 4) + 1}`} key={ar}><div className="card-number">0{index + 1}</div><Icon size={22} strokeWidth={1.5} /><h3>{isArabic ? ar : en}</h3><p>{isArabic ? bodyAr : bodyEn}</p></article>)}
            </div>
          </div>
        </div>
      </section>

      <section id="career" className="ink-section career-section">
        <div className="container">
          <SectionIntro kicker={t.careerKicker} title={t.careerTitle} body={t.careerBody} number="03" />
          <div className="timeline-wrap">
            <div className="timeline-rail"><span /></div>
            <div className="timeline-list">
              {timeline.map((item, index) => <article className={`timeline-item reveal reveal-delay-${(index % 4) + 1}`} key={`${item.year}-${item.labelAr}`}><div className="timeline-identity"><div className="timeline-company-icon"><img src={item.icon} alt={isArabic ? `أيقونة جهة ${item.labelAr}` : `${item.labelEn} company icon`} loading="lazy" /></div><div className="timeline-year">{item.year}</div></div><div className="timeline-dot"><span /></div><div className="timeline-card"><img className="timeline-seal" src={assets.mark} alt="" /><p className="eyebrow">{isArabic ? "سجل المسار" : "Path record"} / 0{index + 1}</p><h3>{isArabic ? item.labelAr : item.labelEn}</h3><p>{isArabic ? item.textAr : item.textEn}</p></div></article>)}
            </div>
          </div>
          <div className="embassy-note reveal"><div className="embassy-note-icon"><BriefcaseBusiness size={18} /></div><div><p className="eyebrow">U.S. EMBASSY IN EGYPT / 05 YEARS</p><h3>{isArabic ? "خمس سنوات من الخبرة المهنية في السفارة الأمريكية بمصر." : "Five years of professional experience at the U.S. Embassy in Egypt."}</h3><p>{isArabic ? "محطة راسخة ضمن المسار العملي إلى جانب القيادة، الإشراف، والمشروعات المستقلة." : "An established part of the career path alongside driving, supervision, and independent projects."}</p></div></div>
        </div>
      </section>

      <section id="fleet" className="paper-section fleet-section">
        <div className="container">
          <SectionIntro kicker={t.fleetKicker} title={t.fleetTitle} body={t.fleetBody} number="04" />
          <div className="fleet-feature reveal">
            <div className="fleet-image"><img src={assets.fleet} alt={isArabic ? "رسم تحريري لمسارات أسطول على خريطة طريق" : "Editorial route-map visual for fleet management"} loading="lazy" /><span className="image-tag">ROUTE / SAFETY / SERVICE</span></div>
            <div className="fleet-copy"><p className="eyebrow">{isArabic ? "خبرة تشغيلية" : "Operational experience"}</p><h3>{isArabic ? "هدوء السائق، دقة المشرف." : "A driver’s calm. A supervisor’s precision."}</h3><p>{isArabic ? "من قيادة الشاحنات والنقل السياحي إلى النقل الخاص وخدمة الشخصيات المهمة، يتقاطع العمل اليومي مع التخطيط، متابعة الحالة، والتنسيق بين السائقين." : "From truck driving and tourism transport to private and VIP service, daily work meets planning, condition monitoring, and driver coordination."}</p><div className="fleet-badges"><span>29 {isArabic ? "سنة" : "years"}</span><span>VIP</span><span>{isArabic ? "دفاعية" : "Defensive"}</span></div></div>
          </div>
          <div className="skill-columns">
            {skillGroups.slice(0, 2).map((group, index) => <div className="skill-column reveal reveal-delay-1" key={group.titleAr}><div className="skill-head"><span>0{index + 1}</span><h3>{isArabic ? group.titleAr : group.titleEn}</h3></div><ul>{(isArabic ? group.skillsAr : group.skillsEn).map((skill) => <li key={skill}><Check size={14} />{skill}</li>)}</ul></div>)}
          </div>
        </div>
      </section>

      <section id="digital" className="ink-section digital-section">
        <div className="container">
          <SectionIntro kicker={t.digitalKicker} title={t.digitalTitle} body={t.digitalBody} number="05" />
          <div className="digital-feature reveal"><div className="digital-copy"><p className="eyebrow">{isArabic ? "تعلم ذاتي / مشروعات مستقلة" : "Self-directed / Independent projects"}</p><h3>{isArabic ? "لا أضع كلمة AI على كل شيء؛ أستخدمه عندما يجعل الفكرة أوضح." : "I do not put AI on everything; I use it when it makes the idea clearer."}</h3><p>{isArabic ? "المسار الرقمي هنا عملي: بناء صفحات وتجارب، إدارة محتوى، تحرير صور وفيديو، تسويق رقمي، تحليل، وترجمة بين العربية والإنجليزية." : "The digital path is practical: building experiences, managing content, editing photo and video, digital marketing, analytics, and Arabic–English translation."}</p><button className="text-link" onClick={() => goTo("projects")}>{isArabic ? "إلى مختبر المشروعات" : "To the project lab"} <Arrow size={16} /></button></div><div className="digital-image"><img src={assets.digital} alt={isArabic ? "مشهد تحريري للاستوديو الرقمي وأدوات الذكاء الاصطناعي" : "Editorial digital atelier scene with AI tools"} loading="lazy" /><div className="digital-index">05<span>/</span>AI</div></div></div>
          <div className="skill-columns digital-skills">{skillGroups.slice(2).map((group) => <div className="skill-column reveal reveal-delay-2" key={group.titleAr}><div className="skill-head"><span>03</span><h3>{isArabic ? group.titleAr : group.titleEn}</h3></div><ul>{(isArabic ? group.skillsAr : group.skillsEn).map((skill) => <li key={skill}><Check size={14} />{skill}</li>)}</ul></div>)}<div className="learning-card reveal reveal-delay-3"><Sparkles size={19} /><p className="eyebrow">{isArabic ? "صياغة دقيقة" : "Precise framing"}</p><p>{isArabic ? "هذه الأعمال معروضة كعمل مستقل، تعلم ذاتي، أو تجربة شخصية حيث يلزم — لا كخبرة توظيفية غير مثبتة." : "These works are framed as independent work, self-directed learning, or personal experiments where appropriate — never as unsupported employment."}</p></div></div>
        </div>
      </section>

      <section id="projects" className="paper-section projects-section">
        <div className="container">
          <SectionIntro kicker={t.projectsKicker} title={t.projectsTitle} body={t.projectsBody} number="06" />
          <div className="filter-bar" role="tablist" aria-label={isArabic ? "تبويبات المشروعات" : "Project categories"}>{projectTabs.map((tab) => <button className={projectFilter === tab.key ? "active" : ""} key={tab.key} onClick={() => setProjectFilter(tab.key)} role="tab" aria-selected={projectFilter === tab.key}>{isArabic ? tab.ar : tab.en}</button>)}</div>
          <div className="project-filter-note reveal"><span>{isArabic ? "تصنيف موضوعي" : "Thematic taxonomy"}</span><p>{isArabic ? `${visibleProjects.length} مشروعاً في هذا التبويب` : `${visibleProjects.length} projects in this category`}</p></div>
          <div className="project-list">{visibleProjects.map((project, index) => <article className={`project-card ${project.image ? "has-project-image" : ""} reveal reveal-delay-${(index % 4) + 1}`} key={project.name}><div className="project-top"><span className="project-mark">{project.mark}</span><span className="project-category">{isArabic ? project.tagAr : project.tagEn}</span><img className="record-seal" src={assets.mark} alt="" /></div>{project.image && <div className="project-thumb"><img src={project.image} alt={isArabic ? `صورة مشروع ${project.name}` : `${project.name} project artwork`} loading="lazy" style={{ objectPosition: project.position }} /><span>{isArabic ? "دليل بصري" : "VISUAL EVIDENCE"}</span></div>}<div className="project-main"><h3>{project.name}</h3><p>{isArabic ? project.descAr : project.descEn}</p>{project.alternateUrl && <a className="alternate-project-link" href={project.alternateUrl} {...externalProps}>{isArabic ? "رابط عام بديل" : "Alternate public link"} <ArrowUpRight size={12} /></a>}</div><div className="project-bottom"><a className="text-link" href={project.url} {...externalProps}>{t.visit} <ArrowUpRight size={15} /></a><span className="project-line" /></div></article>)}</div>
        </div>
      </section>

      <section id="games" className="ink-section games-section">
        <div className="container compact-section"><SectionIntro kicker="" title="GAMES" number="G" /><div className="games-list">{games.map((game, index) => <article className={`game-card reveal reveal-delay-${index + 1}`} key={game.name}><a className="game-art" href={game.url} {...externalProps}><img src={game.image} alt={isArabic ? `صورة لعبة ${game.name}` : `${game.name} artwork`} loading="lazy" /></a><div className="game-record"><div className="game-top"><span>{game.mark}</span><span>{isArabic ? game.tagAr : game.tagEn}</span></div><h3>{game.name}</h3><p>{isArabic ? game.descAr : game.descEn}</p><a className="button button-copper" href={game.url} {...externalProps}>{isArabic ? "ابدأ اللعبة" : "Play game"} <ArrowUpRight size={16} /></a></div></article>)}</div></div>
      </section>

      <section id="inventions" className="paper-section invention-section">
        <div className="container">
          <SectionIntro kicker={t.inventionsKicker} title={t.inventionsTitle} body={t.inventionsBody} number="07" />
          <div className="invention-layout"><div className="patent-card reveal"><div className="patent-card-head"><span>ORIGINAL PATENT</span><span className="dossier-stamp"><img src={assets.mark} alt="" /> NO. 20093</span></div><div className="patent-image"><img src={assets.patent} alt={isArabic ? "براءة اختراع أصلية رقم 20093" : "Original patent no. 20093"} loading="lazy" /></div><div className="patent-card-foot"><span>{isArabic ? "Heat Regulation / 1992" : "Heat Regulation / 1992"}</span><span><FileCheck2 size={14} /> {isArabic ? "براءة أصلية" : "Original patent"}</span></div></div><div className="invention-notes reveal reveal-delay-2"><article><div className="note-symbol"><Tractor size={19} /></div><p className="eyebrow">01 / {isArabic ? "خلفية" : "Background"}</p><h3>{isArabic ? "هندسة زراعية بعين عملية." : "Agricultural engineering, practically minded."}</h3><p>{isArabic ? "الخلفية الهندسية جزء من فهم المشكلة قبل البحث عن طريقة قابلة للتطبيق." : "An engineering background starts with understanding the problem before looking for a workable method."}</p></article><article><div className="note-symbol"><Route size={19} /></div><p className="eyebrow">02 / BLAAT</p><h3>{isArabic ? "مؤسس ومبتكر رياضة «بلاطات»." : "Founder / Creator of the “Blaat” sport."}</h3><p>{isArabic ? "تظهر هنا كفكرة إبداعية وقصة تطوير، بينما تنتظر القواعد الرسمية والملف التفصيلي الإضافة." : "Presented as a creative concept and development story, awaiting its official rules and detailed file."}</p></article></div></div>
        </div>
      </section>

      <section className="ink-section balatat-section" aria-labelledby="balatat-title">
        <div className="container compact-section">
          <div className="balatat-file-head reveal"><span className="balatat-file-tab">FILE / BALATAT / 2026</span><span>{isArabic ? "مستندات مرفقة" : "Supplied documents"}</span></div>
          <div className="balatat-grid">
            <figure className="balatat-emblem reveal"><div className="balatat-emblem-frame"><img src={assets.balatatEmblem} alt={isArabic ? "الشعار المرفق لمشروع رياضة بلاطات" : "Supplied emblem for the Balatat sport project"} loading="lazy" /></div><figcaption>{isArabic ? "الشعار المرفق / Balatat" : "Supplied emblem / Balatat"}</figcaption></figure>
            <div className="balatat-copy reveal reveal-delay-2"><p className="eyebrow">03 / BALATAT</p><h2 id="balatat-title">{isArabic ? "«بلاطات» — لعبة توازن على مساحة محددة." : "“Balatat” — a balance game on a defined space."}</h2><p>{isArabic ? "وفق القانون المرفق، يقف لاعبان متقابلان على بلاطتين بمقاس 50 × 50 سم لكل لاعب. الفكرة هي الدفع التدريجي بالكف المفتوح ومقاومة الدفع بهدف إخراج قدم المنافس من حدود بلاطته، دون ألم أو إصابة أو إسقاط." : "According to the supplied rules, two players stand on separate 50 × 50 cm tiles. The objective is a gradual open-palm push and resistance that moves an opponent’s foot beyond their tile boundary, without pain, injury, or falling."}</p><div className="balatat-rule-grid"><article><strong>100 × 50 CM</strong><span>{isArabic ? "مساحة اللعب / دون معدات" : "Court / no equipment"}</span></article><article><strong>3 × 1 MIN</strong><span>{isArabic ? "جولات مع راحة 30 ثانية" : "Rounds with 30 sec rest"}</span></article><article><strong>SAFE PLAY</strong><span>{isArabic ? "ضغط تدريجي بلا ألم أو إصابة" : "Gradual pressure; no pain or injury"}</span></article></div><div className="balatat-actions"><a className="button button-copper" href={assets.balatatRules} {...externalProps}><FileText size={16} />{isArabic ? "قانون اللعبة PDF" : "Game rules PDF"}</a><a className="button button-outline-light" href={assets.balatatOfficial} {...externalProps}><FileCheck2 size={16} />{isArabic ? "الوثيقة الرسمية" : "Official document"}</a></div><p className="balatat-source-note"><ShieldCheck size={14} />{isArabic ? "تُنسب الحقوق في الوثيقة المرفقة إلى Emad Yassin، مصر، مايو 2026؛ ويُعرض النص هنا دون توسيع أي ادعاء قانوني." : "The supplied document attributes the work to Emad Yassin, Egypt, May 2026; this summary does not expand any legal claim."}</p></div>
          </div>
        </div>
      </section>

      <section id="publications" className="ink-section publications-section">
        <div className="container compact-section"><SectionIntro kicker={t.publicationsKicker} title={isArabic ? "ما يُنشر يواصل الرحلة." : "What gets published keeps the journey moving."} body={isArabic ? "أغلفة وكتب منشورة أو موثقة بالملفات المرفقة. تُعرض روابط الشراء فقط عندما يكون الرابط العام متاحاً." : "Books documented by supplied covers or public publication links. Purchase links appear only where a public link is available."} number="08" /><div className="publication-list">{publications.map((publication, index) => <article className={`publication-card ${publication.cover ? "has-cover" : ""} reveal reveal-delay-${(index % 4) + 1}`} key={publication.title}><div className="publication-icon"><BookOpen size={27} /></div><img className="record-seal publication-seal" src={assets.mark} alt="" />{publication.cover && <div className="publication-cover"><img src={publication.cover} alt={isArabic ? `غلاف ${publication.title}` : `Cover of ${publication.title}`} loading="lazy" /></div>}<div className="publication-meta"><p className="eyebrow">BOOK FILE / 0{index + 1}</p><h3>{publication.title}</h3><p>{isArabic ? publication.descriptionAr : publication.descriptionEn}</p><div className="publication-details"><span><PenTool size={14} /> Emad Yassin</span><span><Globe2 size={14} /> {isArabic ? publication.sourceAr : publication.sourceEn}</span></div></div>{publication.url ? <a className="button button-copper" href={publication.url} {...externalProps}>{t.visit} <ArrowUpRight size={16} /></a> : <span className="text-link muted-link">{isArabic ? "غلاف موثق" : "Documented cover"} <FileCheck2 size={15} /></span>}</article>)}</div></div>
      </section>

      <section id="press" className="paper-section press-section"><div className="container"><SectionIntro kicker={isArabic ? "09 — ظهور صحفي" : "09 — Press appearances"} title={isArabic ? "مواد صحفية محفوظة في الأرشيف." : "Press clippings held in the archive."} body={isArabic ? "مواد صحفية مُدرجة وفق ما يظهر في القصاصات المرفقة فقط." : "Press materials are listed only according to what is visible in the supplied clippings."} number="09" /><div className="press-grid">{pressMentions.map((mention, index) => <article className={`press-card reveal reveal-delay-${index + 1}`} key={mention.titleAr}><div className="press-image"><img src={mention.image} alt={isArabic ? `قصاصة صحفية: ${mention.titleAr}` : `Press clipping: ${mention.titleEn}`} loading="lazy" /><span>PRESS / 0{index + 1}</span></div><div className="press-copy"><img className="record-seal press-seal" src={assets.mark} alt="" /><p className="eyebrow">{isArabic ? mention.sourceAr : mention.sourceEn} / {mention.date}</p><h3>{isArabic ? mention.titleAr : mention.titleEn}</h3><p>{isArabic ? mention.textAr : mention.textEn}</p><span className="press-file"><Newspaper size={14} /> {isArabic ? "قصاصة أرشيفية مرفقة" : "Supplied archive clipping"}</span></div></article>)}</div></div></section>

      <section id="achievements" className="paper-section achievements-section"><div className="container"><SectionIntro kicker={isArabic ? "10 — الإنجازات" : "10 — Achievements"} title={isArabic ? "علامات تُقاس بالاستمرار." : "Milestones measured by consistency."} number="10" /><div className="achievement-grid">{[{ icon: Award, titleAr: "Safe Driver Award", titleEn: "Safe Driver Award", descAr: "يناير 2022", descEn: "January 2022" }, { icon: CarFront, titleAr: "سائق ← مشرف", titleEn: "Driver → Supervisor", descAr: "أكاديمية الجزيرة / 5 سنوات", descEn: "Al Jazeera Academy / 5 years" }, { icon: Globe2, titleAr: "مشروعات ويب مستقلة", titleEn: "Independent web projects", descAr: "EMAD-LINGO و FINHIM", descEn: "EMAD-LINGO and FINHIM" }, { icon: Route, titleAr: "فكرة رياضية جديدة", titleEn: "A new sport concept", descAr: "بلاطات / المؤسس والمبتكر", descEn: "Blaat / founder and creator" }].map(({ icon: Icon, titleAr, titleEn, descAr, descEn }, index) => <article className={`achievement-card reveal reveal-delay-${(index % 4) + 1}`} key={titleAr}><Icon size={23} /><span>0{index + 1}</span><h3>{isArabic ? titleAr : titleEn}</h3><p>{isArabic ? descAr : descEn}</p></article>)}</div></div></section>

      <section id="resumes" className="paper-section resumes-section"><div className="container"><SectionIntro kicker={t.resumesKicker} title={isArabic ? "ثلاث زوايا لملف واحد." : "Three lenses for one professional file."} body={isArabic ? "ثلاثة ملفات مهنية جاهزة للتحميل: السيرة الشاملة، القيادة وإدارة الأسطول، والرقمي والذكاء الاصطناعي والتسويق." : "Three professional files ready to download: the master profile, driver and fleet management, and digital, AI, and marketing."} number="10" /><div className="resume-grid">{resumeFiles.map((resume, index) => <article className="resume-card reveal reveal-delay-1" key={resume.titleAr}><div className="resume-cover"><span>CV / 0{index + 1}</span><div className="resume-cover-mark"><img src={assets.mark} alt="" /><span>EH</span></div><strong>{isArabic ? resume.titleAr : resume.titleEn}</strong></div><div className="resume-card-body"><p>{isArabic ? resume.audienceAr : resume.audienceEn}</p><a className="text-link" href={resume.url} download={resume.fileName} aria-label={`${t.download}: ${isArabic ? resume.titleAr : resume.titleEn}`}>{t.download} <Download size={15} /></a></div></article>)}</div><div className="available-file reveal"><div><FileCheck2 size={19} /><div><p className="eyebrow">{isArabic ? "ملف متاح حالياً" : "Available now"}</p><h3>{isArabic ? "Courses & Award PDF" : "Courses & Award PDF"}</h3></div></div><a className="text-link" href={assets.coursesAwards} {...externalProps}>{t.openPdf} <ArrowUpRight size={15} /></a></div></div></section>

      <section id="contact" className="ink-section contact-section"><div className="container contact-inner"><SectionIntro kicker={t.contactKicker} title={t.contactTitle} body={isArabic ? "للتعاون المهني أو طلب ملف محدد، تواصل عبر البريد أو LinkedIn أو روابط المحتوى والمشروعات المعروضة." : "For professional collaboration or a specific file request, use email, LinkedIn, or the displayed project and content links."} number="11" /><div className="contact-actions reveal"><a className="contact-action" href="https://www.linkedin.com/in/emad-hamdy-41a650213/" {...externalProps}><span><Linkedin size={21} /></span><div><small>{isArabic ? "الملف المهني" : "Professional profile"}</small><strong>LinkedIn</strong></div><ArrowUpRight size={17} /></a><a className="contact-action" href="https://waziramisriya.blogspot.com/" {...externalProps}><span><BookOpen size={21} /></span><div><small>{isArabic ? "مدونة أفكار ومقالات" : "Ideas and articles"}</small><strong>{isArabic ? "مدونة الوزيرة مصرية" : "Wazira Masriya Blog"}</strong></div><ArrowUpRight size={17} /></a><a className="contact-action" href="https://www.youtube.com/@ldayafakra" {...externalProps}><span><Youtube size={21} /></span><div><small>{isArabic ? "إبداع واختراعات وحلول عملية" : "Creativity, inventions, practical solutions"}</small><strong>{isArabic ? "شاعر ومخترع" : "Poet and Inventor"}</strong></div><ArrowUpRight size={17} /></a><a className="contact-action" href="mailto:emadisideas@gmail.com"><span><Mail size={21} /></span><div><small>{isArabic ? "البريد المهني" : "Professional email"}</small><strong>emadisideas@gmail.com</strong></div><ArrowUpRight size={17} /></a></div></div></section>

      <footer className="footer"><div className="container footer-inner"><div className="footer-brand"><img className="footer-icon" src={assets.identityIcon} alt="" /><span>EMAD HAMDY</span><img className="footer-seal" src={assets.mark} alt="" /></div><p>© {new Date().getFullYear()} Emad Hamdy. {isArabic ? "أرشيف مهني مفتوح." : "Open professional archive."}</p><div className="footer-links"><button onClick={() => goTo("about")}>{isArabic ? "عنّي" : "About"}</button><a href="/privacy-policy">{isArabic ? "الخصوصية" : "Privacy"}</a><a href="/terms">{isArabic ? "الشروط" : "Terms"}</a></div></div></footer>
    </main>
  );
}
