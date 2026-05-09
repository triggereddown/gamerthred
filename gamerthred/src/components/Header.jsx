import { useEffect, useState, useRef, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ── THREE.JS ORB ─────────────────────────────────────────── */
const AnimatedOrb = ({ mouseX, mouseY }) => {
  const meshRef = useRef();
  const ringRef = useRef();
  const time    = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.18;
    meshRef.current.rotation.z += delta * 0.06;
    const tx = (mouseX.get() / window.innerWidth  - 0.5) * 0.4;
    const ty = (mouseY.get() / window.innerHeight - 0.5) * 0.4;
    meshRef.current.rotation.x += (ty - meshRef.current.rotation.x) * 0.04;
    meshRef.current.rotation.y += (tx - meshRef.current.rotation.y) * 0.02;
    meshRef.current.scale.setScalar(1 + Math.sin(time.current * 1.2) * 0.018);
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.22;
  });

  return (
    <group>
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.9, 0.008, 16, 100]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[-Math.PI / 5, 0.4, 0]}>
        <torusGeometry args={[2.2, 0.005, 16, 100]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.25} />
      </mesh>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.4}>
        <Sphere ref={meshRef} args={[1.2, 80, 80]}>
          <MeshDistortMaterial color="#5B21B6" distort={0.42} speed={1.8} roughness={0.05} metalness={0.9} />
        </Sphere>
      </Float>
      <Sphere args={[1.35, 32, 32]}>
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.07} side={THREE.BackSide} />
      </Sphere>
      <pointLight position={[3, 3, 3]}    color="#7C3AED" intensity={4}   distance={8} />
      <pointLight position={[-3, -2, -2]} color="#22D3EE" intensity={2.5} distance={8} />
      <pointLight position={[0, 4, 0]}    color="#ffffff"  intensity={0.8} distance={10} />
    </group>
  );
};

/* ── STAT PILL ────────────────────────────────────────────── */
const StatPill = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-start gap-1"
  >
    <span className="text-3xl md:text-4xl font-heading font-medium" style={{ color: "var(--text-primary)" }}>{value}</span>
    <span className="text-xs font-normal tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>{label}</span>
  </motion.div>
);

/* ── MISSION CARD ─────────────────────────────────────────── */
const MissionCard = ({ game, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6, scale: 1.01 }}
    onClick={onClick}
    className="cursor-pointer group relative overflow-hidden rounded-2xl flex flex-col"
    style={{
      background: "rgba(11,11,18,0.8)",
      border: "1px solid rgba(255,255,255,0.07)",
      backdropFilter: "blur(16px)",
      boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    }}
  >
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
      style={{ boxShadow: "inset 0 0 0 1px rgba(124,58,237,0.5), 0 0 40px rgba(124,58,237,0.12)" }} />

    <div className="relative w-full aspect-video overflow-hidden">
      <img src={game.demo_image_url} alt={game.task_name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
        style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", color: "#a78bfa" }}>
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" /> LIVE
      </div>
    </div>

    <div className="p-6 flex flex-col gap-3 flex-1">
      <h3 className="text-xl font-heading font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
        {game.task_name}
      </h3>
      <p className="text-sm leading-relaxed line-clamp-2 font-normal" style={{ color: "var(--text-muted)" }}>
        {game.task_description}
      </p>
      <div className="flex items-center gap-4 text-xs mt-1" style={{ color: "var(--text-muted)" }}>
        <span>⏱ {game.time}</span>
        <span>👥 {game.joined_users}/{game.total_users}</span>
      </div>
      {game.countdown && (
        <div className="flex items-center gap-2 mt-2">
          {[{ v: game.countdown.days, l: "d" }, { v: game.countdown.hours, l: "h" },
            { v: game.countdown.minutes, l: "m" }, { v: game.countdown.seconds, l: "s" }].map(({ v, l }) => (
            <div key={l} className="countdown-chip">{v}<span className="text-[10px] opacity-50 ml-0.5">{l}</span></div>
          ))}
          <span className="text-[11px] ml-1" style={{ color: "#6b7280" }}>remaining</span>
        </div>
      )}
      <div className="mt-auto pt-4">
        <span className="text-xs font-semibold tracking-widest uppercase gradient-text">View Mission →</span>
      </div>
    </div>
  </motion.div>
);

