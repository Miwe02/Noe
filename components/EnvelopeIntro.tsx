"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface EnvelopeIntroProps {
    onComplete: () => void;
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
    const [phase, setPhase] = useState<"entry" | "open" | "reveal">("entry");

    useEffect(() => {
        // Stage 1: Entry from left to center (duration 1.5s)
        const timer1 = setTimeout(() => {
            setPhase("open");
        }, 1500);

        // Stage 2: Open flap (duration 1s)
        const timer2 = setTimeout(() => {
            setPhase("reveal");
        }, 2800);

        // Stage 3: Complete reveal (duration 1s after reveal starts)
        const timer3 = setTimeout(() => {
            onComplete();
        }, 4000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete]);

    return (
        <div className="envelope-container">
            <AnimatePresence>
                {phase !== "reveal" && (
                    <motion.div
                        className="envelope-wrapper"
                        initial={{ x: "-100vw", rotate: -10 }}
                        animate={{ x: 0, rotate: 0 }}
                        exit={{ opacity: 0, scale: 2, transition: { duration: 0.8 } }}
                        transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    >
                        <div className="envelope">
                            {/* Top Flap */}
                            <motion.div
                                className="flap"
                                initial={{ rotateX: 0 }}
                                animate={{ rotateX: phase === "open" ? 180 : 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            />
                            {/* Envelope Body (Pocket) */}
                            <div className="pocket" />
                            {/* Paper inside (optional detail) */}
                            <motion.div
                                className="paper"
                                initial={{ y: 0 }}
                                animate={{ y: phase === "open" ? -40 : 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
        .envelope-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: white;
          z-index: 1000;
          overflow: hidden;
        }

        .envelope-wrapper {
          position: relative;
          width: 80vw;
          max-width: 600px;
          aspect-ratio: 3/2;
          perspective: 1000px;
        }

        .envelope {
          position: relative;
          width: 100%;
          height: 100%;
          background: #f0f0f0;
          border: 2px solid #ddd;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .flap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: #e0e0e0;
          border: 1px solid #ccc;
          z-index: 3;
          transform-origin: top;
          clip-path: polygon(0 0, 100% 0, 50% 100%);
        }

        .pocket {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #fdfdfd;
          z-index: 2;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 50% 50%);
          border-top: 1px solid #eee;
        }

        .paper {
          position: absolute;
          top: 10%;
          left: 5%;
          width: 90%;
          height: 80%;
          background: white;
          z-index: 1;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
      `}</style>
        </div>
    );
}
