"use client";

import { useState } from "react";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import FloatingItems from "@/components/FloatingItems";
import { motion } from "framer-motion";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <EnvelopeIntro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <main>
      <FloatingItems />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        oli seyor lindo
      </motion.h1>
      <motion.p
        style={{ fontSize: "1.5rem", marginTop: "1rem", display: "inline-block" }}
        animate={{ rotate: [-10, 10, -10] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Quiero decirte algo
      </motion.p>
    </main>
  );
}
