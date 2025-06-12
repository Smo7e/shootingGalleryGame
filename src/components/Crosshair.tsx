import { useEffect, useState } from "react";

const Crosshair = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: position.y,
                left: position.x,
                transform: "translate(-50%, -50%)",
                width: "20px",
                height: "20px",
                pointerEvents: "none",
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    backgroundColor: "red",
                    transform: "translate(-50%, -50%)",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "20px",
                    height: "2px",
                    backgroundColor: "red",
                    transform: "translate(-50%, -50%)",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "2px",
                    height: "20px",
                    backgroundColor: "red",
                    transform: "translate(-50%, -50%)",
                }}
            />
        </div>
    );
};
export default Crosshair;
