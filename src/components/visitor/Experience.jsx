import { CameraControls, ContactShadows, Environment } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Avatar } from "./Avatar";

export const Experience = (props) => {
  const cameraControls = useRef();

  useEffect(() => {
    cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0);
  }, []);

  return (
    <>
      <CameraControls ref={cameraControls} />
      <Environment preset="sunset" />
      <Avatar nb={props.nb} />
      <ContactShadows opacity={0.7} />
    </>
  );
};
