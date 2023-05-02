
// import React, { useState, useRef, useEffect } from 'react';
// import * as THREE from 'three';

// function ObjectUploader() {
//   const [objectPreview, setObjectPreview] = useState(null);
//   const canvasRef = useRef();

//   useEffect(() => {
//     if (objectPreview) {
//       const canvas = canvasRef.current;
//       const width = canvas.clientWidth;
//       const height = canvas.clientHeight;

//       const renderer = new THREE.WebGLRenderer({ canvas: canvas });
//       renderer.setSize(width, height);

//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
//       camera.position.set(0, 0, 5);

//       const loader = new THREE.ObjectLoader();
//       loader.load(
//         objectPreview,
//         (object) => {
//           scene.add(object);
//           scene.add(new THREE.AmbientLight(0xffffff));
//         },
//         undefined,
//         (error) => {
//           console.error(error);
//         }
//       );
// const light = new THREE.DirectionalLight( 0xffffff, 0.5 );
// light.position.set( 2, 2, 5);
// scene.add(light );
//       const animate = () => {
//         requestAnimationFrame(animate);
//         renderer.render(scene, camera);
//       };
//       animate();
//     }
//   }, [objectPreview]);

//   const handleObjectUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       setObjectPreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div>
//       <h1>Object Uploader</h1>
//       <input type="file" accept=".json,.obj,.gltf,.glb, .stl" onChange={handleObjectUpload} />
//       {objectPreview && <canvas ref={canvasRef} />}
//     </div>
//   );
// }

// export default ObjectUploader;
// import React, { useState } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// function ThreeScene() {
//   const [model, setModel] = useState(null);

//   const renderScene = (canvas) => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     const renderer = new THREE.WebGLRenderer({ canvas });
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     const controls = new OrbitControls(camera, canvas);
//     controls.target.set(0, 0, 0);
//     controls.update();

//     const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
//     scene.add(light);

//     if (model) {
//       scene.add(model.scene);
//     }

//     camera.position.z = 5;

//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();
//   };
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
  
//     if (file.name.endsWith('.obj')) {
//       const loader = new OBJLoader();
//       loader.load(
//         URL.createObjectURL(file),
//         (obj) => {
//           setModel(obj);
//         },
//         undefined,
//         (error) => {
//           console.error(error);
//         }
//       );
//     } else {
//       console.error('Invalid file type');
//     }
//   };
  
//   // const handleFileUpload = (event) => {
//   //   const file = event.target.files[0];
//   //   const loader = new GLTFLoader();
//   //   loader.load(
//   //     URL.createObjectURL(file),
//   //     (gltf) => {
//   //       setModel(gltf);
//   //     },
//   //     undefined,
//   //     (error) => {
//   //       console.error(error);
//   //     }
//   //   );
//   // };

//   return (
//     <div>
//       <form>
//         <input type="file" accept=".glb,.gltf ,.obj" onChange={handleFileUpload} />
//       </form>
//       <canvas
//         id="canvas"
//         ref={(canvas) => {
//           if (canvas) {
//             renderScene(canvas);
//           }
//         }}
//         style={{ width: '100%', height: '100%' }}
//       ></canvas>
//     </div>
//   );
// }

// export default ThreeScene; 
//*******************************************************************
// import React, { useState, useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// function ThreeScene() {
//   const [model, setModel] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     const controls = new OrbitControls(camera, canvas);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.05;
//     controls.screenSpacePanning = false;
//     controls.minDistance = 10;
//     controls.maxDistance = 1000;
//     controls.maxPolarAngle = Math.PI / 2;

//     const light1 = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
//     scene.add(light1);

//     const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
//     light2.position.set(-1, 2, 4);
//     scene.add(light2);

//     camera.position.z = 5;

//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();

//     return () => {
//       scene.dispose();
//       renderer.dispose();
//     };
//   }, []);

//   const handleFileUpload = (event) => {
//     setLoading(true);
//     const file = event.target.files[0];
//     const extension = file.name.split('.').pop().toLowerCase();

//     let loader;
//     switch (extension) {
//       case 'obj':
//         loader = new OBJLoader();
//         break;
//       case 'stl':
//         loader = new STLLoader();
//         break;
//       case 'gltf':
//         loader = new GLTFLoader();
//         break;
//       case 'glb':
//         loader = new GLTFLoader();
//         break;
//       case 'fbx':
//         loader = new FBXLoader();
//         break;
//       default:
//         console.error(`Unsupported file format: ${extension}`);
//         setLoading(false);
//         return;
//     }

//     loader.load(
//       URL.createObjectURL(file),
//       (model) => {
//         setModel(model.scene || model);
//         setLoading(false);
//       },
//       undefined,
//       (error) => {
//         console.error(error);
//         setLoading(false);
//       }
//     );
//   };

//   return (
//     <div>
//       <form>
//         <input type="file" accept=".obj,.stl,.gltf,.glb,.fbx" onChange={handleFileUpload} />
//       </form>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <canvas
//         ref={canvasRef}
//          // style={{ width: '100%', height: '
//   //         id="canvas"
//   //         ref={(canvas) => {
//   //           if (canvas) {
//   //             renderScene(canvas);
//   //           }
//   //         }}
//           style={{ width: '100%', height: '100%' }}
//        ></canvas>)}
//       </div>
//      );
//    }
  
//   export default ThreeScene;
//*************************************************
import React, { useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function ThreeScene() {
  const [model, setModel] = useState(null);
  const renderScene = (canvas) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setSize(900, 900);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();

    const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
    scene.add(light);
    scene.background = new THREE.Color(0xffffff);


    if (model) {
      scene.add(model);
    }

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    if (file.name.endsWith('.obj')) {
      const loader = new OBJLoader();
      loader.load(
        URL.createObjectURL(file),
        (obj) => {
          setModel(obj);
        },
        undefined,
        (error) => {
          console.error(error);
        }
      );
    } else if (file.name.endsWith('.stl')) {
      const loader = new STLLoader();
      loader.load(
        URL.createObjectURL(file),
        (geometry) => {
          const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
          const mesh = new THREE.Mesh(geometry, material);
          setModel(mesh);
        },
        undefined,
        (error) => {
          console.error(error);
        }
      );
       } else if (file.name.endsWith('.gltf') || file.name.endsWith('.glb')) {
        const loader = new GLTFLoader();
        loader.load(
          URL.createObjectURL(file),
          (gltf) => {
            setModel(gltf.scene || gltf.scenes[0]);
          },
          undefined,
          (error) => {
            console.error(error);
          }
        );
    } else {
      console.error('Invalid file type');
    }
  };
  return (
    <div>
      <form>
        <input type="file" accept=".obj ,.stl,.glb,.gltf,.fbx" onChange={handleFileUpload} />
      </form>
      <canvas
        id="canvas"
        ref={(canvas) => {
          if (canvas) {
            renderScene(canvas);
          }
        }}
        style={{ width: '100%', height: '100%' }}
      ></canvas>
    </div>
  );
}

export default ThreeScene;
