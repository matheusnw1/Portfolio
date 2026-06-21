import { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Download,
  ArrowUpRight,
  Database,
  Brain,
  Cloud,
  Target,
  Compass,
  Flag,
  ChevronDown,
  Plus,
  X,
  ExternalLink,
  Menu,
} from "lucide-react";

const BLUE = "#003CC2";
const BLUE_SOFT = "#3b6bd6";
const GRAY = "#79797960";
const BLACK = "#00000060";

const nav = [
  { id: "about", label: "About" },
  { id: "swot", label: "SWOT" },
  { id: "skills", label: "Skills" },
  { id: "roadmap", label: "Roadmap" },
  { id: "market", label: "Market" },
  { id: "projects", label: "Projects" },
];

/* ---------------- Reusable primitives ---------------- */

function GlowCard({
  children,
  className = "",
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
<As
      ref={ref}
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget as HTMLElement;
        const r = el.getBoundingClientRect();
        
        // Fator de 120% de zoom
        const zoomFactor = 1.2;
        
        // Multiplicamos a posição da caixa pelo zoom para bater certo com o clientX real do ecrã
        // Ou dividimos o cálculo final por completo. Tenta esta fórmula:
        // const mouseX = e.clientX - r.left * zoomFactor;
        // const mouseY = e.clientY - r.top * zoomFactor;
        
        // Se a de cima ainda falhar por poucos píxeis, usa esta alternativa:
        const mouseX = (e.clientX / zoomFactor) - r.left;
        const mouseY = (e.clientY / zoomFactor) - r.top;

        el.style.setProperty("--mx", `${mouseX}px`);
        el.style.setProperty("--my", `${mouseY}px`);
      }}
      className={`glow-card rounded-lg ${className}`}
    >
      {children}
    </As>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono-bp text-[10.5px] uppercase tracking-[0.22em] text-zinc-500">
      {children}
    </div>
  );
}

function SectionHeader({
  index,
  title,
  sub,
}: {
  index: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3">
        <span className="font-mono-bp text-[10.5px] uppercase tracking-[0.25em]" style={{ color: BLUE_SOFT }}>
          {index}
        </span>
        <span className="h-px w-10 bg-zinc-800" />
        <Label>section</Label>
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
        {title}
      </h2>
      {sub && <p className="mt-2 max-w-xl text-sm text-zinc-500">{sub}</p>}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono-bp inline-flex items-center rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-100">
      {children}
    </span>
  );
}

/* ---------------- Header ---------------- */

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-900/80 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className="grid h-7 w-7 place-items-center rounded-md text-[15px] font-semibold tracking-tight text-white bg-black-900"
          >
            NW
          </span>
          <span className="font-mono-bp text-[12px] tracking-tight text-zinc-200">
            <span></span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="rounded-md px-3 py-1.5 text-[13px] text-zinc-400 transition-colors hover:bg-zinc-900/80 hover:text-zinc-100"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* 1. BOTÃO DESKTOP (Computador) - Atualizado com o seu PDF */}
          <a
            href="/Curriculo-MatheusNavarro.pdf"
            download="Matheus_Navarro_Wenceslau_Curriculo.pdf"
            className="hidden items-center gap-1.5 rounded-md px-3.5 py-2 text-[12.5px] font-medium text-white transition-all active:scale-[0.98] md:inline-flex cursor-pointer"
            style={{ background: BLUE }}
          >
            <Download className="h-3.5 w-3.5" />
            Baixar Currículo
          </a>
          
          <button
            onClick={() => setOpen(!open)}
            className="grid h-9 w-9 place-items-center rounded-md border border-zinc-800 text-zinc-300 md:hidden"
            aria-label="menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* MENU MOBILE (Celular) */}
      {open && (
        <div className="border-t border-zinc-900 bg-black px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((n) => (
              <a
                key={n.id}
                onClick={() => setOpen(false)}
                href={`#${n.id}`}
                className="rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900"
              >
                {n.label}
              </a>
            ))}
            {/* 2. BOTÃO MOBILE - Também atualizado com o seu PDF */}
            <a
              href="/Curriculo-MatheusNavarro.pdf"
              download="Matheus_Navarro_Wenceslau_Curriculo.pdf"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-white cursor-pointer"
              style={{ background: BLUE }}
            >
              <Download className="h-4 w-4" /> Baixar Currículo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Typing Code Animation ---------------- */

