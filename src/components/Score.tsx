import React, { FC } from "react";

interface Props {
  score: number;
  gameOver: boolean;
}

const Score: FC<Props> = ({ score, gameOver }) => {
  return (
    <div id="score">
      <p id="score-text">Score: {score}</p>
      <p>{gameOver ? `Game over! Score: ${score}` : ""}</p>
    </div>
  );
};

export default Score;
