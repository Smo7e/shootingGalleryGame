import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
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

interface Props extends TargetProps {
    id: number;
}

const Target = ({ id, position, shape, color }: Props) => {
    const meshRef = useRef<Mesh>(null);
    const scale = 1;

    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.userData = { id };
        }
    }, [id]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

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
        <mesh ref={meshRef} position={position} scale={scale} castShadow>
            <primitive object={geometry} attach="geometry" />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};
export default Target;
