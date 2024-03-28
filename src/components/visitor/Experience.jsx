import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";

export const Experience = (props) => {
  return (
    <>
      <OrbitControls
        enablePan={false}
        enableRotate={false}
        enableZoom={false}
      />
      <Environment preset="sunset" />
      <Avatar nb={props.nb} position={[0, -3, 5]} scale={2} />
    </>
  );
};
