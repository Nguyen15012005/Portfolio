/**
 * Centralized portfolio content.
 * Keep this file factual: avoid sample jobs, fake testimonials, or links that do not exist yet.
 */

export const personalInfo = {
  name: "Nguyễn Nam Trung Nguyên",
  nameShort: "Trung Nguyên",
  nickname: "TN Dev",
  role: "Software Engineering Student",
  roleAlt: "Backend / Full Stack Developer",
  tagline: "Building practical web apps with React, Spring Boot, and Node.js",
  description:
    "Software Engineering student at Industrial University of Ho Chi Minh City, focused on building full-stack web applications with React, Java/Spring Boot, and databases. I enjoy turning ideas into working products, learning by building, and improving code quality through real projects.",
  location: "Ho Chi Minh City, Vietnam",
  email: "nguyennamtrungnguyen@gmail.com",
  phone: "0825570615",
  website: "",
  resumeUrl: "",
  avatar: "/avatar.jpg?v=20260713",

  typingTexts: [
    "React Developer",
    "Java Developer",
    "Spring Boot Developer",
    "Backend Developer",
    "Full Stack Developer",
  ],

  social: {
    github: "https://github.com/Nguyen15012005",
    linkedin:
      "https://www.linkedin.com/in/nguy%C3%AAn-nguy%E1%BB%85n-nam-trung-8687a9381/",
    facebook: "https://www.facebook.com/trungnguyen1501.05",
    email: "mailto:nguyennamtrungnguyen@gmail.com",
  },
};

export const stats = [
  { label: "Featured Projects", value: 4, suffix: "", icon: "FolderKanban" },
  { label: "Full Stack Apps", value: 2, suffix: "", icon: "Code2" },
  { label: "Years Learning", value: 3, suffix: "+", icon: "Calendar" },
  { label: "Core Stacks", value: 3, suffix: "", icon: "Award" },
];

export const aboutTimeline = [
  {
    year: "2022",
    title: "Began Programming Journey",
    description:
      "Started learning programming fundamentals and web development with HTML, CSS, JavaScript, and small static projects.",
    icon: "Rocket",
    color: "primary",
  },
  {
    year: "2023",
    title: "Java & Backend Fundamentals",
    description:
      "Studied Java OOP, database fundamentals, REST API design, and backend development concepts.",
    icon: "Server",
    color: "secondary",
  },
  {
    year: "2023",
    title: "React & Frontend Ecosystem",
    description:
      "Built interfaces with React, Redux, JavaScript/TypeScript, and Tailwind CSS. Learned component design, routing, and state management.",
    icon: "Layers",
    color: "accent",
  },
  {
    year: "2024",
    title: "Full Stack Projects",
    description:
      "Built full-stack applications with React, Node.js/Express, Java/Spring Boot, MySQL, and MongoDB.",
    icon: "Database",
    color: "primary",
  },
  {
    year: "2025",
    title: "Cross-platform Development",
    description:
      "Expanded DailyZone into web and mobile clients using ReactJS, React Native, and a shared Spring Boot backend.",
    icon: "Container",
    color: "secondary",
  },
];

