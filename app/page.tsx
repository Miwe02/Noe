"use client";

import { useState } from "react";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import FloatingItems from "@/components/FloatingItems";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [stage, setStage] = useState<"intro" | "m1" | "m2" | "m3" | "final">("intro");

  if (showIntro) {
    return <EnvelopeIntro onComplete={() => setShowIntro(false)} />;
  }

  const nextStage = () => {
    if (stage === "intro") setStage("m1");
    else if (stage === "m1") setStage("m2");
    else if (stage === "m2") setStage("m3");
    else if (stage === "m3") setStage("final");
  };

  return (
    <main>
      <FloatingItems />
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="content-wrapper"
          >
            <h1>oli seyor lindo</h1>
            <p
              onClick={nextStage}
              style={{ fontSize: "1.5rem", marginTop: "1rem", display: "inline-block" }}
              animate={{ rotate: [-10, 10, -10] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Quiero decirte algo
            </p>
          </motion.div>
        )}

        {stage === "m1" && (
          <motion.div
            key="m1"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="content-wrapper"
            onClick={nextStage}
          >
            <h2>Mi Amor</h2>
          </motion.div>
        )}

        {stage === "m2" && (
          <motion.div
            key="m2"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="content-wrapper"
            onClick={nextStage}
          >
            <h2>Eres el amor de mi vida</h2>
          </motion.div>
        )}

        {stage === "m3" && (
          <motion.div
            key="m3"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="content-wrapper"
            onClick={nextStage}
          >
            <h2>¿Sabes que me gustas mucho?</h2>
          </motion.div>
        )}

        {stage === "final" && (
          <motion.div
            key="final"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="content-wrapper"
          >
            <h2>😍</h2>
            <div className="button-group">
              <button className="btn-yes">Sí clarooo</button>
              <button className="btn-no">No :c</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
