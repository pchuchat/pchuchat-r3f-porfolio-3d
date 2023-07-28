/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 .\public\models\64bd44c34e1697f144ef955f.glb 
*/

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'; 
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

export function Avatar(props) {
  const {animation,wireframe} = props
  const { headFollow, cursorFollow} = useControls({
    headFollow:false,
    cursorFollow:false,
    
  })
  const group = useRef();
  const { nodes, materials } = useGLTF('models/64bd44c34e1697f144ef955f.glb')
  const { animations: typingAnimation} = useFBX("animations/Typing.fbx")
  const { animations: defeatedAnimation} = useFBX("animations/Defeated.fbx")
  const { animations: fallingAnimation} = useFBX("animations/Falling Idle.fbx")
  const { animations: poseAnimation} = useFBX("animations/Male Standing Pose.fbx")
  const { animations: callAnimation} = useFBX("animations/Talking On A Cell Phone.fbx")
  
  
  typingAnimation[0].name= "Typing"
  defeatedAnimation[0].name= "Defeated"
  fallingAnimation[0].name= "Falling"
  poseAnimation[0].name="Pose"
  callAnimation[0].name="Call"
  const {actions} = useAnimations(
    [typingAnimation[0],defeatedAnimation[0],fallingAnimation[0],poseAnimation[0], callAnimation[0]], 
    group
    )

  useFrame((state) => {
    if(headFollow){
    group.current.getObjectByName("Head").lookAt(state.camera.position)
    }
    if(cursorFollow){
        const target =new THREE.Vector3(state.mouse.x, state.mouse.y, 1)
        group.current.getObjectByName("Spine2").lookAt(target)
    }

    })

    useEffect(() => {
      if(actions[animation]) {
        actions[animation].reset().fadeIn(0.5).play()
      } else {
        console.error(`Animation "${animation}" not found!`);
      }
  
      return () => {
        if(actions[animation]) {
          actions[animation].reset().fadeOut(0.5)
        }
      }
    }, [animation])


  useEffect(() => {
  Object.values(materials).forEach((materials) => {
    materials.wireframe = wireframe
    })
  },[wireframe])
  return (
    
    <group {...props} ref={group} dispose={null}>
      <group rotation-x={-Math.PI/2} >
      <primitive object={nodes.Hips} />
      <skinnedMesh frustumCulled={false} geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
      <skinnedMesh frustumCulled={false} geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
      <skinnedMesh frustumCulled={false} geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
      <skinnedMesh frustumCulled={false} geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
      <skinnedMesh frustumCulled={false} geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
      <skinnedMesh frustumCulled={false} name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
      <skinnedMesh frustumCulled={false} name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
      <skinnedMesh frustumCulled={false} name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
      <skinnedMesh frustumCulled={false} name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
    </group>
    </group>
  )
}

useGLTF.preload('models/64bd44c34e1697f144ef955f.glb')