export const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "Monitor",
    color: "#38bdf8",
    skills: [
      { name: "HTML5", level: 90, icon: "SiHtml5", color: "#E44D26" },
      { name: "CSS3", level: 85, icon: "SiCss3", color: "#264DE4" },
      { name: "JavaScript", level: 85, icon: "SiJavascript", color: "#F7DF1E" },
      { name: "TypeScript", level: 70, icon: "SiTypescript", color: "#3178C6" },
      { name: "React", level: 85, icon: "SiReact", color: "#61DAFB" },
      { name: "Redux", level: 75, icon: "SiRedux", color: "#764ABC" },
      {
        name: "Tailwind CSS",
        level: 90,
        icon: "SiTailwindcss",
        color: "#06B6D4",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "Server",
    color: "#2563eb",
    skills: [
      { name: "Java", level: 85, icon: "SiJava", color: "#EA2D2E" },
      { name: "Spring Boot", level: 80, icon: "SiSpring", color: "#6DB33F" },
      {
        name: "Spring Security",
        level: 70,
        icon: "SiSpringsecurity",
        color: "#6DB33F",
      },
      {
        name: "JPA / Hibernate",
        level: 75,
        icon: "SiHibernate",
        color: "#BCAE79",
      },
      {
        name: "REST API",
        level: 85,
        icon: "SiOpenapiinitiative",
        color: "#85EA2D",
      },
      { name: "Node.js", level: 75, icon: "SiNodedotjs", color: "#5FA04E" },
      { name: "Express", level: 75, icon: "SiExpress", color: "#ffffff" },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: "Database",
    color: "#22c55e",
    skills: [
      { name: "MySQL", level: 80, icon: "SiMysql", color: "#4479A1" },
      { name: "MongoDB", level: 75, icon: "SiMongodb", color: "#47A248" },
      { name: "PostgreSQL", level: 65, icon: "SiPostgresql", color: "#336791" },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: "Container",
    color: "#f59e0b",
    skills: [
      { name: "Docker", level: 65, icon: "SiDocker", color: "#2496ED" },
      { name: "Git", level: 85, icon: "SiGit", color: "#F05032" },
      { name: "GitHub", level: 85, icon: "SiGithub", color: "#ffffff" },
      { name: "Vercel", level: 70, icon: "SiVercel", color: "#ffffff" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "Wrench",
    color: "#a855f7",
    skills: [
      {
        name: "VS Code",
        level: 90,
        icon: "SiVisualstudiocode",
        color: "#007ACC",
      },
      {
        name: "IntelliJ IDEA",
        level: 85,
        icon: "SiIntellijidea",
        color: "#FE315D",
      },
      { name: "Postman", level: 85, icon: "SiPostman", color: "#FF6C37" },
      { name: "Figma", level: 65, icon: "SiFigma", color: "#F24E1E" },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "VShop - DailyZone Cross Platform",
    shortDesc: "Cross-platform e-commerce platform for web and mobile",
    description:
      "A cross-platform e-commerce platform built with React Native, ReactJS, Spring Boot, and MySQL. The system supports product management, cart, orders, authentication, and an admin/user web experience.",
    category: "fullstack",
    image: "",
    demo: "https://dailyzone-cross-platform.vercel.app",
    github:
      "https://github.com/Nguyen15012005/Ecommerce-DailyZone-Cross-Platform",
    featured: true,
    techStack: [
      "React Native",
      "ReactJS",
      "Spring Boot",
      "MySQL",
      "JWT",
      "REST API",
    ],
    features: [
      "Product, category, and inventory management",
      "Web client with ReactJS and mobile client with React Native",
      "Shopping cart, checkout, and order tracking",
      "JWT authentication and authorization",
      "Admin dashboard for management",
    ],
    architecture: {
      description:
        "Spring Boot REST APIs serve both the React web app and the React Native mobile app.",
      layers: [
        "React Native App",
        "ReactJS Web App",
        "Spring Boot REST API",
        "MySQL Database",
      ],
      diagram: "React Native / ReactJS -> Spring Boot REST API -> MySQL",
    },
    database: {
      description: "MySQL database for e-commerce data.",
      tables: [
        "users",
        "products",
        "categories",
        "orders",
        "order_items",
        "cart",
      ],
      highlights: "Relational schema for core shopping flows",
    },
    api: {
      description: "REST APIs for authentication, products, cart, and orders.",
      endpoints: [
        "POST /api/auth/login - User login",
        "GET /api/products - Product list",
        "POST /api/orders - Place order",
        "GET /api/orders/user - User orders",
      ],
    },
  },
  {
    id: 2,
    title: "DailyZone Store",
    shortDesc: "Full-stack e-commerce application with MERN stack",
    description:
      "DailyZone Store is an e-commerce application for browsing products, managing a cart, and completing a checkout flow.",
    category: "fullstack",
    image: "",
    demo: "https://dailyzone-store.vercel.app/",
    github: "https://github.com/Nguyen15012005/E-commerce-DailyZone-FullStack",
    featured: true,
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    features: [
      "Responsive shopping interface",
      "Product listing and detail flow",
      "Cart and checkout flow",
      "Backend APIs with Express",
      "MongoDB data storage",
    ],
    architecture: {
      description:
        "MERN architecture with a React frontend and an Express backend.",
      layers: ["React Frontend", "Express/Node.js Backend", "MongoDB Database"],
      diagram: "React SPA -> Node.js / Express API -> MongoDB",
    },
    database: {
      description: "MongoDB document database for products, users, and orders.",
      tables: ["users", "products", "orders", "sessions"],
      highlights: "Flexible document model for product data",
    },
    api: {
      description: "REST API for product and checkout workflows.",
      endpoints: [
        "GET /api/v1/products - Fetch products",
        "POST /api/v1/checkout - Process checkout",
        "GET /api/v1/users/profile - Get user profile",
      ],
    },
  },
  {
    id: 3,
    title: "MiniAppQuiz",
    shortDesc: "Small quiz app for multiple-choice questions",
    description:
      "A compact quiz application for answering multiple-choice questions, calculating a score, and reviewing correct/incorrect answers.",
    category: "frontend",
    image: "",
    demo: "https://github.com/Nguyen15012005/MiniAppQuiz",
    github: "https://github.com/Nguyen15012005/MiniAppQuiz",
    featured: false,
    techStack: ["React", "JavaScript", "CSS"],
    features: [
      "Multiple-choice question flow",
      "Automatic scoring",
      "Correct/incorrect answer review",
      "Simple client-side state management",
    ],
    architecture: {
      description: "Frontend-only SPA that handles quiz state on the client.",
      layers: ["React Components", "Client State", "Static Question Data"],
      diagram: "React View <-> Component State",
    },
    database: {
      description: "Uses static question data.",
      tables: [],
      highlights: "No backend required",
    },
    api: {
      description: "Static or mock data loading.",
      endpoints: ["GET /data/questions.json - Fetch questions"],
    },
  },
  {
    id: 4,
    title: "Java Distributed Programming",
    shortDesc: "Java coursework repository for sockets, RMI, and threads",
    description:
      "A repository for practicing distributed programming concepts in Java, including socket programming, Java RMI, multithreading, and client-server communication.",
    category: "backend",
    image: "",
    demo: "https://github.com/Nguyen15012005/Learn-Java-Distributed-Programming",
    github:
      "https://github.com/Nguyen15012005/Learn-Java-Distributed-Programming",
    featured: false,
    techStack: ["Java", "Java RMI", "Socket Programming", "Threads"],
    features: [
      "TCP/UDP socket programming",
      "Java RMI examples",
      "Multithreaded server practice",
      "Client-server communication exercises",
    ],
    architecture: {
      description:
        "Traditional Java client-server architecture using Socket/RMI.",
      layers: ["Java Client", "Network Layer", "Java Server"],
      diagram: "Java Client <-> Socket / RMI <-> Java Server",
    },
    database: {
      description: "Focuses on networking and in-memory/file-based examples.",
      tables: [],
      highlights: "Coursework practice repository",
    },
    api: {
      description: "Custom socket protocols and RMI interfaces.",
      endpoints: [
        "RMI RemoteInterface.executeTask()",
        "Socket TCP port listeners",
      ],
    },
  },
];

export const experiences = [
  {
    id: 1,
    title: "Full Stack Developer - DailyZone Cross Platform",
    company: "Personal Project",
    companyUrl:
      "https://github.com/Nguyen15012005/Ecommerce-DailyZone-Cross-Platform",
    location: "Ho Chi Minh City",
    type: "Personal Project",
    period: "2025 - Present",
    duration: "Ongoing",
    description:
      "Built a cross-platform e-commerce project using ReactJS, React Native, Spring Boot, and MySQL.",
    responsibilities: [
      "Designed REST APIs for products, carts, orders, and authentication",
      "Built web and mobile clients that consume the same backend",
      "Implemented JWT-based authentication and authorization",
      "Designed MySQL tables for users, products, orders, and cart data",
    ],
    techStack: ["React", "React Native", "Spring Boot", "MySQL", "JWT"],
    color: "primary",
  },
  {
    id: 2,
    title: "Full Stack Developer - DailyZone Store",
    company: "Personal Project",
    companyUrl:
      "https://github.com/Nguyen15012005/E-commerce-DailyZone-FullStack",
    location: "Ho Chi Minh City",
    type: "Personal Project",
    period: "2024 - 2025",
    duration: "Project",
    description:
      "Developed a MERN e-commerce application with product browsing, cart, checkout flow, and responsive UI.",
    responsibilities: [
      "Built a React frontend for shopping and cart flows",
      "Created Express APIs for products, users, and checkout",
      "Used MongoDB for flexible product and order data",
      "Deployed the frontend demo on Vercel",
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    color: "secondary",
  },
  {
    id: 3,
    title: "Java Distributed Programming Practice",
    company: "Course Repository",
    companyUrl:
      "https://github.com/Nguyen15012005/Learn-Java-Distributed-Programming",
    location: "Ho Chi Minh City",
    type: "University Project",
    period: "2024",
    duration: "Coursework",
    description:
      "Practiced distributed programming concepts with Java sockets, RMI, multithreading, and client-server communication.",
    responsibilities: [
      "Implemented TCP/UDP socket communication",
      "Practiced Java RMI interfaces and remote method calls",
      "Handled concurrent client-server flows with threads",
      "Documented exercises and reusable examples",
    ],
    techStack: ["Java", "Socket Programming", "Java RMI", "Threads"],
    color: "accent",
  },
];

export const education = [
  {
    id: 1,
    type: "university",
    title: "Bachelor of Software Engineering",
    institution: "Industrial University of Ho Chi Minh City",
    institutionUrl: "https://iuh.edu.vn/",
    period: "2023 - 2027",
    status: "In Progress",
    gpa: "",
    description:
      "Major in Software Engineering. Relevant coursework includes data structures, databases, software engineering, networks, and distributed programming.",
    highlights: [
      "Software Engineering major",
      "Focus on full-stack web development",
      "Coursework includes databases, software engineering, networks, and distributed programming",
    ],
    icon: "GraduationCap",
    color: "primary",
  },
  {
    id: 2,
    type: "course",
    title: "Java Spring Boot Professional",
    institution: "Udemy - Chad Darby",
    institutionUrl: "https://udemy.com",
    period: "2023",
    status: "Self-study",
    description:
      "Spring Boot course covering Spring Core, Spring MVC, Spring REST, Spring Security, JPA/Hibernate, and Thymeleaf.",
    highlights: ["Spring Boot", "Spring Security", "JPA / Hibernate"],
    icon: "Award",
    color: "secondary",
  },
  {
    id: 3,
    type: "course",
    title: "React - The Complete Guide",
    institution: "Udemy - Maximilian Schwarzmüller",
    institutionUrl: "https://udemy.com",
    period: "2023",
    status: "Self-study",
    description:
      "React course covering components, hooks, Context, Redux, routing, Next.js basics, and testing fundamentals.",
    highlights: ["React Hooks", "Redux", "React Router"],
    icon: "Award",
    color: "accent",
  },
  {
    id: 4,
    type: "course",
    title: "Docker & Kubernetes: The Practical Guide",
    institution: "Udemy - Maximilian Schwarzmüller",
    institutionUrl: "https://udemy.com",
    period: "2024",
    status: "Self-study",
    description:
      "Docker fundamentals, Docker Compose, Kubernetes basics, and deployment strategies.",
    highlights: ["Docker", "Docker Compose", "Deployment basics"],
    icon: "Award",
    color: "primary",
  },
  {
    id: 5,
    type: "course",
    title: "SQL & Database Design Bootcamp",
    institution: "Udemy - Jose Portilla",
    institutionUrl: "https://udemy.com",
    period: "2023",
    status: "Self-study",
    description:
      "SQL from basic to advanced, database design, PostgreSQL, and query optimization.",
    highlights: ["SQL", "Database design", "Query optimization"],
    icon: "Award",
    color: "secondary",
  },
];

export const achievements = [
  {
    label: "Featured Projects",
    value: 4,
    suffix: "",
    icon: "CheckCircle",
    color: "accent",
  },
  {
    label: "Full Stack Apps",
    value: 2,
    suffix: "",
    icon: "Code2",
    color: "primary",
  },
  {
    label: "Backend Repos",
    value: 1,
    suffix: "+",
    icon: "GitCommit",
    color: "secondary",
  },
  {
    label: "Core Technologies",
    value: 10,
    suffix: "+",
    icon: "FileCode",
    color: "accent",
  },
];

export const achievementHighlights = [
  {
    title: "Cross-platform E-commerce Project",
    description:
      "Built DailyZone across web and mobile clients with a Spring Boot backend and MySQL database.",
    date: "2025",
    icon: "Code2",
    color: "secondary",
  },
  {
    title: "MERN E-commerce Project",
    description:
      "Built a full-stack store with React, Node.js, Express, MongoDB, and a deployed frontend demo.",
    date: "2024 - 2025",
    icon: "CheckCircle",
    color: "accent",
  },
  {
    title: "Java Distributed Programming",
    description:
      "Practiced sockets, RMI, multithreading, and client-server communication through coursework examples.",
    date: "2024",
    icon: "Github",
    color: "primary",
  },
];

export const services = [
  {
    id: 1,
    title: "Backend Development",
    description:
      "Build REST APIs with Java Spring Boot or Node.js/Express, including authentication, database access, and clean API structure.",
    icon: "Server",
    color: "#2563eb",
    features: [
      "Spring Boot REST API",
      "Node.js / Express API",
      "JWT Authentication",
      "Database Integration",
    ],
  },
  {
    id: 2,
    title: "Database Design",
    description:
      "Design practical schemas and queries for MySQL, MongoDB, and PostgreSQL based on application requirements.",
    icon: "Database",
    color: "#22c55e",
    features: [
      "Schema Design",
      "SQL Queries",
      "MongoDB Collections",
      "Query Optimization Basics",
    ],
  },
  {
    id: 3,
    title: "Frontend Development",
    description:
      "Build responsive user interfaces with React, JavaScript/TypeScript, Tailwind CSS, and modern frontend tooling.",
    icon: "Monitor",
    color: "#38bdf8",
    features: ["React", "Redux", "Tailwind CSS", "Responsive Design"],
  },
  {
    id: 4,
    title: "Full Stack Development",
    description:
      "Develop complete web applications from UI to backend APIs and database integration.",
    icon: "Layers",
    color: "#f59e0b",
    features: [
      "React + Spring Boot",
      "MERN Stack",
      "API Integration",
      "Deployment Basics",
    ],
  },
];

export const testimonials = [];

export const blogPosts = [];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
