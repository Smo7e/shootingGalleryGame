import Game from "./components/Game";
import "./App.css";
export type GameState = "ready" | "playing" | "gameOver";

export type ShapeType = "box" | "sphere" | "cone" | "torus" | "cylinder" | "octahedron";
export type TargetProps = {
    id: number;
    position: [number, number, number];
    shape: ShapeType;
    color: string;
    onClick: () => void;
    onDestroy: () => void;
};

function App() {
    return (
        <>
            <main>
                <Game />
            </main>
        </>
    );
}

export default App;
