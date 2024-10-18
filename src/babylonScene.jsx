import React, { useEffect, useRef, useState } from 'react';
import { Engine, Scene } from '@babylonjs/core';
import '@babylonjs/loaders'; // Loaders for importing 3D models
import { ArcRotateCamera, HemisphericLight, Vector3, SceneLoader, WebXRExperienceHelper } from '@babylonjs/core';

const BabylonScene = () => {
  const canvasRef = useRef(null);
  const [scene, setScene] = useState(null);
  const [model, setModel] = useState(null); // Store the model reference
  const [animationGroups, setAnimationGroups] = useState(null); // Store animation groups

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);
    setScene(scene);

    // Create a basic camera
    const camera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, new Vector3(0, 4, 16), scene);
    camera.attachControl(canvas, true);

    // Add a light source
    new HemisphericLight('light', new Vector3(0, 1, 0), scene);

    // Load the 3D model
    const modelUrl = "1.glb";
    SceneLoader.ImportMeshAsync('', modelUrl, '', scene)
      .then((result) => {
        const mesh = result.meshes[0];
        mesh.position.y = 2;


        setModel(mesh); // Store the model
        setAnimationGroups(scene.animationGroups); // Store animation groups

        console.log('Model loaded');
      })
      .catch((error) => {
        console.error('Error loading model:', error);
      });

    // Start the render loop
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      engine.resize();
    });

    // Clean up on unmount
    return () => {
      engine.dispose();
      window.removeEventListener('resize', () => engine.resize());
    };
  }, []);
var animationnum=0;
  // Function to start the animation
  const playAnimation = () => {
    if(animationnum<11){
    animationnum++;}
    else(animationnum=1)
    
    console.log("current animation",animationnum)
    if (animationGroups && animationGroups.length > 0) {
      // Play the first animation group (you can adjust based on the model)
      animationGroups[animationnum].start(true); // `true` means loop
    } else {
      console.log('No animations found in the model');
    }
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100vh' }}></canvas>
      <button
        onClick={playAnimation}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          cursor: 'pointer',
        }}
      >
        Change Animation
      </button>
    </>
  );
};

export default BabylonScene;
