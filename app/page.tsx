"use client";

import { useState } from "react";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import FloatingItems from "@/components/FloatingItems";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [stage, setStage] = useState<"intro" | "m1" | "m2" | "final" | "stage2">("intro");
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noButtonPos2, setNoButtonPos2] = useState({ x: 0, y: 0 });
  const [noClicks, setNoClicks] = useState(0);

  if (showIntro) {
    return <EnvelopeIntro onComplete={() => setShowIntro(false)} />;
  }

  const nextStage = () => {
    if (stage === "intro") setStage("m1");
    else if (stage === "m1") setStage("m2");
    else if (stage === "m2") setStage("final");
    else if (stage === "final") setStage("stage2");
  };

  const moveButton = () => {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  const moveButton2 = () => {
    // Larger displacement for the second unclickable button
    const randomX = Math.random() * 600 - 300; // -300px to 300px
    const randomY = Math.random() * 600 - 300; // -300px to 300px
    setNoButtonPos2({ x: randomX, y: randomY });
  };

  const handleNoClick = () => {
    setNoClicks((prev) => {
      const updated = prev + 1;
      if (updated >= 2) {
        setStage("stage2");
      }
      return updated;
    });
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
            <h1>Oli seyor lindo :3</h1>
            <motion.p
              onClick={nextStage}
              className="teaser-text"
              style={{ display: "inline-block" }}
              animate={{ rotate: [-10, 10, -10] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Quiero decirte algo
            </motion.p>
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

        {stage === "final" && (
          <motion.div
            key="final"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="content-wrapper"
          >
            <h2>¿Sabes que me gustas mucho? 😻</h2>
            <div className="button-group">
              <button className="btn-yes" onClick={() => setStage("stage2")}>Sí clarooo</button>
              <motion.button
                className="btn-no"
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={moveButton}
                onClick={handleNoClick}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                No :c
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === "stage2" && (
          <motion.div
            key="stage2"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="content-wrapper"
          >
            <h2>Para mí ser feliz no tenía significado hasta que te conocí, lo sabías? ✨</h2>
            <div className="button-group">
              <button className="btn-yes">Sí miamor</button>
              <motion.button
                className="btn-no"
                animate={{ x: noButtonPos2.x, y: noButtonPos2.y }}
                onMouseEnter={moveButton2}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Prefería no saberlo
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
