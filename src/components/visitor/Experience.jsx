import { Environment, OrbitControls, Text, Plane } from "@react-three/drei";
import { Suspense } from "react";
import { Avatar } from "./Avatar";
import { UseHooks } from "../../hooks/useHooks";

const Subtitle = (props) => {
  const { message } = UseHooks();
  const subtitle = message.message;
  if (!subtitle) return null;

  // Calculate the maximum width of the subtitle to fit within the visible area
  const maxWidth = 8; // Adjust as needed
  const widthFactor = 0.09; // Adjust as needed
  const gap = 0.1; // Gap between each line

  // Break the subtitle into multiple lines if it exceeds the maximum width
  const lines = [];
  let line = "";
  const words = subtitle.split(" ");
  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    const testWidth = testLine.length * widthFactor;
    if (testWidth > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  // Calculate the total height of the text and background planes
  const totalHeight = lines.length * 0.14 + (lines.length - 1) * gap;

  return (
    <group {...props}>
      {/* Text and Background Planes */}

      {lines.map((line, index) => (
        <group key={index}>
          {/* Background Plane */}
          <Plane
            args={[line.length * widthFactor, 0.2]} // Adjust width based on text length
            position={[0, -1.7 - index * 0.14 - index * gap, -3]} // Adjust z position to 0
            rotation={[0, 0, Math.PI]} // Rotate to face the camera
            receiveShadow // Ensure it receives shadows
          >
            <meshStandardMaterial color="black" />
          </Plane>

          {/* Text */}
          <Text
            fontSize={0.14}
            color="white" // Change text color to contrast with black background
            position={[0, -1.7 - index * 0.14 - index * gap, -3]} // Adjust z position to 0
            anchorX="center"
            anchorY="middle"
            textAlign="center"
          >
            {line}
          </Text>
        </group>
      ))}
    </group>
  );
};

export const Experience = (props) => {
  const { showSubtitle } = UseHooks();
  return (
    <>
      <OrbitControls
        enablePan={false}
        enableRotate={false}
        enableZoom={false}
      />
      <Environment preset="sunset" />
      {showSubtitle && (
        <Suspense fallback={null}>
          <Subtitle nb={props.nb} />
        </Suspense>
      )}
      <Avatar nb={props.nb} position={[0, -14.8, -10]} scale={10.2} />
    </>
  );
};
