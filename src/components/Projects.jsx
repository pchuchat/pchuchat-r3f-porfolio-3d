import {useFrame, useThree } from "@react-three/fiber"
import{motion} from "framer-motion-3d"
import { Image, Text } from "@react-three/drei"
import { atom, useAtom } from "jotai"
import { useEffect, useRef } from "react"
import { animate, useMotionValue } from "framer-motion";
export const projects = [
    {
      title: "Freetime",
      url: "https://github.com/Jrvi/kalenteri",
      image: "projects/mobiilliapp.jpg",
      description: "Freetime is a social networking application that allows you to check your friends' calendars and availability, making it easier to schedule events and hangouts.",
    },
    {
      title: "MyAllyMyEnemy",
      url: "https://github.com/pchuchat/MyAllyMyEnemy",
      image: "projects/peli.jpg",
      description: "A game that can be played on a console or a computer, with the objective to complete each level and solve puzzles.Implemented using Unity.",
    },
    {
      title: "Äkänen Kuotsi",
      url: "https://github.com/pchuchat/EkaOmaTekemaPeli",
      image: "projects/koutsi.jpg",
      description: "My first game and my first step into the world of coding that I have made.",
    },
    {
      title: "Joukkueregisteri",
      url: "https://github.com/pchuchat/Joukkuerekisteri",
      image: "projects/joukkue.jpg",
      description: "A user interface that I created with my friend as a practice project. The purpose is to maintain information about the players in the team.",
    },
    {
      title: "TinkerIT",
      url: "https://tinkerit.fi/",
      image: "projects/tnkerit.jpg",
      description: "A company that was founded with a few friends, with the intention of gaining experience in working with real clients.",
    },
    {
        title: "My Porfolio",
        image: "projects/porpolio.jpg",
        url: "https://pc7.netlify.app/",
        description: "website with React Three Fiber",
      },
      {
        title: "Companion.ai",
        image: "projects/companion.jpg",
        url: "https://ai-app-drab.vercel.app/",
        description: "Your Intelligent Friends",
      },
      {
        title: "Dashboard",
        image: "projects/dashboard.jpg",
        url: "https://e-commerce-pchuchat.vercel.app/",
        description: "Dashboard for your online store",
      },
      {
        title: "e-commerce",
        image: "projects/testMarket.jpg",
        url: "https://store-flax-kappa.vercel.app/",
        description: "online store",
      },
  ];

const Project = (props) => {
    const { project, highlighted } = props
    const background = useRef();
    const bgOpacity = useMotionValue(0.4);

    useEffect(() => {
        animate(bgOpacity, highlighted ? 0.7 : 0.4);
      }, [highlighted]);
    
      useFrame(() => {
        background.current.material.opacity = bgOpacity.get();
      });
    
    return (
        <group {...props}>
            <mesh position-z={-0.001}  onClick={() => window.open(project.url, "_blank")}
             ref={background}>
                <planeGeometry args={[2.2, 2]} />
                <meshBasicMaterial color="black" transparent opacity={0.4} />

            </mesh>

            <Image scale={[2, 1.2, 1]} url={project.image} toneMapped={false} position-y={0.3} />
            <Text
                maxWidth={2}
                anchorX={"left"}
                anchorY={"top"}
                fontSize={0.2}
                position={[-1, -0.4, 0]}
            >
                {project.title.toUpperCase()}
            </Text>
            <Text
                maxWidth={2}
                anchorX="left"
                anchorY="top"
                fontSize={0.1}
                position={[-1, -0.6, 0]}
            >
                {project.description}
            </Text>

        </group>

    )
}

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
    const { viewport} = useThree();
    const [currentProject] = useAtom(currentProjectAtom);
    return(
        <group position-y={-viewport.height * 2 + 1}>
            {
                projects.map((project,index) => (
                    <motion.group key={"project_" + index} position={[index * 2.5, 0, -3]}
                    animate={{
                        x: 0 + (index - currentProject) * 2.5,
                        y: currentProject === index ? 0 : -0.1,
                        z: currentProject === index ? -2 : -3,
                        rotateX: currentProject === index ? 0 : -Math.PI / 3,
                        rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
                      }}>
                        <Project project={project} highlighted={index === currentProject} />
                    </motion.group>
                
                ))
            }
        </group>
    )
}