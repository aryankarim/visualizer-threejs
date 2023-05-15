import { scene } from "./renderer";
import * as THREE from "three";

const geometry = new THREE.BoxGeometry(1, 1, 1);

const line = new THREE.LineSegments(
  geometry,
  new THREE.LineBasicMaterial({ color: 0x009900 })
);
scene.add(line);
