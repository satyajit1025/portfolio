import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { decryptFile } from "./decrypt";
import { disposeObject } from "./dispose";

const characterColors: Record<string, number> = {
  BODYSHIRT: 0x8054d9,
  Plane007: 0xe2aa84, // Face
  Ear001: 0xe2aa84,
  Hand: 0xe2aa84,
  Neck: 0xe2aa84,
  hair: 0x2c2033,
  Eyebrow: 0x2c2033,
  Pant: 0x292c49,
  Shoe: 0x36b5bd,
  Sole: 0xeee9f6,
};

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);
  let cancelled = false;

  const loadCharacter = async (): Promise<GLTF | null> => {
    let gltf: GLTF | undefined;
    try {
      const encryptedBlob = await decryptFile("/models/character.enc", "Character3D#@");
      if (cancelled) return null;
      gltf = await loader.parseAsync(encryptedBlob, "");
      if (cancelled) {
        disposeObject(gltf.scene);
        return null;
      }
      const character = gltf.scene;
      character.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const color = characterColors[child.name];
        if (color !== undefined) {
          // Clone shared materials so each body part keeps its own color.
          const tintMaterial = (material: THREE.Material) => {
            const tinted = material.clone();
            if (tinted instanceof THREE.MeshStandardMaterial) tinted.color.setHex(color);
            return tinted;
          };
          child.material = Array.isArray(child.material)
            ? child.material.map(tintMaterial)
            : tintMaterial(child.material);
        }
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = true;
      });
      await renderer.compileAsync(character, camera, scene);
      if (cancelled) {
        disposeObject(character);
        return null;
      }
      character.getObjectByName("footR")!.position.y = 3.36;
      character.getObjectByName("footL")!.position.y = 3.36;
      return gltf;
    } catch (error) {
      if (gltf) disposeObject(gltf.scene);
      if (cancelled) return null;
      throw error;
    } finally {
      dracoLoader.dispose();
    }
  };

  return { loadCharacter, cancel: () => { cancelled = true; } };
};

export default setCharacter;
