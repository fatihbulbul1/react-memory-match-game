import { FC, useState } from "react";
interface Props {
  score: number;
  setScore: (score: number) => void;
  setGameOver: (gameOver: boolean) => void;
}
type Cell = {
  row: number;
  col: number;
};

export const Grid: FC<Props> = ({ score, setScore, setGameOver }) => {
  const shuffler = (): number[][] => {
    const numbers = [1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1];
    const shuffled = numbers.sort(() => 0.5 - Math.random());
    const newArr: number[][] = [];
    while (shuffled.length) newArr.push(shuffled.splice(0, 4));
    return newArr;
  };
  const [grid, setGrid] = useState<number[][]>(shuffler);
  const [revealedGrid, setRevealedGrid] = useState(
    new Array(grid.length)
      .fill("")
      .map(() => new Array(grid[0].length).fill(false))
  );
  const [colorGrid, setColorGrid] = useState(
    new Array(grid.length)
      .fill("")
      .map(() => new Array(grid[0].length).fill(false))
  );
  const [previousClicked, setPreviousClicked] = useState<Cell | undefined>();
  const [isBusy, setIsBusy] = useState(false);
  const checkGameOver = () => {
    const arr = colorGrid.flat();
    const result = arr.includes(false);
    setGameOver(!result);
  };
  const handleClick = (row: number, col: number) => {
    if (revealedGrid[row][col] || isBusy) return;
    const newRevealedGrid = [...revealedGrid];
    newRevealedGrid[row][col] = true;
    setRevealedGrid(newRevealedGrid);
    if (previousClicked) {
      if (grid[previousClicked.row][previousClicked.col] === grid[row][col]) {
        const newColorGrid = [...colorGrid];
        newColorGrid[row][col] = true;
        newColorGrid[previousClicked.row][previousClicked.col] = true;
        setPreviousClicked(undefined);
      } else {
        setIsBusy(true);
        setTimeout(() => {
          newRevealedGrid[row][col] = false;
          newRevealedGrid[previousClicked.row][previousClicked.col] = false;
          setPreviousClicked(undefined);
          setIsBusy(false);
        }, 500);
      }
      setScore(score + 1);
    } else {
      setPreviousClicked({ row, col });
    }
    checkGameOver();
  };
  return (
    <div id="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row ">
          {row.map((number, colIndex) => (
            <div
              onClick={() => handleClick(rowIndex, colIndex)}
              key={colIndex}
              className={
                "cell " +
                (colorGrid[rowIndex][colIndex] ? "correct " : "") +
                (revealedGrid[rowIndex][colIndex] ? "revealed" : "")
              }
            >
              {revealedGrid[rowIndex][colIndex] ? grid[rowIndex][colIndex] : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
