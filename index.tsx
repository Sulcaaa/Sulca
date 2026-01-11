
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Trees, 
  Footprints, 
  Skull, 
  Users, 
  Image as ImageIcon, 
  ChevronRight, 
  Flame, 
  Zap, 
  Award, 
  Clock, 
  Tent, 
  Dices, 
  RefreshCcw, 
  Sparkles, 
  AlertTriangle, 
  Menu, 
  X, 
  Settings2, 
  Trophy,
  BookOpen,
  CalendarDays,
  Map as MapIcon,
  Compass,
  Navigation,
  Wind,
  Waves,
  Volume2,
  Dna,
  History,
  Palette,
  Quote,
  MessageSquareQuote,
  Activity,
  Shield,
  Star,
  ZapOff,
  Search,
  Filter
} from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const THEME = {
  accent: 'text-[#ff9100]',
  lava: '#ff9100',
  neon: '#ccff00',
  bg: '#050805',
  card: 'bg-[#0d160e]',
  border: 'border-[#1e3321]'
};

// --- Data ---

const CLASS_MEMBERS = [
  { id: 1, name: "Romi", species: "Brontosaurus", trait: "Tanker", power: 85, rarity: "Epic", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Romi" },
  { id: 2, name: "Kyara", species: "Tyrannosaurus", trait: "Slayer", power: 98, rarity: "Legendary", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kyara" },
  { id: 3, name: "Joanna", species: "Brachiosaurus", trait: "Sentinel", power: 88, rarity: "Epic", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joanna" },
  { id: 4, name: "Tasya", species: "Archaeopteryx", trait: "Scout", power: 92, rarity: "Rare", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tasya" },
  { id: 5, name: "Mukti", species: "Parasaurolophus", trait: "Support", power: 80, rarity: "Common", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mukti" },
  { id: 6, name: "Khansa", species: "Isanosaurus", trait: "Researcher", power: 95, rarity: "Rare", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khansa" },
  { id: 7, name: "Tiwi", species: "Apatosaurus", trait: "Sentinel", power: 86, rarity: "Rare", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tiwi" },
  { id: 8, name: "Revin", species: "Plesiosaurus", trait: "Hunter", power: 89, rarity: "Epic", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Revin" },
  { id: 9, name: "Sintia", species: "Stegosaurus", trait: "Defender", power: 87, rarity: "Rare", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sintia" },
  { id: 10, name: "Melati", species: "Triceratops", trait: "Warrior", power: 91, rarity: "Epic", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Melati" },
  { id: 11, name: "Riswa", species: "Spinosaurus", trait: "Predator", power: 94, rarity: "Legendary", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riswa" },
  { id: 12, name: "Dea", species: "Struthiomimus", trait: "Runner", power: 83, rarity: "Common", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dea" },
  { id: 13, name: "Anjeli", species: "Ceratosaurus", trait: "Striker", power: 88, rarity: "Rare", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjeli" },
  { id: 14, name: "Syafa", species: "Corythosaurus", trait: "Bard", power: 82, rarity: "Common", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Syafa" },
  { id: 15, name: "Rina", species: "Ankylosaurus", trait: "Fortress", power: 96, rarity: "Legendary", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rina" },
  { id: 16, name: "Kirana", species: "Dilophosaurus", trait: "Saboteur", power: 84, rarity: "Rare", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kirana" },
  { id: 17, name: "Angelika", species: "Compsognathus", trait: "Swarm", power: 79, rarity: "Common", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Angelika" },
  { id: 18, name: "Devi", species: "Therizinosaurus", trait: "Slicer", power: 90, rarity: "Epic", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Devi" },
  { id: 19, name: "Mylan", species: "Edmontosaurus", trait: "Gatherer", power: 81, rarity: "Common", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mylan" },
  { id: 20, name: "Lia", species: "Amargasaurus", trait: "Mystic", power: 86, rarity: "Rare", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lia" },
  { id: 21, name: "Maftukha", species: "Gallimimus", trait: "Sprinter", power: 85, rarity: "Rare", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maftukha" },
  { id: 22, name: "Syifa", species: "Mosasaurus", trait: "Aquatic", power: 93, rarity: "Epic", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Syifa" },
  { id: 23, name: "Putri", species: "Mononykus", trait: "Infiltrator", power: 80, rarity: "Common", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Putri" },
  { id: 24, name: "Silvi", species: "Silvisaurus", trait: "Guard", power: 84, rarity: "Rare", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Silvi" },
  { id: 25, name: "Cahya", species: "Zuniceratops", trait: "Bruiser", power: 87, rarity: "Rare", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cahya" },
  { id: 26, name: "Rahma", species: "Styracosaurus", trait: "Breacher", power: 89, rarity: "Epic", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahma" },
  { id: 27, name: "Aulia", species: "Allosaurus", trait: "Assassin", power: 92, rarity: "Epic", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aulia" },
  { id: 28, name: "Vina", species: "Ouranosaurus", trait: "Survivor", power: 82, rarity: "Common", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vina" },
  { id: 29, name: "Dinda", species: "Ampelosaurus", trait: "Healer", power: 85, rarity: "Rare", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dinda" },
  { id: 30, name: "Risha", species: "Carnotaurus", trait: "Executioner", power: 94, rarity: "Legendary", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Risha" },
  { id: 31, name: "Zhafira", species: "Hadrosaurus", trait: "Orator", power: 83, rarity: "Common", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zhafira" },
  { id: 32, name: "Asiva", species: "Pterodactyl", trait: "Navigator", power: 91, rarity: "Epic", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Asiva" },
  { id: 33, name: "Rachel", species: "Talarurus", trait: "Smasher", power: 86, rarity: "Rare", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel" },
  { id: 34, name: "Gilang", species: "Giganotosaurus", trait: "Colossus", power: 99, rarity: "Mythic", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gilang" },
  { id: 35, name: "Muba", species: "Albertosaurus", trait: "Strategist", power: 93, rarity: "Epic", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muba" },
];

const CLASS_OFFICERS = [
  { name: "Adrian 'Rex'", role: "Ketua Kelas", species: "T-Rex", stats: { lead: 98, wis: 85, str: 95 }, color: "from-orange-500 to-red-600" },
  { name: "Siti 'Ptera'", role: "Sekretaris I", species: "Pterodactyl", stats: { lead: 82, wis: 96, str: 70 }, color: "from-blue-500 to-cyan-500" },
  { name: "Dewi 'Raptor'", role: "Sekretaris II", species: "Velociraptor", stats: { lead: 75, wis: 92, str: 85 }, color: "from-emerald-500 to-teal-500" },
  { name: "Budi 'Ankylo'", role: "Bendahara I", species: "Ankylosaurus", stats: { lead: 80, wis: 90, str: 98 }, color: "from-amber-500 to-yellow-600" },
  { name: "Lestari 'Trice'", role: "Bendahara II", species: "Triceratops", stats: { lead: 88, wis: 88, str: 92 }, color: "from-pink-500 to-rose-600" },
];

const SCHEDULE_DATA = [
  { day: "Senin", subjects: ["Matematika", "B. Indonesia", "Ekonomi", "Sejarah"], piket: ["Romi", "Kyara", "Joanna", "Tasya", "Mukti"] },
  { day: "Selasa", subjects: ["Sosiologi", "Geografi", "B. Inggris", "PKn"], piket: ["Khansa", "Tiwi", "Revin", "Sintia", "Melati"] },
  { day: "Rabu", subjects: ["Ekonomi", "Sejarah", "Penjas", "Seni Budaya"], piket: ["Riswa", "Dea", "Anjeli", "Syafa", "Rina"] },
  { day: "Kamis", subjects: ["Sosiologi", "Geografi", "Agama", "Matematika"], piket: ["Kirana", "Angelika", "Devi", "Mylan", "Lia"] },
  { day: "Jumat", subjects: ["B. Indonesia", "B. Inggris", "BK", "Kebersihan"], piket: ["Maftukha", "Syifa", "Putri", "Silvi", "Cahya", "Rahma"] },
];

const TIME_SLOTS = [
  { label: "Sesi 1", time: "07:15 - 09:15" },
  { label: "Sesi 2", time: "09:30 - 11:30" },
  { label: "Sesi 3", time: "12:30 - 14:00" },
  { label: "Sesi 4", time: "14:15 - 15:30" }
];

// --- Helper Functions ---

async function speak(text: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Katakan dengan suara dinosaurus yang bijak dan penuh semangat: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Puck' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), audioContext);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    }
  } catch (err) {
    console.error("TTS Error:", err);
  }
}

function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}

// --- Helper Components ---

const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ 
        perspective: '1000px',
        transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  );
};

// --- Custom DNA Diagram Component ---

const ClassStatsDiagram = () => {
  const stats = [
    { label: "Akademik", value: 85, color: "bg-[#ff9100]", icon: BookOpen },
    { label: "Kreativitas", value: 92, color: "bg-[#ccff00]", icon: Palette },
    { label: "Olahraga", value: 78, color: "bg-red-500", icon: Trophy },
    { label: "Solidaritas", value: 100, color: "bg-emerald-500", icon: Users }
  ];

  return (
    <div className="glass p-6 md:p-10 rounded-[2.5rem] border-white/5 space-y-8">
      <div className="flex items-center gap-4">
        <Activity className="text-[#ff9100]" />
        <h3 className="font-black italic uppercase text-white">DNA Kawanan XI IPS 5</h3>
      </div>
      <div className="grid gap-6">
        {stats.map((s, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <s.icon size={14} className="text-white/40" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{s.label}</span>
              </div>
              <span className="text-xs font-black text-[#ff9100]">{s.value}%</span>
            </div>
            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div 
                className={`h-full ${s.color} transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.1)]`} 
                style={{ width: `${s.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Daily Quote Feature ---

const DailyQuote = () => {
  const quotes = useMemo(() => [
    "Evolusi bukan tentang siapa yang tercepat, tapi siapa yang paling solid.",
    "Auman XI IPS 5 terdengar melintasi zaman, mengguncang dunia kurikulum.",
    "Fosil mungkin mati, tapi semangat EXPESFIVE abadi dalam setiap langkah.",
    "Beradaptasi atau punah. Kami memilih untuk menguasai setiap tantangan.",
    "Di habitat ini, solidaritas adalah hukum rimba tertinggi kami.",
    "Setiap auman adalah bukti keberadaan klan terkuat: EXPESFIVE."
  ], []);

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length);
        setFade(true);
      }, 500);
    }, 8000);
    return () => clearInterval(interval);
  }, [quotes]);

  return (
    <div className="group relative mx-auto mb-12 max-w-2xl px-4">
      <div className="glass rounded-[2rem] p-8 border-white/5 shadow-2xl transition-all duration-500 hover:border-[#ff9100]/40 hover:scale-[1.02] flex items-center gap-6">
        <div className="relative shrink-0">
          <div className="absolute inset-0 bg-[#ff9100] blur-xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#ff9100] to-[#ccff00] rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500 overflow-hidden">
             <Skull className="text-black group-hover:scale-110 transition-transform" size={40} />
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
        
        <div className="text-left flex-1">
          <div className="flex items-center gap-2 mb-2 text-[#ccff00]/50">
            <Quote size={14} className="animate-pulse" />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em]">Auman Hari Ini</span>
          </div>
          <p className={`text-sm md:text-xl font-bold italic text-white transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            "{quotes[index]}"
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-0.5 w-6 bg-[#ff9100]"></div>
            <span className="text-[10px] font-mono text-white/30 uppercase">Elder Raptor Wisdom</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Map Component ---

const JurassicMap = () => {
  const locations = [
    { id: 'hq', name: 'Expesfive HQ', pos: { x: 50, y: 50 }, desc: 'Pusat komando XI IPS 5. Tempat ide-ide brilian lahir.', icon: Skull },
    { id: 'river', name: 'Koridor Purba', pos: { x: 30, y: 40 }, desc: 'Alur perjalanan antar kelas yang penuh dinamika.', icon: Waves },
    { id: 'canteen', name: 'Lembah Gizi', pos: { x: 75, y: 65 }, desc: 'Zona pemulihan stamina paling populer.', icon: Flame },
    { id: 'library', name: 'Gua Prasasti', pos: { x: 25, y: 75 }, desc: 'Tempat penyimpanan ilmu pengetahuan kuno.', icon: BookOpen },
    { id: 'field', name: 'Plaza Predasi', pos: { x: 60, y: 25 }, desc: 'Medan kompetisi fisik dan talenta.', icon: Trophy },
  ];

  const [activeLoc, setActiveLoc] = useState<typeof locations[0] | null>(null);

  return (
    <div className="relative w-full aspect-square md:aspect-video glass rounded-[2.5rem] md:rounded-[3rem] border-white/5 overflow-hidden shadow-2xl group/map">
      <div className="absolute inset-0 bg-[#0a120b] opacity-50">
        <svg viewBox="0 0 1000 600" className="w-full h-full opacity-20">
          <path d="M0,300 Q250,100 500,300 T1000,300 V600 H0 Z" fill="#1a2e1a" />
          <path d="M0,450 Q300,350 600,450 T1000,450 V600 H0 Z" fill="#0d160e" />
          <circle cx="850" cy="150" r="100" fill="#ff9100" opacity="0.1" />
        </svg>
      </div>

      <div className="absolute top-4 md:top-8 left-4 md:left-8 z-10">
        <div className="flex items-center gap-2 md:gap-3 glass px-3 md:px-5 py-1.5 md:py-2 rounded-full border-white/10">
          <Compass className="text-[#ff9100] animate-spin-slow" size={16} />
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Radar Habitat</span>
        </div>
      </div>

      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-[0.03] pointer-events-none">
        {Array.from({ length: 144 }).map((_, i) => (
          <div key={i} className="border border-white"></div>
        ))}
      </div>

      {locations.map((loc) => (
        <button
          key={loc.id}
          onMouseEnter={() => setActiveLoc(loc)}
          onMouseLeave={() => setActiveLoc(null)}
          onClick={() => setActiveLoc(activeLoc?.id === loc.id ? null : loc)}
          style={{ left: `${loc.pos.x}%`, top: `${loc.pos.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="relative">
            <div className={`absolute inset-0 bg-[#ff9100] blur-xl rounded-full transition-all duration-500 ${activeLoc?.id === loc.id ? 'opacity-60 scale-150' : 'opacity-0 scale-50'}`}></div>
            <div className={`w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${activeLoc?.id === loc.id ? 'bg-[#ff9100] border-white text-black scale-125' : 'bg-[#1a2e1a] border-white/10 text-[#ff9100]'}`}>
              <loc.icon size={18} />
            </div>
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 md:mt-4 whitespace-nowrap transition-all duration-300 ${activeLoc?.id === loc.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
              <div className="glass px-2 md:px-4 py-1 md:py-2 rounded-lg md:rounded-xl border-[#ff9100]/30 shadow-2xl">
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white">{loc.name}</span>
              </div>
            </div>
          </div>
        </button>
      ))}

      <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 left-4 md:left-auto md:w-80 z-30 transition-all duration-500">
        <div className={`glass p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border-[#ff9100]/20 shadow-2xl transform transition-all duration-500 ${activeLoc ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
          {activeLoc && (
            <>
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <div className="p-1.5 md:p-2 bg-[#ff9100]/10 rounded-lg text-[#ff9100]">
                  <activeLoc.icon size={16} />
                </div>
                <h4 className="text-sm md:text-lg font-black italic uppercase text-[#ff9100] tracking-tight">{activeLoc.name}</h4>
              </div>
              <p className="text-[10px] md:text-xs text-white/60 leading-relaxed italic">"{activeLoc.desc}"</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Dino Lab Component ---

const DinoLab = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultImg, setResultImg] = useState<string | null>(null);

  const generateDino = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `A professional, high-quality, Pixar-style 3D dinosaur student wearing a school uniform, ${prompt}, cinematic lighting, jungle classroom background, dinosaur-humanoid hybrid character.` }]
        }
      });
      
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setResultImg(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (err) {
      console.error("Image Gen Error:", err);
    } finally {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <div className="glass rounded-[3rem] p-6 md:p-12 border-white/5 shadow-2xl relative overflow-hidden group/lab">
      <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="space-y-6 md:space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-[#ccff00]/20 p-4 rounded-2xl text-[#ccff00]">
              <Dna size={32} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black italic text-white uppercase tracking-tight">Laboratorium <span className="text-[#ccff00]">Genetik</span></h3>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Bangkitkan Avatar Dinasaurusmu</p>
            </div>
          </div>
          <p className="text-white/50 text-sm italic">Eksperimen bio-teknologi untuk menciptakan representasi visual kawanan purba XI IPS 5.</p>
          <div className="space-y-4">
            <input 
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Contoh: 'T-Rex memakai kacamata', 'Raptor membawa buku'..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#ccff00] transition-all"
            />
            <button 
              onClick={generateDino}
              disabled={loading || !prompt.trim()}
              className="w-full bg-[#ccff00] text-black px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? <RefreshCcw className="animate-spin" size={20} /> : <Palette size={20} />}
              {loading ? 'Mensintesa DNA...' : 'Ekstraksi Fosil Visual'}
            </button>
          </div>
        </div>

        <div className="relative aspect-square glass rounded-[2rem] overflow-hidden border-white/10 flex items-center justify-center">
          {resultImg ? (
            <img src={resultImg} alt="Dino Result" className="w-full h-full object-cover animate-in fade-in zoom-in duration-700" />
          ) : (
            <div className="text-center p-10 opacity-20">
              <Dna size={80} className="mx-auto mb-6 animate-spin-slow" />
              <p className="font-black uppercase tracking-[0.5em] text-xs">Menunggu Sampel DNA</p>
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center gap-4">
              <RefreshCcw className="text-[#ccff00] animate-spin" size={40} />
              <span className="text-[#ccff00] font-black text-[10px] uppercase tracking-[0.3em] animate-pulse">Siklus Inkubasi...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Schedule & Duty Component ---

const ScheduleAndDuty = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const data = SCHEDULE_DATA[selectedDay];

  return (
    <div className="glass rounded-[3rem] p-6 md:p-12 border-white/5 shadow-2xl">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
        {SCHEDULE_DATA.map((d, i) => (
          <button
            key={i}
            onClick={() => setSelectedDay(i)}
            className={`px-4 md:px-8 py-2 md:py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs transition-all ${selectedDay === i ? 'bg-[#ff9100] text-black scale-110 shadow-lg shadow-[#ff9100]/20' : 'bg-white/5 text-white/40 hover:text-white'}`}
          >
            {d.day}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-16">
        {/* Mata Pelajaran */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <BookOpen className="text-[#ff9100]" />
            <h4 className="font-black italic uppercase text-white tracking-tight">Mata Pelajaran</h4>
          </div>
          <div className="space-y-3">
            {TIME_SLOTS.map((slot, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-[#ff9100]/20 transition-all group">
                <div>
                  <p className="text-[10px] font-black uppercase text-white/30 group-hover:text-[#ff9100]/50">{slot.label}</p>
                  <p className="font-bold text-white text-sm md:text-base">{data.subjects[idx] || 'Istirahat'}</p>
                </div>
                <div className="text-[10px] font-mono text-white/20">{slot.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Jadwal Piket */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Flame className="text-[#ccff00]" />
            <h4 className="font-black italic uppercase text-white tracking-tight">Jadwal Piket</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {data.piket.map((p, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:scale-105 transition-all group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ccff00] to-emerald-500 flex items-center justify-center text-black font-black text-[10px]">
                  {p[0]}
                </div>
                <span className="text-xs font-bold text-white/70 group-hover:text-white">{p}</span>
              </div>
            ))}
          </div>
          <div className="p-4 bg-[#ccff00]/5 rounded-2xl border border-[#ccff00]/10 mt-auto">
            <p className="text-[10px] text-[#ccff00]/60 italic">"Kebersihan adalah sebagian dari kedaulatan habitat."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Navbar Component ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Territory", href: "#about" },
    { name: "Specimens", href: "#members" },
    { name: "Apex", href: "#structure" },
    { name: "Cycles", href: "#schedule" },
    { name: "Lab", href: "#lab" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="bg-[#ff9100] p-1.5 md:p-2 rounded-xl group-hover:rotate-[-10deg] transition-all duration-500 shadow-[0_0_15px_rgba(255,145,0,0.6)]">
            <Footprints className="text-black" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black text-white tracking-tighter uppercase italic leading-none">
              Expes<span className="text-[#ff9100]">five</span>
            </span>
            <span className="text-[7px] md:text-[8px] font-bold text-[#ccff00] tracking-[0.4em] uppercase">Jurassic Hub</span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="text-[10px] font-black uppercase tracking-widest text-emerald-100/50 hover:text-[#ff9100] hover:scale-110 transition-all">
              {link.name}
            </a>
          ))}
          <a href="#guide" className="bg-[#ff9100] text-black px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:shadow-[0_0_25px_rgba(255,145,0,0.4)] transition-all active:scale-95">
            AI Guide
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-[#ff9100] p-2 glass rounded-xl border-white/5">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`lg:hidden absolute top-full left-0 w-full glass transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[600px] py-10 border-b border-white/10 shadow-2xl' : 'max-h-0 py-0'}`}>
        <div className="flex flex-col items-center gap-8">
          {links.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-2xl font-black italic uppercase text-white hover:text-[#ff9100] transition-all">
              {link.name}
            </a>
          ))}
          <a href="#guide" onClick={() => setIsOpen(false)} className="bg-[#ff9100] text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl active:scale-95">
            AI Guide
          </a>
        </div>
      </div>
    </nav>
  );
};

// --- Dino AI Guide Component ---

const DinoGuide = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Rawrr! Aku Raptor AI penjaga EXPESFIVE. Ada yang bisa kubantu tentang kawanan purba kita?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chat]);

  const handleAsk = async () => {
    if (!input.trim() || loading) return;
    const msg = input; setInput('');
    setChat(prev => [...prev, { role: 'user', text: msg }]);
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: msg,
        config: { systemInstruction: "Kamu adalah maskot Raptor interaktif untuk kelas XI IPS 5 (EXPESFIVE). Bicara dengan semangat, sesekali gunakan suara dino 'Rawrr', dan banggakan kelas XI IPS 5. Selalu akhiri kalimat dengan sapaan khas dinosaurus." }
      });
      const text = response.text || "Rawrr! Otakku membeku sejenak...";
      setChat(prev => [...prev, { role: 'bot', text }]);
    } catch {
      setChat(prev => [...prev, { role: 'bot', text: "Gunung berapi meletus! Koneksi terputus..." }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="glass rounded-[2.5rem] p-4 md:p-6 flex flex-col h-[500px] md:h-[550px] shadow-2xl relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ff9100]/10 blur-[50px] rounded-full group-hover:bg-[#ff9100]/20 transition-all"></div>
      <div className="flex items-center gap-4 mb-4 md:mb-6 border-b border-white/5 pb-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ff9100] rounded-xl md:rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(255,145,0,0.3)]">
          <Skull className="text-black" size={24} />
        </div>
        <div>
          <h4 className="font-black italic uppercase leading-none text-white text-sm md:text-base">Raptor AI</h4>
          <span className="text-[8px] md:text-[10px] font-bold text-[#ccff00] uppercase tracking-widest">Kelas XI IPS 5</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {chat.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] md:max-w-[85%] p-3 md:p-4 rounded-2xl md:rounded-3xl text-xs md:text-sm ${m.role === 'user' ? 'bg-[#ff9100] text-black font-bold rounded-tr-none' : 'bg-white/5 text-white rounded-tl-none border border-white/10'}`}>
              <div className="flex flex-col gap-2">
                <span>{m.text}</span>
                {m.role === 'bot' && (
                  <button onClick={() => speak(m.text)} className="self-end p-1.5 bg-white/10 rounded-lg hover:bg-[#ff9100]/20 transition-all">
                    <Volume2 size={12} className="text-[#ff9100]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && <div className="animate-pulse text-[#ccff00] text-[10px] font-black p-2 italic">Mendengkur... Rawrr...</div>}
      </div>

      <div className="mt-4 flex gap-2">
        <input 
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAsk()}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 text-xs md:text-sm focus:outline-none focus:border-[#ff9100] transition-all"
          placeholder="Tanya Raptor..."
        />
        <button onClick={handleAsk} className="bg-[#ff9100] p-3 rounded-xl md:rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg">
          <Zap className="text-black" size={20} />
        </button>
      </div>
    </div>
  );
};

// --- Group Generator Component ---

const GroupGenerator = ({ onGenerate }: { onGenerate: () => void }) => {
  const [numGroups, setNumGroups] = useState(3);
  const [groups, setGroups] = useState<typeof CLASS_MEMBERS[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateGroups = () => {
    setIsGenerating(true);
    if (onGenerate) onGenerate();
    
    setTimeout(() => {
      const shuffled = [...CLASS_MEMBERS].sort(() => 0.5 - Math.random());
      const result: typeof CLASS_MEMBERS[] = Array.from({ length: numGroups }, () => []);
      
      shuffled.forEach((member, index) => {
        result[index % numGroups].push(member);
      });
      
      setGroups(result);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="glass rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 border-white/5 shadow-2xl relative overflow-hidden group/gen">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff9100] to-transparent opacity-50"></div>
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 mb-10 md:mb-16">
        <div className="flex items-center gap-4 md:gap-6 w-full lg:w-auto">
          <div className="bg-white/5 p-3 md:p-5 rounded-2xl border border-white/10 shadow-inner group-hover/gen:border-[#ff9100]/30 transition-all">
            <Settings2 className="text-[#ccff00]" size={32} />
          </div>
          <div>
            <h4 className="text-lg md:text-xl font-black italic uppercase text-white tracking-tight">Set Kawanan</h4>
            <p className="text-[8px] md:text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mt-1">Hingga 18 Kelompok Sektor</p>
          </div>
        </div>
        
        <div className="flex-1 max-w-md w-full">
           <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Jumlah Kelompok</span>
              <span className="text-xl font-black text-[#ff9100]">{numGroups}</span>
           </div>
           <input 
            type="range" min="2" max="18" value={numGroups} 
            onChange={e => setNumGroups(parseInt(e.target.value))}
            className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-[#ff9100] border border-white/10"
           />
        </div>

        <button 
          onClick={generateGroups}
          disabled={isGenerating}
          className="w-full lg:w-auto bg-[#ff9100] text-black px-8 md:px-12 py-4 md:py-6 rounded-[1.5rem] md:rounded-[2.5rem] font-black uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-3 md:gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,145,0,0.15)] disabled:opacity-50"
        >
          {isGenerating ? <RefreshCcw className="animate-spin" size={24} /> : <Dices size={24} />}
          {isGenerating ? 'Sinkronisasi...' : 'Bangkitkan Kelompok'}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar p-1">
        {groups.map((group, gIdx) => (
          <div key={gIdx} className="glass rounded-[2rem] p-6 border-white/5 relative overflow-hidden group/card hover:border-[#ff9100]/20 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#ff9100] rounded-lg flex items-center justify-center shadow-lg">
                  <span className="font-black text-black text-xs">{gIdx + 1}</span>
                </div>
                <h5 className="font-black italic uppercase text-white tracking-widest text-[10px]">Sektor</h5>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {group.map(m => (
                <div key={m.id} className="flex items-center gap-3 group/item p-2 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                  <div className="w-8 h-8 rounded-full border-2 border-white/5 p-0.5 overflow-hidden group-hover/item:border-[#ff9100] transition-all shrink-0">
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-black text-white/70 group-hover/item:text-white transition-colors truncate">{m.name}</span>
                    <span className="text-[8px] font-mono text-white/20 uppercase truncate">{m.species}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {groups.length === 0 && !isGenerating && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-10">
            <AlertTriangle className="text-white mb-6" size={64} />
            <p className="text-sm font-black uppercase tracking-[0.5em] italic">Tentukan Sektor Klan</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('All');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const uniqueSpecies = useMemo(() => {
    const species = CLASS_MEMBERS.map(m => m.species);
    return ['All', ...new Set(species)].sort();
  }, []);

  const filteredMembers = useMemo(() => {
    return CLASS_MEMBERS.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           m.species.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecies = selectedSpecies === 'All' || m.species === selectedSpecies;
      return matchesSearch && matchesSpecies;
    });
  }, [searchTerm, selectedSpecies]);

  return (
    <div className="min-h-screen bg-[#050805] selection:bg-[#ff9100] selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] bg-[radial-gradient(circle,rgba(255,145,0,0.1)_0%,transparent_70%)] animate-pulse-radial"></div>
          
          <div 
            className="absolute top-20 md:top-40 left-5 md:left-10 opacity-5 md:opacity-10 transition-transform duration-75"
            style={{ transform: `translateY(${scrollY * 0.3}px) rotate(15deg)` }}
          >
            <div className="animate-sway origin-bottom">
              <Trees size={typeof window !== 'undefined' && window.innerWidth < 768 ? 200 : 400} />
            </div>
          </div>
          <div 
            className="absolute bottom-5 md:bottom-10 right-5 md:right-10 opacity-5 md:opacity-10 transition-transform duration-75"
            style={{ transform: `translateY(${scrollY * -0.2}px) rotate(-15deg)` }}
          >
            <div className="animate-sway-delayed origin-bottom">
              <Trees size={typeof window !== 'undefined' && window.innerWidth < 768 ? 150 : 300} />
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 md:px-6">
          <div className="inline-block glass px-4 md:px-6 py-1.5 md:py-2 rounded-full border-white/10 mb-6 md:mb-8 animate-bounce">
            <span className="text-[8px] md:text-[10px] font-black text-[#ff9100] uppercase tracking-[0.3em] md:tracking-[0.4em]">Fosil Masa Depan Dimulai</span>
          </div>
          
          <DailyQuote />

          <h1 className="text-5xl md:text-9xl font-black text-white italic leading-none uppercase tracking-tighter mb-4 md:mb-6 drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)]">
            Expes<span className="text-[#ff9100] text-glow">five</span>
          </h1>
          <p className="text-sm md:text-2xl text-emerald-100/60 font-medium max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed italic px-4">
            "Kami adalah puncak rantai makanan intelektual di XI IPS 5."
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
            <a href="#members" className="w-full sm:w-auto bg-[#ff9100] text-black px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-3xl font-black flex items-center justify-center gap-3 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,145,0,0.4)] transition-all uppercase tracking-widest text-xs md:text-sm active:scale-95">
              Jelajahi Habitat <ChevronRight size={20} />
            </a>
            <a href="#lab" className="w-full sm:w-auto glass text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-3xl font-black hover:bg-white/5 transition-all uppercase tracking-widest text-xs md:text-sm active:scale-95 flex items-center justify-center gap-2">
              <Dna size={18} /> Dino Lab
            </a>
          </div>
        </div>
      </section>

      {/* Territory Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-40 scroll-mt-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-7xl font-black italic text-white uppercase tracking-tighter mb-4">Teritori <span className="text-[#ccff00]">Jurassic</span></h2>
          <div className="w-20 h-1.5 bg-[#ff9100] mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <JurassicMap />
          </div>
          <div className="space-y-8">
            <ClassStatsDiagram />
            <div className="glass p-8 rounded-[2rem] border-white/5">
              <div className="flex items-center gap-4 mb-6">
                <Navigation className="text-[#ccff00]" />
                <h4 className="font-black uppercase text-white tracking-widest text-xs">Kordinat XI IPS 5</h4>
              </div>
              <p className="text-sm text-white/50 leading-relaxed italic">
                "Habitat kami berada di zona netral antara perpustakaan dan kantin, dikelilingi oleh aura ambisi purba."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specimens Section */}
      <section id="members" className="bg-[#081009] py-20 md:py-40 border-y border-white/5 scroll-mt-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-8">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white tracking-tighter">Spesimen <span className="text-[#ff9100]">Kawanan</span></h2>
              <p className="text-xs font-black text-[#ccff00] uppercase tracking-[0.5em]">{filteredMembers.length} Subjek Purba Teridentifikasi</p>
            </div>
            <div className="glass px-6 py-3 rounded-2xl border-white/10 flex items-center gap-3 w-full md:w-auto">
              <Search className="text-white/20" size={16} />
              <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari DNA Dino..." 
                className="bg-transparent border-none outline-none text-xs text-white placeholder-white/20 flex-1 md:w-48" 
              />
            </div>
          </div>

          {/* Species Filter */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <div className="flex items-center gap-2 mr-4 text-white/30">
              <Filter size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Filter Spesies:</span>
            </div>
            {uniqueSpecies.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSpecies(s)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedSpecies === s ? 'bg-[#ff9100] text-black shadow-lg shadow-[#ff9100]/20' : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'}`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 md:gap-6">
            {filteredMembers.map((m) => (
              <TiltCard key={m.id} className="group">
                <div className="glass rounded-[2rem] p-4 flex flex-col items-center border-white/5 hover:border-[#ff9100]/40 transition-all shadow-xl group/card relative overflow-hidden">
                  <div className={`absolute top-0 right-0 px-2 py-1 text-[6px] font-black uppercase tracking-widest rounded-bl-lg z-20 ${m.rarity === 'Legendary' || m.rarity === 'Mythic' ? 'bg-[#ff9100] text-black' : 'bg-white/10 text-white/50'}`}>
                    {m.rarity}
                  </div>
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/10 group-hover:border-[#ff9100] p-1 transition-all mb-4 relative z-10 overflow-hidden">
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-xs font-black text-white text-center group-hover:text-[#ff9100] transition-colors truncate w-full">{m.name}</h4>
                  <span className="text-[8px] font-mono text-white/30 uppercase mt-1">{m.species}</span>
                  <div className="mt-3 flex items-center gap-2 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#ccff00]" style={{ width: `${m.power}%` }}></div>
                    </div>
                    <span className="text-[7px] font-black text-[#ccff00]">{m.power}P</span>
                  </div>
                </div>
              </TiltCard>
            ))}
            {filteredMembers.length === 0 && (
              <div className="col-span-full py-20 text-center opacity-20">
                <Search size={48} className="mx-auto mb-4" />
                <p className="font-black uppercase tracking-[0.3em]">Spesimen Tidak Ditemukan</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Structure Section */}
      <section id="structure" className="py-20 md:py-40 bg-[#050805] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">Apex <br/><span className="text-[#ccff00] text-glow">Leaders</span></h2>
            <div className="flex items-center gap-4">
               <Shield className="text-[#ff9100]" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Garis Pertahanan Utama XI IPS 5</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {CLASS_OFFICERS.map((o, i) => (
              <TiltCard key={i}>
                <div className={`glass p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group border-white/5 hover:border-white/20 transition-all ${i === 0 ? 'lg:scale-110 lg:z-10 shadow-2xl shadow-orange-500/10 border-orange-500/20' : ''}`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${o.color} opacity-10 blur-[50px] group-hover:opacity-30 transition-opacity`}></div>
                  <div className="relative z-10 space-y-6">
                    <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner group-hover:rotate-12 transition-transform">
                      <Skull className="text-white" size={32} />
                    </div>
                    <div>
                      <span className="text-[8px] font-black text-[#ccff00] uppercase tracking-widest block mb-2">{o.species} DNA</span>
                      <h3 className="text-lg md:text-2xl font-black text-white leading-tight mb-1">{o.name}</h3>
                      <p className="text-[10px] font-bold uppercase text-white/40 tracking-widest">{o.role}</p>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex justify-between items-center">
                        <span className="text-[7px] font-black uppercase tracking-widest text-white/30">Leadership</span>
                        <span className="text-[10px] font-black text-[#ff9100]">{o.stats.lead}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#ff9100]" style={{ width: `${o.stats.lead}%` }}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[7px] font-black uppercase tracking-widest text-white/30">Wisdom</span>
                        <span className="text-[10px] font-black text-[#ccff00]">{o.stats.wis}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#ccff00]" style={{ width: `${o.stats.wis}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule & Piket Section */}
      <section id="schedule" className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-40 scroll-mt-24">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-7xl font-black italic text-white uppercase tracking-tighter">Siklus <span className="text-[#ff9100]">Habitat</span></h2>
          <div className="flex items-center justify-center gap-4 text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">
            <Clock size={14} />
            <span>07:15 - 15:30 WIB • Senin - Jumat</span>
          </div>
        </div>
        <ScheduleAndDuty />
      </section>

      {/* AI Lab Section */}
      <section id="lab" className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-40 scroll-mt-24">
        <DinoLab />
      </section>

      {/* Dino AI Guide Section */}
      <section id="guide" className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-40 scroll-mt-24">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <DinoGuide />
          <div className="order-first lg:order-last space-y-8">
            <div className="bg-[#ff9100]/20 w-16 h-16 md:w-20 md:h-20 rounded-[2rem] flex items-center justify-center text-[#ff9100] shadow-2xl">
              <MessageSquareQuote size={40} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase leading-none">Konsultasi <br/><span className="text-[#ff9100]">Raptor AI</span></h2>
            <p className="text-lg text-emerald-100/50 font-medium italic">
              "Punya rasa ingin tahu yang besar? Tanya saja maskot Raptor kami. Ia telah melahap ribuan buku sejarah dan sosial!"
            </p>
            <div className="flex items-center gap-4 p-4 glass rounded-2xl border-white/5">
              <Activity className="text-[#ccff00]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">AI Aktif: Menjawab Segala Pertanyaan Kurikulum</span>
            </div>
          </div>
        </div>
      </section>

      {/* Randomizer Section */}
      <section id="randomizer" className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-40 scroll-mt-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-7xl font-black italic uppercase text-white tracking-tighter">Ekstraksi <span className="text-[#ccff00]">Klan</span></h2>
          <div className="w-20 h-1.5 bg-[#ccff00] mx-auto rounded-full mt-4"></div>
        </div>
        <GroupGenerator onGenerate={() => {}} />
      </section>

      {/* Jurassic Echo Section (New Legacy Section) */}
      <section className="bg-gradient-to-b from-transparent to-[#081009] py-20 md:py-40 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-block glass px-6 py-2 rounded-full border-white/10 mb-10">
            <span className="text-[8px] md:text-[10px] font-black text-[#ccff00] uppercase tracking-[0.5em]">Jejak Sejarah Kami</span>
          </div>
          <h2 className="text-5xl md:text-9xl font-black text-white italic opacity-10 uppercase select-none pointer-events-none mb-[-3rem] md:mb-[-6rem]">XI IPS 5 LEGACY</h2>
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {[
              { year: "Eon 2023", title: "Kebangkitan Fosil", desc: "Awal mula terbentuknya klan terkuat di dataran tinggi sekolah." },
              { year: "Eon 2024", title: "Ekspansi Teritori", desc: "Menguasai podium akademik dan panggung kreativitas." },
              { year: "Eon 2025", title: "Evolusi Abadi", desc: "Mempersiapkan diri untuk puncak rantai makanan masa depan." }
            ].map((l, i) => (
              <div key={i} className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-[#ff9100]/20 transition-all group">
                <p className="text-[#ff9100] font-black text-xs mb-4">{l.year}</p>
                <h4 className="text-xl font-black text-white mb-2 uppercase italic">{l.title}</h4>
                <p className="text-xs text-white/40 leading-relaxed italic">"{l.desc}"</p>
                <div className="mt-8 flex justify-center">
                  <Star className="text-white/10 group-hover:text-[#ccff00] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#030603] border-t border-white/5 py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-16">
          <div className="flex items-center gap-4">
            <div className="bg-[#ff9100] p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl">
              <Footprints className="text-black" size={32} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic text-white leading-none">Expes<span className="text-[#ff9100]">five</span></span>
              <span className="text-[8px] md:text-[10px] font-bold text-[#ccff00] uppercase tracking-[0.5em] mt-1">Tribe of XI IPS 5</span>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4 md:gap-6">
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
              {['Home', 'Territory', 'Specimens', 'Schedule', 'Lab'].map(f => (
                <a key={f} href={`#${f === 'Home' ? 'home' : f.toLowerCase()}`} className="hover:text-[#ff9100] hover:scale-125 transition-all transform inline-block">{f}</a>
              ))}
            </div>
            <p className="text-white/10 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-center md:text-right">
              &copy; 2024 The Jurassic Era • Developed by Gen-Z Raptors XI IPS 5
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .animate-sway {
          animation: sway 5s ease-in-out infinite;
        }
        .animate-sway-delayed {
          animation: sway 6s ease-in-out infinite 1s;
        }
        @keyframes pulse-radial {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.25; }
        }
        .animate-pulse-radial {
          animation: pulse-radial 8s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ff9100;
          border-radius: 10px;
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(204, 255, 0, 0.4);
        }
      `}</style>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
