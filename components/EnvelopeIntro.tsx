"use client";

import { useState, useEffect } from "react";

interface EnvelopeIntroProps {
    onComplete: () => void;
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
    const [showEffects, setShowEffects] = useState(false);

    useEffect(() => {
        // Trigger effects when flap starts opening (2s)
        const effectTimer = setTimeout(() => setShowEffects(true), 2500);

        // Total duration increased to account for the new sequence
        const timer = setTimeout(() => {
            onComplete();
        }, 7600);

        return () => {
            clearTimeout(effectTimer);
            clearTimeout(timer);
        };
    }, [onComplete]);

    return (
        <div className="envelope-container">
            <div className="scene">
                {showEffects && (
                    <div className="celebration-layer">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={`heart-${i}`} className={`particle heart p-${i % 5}`} />
                        ))}
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={`spark-${i}`} className={`particle spark s-${i % 5}`} />
                        ))}
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div key={`star-${i}`} className={`particle star st-${i % 5}`} />
                        ))}
                    </div>
                )}

                <div className="envelope">
                    <div className="bottom-left"></div>
                    <div className="bottom-right"></div>
                    <div className="flap"></div>
                </div>

                <div className="letter">
                    <div className="letter-text">Para Noe :3</div>
                </div>
                <div className="shadow"></div>
            </div>

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
                    background: linear-gradient(135deg, #1e7d3a, #145a28);
                    overflow: hidden;
                    perspective: 1400px;
                    z-index: 1000;
                }

                .scene {
                    position: relative;
                    width: 350px;
                    height: 300px;
                    transform-style: preserve-3d;
                    animation: slideIn 2s ease-out forwards;
                }

                @keyframes slideIn {
                    0% { transform: translateX(-120vw) rotateY(20deg); }
                    100% { transform: translateX(0); }
                }

                /* CELEBRATION EFFECTS */
                .celebration-layer {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 10;
                }

                .particle {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    opacity: 0;
                }

                .heart::before {
                    content: "❤️";
                    font-size: 20px;
                }
                .spark::before {
                    content: "✨";
                    font-size: 15px;
                }
                .star::before {
                    content: "🌸";
                    font-size: 18px;
                }

                .particle {
                    animation: explode 2s ease-out forwards;
                }

                @keyframes explode {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(var(--tx), var(--ty)) rotate(var(--tr)) scale(1.5);
                        opacity: 0;
                    }
                }

                /* Randomized positions using CSS variables or nth-child logic */
                .p-0 { --tx: -150px; --ty: -200px; --tr: 45deg; animation-delay: 0.1s; }
                .p-1 { --tx: 150px; --ty: -180px; --tr: -30deg; animation-delay: 0.2s; }
                .p-2 { --tx: -100px; --ty: -250px; --tr: 90deg; animation-delay: 0.15s; }
                .p-3 { --tx: 80px; --ty: -270px; --tr: -15deg; animation-delay: 0.25s; }
                .p-4 { --tx: 0px; --ty: -300px; --tr: 0deg; animation-delay: 0.1s; }

                .s-0 { --tx: -200px; --ty: -100px; --tr: 20deg; animation-delay: 0.3s; }
                .s-1 { --tx: 200px; --ty: -120px; --tr: -50deg; animation-delay: 0.35s; }
                .s-2 { --tx: -120px; --ty: -50px; --tr: 10deg; animation-delay: 0.4s; }
                .s-3 { --tx: 180px; --ty: -80px; --tr: -10deg; animation-delay: 0.45s; }
                .s-4 { --tx: 50px; --ty: -150px; --tr: 30deg; animation-delay: 0.5s; }

                .st-0 { --tx: -80px; --ty: -120px; --tr: 120deg; animation-delay: 0.1s; }
                .st-1 { --tx: 90px; --ty: -130px; --tr: -90deg; animation-delay: 0.2s; }
                .st-2 { --tx: -30px; --ty: -180px; --tr: 60deg; animation-delay: 0.15s; }
                .st-3 { --tx: 40px; --ty: -200px; --tr: -45deg; animation-delay: 0.25s; }
                .st-4 { --tx: 10px; --ty: -250px; --tr: 10deg; animation-delay: 0.1s; }

                .bottom-left, .bottom-right {
                    position: absolute;
                    width: 50%;
                    height: 100%;
                    top: 0;
                    background: linear-gradient(to bottom, #f5f5f5, #e5e5e5);
                }

                .bottom-left {
                    left: 0;
                    clip-path: polygon(0 0, 100% 50%, 0 100%);
                }

                .bottom-right {
                    right: 0;
                    clip-path: polygon(100% 0, 0 50%, 100% 100%);
                }

                .flap {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    transform-origin: top center;
                    animation: openFlap 1.2s ease forwards 2s;
                }

                .flap::before {
                    content: "";
                    position: absolute;
                    border-left: 160px solid transparent;
                    border-right: 160px solid transparent;
                    border-top: 120px solid #f8f8f8;
                    top: 0;
                    left: 0;
                    filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.3));
                }

                @keyframes openFlap {
                    0% { transform: rotateX(0deg); }
                    100% { transform: rotateX(-150deg); }
                }

                .letter {
                    position: absolute;
                    width: 280px;
                    height: 170px;
                    left: 45%;
                    top: -15px;
                    transform: translateX(-50%) translateY(40px) scale(0.9);
                    background: linear-gradient(135deg, #004e92 0%, #000428 100%);
                    border-radius: 8px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                    opacity: 0;
                    z-index: 2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    animation:
                        riseLetter 1.5s ease-out forwards 4.2s,
                        bringFront 0.1s forwards 4.5s,
                        zoomFull 1.6s ease-in-out forwards 6s;
                }

                .letter-text {
                    font-family: Arial, sans-serif;
                    font-weight: bold;
                    font-size: 24px;
                    color: white;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                    animation: fadeOutText 0.5s ease forwards 6s;
                }

                @keyframes fadeOutText {
                    to { opacity: 0; }
                }

                @keyframes riseLetter {
                    0% {
                        opacity: 0;
                        transform: translateX(-50%) translateY(40px) scale(0.9);
                    }
                    30% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(-50%) translateY(-150px) scale(1);
                    }
                }

                @keyframes bringFront {
                    to { z-index: 5; }
                }

                @keyframes zoomFull {
                    0% {
                        top: -15px;
                        left: 45%;
                        transform: translateX(-50%) translateY(-150px) scale(1);
                        border-radius: 8px;
                    }
                    100% {
                        top: 50%;
                        left: 50%;
                        transform: translateX(-50%) translateY(-50%) scale(10);
                        border-radius: 0;
                    }
                }

                .shadow {
                    position: absolute;
                    width: 300px;
                    height: 30px;
                    background: radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 60%, transparent 80%);
                    bottom: -40px;
                    left: 50%;
                    transform: translateX(-50%);
                    filter: blur(6px);
                    animation: fadeShadow 1.2s ease forwards 6s;
                }

                @keyframes fadeShadow {
                    to { opacity: 0; }
                }
            `}</style>
        </div>
    );
}
