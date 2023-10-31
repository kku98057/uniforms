import { useEffect } from "react";
import CustomButton from "./CustomButton";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSnapshot } from "valtio";

export default function AiPicker({
  prompt,
  setPrompt,
  generatingImg,
  handleSubmit,
  setActiveEditorTab,
}) {
  return (
    <div className="aipicker-container">
      <button
        type="button"
        className="close"
        onClick={() => {
          setActiveEditorTab("");
        }}
      >
        <AiOutlineCloseCircle />
      </button>
      <textarea
        className="aipicker-textarea"
        placeholder="'Ask AI..."
        rows={5}
        value={prompt}
        maxLength={1000}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton
            type="outline"
            title="Asking AI..."
            customStyles="text-xs"
          />
        ) : (
          <>
            <CustomButton
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit("logo")}
              customStyles="text-xs"
            />
            <CustomButton
              type="outline"
              title="AI Full"
              handleClick={() => handleSubmit("full")}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  );
}
