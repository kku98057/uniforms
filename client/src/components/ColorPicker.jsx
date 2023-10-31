import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";
import { state } from "../store";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect } from "react";
export default function ColorPicker({ setActiveEditorTab }) {
  const snap = useSnapshot(state);

  return (
    <div className="absolute ml-3 left-full">
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
