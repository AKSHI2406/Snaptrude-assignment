import React, { useRef, useEffect } from "react";
import {
  FreeCamera,
  HemisphericLight,
  Texture,
  StandardMaterial,
  MeshBuilder,
  Vector3,
  Engine, Scene
} from "@babylonjs/core";

const MyScene = ({imageId}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera = new FreeCamera("camera1", new Vector3(2, 2, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    const box = MeshBuilder.CreateBox("box", { size: 3 }, scene);
    box.position = new Vector3(0, 1, 0);

    // Apply texture from URL
    const material = new StandardMaterial("texture", scene);
    material.diffuseTexture = new Texture(
      `${process.env.REACT_APP_API_BASE}/image/${imageId}`
    );
    box.material = material;

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });

    return () => {
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{width:500,height:500}} />;
};

export default MyScene;
