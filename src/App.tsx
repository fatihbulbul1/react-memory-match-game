import { useState } from "react";
import { Grid } from "./components/Grid";
import Score from "./components/Score";

function App() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  return (
    <div className="App">
      <Score score={score} gameOver={gameOver} />
      <Grid score={score} setScore={setScore} setGameOver={setGameOver} />
    </div>
  );
}

export default App;
