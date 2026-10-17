export const profile = {
  name: "Milan Bhingradiya",
  roles: ["Associate AI Developer", "Backend Engineer"],
  tagline:
    "I build production systems end to end — from a college placement portal serving 1800+ students to a two-stage YOLO11m PPE-detection pipeline deployed on edge NPUs.",
  email: "milanbhingradiya00@gmail.com",
  phone: "+91 9016064322",
  github: "https://github.com/Milan-Bhingradiya",
  linkedin: "https://linkedin.com/in/milanbhingradiya",
  location: "Vadodara, Gujarat, India",
};

export const stats = [
  { value: "2+", label: "years shipping production" },
  { value: "130+", label: "REST APIs in production" },
  { value: "0.399 → 0.883", label: "mAP on PPE pipeline" },
  { value: "8.87", label: "CGPA, B.E. AI & ML" },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Matrix Comsec Pvt. Ltd.",
    role: "Associate AI Developer, Software Engineering",
    period: "Jan 2026 – Present",
    location: "India",
    points: [
      "Engineered a two-stage YOLO11m PPE detection pipeline on live industrial CCTV, lifting mAP@0.5 from 0.399 to 0.883 on a 145K+ image corpus via 5 progressive data-engineering heuristics — a 2.2x gain with no architecture changes.",
      "Formulated IoU-based anatomical semantic matching and relative-area spatial filtering to resolve worn-vs-unattended PPE and multi-person label ambiguity.",
      "Full edge deployment: PyTorch → ONNX → INT8/INT16 quantization to Kneron KL730 NPU with <1.2% mAP degradation at 20x GPU power efficiency.",
      "MLOps stack: LakeFS over S3 for 150K+ images, Ray 7-node distributed training at 91% GPU utilization, MLflow Champion–Challenger registry, GitHub Actions CI/CD.",
    ],
  },
  {
    company: "apeing.ai",
    role: "Full Stack Developer",
    period: "Aug 2025 – Dec 2025",
    location: "Remote",
    points: [
      "Built a pump.fun-style meme-coin trading platform in Next.js — frontend plus live data integration.",
      "Handled live chart data for 100+ meme coins per second, with Solana coin data streamed as protobuf from a third-party provider.",
    ],
  },
  {
    company: "L.D. College of Engineering",
    role: "Backend Developer",
    period: "Aug 2024 – Aug 2025",
    location: "Ahmedabad, India",
    points: [
      "Led backend for the college placement portal: 130+ REST APIs, 25+ PostgreSQL tables (Prisma ORM), Redis caching.",
      "BullMQ background jobs with Amazon SES bulk mailing for 1800+ students; cut eligibility-filtering time from 10 minutes to 10–15 seconds.",
      "Deployed on a Linux VPS — the portal remains in production use by the training-and-placement cell.",
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  badge?: string;
  category: "AI" | "Web" | "App";
};

export const projects: Project[] = [
  {
    title: "Two-Stage PPE Detection Pipeline",
    category: "AI",
    description:
      "Production YOLO11m pipeline on live industrial CCTV. Two-stage design with IoU-based anatomical matching; mAP@0.5 lifted from 0.399 to 0.883 on 145K+ images, then quantized to INT8/INT16 and deployed on the Kneron KL730 edge NPU.",
    tech: ["PyTorch", "ONNX", "Kneron KL730", "Ray", "MLflow"],
    badge: "Flagship",
  },
  {
    title: "Placement Cell Portal",
    category: "Web",
    description:
      "Centralized campus hiring platform for training-and-placement officers — eligibility filtering, resume collection, consent automation and bulk mailing. 130+ APIs, still in production.",
    tech: ["Node.js", "TypeScript", "PostgreSQL", "Prisma", "Redis", "BullMQ"],
    badge: "In production",
  },
  {
    title: "apeing.ai — Meme Coin Trading Platform",
    category: "Web",
    description:
      "pump.fun-style trading platform. Frontend plus live data integration — chart data for 100+ coins per second with Solana streams over protobuf.",
    tech: ["Next.js", "TypeScript", "Solana", "protobuf"],
  },
  {
    title: "Bus Tracking App",
    category: "App",
    description:
      "Cross-platform real-time bus tracking with MVVM architecture — live GPS, route polylines, geocoding, OTP login and push notifications.",
    tech: ["Flutter", "Dart", "Firebase", "Google Maps"],
    link: "https://github.com/Milan-Bhingradiya/Bustrackingapp_flutter_MVVM",
  },
  {
    title: "Client Portfolio Website",
    category: "Web",
    description:
      "Freelance portfolio site with a markdown blog (syntax-highlighted code blocks) and cloud media management, deployed on Vercel.",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "MongoDB", "Cloudinary"],
    link: "https://github.com/Milan-Bhingradiya/client_portfolio",
  },
  {
    title: "LDCE Confessions Platform",
    category: "Web",
    description:
      "Anonymous student forum with unlimited multi-level nested comments via recursive rendering and a unique pause-and-discuss feature.",
    tech: ["Next.js", "Java Spring Boot", "MongoDB"],
  },
  {
    title: "Brain Tumor Detection",
    category: "AI",
    description:
      "CNN classifier for brain tumors on MRI scans — Conv2D/MaxPooling/Dropout architecture with data augmentation for medical image evaluation.",
    tech: ["TensorFlow", "CNN", "Python"],
  },
  {
    title: "Movie Recommendation System",
    category: "AI",
    description:
      "Content-based recommender using cosine similarity over TF-IDF vectors — top-10 instant recommendations served through a Streamlit app.",
    tech: ["Python", "scikit-learn", "Pandas", "Streamlit"],
  },
];

export const skillGroups = [
  { title: "Languages", skills: ["Python", "TypeScript", "JavaScript", "Java", "C++", "Dart"] },
  { title: "Frontend", skills: ["Next.js", "React", "Flutter", "Tailwind CSS"] },
  { title: "Backend", skills: ["Node.js", "Express", "Spring Boot", "FastAPI", "REST APIs"] },
  { title: "Data", skills: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "Prisma"] },
  { title: "AI / ML", skills: ["PyTorch", "ONNX", "TensorFlow", "scikit-learn", "MLflow", "Ray"] },
  { title: "Infra", skills: ["Docker", "AWS (S3, SES)", "GitHub Actions", "BullMQ", "Linux"] },
];

export const achievements = [
  {
    title: "Corporate Hackathon Winner",
    detail: "1st place and ₹30,000 prize, competing against senior engineers.",
  },
];

export const education = {
  school: "L.D. College of Engineering",
  degree: "B.E. in Artificial Intelligence and Machine Learning",
  period: "2023 – 2026",
  extra: "CGPA 8.87",
};
