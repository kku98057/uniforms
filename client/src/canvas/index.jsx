import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Center, Html, OrbitControls } from "@react-three/drei";
import Shirt from "./Shirt";
import CameraRig from "./CameraRig";
import Backdrop from "./Backdrop";
import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { downloadState } from "../store";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
export default function CanvasModel() {
  const downloadSnap = useSnapshot(downloadState);

  // const [popup, setPopup] = useState(false);
  // const [userDatas, setUserDatas] = useState({
  //   nickname: "",
  //   phone: "",
  //   privacy: false,
  // });
  const navigator = useNavigate();
  // const changeHanlder = (e) => {
  //   const { value, name } = e.target;
  //   if (value.includes("-")) return alert(" '-' 를 빼주세요");
  //   if (name === "privacy") {
  //     const checked = e.target.checked;
  //     return setUserDatas((prev) => ({ ...prev, [name]: checked }));
  //   }
  //   setUserDatas((prev) => ({ ...prev, [name]: value }));
  // };
  const submitHandler = (e) => {
    e.preventDefault();
    if (userDatas.privacy === false) {
      return alert("개인정보이용동의에 체크해주세요.");
    }
    if (canvasRef.current) {
      const myImg = canvasRef.current.toDataURL();
      const link = document.createElement("a");
      link.href = myImg;
      link.download = "my_image";
      link.click();
    }
    downloadState.shouldDownload = false;
    // 업데이트함수
  };

  const canvasRef = useRef(null);
  const captureHandler = () => {
    // setPopup(true);
    if (canvasRef.current) {
      const myImg = canvasRef.current.toDataURL();
      const link = document.createElement("a");
      link.href = myImg;
      link.download = "my_image";
      link.click();
      // navigator("/apply");
    }
  };
  const isMobile = window.innerWidth < 768; // Assuming 768px as the breakpoint

  const cameraProps = isMobile
    ? { position: [0, 0, 1], fov: 60 }
    : { position: [0, 0, 0.5], fov: 75 };
  useEffect(() => {
    if (downloadSnap.shouldDownload) {
      captureHandler();
    }
  }, [downloadSnap.shouldDownload]);

  return (
    <>
      <Canvas
        camera={cameraProps}
        gl={{ preserveDrawingBuffer: true }}
        className="w-full h-full max-w-full transition-all ease-in"
        ref={canvasRef}
      >
        <ambientLight intensity={1.5} />
        <directionalLight intensity={1.5} />

        {/* <Environment preset="city" /> */}
        {/* <CameraRig> */}
        {/* <Backdrop /> */}
        <Center>
          <Shirt />
        </Center>
        {/* </CameraRig> */}

        <OrbitControls
          makeDefault
          minDistance={0.3}
          maxDistance={1.5}
          enableDamping={true}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      {/* {popup && (
        <div className="popup">
          <form className="popup_wrap" onSubmit={submitHandler}>
            <div className="close">
              <AiOutlineClose onClick={() => setPopup(false)} />
            </div>
            <h3>응모하기</h3>
            <div className="popup_content">
              <p>이름</p>
              <input
                placeholder="이름을 입력해주세요"
                type="text"
                id="nickname"
                required
                name="nickname"
                value={userDatas.nickname}
                onChange={changeHanlder}
              />
            </div>
            <div className="popup_content">
              <p>전화번호</p>
              <input
                placeholder='"-"를 빼고 입력해주세요.'
                type="tel"
                id="phone"
                name="phone"
                required
                value={userDatas.phone}
                onChange={changeHanlder}
              />
            </div>
            <div className="privacy">
              <label htmlFor="privacy">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  checked={userDatas.privacy}
                  onChange={changeHanlder}
                />
                <span>[개인정보이용동의]</span>
              </label>
              <Link
                to="https://porena.app/privacy/"
                className="detail"
                target="_blank"
              >
                제세히보기
              </Link>
            </div>
            <span className="alert">
              *잘못된 연락처의 기재 및 휴대폰 해지, 정지, 번호 변경 등으로 인한
              상품 미수령에 따른 재발송 및 환불은 불가합니다.
            </span>
            <button type="submit" className="popupBtn">
              제출하고 응모권 얻기!
            </button>
          </form>
        </div>
      )} */}
    </>
  );
}