const CODE_LINES = [
  { lang: "python", text: "import machine_learning as ml" },
  { lang: "sql", text: "SELECT * FROM brain_interfaces;" },
  { lang: "python", text: "model = ml.train(data, epochs=42)" },
  { lang: "bash", text: "$ aws s3 sync ./models s3://nw-prod" },
  { lang: "ts", text: "const insight = await ai.infer(payload);" },
];

function TypingCode() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "hold" | "erasing">("typing");

  useEffect(() => {
    const full = CODE_LINES[i].text;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (text.length < full.length) {
        t = setTimeout(() => setText(full.slice(0, text.length + 1)), 55 + Math.random() * 45);
      } else {
        t = setTimeout(() => setPhase("hold"), 1400);
      }
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("erasing"), 900);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(full.slice(0, text.length - 1)), 28);
      } else {
        t = setTimeout(() => {
          setI((p) => (p + 1) % CODE_LINES.length);
          setPhase("typing");
        }, 350);
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, i]);

  const current = CODE_LINES[i];
  return (
    <div className="overflow-hidden rounded-md border border-zinc-800 bg-zinc-950/80">
      <div className="flex items-center justify-between border-b border-zinc-900 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <span className="h-2 w-2 rounded-full" style={{ background: BLUE_SOFT }} />
        </div>
        <span className="font-mono-bp text-[10px] uppercase tracking-[0.22em] text-zinc-500">
          ~/nw — {current.lang}
        </span>
      </div>
      <div className="font-mono-bp px-4 py-4 text-[12.5px] leading-relaxed">
        <div className="flex">
          <span className="select-none pr-4 text-zinc-700">01</span>
          <span className="text-zinc-200">
            {text}
            <span
              className="ml-0.5 inline-block h-[14px] w-[7px] translate-y-[2px] animate-pulse"
              style={{ background: BLUE_SOFT }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Hero ---------------- */


function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  
useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const glow = el.querySelector(".ambient-glow") as HTMLElement | null;
      
      if (glow) {
        const zoomFactor = 1.2;
        const mouseX = (e.clientX / zoomFactor) - r.left;
        const mouseY = (e.clientY / zoomFactor) - r.top;

        // AQUI A CORREÇÃO: Garante que o brilho do fundo nunca bloqueie os cliques do usuário
        glow.style.pointerEvents = "none";
        
        glow.style.left = `${mouseX}px`;
        glow.style.top = `${mouseY}px`;
      }
    };
    
    // Usamos { passive: true } para que o navegador saiba que esse evento não vai travar cliques ou interações
    el.addEventListener("mousemove", handler, { passive: true });
    return () => el.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden border-b border-zinc-900">
      <div className="bp-grid absolute inset-0 opacity-100" />
      <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-black/30 to-black" />
      <div className="ambient-glow" style={{ left: "50%", top: "30%" }} />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-36 md:pb-32 md:pt-44">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/70 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: BLUE_SOFT, boxShadow: `0 0 12px ${BLUE_SOFT}` }} />
              <span className="font-mono-bp text-[10.5px] uppercase tracking-[0.22em] text-zinc-400">
                Aberto para Oportunidades · Estágio 2026
              </span>
            </div>

            <h1 className="mt-7 text-5xl font-semibold leading-[1.02] tracking-tight text-zinc-100 md:text-7xl">
              Matheus Navarro
              <br />
              <span className="text-zinc-500">Wenceslau<span style={{ color: BLUE_SOFT }}>.</span></span>
            </h1>

            <p className="font-mono-bp mt-6 text-[12px] uppercase tracking-[0.28em] text-zinc-500">
              Dados · Machine Learning · Segurança em Cloud
            </p>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-[15.5px]">
              Construindo soluções de dados e inteligência artificial tecnicamente
              sólidas e eticamente responsáveis, para que a tecnologia
              <span className="text-zinc-200"> amplie</span> a capacidade humana,
              em vez de substituí-la sem critério.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-1.5 rounded-md px-4 py-2.5 text-[13px] font-medium text-white transition-transform hover:scale-[1.02]"
                style={{ background: BLUE }}
              >
                Ver Projetos
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#roadmap"
                className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-[13px] text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
              >
                Roadmap de Carreira
              </a>
            </div>
          </div>

          <div className="md:col-span-4">
            <GlowCard className="p-5">
              <Label>ID-MNW-01 · Profile</Label>
              <dl className="mt-4 space-y-2.5 font-mono-bp text-[12px]">
                {[
                  ["nome", "M. N. Wenceslau"],
                  ["foco", "Data / ML / Cloud"],
                  ["nível", "Estudante · Júnior"],
                  ["local", "Brasil"],
                  ["status", "Aberto para trabalhar"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-dashed border-zinc-900 pb-2 last:border-none">
                    <dt className="text-zinc-500">{k}</dt>
                    <dd className="text-zinc-200">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { Icon: Database, l: "data" },
                  { Icon: Brain, l: "ml" },
                  { Icon: Cloud, l: "cloud" },
                ].map(({ Icon, l }) => (
                  <div
                    key={l}
                    className="flex aspect-square flex-col items-center justify-center gap-1 rounded-md border border-zinc-800 bg-black/40"
                  >
                    <Icon className="h-4 w-4 text-zinc-300" />
                    <span className="font-mono-bp text-[9px] uppercase tracking-widest text-zinc-500">{l}</span>
                  </div>
                ))}
              </div>
            </GlowCard>
            <div className="mt-4">
              <TypingCode />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */

function About() {
  const items = [
    {
      icon: Target,
      label: "Missão",
      text:
        "Construir soluções de dados e IA tecnicamente sólidas e eticamente responsáveis, contribuindo para que a tecnologia amplie a capacidade humana em vez de substituí-la sem critério.",
    },
    {
      icon: Compass,
      label: "Visão",
      text:
        "Percorrer a jornada até virar Engenheiro de Machine Learning, começando por uma base forte em dados (SQL, ETL, cloud, análise) e usando esse caminho como ponte para projetos de ML aplicados e, no longo prazo, para neurotecnologia e BCIs.",
    },
    {
      icon: Flag,
      label: "Propósito",
      text:
        "Tornar-me um profissional que resolve problemas reais com dados, não só fazer um dashboard bonito, mas entender o problema de negócio. Automação, análise preditiva e, eventualmente, a fronteira entre IA e biologia humana.",
    },
  ];

  const values = [
    "Ética",
    "Colaboração",
    "Aprendizado contínuo",
    "Honestidade técnica",
    "Persistência",
    "Responsabilidade com dados/IA",
  ];

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeader index="00" title="Identidade & Autoconhecimento" sub="Quem sou, para onde vou, e por quê." />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map(({ icon: Icon, label, text }) => (
          <GlowCard key={label} className="p-6">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md border border-zinc-800 bg-black/40">
                <Icon className="h-4 w-4" style={{ color: BLUE_SOFT }} />
              </span>
              <Label>{label}</Label>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-zinc-400">{text}</p>
          </GlowCard>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-5">
        <GlowCard className="p-6 md:col-span-2">
          <Label>Valores Centrais</Label>
          <div className="mt-4 flex flex-wrap gap-2">
            {values.map((v) => (
              <Pill key={v}>{v}</Pill>
            ))}
          </div>
        </GlowCard>
        <GlowCard className="p-6 md:col-span-3">
          <Label>Por que Dados & ML</Label>
          <p className="mt-4 text-[14px] leading-relaxed text-zinc-400">
            Dados e ML unem lógica, matemática e impacto prático visível, dá para
            ver o resultado do que se constrói. Cheguei a essa área depois de
            considerar cibersegurança, cloud/DevOps e pesquisa em IA, e converti
            porque é o caminho de entrada mais viável,{" "}
            <span className="text-zinc-200">mantendo a porta aberta para IA/ML no futuro</span>.
          </p>
        </GlowCard>
      </div>
    </section>
  );
}

/* ---------------- SWOT ---------------- */

function SWOT() {
  const [tab, setTab] = useState<"S" | "W" | "O" | "T">("S");
  const data = {
    S: {
      title: "Forças",
      items: [
        "Facilidade com lógica e raciocínio estruturado",
        "Persistência em problemas difíceis",
        "Curiosidade genuína, pergunto 'por quê', não só 'como'",
        "Aprendizado fazendo (projetos reais > só cursos)",
        "Base técnica de TI no ensino médio",
      ],
    },
    W: {
      title: "Fraquezas",
      items: [
        "Experiência profissional formal ainda em construção",
        "Inglês ainda não totalmente fluente",
        "Portfólio precisa de manutenção e documentação contínua",
      ],
    },
    O: {
      title: "Oportunidades",
      items: [
        "Mercado de dados e IA em expansão no Brasil",
        "Vagas de estágio voltadas a estudantes",
        "Comunidade técnica acessível (Discord, LinkedIn, eventos)",
        "Aprender publicamente via projetos abertos",
      ],
    },
    T: {
      title: "Ameaças",
      items: [
        "Alta competitividade para vagas júnior",
        "Mudança rápida de ferramentas e frameworks",
        "Incerteza sobre impacto da IA generativa em vagas de entrada",
      ],
    },
  } as const;

  const Quad = (k: keyof typeof data) => (
    <GlowCard className="p-6">
      <div className="flex items-center justify-between">
        <Label>{k} · {data[k].title}</Label>
        <span
          className="font-mono-bp grid h-7 w-7 place-items-center rounded-md border text-[11px]"
          style={{ borderColor: "#1f1f23", color: BLUE_SOFT }}
        >
          {k}
        </span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {data[k].items.map((it) => (
          <li key={it} className="flex gap-2.5 text-[13.5px] text-zinc-400">
            <span className="mt-2 inline-block h-px w-3 shrink-0 bg-zinc-700" />
            {it}
          </li>
        ))}
      </ul>
    </GlowCard>
  );

  return (
    <section id="swot" className="border-y border-zinc-900 bg-zinc-950/30">
      <div className="bp-grid-fine">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <SectionHeader index="01" title="Análise SWOT" sub="Matriz 2×2 com estratégia cruzada." />

          <div className="hidden grid-cols-2 gap-5 md:grid">
            {(["S", "W", "O", "T"] as const).map((k) => (
              <div key={k}>{Quad(k)}</div>
            ))}
          </div>

          {/* Mobile tabs */}
          <div className="md:hidden">
            <div className="mb-4 inline-flex rounded-md border border-zinc-800 bg-zinc-950 p-1">
              {(["S", "W", "O", "T"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`font-mono-bp rounded-[5px] px-3 py-1.5 text-[11px] uppercase tracking-widest transition-colors ${
                    tab === k ? "text-white" : "text-zinc-400"
                  }`}
                  style={tab === k ? { background: BLUE } : {}}
                >
                  {k}
                </button>
              ))}
            </div>
            {Quad(tab)}
          </div>

          <GlowCard className="mt-6 p-6">
            <Label>↳ Estratégia Cruzada</Label>
            <p className="mt-4 text-[14px] leading-relaxed text-zinc-300">
              Vou usar minha <span className="text-zinc-100">persistência e curiosidade</span> para
              compensar a falta de experiência formal, construindo{" "}
              <span className="text-zinc-100">projetos reais e documentados</span> que provem
              capacidade prática. Para a competitividade do mercado, foco em{" "}
              <span className="text-zinc-100">nicho</span> (dados aplicados a ML) em vez de competir
              generalistamente. Ataco o inglês com prática ativa (documentação técnica, conteúdo
              em inglês) e a falta de experiência com{" "}
              <span className="text-zinc-100">contribuições open source</span> e projetos freelance.
            </p>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */

function Skills() {
  const current = ["Python", "SQL", "C", "C++", "HTML", "CSS", "JavaScript", "Git"];
  const toDev = [
    { name: "AWS (Lambda, S3)", level: 35, why: "Infraestrutura cloud aplicada a dados via projetos reais." },
    { name: "Power BI & Power Automate", level: 40, why: "Visualização e automação de processos por prática direta." },
    { name: "Estatística & ML", level: 25, why: "Regressão, classificação, avaliação, datasets reais (Kaggle) + papers." },
    { name: "Inglês técnico", level: 60, why: "Documentação avançada e comunidades internacionais." },
  ];
  const softCurrent = [
    "Proatividade",
    "Comunicação direta",
    "Pedir ajuda / admitir não saber",
    "Disciplina autônoma",
  ];
  const softDev = [
    { t: "Paciência com processos longos", i: "Evitar ansiedade sobre ritmo e comparações precipitadas." },
    { t: "Networking ativo", i: "Oportunidades relevantes tendem a vir de conexões, não só currículo." },
  ];

  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeader index="02" title="Skills & Competências" sub="Estado atual e metas de desenvolvimento." />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <GlowCard className="p-6">
          <Label>Hard Skills · Atuais</Label>
          <div className="mt-4 flex flex-wrap gap-2">
            {current.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
        </GlowCard>
        <GlowCard className="p-6">
          <Label>Soft Skills · Atuais</Label>
          <div className="mt-4 flex flex-wrap gap-2">
            {softCurrent.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
        </GlowCard>
      </div>

      <GlowCard className="mt-5 p-6">
        <Label>↳ Hard Skills · A Desenvolver</Label>
        <div className="mt-5 space-y-5">
          {toDev.map((s) => (
            <div key={s.name}>
              <div className="mb-2 flex items-baseline justify-between">
                <div className="font-mono-bp text-[13px] text-zinc-200">{s.name}</div>
                <div className="font-mono-bp text-[11px] text-zinc-500">{s.level}%</div>
              </div>
              <div className="relative h-1 w-full overflow-hidden rounded-full bg-zinc-900">
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${s.level}%`,
                    background: `linear-gradient(90deg, ${BLUE}, ${BLUE_SOFT})`,
                    boxShadow: `0 0 14px ${BLUE}55`,
                  }}
                />
              </div>
              <p className="mt-2 text-[12.5px] text-zinc-500">{s.why}</p>
            </div>
          ))}
        </div>
      </GlowCard>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {softDev.map((s) => (
          <GlowCard key={s.t} className="p-6">
            <Label>Soft Skill · A Desenvolver</Label>
            <div className="mt-3 text-[15px] font-medium text-zinc-100">{s.t}</div>
            <p className="mt-2 text-[13.5px] text-zinc-400">
              <span className="font-mono-bp text-[10.5px] uppercase tracking-widest" style={{ color: BLUE_SOFT }}>
                Impacto ·{" "}
              </span>
              {s.i}
            </p>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Roadmap ---------------- */

function Roadmap() {
  const steps = [
    {
      tag: "Curto Prazo · 6 meses",
      title: "Primeiro estágio em Dados/TI",
      items: [
        "Conseguir o primeiro estágio em Dados/TI",
        "Documentação dos projetos sempre atualizada e clara",
        "Consolidar lógica de programação e estruturas de dados",
      ],
    },
    {
      tag: "Médio Prazo · 1–2 anos",
      title: "Júnior em Dados ou ML",
      items: [
        "Consolidar experiência prática profissional em dados",
        "Construir +1 projeto com Machine Learning aplicado",
        "Avançar para cargo júnior em Dados ou ML",
      ],
    },
    {
      tag: "Longo Prazo · >2 anos",
      title: "Engenheiro de Machine Learning",
      items: [
        "Tornar-me Engenheiro de Machine Learning",
        "Explorar interseção IA × Neurotecnologia / BCIs",
      ],
    },
  ];

  const plan = [
    {
      what: "Estágio em Dados",
      why: "Validar prática e gerar histórico profissional",
      where: "Empresas BR · remoto/híbrido",
      when: "Próximos 6 meses",
      who: "Eu + mentores + comunidade",
      how: "Aplicar 5 vagas/sem · projetos no GitHub",
      cost: "Tempo: ~10h/sem",
    },
    {
      what: "Projeto ML aplicado",
      why: "Provar capacidade técnica em ML real",
      where: "GitHub · Kaggle",
      when: "6–12 meses",
      who: "Eu",
      how: "Dataset real · pipeline + modelo + relatório",
      cost: "Tempo: ~6h/sem",
    },
    {
      what: "Inglês técnico fluente",
      why: "Documentação avançada e comunidades intl.",
      where: "Online · docs oficiais",
      when: "12 meses",
      who: "Eu",
      how: "Leitura diária + escrita em inglês",
      cost: "~R$ 0 (recursos free)",
    },
  ];

  return (
    <section id="roadmap" className="border-y border-zinc-900 bg-zinc-950/30">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <SectionHeader index="03" title="Roadmap & Plano de Ação" sub="Timeline + matriz 5W2H." />

        <div className="relative">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-zinc-800 md:left-1/2" />
          <ul className="space-y-10">
            {steps.map((s, idx) => (
              <li key={s.title} className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className={`${idx % 2 ? "md:order-2 md:justify-self-start" : "md:justify-self-end"} pl-10 md:pl-0 md:max-w-md md:w-full`}>
                  <GlowCard className="p-6">
                    <Label>{s.tag}</Label>
                    <div className="mt-2 text-[16px] font-medium text-zinc-100">{s.title}</div>
                    <ul className="mt-3 space-y-1.5 text-[13.5px] text-zinc-400">
                      {s.items.map((i) => (
                        <li key={i} className="flex gap-2.5">
                          <span className="mt-2 h-px w-3 shrink-0 bg-zinc-700" />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </GlowCard>
                </div>
                <span
                  className="absolute left-3 top-6 grid h-3.5 w-3.5 -translate-x-1/2 place-items-center rounded-full border-2 bg-black md:left-1/2"
                  style={{ borderColor: BLUE_SOFT, boxShadow: `0 0 14px ${BLUE}88` }}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* 5W2H */}
        <div className="mt-16">
          <Label>Plano Estratégico · 5W2H</Label>
          <div className="mt-4 overflow-x-auto rounded-lg border border-zinc-900 bg-zinc-950/60">
            <table className="w-full border-collapse text-left text-[13px]">
              <thead className="bg-zinc-950">
                <tr className="font-mono-bp text-[10.5px] uppercase tracking-widest text-zinc-500">
                  {["What", "Why", "Where", "When", "Who", "How", "How Much"].map((h) => (
                    <th key={h} className="border-b border-zinc-900 px-4 py-3 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plan.map((r, i) => (
                  <tr key={i} className="align-top transition-colors hover:bg-zinc-900/40">
                    <td className="border-b border-zinc-900 px-4 py-4 font-medium text-zinc-100">{r.what}</td>
                    <td className="border-b border-zinc-900 px-4 py-4 text-zinc-400">{r.why}</td>
                    <td className="border-b border-zinc-900 px-4 py-4 text-zinc-400">{r.where}</td>
                    <td className="border-b border-zinc-900 px-4 py-4 text-zinc-400">{r.when}</td>
                    <td className="border-b border-zinc-900 px-4 py-4 text-zinc-400">{r.who}</td>
                    <td className="border-b border-zinc-900 px-4 py-4 text-zinc-400">{r.how}</td>
                    <td className="border-b border-zinc-900 px-4 py-4 text-zinc-400">{r.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Market ---------------- */

function Market() {
  const [open, setOpen] = useState<string | null>("trends");
  const [modal, setModal] = useState(false);

  const items = [
    {
      id: "trends",
      title: "Tendências",
      body:
        "Uso crescente de IA generativa para acelerar análise e geração de código; automação de pipelines de dados (ETL) com ferramentas low-code; crescimento de cloud computing como padrão de infraestrutura mesmo em times pequenos.",
    },
    {
      id: "ai",
      title: "Impacto da IA",
      body:
        "Pretendo usar IA como ferramenta de produtividade e aprendizado, para acelerar tarefas repetitivas (documentação, boilerplate, debugging inicial), sem terceirizar o entendimento dos fundamentos. A IA pode automatizar parte da limpeza de dados e geração de relatórios, mas a interpretação de negócio e a responsabilidade ética continuam sendo minhas.",
    },
    {
      id: "junior",
      title: "Desafios de Iniciante",
      body:
        "A exigência de 'experiência prévia' para vagas júnior é um paradoxo conhecido, um portfólio de projetos reais e bem documentados (não apenas exercícios de curso) é a forma mais concreta de contornar isso: prova de capacidade quando ainda não há histórico profissional extenso.",
    },
  ];

  const strategy = [
    {
      label: "Plano de Networking",
      body:
        "Professores com contato direto, comunidades de Discord voltadas a dados/Python/ML, e profissionais de Dados/ML que sigo para entender a rotina real da área.",
    },
    {
      label: "Eventos & Ferramentas",
      body:
        "Hackathons voltados a dados e IA; Notion para organização de estudo; Trello / GitHub Projects para gerir os próprios projetos de portfólio.",
    },
    {
      label: "Aprendizado Contínuo",
      body:
        "Lendo documentação oficial (AWS, Power BI), acompanhando newsletters de dados/ML e participando de competições no Kaggle como prática contínua.",
    },
  ];

  return (
    <section id="market" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeader index="04" title="Mercado, Tendências & Estratégia" sub="Sinais do setor + estratégia pessoal de carreira." />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="md:col-span-2">
          <GlowCard className="divide-y divide-zinc-900 p-0">
            {items.map((it) => {
              const isOpen = open === it.id;
              return (
                <div key={it.id}>
                  <button
                    onClick={() => setOpen(isOpen ? null : it.id)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-zinc-900/40"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="font-mono-bp grid h-7 w-7 place-items-center rounded-md border text-[11px]"
                        style={{ borderColor: "#1f1f23", color: BLUE_SOFT }}
                      >
                        {isOpen ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </span>
                      <span className="text-[14.5px] font-medium text-zinc-100">{it.title}</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-zinc-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0">
                      <p className="px-6 pb-6 pl-[68px] text-[13.5px] leading-relaxed text-zinc-400">
                        {it.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </GlowCard>
        </div>

        <GlowCard className="flex flex-col p-6">
          <Label>Deep Dive</Label>
          <p className="mt-3 text-[13.5px] text-zinc-400">
            Quer ler a análise consolidada de mercado em um único panorama? Abra o briefing completo.
          </p>
          <button
            onClick={() => setModal(true)}
            className="mt-auto inline-flex items-center gap-1.5 self-start rounded-md px-3.5 py-2 text-[12.5px] font-medium text-white transition-transform hover:scale-[1.02]"
            style={{ background: BLUE }}
          >
            Abrir Briefing <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </GlowCard>
      </div>

      {/* Strategy */}
      <div className="mt-14">
        <Label>↳ Estratégias de Carreira & Networking</Label>
        <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
          {strategy.map((b) => (
            <GlowCard key={b.label} className="p-6">
              <div className="font-mono-bp text-[10.5px] uppercase tracking-[0.22em]" style={{ color: BLUE_SOFT }}>
                {b.label}
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-400">{b.body}</p>
            </GlowCard>
          ))}
        </div>
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-lg border border-zinc-800 bg-zinc-950 p-8 shadow-2xl"
          >
            <button
              onClick={() => setModal(false)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-md border border-zinc-800 text-zinc-300 hover:bg-zinc-900"
            >
              <X className="h-4 w-4" />
            </button>
            <Label>Briefing · Mercado Dados/ML 2026</Label>
            <h3 className="mt-2 text-2xl font-semibold text-zinc-100">Panorama Consolidado</h3>
            <div className="mt-5 space-y-5 text-[13.5px] leading-relaxed text-zinc-400">
              {items.map((it) => (
                <div key={it.id}>
                  <div className="font-mono-bp text-[10.5px] uppercase tracking-widest" style={{ color: BLUE_SOFT }}>
                    {it.title}
                  </div>
                  <p className="mt-1.5">{it.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------- Projects ---------------- */

function Projects() {
  const items = [
    {
      id: "01",
      title: "Vibefy · Recomendador de Música por Humor",
      stack: ["Python", "Flask", "JavaScript", "LLM (OpenRouter)", "iTunes API"],
      desc:
        "Aplicação web que recomenda músicas com base no humor do usuário, usando um LLM via OpenRouter para interpretar a entrada e a API do iTunes para buscar as faixas. Backend em Flask, deploy no Render.",
      code: `def recommend(mood):\n    prompt = build_prompt(mood)\n    suggestions = llm.complete(prompt)\n    return itunes.search(suggestions)`,
    },
    {
      id: "02",
      title: "Dashboard de Monitoramento de Ativos Financeiros",
      stack: ["Python", "AWS Lambda", "S3", "SQL", "Power BI", "Power Automate"],
      desc:
        "Pipeline que coleta dados de ativos financeiros via API da Brapi, processa em AWS Lambda, armazena no S3, estrutura em SQL e exibe em painel Power BI, com automações via Power Automate.",
      code: `def fetch_assets():\n    data = brapi.get_quotes(tickers)\n    s3.put(\"assets/raw\", data)\n    return data`,
    },
    {
      id: "03",
      title: "Portfólio Profissional · Hub de Projetos",
      stack: ["React", "Vite", "TypeScript", "Tailwind CSS"],
      desc: "Minha vitrine oficial de desenvolvimento. Um ecossistema responsivo construído para centralizar meus principais projetos de dados e software, demonstrando domínio em arquitetura front-end moderna.",
      code: `export const Portfolio = () => {\n  return (\n    <div className="flex flex-col gap-6">\n      <MyProjects />\n    </div>\n  );\n};`,
    },
  ];

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeader index="05" title="Projetos Selecionados" sub="Provas de capacidade prática." />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((p) => (
          <GlowCard key={p.id} className="group flex flex-col p-0">
            <div className="border-b border-zinc-900 bg-black/40 px-5 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                </div>
                <Label>project · {p.id}</Label>
              </div>
            </div>

            <pre className="bp-grid-fine overflow-hidden border-b border-zinc-900 px-5 py-4 font-mono-bp text-[11px] leading-relaxed text-zinc-400">
              <code>{p.code}</code>
            </pre>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-[15.5px] font-medium text-zinc-100">{p.title}</h3>
              <p className="mt-2 flex-1 text-[13px] text-zinc-400">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-4 border-t border-zinc-900 pt-4">
                <a
                  href="https://github.com/matheusnw1"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono-bp inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-zinc-300 hover:text-white"
                >
                  <Github className="h-3.5 w-3.5" /> Code
                </a>
                <a 
                  href="#"
                  className="font-mono-bp inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest hover:underline"
                  style={{ color: BLUE_SOFT }}
                > 
                </a>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className="grid h-7 w-7 place-items-center rounded-md text-[15px] font-medium text-white bg-black-900"
            >
              NW
            </span>
            <span className="text-[15px] font-medium text-zinc-100">Matheus Navarro Wenceslau</span>
          </div>
          <div className="font-mono-bp mt-2 text-[10.5px] uppercase tracking-[0.22em] text-zinc-500">
            © 2026 · Projeto de Carreira · Dados · ML · Cloud
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://www.linkedin.com/in/matheus-navarro-wenceslau/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-10 w-10 place-items-center rounded-md border border-zinc-800 bg-zinc-950 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/matheusnw1"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-10 w-10 place-items-center rounded-md border border-zinc-800 bg-zinc-950 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
          >
            <Github className="h-4 w-4" />
          </a>
          
          {/* BOTÃO DO CURRÍCULO NO FOOTER - Configurado com o seu arquivo */}
          <a
            href="/Curriculo-MatheusNavarro.pdf"
            download="Matheus_Navarro_Wenceslau_Curriculo.pdf"
            className="inline-flex items-center gap-1.5 rounded-md px-3.5 py-2.5 text-[12.5px] font-medium text-white transition-all active:scale-[0.98] cursor-pointer"
            style={{ background: BLUE }}
          >
            <Download className="h-3.5 w-3.5" /> Currículo
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */

export default function Index() {
  return (
    <div className="min-h-screen bg-black text-zinc-200">
      <Header />
      <main>
        <Hero />
        <About />
        <SWOT />
        <Skills />
        <Roadmap />
        <Market />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
