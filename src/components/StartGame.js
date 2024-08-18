// import { useState } from "react";
import startImage from "../Assets/testBg.jpg";
import bgSound from "../Assets/African_fun_long.mp3";
export default function StartGame({ onStart }) {
  // const [removeBg, setRemoveBg] = useState(true);

  function handleBg() {
    // setRemoveBg(false);
    onStart(); //
    const audio = new Audio(bgSound);
    audio.loop = true;
    audio.play();
  }

  return (
    <div className="yazanB">
      {
        <div>
          <div className="img-start-game">
            <img src={startImage} alt="start" />
          </div>
          <button className="start-game" onClick={handleBg}>
            Start Game
          </button>
        </div>
      }
    </div>
  );
}
