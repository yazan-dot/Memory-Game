export default function Cards({
  shuffledArray,
  activeCards,
  handleCardClick,
  removeBox,
  showCards,
}) {
  let mainClass = "front";
  let secondClass = "front active";
  let removedClass = "box front-done";

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
        // تذكر المشكلة اللي واجهتك لما حطيت الشرط  ترو كان يفتح كل الكروت و لما حليتها حطيت الستيت يساوي الاي دوت الايدي
      >
        <span>?</span>
      </div>
    </div>
  ));

  return <>{boxes}</>;
}
