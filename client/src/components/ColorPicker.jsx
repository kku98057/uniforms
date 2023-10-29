import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";
import { state } from "../store";
import { AiOutlineCloseCircle } from "react-icons/ai";
export default function ColorPicker({ setActiveEditorTab }) {
  const snap = useSnapshot(state);
  return (
    <div className="absolute left-full ml-3">
      <button
        type="button"
        className="close"
        onClick={() => {
          setActiveEditorTab("");
        }}
      >
        <AiOutlineCloseCircle />
      </button>
      <SketchPicker
        color={snap.color}
        disableAlpha
        presetColors={["#000000", "#ffffff", "#ff0000"]}
        onChange={(color) => (state.color = color.hex)}
      />
    </div>
  );
}
