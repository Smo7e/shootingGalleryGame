import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import {
    BoxGeometry,
    ConeGeometry,
    CylinderGeometry,
    OctahedronGeometry,
    SphereGeometry,
    TorusGeometry,
    type Mesh,
} from "three";
import type { TargetProps } from "../App";

const Target = ({ position, shape, color, onClick, onDestroy }: TargetProps) => {
    const meshRef = useRef<Mesh>(null);
    const [scale, setScale] = useState(1);
    const [hit, setHit] = useState(false);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }

        if (hit && scale > 0.1) {
            setScale(scale * 0.9);
        } else if (hit) {
            onDestroy();
        }
    });

    const handleClick = () => {
        setHit(true);
        onClick();
    };

    const geometry = useMemo(() => {
        switch (shape) {
            case "box":
                return new BoxGeometry(1, 1, 1);
            case "sphere":
                return new SphereGeometry(0.5, 32, 32);
            case "cone":
                return new ConeGeometry(0.5, 1, 32);
            case "torus":
                return new TorusGeometry(0.5, 0.2, 16, 32);
            case "cylinder":
                return new CylinderGeometry(0.5, 0.5, 1, 32);
            case "octahedron":
                return new OctahedronGeometry(0.7);
            default:
                return new BoxGeometry(1, 1, 1);
        }
    }, [shape]);

    return (
        <mesh ref={meshRef} position={position} scale={scale} onClick={handleClick} castShadow>
            <primitive object={geometry} attach="geometry" />
            <meshStandardMaterial color={hit ? "red" : color} />
        </mesh>
    );
};
export default Target;
