import { useEffect, useState } from "react";
import type { GameState } from "../App";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import GameInfo from "./GameInfo";
import Crosshair from "./Crosshair";

const Game = () => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameState, setGameState] = useState<GameState>("ready");
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameState("playing");
    };

    useEffect(() => {
        if (gameState !== "playing") return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setGameState("gameOver");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameState]);
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleTargetHit = () => {
        setScore((prev) => prev + 10);
    };

    const handleTargetDestroy = () => {};

    return (
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
            <Canvas
                shadows
                style={{ width: windowSize.width, height: windowSize.height, cursor: "none", background: "skyblue" }}
            >
                <Scene gameState={gameState} onTargetHit={handleTargetHit} onTargetDestroy={handleTargetDestroy} />
            </Canvas>
            <Crosshair />
            <GameInfo score={score} timeLeft={timeLeft} gameState={gameState} onStart={startGame} />
        </div>
    );
};

export default Game;
