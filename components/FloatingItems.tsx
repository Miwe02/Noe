"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const IMAGES = [
    "https://img.freepik.com/vector-premium/ilustracion-gato-lindo-gato-kawaii-chibi-estilo-dibujo-vectorial-dibujos-animados-gato_622550-37.jpg",
    "https://img.freepik.com/fotos-premium/chica-dibujos-animados-cabello-rosa-vestido-azul-sentada-superficie-blanca-generativa-ai_900833-70260.jpg",
    "https://img.freepik.com/vector-gratis/icono-vectorial-dibujos-animados-delfines-lindos-nadando-ilustracion-animales-icono-naturaleza-icono-plano-aislado_138676-12582.jpg",
];

interface FloatingItem {
    id: number;
    src: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    size: number;
    duration: number;
    delay: number;
}

export default function FloatingItems() {
    const [items, setItems] = useState<FloatingItem[]>([]);

    useEffect(() => {
        const newItems = Array.from({ length: 25 }).map((_, i) => {
            const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
            let startX, startY, endX, endY;

            if (side === 0) { // Start top
                startX = Math.random() * 100; startY = -20;
                endX = Math.random() * 100; endY = 120;
            } else if (side === 1) { // Start right
                startX = 120; startY = Math.random() * 100;
                endX = -20; endY = Math.random() * 100;
            } else if (side === 2) { // Start bottom
                startX = Math.random() * 100; startY = 120;
                endX = Math.random() * 100; endY = -20;
            } else { // Start left
                startX = -20; startY = Math.random() * 100;
                endX = 120; endY = Math.random() * 100;
            }

            return {
                id: i,
                src: IMAGES[i % IMAGES.length],
                startX,
                startY,
                endX,
                endY,
                size: Math.random() * 20 + 25, // 25px to 45px
                duration: Math.random() * 4 + 4, // 4s to 8s
                delay: Math.random() * 10,
            };
        });
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
                    initial={{
                        x: `${item.startX}vw`,
                        y: `${item.startY}vh`,
                        rotate: 0,
                        opacity: 0
                    }}
                    animate={{
                        x: `${item.endX}vw`,
                        y: `${item.endY}vh`,
                        rotate: 360,
                        opacity: 0.6
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "linear",
                    }}
                    style={{
                        position: "absolute",
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
          filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
        }
      `}</style>
        </div>
    );
}
