export default function Cards({
  shuffledArray,
  activeCards,
  handleCardClick,
  removeBox,
  showCards,
}) {
  let mainClass = "front";
  let secondClass = "front active";
  let removedClass = "box removed";

  let boxes = shuffledArray.map((e, index) => (
    <div
      className={removeBox.includes(e.id) ? removedClass : "box"}
      key={`${e.id}-${index}`}
      onClick={() => handleCardClick(e.id)}
    >
      <img src={e.name} alt="logo" />
      <div
        className={
          activeCards.includes(e.id) || showCards ? secondClass : mainClass
        }
      >
        <span>?</span>
      </div>
    </div>
  ));

  return <>{boxes}</>;
}