/* ── MAIN COMPONENT ───────────────────────────────────────── */
const Header = () => {
  const [gamePreviewData, setGamePreviewData] = useState([
    {
      task_id: "mock-1",
      group_id: "valorant",
      task_name: "100 Headshots in Valorant",
      task_description: "Achieve 100 headshots in unrated or competitive matches this week.",
      time: "2 Days",
      joined_users: 1420,
      total_users: 5000,
      demo_image_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
      countdown: { days: "02", hours: "14", minutes: "30", seconds: "00" }
    },
    {
      task_id: "mock-2",
      group_id: "apex",
      task_name: "Diamond Rank Rush",
      task_description: "Hit Diamond rank in Apex Legends before the season ends to claim.",
      time: "5 Days",
      joined_users: 850,
      total_users: 2000,
      demo_image_url: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop",
      countdown: { days: "05", hours: "08", minutes: "15", seconds: "00" }
    }
  ]);
  const navigate = useNavigate();
  const mouseX   = useMotionValue(0);
  const mouseY   = useMotionValue(0);
  const springX  = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY  = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const heroParallaxX = useTransform(springX, [0, typeof window !== "undefined" ? window.innerWidth  : 1440], [-12, 12]);
  const heroParallaxY = useTransform(springY, [0, typeof window !== "undefined" ? window.innerHeight : 900],  [-8,  8]);

  useEffect(() => {
    const onMove = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  /* fetch */
  useEffect(() => {
    fetch("https://gamerthred.com/api/all_tasks_grouped.php")
      .then((r) => r.json())
      .then((data) => {
        if (data.status === 200) {
          const all = [];
          for (const [groupKey, tasks] of Object.entries(data.data))
            tasks.forEach((t) => all.push({ ...t, group_id: groupKey }));
          if (all.length > 0) {
            const picked = all.sort(() => 0.5 - Math.random()).slice(0, 2);
            setGamePreviewData(picked.map((g) => ({ ...g, countdown: { days:"00", hours:"00", minutes:"00", seconds:"00" } })));
          }
        }
      })
      .catch((e) => console.error("Failed to fetch tasks:", e));
  }, []);

  /* countdown */
  useEffect(() => {
    const iv = setInterval(() => {
      setGamePreviewData((prev) =>
        prev.map((game) => {
          const deadline = game.end_time ? new Date(game.end_time) : new Date(Date.now() + 86400000);
          const diff = deadline - Date.now();
          if (diff <= 0) return { ...game, countdown: { days:"00", hours:"00", minutes:"00", seconds:"00" } };
          return {
            ...game,
            countdown: {
              days:    String(Math.floor(diff / 86400000)).padStart(2, "0"),
              hours:   String(Math.floor((diff / 3600000) % 24)).padStart(2, "0"),
              minutes: String(Math.floor((diff / 60000) % 60)).padStart(2, "0"),
              seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
            },
          };
        })
      );
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const words1 = "EARN WHAT".split(" ");
  const words2 = "YOU DESERVE".split(" ");
  const wordVar = {
    hidden:  { opacity: 0, y: 40, skewY: 4 },
    visible: (i) => ({ opacity: 1, y: 0, skewY: 0, transition: { duration: 0.65, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col" style={{ background: "var(--bg-deep)" }}>
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-5%] w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* ── HERO ── */}
      <div className="section-padding max-container w-full flex flex-col items-center justify-center text-center gap-10 relative z-10 flex-1 pt-40">

        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
          className="flex items-center gap-3 px-4 py-2 rounded-full text-xs font-medium tracking-wide mx-auto"
          style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"var(--text-primary)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Game. Progress. Win.
        </motion.div>

        <h1 className="font-heading font-semibold leading-[1.05] tracking-tight max-w-4xl mx-auto"
          style={{ fontSize:"clamp(48px,8vw,96px)", color:"var(--text-primary)" }}>
          {words1.map((w, i) => (
            <motion.span key={w+i} custom={i} variants={wordVar} initial="hidden" animate="visible"
              className="inline-block mr-[0.25em]">{w}</motion.span>
          ))}
          <br />
          {words2.map((w, i) => (
            <motion.span key={w+i} custom={words1.length+i} variants={wordVar} initial="hidden" animate="visible"
              className="inline-block mr-[0.25em] gradient-text">{w}</motion.span>
          ))}
        </h1>

        <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.6, ease:[0.22,1,0.36,1] }}
          className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-normal" style={{ color:"var(--text-muted)" }}>
          Join the gaming revolution where every match matters, every skill pays off, and every click brings you closer to real-world rewards.
        </motion.p>

        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.8, ease:[0.22,1,0.36,1] }}
          className="flex flex-wrap gap-4 justify-center">
          <Link to="/signup" className="btn-primary text-sm">Start Earning Free →</Link>
          <Link to="/missiondetails" className="btn-secondary text-sm">Zebion Exclusive ✦</Link>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.7, delay:1.0 }}
          className="flex items-center gap-8 pt-8 justify-center">
          <StatPill value="10K+" label="Gamers"    delay={1.1} />
          <div className="h-10 w-px bg-white/10" />
          <StatPill value="₹2L+" label="Rewarded"  delay={1.2} />
          <div className="h-10 w-px bg-white/10" />
          <StatPill value="50+"  label="Missions"   delay={1.3} />
        </motion.div>

      </div>

      {/* ── MISSIONS SECTION ── */}
      <div className="relative z-10 w-full max-container pb-24 px-8">
        <div className="flex flex-col items-center text-center mb-14 gap-4">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
            className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide"
            style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"var(--text-primary)" }}>
            Featured Missions
          </motion.div>
          <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ duration:0.6, delay:0.1, ease:[0.22,1,0.36,1] }}
            className="font-heading font-semibold tracking-tight"
            style={{ fontSize:"clamp(28px,4vw,48px)", color:"var(--text-primary)" }}>
            Live Challenges
          </motion.h2>
          <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            transition={{ duration:0.6, delay:0.2 }} className="text-base max-w-md font-normal" style={{ color:"var(--text-muted)" }}>
            Complete real missions, hit milestones, and claim physical rewards. Updated daily.
          </motion.p>
        </div>

        {gamePreviewData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {gamePreviewData.map((game, i) => (
              <MissionCard key={game.task_id} game={game} index={i} onClick={() => navigate(`/games/${game.group_id}`)} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[0, 1].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden"
                style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.05)", height:440 }}>
                <div className="w-full h-48" style={{ background:"rgba(255,255,255,0.04)" }} />
                <div className="p-6 flex flex-col gap-4">
                  <div className="h-5 rounded-lg w-3/4" style={{ background:"rgba(255,255,255,0.05)" }} />
                  <div className="h-4 rounded-lg w-full" style={{ background:"rgba(255,255,255,0.03)" }} />
                  <div className="h-4 rounded-lg w-2/3" style={{ background:"rgba(255,255,255,0.03)" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:0.6, delay:0.3 }} className="flex justify-center mt-12">
          <Link to="/missions" className="btn-secondary text-sm px-8">View All Missions →</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Header;
