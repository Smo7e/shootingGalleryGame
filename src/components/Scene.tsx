import { useEffect, useState, useRef } from "react";
import type { GameState, ShapeType } from "../App";
import { useThree, useFrame } from "@react-three/fiber";
import Target from "./Target";
import * as THREE from "three";

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

    const { camera, size, scene } = useThree();
    const raycaster = useRef(new THREE.Raycaster());
    const mouse = useRef(new THREE.Vector2());
    const [isShooting, setIsShooting] = useState(false);

    useEffect(() => {
        camera.position.z = 5;
    }, [camera]);

    useEffect(() => {
        if (gameState !== "playing") return;

        const interval = setInterval(() => {
            const shapes: ShapeType[] = ["box", "sphere", "cone", "torus", "cylinder", "octahedron"];
            const colors = ["#4cc9f0", "#4361ee", "#3a0ca3", "#f72585", "#7209b7", "#4895ef", "#b5179e"];

            const xBound = size.width / 100;
            const yBound = size.height / 100;

            const newTarget = {
                id: Date.now(),
                position: [
                    Math.random() * xBound * 2 - xBound,
                    Math.random() * yBound * 2 - yBound,
                    Math.random() * -10 - 5,
                ] as [number, number, number],
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                color: colors[Math.floor(Math.random() * colors.length)],
            };

            setTargets((prev) => [...prev, newTarget]);

            setTimeout(() => {
                setTargets((prev) => prev.filter((t) => t.id !== newTarget.id));
            }, 3000);
        }, 300);

        return () => clearInterval(interval);
    }, [gameState, size]);

    const onMouseMove = (event: MouseEvent) => {
        mouse.current.x = (event.clientX / size.width) * 2 - 1;
        mouse.current.y = -(event.clientY / size.height) * 2 + 1;
    };

    const onMouseClick = () => {
        setIsShooting(true);
    };

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove, false);
        window.addEventListener("click", onMouseClick, false);

        return () => {
            window.removeEventListener("mousemove", onMouseMove, false);
            window.removeEventListener("click", onMouseClick, false);
        };
    }, [size]);

    useFrame(() => {
        if (isShooting) {
            raycaster.current.setFromCamera(mouse.current, camera);

            const intersects = raycaster.current.intersectObjects(scene.children, true);

            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object;

                const targetData = targets.find((target) => {
                    let current: THREE.Object3D<THREE.Object3DEventMap> | null = intersectedObject;
                    while (current) {
                        if (current.userData?.id === target.id) {
                            return true;
                        }
                        current = current.parent;
                    }
                    return false;
                });

                if (targetData) {
                    onTargetHit();

                    setTargets((prev) => prev.filter((t) => t.id !== targetData.id));
                    onTargetDestroy();
                }
            }

            setIsShooting(false);
        }
    });

    return (
        <>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            {targets.map((target) => (
                <Target
                    key={target.id}
                    id={target.id}
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
