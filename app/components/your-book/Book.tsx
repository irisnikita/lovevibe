/* eslint-disable react/no-unknown-property */
import React, {useEffect, useRef, useState} from 'react';
import type {MeshProps} from '@react-three/fiber';
import {Canvas, useFrame} from '@react-three/fiber';
import type {Mesh} from 'three';
import {
  BoxGeometry,
  PlaneGeometry,
  MeshBasicMaterial,
  TextureLoader,
  DoubleSide,
} from 'three';
import * as THREE from 'three';
import {useSpring, animated, a} from '@react-spring/three';
import {
  Dodecahedron,
  Image,
  PerspectiveCamera,
  RenderTexture,
  Text,
  useScroll,
  useTexture,
} from '@react-three/drei';
import FrontImage from 'public/images/books/blue-background/front-cover.png';
import type {YourBook} from '~/schema';

interface PageProps extends MeshProps {
  idx?: number;
  color?: string;
  text?: string;
}

interface BookProps {
  yourBook: YourBook;
}

const Page: React.FC<PageProps> = (props) => {
  const {color, text, idx = 0, ...restOfProps} = props;
  const scroll = useScroll();
  const texture = useTexture(FrontImage);

  const ref = useRef<Mesh>();

  useFrame((state, delta) => {
    ref.current.rotation.x = scroll.offset * -10 * idx;
  });

  return (
    <mesh ref={ref} {...restOfProps}>
      <boxGeometry attach="geometry" args={[5, 3.65, 0.02]} />
      <meshStandardMaterial map={texture} />
      {/* <meshStandardMaterial>
        <RenderTexture attach="map" anisotropy={16}>
          <PerspectiveCamera
            makeDefault
            manual
            aspect={1 / 1}
            position={[0, 0, 5]}
          />
          <color attach="background" args={['orange']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
          <Text fontSize={4} color="#555">
            hello
          </Text>
        </RenderTexture>
      </meshStandardMaterial> */}
      {/* <meshStandardMaterial attach="material-1">
        <canvasTexture
          attach="map"
          args={[
            (() => {
              const canvas = document.createElement('canvas');
              canvas.width = 256;
              canvas.height = 512;
              const context = canvas.getContext('2d');
              context.fillStyle = 'white';
              context.fillRect(0, 0, canvas.width, canvas.height);
              context.fillStyle = 'black';
              context.font = '48px sans-serif';
              context.fillText(text, 10, 50);
              return canvas;
            })(),
          ]}
        />
      </meshStandardMaterial> */}
    </mesh>
  );
};

const pages = [
  {color: 'red', text: 'Page 1'},
  {color: 'green', text: 'Page 2'},
  {color: 'blue', text: 'Page 3'},
  // Add more pages as needed
];

const Book: React.FC<BookProps> = (props) => {
  const {yourBook} = props;
  const {bookPages} = yourBook.properties || {};
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const groupRef = useRef<any>();

  // const {rotation} = useSpring({
  //   rotation: isFlipping ? [0, Math.PI, 0] : [0, 0, 0],
  //   config: {mass: 1, tension: 280, friction: 60},
  //   onRest: () => setIsFlipping(false),
  // });

  // const {rotation} = useSpring({
  //   rotation: isFlipping ? [0, Math.PI, 0] : [0, 0, 0],
  //   config: {mass: 1, tension: 280, friction: 60},
  //   onRest: () => setIsFlipping(false),
  // });

  // const handlePageFlip = () => {
  //   if (!isFlipping && currentPage < pages.length - 1) {
  //     setIsFlipping(true);
  //     setTimeout(() => setCurrentPage(currentPage + 1), 600);
  //   }
  // };

  // useFrame((state, delta) => {
  //   groupRef.current.rotation.x = -scroll.offset * 20; // Rotate contents
  // });

  return (
    <>
      <group ref={groupRef} /* rotation={[-0.5, 0.7, 0]} */>
        {bookPages.map((page, index) => (
          <Page
            key={index}
            idx={index}
            position={[0, index * 0.01 - 0.4, -index * 0.06]}
            rotation={[index * 0.02, 0, 0]}
          />
        ))}
      </group>
      {/* <group>
        <Image
          ref={imageRef}
          transparent
          radius={0.075}
          url={FrontImage}
          scale={[1.618, 1, 1]}
          side={THREE.DoubleSide}
        />
      </group> */}
    </>
  );
};

export default Book;
