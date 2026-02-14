"use client";

import { useState } from "react";
import EnvelopeIntro from "@/components/EnvelopeIntro";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <EnvelopeIntro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <main>
      <h1>oli seyor lindo</h1>
    </main>
  );
}
