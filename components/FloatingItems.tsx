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
        const newItems = Array.from({ length: 12 }).map((_, i) => {
            const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
            let startX, startY, endX, endY;

            // Using wider bounds (-40 to 140) to ensure they are well off-screen
            if (side === 0) { // Start top
                startX = Math.random() * 100; startY = -40;
                endX = Math.random() * 100; endY = 140;
            } else if (side === 1) { // Start right
                startX = 140; startY = Math.random() * 100;
                endX = -40; endY = Math.random() * 100;
            } else if (side === 2) { // Start bottom
                startX = Math.random() * 100; startY = 140;
                endX = Math.random() * 100; endY = -40;
            } else { // Start left
                startX = -40; startY = Math.random() * 100;
                endX = 140; endY = Math.random() * 100;
            }

            return {
                id: i,
                src: IMAGES[i % IMAGES.length],
                startX,
                startY,
                endX,
                endY,
                size: Math.random() * 20 + 20, // 20px to 40px
                duration: Math.random() * 10 + 15, // 15s to 25s
                delay: Math.random() * 10,
            };
        });
        setItems(newItems);
    }, []);

    return (
        <div className="floating-container">
            {items.map((item) => (
                <motion.div
                    key={item.id}
                    className="heart-wrapper"
                    initial={{
                        x: `${item.startX}vw`,
                        y: `${item.startY}vh`,
                        rotate: 0,
                        opacity: 0.8
                    }}
                    animate={{
                        x: `${item.endX}vw`,
                        y: `${item.endY}vh`,
                        rotate: 360,
                        opacity: 0.8
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "linear",
                    }}
                    style={{
                        position: "absolute",
                        width: item.size * 1.5,
                        height: item.size * 1.5,
                        left: 0,
                        top: 0
                    }}
                >
                    <div className="heart-shape">
                        <img
                            src={item.src}
                            alt="floating deco"
                            className="floating-item"
                            style={{ width: item.size }}
                        />
                    </div>
                </motion.div>
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
          margin: 0;
          padding: 0;
        }
        .heart-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .heart-shape {
          width: 100%;
          height: 100%;
          background: white;
          clip-path: polygon(50% 15%, 85% 5%, 100% 30%, 100% 50%, 50% 95%, 0% 50%, 0% 30%, 15% 5%);
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .floating-item {
          max-width: 80%;
          height: auto;
          border-radius: 50%;
        }
      `}</style>
        </div>
    );
}
