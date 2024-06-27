import React, { Suspense } from 'react'
import {Canvas} from '@react-three/fiber';
import Loader from '../components/Loader';
import Island from '../models/Island';
import { Sky } from '../models/Sky';
import {Bird} from '../models/Bird'
import {Plane} from '../models/Plane'

import { useEffect,useState } from 'react';
import  HomeInfo  from '../components/HomeInfo';
function Home() {
  const [isRotating, setIsRotating]= useState()
  const [currentStage, setCurrentStage]= useState(1)
  const [islandConfig, setIslandConfig] = useState({
    scale: [1, 1, 1],
    position: [0, -6.5, -43],
    rotation: [0.1, 4.7, 0]
  });
  const [isPlaneConfig, setIsPlaneConfig] = useState({
    scale : [1.5, 1.5, 1.5],
    position : [0, -1.5, 0]
  });


  useEffect(() => {
    const adjustIslandForScreenSize = () => {
      let screenScale = [1, 1, 1];
      let screenPosition = [0, -6.5, -43];
      let rotation = [0.1, 4.7, 0];

      if (window.innerWidth < 768) {
        screenScale = [0.9, 0.9, 0.9];
      }

      return { screenScale, screenPosition, rotation };
    };

    const { screenScale, screenPosition, rotation } = adjustIslandForScreenSize();
    setIslandConfig({ scale: screenScale, position: screenPosition, rotation });
    
    const adjustPlaneForScreenSize = () => {
      let screenScale , screenPosition ;
     

      if (window.innerWidth < 768) {
        screenScale = [1.5, 1.5, 1.5];
        screenPosition = [0, -1.5, 0];
      }else{
        screenScale = [3,3,3];
        screenPosition = [0, -4,-4];
      }

      return { screenScale, screenPosition, rotation };
    };

    const { screenPlaneScale, screenPlanePosition } = adjustPlaneForScreenSize();
    setIsPlaneConfig({ scale: screenPlaneScale, position: screenPlanePosition });

  
  }, []);
  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage}/>}

      </div>
      {/* a whole scene is set within canvas */}
    <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing': 'cursor-grab'} `}
    camera={{near:0.1 ,far:1000}}>
      <Suspense fallback={<Loader/>}>
        <directionalLight position={[1,1,1]} intensity={2}/>
        <ambientLight intensity={0.5}/>
        <hemisphereLight skyColor="#b1e1ff" groundColor="#000000"/>
        <Bird/>
        <Sky isRotating={isRotating}/>
        <Plane 
        position={isPlaneConfig.position}
        scale={isPlaneConfig.scale}
        isRotating={isRotating}
        rotation={[0,20,0]}/>
        <Island
            position={islandConfig.position}
            scale={islandConfig.scale}
            rotation={islandConfig.rotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          
      </Suspense>
    </Canvas>
      
    </section>
  )
}

export default Home