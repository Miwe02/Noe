"use client";

import { useState } from "react";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import FloatingItems from "@/components/FloatingItems";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [stage, setStage] = useState<"intro" | "m1" | "m2" | "final" | "stage2" | "stage3" | "success">("intro");
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noButtonPos2, setNoButtonPos2] = useState({ x: 0, y: 0 });
  const [noButtonPos3, setNoButtonPos3] = useState({ x: 0, y: 0 });
  const [noClicks1, setNoClicks1] = useState(0);
  const [noClicks2, setNoClicks2] = useState(0);
  const [penaltyClicks, setPenaltyClicks] = useState(0);
  const [penaltyStage, setPenaltyStage] = useState<"none" | "angry" | "gun">("none");
  const [hasMoved1, setHasMoved1] = useState(false);
  const [hasMoved2, setHasMoved2] = useState(false);
  const [hasMoved3, setHasMoved3] = useState(false);
  const [firstPenaltySeen, setFirstPenaltySeen] = useState(false);

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
    const factor = hasMoved1 ? 1 : 3;
    const randomX = (Math.random() * 160 - 80) * factor;
    const randomY = (Math.random() * 160 - 80) * factor;
    setNoButtonPos({ x: randomX, y: randomY });
    if (!hasMoved1) setHasMoved1(true);
  };

  const moveButton2 = () => {
    const factor = hasMoved2 ? 1 : 3;
    const randomX = (Math.random() * 400 - 200) * factor;
    const randomY = (Math.random() * 400 - 200) * factor;
    setNoButtonPos2({ x: randomX, y: randomY });
    if (!hasMoved2) setHasMoved2(true);
  };

  const moveButton3 = () => {
    const factor = hasMoved3 ? 1 : 3;
    const randomX = (Math.random() * 400 - 200) * factor;
    const randomY = (Math.random() * 400 - 200) * factor;
    setNoButtonPos3({ x: randomX, y: randomY });
    if (!hasMoved3) setHasMoved3(true);
  };

  const handleNoClick1 = () => {
    setNoClicks1((prev) => {
      const updated = prev + 1;
      if (updated >= 1) { // back to 1 click
        setStage("stage2");
      }
      return updated;
    });
  };

  const handleNoClick2 = () => {
    setNoClicks2((prev) => {
      const updated = prev + 1;
      if (updated >= 1) { // back to 1 click
        setStage("stage3");
      }
      return updated;
    });
  };

  const handleFinalNoClick = () => {
    setPenaltyClicks((prev) => {
      const updated = prev + 1;
      if (updated >= 1) { // back to 1 click
        setPenaltyStage("angry");
        setTimeout(() => {
          setPenaltyStage("none");
          setPenaltyClicks(0);
          setFirstPenaltySeen(true); // Once the first full 5s passes, allow skipping in future
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
          <div className="main-content-area">
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
                  <h2>Eres muy especial en mi vida</h2>
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
                      initial={{ x: 0, y: 0 }}
                      animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                      onMouseMove={moveButton}
                      onClick={handleNoClick1}
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
                      initial={{ x: 0, y: 0 }}
                      animate={{ x: noButtonPos2.x, y: noButtonPos2.y }}
                      onMouseMove={moveButton2}
                      onClick={handleNoClick2}
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
                  <h2>Quieres pasar el resto de nuestras vidas juntos? ❤️</h2>
                  <div className="button-group">
                    <button className="btn-yes" onClick={() => { setStage("success"); setPenaltyStage("none"); }}>Sí, te amo</button>
                    <motion.button
                      className="btn-no"
                      initial={{ x: 0, y: 0 }}
                      animate={{ x: noButtonPos3.x, y: noButtonPos3.y }}
                      onMouseMove={moveButton3}
                      onClick={handleFinalNoClick}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      No, ni loco
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {stage === "success" && (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="content-wrapper"
                >
                  <h2>
                    Gracias por tanto mi amor, pronto estaremos juntos, feliz San Valentín :3
                  </h2>
                  <p className="teaser-text" style={{ cursor: "default", opacity: 1, fontSize: "1.8rem" }}>
                    Siempre tuyo,
                  </p>
                  <h1>Miwe</h1>

                  <button
                    className="replay-btn"
                    onClick={() => {
                      setShowIntro(true);
                      setStage("intro");
                      setNoClicks1(0);
                      setNoClicks2(0);
                      setPenaltyClicks(0);
                      setPenaltyStage("none");
                      setHasMoved1(false);
                      setHasMoved2(false);
                      setHasMoved3(false);
                      setNoButtonPos({ x: 0, y: 0 });
                      setNoButtonPos2({ x: 0, y: 0 });
                      setNoButtonPos3({ x: 0, y: 0 });
                    }}
                  >
                    Volver a ver
                  </button>
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
                  style={{ cursor: firstPenaltySeen ? "pointer" : "default" }}
                  onClick={() => {
                    if (firstPenaltySeen) {
                      setPenaltyStage("none");
                      setPenaltyClicks(0);
                    }
                  }}
                >
                  <div className="penalty-content">
                    <img
                      src="/cat-penalty.webp"
                      alt="Angry Cat Template"
                    />
                    <h3>Opción incorrecta, escoje de nuevo</h3>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </main>
  );
}
