"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface EnvelopeIntroProps {
    onComplete: () => void;
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
    const [phase, setPhase] = useState<"entry" | "open" | "reveal">("entry");

    useEffect(() => {
        // Stage 1: Entry from left to center (slower: 3s)
        const timer1 = setTimeout(() => {
            setPhase("open");
        }, 3000);

        // Stage 2: Open flap (slower: 2s)
        const timer2 = setTimeout(() => {
            setPhase("reveal");
        }, 6000);

        // Stage 3: Complete reveal (slower: 2s after reveal starts)
        const timer3 = setTimeout(() => {
            onComplete();
        }, 8500);

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
                        initial={{ x: "-120vw", rotate: -15 }}
                        animate={{ x: 0, rotate: 0 }}
                        exit={{ opacity: 0, scale: 2.5, transition: { duration: 1.5 } }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    >
                        <div className="envelope">
                            {/* Top Flap */}
                            <motion.div
                                className="flap"
                                initial={{ rotateX: 0 }}
                                animate={{ rotateX: phase === "open" ? 180 : 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                            {/* Envelope Body (Pocket) */}
                            <div className="pocket" />
                            {/* Paper inside */}
                            <motion.div
                                className="paper"
                                initial={{ y: 0 }}
                                animate={{ y: phase === "open" ? -60 : 0 }}
                                transition={{ delay: 1, duration: 1 }}
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
          width: 70vw;
          aspect-ratio: 3/2;
          perspective: 2000px;
        }

        .envelope {
          position: relative;
          width: 100%;
          height: 100%;
          background: #fdf6e3;
          border: 3px solid #d3c6aa;
          box-shadow: 0 15px 45px rgba(0,0,0,0.15);
          border-radius: 4px;
        }

        .flap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: #eee8d5;
          border: 1px solid #d3c6aa;
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
          background: #fdf6e3;
          z-index: 2;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 50% 50%);
          border-top: 1px solid #eee8d5;
        }

        .paper {
          position: absolute;
          top: 10%;
          left: 5%;
          width: 90%;
          height: 80%;
          background: white;
          z-index: 1;
          box-shadow: 0 0 15px rgba(0,0,0,0.05);
          border-radius: 2px;
        }
      `}</style>
        </div>
    );
}
