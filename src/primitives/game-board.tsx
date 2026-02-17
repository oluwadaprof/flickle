import GameTile from "./game-tile";

type TileStatus = "empty" | "correct" | "partial" | "wrong" | "active";

interface Row {
    letters: string[];
    statuses: TileStatus[];
}

interface GameBoardProps {
    rows: Row[];
    currentRow: number;
    maxLetters: number;
    isRevealing?: boolean;
    revealingRow?: number;
}

const GameBoard = ({
    rows,
    currentRow,
    maxLetters,
    isRevealing = false,
    revealingRow = -1,
}: GameBoardProps) => {
    return (
        <div className="flex flex-col font-mono items-center gap-2">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                    {Array.from({ length: maxLetters }).map((_, colIndex) => {
                        const letter = row.letters[colIndex] || "";
                        const status = row.statuses[colIndex] || (rowIndex === currentRow && letter ? "active" : "empty");

                        return (
                            <GameTile
                                key={colIndex}
                                letter={letter}
                                status={status}
                                delay={colIndex}
                                isRevealing={isRevealing && rowIndex === revealingRow}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default GameBoard;
