import { useState, useEffect } from "react";
import Cards from "./Cards";
// import useSound from "use-sound";
import matchTowSound from "../Assets/app_alert_tone_036.mp3";
import notMatch from "../Assets/zapsplat_multimedia_game_sound_percussive_negative_lose_fail_003_63679.mp3";
import mySoundWon from "../Assets/zapsplat_multimedia_game_sound_fanfare_orchestral_strings_harp_glockenspeil_finished_complete_success_109635.mp3";
export default function GameBoard({
  level,
  mistake,
  timer,
  shuffledArray,
  setMistake,
  showCards,
  onWin,
}) {
  const [activeCards, setActiveCards] = useState([]);
  const [removeBox, setRemoveBox] = useState([]);
  const [numArray, setNumArray] = useState([]);
  function wonSound() {
    new Audio(mySoundWon).play();
  }

  useEffect(() => {
    if (numArray.length === shuffledArray.length) {
      onWin(true);
      wonSound();
    }
  }, [numArray, shuffledArray, onWin]);

  useEffect(() => {
    setActiveCards([]);
    setRemoveBox([]);
    setNumArray([]);
  }, [level, shuffledArray]);

  function handleCardClick(cardId) {
    if (
      activeCards.length < 2 &&
      !activeCards.includes(cardId) &&
      !removeBox.includes(cardId) &&
      !showCards
    ) {
      const newActiveCards = [...activeCards, cardId];
      setActiveCards(newActiveCards);

      if (newActiveCards.length === 2) {
        setTimeout(
          () => mainSetting(newActiveCards[0], newActiveCards[1]),
          500
        );
      }
    }
  }
  function matchCard() {
    new Audio(matchTowSound).play();
  }
  function notMM() {
    new Audio(notMatch).play();
  }
  function mainSetting(one, two) {
    if (Math.abs(one) === Math.abs(two)) {
      setRemoveBox((prevRemoveBox) => [...prevRemoveBox, one, two]); // اذا صح بشيل البوكس من الللعبة
      setNumArray((prev) => [...prev, one, two]); // تشيك اذا فزت او لا حسب اللينث
      matchCard();
    } else {
      setMistake();
      notMM();
    }

    setTimeout(() => {
      setActiveCards([]);
    }, 400);
  }

  return (
    <div className="allBox">
      <Cards
        shuffledArray={shuffledArray}
        activeCards={activeCards}
        handleCardClick={handleCardClick}
        removeBox={removeBox}
        showCards={showCards}
      />
    </div>
  );
}
