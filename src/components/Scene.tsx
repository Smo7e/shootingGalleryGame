import { useEffect, useState } from "react";
import type { GameState, ShapeType } from "../App";
import { useThree } from "@react-three/fiber";
import Target from "./Target";

const Scene = ({
    gameState,
    onTargetHit,
    onTargetDestroy,
}: {
    gameState: GameState;
    onTargetHit: () => void;
    onTargetDestroy: () => void;
}) => {
    const [targets, setTargets] = useState<
        Array<{
            id: number;
            position: [number, number, number];
            shape: ShapeType;
            color: string;
        }>
    >([]);

    const { camera, size } = useThree();

    useEffect(() => {
        camera.position.z = 5;
    }, [camera]);

    useEffect(() => {
        if (gameState !== "playing") return;

        const interval = setInterval(() => {
            const shapes: ShapeType[] = ["box", "sphere", "cone", "torus", "cylinder", "octahedron"];
            const colors = ["#4cc9f0", "#4361ee", "#3a0ca3", "#f72585", "#7209b7", "#4895ef", "#b5179e"];

            // Рассчитываем границы появления объектов на основе размера экрана
            const xBound = size.width / 100;
            const yBound = size.height / 100;

            const newTarget = {
                id: Date.now(),
                position: [
                    Math.random() * xBound * 2 - xBound, // от -xBound до +xBound
                    Math.random() * yBound * 2 - yBound, // от -yBound до +yBound
                    Math.random() * -10 - 5, // от -5 до -15 по оси Z
                ] as [number, number, number],
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                color: colors[Math.floor(Math.random() * colors.length)],
            };

            setTargets((prev) => [...prev, newTarget]);

            // Удаляем цель через 3 секунды, если она не была уничтожена
            setTimeout(() => {
                setTargets((prev) => prev.filter((t) => t.id !== newTarget.id));
            }, 3000);
        }, 300);

        return () => clearInterval(interval);
    }, [gameState, size]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            {targets.map((target) => (
                <Target
                    key={target.id}
                    position={target.position}
                    shape={target.shape}
                    color={target.color}
                    onClick={onTargetHit}
                    onDestroy={() => {
                        setTargets((prev) => prev.filter((t) => t.id !== target.id));
                        onTargetDestroy();
                    }}
                />
            ))}
        </>
    );
};
export default Scene;
