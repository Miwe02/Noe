"use client";

import { useEffect } from "react";

interface EnvelopeIntroProps {
    onComplete: () => void;
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
    useEffect(() => {
        // Total duration increased to account for the new sequence
        const timer = setTimeout(() => {
            onComplete();
        }, 7600);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="envelope-container">
            <div className="scene">
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

                .envelope {
                    position: relative;
                    width: 320px;
                    height: 200px;
                    background: linear-gradient(to bottom, #ffffff, #ececec);
                    border-radius: 6px;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), inset 0 -5px 10px rgba(0, 0, 0, 0.1);
                    z-index: 3;
                    animation: 
                        sinkEnvelope 1s ease forwards 3.2s,
                        fadeEnvelope 1.2s ease forwards 6s;
                }

                @keyframes sinkEnvelope {
                    to { transform: translateY(80px); }
                }

                @keyframes fadeEnvelope {
                    to {
                        opacity: 0;
                        transform: translateY(130px);
                    }
                }

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
                    color: white;
                    font-size: 1.5rem;
                    font-weight: 500;
                    animation: fadeTextOut 0.5s ease forwards 5.8s;
                }

                @keyframes fadeTextOut {
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
