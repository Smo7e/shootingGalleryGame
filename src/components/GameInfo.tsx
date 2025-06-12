import type { GameState } from "../App";

// Стили вынесены в отдельный объект для удобства
const styles = {
    container: {
        position: "absolute",
        top: "20px",
        left: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: "24px",
        zIndex: 100,
        cursor: "none",
        color: "#f8f8f8",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
        backgroundColor: "rgba(30, 30, 40, 0.7)",
        padding: "15px 25px",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    infoText: {
        margin: "8px 0",
        fontWeight: "600",
    },
    gameOverText: {
        marginTop: "20px",
        fontSize: "32px",
        fontWeight: "bold",
        color: "#ff5555",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    },
    scoreText: {
        fontSize: "28px",
        margin: "15px 0",
        color: "#4fc3f7",
    },
    button: {
        marginTop: "20px",
        padding: "12px 30px",
        fontSize: "18px",
        cursor: "pointer",
        backgroundColor: "#4caf50",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
        outline: "none",
        ":hover": {
            backgroundColor: "#66bb6a",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        },
        ":active": {
            transform: "translateY(0)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        },
    },
} as const;

const GameInfo = ({
    score,
    timeLeft,
    gameState,
    onStart,
}: {
    score: number;
    timeLeft: number;
    gameState: GameState;
    onStart: () => void;
}) => {
    return (
        <div style={styles.container}>
            <div style={styles.infoText}>Очки: {score}</div>
            <div style={styles.infoText}>Время: {timeLeft}</div>

            {gameState === "ready" && (
                <button onClick={onStart} style={styles.button}>
                    Начать игру
                </button>
            )}

            {gameState === "gameOver" && (
                <div>
                    <div style={styles.gameOverText}>Игра окончена!</div>
                    <div style={styles.scoreText}>Ваш счет: {score}</div>
                    <button onClick={onStart} style={styles.button}>
                        Играть снова
                    </button>
                </div>
            )}
        </div>
    );
};

export default GameInfo;
