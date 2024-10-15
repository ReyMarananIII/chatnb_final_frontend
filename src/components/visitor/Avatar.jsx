import React, { useEffect, useRef, useState } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { UseHooks } from "../../hooks/useHooks.jsx";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const corresponding = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};

export function Avatar(props) {
  const { message, setMessage, nb } = UseHooks();
  const { nodes, materials, scene } = useGLTF(
    `http://localhost:4000/Uploaded/${nb.model}`
  );
  const [lipsync, setLipsync] = useState();
  const [audio, setAudio] = useState();
  const [blink, setBlink] = useState(false);
  const [winkLeft, setWinkLeft] = useState(false);
  const [winkRight, setWinkRight] = useState(false);

  useEffect(() => {
    if (message === "") {
      return;
    }

    setLipsync(message.lipsync);
    const audio = new Audio("data:audio/mp3;base64," + message.audio);
    audio.play();
    setAudio(audio);

    // Set message to null when audio finishes playing
    audio.addEventListener("ended", () => {
      setTimeout(() => {
        setMessage(""); // Set message to null after 2 seconds
      }, 1000);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [message]);

  const { animations: idleAnimation } = useFBX("/Animations/Idle.fbx");

  idleAnimation[0].name = "Idle";

  const [animation, setAnimation] = useState("Idle");

  const group = useRef();
  const { actions } = useAnimations(idleAnimation, group);

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => actions[animation];
  }, [animation]);

  const lerpMorphTarget = (target, value, speed = 0.1) => {
    scene.traverse((child) => {
      if (child.isSkinnedMesh && child.morphTargetDictionary) {
        const index = child.morphTargetDictionary[target];
        if (
          index === undefined ||
          child.morphTargetInfluences[index] === undefined
        ) {
          return;
        }
        child.morphTargetInfluences[index] = THREE.MathUtils.lerp(
          child.morphTargetInfluences[index],
          value,
          speed
        );

        try {
          set({
            [target]: value,
          });
        } catch (e) {}
      }
    });
  };

  useFrame(() => {
    lerpMorphTarget("eyeBlinkLeft", blink || winkLeft ? 1 : 0, 0.5);
    lerpMorphTarget("eyeBlinkRight", blink || winkRight ? 1 : 0, 0.5);

    // LIPSYNC
    const appliedMorphTargets = [];
    if (message && lipsync) {
      const currentAudioTime = audio.currentTime;
      for (let i = 0; i < lipsync.mouthCues.length; i++) {
        const mouthCue = lipsync.mouthCues[i];
        if (
          currentAudioTime >= mouthCue.start &&
          currentAudioTime <= mouthCue.end
        ) {
          appliedMorphTargets.push(corresponding[mouthCue.value]);
          lerpMorphTarget(corresponding[mouthCue.value], 1, 0.2);
          break;
        }
      }
    }

    Object.values(corresponding).forEach((value) => {
      if (appliedMorphTargets.includes(value)) {
        return;
      }
      lerpMorphTarget(value, 0, 0.1);
    });
  });

  // To make the avatar look at the user
  useFrame((state) => {
    group.current.getObjectByName("Head").lookAt(state.camera.position);
  });

  useEffect(() => {
    let blinkTimeout;
    const nextBlink = () => {
      blinkTimeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          nextBlink();
        }, 200);
      }, THREE.MathUtils.randInt(1000, 5000));
    };
    nextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  const skinnedMeshes = Object.values(nodes).filter(
    (node) => node.isSkinnedMesh
  );

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      {skinnedMeshes.map((node, index) => (
        <skinnedMesh
          key={index}
          name={node.name}
          geometry={node.geometry}
          material={node.material}
          skeleton={node.skeleton}
          morphTargetDictionary={node.morphTargetDictionary}
          morphTargetInfluences={node.morphTargetInfluences}
        />
      ))}
    </group>
  );
}
