"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const IMAGES = [
    "https://w7.pngwing.com/pngs/13/441/png-transparent-cat-kitten-cat-image-file-formats-animals-cat-like-mammal-thumbnail.png",
    "https://w7.pngwing.com/pngs/605/219/png-transparent-fairy-tinker-bell-drawing-cartoon-tinkerbell-hair-vertebrate-adult-color-thumbnail.png",
    "https://w7.pngwing.com/pngs/627/35/png-transparent-dolphin-kavaii-marine-mammal-dolphin-mammal-animals-chibi-thumbnail.png",
];

interface FloatingItem {
    id: number;
    src: string;
    initialX: number;
    initialY: number;
    size: number;
    duration: number;
    delay: number;
}

export default function FloatingItems() {
    const [items, setItems] = useState<FloatingItem[]>([]);

    useEffect(() => {
        // We generate the items on the client to avoid hydration mismatch with Math.random()
        const newItems = Array.from({ length: 18 }).map((_, i) => ({
            id: i,
            src: IMAGES[i % IMAGES.length],
            initialX: Math.random() * 100,
            initialY: Math.random() * 100,
            size: Math.random() * 80 + 40,
            duration: Math.random() * 15 + 15,
            delay: Math.random() * -30, // Start at different points in their animation cycle
        }));
        setItems(newItems);
    }, []);

    return (
        <div className="floating-container">
            {items.map((item) => (
                <motion.img
                    key={item.id}
                    src={item.src}
                    alt="floating deco"
                    className="floating-item"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 0.4,
                        x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
                        y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
                        rotate: [0, 20, -20, 0],
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "easeInOut",
                    }}
                    style={{
                        position: "absolute",
                        top: `${item.initialY}%`,
                        left: `${item.initialX}%`,
                        width: item.size,
                        height: "auto",
                    }}
                />
            ))}

            <style jsx>{`
        .floating-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: -1;
          overflow: hidden;
        }
        .floating-item {
          filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.2));
        }
      `}</style>
        </div>
    );
}
