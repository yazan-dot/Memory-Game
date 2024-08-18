import { useState, useEffect } from "react";
import EditLevel from "./components/EditLevel";
import GameBoard from "./components/GameBoard";
import StartGame from "./components/StartGame";
import GameOver from "./components/GameOver";
import myClickSound from "./Assets/zapsplat_multimedia_game_sound_click_selection_menu_002_73512.mp3";
import loseGameSound from "./Assets/cartoon_fail_trumpet_002.mp3";
let list = [
  { name: require("./Assets/1.png"), id: 1 },
  { name: require("./Assets/1.png"), id: -1 },
  { name: require("./Assets/2.png"), id: 2 },
  { name: require("./Assets/2.png"), id: -2 },
  { name: require("./Assets/3.png"), id: 3 },
  { name: require("./Assets/3.png"), id: -3 },
  { name: require("./Assets/4.png"), id: 4 },
  { name: require("./Assets/4.png"), id: -4 },
  { name: require("./Assets/5.png"), id: 5 },
  { name: require("./Assets/5.png"), id: -5 },
  { name: require("./Assets/6.png"), id: 6 },
  { name: require("./Assets/6.png"), id: -6 },
  { name: require("./Assets/7.png"), id: 7 },
  { name: require("./Assets/7.png"), id: -7 },
  { name: require("./Assets/8.png"), id: 8 },
  { name: require("./Assets/8.png"), id: -8 },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const [selectLevel, setSelectLevel] = useState("one");
  const [showCards, setShowCards] = useState(true);
  const [timer, setTimer] = useState(20);
  const [mistake, setMistake] = useState(2);
  const [clickNumber, setClickNumber] = useState(2);
  const [shuffledArray, setShuffledArray] = useState([]);
  const [isOver, setIsOver] = useState(false);
  const [timerPop, setTimerPop] = useState(false);
  const [yazan, setYazan] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  function loserSound() {
    new Audio(loseGameSound).play();
  }
  useEffect(() => {
    if (gameStarted) {
      handleLevel(selectLevel);
    }
  }, [selectLevel, gameStarted]);

  useEffect(() => {
    if (timer === 0) {
      loserSound();

      setIsOver(true);
      setTimerPop(true);
    } else if (gameStarted && timer > 0) {
      const timerId = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timer, gameStarted]);

  function handleLevel(level) {
    let timerValue;
    let mistakeValue;

    if (level === "one") {
      timerValue = 20;
      mistakeValue = 2;
    } else if (level === "two") {
      timerValue = 30;
      mistakeValue = 10;
    } else {
      timerValue = 60;
      mistakeValue = 20;
    }

    setTimer(timerValue);
    setMistake(mistakeValue);
    setClickNumber(mistakeValue);

    let numberOfBox = level === "one" ? 4 : level === "two" ? 10 : 16;
    let newList = list.slice(0, numberOfBox);
    setShuffledArray(shuffleArray(newList));

    setShowCards(true);
    if (numberOfBox === 4) {
      setTimeout(() => setShowCards(false), 1000);
    } else if (numberOfBox === 10) {
      setTimeout(() => setShowCards(false), 2500);
    } else if (numberOfBox === 16) {
      setTimeout(() => setShowCards(false), 4000);
    }
    // التحكم في مدة ابقاء الكروت مكشوفة
  }
  function clickSound() {
    new Audio(myClickSound).play();
  }
  function handleMistake() {
    setClickNumber((prev) => {
      if (prev === 1) {
        setIsOver(true);
        loserSound();
        return prev - 1;
      } else {
        return prev - 1;
      }
    });
  }

  function handleWin(value) {
    setYazan(value);
    setIsOver(true);
  }

  function handleAgain() {
    setIsOver(false);
    setTimerPop(false);
    setYazan(false);
    clickSound();

    setTimeout(() => {
      setGameStarted(false);
    }, 0);

    setTimeout(() => {
      setGameStarted(true);
      handleLevel(selectLevel);
    }, 0);
  }

  function handleStart() {
    setGameStarted(true);
    handleLevel(selectLevel);
  }

  return (
    <main onClick={clickSound}>
      {!gameStarted && <StartGame onStart={handleStart} />}

      {gameStarted && !isOver && (
        <>
          <EditLevel
            timer={timer}
            level={selectLevel}
            mistake={clickNumber}
            onSelect={setSelectLevel}
          />
          {/* setSelectLevel((e) => (e.target.value)) */}
          <GameBoard
            timer={timer}
            level={selectLevel}
            mistake={clickNumber}
            shuffledArray={shuffledArray}
            setMistake={handleMistake}
            showCards={showCards}
            onWin={handleWin}
          />
        </>
      )}
      {isOver && (
        <GameOver
          isOver={isOver}
          typeOfGameOver={
            timerPop
              ? "Timer ended!"
              : yazan
              ? "You Won!"
              : "Mistake counter has ended!"
          }
          onAgain={handleAgain}
        />
      )}
    </main>
  );
}

export default App;
