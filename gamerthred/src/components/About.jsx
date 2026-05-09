import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const cards = [
  {
    title: "About GamerThred",
    accent: "purple",
    body: (
      <>
        Welcome to{" "}
        <span style={{ color: "#a78bfa", fontWeight: 700 }}>GamerThred</span>,
        where gamers earn rewards for playing their favorite games! We believe every player should be rewarded. Our platform lets you complete fun, game-specific missions to earn cool stuff like T-shirts and gaming gear.
      </>
    ),
    imgKey: "firstgold",
  },
  {
    title: "What We Do",
    accent: "cyan",
    body: "With one affordable monthly subscription, you can unlock missions in our platform. Hit goals like reaching Diamond rank or completing quests, and claim awesome rewards. The more you play, the more you earn!",
    imgKey: "firstblue",
  },
  {
    title: "Why GamerThred?",
    accent: "purple",
    list: [
      { label: "For All Gamers:",      text: "Casual or pro, everyone gets rewarded." },
      { label: "Easy & Fun:",          text: "Just play, complete missions, and grab your rewards." },
      { label: "Real Prizes:",         text: "Get gaming gear, apparel, and more." },
      { label: "Community Vibes:",     text: "Join gamers who share your passion." },
    ],
    goal: "We want every gamer to feel valued. GamerThred turns your in-game wins into real-world rewards.",
    imgKey: "thirdgold",
  },
];

const accentMap = {
  purple: { color: "#a78bfa", border: "rgba(124,58,237,0.25)", glow: "rgba(124,58,237,0.1)" },
  cyan:   { color: "#22D3EE", border: "rgba(34,211,238,0.25)",  glow: "rgba(34,211,238,0.08)" },
};

const About = () => (
  <section
    className="relative overflow-hidden"
    style={{ background: "var(--bg-surface)", borderTop: "1px solid rgba(255,255,255,0.05)" }}
  >
    {/* Ambient glows */}
    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />

    <div className="section-padding max-container relative z-10">
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-16 gap-4">
        <motion.div
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
          className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide"
          style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"var(--text-primary)" }}>
          Our Story
        </motion.div>

        <motion.h2
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:0.6, delay:0.1, ease:[0.22,1,0.36,1] }}
          className="font-heading font-semibold tracking-tight"
          style={{ fontSize:"clamp(32px,5vw,64px)", color:"var(--text-primary)" }}>
          About GamerThred
        </motion.h2>

        <motion.p
          initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          transition={{ duration:0.6, delay:0.2 }}
          className="text-sm max-w-lg" style={{ color:"var(--text-muted)" }}>
          A platform built by gamers, for gamers — where your in-game achievements translate into real-world value.
        </motion.p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => {
          const ac = accentMap[card.accent];
          return (
            <motion.div
              key={card.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once:true, margin:"-60px" }}
              className="glass-card relative flex flex-col overflow-hidden p-0"
            >
              {/* Top accent line */}
              <div className="w-full h-[2px]" style={{ background:`linear-gradient(90deg, ${ac.color}, transparent)` }} />

              <div className="p-7 flex flex-col gap-5 flex-1">
                {/* Title */}
                <h3 className="text-lg font-heading font-semibold" style={{ color: "var(--text-primary)" }}>
                  {card.title}
                </h3>

                {/* Body */}
                {card.body && (
                  <p className="text-sm leading-relaxed" style={{ color:"var(--text-muted)" }}>
                    {card.body}
                  </p>
                )}

                {/* List */}
                {card.list && (
                  <ul className="flex flex-col gap-3">
                    {card.list.map(({ label, text }) => (
                      <li key={label} className="flex gap-2 text-sm" style={{ color:"var(--text-muted)" }}>
                        <span className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background:ac.color, marginTop:5 }} />
                        <span><strong style={{ color:"var(--text-primary)", fontWeight:600 }}>{label}</strong> {text}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Goal */}
                {card.goal && (
                  <div className="mt-2 p-4 rounded-xl text-sm leading-relaxed" style={{ background:"rgba(124,58,237,0.08)", border:"1px solid rgba(124,58,237,0.15)", color:"var(--text-muted)" }}>
                    <span className="font-semibold block mb-1" style={{ color:"#a78bfa" }}>Our Goal</span>
                    {card.goal}
                  </div>
                )}

                {/* Image */}
                {assets[card.imgKey] && (
                  <div className="mt-auto overflow-hidden rounded-xl border border-white/5">
                    <img src={assets[card.imgKey]} alt={card.title}
                      className="w-full object-cover transition-transform duration-700 hover:scale-105 rounded-xl" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default About;
