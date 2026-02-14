"use client";

import { useState } from "react";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import FloatingItems from "@/components/FloatingItems";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [stage, setStage] = useState<"intro" | "m1" | "m2" | "final" | "stage2" | "stage3">("intro");
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noButtonPos2, setNoButtonPos2] = useState({ x: 0, y: 0 });
  const [noButtonPos3, setNoButtonPos3] = useState({ x: 0, y: 0 });
  const [noClicks, setNoClicks] = useState(0);
  const [penaltyClicks, setPenaltyClicks] = useState(0);
  const [penaltyStage, setPenaltyStage] = useState<"none" | "angry" | "gun">("none");

  if (showIntro) {
    return <EnvelopeIntro onComplete={() => setShowIntro(false)} />;
  }

  const nextStage = () => {
    if (stage === "intro") setStage("m1");
    else if (stage === "m1") setStage("m2");
    else if (stage === "m2") setStage("final");
    else if (stage === "final") setStage("stage2");
    else if (stage === "stage2") setStage("stage3");
  };

  const moveButton = () => {
    // Smaller range to keep it within common screen bounds
    const randomX = Math.random() * 160 - 80; // -80 to 80
    const randomY = Math.random() * 160 - 80; // -80 to 80
    setNoButtonPos({ x: randomX, y: randomY });
  };

  const moveButton2 = () => {
    // Larger but still constrained displacement
    const randomX = Math.random() * 300 - 150; // -150 to 150
    const randomY = Math.random() * 300 - 150; // -150 to 150
    setNoButtonPos2({ x: randomX, y: randomY });
  };

  const moveButton3 = () => {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    setNoButtonPos3({ x: randomX, y: randomY });
  };

  const handleNoClick = () => {
    setNoClicks((prev) => {
      const updated = prev + 1;
      if (updated >= 1) { // Advance on FIRST click
        setStage("stage2");
      }
      return updated;
    });
  };

  const handleFinalNoClick = () => {
    setPenaltyClicks((prev) => {
      const updated = prev + 1;
      if (updated >= 3) {
        setPenaltyStage("angry"); // We'll just use one stage now
        setTimeout(() => {
          setPenaltyStage("none");
          setPenaltyClicks(0);
        }, 5000);
      }
      return updated;
    });
  };

  return (
    <main>
      <FloatingItems />
      {showIntro ? (
        <EnvelopeIntro onComplete={() => setShowIntro(false)} />
      ) : (
        <>
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
                <h2>Eres muy  vida</h2>
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
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="content-wrapper"
              >
                <h2>Para mí ser feliz no tenía significado hasta que te conocí, lo sabías? ✨</h2>
                <div className="button-group">
                  <button className="btn-yes" onClick={() => setStage("stage3")}>Sí miamor</button>
                  <motion.button
                    className="btn-no"
                    animate={{ x: noButtonPos2.x, y: noButtonPos2.y }}
                    onMouseEnter={moveButton2}
                    onClick={() => setStage("stage3")}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    Prefería no saberlo
                  </motion.button>
                </div>
              </motion.div>
            )}

            {stage === "stage3" && penaltyStage === "none" && (
              <motion.div
                key="stage3"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="content-wrapper"
              >
                <h2>Quieres pasar el resto de nuestras vidas juntos? 💍</h2>
                <div className="button-group">
                  <button className="btn-yes">Sí, te amo</button>
                  <motion.button
                    className="btn-no"
                    animate={{ x: noButtonPos3.x, y: noButtonPos3.y }}
                    onMouseEnter={moveButton3}
                    onClick={handleFinalNoClick}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    No, ni loco
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {penaltyStage !== "none" && (
              <motion.div
                key="penalty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="penalty-overlay"
              >
                <div className="penalty-content">
                  <img
                    src="https://preview.redd.it/gonna-post-my-cat-template-without-the-text-here-for-no-v0-gid9of9pqw981.png"
                    alt="Angry Cat Template"
                  />
                  <h3>Opción incorrecta, escoje de nuevo</h3>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </main>
  );
}
