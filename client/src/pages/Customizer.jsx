import { AnimatePresence, motion, warning } from "framer-motion";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import config from "../config/config";
import { downloadState, state } from "../store";

import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";

import {
  AiPicker,
  FilePicker,
  Tab,
  ColorPicker,
  CustomButton,
} from "../components/";

export default function Customizer() {
  const handleButtonClick = () => {
    downloadState.shouldDownload = true;
  };

  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
    capture: false,
  });
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker setActiveEditorTab={setActiveEditorTab} />;
      case "filepicker":
        return (
          <FilePicker
            setFile={setFile}
            file={file}
            readFile={readFile}
            setActiveEditorTab={setActiveEditorTab}
          />
        );
      case "aipicker":
        return (
          <AiPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
            setActiveEditorTab={setActiveEditorTab}
          />
        );
      default:
        break;
    }
  };

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      // 콜 백엔드 ai이미지
      setGeneratingImg(true);
      const response = await fetch("http://localhost:8080/api/v1/dalle", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          prompt,
        }),
      });
      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };
  const handleDecals = (type, result) => {
    const decaleType = DecalTypes[type];
    state[decaleType.stateProperty] = result;

    if (!activeFilterTab[decaleType.filterTab]) {
      handleActiveFilterTab(decaleType.filterTab);
    }
  };
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;

      default:
        state.isFullTexture = true;
        state.isLogoTexture = false;
        break;
    }
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex min-h-screen items-centers">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              title={"Go Back"}
              type={"filled"}
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                handleClick={() => handleActiveFilterTab(tab.name)}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
              />
            ))}
            <div className={`tab-btn`} onClick={handleButtonClick}>
              <img src="/customizer/save.png" alt={"download"} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
