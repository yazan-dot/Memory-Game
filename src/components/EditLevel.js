import myClickSound from "../Assets/zapsplat_multimedia_game_sound_click_selection_menu_002_73512.mp3";
import hoverSound from "../Assets/zapsplat_foley_paper_sheets_x3_construction_sugar_set_down_on_surface_001_42007.mp3";
export default function EditLevel({ timer, level, mistake, onSelect }) {
  // اون سيليكت رح يبعت للاب كل الاوبشن المختار من قبل اليوزر
  function clickSound() {
    new Audio(myClickSound).play();
  }
  function hoverMous() {
    new Audio(hoverSound).play();
  }
  return (
    <div className="edit-level">
      <div className="select-level">
        <select
          onClick={clickSound}
          onChange={(e) => onSelect(e.target.value)}
          value={level}
        >
          <option onMouseEnter={hoverMous} onMouseLeave={hoverMous} value="one">
            Level One
          </option>
          <option onMouseEnter={hoverMous} onMouseLeave={hoverMous} value="two">
            Level Two
          </option>
          <option
            onMouseEnter={hoverMous}
            onMouseLeave={hoverMous}
            value="three"
          >
            Level Three
          </option>
        </select>
      </div>
      <div className="edit-level-details">
        <span>
          Time: <span className="animation-span">{timer}</span> s
        </span>
        <span>
          Mistakes:<span className="animation-span"> {mistake}</span>
        </span>
      </div>
    </div>
  );
}
