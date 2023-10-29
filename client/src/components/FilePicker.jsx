import CustomButton from "./CustomButton";
import { AiOutlineCloseCircle } from "react-icons/ai";
export default function FilePicker({
  file,
  setFile,
  readFile,
  setActiveEditorTab,
}) {
  return (
    <div className="filepicker-container">
      <button
        type="button"
        className="close"
        onClick={() => {
          setActiveEditorTab("");
        }}
      >
        <AiOutlineCloseCircle />
      </button>
      <div className="flex-1 flex flex-col">
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>
        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === "" ? "No file selected" : file.name}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => readFile("logo")}
          customStyles="text-xs"
        />
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => readFile("full")}
          customStyles="text-xs"
        />
      </div>
    </div>
  );
}
