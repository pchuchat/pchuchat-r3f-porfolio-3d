
import {MySpace} from "./MySpace"
import { motion } from "framer-motion-3d"
import { animate } from "framer-motion"
import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  useScroll,
} from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { Avatar } from "./Avatar"
import { useMotionValue } from "framer-motion"
import { framerMotionConfig } from "../config"
import { useEffect, useRef, useState } from "react"
import { Projects } from "./Projects"
import { Background } from "./Background"




export const Experience = (props) => {
  const {menuOpened} = props
  const { viewport } = useThree()
  const [section,setSection]= useState(0)
  const data = useScroll()
  const cameraPositionX = useMotionValue(0)
  const cameraLookAtX = useMotionValue(0)
  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width / 12;
  const officeScaleRatio = Math.max(0.5, Math.min(0.9 * responsiveRatio, 0.9));
  


  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5: 0, {
      ...framerMotionConfig
    })
    animate(cameraLookAtX, menuOpened ? 5 : 0, { 
      ...framerMotionConfig
    })
  }, [menuOpened])

  const characterContainerAboutRef = useRef()

  const [characterAnimation, setCharacterAnimation] = useState("Typing");
  useEffect(() => {
    setCharacterAnimation("Falling");
    setTimeout(() => {
      switch (section) {
        case 0:
          setCharacterAnimation("Typing");
          break;
        case 1:
          setCharacterAnimation("Defeated");
          break;
        case 2:
          setCharacterAnimation("Pose");
          break;
        case 3:
          setCharacterAnimation("Call");
          break;
        default:
          setCharacterAnimation("Falling");
      }
    }, 350);
  }, [section]);

  const characterGroup = useRef();
  useFrame((state) => {

    let curSection = Math.floor(data.scroll.current * data.pages);

    if (curSection > 3) {
      curSection = 3;
    }

    if (curSection !== section) {
      setSection(curSection);
    }
   
    state.camera.position.x = cameraPositionX.get()
    state.camera.lookAt(cameraLookAtX.get(), 0, 0)

    if (section === 0) {
      
      characterContainerAboutRef.current.getWorldPosition(
        characterGroup.current.position
      )
    }

    // const position = new THREE.Vector3()
    // characterContainerAboutRef.current.getWorldPosition(position)

    // console.log([position.x,position.y,position.z])

    // const quaternion = new THREE.Quaternion()
    // characterContainerAboutRef.current.getWorldQuaternion(quaternion);
    // const euler = new THREE.Euler();
    // euler.setFromQuaternion(quaternion,"XYZ")

    // console.log([euler.x, euler.y, euler.z])

  });



  return (
    <>
      <Background />
      <motion.group
      ref={characterGroup }
    

        scale={[officeScaleRatio , officeScaleRatio, officeScaleRatio]}
        
        rotation={[
          -3.1415926535897913,
          1.5046370614359177,
          3.141592653589792
        ]}
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={{
          0: {
            scaleX: officeScaleRatio * 2.4,
            scaleY: officeScaleRatio * 2.4,
            scaleZ: officeScaleRatio * 2.4,
          },
          1: {
            y: -viewport.height + 0.5,
            x: isMobile ? 0.3 : 0,
            z: 7,
            rotateX: 0,
            rotateY: isMobile ? 0 : 0,
            rotateZ: 0,
            scaleX: isMobile ? 1.5 : 1.3,
            scaleY: isMobile ? 1.5 : 1.3,
            scaleZ: isMobile ? 1.5 : 1.3,
          },
          2: {
            x: isMobile ? -1.4 : -2,
            y: -viewport.height * 2 + 0.5,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 2.5,
            rotateZ: 0,
            scaleX: 1.5,
            scaleY: 1.5,
            scaleZ: 1.5,
          },
          3: {
            y: -viewport.height * 3 + 1,
            x: 0.24,
            z: 8.5,
            rotateX: 0,
            rotateY: -Math.PI / 4,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
        }}
      >
      <Avatar animation={characterAnimation} wireframe={section === 1} />
      </motion.group>
      <ambientLight intensity={1} />
      <motion.group
        position={[ isMobile ? 0:4 * officeScaleRatio, isMobile ? -viewport.height / 6 : -2, -9]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        rotation-y={-Math.PI / 2.5}
        animate={{
          y: isMobile ? -viewport.height / 6 : 0,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <MySpace section={section} />
        <group
          ref={characterContainerAboutRef}
          name="Empty" position={[0.084, 0.212, -2.600]} rotation={[-Math.PI, 0.248, -Math.PI]} 
        ></group>
      </motion.group>

      {/* SKILLS */}
      <motion.group
        position={[0, -1.5, -10]}
        animate={{
          z: section === 1 ? 0 : -10,
          y: section === 1 ? -viewport.height : -1.5,
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[3, 3, 3]} position={[3, 1, -18]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="yellow"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[-3, -1, -11]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"blue"}
            />
          </mesh>
        </Float>
      </motion.group>
      <Projects />
    </>
  );
};